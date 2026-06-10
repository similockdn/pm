# 📊 Phần Mềm Quản Lý

Hệ thống quản lý toàn diện cho các doanh nghiệp, bao gồm quản lý phân quyền, bảng giá, đơn hàng và kho.

## ✨ Tính Năng Chính

### 🔐 Quản Lý Phân Quyền
- ✅ Thêm/Sửa/Xóa người dùng
- ✅ Phân công các vai trò khác nhau (Admin, Quản Lý, Nhân Viên, Xem Dữ Liệu)
- ✅ Quản lý chi tiết quyền hạn cho từng người dùng
- ✅ Ma trận phân quyền theo vai trò

**Vai Trò:**
- **Admin**: Toàn quyền truy cập và quản lý
- **Quản Lý**: Có thể xem, thêm, sửa nhưng không xóa
- **Nhân Viên**: Có thể xem và thêm
- **Xem Dữ Liệu**: Chỉ xem được thông tin

### 💰 Quản Lý Bảng Giá
- ✅ Thêm sản phẩm mới với đầy đủ thông tin
- ✅ Quản lý 4 mức giá:
  - Giá nhập
  - Giá bán đại lý
  - Giá cộng tác viên
  - Giá lẻ
- ✅ Tính toán lợi nhuận tự động
- ✅ Chỉnh sửa/Xóa sản phẩm

### 📦 Tạo Đơn Hàng
- ✅ Tạo đơn hàng nhanh chóng
- ✅ Lưu thông tin khách hàng (tên, email, điện thoại, địa chỉ)
- ✅ Thêm nhiều sản phẩm vào đơn
- ✅ **In đơn theo định dạng A5** (để in và gấp lại)
- ✅ Tính toán tự động tổng tiền
- ✅ Lịch sử đơn hàng

### 🏭 Quản Lý Kho
Hệ thống kho 3 bộ phận:

#### 📥 Phiếu Nhập Kho
- ✅ Tạo phiếu nhập từ nhà cung cấp
- ✅ Cập nhật tồn kho tự động
- ✅ In phiếu nhập kho
- ✅ Lịch sử nhập kho

#### 📊 Tồn Kho
- ✅ Xem tình trạng tồn kho toàn bộ sản phẩm
- ✅ Giá trị tồn kho
- ✅ Cảnh báo hàng tồn thấp

#### 📤 Phiếu Xuất Kho
- ✅ Tạo phiếu xuất cho bán hàng/hỏng/v.v
- ✅ Cập nhật tồn kho tự động
- ✅ In phiếu xuất kho

### 📈 Dashboard
- ✅ Tổng quan số người dùng
- ✅ Doanh thu tổng
- ✅ Số lượng đơn hàng
- ✅ Số lượng sản phẩm

## 🚀 Cách Sử Dụng

### 1. Truy cập ứng dụng
- Mở file `index.html` trong trình duyệt

### 2. Thiết lập ban đầu
- Vào **Phân Quyền** để thêm người dùng
- Vào **Bảng Giá** để thêm sản phẩm
- Vào **Kho** để thiết lập tồn kho ban đầu

### 3. Sử dụng các chức năng
- **Tạo Đơn**: Chọn sản phẩm, nhập thông tin khách hàng, in đơn
- **Phiếu Nhập**: Tạo phiếu nhập từ nhà cung cấp để cập nhật tồn kho
- **Phiếu Xuất**: Tạo phiếu xuất khi bán hàng hoặc sản phẩm hỏng

## 💾 Lưu Trữ Dữ Liệu

Tất cả dữ liệu được lưu trữ cục bộ trong trình duyệt (LocalStorage). Điều này có nghĩa:
- ✅ Không cần máy chủ
- ✅ Dữ liệu an toàn (không gửi lên mạng)
- ❌ Sẽ mất dữ liệu nếu xóa cache trình duyệt
- ⚠️ Chỉ hoạt động trên cùng một trình duyệt/thiết bị

**Để sao lưu dữ liệu:**
- Sử dụng các công cụ xuất nhập của trình duyệt
- Hoặc thêm tính năng xuất Excel (sẽ cập nhật sau)

## 📋 Định Dạng In

### In Đơn Hàng (A5)
- Kích thước: 148mm × 210mm (nửa A4)
- Tự động tính toán bố cục in
- Có thể gấp đôi thành format tiêu chuẩn

### In Phiếu Nhập/Xuất Kho
- Kích thước: 105mm × 148mm (1/4 A4)
- Hiển thị đầy đủ thông tin chi tiết

## 🎯 Các Tính Năng Tiền Tệ

- Tất cả giá đều hiển thị theo định dạng **Việt Nam Đồng (VND)**
- Ký hiệu đ được thêm tự động
- Định dạng hàng nghìn tự động

## 🔒 Bảo Mật

Ứng dụng này là **offline-first** và không yêu cầu kết nối internet sau khi tải. Tuy nhiên:
- Nên sử dụng trong môi trường nội bộ
- Không nên chia sẻ dữ liệu qua các kết nối không an toàn
- Sao lưu dữ liệu định kỳ

## 📱 Tương Thích

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🛠️ Phát Triển Tiếp

Các tính năng có thể phát triển thêm:
- [ ] Xuất Excel/PDF
- [ ] Đồng bộ cloud
- [ ] Báo cáo thống kê nâng cao
- [ ] Quản lý nhiều chi nhánh
- [ ] Tích hợp thanh toán
- [ ] Mobile app

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra console (F12) xem có lỗi gì
2. Xóa cache trình duyệt và làm mới trang
3. Thử trên trình duyệt khác

## 📄 License

Ứng dụng này được phát triển cho mục đích nội bộ.

---

**Phiên bản**: 1.0.0  
**Cập nhật lần cuối**: 2026-06-10