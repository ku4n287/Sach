import { BookCoverData, BookModelItem } from '../types.ts';

// Vector SVG minh họa mô hình sách chất lượng cao 100% Offline
const SVG_MODEL_1 = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <defs>
    <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c2e1c"/>
      <stop offset="50%" stop-color="#14532d"/>
      <stop offset="100%" stop-color="#051910"/>
    </linearGradient>
    <linearGradient id="gold1" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bg1)"/>
  <rect x="20" y="20" width="560" height="360" rx="16" fill="none" stroke="#eab308" stroke-width="2" stroke-opacity="0.4"/>
  <!-- Lưới địa hình sa bàn 3D -->
  <g stroke="#22c55e" stroke-width="1.5" stroke-opacity="0.3" fill="none">
    <path d="M 50 300 L 300 200 L 550 300 L 300 370 Z"/>
    <path d="M 120 270 L 300 215 L 480 270 L 300 325 Z"/>
    <path d="M 190 240 L 300 230 L 410 240 L 300 280 Z"/>
    <!-- Đường đạn parabol pháo binh -->
    <path d="M 150 280 Q 300 60 460 270" stroke="#ef4444" stroke-width="3.5" stroke-dasharray="6 3"/>
  </g>
  <!-- Biểu tượng đài ngắm và chớp nổ mục tiêu -->
  <circle cx="460" cy="270" r="14" fill="#dc2626" fill-opacity="0.6"/>
  <circle cx="460" cy="270" r="6" fill="#fef08a"/>
  <!-- Nòng pháo phát hỏa -->
  <circle cx="150" cy="280" r="8" fill="#eab308"/>
  <text x="300" y="80" text-anchor="middle" fill="url(#gold1)" font-size="20" font-weight="900" font-family="sans-serif" letter-spacing="2">SA BAN PHAO BINH DIEN TU 3D</text>
  <text x="300" y="115" text-anchor="middle" fill="#86efac" font-size="12" font-family="sans-serif">MO PHONG QUY DAO DUONG DAN CHI VIEN HOA LUC</text>
  <rect x="220" y="335" width="160" height="28" rx="6" fill="#991b1b" stroke="#eab308" stroke-width="1.5"/>
  <text x="300" y="354" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold" font-family="sans-serif">MO HINH CHUONG 1</text>
</svg>
`)}`;

const SVG_MODEL_2 = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <defs>
    <linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1c1917"/>
      <stop offset="60%" stop-color="#292524"/>
      <stop offset="100%" stop-color="#0c0a09"/>
    </linearGradient>
    <linearGradient id="steel2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e2e8f0"/>
      <stop offset="50%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
    <linearGradient id="gold2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bg2)"/>
  <rect x="20" y="20" width="560" height="360" rx="16" fill="none" stroke="#eab308" stroke-width="2" stroke-opacity="0.4"/>
  <!-- Cắt bổ khóa nòng pháo lựu 152mm -->
  <g transform="translate(130, 140)">
    <rect x="0" y="20" width="340" height="90" rx="6" fill="url(#steel2)" stroke="#1e293b" stroke-width="2"/>
    <rect x="80" y="35" width="180" height="60" rx="4" fill="#334155" stroke="#f59e0b" stroke-width="2"/>
    <!-- Kim hỏa & nêm khóa nòng -->
    <polygon points="120,45 220,45 190,85 150,85" fill="#facc15" stroke="#78350f" stroke-width="1.5"/>
    <circle cx="170" cy="65" r="8" fill="#ef4444"/>
    <!-- Lò xo đẩy về -->
    <path d="M 270 50 Q 280 40 290 50 T 310 50 T 330 50" fill="none" stroke="#38bdf8" stroke-width="3"/>
  </g>
  <text x="300" y="80" text-anchor="middle" fill="url(#gold2)" font-size="20" font-weight="900" font-family="sans-serif" letter-spacing="2">CAU TAO KHOA NONG PHAO 152MM</text>
  <text x="300" y="115" text-anchor="middle" fill="#cbd5e1" font-size="12" font-family="sans-serif">MO HINH POP-UP 3D DONG LUC HOC</text>
  <rect x="220" y="335" width="160" height="28" rx="6" fill="#991b1b" stroke="#eab308" stroke-width="1.5"/>
  <text x="300" y="354" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold" font-family="sans-serif">MO HINH CHUONG 1</text>
</svg>
`)}`;

const SVG_MODEL_3 = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <defs>
    <linearGradient id="bg3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#022c22"/>
      <stop offset="70%" stop-color="#064e3b"/>
      <stop offset="100%" stop-color="#021d17"/>
    </linearGradient>
    <linearGradient id="gold3" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bg3)"/>
  <rect x="20" y="20" width="560" height="360" rx="16" fill="none" stroke="#eab308" stroke-width="2" stroke-opacity="0.4"/>
  <!-- Đĩa xoay tra cứu quang học -->
  <g transform="translate(300, 220)">
    <circle cx="0" cy="0" r="95" fill="#042f2e" stroke="#2dd4bf" stroke-width="3"/>
    <circle cx="0" cy="0" r="75" fill="#134e4a" stroke="#eab308" stroke-width="2" stroke-dasharray="8 4"/>
    <circle cx="0" cy="0" r="50" fill="#0f766e" stroke="#5eead4" stroke-width="2"/>
    <circle cx="0" cy="0" r="16" fill="#dc2626"/>
    <!-- Kim chỉ hướng gió và cự ly -->
    <line x1="0" y1="-85" x2="0" y2="85" stroke="#fef08a" stroke-width="2.5"/>
    <line x1="-85" y1="0" x2="85" y2="0" stroke="#fef08a" stroke-width="2.5"/>
    <!-- Điểm chia độ xạ giới -->
    <circle cx="0" cy="-60" r="4" fill="#ffffff"/>
    <circle cx="60" cy="0" r="4" fill="#ffffff"/>
    <circle cx="0" cy="60" r="4" fill="#ffffff"/>
    <circle cx="-60" cy="0" r="4" fill="#ffffff"/>
  </g>
  <text x="300" y="75" text-anchor="middle" fill="url(#gold3)" font-size="20" font-weight="900" font-family="sans-serif" letter-spacing="2">TRA BANG BAN &amp; KHI TUONG PHAO BINH</text>
  <text x="300" y="105" text-anchor="middle" fill="#99f6e4" font-size="12" font-family="sans-serif">SO TAY MA TRAN QUANG HOC RUT GON</text>
  <rect x="220" y="340" width="160" height="28" rx="6" fill="#991b1b" stroke="#eab308" stroke-width="1.5"/>
  <text x="300" y="359" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold" font-family="sans-serif">MO HINH CHUONG 2</text>
</svg>
`)}`;

const SVG_MODEL_4 = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <defs>
    <linearGradient id="bg4" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#311010"/>
      <stop offset="50%" stop-color="#450a0a"/>
      <stop offset="100%" stop-color="#1c0707"/>
    </linearGradient>
    <linearGradient id="gold4" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bg4)"/>
  <rect x="20" y="20" width="560" height="360" rx="16" fill="none" stroke="#eab308" stroke-width="2" stroke-opacity="0.4"/>
  <!-- Dàn 40 ống phóng tên lửa BM-21 Grad -->
  <g transform="translate(180, 140)">
    <!-- Giàn ống phóng nghiêng 30 độ -->
    <rect x="0" y="0" width="240" height="120" rx="8" fill="#1e293b" stroke="#eab308" stroke-width="2.5"/>
    <!-- 4 hàng x 10 cột ống phóng -->
    <g fill="#0f172a" stroke="#cbd5e1" stroke-width="1.2">
      <circle cx="25" cy="25" r="9"/><circle cx="50" cy="25" r="9"/><circle cx="75" cy="25" r="9"/><circle cx="100" cy="25" r="9"/><circle cx="125" cy="25" r="9"/><circle cx="150" cy="25" r="9"/><circle cx="175" cy="25" r="9"/><circle cx="200" cy="25" r="9"/>
      <circle cx="25" cy="50" r="9"/><circle cx="50" cy="50" r="9"/><circle cx="75" cy="50" r="9"/><circle cx="100" cy="50" r="9"/><circle cx="125" cy="50" r="9"/><circle cx="150" cy="50" r="9"/><circle cx="175" cy="50" r="9"/><circle cx="200" cy="50" r="9"/>
      <circle cx="25" cy="75" r="9"/><circle cx="50" cy="75" r="9"/><circle cx="75" cy="75" r="9"/><circle cx="100" cy="75" r="9"/><circle cx="125" cy="75" r="9"/><circle cx="150" cy="75" r="9"/><circle cx="175" cy="75" r="9"/><circle cx="200" cy="75" r="9"/>
      <circle cx="25" cy="100" r="9"/><circle cx="50" cy="100" r="9"/><circle cx="75" cy="100" r="9"/><circle cx="100" cy="100" r="9"/><circle cx="125" cy="100" r="9"/><circle cx="150" cy="100" r="9"/><circle cx="175" cy="100" r="9"/><circle cx="200" cy="100" r="9"/>
    </g>
    <!-- Tia lửa phóng tên lửa -->
    <path d="M 200 25 L 240 10 L 225 35 Z" fill="#f97316"/>
  </g>
  <text x="300" y="75" text-anchor="middle" fill="url(#gold4)" font-size="20" font-weight="900" font-family="sans-serif" letter-spacing="2">HE THONG TEN LUA BM-21 GRAD</text>
  <text x="300" y="105" text-anchor="middle" fill="#fca5a5" font-size="12" font-family="sans-serif">MO HINH PHAO PHAN LUC 40 ONG PHONG</text>
  <rect x="220" y="340" width="160" height="28" rx="6" fill="#991b1b" stroke="#eab308" stroke-width="1.5"/>
  <text x="300" y="359" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold" font-family="sans-serif">MO HINH CHUONG 2</text>
</svg>
`)}`;

const SVG_MODEL_5 = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <defs>
    <linearGradient id="bg5" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="50%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="gold5" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bg5)"/>
  <rect x="20" y="20" width="560" height="360" rx="16" fill="none" stroke="#eab308" stroke-width="2" stroke-opacity="0.4"/>
  <!-- UAV & Màn hình Radar trinh sát điểm nổ -->
  <g transform="translate(300, 210)">
    <!-- Vòng tròn Radar quét -->
    <circle cx="0" cy="0" r="90" fill="#022c22" stroke="#22c55e" stroke-width="2"/>
    <circle cx="0" cy="0" r="60" stroke="#22c55e" stroke-width="1" stroke-dasharray="4 3" fill="none"/>
    <circle cx="0" cy="0" r="30" stroke="#22c55e" stroke-width="1" stroke-dasharray="4 3" fill="none"/>
    <!-- Cánh bay UAV -->
    <path d="M 0 -40 L 45 0 L 10 10 L 0 5 L -10 10 L -45 0 Z" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5"/>
    <circle cx="35" cy="-25" r="5" fill="#ef4444"/>
    <line x1="0" y1="0" x2="35" y2="-25" stroke="#ef4444" stroke-width="2" stroke-dasharray="2 2"/>
  </g>
  <text x="300" y="75" text-anchor="middle" fill="url(#gold5)" font-size="20" font-weight="900" font-family="sans-serif" letter-spacing="2">UAV TRINH SAT CHI THI MUC TIEU</text>
  <text x="300" y="105" text-anchor="middle" fill="#93c5fd" font-size="12" font-family="sans-serif">TAC CHIEN DIEN TU VA HIEU CHINH HOA LUC 2026</text>
  <rect x="220" y="340" width="160" height="28" rx="6" fill="#991b1b" stroke="#eab308" stroke-width="1.5"/>
  <text x="300" y="359" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold" font-family="sans-serif">MO HINH CHUONG 3</text>
</svg>
`)}`;

export const INITIAL_COVER_DATA: BookCoverData = {
  topAuthority: 'BỘ TƯ LỆNH PHÁO BINH – TÊN LỬA',
  schoolName: 'TRƯỜNG SĨ QUAN PHÁO BINH',
  mainTitle: 'SÁNG KIẾN MÔ HÌNH SÁCH',
  leadAuthor: 'Chủ biên: Thiếu tá Lê Thị Phương Thanh',
  coAuthor: 'Tham gia: Đại uý Nguyễn Hoàng An',
  subtitle: 'TÀI LIỆU GIÁO TRÌNH & MÔ HÌNH HỌC CỤ TRỰC QUAN NĂM 2026',
  publishYear: '2026',
  motto: 'Chân đồng, vai sắt, đánh giỏi, bắn trúng',
};

export const INITIAL_BOOK_MODELS: BookModelItem[] = [
  {
    id: 'mohinh-01',
    chapter: 'Chương I: Mô hình Sa bàn Tác chiến',
    chapterNumber: 1,
    title: 'Mô hình Sách Sa bàn Điện tử 3D Pháo binh Chi viện Hỏa lực',
    subtitle: 'Mã số sáng kiến: SK-PB-01/2026',
    modelType: 'Sa bàn điện tử tương tác 3D',
    meaning:
      'Mô hình sách sa bàn điện tử 3D giúp trực quan hoá không gian địa hình chiến trường, tọa độ mục tiêu và quỹ đạo đường đạn pháo binh trong không gian 3 chiều. Sáng kiến khắc phục triệt để hạn chế của bản đồ phẳng truyền thống, giúp học viên sĩ quan và cán bộ phân đội nắm chắc phương pháp xác định phần tử bắn cơ bản, góc tầm, góc hướng và các vật cản trên đường đạn. Giảm đến 45% thời gian tiếp thu bài học, kích thích tư duy chiến thuật và khả năng xử trí tình huống linh hoạt trong điều kiện hỏa lực tác chiến hiện đại.',
    application:
      'Ứng dụng trực tiếp trong các giờ học Chiến thuật Pháo binh, Huấn luyện Bắn và Điều khiển Hỏa lực tại giảng đường chuyên dùng và bãi tập dã ngoại. Mô hình có thể gấp gọn dạng cuốn sách tiêu chuẩn kích thước 16:9 dễ dàng cơ động ra thao trường. Cán bộ chỉ huy khẩu đội, trung đội có thể sử dụng sa bàn thu nhỏ để giao nhiệm vụ bắn chi viện hỏa lực cho bộ binh trong diễn tập hiệp đồng quân binh chủng có bắn đạn thật.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    videoTitle: 'Video thuyết minh & diễn tập vận hành Sa bàn Điện tử 3D',
    thumbnailUrl: SVG_MODEL_1,
    author: 'Thiếu tá Lê Thị Phương Thanh - Khoa Pháo binh',
    creationYear: '2026',
    status: 'active',
    keyPoints: [
      'Gấp gọn thành cuốn sách dày 4cm chuẩn 16:9',
      'Đèn LED lập trình mô phỏng đường đạn & chớp lửa',
      'Tích hợp vi điều khiển tính phần tử bắn',
    ],
  },
  {
    id: 'mohinh-02',
    chapter: 'Chương I: Mô hình Sa bàn Tác chiến',
    chapterNumber: 1,
    title: 'Mô hình Sách Pop-up Cấu tạo Khóa nòng & Cụm máy lùi Pháo Lựu 152mm',
    subtitle: 'Mã số sáng kiến: SK-PB-02/2026',
    modelType: 'Mô hình Pop-up kỹ thuật động lực',
    meaning:
      'Mô hình sách ứng dụng nguyên lý tạo hình pop-up 3D nhiều lớp mô phỏng chi tiết mặt cắt cấu tạo khóa nòng hình nêm, máy lùi và máy đẩy của lựu pháo 152mm D-20. Giúp người học quan sát rõ nét chu trình đóng - mở khóa nòng, hoạt động của cơ cấu điểm hỏa và quán tính lùi của pháo khi viên đạn rời khỏi miệng nòng pháo — những chi tiết bên trong mà mắt thường không thể quan sát được trên khí tài thực tế nếu chưa tháo rã toàn bộ.',
    application:
      'Được áp dụng giảng dạy trong môn Kỹ thuật Vũ khí Pháo binh, môn Khí tài Quân sự cho học viên các khoá đào tạo sĩ quan chỉ huy pháo binh. Hỗ trợ đắc lực công tác huấn luyện chiến sĩ mới thực hành quy trình tháo lắp, kiểm tra kỹ thuật an toàn trước khi bắn đạn thật, chuẩn đoán và khắc phục nhanh các hỏng hóc thông thường như kẹt kim hỏa, tụt áp máy đẩy về.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    videoTitle: 'Video mô phỏng nguyên lý chu trình khóa nòng lùi tự do',
    thumbnailUrl: SVG_MODEL_2,
    author: 'Đại uý Nguyễn Hoàng An - Khoa Vũ khí & Khí tài',
    creationYear: '2026',
    status: 'active',
    keyPoints: [
      'Cấu tạo pop-up 4 lớp bằng vật liệu composite dẻo',
      'Cần gạt chuyển động mô phỏng cơ cấu đóng mở',
      'Bảng tra thông số kỹ thuật tiêu chuẩn quân sự',
    ],
  },
  {
    id: 'mohinh-03',
    chapter: 'Chương II: Mô hình Tra cứu & Ứng dụng Số',
    chapterNumber: 2,
    title: 'Mô hình Sách Thông minh Tra cứu Bảng bắn & Phần tử Khí tượng Pháo binh',
    subtitle: 'Mã số sáng kiến: SK-PB-03/2026',
    modelType: 'Mô hình sổ tay ma trận quang học',
    meaning:
      'Số hóa và cô đọng toàn bộ ma trận số liệu tính toán sửa sai phần tử bắn theo các điều kiện khí tượng phi tiêu chuẩn (nhiệt độ không khí, áp suất khí quyển, tốc độ và hướng gió ngang, gió dọc). Mô hình sách tích hợp các đĩa xoay tính toán cơ học kết hợp mã phản hồi nhanh QR truy xuất dữ liệu khí tượng tức thời, xóa bỏ tình trạng cán bộ đo đạc phải mang theo nhiều cuốn bảng bắn dày cộp thao tác chậm chạp trong điều kiện đêm tối thiếu sáng.',
    application:
      'Trang bị cho trung đội đo đạc khí tượng và sĩ quan chỉ huy đại đội pháo binh trong các cuộc diễn tập bắn đạn thật ban đêm hoặc cơ động tác chiến nhanh. Rút ngắn thời gian tính toán sửa sai khí tượng từ 3 phút 20 giây xuống còn dưới 35 giây, đảm bảo hỏa lực pháo binh bất ngờ, đánh trúng mục tiêu ngay từ loạt đạn đầu tiên.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    videoTitle: 'Video hướng dẫn thao tác tra bảng bắn bằng đĩa tính quang học',
    thumbnailUrl: SVG_MODEL_3,
    author: 'Thiếu tá Lê Thị Phương Thanh & Đại uý Nguyễn Hoàng An',
    creationYear: '2026',
    status: 'active',
    keyPoints: [
      'Đĩa xoay tính toán quang học chống chói đêm',
      'Chống nước, chống va đập tiêu chuẩn dã ngoại',
      'Tích hợp bảng tra cứu đa cự ly từ 2km đến 24km',
    ],
  },
  {
    id: 'mohinh-04',
    chapter: 'Chương II: Mô hình Tra cứu & Ứng dụng Số',
    chapterNumber: 2,
    title: 'Mô hình Sách Mô phỏng Hệ thống Pháo phản lực Tên lửa BM-21 Grad',
    subtitle: 'Mã số sáng kiến: SK-PB-04/2026',
    modelType: 'Mô hình tương tác kỹ thuật hỏa lực',
    meaning:
      'Mô hình sách tái hiện chân thực khối 40 ống phóng tên lửa đường kính 122mm, hệ thống điều khiển tầm - hướng cơ - điện và bảng điện tử phát hỏa của xe pháo phản lực phóng loạt BM-21. Làm rõ quy luật tản mát của đạn phản lực, mật độ hỏa lực trùm phủ và nguyên lý phóng từng quả hoặc phóng loạt toàn phần trong 20 giây, giúp người học hiểu rõ uy lực hủy diệt của binh chủng tên lửa - pháo binh anh hùng.',
    application:
      'Dùng trong huấn luyện kíp xe chiến đấu BM-21 của Trường Sĩ quan Pháo binh và các lữ đoàn pháo binh phản lực toàn quân. Phục vụ thực hành phân bổ góc bắn theo diện tích mục tiêu, phối hợp tác chiến giữa xe chỉ huy điều khiển và các xe phóng trong tiểu đoàn.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    videoTitle: 'Video diễn tập phân bổ trận địa và phóng loạt tên lửa BM-21',
    thumbnailUrl: SVG_MODEL_4,
    author: 'Đại uý Nguyễn Hoàng An - Bộ môn Pháo phản lực',
    creationYear: '2026',
    status: 'active',
    keyPoints: [
      'Mô phỏng trọn vẹn 40 ống phóng tên lửa tỷ lệ 1:15',
      'Hệ thống công tắc bấm phát hỏa có âm thanh mô phỏng',
      'Bản đồ xạ giới và khu vực sát thương chuẩn hóa',
    ],
  },
  {
    id: 'mohinh-05',
    chapter: 'Chương III: Mô hình Đổi mới Công nghệ 2026',
    chapterNumber: 3,
    title: 'Mô hình Sách Tích hợp UAV Trinh sát & Chỉ huy Hỏa lực Hiện đại',
    subtitle: 'Mã số sáng kiến: SK-PB-05/2026',
    modelType: 'Mô hình tác chiến số đa chiều',
    meaning:
      'Hiện thực hóa phương châm "Mắt sáng, Trúng hiểm, Đánh mạnh" của pháo binh hiện đại năm 2026. Mô hình sách kết nối hình học giữa thiết bị bay không người lái (UAV) quang học với đài quan sát chỉ huy và trận địa pháo bằng các đường liên kết quang học có thể tháo lắp. Cung cấp phương pháp trực quan để học viên hiểu chuỗi "Trinh sát - Hiệu chỉnh - Bắn phá hủy - Đánh giá hiệu quả" trong thời gian thực.',
    application:
      'Đưa vào chương trình đào tạo học viên sĩ quan chỉ huy tham mưu pháo binh khóa mới. Giúp các phân đội thực hành bài tập bắn đạn thật có UAV trinh sát chỉ thị mục tiêu, phát huy tối đa tầm bắn và độ chính xác của các loại pháo tự hành và lựu pháo hiện đại của quân đội.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    videoTitle: 'Video ứng dụng UAV trinh sát pháo binh và hiệu chỉnh điểm nổ',
    thumbnailUrl: SVG_MODEL_5,
    author: 'Thiếu tá Lê Thị Phương Thanh - Chủ nhiệm đề tài',
    creationYear: '2026',
    status: 'active',
    keyPoints: [
      'Sơ đồ mạng truyền dữ liệu vệ tinh & sóng ngắn',
      'Mô hình UAV trinh sát cánh bằng có thể tháo lắp',
      'Bảng quy chuẩn hiệu chỉnh tọa độ điểm nổ trên màn hình',
    ],
  },
];
