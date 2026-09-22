# Hướng Dẫn Triển Khai Production (Deployment Guide) — Rent-ish

> **Hạ tầng khuyến nghị:**  
> - **Cơ sở dữ liệu:** Supabase PostgreSQL (Managed Cloud DB)  
> - **Backend API:** Render.com (Web Service)  
> - **Frontend Web:** Vercel (Next.js Edge Network)  
> - **CI/CD:** Tự động hóa qua GitHub push trigger trên nhánh `main`

---

## 1. Chuẩn Bị Cơ Sở Dữ Liệu (Supabase PostgreSQL)

1. **Khởi tạo Project:** Tạo một dự án mới trên Supabase Dashboard.
2. **Kích hoạt PostgreSQL GiST Extension:**
   Truy cập mục **SQL Editor** trên Supabase và chạy lệnh sau (bắt buộc để kích hoạt cơ chế chống trùng lịch):
   ```sql
   CREATE EXTENSION IF NOT EXISTS btree_gist;
   ```
3. **Lấy Connection String:**
   Vào **Project Settings ➔ Database ➔ Connection Strings**, copy URL dạng `URI` (Transaction Pooler hoặc Direct Connection).

---

## 2. Triển Khai Backend (Render.com Web Service)

1. **Tạo Web Service Mới:** Kết nối GitHub repo `Rent.ish`.
2. **Cấu hình Service:**
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:**
     ```bash
     npm install && npx prisma generate && npm run build
     ```
   - **Start Command:**
     ```bash
     npm start
     ```
3. **Biến Môi Trường (Environment Variables):**
   Thiết lập trong mục **Environment** của Render:
   | Biến | Giá trị khuyến nghị | Mục đích |
   |------|---------------------|----------|
   | `NODE_ENV` | `production` | Bật tối ưu hóa production |
   | `PORT` | `10000` | Cổng dịch vụ Render |
   | `DATABASE_URL` | `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres` | Kết nối DB Supabase |
   | `JWT_ACCESS_SECRET` | `[Chuỗi ngẫu nhiên dài ≥ 64 ký tự]` | Mã hóa Access Token |
   | `JWT_REFRESH_SECRET` | `[Chuỗi ngẫu nhiên dài ≥ 64 ký tự]` | Mã hóa Refresh Token |
   | `FRONTEND_URL` | `https://your-rentish-app.vercel.app` | CORS whitelist domain FE |
   | `COOKIE_DOMAIN` | `.onrender.com` (hoặc domain custom) | Phạm vi cookie |

4. **Chạy Migration & Seed Dữ Liệu Ban Đầu:**
   Chạy lệnh thông qua Render Shell hoặc máy tính cá nhân trỏ vào DB Production:
   ```bash
   npx prisma migrate deploy
   npm run seed
   ```

---

## 3. Triển Khai Frontend (Vercel)

1. **Import Project:** Chọn GitHub repository trên Vercel.
2. **Cấu hình Framework:**
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `frontend`
3. **Biến Môi Trường (Environment Variables):**
   | Biến | Giá trị |
   |------|---------|
   | `BACKEND_URL` | `https://your-rentish-backend.onrender.com` |

   *(Lưu ý: File [next.config.ts](file:///Users/nguyenanhtuan/Documents/Rent.ish/frontend/next.config.ts) đã cấu hình sẵn proxy rewrite `/api/:path*` trỏ tới `BACKEND_URL`, giúp tránh triệt để lỗi Mixed Content và chặn Cookie bên thứ 3).*

---

## 4. Thiết Lập Tài Khoản Quản Trị (Admin Setup)

Để đảm bảo an toàn bảo mật chuẩn production, hệ thống tuyệt đối không lưu cứng tài khoản/mật khẩu quản trị mặc định:
1. Đăng ký tài khoản quản trị viên mới thông qua trang `/register` với mật khẩu an toàn do bạn tự đặt (tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường và số).
2. Phân quyền Quản trị viên (ADMIN) qua SQL Editor trên Dashboard Supabase hoặc CLI:
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'EMAIL_QUAN_TRI_CUA_BAN';
   ```
3. **Trang quản trị chủ shop:** `https://your-app.vercel.app/admin`
4. **Tài liệu Swagger API:** `https://your-backend.onrender.com/api/docs`

---

## 5. Checklist Kiểm Tra Sau Khi Triển Khai (Post-Deploy Checklist)

- [ ] `GET /api/health` trả về status 200 kèm timestamp.
- [ ] Truy cập `/api/docs` hiển thị đầy đủ giao diện Swagger UI không bị chặn bởi Content-Security-Policy.
- [ ] Đăng ký / Đăng nhập hoạt động bình thường, cookie `accessToken` được ghi nhận.
- [ ] Vào trang `/dresses`, bấm chọn bộ lọc Size và Giá, sản phẩm phản hồi tức thì.
- [ ] Thử chọn ngày thuê và kiểm tra badge Availability trên trang chi tiết sản phẩm.
- [ ] Thực hiện một lượt đặt thuê hoàn chỉnh và kiểm tra đơn hiển thị trong trang `/orders` và `/admin/orders`.
