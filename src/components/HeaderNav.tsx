import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Search,
  Settings,
  HelpCircle,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { SchoolEmblem } from './SchoolEmblem.tsx';
import { QuickNavigationMenu } from './QuickNavigationMenu.tsx';
import { BookModelItem } from '../types.ts';
import { soundManager } from '../utils/audio.ts';

interface HeaderNavProps {
  models: BookModelItem[];
  currentIndex: number;
  isCover: boolean;
  onSelectCover: () => void;
  onSelectPage: (index: number) => void;
  onOpenAdmin: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onSearchSelect: (index: number) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  models,
  currentIndex,
  isCover,
  onSelectCover,
  onSelectPage,
  onOpenAdmin,
  soundEnabled,
  onToggleSound,
  isFullscreen,
  onToggleFullscreen,
  onSearchSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Lọc kết quả tìm kiếm
  const searchResults = searchQuery.trim()
    ? models
        .map((m, idx) => ({ ...m, originalIndex: idx }))
        .filter(
          (m) =>
            m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.application.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.modelType.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : [];

  return (
    <header className="w-full bg-[#081b11]/90 backdrop-blur-md border-b border-amber-500/30 sticky top-0 z-40 px-3 md:px-6 py-2.5 shadow-lg select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* KHU VỰC BÊN TRÁI:
            - Logo Trường Sĩ quan Pháo binh ở góc trên cùng bên trái
            - Nút ẩn bên dưới logo để chọn liên kết đến các nội dung (QuickNavigationMenu)
        */}
        <div className="flex flex-col items-start gap-1">
          <div
            onClick={onSelectCover}
            className="cursor-pointer group flex items-center gap-2 hover:opacity-90 transition-opacity"
            title="Nhấp để quay về Trang bìa"
          >
            <SchoolEmblem size="sm" showLabel={true} />
          </div>

          {/* Nút ẩn bên dưới logo cho phép chọn nội dung (không liên kết đến admin) */}
          <div className="mt-0.5 ml-1">
            <QuickNavigationMenu
              models={models}
              currentIndex={currentIndex}
              isCover={isCover}
              onSelectCover={onSelectCover}
              onSelectPage={onSelectPage}
            />
          </div>
        </div>

        {/* KHU VỰC GIỮA: THANH TIẾN ĐỘ ĐỌC SÁCH HOẶC TÌM KIẾM NHANH */}
        <div className="hidden lg:flex items-center gap-3 bg-stone-900/80 px-4 py-1.5 rounded-full border border-stone-800">
          <button
            onClick={onSelectCover}
            className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              isCover
                ? 'bg-red-700 text-white font-bold'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Trang bìa
          </button>

          <span className="text-stone-600">/</span>

          <div className="flex items-center gap-1.5">
            {models.map((_, i) => (
              <button
                key={i}
                onClick={() => onSelectPage(i)}
                className={`w-6 h-6 rounded-full text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                  !isCover && currentIndex === i
                    ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-amber-400'
                    : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                }`}
                title={`Chuyển đến Sáng kiến ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <span className="text-stone-600">/</span>

          <span className="text-xs text-amber-300 font-mono font-bold">
            {isCover ? 'Bìa sách' : `Trang ${currentIndex + 1} / ${models.length}`}
          </span>
        </div>

        {/* KHU VỰC BÊN PHẢI: CÁC CÔNG CỤ TƯƠNG TÁC */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Ô tìm kiếm nhanh */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-stone-900 rounded-xl border border-amber-500/50 px-2.5 py-1 text-xs">
                <Search className="w-3.5 h-3.5 text-amber-400 mr-1.5 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sáng kiến..."
                  className="bg-transparent text-white text-xs w-32 sm:w-44 focus:outline-none placeholder-stone-500"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="text-stone-400 hover:text-white text-xs ml-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 transition-colors cursor-pointer"
                title="Tìm kiếm sáng kiến trong sách"
                aria-label="Tìm kiếm sáng kiến"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Popup kết quả tìm kiếm */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute right-0 top-10 w-72 sm:w-80 bg-stone-900 border border-amber-500/50 rounded-xl shadow-2xl p-2 z-50 max-h-64 overflow-y-auto">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider px-2 py-1 block">
                  Kết quả ({searchResults.length}):
                </span>
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSearchSelect(item.originalIndex);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-stone-800 text-xs text-stone-200 transition-colors cursor-pointer block border-b border-stone-800/50 last:border-0"
                  >
                    <div className="font-semibold text-white truncate">{item.title}</div>
                    <div className="text-[10px] text-amber-300/80 truncate">{item.chapter}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bật / Tắt âm thanh sột soạt lật trang */}
          <button
            onClick={() => {
              onToggleSound();
              soundManager.playClick();
            }}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900'
                : 'bg-stone-900 border-stone-800 text-stone-500 hover:text-stone-300'
            }`}
            title={soundEnabled ? 'Âm thanh lật sách: Đang bật' : 'Âm thanh lật sách: Đang tắt'}
            aria-label="Bật tắt âm thanh lật sách"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Toàn màn hình 16:9 */}
          <button
            onClick={() => {
              soundManager.playClick();
              onToggleFullscreen();
            }}
            className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 transition-colors cursor-pointer"
            title={isFullscreen ? 'Thu nhỏ cửa sổ' : 'Toàn màn hình 16:9'}
            aria-label="Toàn màn hình"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Nút truy cập trang quản trị admin (/admin) */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenAdmin();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-700/60 text-red-200 hover:text-white text-xs font-bold tracking-wide transition-all cursor-pointer"
            title="Đến trang quản trị (/admin)"
            aria-label="Trang quản trị"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};
