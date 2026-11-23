STARRY C-DRAMA CARDS — V12.0.0
Thư viện sưu tầm thẻ diễn viên C-Drama, chạy trên GitHub Pages và cài được như PWA.

TÍNH NĂNG
- Mở 1 hoặc 3 thẻ thuộc sáu bậc thường R / SR / SSR / UR / LR / MR; SP là cấp đặc biệt riêng, không nằm trong lượt rút thường. N cũ tự chuyển thành R.
- Bảo hiểm thẻ hiếm: sau 10 lượt liên tiếp không ra SSR trở lên, xác suất tăng dần; lượt thứ 20 liên tiếp được bảo đảm thẻ hiếm nếu kho có thẻ phù hợp.
- Một lượt mở tự động mỗi 60 phút; có thể tích lũy lượt, và hoàn thành đủ thẻ của một phim được thưởng thêm 15 lượt.
- Bộ sưu tập có hai chế độ: Thư viện của tôi và Khám phá kho thẻ; công cụ tìm kiếm là thanh tìm kiếm duy nhất.
- Hồ sơ phim và diễn viên được tổng hợp trực tiếp từ các thẻ trong kho; xem các phiên bản thẻ còn thiếu và mối liên kết bạn diễn.
- Yêu thích thẻ, nâng sao 1★–5★; giới hạn level theo sao: 1★ Lv.10, 2★ Lv.20, 3★ Lv.30, 4★ Lv.40, 5★ Lv.50.
- Top 3 có hiệu ứng riêng; nhóm 4–10 được nhấn mạnh; tối đa 100 diễn viên.
- Điểm thẻ: R 3 · SR 5 · SSR 8 · UR 11 · LR 15 · MR 20. SP cố định 20 điểm; sau khi tính xong công thức điểm diễn viên, cộng thêm 2 điểm cho mỗi thẻ SP.
- Quản lý thẻ mẫu/thẻ tự thêm; nhập hàng loạt CSV/TSV hoặc dán bảng với xem trước, xác thực và bỏ qua thẻ trùng mặc định.
- Sao lưu/khôi phục JSON V5; tùy chỉnh bảng màu, mật độ hiển thị; hỗ trợ bàn phím và giảm chuyển động.
- Không còn giao diện Kệ phim, Quản lý dữ liệu phim hoặc trường mô tả riêng cho từng nhân vật.

ĐỘ HIẾM & CHUYỂN ĐỔI DỮ LIỆU
- Thứ tự bậc thường: R → SR → SSR → UR → LR → MR. SP là nhánh đặc biệt độc lập.
- Thẻ cũ được chuyển một lần: SSR+ → UR, UR → LR, SP → MR. Tiến độ sở hữu, số bản sao, yêu thích, level/sao và ảnh được giữ nguyên.
- SP mới được giữ là SP; việc chuyển dữ liệu cũ được đánh dấu phiên bản để không áp dụng lại ở những lần tải sau.
- LR dùng khung đỏ ruby; UR giữ màu vàng chủ đạo; MR dùng màu xanh blue.

MÃ NGUỒN
- index.html: giao diện và bố cục.
- css/: giao diện, thẻ, độ hiếm, bộ sưu tập, nâng cấp và bảng xếp hạng.
- data/characters.js: danh mục thẻ mẫu.
- js/collection.js: thư viện thẻ, tìm kiếm và nhóm thẻ theo phim.
- js/library.js: hồ sơ diễn viên/phim được tổng hợp từ kho thẻ.
- js/gacha.js, rarity.js, config.js: mở thẻ, xác suất và bảo hiểm độ hiếm.
- js/upgrade.js: nâng cấp thẻ.
- js/leaderboard.js: tính điểm và hiển thị bảng xếp hạng.
- js/storage.js, manager.js, bulk-import.js: lưu trữ, quản lý thẻ và nhập hàng loạt.
- js/pwa.js, service-worker.js: PWA và cập nhật.

DỮ LIỆU & AN TOÀN
- Sở hữu/yêu thích/nâng cấp và tùy chỉnh giao diện lưu trong localStorage; thẻ cá nhân, ảnh và dữ liệu quản lý lưu trong IndexedDB.
- Bảo hiểm độ hiếm được lưu thêm vào bản ghi lượt mở hiện có; không tạo khóa lưu trữ mới.
- Metadata phim, yêu thích/ghim phim và bộ lọc đã lưu từ phiên bản cũ được giữ nguyên trong IndexedDB và bản sao lưu, dù giao diện quản lý tương ứng đã được gỡ.
- Không đổi STORAGE_KEY, TICKET_STATE_KEY, DB_NAME hoặc DB_VERSION; không xóa localStorage/IndexedDB khi phát hành.
- Bản sao lưu JSON V5 bao gồm dữ liệu localStorage và IndexedDB. Hãy sao lưu trước khi đổi thiết bị hoặc trình duyệt.
- Sau mỗi bản phát hành, tăng CACHE_NAME trong service-worker.js để trình duyệt nhận đúng phiên bản mới.

PHÁT HÀNH
Triển khai index.html, css/, js/ đang được sử dụng, data/, service-worker.js, manifest.webmanifest, favicon và icons/ lên GitHub Pages.

V12.0.0 — Hoàn thiện điểm SP và bảng màu độ hiếm
- Loại bỏ SSR+ khỏi hệ mới; thêm LR và MR, giữ SP làm cấp đặc biệt.
- Chuyển dữ liệu cũ một lần theo ánh xạ SSR+ → UR, UR → LR, SP → MR.
- Giới hạn level tăng theo sao từ Lv.10 đến Lv.50.
- SP cố định 20 điểm; mỗi thẻ SP được cộng thêm 2 điểm sau công thức xếp hạng. UR giữ màu vàng, MR dùng màu xanh blue.
- Cập nhật nhập CSV/TSV, thứ tự thư viện và bộ nhớ đệm ứng dụng.
- Cache service worker tăng lên v56.

V11.8.0 — Cập nhật điểm thẻ và tinh gọn giao diện
- Điểm xếp hạng cũ: R 3, SR 5, SSR 8, SSR+ 11, UR 15, SP 20.
- Rút gọn mô tả lặp lại ở các mục; giữ lại xác nhận tiêu hao, cảnh báo và thông tin thao tác cần thiết.
- Loại bỏ nội dung hướng dẫn dài; giữ trang Cài đặt và ghi công ảnh mẫu.
- Cache service worker tăng lên v51.

V11.7.0 — Bảo hiểm may mắn và giao diện tinh gọn
- Tăng dần tỉ lệ SSR trở lên sau 10 lượt hụt liên tiếp; bảo đảm SSR trở lên ở lượt thứ 20 nếu kho có thẻ hiếm.
- Bộ sưu tập chỉ còn thanh tìm kiếm và hai chế độ thư viện/khám phá; bỏ bộ lọc phụ và kệ phim.
- Gỡ giao diện quản lý metadata phim/TMDB và mô tả riêng của từng nhân vật; hồ sơ phim vẫn được tổng hợp từ thẻ.
- Tách biệt Top 3 khỏi nhóm Top 10; giữ hiệu ứng riêng cho hạng 1, 2 và 3.
- Giữ nguyên các khóa dữ liệu người chơi; cache service worker tăng lên v50.
