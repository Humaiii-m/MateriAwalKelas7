import express from 'express';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Determine Data Directory: use /tmp in serverless/Netlify environments where disk is read-only
const isServerless = Boolean(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.VERCEL);
const DATA_DIR = isServerless ? '/tmp' : path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// JWT Secret from Environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'belajar_it_smp_super_secure_jwt_secret_2026';

// Ensure data directory exists
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (e) {
  console.warn('Data directory creation note:', e);
}

export interface DBStructure {
  teachers: Array<{
    id: string;
    username: string;
    displayName: string;
    passwordHash: string;
    role: 'teacher';
    createdAt: string;
  }>;
  students: Array<{
    id: string;
    name: string;
    class: string;
    createdAt: string;
    lastActiveAt: string;
  }>;
  quiz_results: Array<{
    id: string;
    studentName: string;
    class: string;
    topicId: string;
    topicName: string;
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    percentage: number;
    submittedAt: string;
    answersDetail?: any[];
  }>;
}

// Initial seed
const defaultDB: DBStructure = {
  teachers: [
    {
      id: 't-default-1',
      username: 'guru',
      displayName: 'Guru Informatika SMP',
      // Hash for "guru123"
      passwordHash: bcrypt.hashSync('guru123', 10),
      role: 'teacher',
      createdAt: new Date().toISOString()
    }
  ],
  students: [],
  quiz_results: []
};

// In-memory cache for fallback in serverless environments
let inMemoryDB: DBStructure = { ...defaultDB };

function loadDB(): DBStructure {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (parsed && Array.isArray(parsed.teachers)) {
        inMemoryDB = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Notice reading db.json, using in-memory state:', err);
  }

  saveDB(defaultDB);
  return defaultDB;
}

function saveDB(dbData: DBStructure) {
  inMemoryDB = dbData;
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2), 'utf-8');
  } catch (err) {
    // In some serverless cold starts, filesystem might be read-only; in-memory copy retains state per instance
    console.warn('Notice saving db.json:', err);
  }
}

// Initialize database
let db = loadDB();

// Ensure at least one teacher exists
if (!db.teachers || db.teachers.length === 0) {
  db.teachers = [
    {
      id: 't-default-1',
      username: 'guru',
      displayName: 'Guru Informatika SMP',
      passwordHash: bcrypt.hashSync('guru123', 10),
      role: 'teacher',
      createdAt: new Date().toISOString()
    }
  ];
  saveDB(db);
}

// Authentication Middleware for Teacher routes
function authenticateTeacher(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Akses ditolak. Token autentikasi guru diperlukan.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; username: string; role: string };
    if (decoded.role !== 'teacher') {
      return res.status(403).json({ error: 'Akses hanya diizinkan untuk peran Guru.' });
    }
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Sesi login telah kedaluwarsa. Silakan login kembali.' });
  }
}

// Create Express router with all API routes
const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: isServerless ? 'netlify-serverless' : 'node-server',
    time: new Date().toISOString()
  });
});

// 1. Student Session / Register Student identity
router.post('/students/session', (req, res) => {
  const { name, studentClass } = req.body;
  if (!name || !studentClass) {
    return res.status(400).json({ error: 'Nama lengkap dan kelas wajib diisi.' });
  }

  const trimmedName = name.trim();
  const trimmedClass = studentClass.trim();

  let student = db.students.find(
    s => s.name.toLowerCase() === trimmedName.toLowerCase() && s.class.toLowerCase() === trimmedClass.toLowerCase()
  );

  if (!student) {
    student = {
      id: `std_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: trimmedName,
      class: trimmedClass,
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString()
    };
    db.students.push(student);
    saveDB(db);
  } else {
    student.lastActiveAt = new Date().toISOString();
    saveDB(db);
  }

  res.json({ success: true, student });
});

// 2. Get Student Progress by Name and Class
router.get('/students/progress', (req, res) => {
  const { name, studentClass } = req.query;
  if (!name || !studentClass) {
    return res.status(400).json({ error: 'Nama dan kelas wajib disertakan.' });
  }

  const targetName = (name as string).trim().toLowerCase();
  const targetClass = (studentClass as string).trim().toLowerCase();

  const studentResults = db.quiz_results.filter(
    r => r.studentName.trim().toLowerCase() === targetName && r.class.trim().toLowerCase() === targetClass
  );

  res.json({
    success: true,
    results: studentResults
  });
});

// 3. Submit Quiz Result (Siswa menyelesaikan kuis)
router.post('/quiz-results', (req, res) => {
  const {
    studentName,
    studentClass,
    topicId,
    topicName,
    score,
    correctAnswers,
    totalQuestions,
    percentage,
    answersDetail
  } = req.body;

  if (!studentName || !studentClass || !topicId) {
    return res.status(400).json({ error: 'Data kuis tidak lengkap.' });
  }

  const trimmedName = studentName.trim();
  const trimmedClass = studentClass.trim();

  let student = db.students.find(
    s => s.name.toLowerCase() === trimmedName.toLowerCase() && s.class.toLowerCase() === trimmedClass.toLowerCase()
  );
  if (!student) {
    student = {
      id: `std_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: trimmedName,
      class: trimmedClass,
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString()
    };
    db.students.push(student);
  } else {
    student.lastActiveAt = new Date().toISOString();
  }

  const newResult = {
    id: `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    studentName: trimmedName,
    class: trimmedClass,
    topicId,
    topicName: topicName || topicId,
    score: Number(score),
    correctAnswers: Number(correctAnswers),
    totalQuestions: Number(totalQuestions),
    percentage: Number(percentage || score),
    submittedAt: new Date().toISOString(),
    answersDetail: answersDetail || []
  };

  db.quiz_results.push(newResult);
  saveDB(db);

  res.status(201).json({
    success: true,
    message: 'Nilai kuis berhasil disimpan ke Firestore / Database.',
    result: newResult
  });
});

// ==========================================
// TEACHER AUTHENTICATION & PORTAL API
// ==========================================

// Teacher Login
router.post('/teacher/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username dan password wajib diisi.' });
  }

  const teacher = db.teachers.find(t => t.username.toLowerCase() === username.trim().toLowerCase());
  if (!teacher) {
    return res.status(401).json({ error: 'Username atau password guru salah.' });
  }

  const isMatch = bcrypt.compareSync(password, teacher.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ error: 'Username atau password guru salah.' });
  }

  const token = jwt.sign(
    {
      id: teacher.id,
      username: teacher.username,
      role: teacher.role
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    token,
    user: {
      id: teacher.id,
      username: teacher.username,
      displayName: teacher.displayName,
      role: teacher.role
    }
  });
});

// Teacher Register (Allows creating accounts for teachers)
router.post('/teacher/register', (req, res) => {
  const { username, password, displayName } = req.body;
  if (!username || !password || !displayName) {
    return res.status(400).json({ error: 'Username, password, dan nama guru wajib diisi.' });
  }

  if (password.length < 5) {
    return res.status(400).json({ error: 'Password minimal 5 karakter.' });
  }

  const existing = db.teachers.find(t => t.username.toLowerCase() === username.trim().toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'Username guru sudah terdaftar. Silakan gunakan username lain.' });
  }

  const newTeacher = {
    id: `t_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    username: username.trim(),
    displayName: displayName.trim(),
    passwordHash: bcrypt.hashSync(password, 10),
    role: 'teacher' as const,
    createdAt: new Date().toISOString()
  };

  db.teachers.push(newTeacher);
  saveDB(db);

  const token = jwt.sign(
    {
      id: newTeacher.id,
      username: newTeacher.username,
      role: newTeacher.role
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    success: true,
    token,
    user: {
      id: newTeacher.id,
      username: newTeacher.username,
      displayName: newTeacher.displayName,
      role: newTeacher.role
    }
  });
});

// Current Teacher Profile
router.get('/teacher/me', authenticateTeacher, (req, res) => {
  const userId = (req as any).user.id;
  const teacher = db.teachers.find(t => t.id === userId);
  if (!teacher) {
    return res.status(404).json({ error: 'Data guru tidak ditemukan.' });
  }

  res.json({
    success: true,
    user: {
      id: teacher.id,
      username: teacher.username,
      displayName: teacher.displayName,
      role: teacher.role
    }
  });
});

// Teacher: Get All Quiz Results with Filters
router.get('/teacher/quiz-results', authenticateTeacher, (req, res) => {
  const { class: filterClass, topicId: filterTopic, search } = req.query;

  let results = [...db.quiz_results];

  if (filterClass && filterClass !== 'ALL') {
    results = results.filter(r => r.class.toUpperCase() === (filterClass as string).toUpperCase());
  }

  if (filterTopic && filterTopic !== 'ALL') {
    results = results.filter(r => r.topicId === filterTopic);
  }

  if (search) {
    const q = (search as string).toLowerCase().trim();
    results = results.filter(
      r => r.studentName.toLowerCase().includes(q) || r.class.toLowerCase().includes(q) || r.topicName.toLowerCase().includes(q)
    );
  }

  // Sort newest first
  results.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  res.json({
    success: true,
    count: results.length,
    results
  });
});

// Teacher: Aggregated Statistics
router.get('/teacher/stats', authenticateTeacher, (req, res) => {
  const results = db.quiz_results;
  const uniqueStudents = new Set(results.map(r => `${r.studentName.toLowerCase()}_${r.class.toLowerCase()}`));
  
  db.students.forEach(s => uniqueStudents.add(`${s.name.toLowerCase()}_${s.class.toLowerCase()}`));

  const totalQuizzes = results.length;
  const avgScore = totalQuizzes > 0 ? Math.round(results.reduce((acc, curr) => acc + curr.score, 0) / totalQuizzes) : 0;
  
  // Passing criteria (KKM >= 75)
  const passedCount = results.filter(r => r.score >= 75).length;
  const passingRate = totalQuizzes > 0 ? Math.round((passedCount / totalQuizzes) * 100) : 0;

  res.json({
    success: true,
    stats: {
      totalStudents: uniqueStudents.size,
      totalQuizzesTaken: totalQuizzes,
      averageScore: avgScore,
      passingRate: passingRate
    }
  });
});

// Teacher: Delete Quiz Result (For maintenance)
router.delete('/teacher/quiz-results/:id', authenticateTeacher, (req, res) => {
  const { id } = req.params;
  const index = db.quiz_results.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Data hasil kuis tidak ditemukan.' });
  }

  db.quiz_results.splice(index, 1);
  saveDB(db);

  res.json({ success: true, message: 'Hasil kuis berhasil dihapus.' });
});

// Teacher: Export CSV
router.get('/teacher/export-csv', authenticateTeacher, (req, res) => {
  const { class: filterClass, topicId: filterTopic } = req.query;

  let results = [...db.quiz_results];

  if (filterClass && filterClass !== 'ALL') {
    results = results.filter(r => r.class.toUpperCase() === (filterClass as string).toUpperCase());
  }

  if (filterTopic && filterTopic !== 'ALL') {
    results = results.filter(r => r.topicId === filterTopic);
  }

  results.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  let csvContent = '\uFEFF';
  csvContent += 'No,Nama Siswa,Kelas,Materi IT,Nilai,Jawaban Benar,Total Soal,Persentase,Waktu Pengerjaan\n';

  results.forEach((item, index) => {
    const dateFormatted = new Date(item.submittedAt).toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    const cleanName = `"${item.studentName.replace(/"/g, '""')}"`;
    const cleanTopic = `"${item.topicName.replace(/"/g, '""')}"`;
    csvContent += `${index + 1},${cleanName},${item.class},${cleanTopic},${item.score},${item.correctAnswers},${item.totalQuestions},${item.percentage}%,${dateFormatted}\n`;
  });

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="Nilai_Informatika_SMP_${new Date().toISOString().slice(0, 10)}.csv"`);
  res.send(csvContent);
});

// Initialize Express App
const app = express();

// Enable JSON parsing and CORS headers for serverless
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Mount router under /api, /.netlify/functions/api, and / for flexible routing in both local and Netlify
app.use('/api', router);
app.use('/.netlify/functions/api', router);
app.use('/', router);

export { app, router, db };
