# THCS Trưng Vương Đà Nẵng - Hệ thống quản lý đánh giá năng lực

Bản bàn giao theo hướng Production Ready, bám sát giao diện mẫu đã cung cấp. File quy chế DOCX dùng làm căn cứ quy trình, tiêu chí 30/70, điểm cộng tối đa +6, quota HTXSNV và chu kỳ đánh giá.

## Chạy local
```bash
npm install
npm run dev
```

## Build để đưa lên GitHub Pages
```bash
npm run build
```
Upload thư mục `dist` lên GitHub Pages hoặc dùng GitHub Actions.

## Kết nối Firebase
1. Tạo Firebase Project.
2. Bật Authentication.
3. Bật Firestore Database.
4. Bật Storage nếu dùng upload minh chứng.
5. Dán cấu hình Firebase Web App vào `src/firebase-config.js`.
6. Đổi `USE_FIREBASE=false` thành `true` trong `src/main.jsx` và bổ sung service Firebase theo nhu cầu triển khai.
7. Publish rules trong thư mục `firebase`.

## Phân hệ đã dựng giao diện và nghiệp vụ chính
- Dashboard tổng hợp
- Hồ sơ cán bộ
- Lập kế hoạch công tác
- Tự đánh giá theo thang 100
- Ý kiến đồng nghiệp
- Hội đồng liên tịch
- Bình chọn HTXSNV có quota
- Báo cáo
- Danh mục
- Audit Log
- Cài đặt/khoá tháng

## Checklist kiểm tra trước vận hành thật
- Tạo tài khoản thật cho từng vai trò.
- Import danh sách CBGVNV thật.
- Rà soát danh mục tổ chuyên môn, chức vụ, tiêu chí.
- Kiểm thử quota 10% tổ + 10% hội đồng.
- Kiểm thử điểm cộng không vượt +6.
- Kiểm thử khoá/mở khoá kỳ đánh giá.
- Kiểm thử xuất Excel/PDF theo mẫu trường.
- Kiểm thử Firestore Rules bằng tài khoản giáo viên/tổ trưởng/hiệu trưởng.
