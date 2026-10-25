# -*- coding: utf-8 -*-
"""
HỆ THỐNG MÁY CHỦ PYTHON FLASK QUẢN LÝ SÁNG KIẾN MÔ HÌNH SÁCH
TRƯỜNG SĨ QUAN PHÁO BINH - BỘ TƯ LỆNH PHÁO BINH
Phiên bản: 2026.1 (Sẵn sàng chạy Offline trên mạng nội bộ LAN)

Hướng dẫn chạy:
1. Đảm bảo máy tính đã cài Python 3.9+
2. Cài đặt thư viện: pip install flask flask-cors
3. Khởi chạy: python server.py
4. Truy cập từ trình duyệt các máy trạm trong trường:
   - Tại máy chủ: http://localhost:5000
   - Tại các máy trạm qua mạng LAN: http://[Địa_chỉ_IP_máy_chủ]:5000
   - Quản trị nội dung: http://[Địa_chỉ_IP_máy_chủ]:5000/admin
"""

import os
import json
from flask import Flask, request, jsonify, send_from_directory
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
        "publishYear": "2026",
        "motto": "Chân đồng, vai sắt, đánh giỏi, bắn trúng"
    },
    "models": [
        {
            "id": "mohinh-01",
            "chapter": "Chương I: Mô hình Sa bàn Tác chiến",
            "chapterNumber": 1,
            "title": "Mô hình Sách Sa bàn Điện tử 3D Pháo binh Chi viện Hỏa lực",
            "subtitle": "Mã số: SK-PB-01/2026",
            "modelType": "Sa bàn điện tử tương tác 3D",
            "meaning": "Mô hình sách sa bàn điện tử 3D giúp trực quan hoá không gian địa hình chiến trường, tọa độ mục tiêu và quỹ đạo đường đạn pháo binh trong không gian 3 chiều...",
            "application": "Ứng dụng trực tiếp trong các giờ học Chiến thuật Pháo binh, Huấn luyện Bắn và Điều khiển Hỏa lực tại giảng đường chuyên dùng và bãi tập...",
            "videoUrl": "/videos/saban_phaobinh_3d.mp4",
            "author": "Thiếu tá Lê Thị Phương Thanh - Khoa Pháo binh",
            "creationYear": "2026"
        }
    ]
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
        print("Lỗi đọc dữ liệu cơ sở dữ liệu:", e)
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
        return jsonify({"error": "Dữ liệu không hợp lệ"}), 400
    save_data(payload)
    return jsonify({"success": True, "message": "Đã lưu thành công dữ liệu sáng kiến vào Flask"})

@app.route("/api/upload_video", methods=["POST"])
def upload_video():
    if "video" not in request.files:
        return jsonify({"error": "Không có tệp video nào được gửi lên"}), 400
    file = request.files["video"]
    if file.filename == "":
        return jsonify({"error": "Tên tệp không hợp lệ"}), 400
    
    upload_folder = os.path.join(app.static_folder or "dist", "videos")
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
    print("=" * 70)
    print("★ TRƯỜNG SĨ QUAN PHÁO BINH - HỆ THỐNG SÁCH ĐIỆN TỬ 3D NĂM 2026 ★")
    print("Máy chủ Python Flask đang hoạt động tại: http://0.0.0.0:5000")
    print("Chế độ: Hoạt động hoàn toàn Offline trên mạng nội bộ quân sự.")
    print("=" * 70)
    app.run(host="0.0.0.0", port=5000, debug=False)
