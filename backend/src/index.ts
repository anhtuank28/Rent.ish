import "dotenv/config";
import app from "./app.js";

/**
 * Server Entry Point
 *
 * File này CHỈ làm 1 việc duy nhất: Khởi động server.
 * Mọi cấu hình Express đều nằm trong app.ts
 *
 * Lý do tách riêng:
 * - Khi viết test, ta import `app` mà KHÔNG cần khởi động server thật
 * - Dễ dàng thay đổi port, host mà không ảnh hưởng logic ứng dụng
 */

const PORT = process.env["PORT"] || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});
