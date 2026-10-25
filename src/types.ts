/**
 * Cấu trúc dữ liệu Sáng kiến Mô hình Sách - Trường Sĩ quan Pháo binh
 */

export interface BookModelItem {
  id: string;
  chapter: string; // Tên chương (ví dụ: "Chương I: Mô hình Giáo cụ Trực quan")
  chapterNumber: number;
  title: string; // Tiêu đề sáng kiến sách
  subtitle?: string; // Phụ đề / Mã hiệu mô hình
  modelType: string; // Phân loại mô hình (Sa bàn 3D, Sách Pop-up, Mô hình Cơ - Điện tử, v.v.)
  meaning: string; // "Ý nghĩa mô hình"
  application: string; // "Vận dụng mô hình"
  videoUrl: string; // Đường dẫn video (từ thư mục, URL hoặc Blob)
  videoTitle?: string; // Tên chú thích video
  videoPoster?: string; // Ảnh bìa video
  thumbnailUrl?: string; // Ảnh minh họa mô hình sách
  author: string; // Tác giả / Đơn vị chế tạo
  creationYear?: string; // Năm sáng kiến
  status?: 'active' | 'archived';
  keyPoints?: string[]; // Điểm nổi bật
}

export interface BookCoverData {
  topAuthority: string; // "BỘ TƯ LỆNH PHÁO BINH – TÊN LỬA"
  schoolName: string; // "TRƯỜNG SĨ QUAN PHÁO BINH"
  mainTitle: string; // "SÁNG KIẾN MÔ HÌNH SÁCH"
  leadAuthor: string; // "Chủ biên: Thiếu tá Lê Thị Phương Thanh"
  coAuthor: string; // "Tham gia: Đại uý Nguyễn Hoàng An"
  subtitle?: string;
  publishYear?: string;
  motto?: string;
}

export type BookNavigationMode = 'cover' | 'content';

export interface BookSettings {
  soundEnabled: boolean;
  speechSpeed: number; // 0.8 -> 1.2
  theme: 'military-olive' | 'crimson-classic' | 'parchment';
  autoPageTurn: boolean;
}
