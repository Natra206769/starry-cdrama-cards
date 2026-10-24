STARRY C-DRAMA CARDS — V10.0A
Thư viện sưu tầm thẻ diễn viên C-Drama, chạy trên GitHub Pages và cài được như PWA.

TÍNH NĂNG
- Mở 1 hoặc 10 thẻ theo độ hiếm N / R / SR / SSR / UR / SP.
- Thư viện cá nhân và danh mục khám phá toàn bộ thẻ.
- Tìm kiếm, lọc độ hiếm/phong cách, sắp xếp theo tên/sao/level/số bản sao; xem dạng lưới hoặc danh sách.
- Nhóm thẻ theo phim, tiến độ sưu tầm, yêu thích, hồ sơ diễn viên và liên kết bạn diễn.
- Nâng sao 1★–5★, tăng level bằng phôi, hiệu ứng thăng hoa và khung holographic.
- Bảng xếp hạng toàn bộ kho thẻ; quản lý, sao lưu và khôi phục dữ liệu.

MÃ NGUỒN
- index.html, css/: giao diện và bố cục.
- data/characters.js: danh mục thẻ mẫu.
- js/collection.js, detail.js: thư viện, lọc, trang chi tiết và liên kết diễn viên.
- js/gacha.js, rarity.js, upgrade.js: mở thẻ, độ hiếm và nâng cấp.
- js/leaderboard.js: xếp hạng; js/manager.js, storage.js, state.js: quản lý và lưu trữ.
- js/pwa.js, service-worker.js: PWA và cập nhật.

DỮ LIỆU & PHÁT HÀNH
- Sở hữu/yêu thích/nâng cấp lưu trong localStorage; ảnh và dữ liệu thẻ quản lý lưu trong IndexedDB của thiết bị. Hãy sao lưu trước khi đổi thiết bị hoặc xóa dữ liệu trình duyệt.
- Không đổi STORAGE_KEY, DB_NAME, DB_VERSION hoặc xóa localStorage/IndexedDB nếu chưa có migration tương thích.
- Triển khai index.html, css/, js/, data/, service-worker.js, manifest.webmanifest, favicon và icons/ lên GitHub Pages.
- Mỗi bản phát hành phải tăng CACHE_NAME trong service-worker.js.
