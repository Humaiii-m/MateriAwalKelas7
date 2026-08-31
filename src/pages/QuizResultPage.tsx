import React, { useEffect } from 'react';
import { QuizResult, TopicMaterial, StudentSession } from '../types';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  ArrowRight, 
  Wrench, 
  LayoutDashboard, 
  Sparkles, 
  HelpCircle,
  Clock,
  BookOpen
} from 'lucide-react';

interface QuizResultPageProps {
  result: QuizResult;
  topic: TopicMaterial;
  studentSession: StudentSession;
  onRetakeQuiz: (topicId: string) => void;
  onGoToPractice: (topicId: string) => void;
  onBackToDashboard: () => void;
}

export const QuizResultPage: React.FC<QuizResultPageProps> = ({
  result,
  topic,
  studentSession,
  onRetakeQuiz,
  onGoToPractice,
  onBackToDashboard
}) => {
  useEffect(() => {
    // Trigger celebration confetti
    if (result.score >= 70) {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  }, [result.score]);

  // Motivational feedback according to user specification
  const getFeedback = (score: number) => {
    if (score >= 90) {
      return {
        title: 'Hebat! Kamu sudah menguasai materi.',
        badge: 'Sempurna & Sangat Menguasai 🏆',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
      };
    } else if (score >= 75) {
      return {
        title: 'Bagus! Tinggal sedikit lagi untuk lebih mantap.',
        badge: 'Tuntas & Memuaskan ⭐',
        color: 'text-teal-700 bg-teal-50 border-teal-200'
      };
    } else if (score >= 60) {
      return {
        title: 'Sudah cukup baik. Coba pelajari kembali beberapa bagian.',
        badge: 'Cukup Baik 📖',
        color: 'text-amber-700 bg-amber-50 border-amber-200'
      };
    } else {
      return {
        title: 'Yuk pelajari kembali materinya dan coba lagi.',
        badge: 'Perlu Penguatan 🔄',
        color: 'text-rose-700 bg-rose-50 border-rose-200'
      };
    }
  };

  const feedback = getFeedback(result.score);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Main Result Card */}
      <div className="bg-white rounded-3xl border border-[#EAE7DC] shadow-xl shadow-[#4A4E69]/5 p-6 sm:p-10 text-center space-y-6 relative overflow-hidden">
        {/* Subtle accent light */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#7D8F69]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF0E6] border border-[#D6E2CE] text-[#5E6F4B] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#7D8F69]" />
            <span>Hasil Evaluasi Kuis Tersimpan Permanen</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2B2D42] tracking-tight font-['Space_Grotesk']">
            Quiz Selesai! 🎉
          </h1>

          <div className="text-xs text-[#797E80]">
            Materi: <span className="font-bold text-[#2B2D42]">{result.topicName}</span> • Siswa: <span className="font-bold text-[#2B2D42]">{result.studentName}</span> ({result.class})
          </div>

          {/* Big Score Display */}
          <div className="py-4">
            <div className="inline-block p-6 rounded-3xl bg-gradient-to-br from-[#2B2D42] via-[#3B4058] to-[#4A4E69] text-white shadow-xl shadow-[#4A4E69]/20">
              <div className="text-xs uppercase tracking-widest text-[#E8A87C] font-bold mb-1">Nilai Kamu</div>
              <div className="text-5xl sm:text-6xl font-extrabold font-['Space_Grotesk'] tracking-tight text-white">
                {result.score} <span className="text-2xl text-[#EAE7DC] font-normal">/ 100</span>
              </div>
              <div className="mt-2 text-xs text-[#EAE7DC] font-semibold">
                Jawaban benar: {result.correctAnswers} dari {result.totalQuestions} soal
              </div>
            </div>
          </div>

          {/* Motivational Feedback Banner */}
          <div className={`p-4 rounded-2xl border ${feedback.color} max-w-md mx-auto`}>
            <span className="text-xs font-bold uppercase tracking-wider block mb-1">{feedback.badge}</span>
            <p className="text-sm sm:text-base font-bold leading-relaxed">
              "{feedback.title}"
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="btn-result-practice"
              onClick={() => onGoToPractice(topic.id)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#FDF4ED] hover:bg-[#F9E6D8] text-[#7A3E1B] font-bold text-xs flex items-center justify-center gap-2 border border-[#F5D8C3] transition-colors cursor-pointer"
            >
              <Wrench className="w-4 h-4 text-[#D9824C]" />
              <span>Coba Aktivitas Praktik</span>
            </button>

            <button
              id="btn-result-retake"
              onClick={() => onRetakeQuiz(topic.id)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#FAF9F5] hover:bg-[#F4F1EA] text-[#4A4E69] font-bold text-xs flex items-center justify-center gap-2 border border-[#EAE7DC] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Ulangi Kuis</span>
            </button>

            <button
              id="btn-result-dashboard"
              onClick={onBackToDashboard}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#7D8F69] hover:bg-[#6B7C57] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#7D8F69]/25 transition-colors cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Kembali ke Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Answers Review Section */}
      {result.answersDetail && result.answersDetail.length > 0 && (
        <section className="bg-white rounded-3xl border border-[#EAE7DC] shadow-2xs p-6 sm:p-8 space-y-6">
          <div className="pb-3 border-b border-[#EAE7DC] flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#2B2D42] font-['Space_Grotesk']">Pembahasan Jawaban Soal</h2>
              <p className="text-xs text-[#797E80]">Pelajari penjelasan setiap butir soal untuk menambah pemahamanmu.</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF9F5] border border-[#EAE7DC] text-[#4A4E69]">
              {result.answersDetail.length} Butir Soal
            </span>
          </div>

          <div className="space-y-4">
            {result.answersDetail.map((detail, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  detail.isCorrect
                    ? 'bg-[#F2F6EE] border-[#D6E2CE]'
                    : 'bg-rose-50/60 border-rose-200/80'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#797E80]">Soal #{idx + 1}</span>
                    <h3 className="text-sm sm:text-base font-bold text-[#2B2D42] leading-snug">
                      {detail.questionText}
                    </h3>
                  </div>

                  <div className="shrink-0">
                    {detail.isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#3D4D2F] bg-[#EBF0E6] px-2.5 py-1 rounded-lg border border-[#D6E2CE]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7D8F69]" /> Benar
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100/80 px-2.5 py-1 rounded-lg">
                        <XCircle className="w-3.5 h-3.5" /> Kurang Tepat
                      </span>
                    )}
                  </div>
                </div>

                {/* Answers Breakdown */}
                <div className="mt-3 pt-3 border-t border-[#EAE7DC] space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-[#797E80] font-semibold min-w-[90px]">Jawabanmu:</span>
                    <span className={`font-semibold ${detail.isCorrect ? 'text-[#3D4D2F]' : 'text-rose-800'}`}>
                      {detail.selectedText}
                    </span>
                  </div>

                  {!detail.isCorrect && (
                    <div className="flex items-start gap-2">
                      <span className="text-[#5E6F4B] font-bold min-w-[90px]">Kunci Benar:</span>
                      <span className="text-[#2B2D42] font-bold">
                        {detail.correctText}
                      </span>
                    </div>
                  )}

                  {/* Explanation if matching question found */}
                  {topic.questions[idx]?.explanation && (
                    <div className="mt-2 p-3 bg-white rounded-xl border border-[#EAE7DC] text-[#4A4E69] leading-relaxed text-[11px] sm:text-xs">
                      <span className="font-bold text-[#2B2D42] block mb-0.5">💡 Penjelasan Konsep:</span>
                      {topic.questions[idx].explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
