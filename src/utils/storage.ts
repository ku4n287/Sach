import { BookCoverData, BookModelItem } from '../types.ts';
import { INITIAL_BOOK_MODELS, INITIAL_COVER_DATA } from '../data/initialData.ts';

const STORAGE_KEY_MODELS = 'sqpb_book_models_v3';
const STORAGE_KEY_COVER = 'sqpb_book_cover_v3';

export function loadStoredBookModels(): BookModelItem[] {
  if (typeof window === 'undefined') return INITIAL_BOOK_MODELS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MODELS);
    if (!raw) {
      saveStoredBookModels(INITIAL_BOOK_MODELS);
      return INITIAL_BOOK_MODELS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_BOOK_MODELS;
  } catch (e) {
    console.error('Lỗi đọc dữ liệu từ LocalStorage:', e);
    return INITIAL_BOOK_MODELS;
  }
}

export function saveStoredBookModels(models: BookModelItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_MODELS, JSON.stringify(models));
  } catch (e) {
    console.error('Lỗi lưu dữ liệu:', e);
  }
}

export function loadStoredCoverData(): BookCoverData {
  if (typeof window === 'undefined') return INITIAL_COVER_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COVER);
    if (!raw) {
      saveStoredCoverData(INITIAL_COVER_DATA);
      return INITIAL_COVER_DATA;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Lỗi đọc bìa sách:', e);
    return INITIAL_COVER_DATA;
  }
}

export function saveStoredCoverData(data: BookCoverData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_COVER, JSON.stringify(data));
  } catch (e) {
    console.error('Lỗi lưu bìa sách:', e);
  }
}

export function resetAllDataToDefault(): { models: BookModelItem[]; cover: BookCoverData } {
  saveStoredBookModels(INITIAL_BOOK_MODELS);
  saveStoredCoverData(INITIAL_COVER_DATA);
  return {
    models: INITIAL_BOOK_MODELS,
    cover: INITIAL_COVER_DATA,
  };
}

export function exportDatabaseAsJSON(): void {
  const models = loadStoredBookModels();
  const cover = loadStoredCoverData();
  const exportPayload = {
    institution: 'Trường Sĩ quan Pháo binh',
    exportedAt: new Date().toISOString(),
    version: '2026.1',
    cover,
    models,
  };

  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sang_kien_mo_hinh_sach_sqpb_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Tạo và tải về file mã nguồn Python Flask server.py hoàn chỉnh
 * để triển khai offline trên mạng nội bộ LAN của Trường Sĩ quan Pháo binh
 */
export function downloadPythonFlaskServer(): void {
  const flaskCode = `# -*- coding: utf-8 -*-
"""
HỆ THỐNG MÁY CHỦ PYTHON FLASK QUẢN LÝ SÁNG KIẾN MÔ HÌNH SÁCH
TRƯỜNG SĨ QUAN PHÁO BINH - BỘ TƯ LỆNH PHÁO BINH
Phiên bản: 2026.1 (Sẵn sàng chạy Offline trên mạng nội bộ LAN)

Cách sử dụng:
1. Cài đặt Python 3.9+
2. Cài đặt Flask: pip install flask flask-cors
3. Đặt các file build (dist) cùng thư mục hoặc chạy: python server.py
4. Truy cập trên trình duyệt máy trạm quân sự: http://localhost:5000 hoặc http://[IP_LAN]:5000
"""

import os
import json
from flask import Flask, request, jsonify, send_from_directory, render_template_string
from flask_cors import CORS

app = Flask(__name__, static_folder="dist", static_url_path="")
CORS(app)

DATA_FILE = "database_sang_kien.json"

DEFAULT_DATA = {
    "cover": {
        "topAuthority": "BỘ TƯ LỆNH PHÁO BINH – TÊN LỬA",
        "schoolName": "TRƯỜNG SĨ QUAN PHÁO BINH",
        "mainTitle": "SÁNG KIẾN MÔ HÌNH SÁCH",
        "leadAuthor": "Chủ biên: Thiếu tá Lê Thị Phương Thanh",
        "coAuthor": "Tham gia: Đại uý Nguyễn Hoàng An",
        "publishYear": "2026"
    },
    "models": []
}

def load_data():
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(DEFAULT_DATA, f, ensure_ascii=False, indent=2)
        return DEFAULT_DATA
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print("Lỗi đọc dữ liệu:", e)
        return DEFAULT_DATA

def save_data(data):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

@app.route("/api/pages", methods=["GET"])
def get_pages():
    data = load_data()
    return jsonify(data)

@app.route("/api/pages", methods=["POST"])
def update_pages():
    payload = request.get_json()
    if not payload:
        return jsonify({"error": "Không có dữ liệu gửi lên"}), 400
    save_data(payload)
    return jsonify({"success": True, "message": "Đã lưu thành công vào cơ sở dữ liệu Flask"})

@app.route("/api/upload_video", methods=["POST"])
def upload_video():
    if "video" not in request.files:
        return jsonify({"error": "Không có tệp video nào được chọn"}), 400
    file = request.files["video"]
    if file.filename == "":
        return jsonify({"error": "Tên tệp rỗng"}), 400
    
    upload_folder = os.path.join("dist", "videos")
    os.makedirs(upload_folder, exist_ok=True)
    filepath = os.path.join(upload_folder, file.filename)
    file.save(filepath)
    return jsonify({"success": True, "videoUrl": f"/videos/{file.filename}"})

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    print("=" * 60)
    print("MÁY CHỦ NỘI BỘ TRƯỜNG SĨ QUAN PHÁO BINH ĐANG KHỞI CHẠY...")
    print("Cổng dịch vụ: http://0.0.0.0:5000")
    print("Sẵn sàng hoạt động hoàn toàn Offline không cần Internet.")
    print("=" * 60)
    app.run(host="0.0.0.0", port=5000, debug=False)
`;

  const blob = new Blob([flaskCode], { type: 'text/x-python;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'server.py';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
