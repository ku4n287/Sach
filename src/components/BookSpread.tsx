import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Shield,
  Layers,
  FileText,
  Video,
} from 'lucide-react';
import { BookModelItem } from '../types.ts';
import { soundManager, SpeechNarrator } from '../utils/audio.ts';

interface BookSpreadProps {
  model: BookModelItem;
  currentPageIndex: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  flipDirection: 'next' | 'prev' | 'none';
}

export const BookSpread: React.FC<BookSpreadProps> = ({
  model,
  currentPageIndex,
  totalPages,
  onNext,
  onPrev,
  flipDirection,
}) => {
  // Trạng thái mở khối: 'meaning' hoặc 'application' hoặc null.
  // Mặc định ẩn nội dung, chỉ hiện tiêu đề; khi bấm vào một khối thì khối kia tự đóng.
  const [activeSection, setActiveSection] = useState<'meaning' | 'application' | null>('meaning');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Dừng đọc thuyết minh khi lật sang trang khác
  useEffect(() => {
    SpeechNarrator.stop();
    setIsSpeaking(false);
  }, [model.id]);

  const handleToggleSection = (section: 'meaning' | 'application') => {
    soundManager.playClick();
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  const handleToggleSpeech = (textToRead: string) => {
    if (isSpeaking) {
      SpeechNarrator.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      SpeechNarrator.speak(textToRead, () => {
        setIsSpeaking(false);
      });
    }
  };

  return (
    <div
      className={`relative w-full max-w-7xl mx-auto min-h-[640px] md:min-h-[700px] bg-[#0c2317] rounded-2xl md:rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(16,78,41,0.35)] border border-amber-500/30 overflow-hidden flex flex-col justify-between p-4 md:p-8 select-none transition-all duration-500 ${
        flipDirection === 'next'
          ? 'animate-page-flip-right'
          : flipDirection === 'prev'
          ? 'animate-page-flip-left'
          : ''
      }`}
      style={{ perspective: '2000px' }}
    >
      {/* Khung viền chỉ vàng quân sự truyền thống */}
      <div className="absolute inset-2 md:inset-4 border border-amber-500/25 rounded-xl md:rounded-2xl pointer-events-none" />
      <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/60 pointer-events-none" />
      <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/60 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/60 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/60 pointer-events-none" />

      {/* TIÊU ĐỀ PHÍA TRÊN CHÍNH GIỮA:
          - Phần trên chính giữa hiển thị: “TRƯỜNG SĨ QUAN PHÁO BINH”
          - Bên dưới hiển thị: “SÁNG KIẾN SÁCH”
      */}
      <header className="relative z-10 text-center pb-3 border-b border-amber-500/20">
        <div className="flex items-center justify-center gap-2 mb-0.5">
          <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-amber-400" />
          <h2 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-wider text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            TRƯỜNG SĨ QUAN PHÁO BINH
          </h2>
          <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-amber-400" />
        </div>

        <h3 className="text-sm sm:text-base md:text-xl font-black uppercase tracking-wider text-red-500 drop-shadow-[0_2px_8px_rgba(220,38,38,0.5)]">
          SÁNG KIẾN SÁCH
        </h3>

        {/* Tiêu đề cụ thể của mô hình sách hiện tại */}
        <div className="mt-1 flex flex-wrap items-center justify-center gap-2 text-xs text-emerald-200/90 font-medium">
          <span className="text-amber-400 font-semibold">{model.chapter}</span>
          <span className="text-amber-500/50">|</span>
          <span className="text-white font-bold">{model.title}</span>
          {model.subtitle && (
            <>
              <span className="text-amber-500/50">|</span>
              <span className="text-stone-300 italic">{model.subtitle}</span>
            </>
          )}
        </div>
      </header>

      {/* VÙNG NỘI DUNG CHÍNH HAI NỬA SÁCH:
          - Phần bên trái: hiển thị nội dung bằng chữ (2 khối: Ý nghĩa mô hình & Vận dụng mô hình, click để mở và tự ẩn khối khác)
          - Phần bên phải: hiển thị nội dung dưới dạng video
          - Ở giữa: thiết kế phân tách dạng sách (gáy sách 3D - book spine)
      */}
      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 my-auto py-4 items-stretch min-h-[440px]">
        {/* Rãnh sống sách ở giữa (Book spine shadow & fold line) - chỉ hiện trên desktop */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 pointer-events-none z-20">
          <div className="w-full h-full bg-gradient-to-r from-black/50 via-amber-500/15 to-black/50 shadow-inner" />
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-amber-500/40" />
        </div>

        {/* NỬA TRÁI: HIỂN THỊ NỘI DUNG BẰNG CHỮ (2 KHỐI CÓ THỂ CUỘN LÊN XUỐNG) */}
        <div
          className="relative flex flex-col justify-between bg-stone-900/70 backdrop-blur-md rounded-xl p-4 md:p-6 border border-emerald-500/30 shadow-lg"
          onClick={(e) => {
            // Không kích hoạt lật trang khi click vào các nút bên trong
            e.stopPropagation();
          }}
        >
          {/* Header trang trái & nút đọc thuyết minh */}
          <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span className="text-xs uppercase tracking-wider font-bold text-amber-300">
                Thuyết minh nội dung mô hình
              </span>
            </div>

            <button
              onClick={() => {
                const fullText = `Mô hình: ${model.title}. Ý nghĩa mô hình: ${model.meaning}. Vận dụng mô hình: ${model.application}`;
                handleToggleSpeech(fullText);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                isSpeaking
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/40'
              }`}
              title="Đọc thuyết minh nội dung bằng giọng tiếng Việt"
              aria-label="Đọc thuyết minh nội dung"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Dừng đọc</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe đọc</span>
                </>
              )}
            </button>
          </div>

          {/* Vùng chứa 2 khối nội dung: Ý nghĩa mô hình & Vận dụng mô hình */}
          <div className="flex-1 flex flex-col gap-3 overflow-y-auto max-h-[380px] md:max-h-[420px] pr-1.5 scrollbar-thin scrollbar-thumb-emerald-700 scrollbar-track-stone-900">
            {/* KHỐI 1: Ý NGHĨA MÔ HÌNH */}
            <div className="rounded-xl border border-amber-500/30 overflow-hidden bg-stone-950/70 transition-all duration-300">
              <button
                onClick={() => handleToggleSection('meaning')}
                className={`w-full flex items-center justify-between p-3.5 text-left font-bold text-sm md:text-base transition-colors cursor-pointer ${
                  activeSection === 'meaning'
                    ? 'bg-gradient-to-r from-red-900/80 to-stone-900 text-amber-300'
                    : 'bg-stone-900/90 text-stone-200 hover:text-amber-400'
                }`}
                aria-expanded={activeSection === 'meaning'}
                aria-label="Xem nội dung Ý nghĩa mô hình"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-red-700 text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <span className="uppercase tracking-wider font-extrabold text-amber-300">Ý NGHĨA MÔ HÌNH</span>
                </div>
                {activeSection === 'meaning' ? (
                  <ChevronUp className="w-5 h-5 text-amber-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-stone-400" />
                )}
              </button>

              {activeSection === 'meaning' && (
                <div className="p-4 bg-stone-950/90 border-t border-amber-500/20 text-stone-200 text-xs sm:text-sm leading-relaxed max-h-[220px] overflow-y-auto">
                  <p className="whitespace-pre-line text-justify">{model.meaning}</p>
                  {model.keyPoints && model.keyPoints.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-stone-800">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1.5">
                        Điểm nổi bật của sáng kiến:
                      </span>
                      <ul className="space-y-1 text-[11px] text-emerald-200/90 list-disc list-inside">
                        {model.keyPoints.map((pt, idx) => (
                          <li key={idx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* KHỐI 2: VẬN DỤNG MÔ HÌNH */}
            <div className="rounded-xl border border-emerald-500/40 overflow-hidden bg-stone-950/70 transition-all duration-300">
              <button
                onClick={() => handleToggleSection('application')}
                className={`w-full flex items-center justify-between p-3.5 text-left font-bold text-sm md:text-base transition-colors cursor-pointer ${
                  activeSection === 'application'
                    ? 'bg-gradient-to-r from-emerald-950 to-stone-900 text-emerald-300'
                    : 'bg-stone-900/90 text-stone-200 hover:text-emerald-400'
                }`}
                aria-expanded={activeSection === 'application'}
                aria-label="Xem nội dung Vận dụng mô hình"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <span className="uppercase tracking-wider font-extrabold text-emerald-300">VẬN DỤNG MÔ HÌNH</span>
                </div>
                {activeSection === 'application' ? (
                  <ChevronUp className="w-5 h-5 text-emerald-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-stone-400" />
                )}
              </button>

              {activeSection === 'application' && (
                <div className="p-4 bg-stone-950/90 border-t border-emerald-500/20 text-stone-200 text-xs sm:text-sm leading-relaxed max-h-[220px] overflow-y-auto">
                  <p className="whitespace-pre-line text-justify">{model.application}</p>
                  <div className="mt-3 pt-2.5 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                    <span>Đơn vị: {model.author}</span>
                    <span className="text-amber-400 font-semibold">{model.modelType}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hướng dẫn tương tác nhỏ bên dưới trang trái */}
          <div className="mt-3 pt-2 border-t border-stone-800 flex items-center justify-between text-[10px] text-stone-400">
            <span className="italic">💡 Nhấp vào tiêu đề từng khối để mở nội dung chi tiết.</span>
            <span className="text-amber-400/90 font-medium">Cuộn chuột để xem toàn văn</span>
          </div>
        </div>

        {/* NỬA PHẢI: HIỂN THỊ NỘI DUNG DƯỚI DẠNG VIDEO */}
        <div
          className="relative flex flex-col justify-between bg-stone-900/70 backdrop-blur-md rounded-xl p-4 md:p-6 border border-amber-500/30 shadow-lg"
          onClick={(e) => {
            // Không lật trang khi đang bấm vào video player controls
            e.stopPropagation();
          }}
        >
          {/* Header trang phải */}
          <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-3">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-red-500" />
              <span className="text-xs uppercase tracking-wider font-bold text-amber-300">
                Video trực quan mô hình sáng kiến
              </span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-red-950/80 border border-red-700/60 text-red-300 font-medium">
              Chất lượng cao HD
            </span>
          </div>

          {/* Trình phát Video HTML5 */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-amber-500/20 shadow-inner flex items-center justify-center group">
            {model.videoUrl ? (
              <video
                key={model.videoUrl}
                src={model.videoUrl}
                controls
                playsInline
                className="w-full h-full object-contain"
                poster={model.thumbnailUrl}
                onPlay={() => setVideoPlaying(true)}
                onPause={() => setVideoPlaying(false)}
              >
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>
            ) : (
              <div className="text-center p-6 text-stone-400">
                <Video className="w-12 h-12 mx-auto mb-2 text-stone-600" />
                <p className="text-xs">Chưa có video được gán cho mô hình này</p>
                <p className="text-[10px] text-stone-500 mt-1">Truy cập Trang Admin để thêm video</p>
              </div>
            )}
          </div>

          {/* Thông tin chú thích video và hình ảnh mô hình kèm theo */}
          <div className="mt-3 flex items-center justify-between text-xs text-stone-300 bg-stone-950/60 p-2.5 rounded-lg border border-stone-800">
            <div>
              <span className="text-amber-400 font-bold block text-[11px]">
                {model.videoTitle || 'Thực hành thao tác và vận hành mô hình'}
              </span>
              <span className="text-[10px] text-stone-400 block mt-0.5">
                Tác giả: {model.author} · Năm {model.creationYear || '2026'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-emerald-400 font-medium block">Đã kiểm duyệt</span>
              <span className="text-[9px] text-stone-500 block">Bộ môn Pháo binh</span>
            </div>
          </div>
        </div>
      </main>

      {/* ĐIỀU HƯỚNG BÊN DƯỚI:
          - Góc dưới bên trái có nút “Back”
          - Góc dưới bên phải có nút “Next”
          - Hiệu ứng lật trang rõ ràng và mượt
      */}
      <footer className="relative z-10 flex items-center justify-between pt-3 border-t border-amber-500/20 mt-2">
        {/* Nút Back (Góc dưới bên trái) */}
        <button
          onClick={onPrev}
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-amber-300 font-bold text-xs md:text-sm tracking-wide border border-stone-700 hover:border-amber-500/60 transition-all duration-300 cursor-pointer shadow-md hover:scale-105 active:scale-95"
          aria-label="Quay lại trang trước"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-amber-400" />
          <span>BACK (TRANG TRƯỚC)</span>
        </button>

        {/* Chỉ số trang giữa sách */}
        <div className="text-center">
          <span className="text-xs md:text-sm font-bold text-amber-400 tracking-wider font-mono">
            {currentPageIndex + 1} / {totalPages}
          </span>
          <span className="block text-[10px] text-stone-400 uppercase tracking-widest mt-0.5">
            Sách Điện tử 3D SQPB
          </span>
        </div>

        {/* Nút Next (Góc dưới bên phải) */}
        <button
          onClick={onNext}
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-amber-600 hover:from-red-600 hover:to-amber-500 text-white font-bold text-xs md:text-sm tracking-wide border border-amber-400/50 transition-all duration-300 cursor-pointer shadow-[0_4px_16px_rgba(220,38,38,0.4)] hover:scale-105 active:scale-95"
          aria-label="Chuyển sang trang tiếp theo"
        >
          <span>NEXT (TRANG SAU)</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
};
