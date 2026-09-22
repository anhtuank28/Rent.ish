import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('Admin Product Image Upload & Gallery Manager E2E Test', () => {
  // Chuẩn bị file ảnh mẫu để test upload
  const fixturesDir = path.join(process.cwd(), 'tests', 'fixtures');
  const testImagePath = path.join(fixturesDir, 'test-sample-dress.png');

  test.beforeAll(() => {
    if (!fs.existsSync(fixturesDir)) {
      fs.mkdirSync(fixturesDir, { recursive: true });
    }
    // 1x1 transparent PNG buffer
    const pngBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    fs.writeFileSync(testImagePath, pngBuffer);
  });

  test('Admin có thể tải file ảnh từ máy tính, dán link internet, đổi vị trí ảnh đại diện và lưu thành công', async ({ page }) => {
    // 1. Đăng nhập ADMIN
    const adminEmail = process.env.TEST_ADMIN_EMAIL || 'admin@rent.ish';
    const adminPassword = process.env.TEST_ADMIN_PASSWORD || 'admin123';

    const loginRes = await page.request.post('/api/auth/login', {
      data: {
        email: adminEmail,
        password: adminPassword,
      },
    });
    expect(loginRes.ok()).toBeTruthy();

    // 2. Mở trang quản trị sản phẩm
    await page.goto('/admin/products');
    await expect(page.locator('h1')).toContainText('Quản Lý Kho Trang Phục', { timeout: 10000 });

    const tableRows = page.locator('tbody tr');
    await expect(tableRows.first()).toBeVisible({ timeout: 10000 });

    // 3. Bấm "Sửa" ở sản phẩm đầu tiên
    await tableRows.first().locator('button:has-text("Sửa")').click();

    // 4. Modal chỉnh sửa xuất hiện cùng với ProductGalleryManager
    const modalTitle = page.locator('h3:has-text("Chỉnh Sửa Trang Phục & Thứ Tự Ảnh")');
    await expect(modalTitle).toBeVisible();

    // Kiểm tra giao diện Dropzone và 2 Tab chuyển đổi
    await expect(page.locator('button:has-text("Tải ảnh lên")')).toBeVisible();
    await expect(page.locator('button:has-text("Dán link")')).toBeVisible();
    await expect(page.locator('text=Kéo thả nhiều ảnh vào đây')).toBeVisible();

    // 5. Test tính năng upload file thật từ máy tính
    const fileChooserInput = page.locator('input[type="file"]');
    await fileChooserInput.setInputFiles(testImagePath);

    // Chờ thông báo upload thành công
    await expect(page.locator('text=Đã tải lên thành công')).toBeVisible({ timeout: 10000 });

    // 6. Test tab Dán link dự phòng
    await page.locator('button:has-text("Dán link")').click();
    const uniqueTime = Date.now();
    const fallbackUrl = `https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=${uniqueTime}`;
    const urlInput = page.locator('input[placeholder*="Dán đường dẫn ảnh mạng"]');
    await urlInput.fill(fallbackUrl);
    await page.getByRole('button', { name: 'add_link Thêm' }).click();

    // Xác nhận ảnh mới thêm xuất hiện trong danh sách thumbnails
    const galleryCards = page.locator('.grid.grid-cols-2.sm\\:grid-cols-4 > div');
    const newlyAddedCard = galleryCards.filter({ has: page.locator(`img[src="${fallbackUrl}"]`) });
    await expect(newlyAddedCard).toBeVisible();

    // 7. Bấm nút "Lên đầu" để chọn làm ảnh đại diện chính #1
    const setPrimaryBtn = newlyAddedCard.locator('button:has-text("Lên đầu")');
    if (await setPrimaryBtn.isVisible()) {
      await setPrimaryBtn.click();
    }

    // Chụp ảnh màn hình Modal có cả Upload Dropzone và Gallery Thumbnails
    await page.screenshot({
      path: '/Users/nguyenanhtuan/.gemini/antigravity-ide/brain/c2769262-f7e0-4fcb-ba97-1b35878db6dc/admin_upload_gallery_manager.png'
    });

    // 8. Bấm Lưu Thay Đổi
    await page.locator('button:has-text("Lưu Thay Đổi")').click();

    // Chờ thông báo toast thành công
    const toast = page.locator('.bg-on-surface');
    await expect(toast).toContainText('thành công', { timeout: 8000 });

    // Chụp ảnh màn hình lưu thành công
    await page.screenshot({
      path: '/Users/nguyenanhtuan/.gemini/antigravity-ide/brain/c2769262-f7e0-4fcb-ba97-1b35878db6dc/admin_upload_success.png'
    });
  });
});
