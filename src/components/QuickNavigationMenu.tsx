import React, { useState } from 'react';
import { Menu, X, BookOpen, Layers, ChevronRight, Bookmark } from 'lucide-react';
import { BookModelItem } from '../types.ts';
import { soundManager } from '../utils/audio.ts';

interface QuickNavigationMenuProps {
  models: BookModelItem[];
  currentIndex: number;
  isCover: boolean;
  onSelectCover: () => void;
  onSelectPage: (index: number) => void;
}

export const QuickNavigationMenu: React.FC<QuickNavigationMenuProps> = ({
  models,
  currentIndex,
  isCover,
  onSelectCover,
  onSelectPage,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    soundManager.playClick();
    setIsOpen(!isOpen);
  };

  const handleChoose = (action: () => void) => {
    soundManager.playClick();
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Nút ẩn bên dưới logo (Menu điều hướng nội dung) */}
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-amber-500/40 text-amber-300 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-md hover:border-amber-400 group"
        aria-label="Mở danh mục nội dung sáng kiến mô hình sách"
        aria-expanded={isOpen}
      >
        <Menu className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Mục lục sáng kiến</span>
        <span className="sm:hidden">Mục lục</span>
      </button>

      {/* Drawer / Popover danh sách liên kết các nội dung (KHÔNG LIÊN KẾT ĐẾN ADMIN) */}
      {isOpen && (
        <>
          {/* Backdrop mờ che phủ nhẹ */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div
            className="fixed top-16 left-4 md:left-8 w-80 md:w-96 max-h-[80vh] bg-stone-900/95 border-2 border-amber-500/50 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden text-stone-100 animate-in fade-in slide-in-from-top-4 duration-200"
            role="dialog"
            aria-label="Mục lục các nội dung sáng kiến sách"
          >
            {/* Header mục lục */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#0c2e1c] to-[#1c0f0f] border-b border-amber-500/30">
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-5 h-5 text-amber-400" />
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-white">
                    Danh mục Sáng kiến
                  </h4>
                  <p className="text-[10px] text-emerald-300/80">Chọn nội dung cần xem trực tiếp</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Đóng mục lục"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Danh sách các trang để người dùng lựa chọn liên kết đến */}
            <div className="p-3 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-emerald-700">
              {/* Trang bìa */}
              <button
                onClick={() => handleChoose(onSelectCover)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  isCover
                    ? 'bg-red-900/80 border border-amber-400/80 text-white shadow-sm'
                    : 'bg-stone-950/70 hover:bg-stone-800/90 text-stone-200 border border-stone-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    0
                  </div>
                  <div>
                    <span className="text-xs font-bold block uppercase tracking-wide">Trang bìa chính</span>
                    <span className="text-[10px] text-stone-400 block">Sáng kiến Mô hình Sách SQPB</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </button>

              <div className="pt-2 pb-1 px-1 flex items-center justify-between text-[11px] font-bold text-amber-400/90 uppercase tracking-wider border-t border-stone-800">
                <span>Nội dung các sáng kiến:</span>
                <span className="text-[10px] text-stone-400">{models.length} mô hình</span>
              </div>

              {/* Các trang nội dung mô hình sách */}
              {models.map((model, idx) => {
                const isSelected = !isCover && currentIndex === idx;
                return (
                  <button
                    key={model.id}
                    onClick={() => handleChoose(() => onSelectPage(idx))}
                    className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-950 to-emerald-900 border border-emerald-400 text-white shadow-md'
                        : 'bg-stone-950/70 hover:bg-stone-800 text-stone-200 border border-stone-800/80'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-stone-900 overflow-hidden shrink-0 border border-stone-700">
                      <img
                        src={model.thumbnailUrl}
                        alt={model.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] px-1 py-0.2 bg-red-800 text-white rounded font-bold">
                          Trang {idx + 1}
                        </span>
                        <span className="text-[10px] text-amber-400/90 truncate">{model.chapter}</span>
                      </div>
                      <h5 className="text-xs font-semibold text-white truncate mt-0.5">
                        {model.title}
                      </h5>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* Footer menu */}
            <div className="p-3 bg-stone-950 border-t border-stone-800 text-center text-[10px] text-stone-400">
              <span>Trường Sĩ quan Pháo binh · Bản quyền 2026</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
