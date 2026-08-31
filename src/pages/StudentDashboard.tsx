import React, { useState, useEffect } from 'react';
import { StudentSession, TopicMaterial, QuizResult } from '../types';
import { TOPIC_MATERIALS } from '../data/materialsData';
import { fetchStudentProgress } from '../services/api';
import { 
  Laptop, 
  Globe, 
  ShieldAlert, 
  BookOpen, 
  CheckCircle, 
  Circle, 
  Clock, 
  Award, 
  ArrowRight, 
  Sparkles,
  Zap,
  Wrench,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface StudentDashboardProps {
  studentSession: StudentSession;
  onSelectTopic: (topicId: string, action?: 'material' | 'quiz' | 'practice') => void;
  onSwitchStudent: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  studentSession,
  onSelectTopic,
  onSwitchStudent
}) => {
  const [progressList, setProgressList] = useState<QuizResult[]>([]);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadProgress() {
      setIsLoadingProgress(true);
      try {
        const results = await fetchStudentProgress(studentSession.name, studentSession.studentClass);
        if (isMounted) {
          setProgressList(results);
        }
      } catch (err) {
        console.warn('Error loading student progress:', err);
      } finally {
        if (isMounted) setIsLoadingProgress(false);
      }
    }

    loadProgress();
    return () => {
      isMounted = false;
    };
  }, [studentSession]);

  // Helper to get latest score for a topic
  const getTopicProgress = (topicId: string) => {
    const topicResults = progressList.filter(r => r.topicId === topicId);
    if (topicResults.length === 0) return null;
    // Return the highest or latest score
    return topicResults.reduce((prev, current) => (prev.score > current.score) ? prev : current);
  };

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Laptop className="w-6 h-6" />;
      case 'Globe':
        return <Globe className="w-6 h-6" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  // Calculate overall stats
  const completedCount = TOPIC_MATERIALS.filter(t => getTopicProgress(t.id) !== null).length;
  const overallPercentage = Math.round((completedCount / TOPIC_MATERIALS.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Personalized Welcome Hero Card */}
      <section className="bg-gradient-to-r from-[#4A4E69] via-[#353B3C] to-[#2B2D42] rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-[#4A4E69]/15 relative overflow-hidden">
        {/* Background decorative shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7D8F69]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#E8A87C]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-xs font-semibold text-[#FAF9F5]">
              <Sparkles className="w-3.5 h-3.5 text-[#E8A87C]" />
              <span>Sesi Belajar Aktif</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
              Halo, {studentSession.name}! 👋
            </h1>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[#EAE7DC] text-sm">
              <span className="bg-white/20 px-3 py-0.5 rounded-lg font-bold text-white">
                {studentSession.studentClass}
              </span>
              <span>•</span>
              <span>Pilih materi di bawah untuk mulai belajar atau mengerjakan kuis</span>
            </div>
          </div>

          {/* Quick Progress Widget */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 text-center min-w-[200px] shrink-0 self-stretch sm:self-auto">
            <div className="text-xs font-medium text-[#EAE7DC] mb-1">Materi Selesai</div>
            <div className="text-3xl font-extrabold text-white">
              {completedCount} <span className="text-lg font-normal text-[#EAE7DC]/80">/ {TOPIC_MATERIALS.length}</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#7D8F69] h-full rounded-full transition-all duration-700"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
            <p className="text-[11px] text-[#EAE7DC] mt-2 font-medium">
              {overallPercentage === 100 ? '🎉 Semua materi tuntas!' : `${overallPercentage}% Selesai`}
            </p>
          </div>
        </div>
      </section>

      {/* Material Selection Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#2B2D42] tracking-tight">Pilih Materi Pembelajaran</h2>
            <p className="text-xs text-[#6B705C]">Materi resmi Informatika SMP dengan pembelajaran, kuis, dan simulasi praktik.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOPIC_MATERIALS.map((topic, index) => {
            const result = getTopicProgress(topic.id);
            const isCompleted = result !== null;

            return (
              <div
                key={topic.id}
                id={`material-card-${topic.id}`}
                className="bg-white rounded-3xl border border-[#EAE7DC] shadow-sm hover:shadow-md hover:border-[#D8D3C5] transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Card Header Strip */}
                  <div className={`p-5 bg-gradient-to-br ${topic.color} text-white relative overflow-hidden`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-black/20 backdrop-blur-xs px-2.5 py-1 rounded-md text-white/95">
                        {topic.category}
                      </span>
                      <span className="text-xs text-white/85 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {topic.estimatedTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                        {getTopicIcon(topic.icon)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold leading-snug tracking-tight font-['Space_Grotesk']">
                          {index + 1}. {topic.title}
                        </h3>
                        <p className="text-xs text-white/85 line-clamp-1">{topic.badge}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4">
                    <p className="text-xs text-[#6B705C] leading-relaxed min-h-[38px]">
                      {topic.subtitle}
                    </p>

                    {/* Learning Status Tag */}
                    <div className="pt-3 border-t border-[#EAE7DC] flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#797E80]">Status Belajar:</span>
                      {isCompleted ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBF0E6] text-[#3D4D2F] text-xs font-bold border border-[#D6E2CE]">
                          <CheckCircle className="w-3.5 h-3.5 text-[#7D8F69]" />
                          <span>Selesai (Nilai: {result.score})</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF9F5] text-[#797E80] text-xs font-medium border border-[#EAE7DC]">
                          <Circle className="w-3 h-3 text-[#9B9E93]" />
                          <span>Belum dikerjakan</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 grid grid-cols-3 gap-2">
                  <button
                    id={`btn-learn-${topic.id}`}
                    onClick={() => onSelectTopic(topic.id, 'material')}
                    className="col-span-1 py-2 px-2 rounded-xl bg-[#EBF0E6] hover:bg-[#DCE6D6] text-[#3D4D2F] font-bold text-xs flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer border border-[#D6E2CE]"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Materi</span>
                  </button>

                  <button
                    id={`btn-quiz-${topic.id}`}
                    onClick={() => onSelectTopic(topic.id, 'quiz')}
                    className="col-span-1 py-2 px-2 rounded-xl bg-[#F0F1F6] hover:bg-[#E2E4EE] text-[#4A4E69] font-bold text-xs flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer border border-[#D9DCE8]"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Kuis</span>
                  </button>

                  <button
                    id={`btn-practice-${topic.id}`}
                    onClick={() => onSelectTopic(topic.id, 'practice')}
                    className="col-span-1 py-2 px-2 rounded-xl bg-[#FDF4ED] hover:bg-[#F9E6D8] text-[#7A3E1B] font-bold text-xs flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer border border-[#F5D8C3]"
                  >
                    <Wrench className="w-4 h-4" />
                    <span>Praktik</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 9: Progress Belajarku */}
      <section id="section-student-progress" className="bg-white rounded-3xl border border-[#EAE7DC] shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE7DC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF0E6] text-[#5E6F4B] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#2B2D42]">Progress Belajarku</h2>
              <p className="text-xs text-[#797E80]">Rekapitulasi pencapaian nilai kuis untuk siswa: {studentSession.name} ({studentSession.studentClass})</p>
            </div>
          </div>

          <button
            onClick={() => {
              // Quick reload progress
              fetchStudentProgress(studentSession.name, studentSession.studentClass).then(setProgressList);
            }}
            className="text-xs text-[#7D8F69] hover:text-[#5E6F4B] font-bold underline self-start sm:self-auto cursor-pointer"
          >
            Segarkan Nilai
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TOPIC_MATERIALS.map((topic) => {
            const result = getTopicProgress(topic.id);
            const isCompleted = result !== null;

            return (
              <div
                key={topic.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-[#F2F6EE] border-[#D6E2CE]'
                    : 'bg-[#FAF9F5] border-[#EAE7DC]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-xs text-[#797E80] font-medium">{topic.badge}</span>
                    <h4 className="text-sm font-bold text-[#2B2D42]">{topic.title}</h4>
                  </div>
                  {isCompleted ? (
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-[#3D4D2F] font-['Space_Grotesk']">
                        {result.score}
                      </span>
                      <span className="text-xs text-[#797E80] block">/ 100</span>
                    </div>
                  ) : (
                    <span className="text-xs text-[#9B9E93] font-semibold">-</span>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#EAE7DC] flex items-center justify-between text-xs">
                  <span className="text-[#797E80] font-medium">Status:</span>
                  {isCompleted ? (
                    <span className="text-[#3D4D2F] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7D8F69]" />
                      Selesai ({result.correctAnswers}/{result.totalQuestions} Benar)
                    </span>
                  ) : (
                    <span className="text-[#797E80] font-medium flex items-center gap-1">
                      <Circle className="w-3.5 h-3.5 text-[#9B9E93]" />
                      Belum dikerjakan
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Next Step Encouragement Callout */}
      <section className="bg-gradient-to-r from-[#2B2D42] via-[#353B3C] to-[#4A4E69] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-bold">Siap Menambah Wawasan Teknologi Hari Ini?</h3>
          <p className="text-xs text-[#EAE7DC] max-w-xl">
            Pelajari setiap materi dengan seksama, kerjakan kuis untuk mengukur pemahamanmu, dan lakukan simulasi praktik untuk mengasah keterampilan digital.
          </p>
        </div>

        <button
          onClick={() => onSelectTopic(TOPIC_MATERIALS[0].id, 'material')}
          className="px-6 py-3 rounded-xl bg-[#7D8F69] hover:bg-[#6B7C57] text-white font-bold text-xs tracking-wide shrink-0 flex items-center gap-2 shadow-md shadow-[#7D8F69]/30 transition-all cursor-pointer"
        >
          <span>Mulai Materi Pertama</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
