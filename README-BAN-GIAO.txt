PHẦN MỀM: THCS TRƯNG VƯƠNG ĐÀ NẴNG - QUẢN LÝ ĐÁNH GIÁ NĂNG LỰC
Phiên bản: Enterprise GitHub Pages + Firebase-ready

1. NỘI DUNG ĐÃ TỐI ƯU
- Đổi tên phần mềm thành THCS Trưng Vương Đà Nẵng.
- Áp dụng tiêu chí theo quy chế: 30 điểm tiêu chí chung + 70 điểm kết quả nhiệm vụ.
- Điểm cộng có trần tối đa +6.
- Có điểm trừ theo danh mục lỗi.
- Có quy trình đánh giá tháng: Giáo viên -> Tổ trưởng -> Ban giám hiệu -> Hội đồng liên tịch -> Hiệu trưởng -> Khóa dữ liệu.
- Có kiểm tra dữ liệu trước khi lưu: thiếu tiêu chí, vượt điểm tối đa, thiếu minh chứng, kỳ đã khóa.
- Có Dashboard quản trị, cảnh báo, thống kê theo tổ, phân bổ xếp loại.
- Có danh mục: năm học, tháng đánh giá, tổ chuyên môn, chức vụ, vai trò, tiêu chí, điểm cộng/trừ.
- Có báo cáo CSV/PDF bằng chức năng in trình duyệt.
- Có Audit Log lưu lịch sử thao tác.
- Có firestore.rules mẫu để triển khai Firebase an toàn hơn bản demo.

2. CÁCH CHẠY LOCAL
- Giải nén file zip.
- Mở index.html bằng Chrome.
- Bấm 'Tạo dữ liệu mẫu' để kiểm tra.

3. CÁCH CHẠY GITHUB PAGES
- Tạo repository GitHub.
- Upload toàn bộ file trong thư mục này.
- Vào Settings -> Pages -> Deploy from branch -> main/root.
- Mở link GitHub Pages.

4. CẤU HÌNH FIREBASE
- Tạo Firebase Project.
- Bật Authentication Email/Password.
- Tạo Firestore Database.
- Dán Firebase Web Config vào firebase-config.js.
- Publish file firestore.rules trong Firebase Console.

5. CHECKLIST TRƯỚC KHI DÙNG THẬT
[ ] Tạo tài khoản Admin/Hiệu trưởng.
[ ] Nhập danh sách CBGVNV thật.
[ ] Kiểm tra tổ chuyên môn.
[ ] Kiểm tra tiêu chí theo quy chế chính thức đã ký.
[ ] Kiểm tra quota HTXSNV 10% tổ + 10% hội đồng.
[ ] Chạy thử 1 tháng đánh giá.
[ ] Xuất báo cáo và đối chiếu bằng Excel.
[ ] Khóa tháng và kiểm tra không cho sửa.
[ ] Sao lưu Firestore.

6. LƯU Ý CHUYÊN GIA
Bản này đã đủ để chạy thử nghiệm nghiệp vụ và làm nền triển khai thật. Khi dùng thật cần bổ sung đăng nhập Firebase hoàn chỉnh, upload minh chứng qua Firebase Storage và import Excel danh sách nhân sự.
