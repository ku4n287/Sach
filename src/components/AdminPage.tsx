import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  Upload,
  Video,
  FileText,
  Download,
  RotateCcw,
  BookOpen,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  FolderOpen,
  Server,
  Code,
  ShieldCheck,
} from 'lucide-react';
import { BookModelItem } from '../types.ts';
import {
  saveStoredBookModels,
  exportDatabaseAsJSON,
  resetAllDataToDefault,
  downloadPythonFlaskServer,
} from '../utils/storage.ts';
import { soundManager } from '../utils/audio.ts';
import { validateBookModelItem } from '../utils/navigationRules.ts';

interface AdminPageProps {
  models: BookModelItem[];
  onUpdateModels: (models: BookModelItem[]) => void;
  onExitAdmin: () => void;
}

// Danh sách video mẫu có sẵn trong thư mục dự án để người quản trị dễ dàng lựa chọn
const PROJECT_VIDEOS = [
  {
    title: 'Video Sa bàn Điện tử 3D Pháo binh',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    filename: '/videos/saban_phaobinh_3d.mp4',
  },
  {
    title: 'Video Cấu tạo Khóa nòng Pháo Lựu 152mm',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    filename: '/videos/khoanong_d20_152mm.mp4',
  },
  {
    title: 'Video Tra cứu Bảng bắn & Khí tượng',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    filename: '/videos/bangban_khituong.mp4',
  },
  {
    title: 'Video Tên lửa Pháo phản lực BM-21',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    filename: '/videos/bm21_grad_phaophanluc.mp4',
  },
  {
    title: 'Video UAV Trinh sát Chỉ thị Điểm nổ',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    filename: '/videos/uav_trinhsat_phaobinh.mp4',
  },
];

export const AdminPage: React.FC<AdminPageProps> = ({
  models,
  onUpdateModels,
  onExitAdmin,
}) => {
  // Trạng thái Form thêm / sửa
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [formTitle, setFormTitle] = useState('');
  const [formChapter, setFormChapter] = useState('Chương I: Mô hình Sa bàn Tác chiến');
  const [formChapterNumber, setFormChapterNumber] = useState(1);
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formModelType, setFormModelType] = useState('Sa bàn điện tử 3D');
  const [formMeaning, setFormMeaning] = useState('');
  const [formApplication, setFormApplication] = useState('');
  const [formVideoUrl, setFormVideoUrl] = useState('');
  const [formVideoTitle, setFormVideoTitle] = useState('');
  const [formThumbnailUrl, setFormThumbnailUrl] = useState('');
  const [formAuthor, setFormAuthor] = useState('Khoa Pháo binh - Trường SQPB');
  const [formKeyPoints, setFormKeyPoints] = useState('');

  // Thông báo phản hồi
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenAddForm = () => {
    soundManager.playClick();
    setEditingId(null);
    setFormTitle('');
    setFormSubtitle('Mã số: SK-PB-MỚI/' + new Date().getFullYear());
    setFormChapter('Chương I: Mô hình Sa bàn Tác chiến');
    setFormChapterNumber(1);
    setFormModelType('Mô hình giáo cụ trực quan');
    setFormMeaning('');
    setFormApplication('');
    setFormVideoUrl(PROJECT_VIDEOS[0].url);
    setFormVideoTitle('Video mô phỏng vận hành sáng kiến');
    setFormThumbnailUrl('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80');
    setFormAuthor('Trường Sĩ quan Pháo binh');
    setFormKeyPoints('');
    setIsEditing(true);
  };

  const handleOpenEditForm = (item: BookModelItem) => {
    soundManager.playClick();
    setEditingId(item.id);
    setFormTitle(item.title);
    setFormSubtitle(item.subtitle || '');
    setFormChapter(item.chapter);
    setFormChapterNumber(item.chapterNumber || 1);
    setFormModelType(item.modelType);
    setFormMeaning(item.meaning);
    setFormApplication(item.application);
    setFormVideoUrl(item.videoUrl);
    setFormVideoTitle(item.videoTitle || '');
    setFormThumbnailUrl(item.thumbnailUrl || '');
    setFormAuthor(item.author);
    setFormKeyPoints(item.keyPoints ? item.keyPoints.join('\n') : '');
    setIsEditing(true);
  };

  const handleDelete = (id: string, title: string) => {
    soundManager.playClick();
    if (window.confirm(`Đồng chí có chắc chắn muốn xoá sáng kiến mô hình: "${title}" không?`)) {
      const updated = models.filter((m) => m.id !== id);
      onUpdateModels(updated);
      saveStoredBookModels(updated);
      showNotification('success', `Đã xoá thành công sáng kiến "${title}"`);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();

    const validation = validateBookModelItem({
      title: formTitle,
      meaning: formMeaning,
      application: formApplication,
    });

    if (!validation.valid) {
      showNotification('error', validation.errors.join('. '));
      return;
    }

    const keyPointsArray = formKeyPoints
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (editingId) {
      // Chỉnh sửa nội dung đã thêm
      const updated = models.map((m) => {
        if (m.id === editingId) {
          return {
            ...m,
            title: formTitle.trim(),
            subtitle: formSubtitle.trim(),
            chapter: formChapter.trim(),
            chapterNumber: formChapterNumber,
            modelType: formModelType.trim(),
            meaning: formMeaning.trim(),
            application: formApplication.trim(),
            videoUrl: formVideoUrl.trim(),
            videoTitle: formVideoTitle.trim(),
            thumbnailUrl: formThumbnailUrl.trim(),
            author: formAuthor.trim(),
            keyPoints: keyPointsArray,
            updatedAt: new Date().toISOString(),
          };
        }
        return m;
      });
      onUpdateModels(updated);
      saveStoredBookModels(updated);
      showNotification('success', 'Đã cập nhật chỉnh sửa sáng kiến thành công!');
    } else {
      // Thêm nội dung mới
      const newItem: BookModelItem = {
        id: 'sk-' + Date.now(),
        title: formTitle.trim(),
        subtitle: formSubtitle.trim(),
        chapter: formChapter.trim(),
        chapterNumber: formChapterNumber,
        modelType: formModelType.trim(),
        meaning: formMeaning.trim(),
        application: formApplication.trim(),
        videoUrl: formVideoUrl.trim() || PROJECT_VIDEOS[0].url,
        videoTitle: formVideoTitle.trim() || 'Video thuyết minh mô hình sáng kiến',
        thumbnailUrl:
          formThumbnailUrl.trim() ||
          'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
        author: formAuthor.trim(),
        keyPoints: keyPointsArray,
        creationYear: '2026',
        status: 'active',
      };
      const updated = [...models, newItem];
      onUpdateModels(updated);
      saveStoredBookModels(updated);
      showNotification('success', 'Đã thêm mới sáng kiến mô hình sách thành công!');
    }

    setIsEditing(false);
  };

  // Xử lý tải video từ máy tính (File upload sang Object URL cho phép chạy offline ngay)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormVideoUrl(url);
      setFormVideoTitle(`Video tệp nội bộ: ${file.name}`);
      showNotification('success', `Đã nạp tệp video "${file.name}" sẵn sàng phát`);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Khôi phục toàn bộ danh sách sáng kiến về dữ liệu tiêu chuẩn ban đầu của Trường Sĩ quan Pháo binh?')) {
      const res = resetAllDataToDefault();
      onUpdateModels(res.models);
      showNotification('success', 'Đã khôi phục dữ liệu ban đầu thành công!');
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* THANH ĐIỀU HƯỚNG TRANG ADMIN */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0c2317] border border-amber-500/40 shadow-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={onExitAdmin}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Về Sách Điện Tử</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <h1 className="text-base sm:text-lg font-black uppercase tracking-wider text-white">
                  HỆ THỐNG QUẢN TRỊ NỘI DUNG (ADMIN)
                </h1>
              </div>
              <p className="text-xs text-emerald-300/80">
                Trường Sĩ quan Pháo binh · Quản lý Video, Ý nghĩa và Vận dụng mô hình
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleOpenAddForm}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-600 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Sáng Kiến Mới</span>
            </button>

            <button
              onClick={exportDatabaseAsJSON}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-semibold border border-stone-700 transition-all cursor-pointer"
              title="Xuất sao lưu cơ sở dữ liệu dạng file JSON"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Xuất JSON</span>
            </button>

            <button
              onClick={downloadPythonFlaskServer}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-200 text-xs font-semibold border border-emerald-500/40 transition-all cursor-pointer"
              title="Tải file server.py Python Flask để chạy offline trên máy chủ nội bộ trường"
            >
              <Server className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">Tải Python Flask Server</span>
              <span className="md:hidden">Flask.py</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-amber-400 border border-stone-800 transition-all cursor-pointer"
              title="Khôi phục dữ liệu gốc ban đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* THÔNG BÁO PHẢN HỒI */}
        {notification && (
          <div
            className={`p-4 rounded-xl flex items-center gap-3 text-sm font-semibold border animate-in fade-in duration-300 ${
              notification.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                : 'bg-red-950/80 border-red-500 text-red-200'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* FORM THÊM NỘI DUNG HOẶC CHỈNH SỬA NỘI DUNG (MODAL / INLINE) */}
        {isEditing && (
          <div className="p-6 rounded-2xl bg-stone-900 border-2 border-amber-500/60 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold uppercase tracking-wider text-white">
                  {editingId ? 'Chỉnh sửa sáng kiến mô hình' : 'Thêm mới sáng kiến mô hình sách'}
                </h3>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* TIÊU ĐỀ */}
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-bold text-amber-300 mb-1.5">
                    Tiêu đề sáng kiến mô hình sách *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Ví dụ: Mô hình Sách Sa bàn Điện tử 3D Pháo binh..."
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white placeholder-stone-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {/* CHƯƠNG & MÃ HIỆU */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-300 mb-1.5">
                    Chương tài liệu
                  </label>
                  <input
                    type="text"
                    value={formChapter}
                    onChange={(e) => setFormChapter(e.target.value)}
                    placeholder="Chương I: Mô hình Sa bàn Tác chiến"
                    className="w-full px-4 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-300 mb-1.5">
                    Phân loại / Loại mô hình
                  </label>
                  <input
                    type="text"
                    value={formModelType}
                    onChange={(e) => setFormModelType(e.target.value)}
                    placeholder="Sa bàn 3D, Mô hình Pop-up, v.v."
                    className="w-full px-4 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-300 mb-1.5">
                    Tác giả / Khoa thực hiện
                  </label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="Thiếu tá Lê Thị Phương Thanh - Khoa Pháo binh"
                    className="w-full px-4 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-300 mb-1.5">
                    Mã số sáng kiến
                  </label>
                  <input
                    type="text"
                    value={formSubtitle}
                    onChange={(e) => setFormSubtitle(e.target.value)}
                    placeholder="SK-PB-01/2026"
                    className="w-full px-4 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* NỘI DUNG BẮT BUỘC: Ý NGHĨA MÔ HÌNH */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-amber-300 mb-1.5">
                  Ý nghĩa mô hình *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formMeaning}
                  onChange={(e) => setFormMeaning(e.target.value)}
                  placeholder="Nêu rõ mục tiêu nghiên cứu, giá trị khoa học, sự cải tiến so với giáo cụ truyền thống..."
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white placeholder-stone-500 focus:border-amber-400 focus:outline-none text-sm leading-relaxed"
                />
              </div>

              {/* NỘI DUNG BẮT BUỘC: VẬN DỤNG MÔ HÌNH */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-emerald-300 mb-1.5">
                  Vận dụng mô hình *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formApplication}
                  onChange={(e) => setFormApplication(e.target.value)}
                  placeholder="Mô tả phạm vi ứng dụng trong giảng dạy, huấn luyện khẩu đội, diễn tập thực binh pháo binh..."
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white placeholder-stone-500 focus:border-emerald-400 focus:outline-none text-sm leading-relaxed"
                />
              </div>

              {/* THÊM VIDEO TỪ THƯ MỤC TRONG PROJECT HOẶC TẢI LÊN */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-red-500" />
                    <span className="text-xs uppercase tracking-wider font-bold text-amber-300">
                      Cài đặt Video mô hình (Từ thư mục dự án hoặc máy tính)
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400">Hỗ trợ MP4/WebM/Blob</span>
                </div>

                {/* Chọn video có sẵn trong thư mục */}
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">
                    1. Chọn video mẫu có sẵn trong thư mục dự án:
                  </label>
                  <select
                    value={formVideoUrl}
                    onChange={(e) => {
                      setFormVideoUrl(e.target.value);
                      const chosen = PROJECT_VIDEOS.find((v) => v.url === e.target.value);
                      if (chosen) setFormVideoTitle(chosen.title);
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                  >
                    {PROJECT_VIDEOS.map((pv, i) => (
                      <option key={i} value={pv.url}>
                        {pv.title} ({pv.filename})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Hoặc tải video từ máy tính */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] text-stone-400 mb-1">
                      2. Hoặc tải tệp video từ máy tính (Offline):
                    </label>
                    <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-dashed border-stone-600 hover:border-amber-400 text-stone-300 hover:text-white text-xs cursor-pointer transition-colors">
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>Chọn tệp video từ máy...</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] text-stone-400 mb-1">
                      3. Hoặc đường dẫn Video URL:
                    </label>
                    <input
                      type="text"
                      value={formVideoUrl}
                      onChange={(e) => setFormVideoUrl(e.target.value)}
                      placeholder="https://... hoặc /videos/ten_video.mp4"
                      className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Xem trước tệp video đã chọn */}
                {formVideoUrl && (
                  <div className="pt-2 text-xs text-emerald-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="truncate">Đang chọn video: {formVideoUrl}</span>
                  </div>
                )}
              </div>

              {/* Nút lưu / huỷ */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer"
                >
                  Huỷ bỏ
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-600 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingId ? 'Lưu Chỉnh Sửa' : 'Thêm Sáng Kiến'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* DANH SÁCH TẤT CẢ CÁC SÁNG KIẾN MÔ HÌNH SÁCH */}
        <div className="bg-stone-900/90 rounded-2xl border border-stone-800 overflow-hidden shadow-xl">
          <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span className="text-xs uppercase tracking-wider font-bold text-stone-200">
                Danh sách mô hình sáng kiến hiện có ({models.length})
              </span>
            </div>
            <span className="text-[11px] text-stone-400">
              Có thể chỉnh sửa, thêm video hoặc xoá bỏ
            </span>
          </div>

          <div className="divide-y divide-stone-800">
            {models.map((item, index) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-stone-800/40 transition-colors"
              >
                {/* Thông tin mô hình */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-16 h-12 rounded-lg bg-stone-950 overflow-hidden shrink-0 border border-stone-700">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-900 text-red-200">
                        Trang {index + 1}
                      </span>
                      <span className="text-xs font-semibold text-amber-400">
                        {item.chapter}
                      </span>
                      <span className="text-[10px] text-stone-500">·</span>
                      <span className="text-[10px] text-emerald-400 font-medium">
                        {item.modelType}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>

                    <div className="mt-1 text-xs text-stone-400 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <p className="line-clamp-1">
                        <strong className="text-amber-300/90 font-medium">Ý nghĩa:</strong>{' '}
                        {item.meaning}
                      </p>
                      <p className="line-clamp-1">
                        <strong className="text-emerald-300/90 font-medium">Vận dụng:</strong>{' '}
                        {item.application}
                      </p>
                    </div>

                    <div className="mt-1 text-[11px] text-stone-500 flex items-center gap-3">
                      <span>Tác giả: {item.author}</span>
                      <span>Video: {item.videoUrl ? 'Có video đính kèm' : 'Chưa có'}</span>
                    </div>
                  </div>
                </div>

                {/* Nút hành động: NÚT CHỈNH SỬA & NÚT XOÁ */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => handleOpenEditForm(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-white text-xs font-semibold border border-stone-700 hover:border-amber-400 transition-all cursor-pointer"
                    aria-label={`Chỉnh sửa nội dung ${item.title}`}
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Chỉnh sửa</span>
                  </button>

                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/70 hover:bg-red-900 text-red-300 hover:text-white text-xs font-semibold border border-red-800/80 hover:border-red-600 transition-all cursor-pointer"
                    aria-label={`Xoá sáng kiến ${item.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xoá</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HƯỚNG DẪN TRIỂN KHAI PYTHON FLASK OFFLINE TẠI MÁY CHỦ TRƯỜNG SĨ QUAN PHÁO BINH */}
        <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-stone-300 text-xs space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold uppercase tracking-wider text-emerald-300 text-xs">
              Hướng dẫn triển khai Python Flask trên máy chủ nội bộ (Offline)
            </h4>
          </div>
          <p className="leading-relaxed text-stone-300">
            Hệ thống đã được thiết kế sẵn sàng hoạt động độc lập không cần kết nối mạng Internet. Để triển khai trên máy chủ nội bộ Trường Sĩ quan Pháo binh:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-stone-400">
            <li>Nhấp vào nút <strong className="text-white">“Tải Python Flask Server”</strong> ở trên để tải tệp <code className="text-amber-300 font-mono">server.py</code>.</li>
            <li>Đặt tệp <code className="text-amber-300 font-mono">server.py</code> cùng thư mục với các tệp mã nguồn và thư mục video.</li>
            <li>Chạy lệnh: <code className="text-amber-300 font-mono bg-stone-900 px-2 py-0.5 rounded">python server.py</code></li>
            <li>Mọi máy tính trong mạng LAN của nhà trường có thể truy cập qua: <code className="text-emerald-400 font-mono">http://[IP_LAN]:5000</code>.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
