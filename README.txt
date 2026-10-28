STARRY C-DRAMA CARDS — V11.6.0
Thư viện sưu tầm thẻ diễn viên C-Drama, chạy trên GitHub Pages và cài được như PWA.

TÍNH NĂNG
- Mở 1 hoặc 3 thẻ theo độ hiếm R / SR / SSR / SSR+ / UR / SP (N cũ tự chuyển thành R).
- Thư viện cá nhân và danh mục khám phá toàn bộ thẻ; tìm kiếm, lọc, sắp xếp và xem dạng lưới/danh sách.
- Kệ phim trực quan bằng poster; lọc theo năm/thể loại/trạng thái, sắp xếp theo tên, năm, tiến độ hoặc số phiên bản.
- Lối tắt “Tiếp tục sưu tầm” cho phim đang dang dở và nhãn trạng thái chưa bắt đầu/đang sưu tầm/hoàn thành.
- Yêu thích, ghim và đánh dấu muốn sưu tầm phim; ưu tiên phim ghim/yêu thích trên kệ.
- Thống kê phim hoàn thành và thẻ còn thiếu; hồ sơ phim có danh sách phiên bản còn thiếu và thao tác yêu thích/ghim.
- Bộ lọc sưu tầm có thể lưu, áp dụng lại hoặc xóa; dữ liệu bộ lọc và phim yêu thích nằm trong IndexedDB và bản sao lưu.
- Trang phim và hồ sơ diễn viên liên kết với từng phiên bản thẻ.
- Quản lý metadata dùng chung theo phim: poster, tên gốc, năm phát hành, thể loại, mô tả.
- Yêu thích, tiến độ sưu tầm, nâng sao 1★–5★, level, hiệu ứng holographic và xếp hạng toàn kho.
- Nghi thức triệu hồi riêng cho UR/SP, kết quả nhiều thẻ xuất hiện lần lượt và hiệu ứng nâng sao theo cấp đạt được.
- Phòng thử hiệu ứng miễn phí: xem trước độ hiếm và nâng thành công 2★–5★ mà không tiêu hao vé/thẻ hoặc sửa dữ liệu.
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
- js/leaderboard.js: xếp hạng điểm phim, điểm Nhan sắc và bảng diễn viên tổng thể; giới hạn 100 mục mỗi bảng.
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
- V11.3.3: sửa nhập CSV tên gốc bằng cách nhận thêm các biến thể tiêu đề cột và bỏ qua dấu câu trang trí.


TMDB & QUYỀN SỬ DỤNG
- Tra cứu tự động sử dụng TMDB API Read Access Token do người dùng tự cung cấp; token không được lưu trong localStorage, IndexedDB hoặc bản sao lưu.
- Với dữ liệu TMDB, ứng dụng hiển thị logo và thông báo không được TMDB chứng thực. Hãy tuân thủ điều khoản và yêu cầu cấp phép hiện hành của TMDB; việc dùng miễn phí nêu trong FAQ chỉ áp dụng cho mục đích phi thương mại có ghi nguồn.
- Các trường có nguồn TMDB được gắn mốc thời gian và tự được xóa khỏi metadata sau 180 ngày nếu không được người dùng chỉnh sửa thủ công, nhằm giới hạn lưu đệm dữ liệu nguồn.

V11.3.4 — Khắc phục nút mở hồ sơ phim trong Bộ sưu tập: mở hộp thoại trước khi dựng nội dung, bổ sung chế độ hồ sơ tương thích nếu phần hiển thị chi tiết gặp lỗi, và tách sự kiện nhấn khỏi các phần tử cha.

- V11.3.5: chuẩn hóa cách tính xếp hạng từ dữ liệu toàn kho; bổ sung bảng phim theo dàn diễn viên/điểm độ hiếm, tìm kiếm, Top 3 cải tiến và nhấn hàng để mở hồ sơ phim/diễn viên.
- V11.3.6: tinh gọn bố cục Bộ sưu tập, thu gọn công cụ phụ và tinh chỉnh điểm xếp hạng phim.


V11.4.0 — Hệ độ hiếm và bảng xếp hạng
- Loại bỏ N; mọi thẻ N trong dữ liệu cũ được tự động chuyển sang R, không đổi ID hay số lượng sở hữu.
- Thêm SSR+; khung và hiệu ứng của SSR+ dùng chung với SSR. Có thể gán cấp này khi sửa thẻ hoặc nhập CSV/TSV.
- Điểm độ hiếm mới: R 3, SR 5, SSR 9, SSR+ 11, UR 17, SP 25.
- Bảng phim chỉ xếp theo điểm phim; bỏ tiêu chí dàn diễn viên và không hiển thị bộ lọc giới tính.
- Bảng diễn viên bỏ xếp hạng độ hot; thêm chế độ Tổng thể gộp nam và nữ, cùng bộ lọc riêng nam/nữ.
- Hiệu ứng rực cháy dành cho hạng 1; mọi bảng xếp hạng giới hạn tối đa 100 mục.
- Giữ nguyên STORAGE_KEY / DB_NAME / DB_VERSION; tăng CACHE_NAME của service worker để phát hành cập nhật.

V11.6.0 — Hiệu ứng điện ảnh và phòng thử nghiệm
- Tăng cao trào triệu hồi UR/SP, giữ thời gian lộ thẻ theo độ hiếm và hỗ trợ giảm chuyển động.
- Sửa độ trễ xuất hiện từng thẻ; giữ đúng thao tác mở 3 thẻ như thiết kế giao diện.
- Làm nổi bật hiệu ứng nâng sao thành công, đặc biệt cấp 5★.
- Thêm phòng thử hiệu ứng không tiêu hao vật phẩm; tăng cache service worker lên v46.
- Không thay đổi STORAGE_KEY, DB_NAME, DB_VERSION hoặc dữ liệu sở hữu.
