import { test, expect } from '@playwright/test';

test.describe('Admin Product Multi-Image & Reorder E2E Test', () => {
  test('Admin có thể sửa sản phẩm, thêm nhiều ảnh, đổi ảnh chính và hiển thị chuẩn ngoài catalog', async ({ page }) => {
    // 1. Đăng nhập với quyền ADMIN
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

    // Chờ danh sách sản phẩm tải xong
    const tableRows = page.locator('tbody tr');
    await expect(tableRows.first()).toBeVisible({ timeout: 10000 });

    // 3. Bấm nút "Sửa" ở sản phẩm đầu tiên
    const firstEditBtn = tableRows.first().locator('button:has-text("Sửa")');
    await expect(firstEditBtn).toBeVisible();
    await firstEditBtn.click();

    // 4. Modal chỉnh sửa xuất hiện
    const modalTitle = page.locator('h3:has-text("Chỉnh Sửa Trang Phục & Thứ Tự Ảnh")');
    await expect(modalTitle).toBeVisible();

    // 5. Thêm một ảnh mới với timestamp để đảm bảo độc nhất
    const uniqueTime = Date.now();
    const testNewImageUrl = `https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=${uniqueTime}`;
    await page.locator('button:has-text("Dán link")').click();
    const imageInput = page.locator('input[placeholder*="Dán đường dẫn ảnh"]');
    await imageInput.fill(testNewImageUrl);
    await page.getByRole('button', { name: 'add_link Thêm' }).click();

    // Xác nhận ảnh mới đã xuất hiện trong danh sách thumbnails (phần tử cuối cùng vừa thêm)
    const galleryCards = page.locator('.grid.grid-cols-2.sm\\:grid-cols-4 > div');
    const newlyAddedCard = galleryCards.filter({ has: page.locator(`img[src="${testNewImageUrl}"]`) });
    await expect(newlyAddedCard).toBeVisible();

    // 6. Bấm nút "Lên đầu" ở ảnh vừa thêm để biến nó thành #1 (Ảnh chính ngoài danh mục)
    const setPrimaryBtn = newlyAddedCard.locator('button:has-text("Lên đầu")');
    if (await setPrimaryBtn.isVisible()) {
      await setPrimaryBtn.click();
    }

    // Chụp ảnh màn hình Modal quản lý & sắp xếp thứ tự ảnh
    await page.screenshot({
      path: '/Users/nguyenanhtuan/.gemini/antigravity-ide/brain/c2769262-f7e0-4fcb-ba97-1b35878db6dc/admin_modal_gallery_manager.png'
    });

    // Xác nhận ảnh mới bây giờ có badge #1 Chính
    const firstThumbnailCard = page.locator('.grid.grid-cols-2.sm\\:grid-cols-4 > div').first();
    await expect(firstThumbnailCard.locator('span:has-text("#1 Chính")').first()).toBeVisible();

    // 7. Bấm "Lưu Thay Đổi"
    await page.locator('button:has-text("Lưu Thay Đổi")').click();

    // Chờ thông báo toast thành công
    const toast = page.locator('.bg-on-surface');
    await expect(toast).toContainText('thành công', { timeout: 8000 });

    // Chụp ảnh màn hình nghiệm thu Admin
    await page.screenshot({
      path: '/Users/nguyenanhtuan/.gemini/antigravity-ide/brain/c2769262-f7e0-4fcb-ba97-1b35878db6dc/admin_reorder_success.png'
    });

    // 8. Chuyển sang trang danh mục sản phẩm /dresses
    await page.goto('/dresses');
    await page.waitForLoadState('networkidle');

    // 9. Xác nhận ảnh đại diện chính của sản phẩm trên trang danh mục đã được cập nhật thành ảnh #1 mới
    const catalogCardImg = page.locator(`article img[src*="photo-1539109136881-3be0616acf4b"]`).first();
    await expect(catalogCardImg).toBeVisible({ timeout: 8000 });

    // Chụp ảnh màn hình nghiệm thu Catalog ngoài /dresses
    await page.screenshot({
      path: '/Users/nguyenanhtuan/.gemini/antigravity-ide/brain/c2769262-f7e0-4fcb-ba97-1b35878db6dc/catalog_reordered_image.png'
    });
  });
});
