import React, { useState } from 'react';
import { CLASS_OPTIONS } from '../data/materialsData';
import { 
  Laptop, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle,
  GraduationCap,
  BookOpen,
  Zap,
  Award
} from 'lucide-react';

interface WelcomePageProps {
  onStartLearning: (name: string, studentClass: string) => void;
  onNavigateToTeacher: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({
  onStartLearning,
  onNavigateToTeacher
}) => {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [customClass, setCustomClass] = useState('');
  const [isCustomClass, setIsCustomClass] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const finalClass = (isCustomClass ? customClass : studentClass).trim();

    if (!cleanName) {
      setErrorMsg('Silakan masukkan nama lengkapmu terlebih dahulu.');
      return;
    }

    if (!finalClass) {
      setErrorMsg('Silakan pilih atau masukkan kelasmu.');
      return;
    }

    setErrorMsg('');
    onStartLearning(cleanName, finalClass);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        {/* Top Badges */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF0E6] border border-[#D6E2CE] text-[#3D4D2F] text-xs font-semibold shadow-2xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#7D8F69] animate-pulse" />
            <span>Platform Belajar Informatika Siswa SMP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2B2D42] tracking-tight font-['Space_Grotesk'] mb-3">
            Belajar IT
          </h1>
          <p className="text-base sm:text-lg text-[#6B705C] max-w-xl mx-auto leading-relaxed">
            Belajar, mencoba, dan praktik teknologi dengan cara yang menyenangkan.
          </p>
        </div>

        {/* Main Interactive Form Card */}
        <div className="bg-white rounded-3xl border border-[#EAE7DC] shadow-xl shadow-[#7D8F69]/5 p-6 sm:p-10 max-w-xl mx-auto relative overflow-hidden">
          {/* Subtle decoration accent */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#7D8F69]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#E8A87C]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#EAE7DC]">
              <div className="w-11 h-11 rounded-xl bg-[#EBF0E6] text-[#5E6F4B] flex items-center justify-center font-bold">
                <Laptop className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#2B2D42]">Mulai Sesi Belajarmu</h2>
                <p className="text-xs text-[#797E80]">Tanpa ribet akun & password. Cukup masukkan nama dan kelas.</p>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 animate-shake">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nama Lengkap Input */}
              <div>
                <label htmlFor="student-name-input" className="block text-xs font-bold uppercase tracking-wider text-[#4A4E69] mb-1.5">
                  Nama Lengkap Siswa <span className="text-[#D9824C]">*</span>
                </label>
                <input
                  id="student-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Contoh: Aisyah Putri Pratama"
                  className="w-full px-4 py-3 rounded-xl border border-[#D8D3C5] text-[#2B2D42] placeholder:text-[#9B9E93] focus:outline-none focus:ring-2 focus:ring-[#7D8F69] focus:border-transparent transition-all bg-[#FAF9F5] hover:bg-white text-sm"
                  autoFocus
                />
              </div>

              {/* Pilihan Kelas */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="student-class-select" className="block text-xs font-bold uppercase tracking-wider text-[#4A4E69]">
                    Kelas <span className="text-[#D9824C]">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomClass(!isCustomClass);
                      setStudentClass('');
                      setCustomClass('');
                    }}
                    className="text-xs text-[#7D8F69] hover:text-[#5E6F4B] font-semibold underline"
                  >
                    {isCustomClass ? 'Pilih dari daftar' : 'Kelas tidak ada di daftar?'}
                  </button>
                </div>

                {!isCustomClass ? (
                  <select
                    id="student-class-select"
                    value={studentClass}
                    onChange={(e) => {
                      setStudentClass(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-[#D8D3C5] text-[#2B2D42] focus:outline-none focus:ring-2 focus:ring-[#7D8F69] focus:border-transparent transition-all bg-[#FAF9F5] hover:bg-white text-sm cursor-pointer"
                  >
                    <option value="">-- Pilih Kelas --</option>
                    {CLASS_OPTIONS.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id="student-custom-class-input"
                    type="text"
                    value={customClass}
                    onChange={(e) => {
                      setCustomClass(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="Contoh: Kelas 7 Cordoba / Kelas 7 Madinah"
                    className="w-full px-4 py-3 rounded-xl border border-[#D8D3C5] text-[#2B2D42] placeholder:text-[#9B9E93] focus:outline-none focus:ring-2 focus:ring-[#7D8F69] focus:border-transparent transition-all bg-[#FAF9F5] hover:bg-white text-sm"
                  />
                )}
              </div>

              {/* Submit Button */}
              <button
                id="btn-start-learning"
                type="submit"
                className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#7D8F69] to-[#5E6F4B] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#7D8F69]/30 hover:from-[#6B7C57] hover:to-[#506040] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Mulai Belajar</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#EAE7DC] flex flex-wrap items-center justify-around gap-3 text-[#6B705C] text-xs">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7D8F69]" />
                Tanpa Login Rumit
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7D8F69]" />
                Nilai Kuis Otomatis
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7D8F69]" />
                Praktik Interaktif
              </span>
            </div>
          </div>
        </div>

        {/* Feature Cards Showcase */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#FAF9F5] rounded-2xl border border-[#EAE7DC] p-4 flex items-start gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-[#EBF0E6] text-[#5E6F4B] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#2B2D42]">Materi Terstruktur</h3>
              <p className="text-xs text-[#6B705C] mt-0.5">Disusun sesuai kurikulum informatika SMP dengan visual dan contoh kasus nyata.</p>
            </div>
          </div>

          <div className="bg-[#FAF9F5] rounded-2xl border border-[#EAE7DC] p-4 flex items-start gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-[#F0F1F6] text-[#4A4E69] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#2B2D42]">Kuis Penilaian Cepat</h3>
              <p className="text-xs text-[#6B705C] mt-0.5">Uji pemahamanmu secara langsung, hasil kuis otomatis terekam ke sistem guru.</p>
            </div>
          </div>

          <div className="bg-[#FAF9F5] rounded-2xl border border-[#EAE7DC] p-4 flex items-start gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-[#FDF4ED] text-[#D9824C] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#2B2D42]">Aktivitas Praktik</h3>
              <p className="text-xs text-[#6B705C] mt-0.5">Simulasi interaktif: sorting hardware, operator pencarian, dan simulator password.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer & Teacher Gateway */}
      <footer className="mt-12 text-center text-xs text-[#797E80] border-t border-[#EAE7DC] pt-6 max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© 2026 Belajar IT SMP. Media Pembelajaran Informatika.</p>
        <button
          id="btn-teacher-portal-link"
          onClick={onNavigateToTeacher}
          className="inline-flex items-center gap-1.5 text-[#4A4E69] hover:text-[#2B2D42] font-semibold transition-colors px-3 py-1.5 rounded-lg hover:bg-[#F4F1EA]"
        >
          <GraduationCap className="w-4 h-4 text-[#7D8F69]" />
          <span>Akses Portal / Dashboard Guru</span>
        </button>
      </footer>
    </div>
  );
};
