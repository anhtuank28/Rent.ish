import { test, expect } from '@playwright/test';

test.describe('Booking Flow', () => {
  test('User can browse products and view details', async ({ page }) => {
    // 1. Vào trang chủ
    await page.goto('/');

    // 2. Kiểm tra có hiển thị điều hướng "Trang Phục"
    await expect(page.getByRole('link', { name: 'Trang Phục' }).first()).toBeVisible();

    // 3. Kiểm tra danh sách sản phẩm nổi bật
    const productCard = page.locator('text=Thuê Ngay').first();
    await expect(productCard).toBeVisible();
    
    // Nếu có sản phẩm, bấm vào xem chi tiết
    if (await productCard.isVisible()) {
      await productCard.click();
      
      // 4. Kiểm tra xem đã chuyển hướng sang trang chi tiết chưa (Dù trang này chưa code xong)
      await expect(page).toHaveURL(/\/dresses\/.+/);
    }
  });
});
