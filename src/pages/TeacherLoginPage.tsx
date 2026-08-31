import React, { useState } from 'react';
import { TeacherUser } from '../types';
import { teacherLogin, teacherRegister } from '../services/api';
import { 
  GraduationCap, 
  Lock, 
  User, 
  ShieldCheck, 
  ArrowLeft, 
  Loader2, 
  AlertCircle, 
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';

interface TeacherLoginPageProps {
  onLoginSuccess: (user: TeacherUser) => void;
  onBackToStudent: () => void;
}

export const TeacherLoginPage: React.FC<TeacherLoginPageProps> = ({
  onLoginSuccess,
  onBackToStudent
}) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Username dan password wajib diisi.');
      return;
    }

    if (isRegisterMode && !displayName.trim()) {
      setErrorMsg('Nama lengkap guru wajib diisi.');
      return;
    }

    setIsLoading(true);

    try {
      if (isRegisterMode) {
        const res = await teacherRegister(username.trim(), password.trim(), displayName.trim());
        onLoginSuccess(res.user);
      } else {
        const res = await teacherLogin(username.trim(), password.trim());
        onLoginSuccess(res.user);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan saat masuk.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDefaultCredentials = () => {
    setUsername('guru');
    setPassword('guru123');
    setErrorMsg('');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Back Button */}
        <button
          id="btn-back-to-student-portal"
          onClick={onBackToStudent}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#4A4E69] hover:text-[#2B2D42] bg-[#FAF9F5] hover:bg-[#F4F1EA] px-3.5 py-2 rounded-xl border border-[#EAE7DC] shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Siswa</span>
        </button>

        {/* Login Container Card */}
        <div className="bg-white rounded-3xl border border-[#EAE7DC] shadow-xl shadow-[#4A4E69]/5 p-6 sm:p-8 space-y-6 relative overflow-hidden">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#4A4E69] text-white mx-auto flex items-center justify-center shadow-lg shadow-[#4A4E69]/25">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#2B2D42] tracking-tight font-['Space_Grotesk']">
              {isRegisterMode ? 'Daftar Akun Guru Baru' : 'Portal Dashboard Guru'}
            </h1>
            <p className="text-xs text-[#797E80]">
              {isRegisterMode 
                ? 'Buat kredensial akun guru untuk mengakses rekapan nilai siswa'
                : 'Masuk dengan kredensial guru untuk memantau perkembangan nilai siswa'}
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-[#FAF9F5] border border-[#EAE7DC] text-xs font-bold">
            <button
              type="button"
              onClick={() => { setIsRegisterMode(false); setErrorMsg(''); }}
              className={`py-2 rounded-lg transition-colors cursor-pointer ${
                !isRegisterMode ? 'bg-white text-[#4A4E69] shadow-2xs border border-[#EAE7DC]' : 'text-[#797E80] hover:text-[#2B2D42]'
              }`}
            >
              Masuk / Login
            </button>
            <button
              type="button"
              onClick={() => { setIsRegisterMode(true); setErrorMsg(''); }}
              className={`py-2 rounded-lg transition-colors cursor-pointer ${
                isRegisterMode ? 'bg-white text-[#4A4E69] shadow-2xs border border-[#EAE7DC]' : 'text-[#797E80] hover:text-[#2B2D42]'
              }`}
            >
              Registrasi Guru
            </button>
          </div>

          {/* Default Credentials Helper Callout */}
          {!isRegisterMode && (
            <div className="p-3.5 rounded-2xl bg-[#F0F1F6] border border-[#D9DCE8] text-[#2B2D42] text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold">
                <Info className="w-3.5 h-3.5 text-[#4A4E69] shrink-0" />
                <span>Akun Guru Bawaan (Default):</span>
              </div>
              <p className="text-[11px] text-[#4A4E69] leading-normal">
                Username: <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-[#D9DCE8]">guru</span> • 
                Password: <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-[#D9DCE8] ml-1">guru123</span>
              </p>
              <button
                type="button"
                onClick={fillDefaultCredentials}
                className="text-[11px] font-bold text-[#4A4E69] hover:text-[#2B2D42] underline cursor-pointer"
              >
                Klik di sini untuk isi otomatis
              </button>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegisterMode && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A4E69] mb-1">
                  Nama Lengkap Guru & Gelar <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8E9299] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Contoh: Budi Prasetyo, S.Kom."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D8D3C5] bg-[#FAF9F5] text-xs sm:text-sm text-[#2B2D42] focus:outline-none focus:ring-2 focus:ring-[#4A4E69]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A4E69] mb-1">
                Username Guru <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8E9299] absolute left-3.5 top-3.5" />
                <input
                  id="teacher-username-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D8D3C5] bg-[#FAF9F5] text-xs sm:text-sm text-[#2B2D42] focus:outline-none focus:ring-2 focus:ring-[#4A4E69]"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A4E69] mb-1">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8E9299] absolute left-3.5 top-3.5" />
                <input
                  id="teacher-password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D8D3C5] bg-[#FAF9F5] text-xs sm:text-sm text-[#2B2D42] focus:outline-none focus:ring-2 focus:ring-[#4A4E69]"
                />
              </div>
            </div>

            <button
              id="btn-teacher-submit"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#4A4E69] hover:bg-[#34384E] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#4A4E69]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isRegisterMode ? 'Daftar & Masuk' : 'Masuk ke Dashboard Guru'}</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-[#EAE7DC] text-center">
            <p className="text-[11px] text-[#797E80]">
              🔒 Keamanan Terjamin: Password dienkripsi menggunakan Bcrypt dan sesi diverifikasi dengan JWT token.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
