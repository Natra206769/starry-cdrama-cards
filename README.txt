STARRY C-DRAMA CARDS — BẢN V6
================================

NÂNG CẤP CHÍNH
- Thêm, sửa và xóa hẳn từng thẻ; chức năng xóa có hộp xác nhận.
- Có thể xóa cả thẻ mẫu/mặc định hoặc thẻ do bạn tạo. Xóa thẻ sẽ xóa tiến độ sở hữu, yêu thích và ảnh riêng gắn với thẻ khỏi dữ liệu hoạt động.
- Mỗi thẻ đại diện cho một phiên bản cụ thể: diễn viên + phim + vai diễn + trang phục + ảnh riêng.
- Một diễn viên có thể xuất hiện ở nhiều phim. Hãy tạo thẻ mới cho phim hoặc tạo hình khác; không cần tạo hồ sơ diễn viên duy nhất.
- Các thẻ có cùng tên phim được gom tự động thành một bộ sưu tập, hiển thị tiến độ theo số phiên bản thẻ đã sưu tầm.
- Thẻ chưa sở hữu được hiển thị mờ trong bộ tương ứng; chỉ thẻ đã sở hữu mới mở hồ sơ chi tiết và đánh dấu yêu thích.
- Thêm trường tìm kiếm trong danh sách quản lý, thông tin phim/vai diễn/trang phục trong hồ sơ, và bố cục thích nghi trên máy tính, tablet, điện thoại.
- Giữ khóa localStorage cũ để tiến độ mở thẻ V5 được đọc lại. Các thẻ cũ chưa khai báo phim sẽ chuyển vào nhóm "Bộ sưu tập chân dung"; không tự đoán tên phim.
- Ảnh người dùng chọn được nén và lưu trong IndexedDB trên trình duyệt hiện tại, không tải lên máy chủ.
- Sao lưu/khôi phục JSON bao gồm thẻ, ảnh, trạng thái ẩn/xóa, chỉnh sửa và tiến độ sưu tầm.

CÁCH CHẠY
1. Giải nén toàn bộ file ZIP vào một thư mục.
2. Để lưu ảnh và dữ liệu ổn định, mở Terminal/CMD tại thư mục đó rồi chạy:
   python -m http.server 8000
3. Mở http://localhost:8000 bằng Chrome hoặc Edge.
4. Có thể mở index.html trực tiếp, nhưng localhost thường ổn định hơn với IndexedDB.

CÁCH TẠO BỘ SƯU TẬP THEO PHIM
1. Nhấn "Thêm thẻ".
2. Nhập tên diễn viên, tên phim/bộ sưu tập, vai diễn, phiên bản trang phục và độ hiếm.
3. Chọn ảnh đúng với phiên bản đó rồi lưu.
4. Muốn thêm diễn viên khác trong cùng phim, tạo thẻ mới và nhập đúng cùng tên phim.
5. Muốn cùng diễn viên ở phim khác hoặc trang phục khác, tạo thẻ mới. Dùng tên phim chính xác giống nhau để các thẻ thuộc cùng một bộ.

XÓA THẺ
- Nhấn "Xóa hẳn" trong phần Quản lý thẻ hoặc "Xóa thẻ vĩnh viễn" trong hồ sơ thẻ.
- Thẻ cá nhân bị loại khỏi dữ liệu lưu; thẻ mẫu được ghi nhận là đã xóa để không xuất hiện lại sau khi tải trang.
- "Khôi phục thẻ mẫu" sẽ đưa các thẻ mẫu bị xóa/ẩn trở lại và bỏ các chỉnh sửa ở thẻ mẫu. Thẻ cá nhân vẫn được giữ.
- Xóa không thể khôi phục bằng "Sửa". Nếu cần an toàn, hãy sao lưu JSON trước khi xóa.

LƯU TRỮ VÀ SAO LƯU
- Ảnh/hồ sơ thẻ ở IndexedDB; tiến độ và yêu thích ở localStorage của trình duyệt/thiết bị hiện tại.
- Xóa dữ liệu trang web, dùng trình duyệt khác hoặc đổi máy có thể làm mất dữ liệu cục bộ. Hãy dùng nút "Sao lưu" để xuất JSON và giữ tệp an toàn.
- Ảnh mẫu trực tuyến cần Internet; nguồn ảnh và giấy phép của 12 ảnh mẫu nằm ở cuối trang. Ảnh người dùng thêm do người dùng cung cấp.

FILE
- index.html : cấu trúc và nội dung giao diện
- style.css  : giao diện, hiển thị theo bộ phim và responsive
- script.js  : logic game, quản lý thẻ/ảnh, bộ sưu tập và sao lưu
