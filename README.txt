STARRY C-DRAMA CARDS — BẢN V7.1
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


CẬP NHẬT V7
- Tách màn hình thành các mục riêng: Mở thẻ, Bộ sưu tập, Quản lý thẻ, Hướng dẫn & dữ liệu.
- Nâng cấp hiệu ứng mở thẻ theo độ hiếm; SSR/UR có thêm hiệu ứng ánh sáng, viền phát sáng và điểm sáng chuyển động trên mặt thẻ.
- Không thay đổi khóa localStorage cũ, cấu trúc state owned/favorites, IndexedDB hay cơ chế sao lưu/khôi phục. Dữ liệu V6 hiện có tiếp tục được đọc như trước.

LƯU Ý CẬP NHẬT
- Với bản V7.1 trở lên, hãy cập nhật đủ 5 tệp index.html, style.css, script.js, service-worker.js và README.txt trong cùng thư mục được GitHub Pages xuất bản.
- Nên dùng nút Sao lưu trong mục Quản lý thẻ trước khi thay thế phiên bản.

NGUỒN DỰ ÁN
- Bản nền được đối chiếu với repository: https://github.com/Natra206769/starry-cdrama-cards (nhánh main, V6).
- Bản ZIP này chỉ tạo bộ tệp cập nhật để bạn tải về; chưa tự động commit/push lên GitHub.

CẬP NHẬT APP TRÊN ĐIỆN THOẠI — THÔNG BÁO + NÚT CẬP NHẬT
- Bản này thêm service-worker.js. Hãy tải lên GitHub Pages đủ 5 tệp ở thư mục gốc: index.html, style.css, script.js, service-worker.js và README.txt.
- Lần đầu cài Service Worker: mở app có Internet và tải lại trang một lần nếu cần. Khi có bản mới ở các lần sau, app sẽ hiện thông báo "Có bản cập nhật mới" với nút "Cập nhật" và "Để sau".
- Khi bấm "Cập nhật", app kích hoạt bản mới và tự tải lại một lần để áp dụng.
- Trình duyệt cần mở app/kiểm tra mạng để nhận ra bản mới; đây không phải cập nhật từ xa khi app hoàn toàn đóng.
- Mỗi lần phát hành một bản mới trong tương lai, hãy tăng CACHE_NAME trong service-worker.js (ví dụ v3 thành v4). Nếu service-worker.js không đổi, trình duyệt có thể không nhận ra bản mới của app shell.
- Service Worker chỉ lưu các tệp giao diện của app. Nó không xóa, chuyển đổi hay ghi lại localStorage / IndexedDB. Khóa tiến độ vẫn là starry-cbiz-cards-v1; dữ liệu thẻ/ảnh tuỳ chỉnh vẫn nằm trong starry-cbiz-manager-db.
- Dù vậy, trước khi thay phiên bản lớn, vẫn nên dùng chức năng Sao lưu trong game và giữ tệp JSON ở nơi an toàn.
- Khi triển khai, hãy thay thế các file ở đúng thư mục GitHub Pages mà hiện đang chứa index.html. Với repository project site này thường là thư mục gốc nếu Pages đang xuất bản từ main/root.

LƯU Ý
- Bản ZIP này chỉ chuẩn bị bộ tệp. Nó CHƯA tự commit/push lên GitHub, nên app trên điện thoại chưa thay đổi cho tới khi bạn tải các file lên repository và Pages triển khai xong.


CẬP NHẬT NHỎ V7.1 — HIỆU ỨNG CHẠM THẺ & GIAO DIỆN ỔN ĐỊNH
- Khi nhấn vào thẻ trong Bộ sưu tập, thẻ có hiệu ứng nhấn nhẹ, phát sáng và vệt sáng lướt qua trước khi mở hồ sơ. Thẻ chưa sở hữu cũng có phản hồi trực quan.
- Khung ứng dụng không còn cuộn theo toàn bộ trang. Thanh trên và thanh điều hướng giữ cố định; chỉ nội dung của màn hình đang mở cuộn bên trong khung. Điều này giúp tránh việc giao diện rung/lắc khi vuốt dọc, trong khi Bộ sưu tập và Quản lý vẫn cuộn được khi nội dung dài.
- Tăng cache Service Worker từ v2 lên v3 để báo cập nhật bản V7.1.
- Không thay đổi khóa localStorage starry-cbiz-cards-v1, tên cơ sở dữ liệu IndexedDB starry-cbiz-manager-db, cấu trúc state hoặc định dạng sao lưu.

CÁCH CẬP NHẬT TỪ GITHUB
- Sao lưu bộ sưu tập trong game trước.
- Tải lên và ghi đè index.html, style.css, script.js, service-worker.js và README.txt trong đúng thư mục được GitHub Pages xuất bản.
- Commit changes, đợi GitHub Pages triển khai, mở app trên điện thoại có Internet. Khi app phát hiện bản V7.1, chọn “Cập nhật”. Nếu app vẫn giữ bản cũ, đóng hẳn rồi mở lại và tải lại trang một lần.
- Gói này chỉ tạo file cập nhật; chưa tự commit/push lên GitHub.
