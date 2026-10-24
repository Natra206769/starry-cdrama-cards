STARRY C-DRAMA CARDS — V9.4
Ứng dụng sưu tầm thẻ diễn viên phim Trung Quốc, chạy trên GitHub Pages và có thể cài như PWA.

CHỨC NĂNG
- Mở 1 hoặc 10 thẻ với xác suất theo độ hiếm N / R / SR / SSR / UR / SP.
- Sưu tầm theo phim, tìm kiếm, lọc, yêu thích và xem hồ sơ diễn viên.
- Nâng sao 1★–5★, nâng level bằng phôi, hiệu ứng thăng hoa và bề mặt holographic.
- Bảng xếp hạng toàn bộ kho thẻ hệ thống; quản lý thẻ mẫu/thẻ tự thêm.
- Sao lưu/khôi phục JSON; hỗ trợ cache ngoại tuyến và cập nhật có xác nhận.

MÃ NGUỒN
- js/config.js: tỉ lệ, chi phí nâng sao, EXP và điểm xếp hạng.
- data/characters.js: danh mục thẻ mẫu.
- js/gacha.js, rarity.js: mở thẻ và xác suất.
- js/collection.js, upgrade.js, detail.js: bộ sưu tập, nâng cấp, hồ sơ thẻ.
- js/leaderboard.js: bảng xếp hạng.
- js/manager.js, storage.js, state.js: quản lý thẻ và lưu trữ.
- css/: giao diện theo từng khu vực; index.html: cấu trúc; js/pwa.js và service-worker.js: cập nhật PWA.

DỮ LIỆU & PHÁT HÀNH
- Tiến độ sở hữu/yêu thích/nâng cấp nằm trong localStorage; ảnh và dữ liệu quản lý thẻ nằm trong IndexedDB của trình duyệt/thiết bị. Dùng Quản lý thẻ → Sao lưu trước khi đổi máy hoặc xóa dữ liệu trình duyệt.
- Không đổi STORAGE_KEY, DB_NAME, DB_VERSION hay xóa IndexedDB/localStorage khi phát hành nếu chưa có migration tương thích.
- Triển khai đầy đủ index.html, css/, js/, data/, service-worker.js, manifest.webmanifest, favicon và icons/ lên GitHub Pages.
- Mỗi bản phát hành phải tăng CACHE_NAME trong service-worker.js để trình duyệt nhận tài nguyên mới.