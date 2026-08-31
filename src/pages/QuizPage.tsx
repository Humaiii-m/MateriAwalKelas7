import React, { useState } from 'react';
import { TopicMaterial, StudentSession, QuizResult, QuizAnswerDetail } from '../types';
import { submitQuizScore } from '../services/api';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  Clock,
  Sparkles,
  Loader2
} from 'lucide-react';

interface QuizPageProps {
  topic: TopicMaterial;
  studentSession: StudentSession;
  onBackToMaterial: () => void;
  onQuizFinished: (result: QuizResult) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  topic,
  studentSession,
  onBackToMaterial,
  onQuizFinished
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const questions = topic.questions;
  const currentQuestion = questions[currentIdx];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === totalQuestions;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (optionIdx: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: optionIdx
    }));
    if (validationError) setValidationError('');
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!isAllAnswered) {
      setValidationError(`Masih ada ${totalQuestions - answeredCount} soal yang belum dijawab. Harap jawab semua soal sebelum mengirim.`);
      return;
    }

    setIsSubmitting(true);
    setValidationError('');

    // Calculate score
    let correctCount = 0;
    const answersDetail: QuizAnswerDetail[] = [];

    questions.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount++;

      answersDetail.push({
        questionId: q.id,
        questionText: q.question,
        selectedOption: selected,
        correctOption: q.correctIndex,
        isCorrect,
        selectedText: q.options[selected] || 'Tidak dijawab',
        correctText: q.options[q.correctIndex]
      });
    });

    const calculatedScore = Math.round((correctCount / totalQuestions) * 100);

    const payload = {
      studentName: studentSession.name,
      studentClass: studentSession.studentClass,
      topicId: topic.id,
      topicName: topic.title,
      score: calculatedScore,
      correctAnswers: correctCount,
      totalQuestions: totalQuestions,
      percentage: calculatedScore,
      answersDetail
    };

    try {
      const savedResult = await submitQuizScore(payload);
      onQuizFinished(savedResult);
    } catch (err) {
      console.error('Quiz submission failed:', err);
      // Construct fallback result
      const fallback: QuizResult = {
        id: `res_${Date.now()}`,
        studentName: studentSession.name,
        class: studentSession.studentClass,
        topicId: topic.id,
        topicName: topic.title,
        score: calculatedScore,
        correctAnswers: correctCount,
        totalQuestions: totalQuestions,
        percentage: calculatedScore,
        submittedAt: new Date().toISOString(),
        answersDetail
      };
      onQuizFinished(fallback);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToMaterial}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#4A4E69] hover:text-[#2B2D42] bg-[#FAF9F5] hover:bg-[#F4F1EA] px-3.5 py-2 rounded-xl border border-[#EAE7DC] shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Materi</span>
        </button>

        <div className="text-right">
          <span className="text-xs font-semibold text-[#797E80]">Materi: {topic.title}</span>
          <div className="text-xs text-[#7D8F69] font-bold">
            Siswa: {studentSession.name} ({studentSession.studentClass})
          </div>
        </div>
      </div>

      {/* Progress & Question Navigation Stepper */}
      <div className="bg-white rounded-3xl border border-[#EAE7DC] p-4 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-[#2B2D42]">
            Soal <span className="text-[#7D8F69] text-sm">{currentIdx + 1}</span> dari {totalQuestions}
          </span>
          <span className="text-[#797E80]">
            {answeredCount} dari {totalQuestions} Dijawab ({progressPercent}%)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#FAF9F5] border border-[#EAE7DC] h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#7D8F69] h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Quick Question Selector Pills */}
        <div className="flex items-center justify-center gap-2 pt-2 border-t border-[#EAE7DC] flex-wrap">
          {questions.map((_, i) => {
            const isCurrent = i === currentIdx;
            const isAnswered = selectedAnswers[i] !== undefined;

            return (
              <button
                key={i}
                id={`btn-question-pill-${i}`}
                onClick={() => setCurrentIdx(i)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  isCurrent
                    ? 'bg-[#7D8F69] text-white ring-2 ring-[#7D8F69]/30 shadow-xs'
                    : isAnswered
                    ? 'bg-[#EBF0E6] text-[#3D4D2F] border border-[#D6E2CE]'
                    : 'bg-[#FAF9F5] text-[#4A4E69] hover:bg-[#F4F1EA] border border-[#EAE7DC]'
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border border-[#EAE7DC] shadow-2xs p-6 sm:p-8 space-y-6">
        {/* Question Text */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF0E6] text-[#5E6F4B] text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pertanyaan Pilihan Ganda #{currentIdx + 1}</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#2B2D42] leading-relaxed font-['Space_Grotesk']">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQuestion.options.map((optionText, optIdx) => {
            const isSelected = selectedAnswers[currentIdx] === optIdx;
            const optionLetters = ['A', 'B', 'C', 'D', 'E'];

            return (
              <button
                key={optIdx}
                id={`option-${currentIdx}-${optIdx}`}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#F2F6EE] border-[#7D8F69] ring-2 ring-[#7D8F69]/20 text-[#2B2D42] font-semibold shadow-xs'
                    : 'bg-[#FAF9F5] hover:bg-[#F4F1EA] border-[#EAE7DC] text-[#4A4E69] font-medium'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isSelected ? 'bg-[#7D8F69] text-white' : 'bg-[#EAE7DC] text-[#4A4E69]'
                  }`}
                >
                  {optionLetters[optIdx]}
                </div>
                <span className="text-xs sm:text-sm leading-relaxed mt-0.5">{optionText}</span>
              </button>
            );
          })}
        </div>

        {/* Validation error notice */}
        {validationError && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#EAE7DC]">
          <button
            id="btn-prev-question"
            onClick={handlePrev}
            disabled={currentIdx === 0 || isSubmitting}
            className="px-4 py-2.5 rounded-xl border border-[#EAE7DC] text-[#4A4E69] font-bold text-xs hover:bg-[#FAF9F5] disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {currentIdx < totalQuestions - 1 ? (
            <button
              id="btn-next-question"
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-[#7D8F69] hover:bg-[#6B7C57] text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="btn-submit-quiz"
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-xl font-bold text-xs tracking-wide transition-all flex items-center gap-2 shadow-md cursor-pointer ${
                isAllAnswered
                  ? 'bg-gradient-to-r from-[#7D8F69] to-[#5E6F4B] hover:from-[#6B7C57] hover:to-[#506040] text-white shadow-[#7D8F69]/25 active:scale-[0.99]'
                  : 'bg-[#EAE7DC] text-[#8E9299] cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan Nilai ke Database...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Kirim Jawaban Kuis</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
