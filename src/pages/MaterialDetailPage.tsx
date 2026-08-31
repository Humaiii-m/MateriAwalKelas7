import React from 'react';
import { TopicMaterial } from '../types';
import { 
  ArrowLeft, 
  Target, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Wrench, 
  Clock, 
  ChevronRight,
  Lightbulb,
  Laptop,
  Globe,
  ShieldAlert,
  HardDrive,
  Layers,
  FolderTree,
  Network,
  Compass,
  ShieldCheck,
  Search,
  MessageSquareText,
  LockKeyhole,
  Footprints,
  AlertTriangle
} from 'lucide-react';

interface MaterialDetailPageProps {
  topic: TopicMaterial;
  onBack: () => void;
  onGoToQuiz: (topicId: string) => void;
  onGoToPractice: (topicId: string) => void;
}

export const MaterialDetailPage: React.FC<MaterialDetailPageProps> = ({
  topic,
  onBack,
  onGoToQuiz,
  onGoToPractice
}) => {
  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'FolderTree': return <FolderTree className="w-5 h-5" />;
      case 'Network': return <Network className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Search': return <Search className="w-5 h-5" />;
      case 'MessageSquareText': return <MessageSquareText className="w-5 h-5" />;
      case 'LockKeyhole': return <LockKeyhole className="w-5 h-5" />;
      case 'Footprints': return <Footprints className="w-5 h-5" />;
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumbs & Back Button */}
      <div className="flex items-center justify-between">
        <button
          id="btn-back-to-dashboard"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#4A4E69] hover:text-[#2B2D42] bg-[#FAF9F5] hover:bg-[#F4F1EA] px-3.5 py-2 rounded-xl border border-[#EAE7DC] shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onGoToPractice(topic.id)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FDF4ED] text-[#7A3E1B] hover:bg-[#F9E6D8] border border-[#F5D8C3] text-xs font-bold transition-colors cursor-pointer"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Praktik</span>
          </button>
          <button
            onClick={() => onGoToQuiz(topic.id)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7D8F69] hover:bg-[#6B7C57] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Mulai Kuis</span>
          </button>
        </div>
      </div>

      {/* Hero Header Banner */}
      <header className={`rounded-3xl p-6 sm:p-10 bg-gradient-to-r ${topic.color} text-white shadow-xl shadow-[#4A4E69]/10 relative overflow-hidden`}>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white">
              {topic.category}
            </span>
            <span className="text-xs text-white/90 font-medium flex items-center gap-1 bg-black/15 px-3 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              Estimasi {topic.estimatedTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Space_Grotesk'] leading-tight">
            {topic.title}
          </h1>

          <p className="text-sm sm:text-base text-white/95 leading-relaxed">
            {topic.subtitle}
          </p>
        </div>
      </header>

      {/* Section A: Tujuan Pembelajaran */}
      <section className="bg-white rounded-3xl border border-[#EAE7DC] p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#EAE7DC]">
          <div className="w-10 h-10 rounded-xl bg-[#EBF0E6] text-[#5E6F4B] flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#2B2D42]">A. Tujuan Pembelajaran</h2>
            <p className="text-xs text-[#797E80]">Target kemampuan yang akan kamu capai setelah mempelajari bab ini</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {topic.objectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF9F5] border border-[#EAE7DC]">
              <CheckCircle2 className="w-4 h-4 text-[#7D8F69] shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-[#4A4E69] font-medium leading-normal">{obj}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section B: Materi Utama & Contoh */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EBF0E6] text-[#5E6F4B] flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#2B2D42]">B. Materi Pembelajaran</h2>
            <p className="text-xs text-[#797E80]">Pahami konsep, komponen, dan contoh penerapannya</p>
          </div>
        </div>

        <div className="space-y-6">
          {topic.sections.map((section) => (
            <article
              key={section.id}
              className="bg-white rounded-3xl border border-[#EAE7DC] shadow-2xs p-6 sm:p-8 space-y-5 hover:border-[#D8D3C5] transition-colors"
            >
              {/* Section Subheading */}
              <div className="flex items-center gap-3 pb-3 border-b border-[#EAE7DC]">
                <div className="w-9 h-9 rounded-xl bg-[#EBF0E6] text-[#5E6F4B] flex items-center justify-center shrink-0">
                  {getSectionIcon(section.iconName)}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#2B2D42] font-['Space_Grotesk']">
                  {section.title}
                </h3>
              </div>

              {/* Summary */}
              <p className="text-sm text-[#2B2D42] leading-relaxed font-medium bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE7DC]">
                {section.summary}
              </p>

              {/* Detailed Points */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#797E80]">Poin Penjelasan Penting:</h4>
                <ul className="space-y-2">
                  {section.contentPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A4E69] leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7D8F69] shrink-0 mt-2" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Highlight Box */}
              {section.keyHighlight && (
                <div className="bg-[#F2F6EE] border border-[#D6E2CE] rounded-2xl p-4 flex items-start gap-3 text-[#3D4D2F]">
                  <Lightbulb className="w-5 h-5 text-[#7D8F69] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm font-medium leading-relaxed">
                    <span className="font-bold block text-[#2B2D42] mb-0.5">Catatan Penting:</span>
                    {section.keyHighlight}
                  </div>
                </div>
              )}

              {/* Example Case Study */}
              {section.exampleCase && (
                <div className="bg-[#FAF9F5] border border-[#EAE7DC] rounded-2xl p-4 sm:p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[#7D8F69] font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-[#7D8F69]" />
                    <span>{section.exampleCase.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A4E69] leading-relaxed italic">
                    "{section.exampleCase.scenario}"
                  </p>
                  <div className="text-xs font-semibold text-[#2B2D42] pt-1 border-t border-[#EAE7DC]">
                    💡 Pelajaran: {section.exampleCase.takeaway}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Section E & F: Bottom Action Bar */}
      <div className="bg-white rounded-3xl border border-[#EAE7DC] shadow-2xs p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[#2B2D42]">Sudah Selesai Membaca Materi?</h3>
          <p className="text-xs text-[#797E80] mt-0.5">
            Lanjutkan ke sesi kuis untuk menguji pemahaman atau coba simulasi praktik interaktif.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            id="btn-go-to-practice-bottom"
            onClick={() => onGoToPractice(topic.id)}
            className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-[#FDF4ED] hover:bg-[#F9E6D8] text-[#7A3E1B] font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#F5D8C3]"
          >
            <Wrench className="w-4 h-4 text-[#D9824C]" />
            <span>Lanjut ke Praktik</span>
          </button>

          <button
            id="btn-go-to-quiz-bottom"
            onClick={() => onGoToQuiz(topic.id)}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-[#7D8F69] to-[#5E6F4B] hover:from-[#6B7C57] hover:to-[#506040] text-white font-bold text-xs tracking-wide shadow-md shadow-[#7D8F69]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Lanjut ke Kuis</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
