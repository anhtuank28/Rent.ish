# RENT-ISH PROJECT RULES & CONTEXT

## 1. Tech Stack
- **Monorepo:** Backend (Node/Express/Prisma/PostgreSQL) + Frontend (Next.js App Router/Tailwind/Zustand)
- **Infra:** Vercel (FE) → Render (BE) → Supabase (DB). CI/CD tự động qua GitHub push.

## 2. Core Business Logic
- Chống double-booking bằng PostgreSQL `daterange` + GiST exclusion constraint trên `BookingItem`.
- Hybrid Cart: localStorage (guest) → DB merge khi login.
- Auth: JWT (access 15m + refresh 7d) trong httpOnly cookie. Bcrypt salt=10.

## 3. Development Rules
- **TECH LEAD PERSONA:** Code phải đạt chuẩn production. Ưu tiên UX > Performance > Clean Code.
- **MANDATORY TESTING:** Hoàn thành module → Test E2E bằng Browser Subagent → Commit.
- **NO MOCK DATA:** Mọi UI phải nối với API thật. Không chấp nhận DUMMY/MOCK arrays.

## 4. Trạng thái Hiện tại

| Hạng mục | Trạng thái |
|----------|------------|
| DB Schema + GiST + Seeding | ✅ Hoàn thành |
| Product API (CRUD + Validation) | ✅ Hoàn thành |
| Booking API (Create + Checkout + Availability) | ✅ Hoàn thành |
| Auth API (Register/Login/Refresh/Logout/Me) | ✅ Hoàn thành |
| Cart API (Get/Merge/Remove) | ✅ Hoàn thành |
| Security (Helmet/CORS/RateLimit/JWT/Role) | ✅ Hoàn thành |
| Login/Register UI | ✅ Hoàn thành |
| Cart/Checkout/Success UI | ✅ Hoàn thành |
| CI/CD + Cloud Deploy | ✅ Hoàn thành |
| **Frontend kết nối API thật (Xóa Mock Data)** | ✅ Hoàn thành |
| **Trang /orders (Lịch sử đơn khách)** | ✅ Hoàn thành |
| **Navbar Auth-aware (Login/Logout động)** | ✅ Hoàn thành |
| **Hybrid Cart Sync & Checkout Flow (Giải pháp B)** | ✅ Hoàn thành |
| **Trang /admin (Dashboard chủ shop)** | ✅ Hoàn thành |
| **Bộ lọc sản phẩm (Filter/Search)** | ✅ Hoàn thành |
| **Date Picker thật trong BookingEngine** | ✅ Hoàn thành |
| **Swagger API Docs & Handover** | ✅ Hoàn thành |
| **Hệ thống Wishlist & Giao diện /wishlist** | ✅ Hoàn thành |
| **Quản lý nhiều ảnh & đổi thứ tự ảnh đại diện (Admin & Catalog)** | ✅ Hoàn thành |
| **Hệ thống Upload ảnh Cloud (Supabase Storage + Drag & Drop UI)** | ✅ Hoàn thành |
| **Cổng thanh toán Ngân hàng VietQR (PayOS SDK + Webhook IPN + Mock Sandbox)** | ✅ Hoàn thành |

## 5. Sprint Plan (Thứ tự triển khai)

### Sprint 1: Diệt Mock Data → Kết nối API thật
### Sprint 2: Trang /orders + Navbar động
### Sprint 3: Admin Dashboard (/admin)
### Sprint 4: Filter & Date Picker
### Sprint 5: Documentation & Handover
