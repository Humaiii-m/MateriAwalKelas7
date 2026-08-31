import React, { useState } from 'react';
import { TopicMaterial, StudentSession } from '../types';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Wrench, 
  Zap, 
  BookOpen, 
  Laptop, 
  CheckSquare, 
  Square, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Search, 
  RefreshCw, 
  HelpCircle,
  Award
} from 'lucide-react';

interface PracticePageProps {
  topic: TopicMaterial;
  studentSession: StudentSession;
  onBackToMaterial: () => void;
  onGoToQuiz: (topicId: string) => void;
  onBackToDashboard: () => void;
}

export const PracticePage: React.FC<PracticePageProps> = ({
  topic,
  studentSession,
  onBackToMaterial,
  onGoToQuiz,
  onBackToDashboard
}) => {
  // Checklist states
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);

  // --- Interactive Widget 1: Hardware vs Software Sorting (For Topic 1) ---
  const [hwSwItems, setHwSwItems] = useState([
    { id: 1, name: 'Mouse Optik', category: 'hardware', placedIn: '' },
    { id: 2, name: 'Windows 11', category: 'software', placedIn: '' },
    { id: 3, name: 'SSD NVMe 512GB', category: 'hardware', placedIn: '' },
    { id: 4, name: 'Google Chrome', category: 'software', placedIn: '' },
    { id: 5, name: 'Processor Intel i5', category: 'hardware', placedIn: '' },
    { id: 6, name: 'Adobe Photoshop', category: 'software', placedIn: '' }
  ]);

  const handlePlaceHwSw = (itemId: number, target: 'hardware' | 'software') => {
    setHwSwItems(prev => prev.map(item => item.id === itemId ? { ...item, placedIn: target } : item));
  };

  const resetHwSw = () => {
    setHwSwItems(prev => prev.map(item => ({ ...item, placedIn: '' })));
  };

  // --- Interactive Widget 2: Search Operator Sandbox (For Topic 2) ---
  const [searchQuery, setSearchQuery] = useState('materi jaringan informatika filetype:pdf site:kemdikbud.go.id');
  const [searchSimResult, setSearchSimResult] = useState<string | null>(null);

  const testSearchSim = () => {
    if (searchQuery.includes('filetype:pdf') && searchQuery.includes('site:kemdikbud.go.id')) {
      setSearchSimResult('🎯 Luar Biasa! Kamu berhasil menggunakan operator filetype dan site sekaligus! Mesin pencari hanya akan menyajikan berkas PDF resmi dari situs Kemdikbud RI.');
    } else if (searchQuery.includes('filetype:pdf')) {
      setSearchSimResult('👍 Bagus! Operator filetype:pdf aktif memfilter semua format dokumen non-PDF.');
    } else if (searchQuery.includes('site:')) {
      setSearchSimResult('👍 Bagus! Operator site: aktif mengunci pencarian hanya pada domain spesifik tersebut.');
    } else {
      setSearchSimResult('ℹ️ Ini adalah pencarian teks biasa. Coba tambahkan "filetype:pdf" atau "site:kemdikbud.go.id" untuk hasil super presisi!');
    }
  };

  // --- Interactive Widget 3: Password Strength Tester (For Topic 3) ---
  const [testPassword, setTestPassword] = useState('Smp!T2026Juara');
  const [showPassword, setShowPassword] = useState(false);

  const calculatePasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score += 25;
    if (pwd.length >= 12) score += 15;
    if (/[A-Z]/.test(pwd)) score += 20;
    if (/[a-z]/.test(pwd)) score += 10;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 15;

    let label = 'Sangat Lemah';
    let color = 'bg-rose-500';
    let textCol = 'text-rose-600';
    let crackTime = 'Instan (< 1 detik)';

    if (score >= 80) {
      label = 'Sangat Kuat 🛡️';
      color = 'bg-emerald-500';
      textCol = 'text-emerald-600';
      crackTime = 'Ribuan Tahun';
    } else if (score >= 60) {
      label = 'Kuat 👍';
      color = 'bg-teal-500';
      textCol = 'text-teal-600';
      crackTime = 'Berminggu-minggu';
    } else if (score >= 40) {
      label = 'Sedang ⚠️';
      color = 'bg-amber-500';
      textCol = 'text-amber-600';
      crackTime = 'Beberapa Jam';
    }

    return { score, label, color, textCol, crackTime };
  };

  const pwdStats = calculatePasswordStrength(testPassword);

  const toggleCheck = (taskId: string, stepIdx: number) => {
    const key = `${taskId}_${stepIdx}`;
    setCheckedTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFinishPractice = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setIsCompletedModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBackToMaterial}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#4A4E69] hover:text-[#2B2D42] bg-[#FAF9F5] hover:bg-[#F4F1EA] px-3.5 py-2 rounded-xl border border-[#EAE7DC] shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Materi</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onGoToQuiz(topic.id)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7D8F69] hover:bg-[#6B7C57] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Lanjut Kerjakan Kuis</span>
          </button>
        </div>
      </div>

      {/* Practice Header Banner */}
      <header className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#7D8F69] via-[#6B7C57] to-[#506040] text-white shadow-lg shadow-[#7D8F69]/15">
        <div className="flex items-center gap-2 mb-2 text-[#FAF9F5] text-xs font-bold uppercase tracking-wider">
          <Wrench className="w-4 h-4 text-[#E8A87C]" />
          <span>Aktivitas Praktik & Eksplorasi Mandiri</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-['Space_Grotesk'] text-white">
          Praktik: {topic.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#EAE7DC] mt-2 max-w-2xl">
          Siswa: <span className="font-bold text-white">{studentSession.name}</span> ({studentSession.studentClass}). Ikuti instruksi aktivitas dan gunakan simulator interaktif di bawah.
        </p>
      </header>

      {/* Interactive Simulators by Topic */}
      {topic.id === 'perangkat-komputer' && (
        <section className="bg-white rounded-3xl border border-[#EAE7DC] p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE7DC]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#EBF0E6] text-[#5E6F4B] flex items-center justify-center font-bold">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#2B2D42]">Simulasi Interaktif: Klasifikasi Hardware & Software</h3>
                <p className="text-xs text-[#797E80]">Klik tombol untuk menempatkan benda digital ke kategori yang tepat.</p>
              </div>
            </div>

            <button
              onClick={resetHwSw}
              className="inline-flex items-center gap-1 text-xs text-[#797E80] hover:text-[#7D8F69] font-medium cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hardware Zone */}
            <div className="bg-[#F2F6EE] border-2 border-dashed border-[#D6E2CE] rounded-2xl p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#3D4D2F] flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-[#7D8F69]" />
                <span>Perangkat Keras (Hardware)</span>
              </h4>
              <div className="min-h-[140px] space-y-2">
                {hwSwItems.filter(i => i.placedIn === 'hardware').map(item => {
                  const isCorrect = item.category === 'hardware';
                  return (
                    <div
                      key={item.id}
                      className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-between shadow-2xs ${
                        isCorrect ? 'bg-white border border-[#D6E2CE] text-[#3D4D2F]' : 'bg-rose-50 border border-rose-300 text-rose-800'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#FAF9F5]">
                        {isCorrect ? '✓ Benar (Hardware)' : '✗ Salah (Software)'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Software Zone */}
            <div className="bg-[#F0F1F6] border-2 border-dashed border-[#D9DCE8] rounded-2xl p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B2D42] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#4A4E69]" />
                <span>Perangkat Lunak (Software)</span>
              </h4>
              <div className="min-h-[140px] space-y-2">
                {hwSwItems.filter(i => i.placedIn === 'software').map(item => {
                  const isCorrect = item.category === 'software';
                  return (
                    <div
                      key={item.id}
                      className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-between shadow-2xs ${
                        isCorrect ? 'bg-white border border-[#D6E2CE] text-[#3D4D2F]' : 'bg-rose-50 border border-rose-300 text-rose-800'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#FAF9F5]">
                        {isCorrect ? '✓ Benar (Software)' : '✗ Salah (Hardware)'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Unplaced Items Pool */}
          <div className="bg-[#FAF9F5] rounded-2xl p-4 border border-[#EAE7DC]">
            <span className="text-xs font-bold text-[#4A4E69] block mb-3">Pilih dan Kelompokkan Benda di Bawah:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {hwSwItems.map(item => (
                <div key={item.id} className="p-3 bg-white rounded-xl border border-[#EAE7DC] shadow-2xs flex flex-col justify-between gap-2">
                  <span className="text-xs font-bold text-[#2B2D42]">{item.name}</span>
                  <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-[#EAE7DC]">
                    <button
                      onClick={() => handlePlaceHwSw(item.id, 'hardware')}
                      className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                        item.placedIn === 'hardware' ? 'bg-[#7D8F69] text-white' : 'bg-[#FAF9F5] text-[#4A4E69] hover:bg-[#EBF0E6] hover:text-[#3D4D2F]'
                      }`}
                    >
                      Hardware
                    </button>
                    <button
                      onClick={() => handlePlaceHwSw(item.id, 'software')}
                      className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                        item.placedIn === 'software' ? 'bg-[#4A4E69] text-white' : 'bg-[#FAF9F5] text-[#4A4E69] hover:bg-[#F0F1F6] hover:text-[#2B2D42]'
                      }`}
                    >
                      Software
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {topic.id === 'internet-dan-jaringan' && (
        <section className="bg-white rounded-3xl border border-[#EAE7DC] p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="pb-3 border-b border-[#EAE7DC]">
            <h3 className="text-base font-bold text-[#2B2D42]">Simulasi Interaktif: Search Operator Sandbox</h3>
            <p className="text-xs text-[#797E80]">Uji coba sintaks kata kunci pencarian pintar di mesin pencari Google.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#4A4E69] uppercase tracking-wider block">
                Coba Format Kata Kunci:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#D8D3C5] text-xs sm:text-sm text-[#2B2D42] font-mono focus:outline-none focus:ring-2 focus:ring-[#7D8F69] bg-[#FAF9F5]"
                />
                <button
                  onClick={testSearchSim}
                  className="px-5 py-2.5 bg-[#4A4E69] hover:bg-[#34384E] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Uji Operator</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-[#797E80] text-xs py-1">Pintasan Cepat:</span>
              <button
                onClick={() => {
                  setSearchQuery('informatika smp filetype:pdf site:kemdikbud.go.id');
                  setTimeout(testSearchSim, 50);
                }}
                className="px-2.5 py-1 bg-[#FAF9F5] hover:bg-[#F2F6EE] hover:text-[#3D4D2F] border border-[#EAE7DC] rounded-lg text-[#4A4E69] font-mono text-[11px] transition-colors cursor-pointer"
              >
                + filetype:pdf site:kemdikbud.go.id
              </button>
              <button
                onClick={() => {
                  setSearchQuery('"protokol jaringan" filetype:ppt');
                  setTimeout(testSearchSim, 50);
                }}
                className="px-2.5 py-1 bg-[#FAF9F5] hover:bg-[#F2F6EE] hover:text-[#3D4D2F] border border-[#EAE7DC] rounded-lg text-[#4A4E69] font-mono text-[11px] transition-colors cursor-pointer"
              >
                + "frasa tanda kutip" filetype:ppt
              </button>
            </div>

            {searchSimResult && (
              <div className="p-4 rounded-2xl bg-[#F0F1F6] border border-[#D9DCE8] text-[#2B2D42] text-xs sm:text-sm font-medium leading-relaxed animate-fade-in">
                {searchSimResult}
              </div>
            )}
          </div>
        </section>
      )}

      {topic.id === 'etika-digital' && (
        <section className="bg-white rounded-3xl border border-[#EAE7DC] p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="pb-3 border-b border-[#EAE7DC]">
            <h3 className="text-base font-bold text-[#2B2D42]">Simulasi Interaktif: Penguji Kekuatan Password</h3>
            <p className="text-xs text-[#797E80]">Ketik contoh kombinasi password untuk menguji kekuatannya dari serangan brute-force hacker.</p>
          </div>

          <div className="space-y-4 max-w-xl">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#4A4E69] uppercase tracking-wider block">
                Simulasi Kata Sandi:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  placeholder="Ketik password simulasi..."
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[#D8D3C5] text-sm font-mono text-[#2B2D42] focus:outline-none focus:ring-2 focus:ring-[#7D8F69] bg-[#FAF9F5]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#8E9299] hover:text-[#2B2D42] p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Strength Meter Bar */}
            <div className="space-y-2 bg-[#FAF9F5] p-4 rounded-2xl border border-[#EAE7DC]">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#6B705C]">Level Keamanan:</span>
                <span className={pwdStats.textCol}>{pwdStats.label} ({pwdStats.score}%)</span>
              </div>

              <div className="w-full bg-[#EAE7DC] h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${pwdStats.color}`}
                  style={{ width: `${pwdStats.score}%` }}
                />
              </div>

              <div className="pt-2 text-xs text-[#6B705C] flex items-center justify-between">
                <span>Estimasi Waktu Bobol Hacker:</span>
                <span className="font-bold text-[#2B2D42] font-mono">{pwdStats.crackTime}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#6B705C]">
              <span className={`flex items-center gap-1 ${testPassword.length >= 8 ? 'text-[#3D4D2F] font-bold' : 'text-[#8E9299]'}`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7D8F69]" /> Min. 8-12 Karakter
              </span>
              <span className={`flex items-center gap-1 ${/[A-Z]/.test(testPassword) ? 'text-[#3D4D2F] font-bold' : 'text-[#8E9299]'}`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7D8F69]" /> Huruf Besar (A-Z)
              </span>
              <span className={`flex items-center gap-1 ${/[0-9]/.test(testPassword) ? 'text-[#3D4D2F] font-bold' : 'text-[#8E9299]'}`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7D8F69]" /> Angka (0-9)
              </span>
              <span className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(testPassword) ? 'text-[#3D4D2F] font-bold' : 'text-[#8E9299]'}`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7D8F69]" /> Simbol Khusus (!@#$)
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Step-by-Step Practical Checklists */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-[#2B2D42]">Checklist Aktivitas Praktik Mandiri</h3>
          <p className="text-xs text-[#797E80]">Centang setiap langkah yang sudah kamu selesaikan.</p>
        </div>

        <div className="space-y-4">
          {topic.practiceTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-3xl border border-[#EAE7DC] shadow-2xs p-6 space-y-4">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#2B2D42] font-['Space_Grotesk']">
                  {task.title}
                </h4>
                <p className="text-xs text-[#6B705C] mt-1">{task.description}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#EAE7DC]">
                {task.steps.map((step, idx) => {
                  const isDone = !!checkedTasks[`${task.id}_${idx}`];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(task.id, idx)}
                      className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                        isDone ? 'bg-[#F2F6EE] border-[#D6E2CE] text-[#3D4D2F]' : 'bg-[#FAF9F5] border-[#EAE7DC] text-[#4A4E69] hover:bg-[#F4F1EA]'
                      }`}
                    >
                      <button type="button" className="mt-0.5 shrink-0 text-[#8E9299]">
                        {isDone ? (
                          <CheckSquare className="w-4 h-4 text-[#7D8F69]" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                      <span className="text-xs sm:text-sm font-medium leading-relaxed select-none">
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Completion Action Bar */}
      <div className="bg-white rounded-3xl border border-[#EAE7DC] shadow-2xs p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[#2B2D42]">Selesai Mengerjakan Aktivitas Praktik?</h3>
          <p className="text-xs text-[#797E80] mt-0.5">
            Konfirmasi penyelesaian praktikmu untuk menandai pencapaian belajar.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            id="btn-confirm-practice-done"
            onClick={handleFinishPractice}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-[#7D8F69] to-[#5E6F4B] hover:from-[#6B7C57] hover:to-[#506040] text-white font-bold text-xs tracking-wide shadow-md shadow-[#7D8F69]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Sudah Mengerjakan Praktik</span>
          </button>
        </div>
      </div>

      {/* Completion Feedback Modal */}
      {isCompletedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2D42]/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#EAE7DC] text-center space-y-5 animate-scale-up">
            <div className="w-16 h-16 rounded-2xl bg-[#EBF0E6] text-[#5E6F4B] mx-auto flex items-center justify-center shadow-inner">
              <Award className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#2B2D42] font-['Space_Grotesk']">
                Hebat, {studentSession.name}! 🎉
              </h3>
              <p className="text-xs sm:text-sm text-[#6B705C] leading-relaxed">
                Kamu telah menyelesaikan aktivitas praktik untuk materi <span className="font-semibold text-[#2B2D42]">"{topic.title}"</span>. Keterampilan komputasimu semakin terasah!
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsCompletedModalOpen(false);
                  onGoToQuiz(topic.id);
                }}
                className="w-full py-3 rounded-xl bg-[#7D8F69] hover:bg-[#6B7C57] text-white text-xs font-bold shadow-md shadow-[#7D8F69]/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Lanjut Kerjakan Kuis Sekarang</span>
              </button>

              <button
                onClick={() => {
                  setIsCompletedModalOpen(false);
                  onBackToDashboard();
                }}
                className="w-full py-2.5 rounded-xl bg-[#FAF9F5] hover:bg-[#F4F1EA] text-[#4A4E69] text-xs font-semibold cursor-pointer border border-[#EAE7DC]"
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
