STARRY C-DRAMA CARDS — V10.1
Thư viện sưu tầm thẻ diễn viên C-Drama, chạy trên GitHub Pages và cài được như PWA.

TÍNH NĂNG
- Mở 1 hoặc 10 thẻ theo độ hiếm N / R / SR / SSR / UR / SP.
- Thư viện cá nhân và danh mục khám phá toàn bộ thẻ; tìm kiếm, lọc, sắp xếp và xem dạng lưới/danh sách.
- Kệ phim trực quan bằng poster; lọc theo năm/thể loại, sắp xếp theo tên, năm, tiến độ hoặc số phiên bản.
- Trang phim và hồ sơ diễn viên liên kết với từng phiên bản thẻ.
- Quản lý metadata dùng chung theo phim: poster, tên gốc, năm phát hành, thể loại, mô tả.
- Yêu thích, tiến độ sưu tầm, nâng sao 1★–5★, level, hiệu ứng holographic và xếp hạng toàn kho.
- Quản lý thẻ mẫu/thẻ tự thêm; sao lưu và khôi phục JSON bao gồm dữ liệu phim.

MÃ NGUỒN
- index.html, css/: giao diện và bố cục.
- data/characters.js: danh mục thẻ mẫu.
- js/collection.js, js/library.js: thư viện, trang phim, hồ sơ diễn viên và liên kết.
- js/movie-manager.js: quản lý metadata phim; js/detail.js: hồ sơ phiên bản thẻ.
- js/gacha.js, rarity.js, upgrade.js: mở thẻ, độ hiếm và nâng cấp.
- js/leaderboard.js: xếp hạng; js/manager.js, storage.js, state.js: quản lý và lưu trữ.
- js/pwa.js, service-worker.js: PWA và cập nhật.

DỮ LIỆU & PHÁT HÀNH
- Sở hữu/yêu thích/nâng cấp lưu trong localStorage; thẻ cá nhân, ảnh và metadata phim lưu trong IndexedDB của trình duyệt/thiết bị. Dữ liệu sao lưu JSON có cả metadata phim.
- Không đổi STORAGE_KEY, DB_NAME, DB_VERSION hoặc xóa localStorage/IndexedDB nếu chưa có migration tương thích.
- Triển khai index.html, css/, js/, data/, service-worker.js, manifest.webmanifest, favicon và icons/ lên GitHub Pages.
- Mỗi bản phát hành phải tăng CACHE_NAME trong service-worker.js.
