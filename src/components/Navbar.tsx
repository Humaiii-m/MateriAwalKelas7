import React from 'react';
import { StudentSession, TeacherUser } from '../types';
import { 
  Laptop, 
  BookOpen, 
  Award, 
  UserCheck, 
  LogOut, 
  GraduationCap, 
  Shield, 
  Sparkles,
  LayoutDashboard,
  HelpCircle,
  Wrench
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, topicId?: string) => void;
  studentSession: StudentSession | null;
  onStudentLogout: () => void;
  teacherUser: TeacherUser | null;
  onTeacherLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  studentSession,
  onStudentLogout,
  teacherUser,
  onTeacherLogout
}) => {
  const isTeacherView = currentView.startsWith('teacher');

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#EAE7DC] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => {
              if (teacherUser && isTeacherView) {
                onNavigate('teacher-dashboard');
              } else if (studentSession) {
                onNavigate('student-dashboard');
              } else {
                onNavigate('welcome');
              }
            }}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            id="nav-logo-btn"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7D8F69] to-[#5E6F4B] flex items-center justify-center text-white shadow-md shadow-[#7D8F69]/20 group-hover:scale-105 transition-transform">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-[#2B2D42] tracking-tight font-['Space_Grotesk']">
                  Belajar IT
                </span>
                <span className="bg-[#EBF0E6] text-[#3D4D2F] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#D6E2CE]">
                  SMP
                </span>
              </div>
              <p className="text-xs text-[#797E80] hidden sm:block">Media Pembelajaran Informatika Interaktif</p>
            </div>
          </button>

          {/* Navigation Links for Student Mode */}
          {studentSession && !isTeacherView && (
            <nav className="hidden md:flex items-center gap-1">
              <button
                id="nav-link-dashboard"
                onClick={() => onNavigate('student-dashboard')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === 'student-dashboard'
                    ? 'bg-[#EBF0E6] text-[#3D4D2F] font-semibold'
                    : 'text-[#4A4E69] hover:text-[#2B2D42] hover:bg-[#F4F1EA]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>

              <button
                id="nav-link-materials"
                onClick={() => onNavigate('student-dashboard')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView.startsWith('material')
                    ? 'bg-[#EBF0E6] text-[#3D4D2F] font-semibold'
                    : 'text-[#4A4E69] hover:text-[#2B2D42] hover:bg-[#F4F1EA]'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Materi IT
              </button>

              <button
                id="nav-link-progress"
                onClick={() => {
                  onNavigate('student-dashboard');
                  setTimeout(() => {
                    document.getElementById('section-student-progress')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#4A4E69] hover:text-[#2B2D42] hover:bg-[#F4F1EA] transition-colors flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                Progress Belajar
              </button>
            </nav>
          )}

          {/* Right Action Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Student Session Badge */}
            {studentSession && !isTeacherView && (
              <div className="flex items-center gap-2 bg-[#F4F1EA] border border-[#EAE7DC] rounded-full py-1 px-3">
                <div className="w-6 h-6 rounded-full bg-[#7D8F69] text-white flex items-center justify-center text-xs font-bold">
                  {studentSession.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-[#2B2D42] hidden sm:inline">{studentSession.name}</span>
                  <span className="text-[#6B705C] font-medium ml-1">({studentSession.studentClass})</span>
                </div>
                <button
                  id="btn-logout-student"
                  onClick={onStudentLogout}
                  title="Ganti Identitas / Keluar Sesi"
                  className="text-[#8E9299] hover:text-rose-600 p-1 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Teacher View Badge or Link */}
            {teacherUser ? (
              <div className="flex items-center gap-2">
                <button
                  id="btn-teacher-dash-nav"
                  onClick={() => onNavigate('teacher-dashboard')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isTeacherView
                      ? 'bg-[#4A4E69] text-white shadow-xs'
                      : 'bg-[#F0F1F6] text-[#4A4E69] hover:bg-[#E2E4EE]'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Portal Guru: {teacherUser.displayName || teacherUser.username}</span>
                </button>

                <button
                  id="btn-teacher-logout"
                  onClick={onTeacherLogout}
                  title="Keluar Akun Guru"
                  className="p-2 text-[#797E80] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="btn-nav-teacher-login"
                onClick={() => onNavigate('teacher-login')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isTeacherView
                    ? 'bg-[#2B2D42] text-white'
                    : 'bg-[#F4F1EA] text-[#4A4E69] hover:bg-[#EAE7DC]'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-[#7D8F69]" />
                <span>Portal Guru</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
