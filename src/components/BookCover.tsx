import React from 'react';
import { ArrowRight, BookOpen, Sparkles, Award, ShieldCheck, ChevronRight } from 'lucide-react';
import { SchoolEmblem } from './SchoolEmblem.tsx';
import { BookCoverData, BookModelItem } from '../types.ts';

interface BookCoverProps {
  coverData: BookCoverData;
  models: BookModelItem[];
  onNext: () => void;
  onOpenModel: (modelId: string) => void;
}

export const BookCover: React.FC<BookCoverProps> = ({
  coverData,
  models,
  onNext,
  onOpenModel,
}) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto min-h-[660px] md:min-h-[720px] bg-gradient-to-br from-[#0c2e1c] via-[#092215] to-[#1a0f0f] rounded-2xl md:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(20,83,45,0.4)] border border-amber-500/30 overflow-hidden flex flex-col justify-between p-6 md:p-8 text-stone-100 select-none">
      {/* Họa tiết nền quân sự & khung viền hoa văn vàng kim */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute inset-3 md:inset-5 border border-amber-500/25 rounded-xl md:rounded-2xl pointer-events-none" />
      <div className="absolute inset-4 md:inset-6 border border-emerald-500/20 rounded-lg md:rounded-xl pointer-events-none" />

      {/* Hoa văn góc đồng thau sang trọng */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-400/70 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-400/70 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-400/70 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-400/70 rounded-br-lg pointer-events-none" />

      {/* Ánh sáng đỏ thắm và xanh lục quân đội tạo chiều sâu 3D */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* PHẦN ĐẦU TRANG BÌA:
          - Logo trường sĩ quan pháo binh hiển thị góc trên cùng bên trái
          - Chính giữa ở trên: “BỘ TƯ LỆNH PHÁO BINH – TÊN LỬA \n TRƯỜNG SĨ QUAN PHÁO BINH”
      */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 items-start gap-4">
        {/* Góc trên cùng bên trái: Logo Trường Sĩ quan Pháo binh */}
        <div className="flex items-center justify-start">
          <SchoolEmblem size="lg" showLabel={false} />
          <div className="ml-3 hidden sm:block">
            <div className="text-[10px] tracking-widest uppercase text-amber-400 font-semibold">
              Binh chủng Pháo binh
            </div>
            <div className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
              Quân đội Nhân dân Việt Nam
            </div>
          </div>
        </div>

        {/* Chính giữa ở trên: Tiêu đề cơ quan ban hành */}
        <div className="text-center md:col-span-1 flex flex-col items-center">
          <h2 className="text-xs sm:text-sm md:text-base font-bold tracking-widest uppercase text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {coverData.topAuthority}
          </h2>
          <div className="w-16 h-0.5 bg-amber-400/60 my-1 rounded-full" />
          <h3 className="text-sm sm:text-base md:text-lg font-black tracking-wider uppercase text-white drop-shadow-[0_2px_8px_rgba(220,38,38,0.6)]">
            {coverData.schoolName}
          </h3>
        </div>

        {/* Góc trên cùng bên phải: Năm & Phù hiệu tiêu chuẩn */}
        <div className="hidden md:flex justify-end items-center gap-2 text-xs text-amber-300/80">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold tracking-wider">LƯU HÀNH NỘI BỘ · NĂM {coverData.publishYear || '2026'}</span>
        </div>
      </div>

      {/* PHẦN TRUNG TÂM TRANG BÌA:
          - Phía bên dưới chính giữa: “SÁNG KIẾN MÔ HÌNH SÁCH”
          - Bên dưới hiển thị:
            “Chủ biên: Thiếu tá Lê Thị Phương Thanh
             Tham gia: Đại uý Nguyễn Hoàng An”
          - Thêm các hình minh hoạ về các mô hình sách đẹp, sắc nét
      */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2 text-center">
        {/* Ngôi sao vàng & dải ánh sáng biểu trưng */}
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-400" />
          <span className="text-amber-400 font-bold tracking-widest text-xs uppercase px-2 py-0.5 rounded bg-red-950/80 border border-red-700/60">
            CÔNG TRÌNH NGHIÊN CỨU & ỨNG DỤNG ĐÀO TẠO
          </span>
          <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-400" />
        </div>

        {/* Tiêu đề chính lớn */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-normal text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_4px_16px_rgba(234,179,8,0.4)]">
          {coverData.mainTitle}
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-emerald-200/90 font-medium max-w-2xl px-4">
          TỔNG HỢP CÁC MÔ HÌNH SÁCH GIÁO CỤ TRỰC QUAN, SA BÀN ĐIỆN TỬ 3D VÀ SÁNG KIẾN CẢI TIẾN KỸ THUẬT PHÁO BINH HIỆN ĐẠI
        </p>

        {/* Khối tác giả:
            “Chủ biên: Thiếu tá Lê Thị Phương Thanh
             Tham gia: Đại uý Nguyễn Hoàng An”
        */}
        <div className="mt-4 p-3 sm:p-4 rounded-xl bg-stone-900/80 backdrop-blur-md border border-amber-500/30 shadow-lg max-w-lg w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center sm:text-left">
            <div className="border-b sm:border-b-0 sm:border-r border-amber-500/20 pb-2 sm:pb-0 sm:pr-3">
              <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block">
                Chủ biên:
              </span>
              <span className="text-sm md:text-base font-bold text-white block mt-0.5">
                Thiếu tá Lê Thị Phương Thanh
              </span>
              <span className="text-[11px] text-emerald-300/80 block">Trường Sĩ quan Pháo binh</span>
            </div>
            <div className="sm:pl-3">
              <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block">
                Tham gia:
              </span>
              <span className="text-sm md:text-base font-bold text-white block mt-0.5">
                Đại uý Nguyễn Hoàng An
              </span>
              <span className="text-[11px] text-emerald-300/80 block">Khoa Vũ khí & Khí tài</span>
            </div>
          </div>
        </div>

        {/* Các hình minh họa mô hình sách đẹp sắc nét */}
        <div className="mt-5 w-full max-w-4xl px-2 hidden sm:block">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold tracking-wider text-amber-300 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Mô hình sách nổi bật trong tài liệu:
            </span>
            <span className="text-[10px] text-emerald-300/70">Nhấp vào thẻ để mở ngay nội dung</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {models.slice(0, 4).map((model) => (
              <div
                key={model.id}
                onClick={() => onOpenModel(model.id)}
                className="group relative cursor-pointer text-left p-2.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 hover:border-amber-400/70 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="relative aspect-video w-full rounded overflow-hidden mb-1.5 bg-stone-900">
                  <img
                    src={model.thumbnailUrl}
                    alt={model.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-1 left-1 text-[9px] font-bold px-1.5 py-0.5 bg-red-700/90 text-white rounded">
                    Chương {model.chapterNumber}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-stone-100 line-clamp-1 group-hover:text-amber-300 transition-colors">
                  {model.title}
                </h4>
                <p className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">
                  {model.modelType}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PHẦN DƯỚI CÙNG TRANG BÌA:
          - Nút "Next" để chuyển đến trang sau
          - Khẩu hiệu & định dạng 16:9
      */}
      <div className="relative z-10 flex items-center justify-between pt-3 pb-1 mb-1 border-t border-amber-500/20">
        <div className="flex items-center gap-2 text-xs text-amber-200/80 font-medium">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="italic">“{coverData.motto || 'Chân đồng, vai sắt, đánh giỏi, bắn trúng'}”</span>
        </div>

        {/* Nút Next mở trang */}
        <button
          onClick={onNext}
          className="group flex items-center gap-3 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-amber-600 hover:from-red-600 hover:to-amber-500 text-white font-bold text-sm md:text-base tracking-wide shadow-[0_4px_20px_rgba(220,38,38,0.45)] hover:shadow-[0_6px_25px_rgba(234,179,8,0.5)] border border-amber-400/40 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Mở sách và chuyển sang trang kế tiếp"
        >
          <span>MỞ SÁCH (NEXT)</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
