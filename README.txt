STARRY C-DRAMA CARDS — V11.3
Thư viện sưu tầm thẻ diễn viên C-Drama, chạy trên GitHub Pages và cài được như PWA.

TÍNH NĂNG
- Mở 1 hoặc 10 thẻ theo độ hiếm N / R / SR / SSR / UR / SP.
- Thư viện cá nhân và danh mục khám phá toàn bộ thẻ; tìm kiếm, lọc, sắp xếp và xem dạng lưới/danh sách.
- Kệ phim trực quan bằng poster; lọc theo năm/thể loại/trạng thái, sắp xếp theo tên, năm, tiến độ hoặc số phiên bản.
- Lối tắt “Tiếp tục sưu tầm” cho phim đang dang dở và nhãn trạng thái chưa bắt đầu/đang sưu tầm/hoàn thành.
- Yêu thích, ghim và đánh dấu muốn sưu tầm phim; ưu tiên phim ghim/yêu thích trên kệ.
- Thống kê phim hoàn thành và thẻ còn thiếu; hồ sơ phim có danh sách phiên bản còn thiếu và thao tác yêu thích/ghim.
- Bộ lọc sưu tầm có thể lưu, áp dụng lại hoặc xóa; dữ liệu bộ lọc và phim yêu thích nằm trong IndexedDB và bản sao lưu.
- Trang phim và hồ sơ diễn viên liên kết với từng phiên bản thẻ.
- Quản lý metadata dùng chung theo phim: poster, tên gốc, năm phát hành, thể loại, mô tả.
- Yêu thích, tiến độ sưu tầm, nâng sao 1★–5★, level, hiệu ứng holographic và xếp hạng toàn kho.
- Quản lý thẻ mẫu/thẻ tự thêm; nhập hàng loạt CSV/TSV hoặc dán bảng với xem trước, kiểm tra dữ liệu và bỏ qua thẻ trùng mặc định.
- Danh mục phim độc lập với danh mục thẻ; nhập metadata phim hàng loạt, gộp metadata an toàn và giữ phim chưa có thẻ trong danh mục/kệ/hồ sơ.
- Tra cứu phim bộ/điện ảnh qua TMDB, xem trước kết quả và poster rồi xác nhận lưu; token API chỉ tồn tại trong phiên tab và không được ghi vào bộ nhớ ứng dụng.
- Hiển thị attribution TMDB; các trường được nhập từ TMDB tự hết hạn sau 180 ngày nếu chưa được chỉnh sửa thủ công.
- Sao lưu V5 có xem trước khi khôi phục, phát hiện ID trùng và kiểm tra các mục sở hữu không khớp.
- Tùy chỉnh bảng màu, mật độ hiển thị; hỗ trợ điều hướng bằng bàn phím và giảm chuyển động.

MÃ NGUỒN
- index.html, css/: giao diện và bố cục.
- data/characters.js: danh mục thẻ mẫu.
- js/collection.js, js/library.js: thư viện, trang phim, hồ sơ diễn viên và liên kết.
- js/movie-manager.js: quản lý metadata phim; js/detail.js: hồ sơ phiên bản thẻ.
- js/gacha.js, rarity.js, upgrade.js: mở thẻ, độ hiếm và nâng cấp.
- js/leaderboard.js: xếp hạng; js/manager.js, storage.js, state.js: quản lý và lưu trữ.
- js/pwa.js, service-worker.js: PWA và cập nhật.

DỮ LIỆU & PHÁT HÀNH
- Sở hữu/yêu thích/nâng cấp và tùy chỉnh giao diện lưu trong localStorage; thẻ cá nhân, ảnh, metadata, yêu thích/ghim phim và bộ lọc đã lưu nằm trong IndexedDB của trình duyệt/thiết bị. Bản sao lưu JSON V5 bao gồm cả hai nhóm dữ liệu.
- Không đổi STORAGE_KEY, DB_NAME, DB_VERSION hoặc xóa localStorage/IndexedDB nếu chưa có migration tương thích.
- Triển khai index.html, css/, js/, data/, service-worker.js, manifest.webmanifest, favicon và icons/ lên GitHub Pages.
- Mỗi bản phát hành phải tăng CACHE_NAME trong service-worker.js.


LỘ TRÌNH PHIÊN BẢN
- V10.3: yêu thích, ghim phim và danh sách muốn sưu tầm.
- V10.4: hồ sơ phim hiển thị rõ phiên bản còn thiếu và thao tác liên quan.
- V10.5: thống kê phim hoàn thành, phim đang sưu tầm và thẻ còn thiếu.
- V10.6: lưu, áp dụng và xóa bộ lọc tìm kiếm.
- V10.7: bản sao lưu V5 có bản xem trước, cảnh báo trùng và kiểm tra dữ liệu sở hữu.
- V10.8: bảng màu và mật độ hiển thị tùy chỉnh.
- V10.9: cải thiện điều hướng bàn phím, focus và hỗ trợ giảm chuyển động.
- V11.0: tích hợp kệ phim, bộ lọc đã lưu, sao lưu an toàn hơn và tùy chỉnh giao diện.
- V11.1: nhập thẻ hàng loạt CSV/TSV hoặc dán bảng; xem trước, xác thực và phát hiện trùng trước khi lưu.
- V11.2: nhập danh mục phim hàng loạt, giữ metadata cũ theo mặc định và hỗ trợ phim chưa có thẻ trong danh mục, kệ phim và hồ sơ phim.
- V11.3: tra cứu metadata/poster bằng TMDB, xem trước trước khi lưu, không lưu token API và hết hạn trường dữ liệu TMDB sau 180 ngày.


TMDB & QUYỀN SỬ DỤNG
- Tra cứu tự động sử dụng TMDB API Read Access Token do người dùng tự cung cấp; token không được lưu trong localStorage, IndexedDB hoặc bản sao lưu.
- Với dữ liệu TMDB, ứng dụng hiển thị logo và thông báo không được TMDB chứng thực. Hãy tuân thủ điều khoản và yêu cầu cấp phép hiện hành của TMDB; việc dùng miễn phí nêu trong FAQ chỉ áp dụng cho mục đích phi thương mại có ghi nguồn.
- Các trường có nguồn TMDB được gắn mốc thời gian và tự được xóa khỏi metadata sau 180 ngày nếu không được người dùng chỉnh sửa thủ công, nhằm giới hạn lưu đệm dữ liệu nguồn.
