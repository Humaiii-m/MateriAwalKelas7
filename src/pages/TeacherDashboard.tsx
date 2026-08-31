import React, { useState, useEffect } from 'react';
import { TeacherUser, QuizResult, TeacherStats } from '../types';
import { CLASS_OPTIONS, TOPIC_MATERIALS } from '../data/materialsData';
import { 
  fetchTeacherQuizResults, 
  fetchTeacherStats, 
  deleteQuizResult, 
  downloadCsvExport 
} from '../services/api';
import { 
  GraduationCap, 
  Users, 
  FileCheck, 
  TrendingUp, 
  Award, 
  Search, 
  Download, 
  RefreshCw, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  X, 
  Filter, 
  LogOut,
  Calendar,
  Layers,
  ArrowUpDown,
  BookOpen
} from 'lucide-react';

interface TeacherDashboardProps {
  teacherUser: TeacherUser;
  onLogout: () => void;
  onGoToStudentMode: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teacherUser,
  onLogout,
  onGoToStudentMode
}) => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [stats, setStats] = useState<TeacherStats>({
    totalStudents: 0,
    totalQuizzesTaken: 0,
    averageScore: 0,
    passingRate: 0
  });

  const [isLoading, setIsLoading] = useState(true);
  const [filterClass, setFilterClass] = useState('ALL');
  const [filterTopic, setFilterTopic] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Detail Modal State
  const [selectedResult, setSelectedResult] = useState<QuizResult | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [fetchedResults, fetchedStats] = await Promise.all([
        fetchTeacherQuizResults({
          class: filterClass,
          topicId: filterTopic,
          search: searchQuery
        }),
        fetchTeacherStats()
      ]);
      setResults(fetchedResults);
      setStats(fetchedStats);
    } catch (err) {
      console.error('Error fetching teacher data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filterClass, filterTopic]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const handleDelete = async (id: string, studentName: string) => {
    if (window.confirm(`Yakin ingin menghapus rekaman nilai kuis untuk siswa "${studentName}"?`)) {
      try {
        await deleteQuizResult(id);
        setResults(prev => prev.filter(r => r.id !== id));
        // Refresh stats
        const updatedStats = await fetchTeacherStats();
        setStats(updatedStats);
      } catch (err: any) {
        alert('Gagal menghapus: ' + err.message);
      }
    }
  };

  const handleExportCsv = () => {
    downloadCsvExport({
      class: filterClass,
      topicId: filterTopic
    });
  };

  // Score Badge Styling
  const getScoreBadge = (score: number) => {
    if (score >= 85) {
      return 'bg-[#EBF0E6] text-[#3D4D2F] border border-[#D6E2CE]';
    } else if (score >= 75) {
      return 'bg-[#F2F6EE] text-[#5E6F4B] border border-[#D6E2CE]';
    } else if (score >= 60) {
      return 'bg-[#FDF4ED] text-[#7A3E1B] border border-[#F5D8C3]';
    } else {
      return 'bg-rose-50 text-rose-700 border border-rose-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Teacher Header */}
      <div className="bg-white rounded-3xl border border-[#EAE7DC] shadow-sm p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF0E6] border border-[#D6E2CE] text-[#5E6F4B] text-xs font-bold">
            <GraduationCap className="w-4 h-4 text-[#7D8F69]" />
            <span>Dashboard Penilaian Informatika SMP</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2B2D42] tracking-tight font-['Space_Grotesk']">
            Selamat Datang, {teacherUser.displayName || teacherUser.username}
          </h1>
          <p className="text-xs sm:text-sm text-[#797E80]">
            Pantau hasil belajar, ketuntasan kuis, dan data submission siswa secara real-time dari Firestore.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onGoToStudentMode}
            className="px-4 py-2.5 rounded-xl bg-[#FAF9F5] hover:bg-[#F4F1EA] text-[#4A4E69] font-bold text-xs border border-[#EAE7DC] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Tinjau Mode Siswa</span>
          </button>

          <button
            id="btn-teacher-export-csv"
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-xl bg-[#7D8F69] hover:bg-[#6B7C57] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Nilai (CSV)</span>
          </button>

          <button
            onClick={onLogout}
            className="px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl border border-[#EAE7DC] p-5 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F0F1F6] text-[#4A4E69] flex items-center justify-center font-bold shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#797E80] block">Total Siswa Terdaftar</span>
            <span className="text-2xl font-extrabold text-[#2B2D42] font-['Space_Grotesk']">
              {stats.totalStudents}
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl border border-[#EAE7DC] p-5 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF4ED] text-[#D9824C] flex items-center justify-center font-bold shrink-0">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#797E80] block">Total Kuis Dikerjakan</span>
            <span className="text-2xl font-extrabold text-[#2B2D42] font-['Space_Grotesk']">
              {stats.totalQuizzesTaken}
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl border border-[#EAE7DC] p-5 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF0E6] text-[#7D8F69] flex items-center justify-center font-bold shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#797E80] block">Rata-rata Nilai</span>
            <span className="text-2xl font-extrabold text-[#2B2D42] font-['Space_Grotesk']">
              {stats.averageScore} <span className="text-sm font-normal text-[#8E9299]">/ 100</span>
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl border border-[#EAE7DC] p-5 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF4ED] text-[#D9824C] flex items-center justify-center font-bold shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#797E80] block">Ketuntasan (≥ KKM 75)</span>
            <span className="text-2xl font-extrabold text-[#2B2D42] font-['Space_Grotesk']">
              {stats.passingRate}%
            </span>
          </div>
        </div>
      </section>

      {/* Main Table Card with Filters */}
      <section className="bg-white rounded-3xl border border-[#EAE7DC] shadow-sm overflow-hidden">
        {/* Filter Toolbar */}
        <div className="p-6 border-b border-[#EAE7DC] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#7D8F69]" />
              <h2 className="text-base font-bold text-[#2B2D42]">Filter & Rekap Nilai Siswa</h2>
            </div>

            <button
              onClick={loadData}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 text-xs text-[#7D8F69] hover:text-[#5E6F4B] font-semibold cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Segarkan Data</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {/* Filter Kelas */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#797E80] mb-1">
                Filter Kelas
              </label>
              <select
                id="filter-class-select"
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#EAE7DC] text-xs font-medium bg-[#FAF9F5] text-[#2B2D42] focus:outline-none focus:ring-2 focus:ring-[#7D8F69]"
              >
                <option value="ALL">Semua Kelas</option>
                {CLASS_OPTIONS.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Filter Materi */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#797E80] mb-1">
                Filter Materi IT
              </label>
              <select
                id="filter-topic-select"
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#EAE7DC] text-xs font-medium bg-[#FAF9F5] text-[#2B2D42] focus:outline-none focus:ring-2 focus:ring-[#7D8F69]"
              >
                <option value="ALL">Semua Materi</option>
                {TOPIC_MATERIALS.map(m => (
                  <option key={m.id} value={m.id}>{m.title}</option>
                ))}
              </select>
            </div>

            {/* Search Nama Siswa */}
            <div className="sm:col-span-1 lg:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#797E80] mb-1">
                Cari Nama Siswa
              </label>
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-[#8E9299] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ketik nama siswa..."
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#EAE7DC] text-xs text-[#2B2D42] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#7D8F69]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#7D8F69] hover:bg-[#6B7C57] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cari
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF9F5] border-b border-[#EAE7DC] text-[#797E80] font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4 sm:px-6">No</th>
                <th className="py-3.5 px-4 sm:px-6">Nama Siswa</th>
                <th className="py-3.5 px-4">Kelas</th>
                <th className="py-3.5 px-4">Materi</th>
                <th className="py-3.5 px-4 text-center">Nilai</th>
                <th className="py-3.5 px-4 text-center">Benar / Soal</th>
                <th className="py-3.5 px-4 sm:px-6">Waktu Pengerjaan</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE7DC]">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#797E80]">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#7D8F69] mb-2" />
                    <span>Memuat data nilai...</span>
                  </td>
                </tr>
              ) : results.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#8E9299]">
                    <FileCheck className="w-8 h-8 mx-auto text-[#D8D3C5] mb-2" />
                    <p className="font-semibold text-[#4A4E69]">Belum ada data kuis yang sesuai filter.</p>
                    <p className="text-[11px] text-[#797E80] mt-1">Siswa yang menyelesaikan kuis akan otomatis tercatat di tabel ini.</p>
                  </td>
                </tr>
              ) : (
                results.map((item, index) => {
                  const dateFormatted = new Date(item.submittedAt).toLocaleString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <tr key={item.id} className="hover:bg-[#FAF9F5] transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 text-[#8E9299] font-mono">{index + 1}</td>
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-[#2B2D42]">{item.studentName}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-[#FAF9F5] border border-[#EAE7DC] text-[#4A4E69] font-bold text-[11px]">
                          {item.class}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#4A4E69] font-medium">{item.topicName}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-lg font-bold font-['Space_Grotesk'] text-xs ${getScoreBadge(item.score)}`}>
                          {item.score}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-medium text-[#4A4E69]">
                        {item.correctAnswers} / {item.totalQuestions}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-[#797E80] flex items-center gap-1.5 mt-2 sm:mt-0">
                        <Calendar className="w-3 h-3 text-[#8E9299] shrink-0" />
                        <span>{dateFormatted}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setSelectedResult(item)}
                            title="Lihat Rincian Jawaban Siswa"
                            className="p-1.5 text-[#4A4E69] hover:text-[#2B2D42] hover:bg-[#F0F1F6] rounded-lg transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.studentName)}
                            title="Hapus Nilai"
                            className="p-1.5 text-[#8E9299] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Student Quiz Detail Modal (Section 13) */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2D42]/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-[#EAE7DC] space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#EAE7DC]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D8F69]">Detail Hasil Pengerjaan Kuis</span>
                <h3 className="text-xl font-bold text-[#2B2D42] font-['Space_Grotesk']">
                  {selectedResult.studentName} ({selectedResult.class})
                </h3>
              </div>

              <button
                onClick={() => setSelectedResult(null)}
                className="p-2 text-[#797E80] hover:text-[#2B2D42] hover:bg-[#FAF9F5] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Highlight Box */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF9F5] p-4 rounded-2xl border border-[#EAE7DC] text-center">
              <div>
                <span className="text-[11px] text-[#797E80] font-bold block">Materi</span>
                <span className="text-xs font-bold text-[#2B2D42]">{selectedResult.topicName}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#797E80] font-bold block">Nilai Akhir</span>
                <span className="text-lg font-extrabold text-[#7D8F69] font-['Space_Grotesk']">
                  {selectedResult.score} / 100
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[#797E80] font-bold block">Jawaban Benar</span>
                <span className="text-xs font-bold text-[#3D4D2F]">
                  {selectedResult.correctAnswers} dari {selectedResult.totalQuestions} soal
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[#797E80] font-bold block">Waktu Submit</span>
                <span className="text-xs font-medium text-[#4A4E69]">
                  {new Date(selectedResult.submittedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* Detailed Questions List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A4E69]">
                Rincian Jawaban Butir Soal:
              </h4>

              {selectedResult.answersDetail && selectedResult.answersDetail.length > 0 ? (
                <div className="space-y-3">
                  {selectedResult.answersDetail.map((ans, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border text-xs space-y-2 ${
                        ans.isCorrect ? 'bg-[#F2F6EE] border-[#D6E2CE]' : 'bg-rose-50/60 border-rose-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-[#2B2D42]">
                          {idx + 1}. {ans.questionText}
                        </span>
                        {ans.isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3D4D2F] bg-[#EBF0E6] border border-[#D6E2CE] px-2 py-0.5 rounded-md shrink-0">
                            <CheckCircle2 className="w-3 h-3 text-[#7D8F69]" /> Benar
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md shrink-0">
                            <XCircle className="w-3 h-3" /> Salah
                          </span>
                        )}
                      </div>

                      <div className="pt-2 border-t border-[#EAE7DC] space-y-1">
                        <div>
                          <span className="text-[#797E80] font-semibold mr-1.5">Pilihan Siswa:</span>
                          <span className={`font-semibold ${ans.isCorrect ? 'text-[#3D4D2F]' : 'text-rose-800'}`}>
                            {ans.selectedText}
                          </span>
                        </div>
                        {!ans.isCorrect && (
                          <div>
                            <span className="text-[#5E6F4B] font-bold mr-1.5">Kunci Benar:</span>
                            <span className="text-[#2B2D42] font-bold">
                              {ans.correctText}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#8E9299] italic">Rincian jawaban tidak tersedia untuk data ini.</p>
              )}
            </div>

            {/* Modal Close Button */}
            <div className="pt-4 border-t border-[#EAE7DC] flex justify-end">
              <button
                onClick={() => setSelectedResult(null)}
                className="px-5 py-2.5 rounded-xl bg-[#4A4E69] hover:bg-[#34384E] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Tutup Rincian
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
