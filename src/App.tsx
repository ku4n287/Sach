/**
 * SÁNG KIẾN MÔ HÌNH SÁCH - TRƯỜNG SĨ QUAN PHÁO BINH
 * Website Sách Điện Tử 3D Đa Phương Tiện Chuẩn UI/UX 2026
 */

import React, { useState, useEffect, useRef } from 'react';
import { HeaderNav } from './components/HeaderNav.tsx';
import { BookCover } from './components/BookCover.tsx';
import { BookSpread } from './components/BookSpread.tsx';
import { AdminPage } from './components/AdminPage.tsx';
import { BookModelItem, BookCoverData } from './types.ts';
import {
  loadStoredBookModels,
  loadStoredCoverData,
  saveStoredBookModels,
} from './utils/storage.ts';
import {
  canGoNext,
  canGoPrev,
  getNextPageIndex,
  getPrevPageIndex,
  clampPageIndex,
} from './utils/navigationRules.ts';
import { soundManager } from './utils/audio.ts';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [models, setModels] = useState<BookModelItem[]>([]);
  const [coverData, setCoverData] = useState<BookCoverData | null>(null);

  // Trạng thái trang đang xem: 'cover' (Trang bìa) hoặc số nguyên chỉ số index trang nội dung (0, 1, 2...)
  const [isCover, setIsCover] = useState<boolean>(true);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  // Trạng thái hiển thị trang Admin: khi URL chứa /admin, #admin hoặc ?admin
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Hiệu ứng lật trang 3D
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | 'none'>('none');

  // Cài đặt âm thanh và toàn màn hình
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const bookContainerRef = useRef<HTMLDivElement>(null);

  // Khởi tạo dữ liệu và kiểm tra đường dẫn URL
  useEffect(() => {
    const loadedModels = loadStoredBookModels();
    const loadedCover = loadStoredCoverData();
    setModels(loadedModels);
    setCoverData(loadedCover);

    // Kiểm tra nếu địa chỉ web có đuôi /admin hoặc hash #admin
    const checkAdminRoute = () => {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        pathname.endsWith('/admin') ||
        pathname.includes('admin') ||
        hash.includes('admin') ||
        search.includes('admin')
      ) {
        setIsAdminOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);
    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, []);

  // Lắng nghe phím mũi tên bàn phím để lật trang
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAdminOpen) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        handleGoToCover();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCover, currentPageIndex, models.length, isAdminOpen]);

  // Xử lý lật trang kế tiếp (Next)
  const handleNext = () => {
    if (models.length === 0) return;

    soundManager.playPageFlip();
    setFlipDirection('next');
    setTimeout(() => setFlipDirection('none'), 550);

    if (isCover) {
      setIsCover(false);
      setCurrentPageIndex(0);
    } else {
      if (canGoNext(currentPageIndex, models.length)) {
        setCurrentPageIndex(getNextPageIndex(currentPageIndex, models.length));
      } else {
        // Nếu ở trang cuối, thông báo nhẹ hoặc giữ nguyên
      }
    }
  };

  // Xử lý lật trang trước đó (Back)
  const handlePrev = () => {
    if (isCover) return; // Đang ở bìa thì không lùi được nữa

    soundManager.playPageFlip();
    setFlipDirection('prev');
    setTimeout(() => setFlipDirection('none'), 550);

    if (currentPageIndex === 0) {
      setIsCover(true);
    } else {
      setCurrentPageIndex(getPrevPageIndex(currentPageIndex));
    }
  };

  // Chọn trang trực tiếp từ mục lục
  const handleSelectPage = (index: number) => {
    soundManager.playPageFlip();
    setFlipDirection(index >= currentPageIndex ? 'next' : 'prev');
    setTimeout(() => setFlipDirection('none'), 550);
    setIsCover(false);
    setCurrentPageIndex(clampPageIndex(index, models.length));
  };

  const handleGoToCover = () => {
    soundManager.playPageFlip();
    setFlipDirection('prev');
    setTimeout(() => setFlipDirection('none'), 550);
    setIsCover(true);
  };

  const handleOpenModelById = (id: string) => {
    const idx = models.findIndex((m) => m.id === id);
    if (idx !== -1) {
      handleSelectPage(idx);
    }
  };

  // Bật/tắt chế độ toàn màn hình
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    soundManager.setMuted(!nextVal);
  };

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
    window.location.hash = 'admin';
  };

  const handleExitAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  if (!coverData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold tracking-wider uppercase text-amber-300">
            Đang tải dữ liệu sách điện tử...
          </span>
        </div>
      </div>
    );
  }

  // NẾU ĐANG TRUY CẬP TRANG ADMIN (/admin)
  if (isAdminOpen) {
    return (
      <AdminPage
        models={models}
        onUpdateModels={(updated) => {
          setModels(updated);
          saveStoredBookModels(updated);
        }}
        onExitAdmin={handleExitAdmin}
      />
    );
  }

  const currentModel = models[currentPageIndex] || models[0];

  return (
    <div
      ref={bookContainerRef}
      className="min-h-screen flex flex-col bg-stone-950 text-stone-100 selection:bg-red-700 selection:text-white"
    >
      {/* THANH ĐIỀU HƯỚNG TRÊN CÙNG: LOGO SQPB, NÚT ẨN CHỌN NỘI DUNG, CÁC TIỆN ÍCH */}
      <HeaderNav
        models={models}
        currentIndex={currentPageIndex}
        isCover={isCover}
        onSelectCover={handleGoToCover}
        onSelectPage={handleSelectPage}
        onOpenAdmin={handleOpenAdmin}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        onSearchSelect={handleSelectPage}
      />

      {/* KHU VỰC ĐỌC SÁCH CHÍNH (3D BOOK STAGE) */}
      <main className="flex-1 flex flex-col justify-center items-center p-3 sm:p-6 md:p-8 relative overflow-x-hidden">
        {/* Nút click lật trang mép trái (Lật về trang trước) */}
        {!isCover && (
          <button
            onClick={handlePrev}
            className="hidden xl:flex fixed left-3 top-1/2 -translate-y-1/2 z-30 w-12 h-20 items-center justify-center rounded-r-xl bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-amber-400 border-y border-r border-amber-500/40 shadow-xl backdrop-blur-xs transition-all cursor-pointer group"
            title="Nhấp vào mép trái để lật về trang trước"
            aria-label="Lật về trang trước"
          >
            <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
          </button>
        )}

        {/* Nút click lật trang mép phải (Lật sang trang kế tiếp) */}
        <button
          onClick={handleNext}
          className="hidden xl:flex fixed right-3 top-1/2 -translate-y-1/2 z-30 w-12 h-20 items-center justify-center rounded-l-xl bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-amber-400 border-y border-l border-amber-500/40 shadow-xl backdrop-blur-xs transition-all cursor-pointer group"
          title="Nhấp vào mép phải để lật sang trang kế tiếp"
          aria-label="Lật sang trang kế tiếp"
        >
          <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* HIỂN THỊ TRANG BÌA HOẶC NỘI DUNG SÁCH */}
        <div className="w-full max-w-7xl flex flex-col items-center">
          {isCover ? (
            <BookCover
              coverData={coverData}
              models={models}
              onNext={handleNext}
              onOpenModel={handleOpenModelById}
            />
          ) : (
            currentModel && (
              <BookSpread
                model={currentModel}
                currentPageIndex={currentPageIndex}
                totalPages={models.length}
                onNext={handleNext}
                onPrev={handlePrev}
                flipDirection={flipDirection}
              />
            )
          )}
        </div>
      </main>

      {/* FOOTER ĐƠN VỊ THỰC HIỆN */}
      <footer className="w-full py-3 px-4 border-t border-stone-800/80 bg-stone-950/90 text-center text-xs text-stone-400 select-none">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-stone-300">
              Bộ Tư lệnh Pháo binh – Tên lửa · Trường Sĩ quan Pháo binh
            </span>
          </div>

          <div className="text-[11px] text-stone-400">
            Chủ biên: Thiếu tá Lê Thị Phương Thanh · Tham gia: Đại uý Nguyễn Hoàng An
          </div>

          <div className="text-[10px] text-amber-400/90 font-semibold tracking-wider">
            Hệ thống Sách Điện tử 3D Quân sự © 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
