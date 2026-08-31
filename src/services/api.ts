import { StudentSession, QuizResult, TeacherAuthResponse, TeacherStats, TeacherUser } from '../types';
import { db, isFirebaseConfigured } from './firebaseConfig';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';

const STUDENT_SESSION_KEY = 'belajar_it_student_session';
const TEACHER_TOKEN_KEY = 'belajar_it_teacher_token';
const TEACHER_USER_KEY = 'belajar_it_teacher_user';

// ==========================================
// STUDENT SERVICES
// ==========================================

export function getSavedStudentSession(): StudentSession | null {
  try {
    const raw = localStorage.getItem(STUDENT_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

export function saveStudentSession(name: string, studentClass: string): StudentSession {
  const session: StudentSession = {
    name: name.trim(),
    studentClass: studentClass.trim(),
    startedAt: new Date().toISOString()
  };
  localStorage.setItem(STUDENT_SESSION_KEY, JSON.stringify(session));

  // Sync with backend asynchronously
  fetch('/api/students/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: session.name, studentClass: session.studentClass })
  }).catch(err => console.warn('Could not sync student session with backend:', err));

  return session;
}

export function clearStudentSession(): void {
  localStorage.removeItem(STUDENT_SESSION_KEY);
}

// Fetch student progress for current session
export async function fetchStudentProgress(name: string, studentClass: string): Promise<QuizResult[]> {
  try {
    const res = await fetch(`/api/students/progress?name=${encodeURIComponent(name)}&studentClass=${encodeURIComponent(studentClass)}`);
    if (!res.ok) throw new Error('Gagal mengambil progress siswa');
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.warn('Backend progress fetch failed, trying local fallback:', err);
    // Local fallback
    const local = localStorage.getItem(`results_${name}_${studentClass}`);
    return local ? JSON.parse(local) : [];
  }
}

// Submit Quiz Result
export async function submitQuizScore(resultData: {
  studentName: string;
  studentClass: string;
  topicId: string;
  topicName: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  answersDetail?: any[];
}): Promise<QuizResult> {
  // 1. If Firebase Client is configured directly, save to Firestore collection
  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'quiz_results'), {
        ...resultData,
        submittedAt: new Date().toISOString()
      });
      console.log('Saved directly to Firestore doc:', docRef.id);
    } catch (firebaseErr) {
      console.warn('Direct Firestore save failed, relying on backend API:', firebaseErr);
    }
  }

  // 2. Submit to Server-side API endpoint
  try {
    const res = await fetch('/api/quiz-results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resultData)
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || 'Gagal menyimpan nilai kuis');
    }

    const data = await res.json();
    
    // Save to local cache as backup
    const cacheKey = `results_${resultData.studentName}_${resultData.studentClass}`;
    const existing = localStorage.getItem(cacheKey);
    const list = existing ? JSON.parse(existing) : [];
    list.push(data.result);
    localStorage.setItem(cacheKey, JSON.stringify(list));

    return data.result;
  } catch (err) {
    console.error('API submission error:', err);
    // Offline fallback representation
    const fallbackResult: QuizResult = {
      id: `local_${Date.now()}`,
      studentName: resultData.studentName,
      class: resultData.studentClass,
      topicId: resultData.topicId,
      topicName: resultData.topicName,
      score: resultData.score,
      correctAnswers: resultData.correctAnswers,
      totalQuestions: resultData.totalQuestions,
      percentage: resultData.percentage,
      submittedAt: new Date().toISOString(),
      answersDetail: resultData.answersDetail
    };
    return fallbackResult;
  }
}

// ==========================================
// TEACHER SERVICES
// ==========================================

export function getTeacherToken(): string | null {
  return localStorage.getItem(TEACHER_TOKEN_KEY);
}

export function getTeacherUser(): TeacherUser | null {
  const raw = localStorage.getItem(TEACHER_USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function saveTeacherAuth(token: string, user: TeacherUser): void {
  localStorage.setItem(TEACHER_TOKEN_KEY, token);
  localStorage.setItem(TEACHER_USER_KEY, JSON.stringify(user));
}

export function clearTeacherAuth(): void {
  localStorage.removeItem(TEACHER_TOKEN_KEY);
  localStorage.removeItem(TEACHER_USER_KEY);
}

export async function teacherLogin(username: string, password: string): Promise<TeacherAuthResponse> {
  const res = await fetch('/api/teacher/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Gagal login. Periksa username dan password.');
  }

  saveTeacherAuth(data.token, data.user);
  return data;
}

export async function teacherRegister(username: string, password: string, displayName: string): Promise<TeacherAuthResponse> {
  const res = await fetch('/api/teacher/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, displayName })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Gagal mendaftarkan akun guru.');
  }

  saveTeacherAuth(data.token, data.user);
  return data;
}

export async function fetchTeacherQuizResults(filters?: {
  class?: string;
  topicId?: string;
  search?: string;
}): Promise<QuizResult[]> {
  const token = getTeacherToken();
  if (!token) throw new Error('Token autentikasi tidak ditemukan. Silakan login kembali.');

  const params = new URLSearchParams();
  if (filters?.class && filters.class !== 'ALL') params.append('class', filters.class);
  if (filters?.topicId && filters.topicId !== 'ALL') params.append('topicId', filters.topicId);
  if (filters?.search) params.append('search', filters.search);

  const res = await fetch(`/api/teacher/quiz-results?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      clearTeacherAuth();
    }
    throw new Error(data.error || 'Gagal mengambil data nilai siswa.');
  }

  return data.results || [];
}

export async function fetchTeacherStats(): Promise<TeacherStats> {
  const token = getTeacherToken();
  if (!token) throw new Error('Token autentikasi guru diperlukan.');

  const res = await fetch('/api/teacher/stats', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      clearTeacherAuth();
    }
    throw new Error(data.error || 'Gagal mengambil statistik.');
  }

  return data.stats;
}

export async function deleteQuizResult(id: string): Promise<boolean> {
  const token = getTeacherToken();
  if (!token) throw new Error('Token autentikasi guru diperlukan.');

  const res = await fetch(`/api/teacher/quiz-results/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Gagal menghapus hasil kuis.');
  }

  return true;
}

export function downloadCsvExport(filters?: { class?: string; topicId?: string }): void {
  const token = getTeacherToken();
  if (!token) {
    alert('Sesi guru tidak valid. Silakan login kembali.');
    return;
  }

  const params = new URLSearchParams();
  if (filters?.class && filters.class !== 'ALL') params.append('class', filters.class);
  if (filters?.topicId && filters.topicId !== 'ALL') params.append('topicId', filters.topicId);

  // Fetch with Authorization header then trigger blob download
  fetch(`/api/teacher/export-csv?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) throw new Error('Gagal mengunduh berkas CSV');
      return response.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Nilai_Informatika_SMP_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch(err => {
      console.error('Error downloading CSV:', err);
      alert('Gagal mengunduh nilai: ' + err.message);
    });
}
