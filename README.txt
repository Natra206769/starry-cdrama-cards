STARRY C-DRAMA CARDS — BẢN V8.1

CẬP NHẬT V8.1 — BỘ SƯU TẬP & DANH MỤC THẺ
- Bộ sưu tập phim được sắp xếp theo bảng chữ cái tiếng Việt, không phân biệt hoa/thường; có tìm kiếm tức thời theo phim, diễn viên, tên tiếng Trung, vai diễn, phong cách và độ hiếm.
- Thêm bộ lọc “Chưa sưu tầm” để chỉ hiển thị thẻ còn thiếu. Tiến độ mỗi phim hiển thị số thẻ đã có / tổng số và số còn thiếu.
- Mỗi phim luôn hiển thị đủ sáu cấp N, R, SR, SSR, UR, SP với số thẻ đã có / chưa có. Số lượng đếm theo thẻ khác nhau đã sở hữu ít nhất một bản, không lấy tổng số bản trùng.
- Bỏ trường phiên bản trang phục khỏi biểu mẫu, bộ sưu tập, hồ sơ, danh sách quản lý và logic phát hiện trùng. Khi thêm mới, thẻ trùng thông tin được kiểm tra theo diễn viên + phim + vai diễn + độ hiếm. Điểm xếp hạng coi thẻ khác nhau theo phim + vai diễn + độ hiếm trong nhóm từng diễn viên. Thẻ cũ không bị tự ý xóa và tiến độ/ID cũ được giữ nguyên.
- Phong cách mới gồm Cổ trang, Thanh xuân vườn trường, Công sở, Tiên hiệp, Dân quốc và Khác. Giá trị “Hiện đại” tồn tại từ dữ liệu cũ không được tự phân loại; khi sửa, ứng dụng yêu cầu chọn loại phù hợp.
- Bảng xếp hạng sử dụng toàn bộ kho thẻ hệ thống, không đọc tiến độ sở hữu hay số bản trùng. P là tổng điểm các thẻ khác nhau theo độ hiếm (N=1, R=2, SR=4, SSR=7, UR=12, SP=20); N là số phim khác nhau. Điểm Nhan sắc = P / N + N.
- Nâng cache Service Worker lên v12 để nhận bản mới. Giữ nguyên key localStorage, tên/phiên bản IndexedDB và cơ chế xác nhận cập nhật của người dùng.

CÁCH TRIỂN KHAI V8.1
1. Trước khi cập nhật bản đang dùng, vào Quản lý thẻ → Sao lưu để xuất tệp JSON.
2. Triển khai đồng bộ các tệp index.html, style.css, script.js, service-worker.js, README.txt, manifest.webmanifest, favicon và thư mục icons/ tại thư mục gốc GitHub Pages.
3. Sau khi GitHub Pages triển khai, mở app có Internet và chọn cập nhật khi thông báo xuất hiện. Nếu còn giao diện cũ, đóng hẳn app rồi mở lại/tải lại trang.
4. Bản ZIP này chỉ cập nhật mã nguồn. Dữ liệu localStorage/IndexedDB đang nằm trên thiết bị của bạn không được gói vào ZIP; hãy sao lưu trong app trước khi cập nhật.

LỊCH SỬ CÁC BẢN TRƯỚC
======================

THAY ĐỔI V7.7
- Đồng bộ hiệu ứng và thời gian triệu hồi thẻ nổi bật trong x10 với mở đơn bằng cùng bộ rarityInfo; làm chậm hợp lý các mốc, nhất là UR/SP, và giữ spotlight lâu hơn để hiệu ứng thẻ hoàn tất.
- Thêm liên kết hồ sơ tự động: các phiên bản khác nhau của cùng diễn viên và các bạn diễn có cùng tên phim; liên kết dựa trên dữ liệu đã nhập, bỏ qua nhóm chung "Bộ sưu tập chân dung" để tránh liên kết giả.
- Khi nhập tên diễn viên, phim hoặc vai diễn, gợi ý các giá trị đã có, hiển thị số thẻ liên quan và cảnh báo trước khi tạo trùng hoàn toàn; vẫn cho phép tạo phiên bản mới hợp lệ.
- Không thêm trường vào schema lưu trữ, không thay localStorage key, IndexedDB name/version/store hay định dạng sao lưu.

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

THAY ĐỔI V7.5
- Tăng SP lên đúng 0,3% khi kho có cả thẻ SP và ít nhất một cấp khác; tỉ lệ này hiển thị trên giao diện.
- Mở x10 lật thẻ cấp cao nhất trước trên thẻ chính, sau đó mới hiện lưới đủ 10 thẻ theo thứ tự cấp hiếm giảm dần.
- Sửa viền N/R thành đường viền liền, rõ và nhất quán trên thẻ chính, bộ sưu tập, hồ sơ và lưới mở x10.
- Khóa lưu trữ localStorage và IndexedDB không thay đổi.


THAY ĐỔI V7.6
- Làm mới luồng mở x10 theo phong cách nghi thức triệu hồi: cổng năng lượng trong lúc mở, hé lộ thẻ hiếm nhất trước, rồi chuyển sang màn spotlight và lưới đủ 10 thẻ.
- Thêm nút bỏ qua hoạt ảnh và nút hiện toàn bộ 10 thẻ ngay; hỗ trợ prefers-reduced-motion.
- Thêm tổng kết số thẻ mới / trùng và phần thưởng Bụi Sao.
- Thẻ trùng nhận Bụi Sao theo độ hiếm: N 1, R 2, SR 5, SSR 12, UR 35, SP 100 điểm. Bụi Sao là điểm nội bộ của ứng dụng, không có giá trị tiền tệ.
- Hiển thị số dư Bụi Sao trên thanh đầu trang; số dư được lưu cùng tiến độ trong khóa localStorage hiện tại và được xuất/nhập qua JSON.
- Giữ nguyên khóa localStorage và cấu trúc IndexedDB; dữ liệu cũ không có trường Bụi Sao bắt đầu từ 0, các thẻ/yêu thích hiện tại được giữ nguyên.

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


CẬP NHẬT NHỎ V7.2 — SỬA VIỀN TRẮNG TRÊN ĐIỆN THOẠI
- Đặt nền tối đồng nhất cho cả html và body để các vùng an toàn, khoảng tràn/cuộn và mép viewport không lộ nền trắng mặc định của trình duyệt.
- Đồng bộ màu thanh trình duyệt bằng theme-color và khai báo color-scheme dark.
- Điều chỉnh lề ngang trên thiết bị có safe-area hai bên; giữ thanh đầu và thanh điều hướng tràn sát mép màn hình.
- Tăng cache Service Worker từ v3 lên v4 để nhận diện bản phát hành V7.2.
- Không thay đổi khóa localStorage starry-cbiz-cards-v1, tên cơ sở dữ liệu IndexedDB starry-cbiz-manager-db hay định dạng sao lưu.

CẬP NHẬT V7.2
- Trước khi thay file, nên xuất bản sao lưu JSON trong mục Quản lý thẻ.
- Tải đè đủ 5 tệp index.html, style.css, script.js, service-worker.js và README.txt vào đúng thư mục GitHub Pages.
- Commit changes, đợi GitHub Pages triển khai, rồi mở app trên điện thoại có Internet. Chọn nút Cập nhật nếu thông báo xuất hiện; nếu chưa thấy, đóng hẳn app, mở lại và tải lại trang một lần.
- Gói này chỉ chuẩn bị file để bạn tự tải lên; chưa push trực tiếp lên GitHub.


CẬP NHẬT V7.3 — ICON STARRY, SÁU CẤP ĐỘ HIẾM VÀ BẢO TOÀN DỮ LIỆU
- Tích hợp favicon, Apple touch icon, manifest PWA và icon 192/512 theo đường dẫn tương đối phù hợp với GitHub Pages tại /starry-cdrama-cards/.
- Service Worker tăng cache từ v4 lên v5 và cache trước cả manifest/icon; vẫn dùng thông báo người dùng xác nhận cập nhật, không tự skipWaiting khi cài bản mới.
- Form thêm/sửa bỏ trường nhập Biểu tượng. Dữ liệu symbol/icon cũ không bị xóa; biểu tượng cũ vẫn được đọc, và thẻ không có symbol được hiển thị bằng biểu tượng mặc định.
- Bổ sung sáu cấp N, R, SR, SSR, UR, SP. Trọng số cấu hình tổng 1000: N 399, R 288, SR 180, SSR 102, UR 30, SP 1. SP hiếm hơn UR; tỉ lệ trên màn hình mở thẻ được tính theo các cấp thực sự đang có trong kho thẻ. Khi chưa có thẻ N hoặc SP, các cấp đó không được bốc ra ngẫu nhiên cho tới khi có thẻ tương ứng; tỉ lệ các cấp cũ giữ nguyên quan hệ 48:30:17:5.
- Thẻ sưu tập được gắn class theo cấp độ ở mỗi lần render, kể cả thẻ chưa sở hữu; các cấp có khung/màu/ánh sáng riêng và SP nổi bật hơn UR. Hiệu ứng tôn trọng prefers-reduced-motion.
- Không đổi key localStorage starry-cbiz-cards-v1, tên IndexedDB starry-cbiz-manager-db, phiên bản DB, ID thẻ mẫu hay định dạng JSON sao lưu/khôi phục. Không xóa hoặc migrate dữ liệu người dùng khi khởi động.

CÁCH TRIỂN KHAI V7.9
1. Trước khi cập nhật bản đang sử dụng, xuất bản sao lưu JSON trong mục Quản lý thẻ.
2. Triển khai đồng bộ các tệp index.html, style.css, script.js, service-worker.js, README.txt, manifest.webmanifest, favicon.ico, favicon-32.png, apple-touch-icon.png và thư mục icons/ (icon-192.png, icon-512.png) vào đúng thư mục được GitHub Pages xuất bản.
3. Commit/push repository rồi đợi GitHub Pages hoàn tất. Service Worker dùng cache shell v11 để nhận HTML/CSS/JS mới. Gói bàn giao này chưa tự push hay cập nhật trang live.
4. Mở app có Internet và chọn “Cập nhật” nếu thông báo xuất hiện. Nếu biểu tượng lối tắt cũ không thay đổi, xóa lối tắt khỏi màn hình chính và thêm lại sau khi bản live đã cập nhật; hành vi cụ thể tùy hệ điều hành/trình duyệt.
5. Nên kiểm tra bộ sưu tập và thử sao lưu/khôi phục trên bản live sau triển khai. Bản làm việc được cung cấp không truy cập dữ liệu trình duyệt đang có của bạn.


LỊCH SỬ V7.4 — TITLE CASE, MỞ 10 THẺ, THẺ ẢNH LỚN VÀ HIỆU ỨNG PHÂN CẤP

1. TÊN PHIM / NHÂN VẬT / DIỄN VIÊN
- Chuẩn hóa kiểu Title Case: chữ cái đầu của mỗi từ viết hoa.
- Áp dụng cho dữ liệu mẫu, thẻ tùy chỉnh, chỉnh sửa thẻ mẫu, bộ sưu tập và hồ sơ chi tiết.
- Khi mở hồ sơ cũ từ IndexedDB, chỉ các trường name, movie và role được chuẩn hóa; ID, ảnh, trang phục, rarity, metadata, cờ ẩn/xóa và tiến độ không bị chủ động sửa.
- Khi trình duyệt cho phép ghi IndexedDB, các tên cũ cũng được cập nhật lại trong bản lưu. Nếu không ghi được, giao diện vẫn dùng tên đã chuẩn hóa trong phiên này.

2. MỞ 10 THẺ CÙNG LÚC
- Nút MỞ 10 THẺ rút 10 lượt độc lập theo trọng số rarity hiện hành; thẻ trùng có thể xuất hiện.
- Kết quả hiển thị trong lưới đồng thời; mỗi lượt được cộng vào số lượng sở hữu và tiến độ bộ sưu tập được cập nhật một lần sau khi hoàn tất.
- Mỗi kết quả có độ hiếm, tên diễn viên, phim, vai diễn và nhãn thẻ mới/trùng.

3. BỐ CỤC VÀ HIỆU ỨNG
- Khung mở thẻ ưu tiên ảnh chân dung (khoảng 62% chiều cao thẻ); chi tiết hồ sơ hiển thị ảnh ở phần trên, thông tin ở dưới.
- Lưới 10 thẻ đáp ứng theo chiều rộng; vùng ảnh lớn hơn vùng thông tin.
- Tăng sự khác biệt trực quan giữa N/R/SR/SSR/UR/SP bằng khung, hạt sáng, ánh viền, chuyển động và ánh màu khác nhau.
- Tôn trọng prefers-reduced-motion để hạn chế hoạt ảnh khi hệ điều hành yêu cầu.

BẢO TOÀN DỮ LIỆU VÀ CACHE
- Giữ nguyên localStorage key starry-cbiz-cards-v1 và IndexedDB starry-cbiz-manager-db (version 1, store appData).
- Service Worker dùng cache shell v10; chỉ các cache có tiền tố starry-cdrama-shell- cũ mới bị dọn, không xóa localStorage hoặc IndexedDB.
- Bản nâng cấp chưa được push/triển khai tự động lên GitHub Pages.


CẬP NHẬT V7.5 — SỬA VIỀN N/R/SR, SP 0,3%, LẬT THẺ CAO NHẤT TRƯỚC
- Đưa viền N/R/SR về khung liền, tăng tương phản và sửa khung trong ở thẻ chính, lưới 10 thẻ, bộ sưu tập và hồ sơ chi tiết.
- Đặt trọng số nominal tổng 1000: N 398, R 287, SR 180, SSR 102, UR 30, SP 3. Khi kho có SP và ít nhất một cấp khác, SP được giữ ở đúng 3/1000 = 0,3%; trọng số các cấp khác được phân bổ theo tỉ lệ cấu hình trong 99,7% còn lại, ngay cả khi kho thiếu một cấp. Nếu SP chưa có trong kho thì không thể rút SP; giao diện hiển thị tỉ lệ cho các cấp thực có.
- Mở x10 sẽ lật và hiển thị thẻ có rarity cao nhất bằng giao diện thẻ đơn trước, sau đó mới mở lưới 10 thẻ theo thứ tự từ hiếm nhất đến phổ biến hơn. Tiến độ sở hữu chỉ được cộng một lần cho mỗi lượt mở, bao gồm thẻ trùng.
- Giữ nguyên localStorage key starry-cbiz-cards-v1 và IndexedDB starry-cbiz-manager-db (version 1/store appData); không xóa, reset hoặc migration dữ liệu người dùng.
- Service Worker cache shell chuyển sang v7 để trình duyệt nhận bộ HTML/CSS/JS mới; cơ chế yêu cầu người dùng xác nhận cập nhật vẫn được giữ.
- Đã kiểm thử trong Chromium với dữ liệu lưu trữ giả lập: x10 hiển thị thẻ SP cao nhất trước khi mở lưới, đủ 10 kết quả và cập nhật sở hữu đúng 10 lượt; SP giữ 0,3%; viền N/R/SR liền; không có lỗi JavaScript hoặc tràn ngang tại các kích thước 320–1024 px. Chưa triển khai lên GitHub Pages.


CẬP NHẬT V7.8 — BẢNG XẾP HẠNG DIỄN VIÊN
- Thêm trang “Xếp hạng” với hai nhóm diễn viên nam/nữ và hai kiểu xếp hạng: Độ hot và Nhan sắc (điểm sưu tầm).
- Độ hot tính số phim có tên khác nhau gắn với diễn viên; các phiên bản trang phục của cùng phim chỉ tính một lần; bỏ qua nhóm chung “Bộ sưu tập chân dung”.
- Điểm Nhan sắc là thước đo vui dựa trên các phiên bản khác nhau đang sở hữu: N 1, R 2, SR 4, SSR 7, UR 12, SP 20 điểm mỗi phiên bản, cộng 2 điểm cho mỗi phim khác nhau đã sưu tầm. Bản trùng không cộng thêm điểm. Không được hiểu là đánh giá khách quan về ngoại hình.
- Dữ liệu xếp hạng được tính trực tiếp từ kho thẻ và state sở hữu hiện có; không tạo bảng dữ liệu hoặc khóa lưu trữ mới.
- Tăng Service Worker shell cache lên v10 để nhận tệp giao diện mới; vẫn giữ cơ chế hỏi người dùng trước khi chuyển phiên bản.
- Lưu ý: thẻ mẫu mặc định là ảnh chân dung sự kiện, không ghi tên phim cụ thể, nên bảng Độ hot sẽ hướng dẫn người dùng bổ sung thẻ theo phim cho đến khi có dữ liệu phim thực.


CẬP NHẬT V7.9 — ĐIỂM NHAN SẮC DỰA TRÊN TOÀN BỘ KHO DỮ LIỆU
- Công thức: Điểm Nhan sắc = P / N + N. P là tổng điểm của các biến thể thẻ khác nhau được ghi nhận trong kho dữ liệu (cấp N=1 điểm, R=2, SR=4, SSR=7, UR=12, SP=20); N là số phim khác nhau của diễn viên đã có tên phim cụ thể trong hệ thống.
- Không đọc số lượng thẻ đã sở hữu, số bản trùng hoặc tiến độ bộ sưu tập của người chơi khi tính điểm và sắp xếp. Ảnh đại diện và thông tin phụ cũng lấy từ kho dữ liệu, không phụ thuộc bộ sưu tập cá nhân.
- Mỗi tên phim chỉ tính một lần. Các mục chung như “Bộ sưu tập chân dung” không được tính là phim; diễn viên chưa có phim cụ thể chưa được xếp điểm Nhan sắc để tránh chia cho 0.
- Bảng “Độ hot” vẫn xếp theo số phim khác nhau có dữ liệu. Điểm Nhan sắc là chỉ số giải trí của game, không phải phép đo khách quan về ngoại hình.
- Tăng Service Worker shell cache lên v11 để nhận tệp giao diện mới.
- Không thay đổi localStorage key starry-cbiz-cards-v1, IndexedDB starry-cbiz-manager-db (version 1/store appData), schema sao lưu, hoặc cơ chế lưu tiến độ; không xóa/reset dữ liệu người dùng.


CẬP NHẬT V8.1 — TỔNG HỢP ĐỘ HIẾM TOÀN HỆ THỐNG
- Thêm thanh tổng hợp số thẻ đã sưu tầm / tổng số thẻ khác nhau cho từng cấp độ trên toàn bộ phim.
- Chỉ hiển thị cấp độ có ít nhất một thẻ trong kho dữ liệu hệ thống.
- Trong từng bộ phim, ẩn các cấp độ không có thẻ để tiết kiệm diện tích.
