import { test, expect } from '@playwright/test';

test.describe('VietQR PayOS Checkout E2E Test', () => {
  test('Khách hàng có thể chọn thanh toán VietQR, hiển thị mã QR đẹp mắt và hoàn tất đơn hàng', async ({ page }) => {
    // 1. Đăng nhập trực tiếp qua page.request để cookie được lưu vào browser session
    const loginRes = await page.request.post('/api/auth/login', {
      data: {
        email: 'customer@rent.ish',
        password: 'admin123',
      },
    });
    expect(loginRes.ok()).toBeTruthy();

    // 2. Lấy một sản phẩm thật từ API có sẵn kho
    const productsRes = await page.request.get('/api/products?limit=10');
    expect(productsRes.ok()).toBeTruthy();
    const productsData = await productsRes.json();
    const product = productsData.data.find((p: any) => p.name.includes('Áo Dạ') || p.name.includes('Áo Dài')) || productsData.data[1];
    expect(product).toBeTruthy();

    const productDetailRes = await page.request.get(`/api/products/${product.id}`);
    expect(productDetailRes.ok()).toBeTruthy();
    const detailData = await productDetailRes.json();
    const variant = detailData.data.variants?.[0];
    expect(variant).toBeTruthy();

    // 3. Đặt sản phẩm vào LocalStorage
    await page.goto('/');

    const today = new Date();
    const offsetDays = Math.floor(Math.random() * 300) + 30;
    const startDate = new Date(today.getTime() + 86400000 * offsetDays).toISOString().split('T')[0];
    const endDate = new Date(today.getTime() + 86400000 * (offsetDays + 3)).toISOString().split('T')[0];

    const mockCartItem = {
      id: `${product.id}-${variant.id}`,
      variantId: variant.id,
      rentalStartDate: startDate,
      rentalEndDate: endDate,
      product: {
        id: product.id,
        name: product.name,
        brand: 'Rent-ish Collection',
        image: product.image_url || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
        price: Number(product.rental_price) / 1000,
        retailPrice: Number(product.retail_price) || 2000000,
        size: variant.size || 'Freesize',
      },
    };

    await page.evaluate((item) => {
      localStorage.setItem('rent-ish-cart', JSON.stringify({
        state: {
          items: [item],
          isHydrated: true,
        },
        version: 0,
      }));
    }, mockCartItem);

    // 4. Mở trang checkout (User đã login, giỏ hàng đã có đồ)
    await page.goto('/checkout');
    await expect(page.locator('h2:has-text("Thông Tin Giao Hàng")')).toBeVisible({ timeout: 15000 });

    // 5. Kiểm tra 2 lựa chọn phương thức thanh toán
    await expect(page.locator('text=Chuyển khoản VietQR tự động')).toBeVisible();
    await expect(page.locator('text=Thanh toán khi nhận hàng (COD)')).toBeVisible();

    // 6. Điền thông tin người nhận
    await page.locator('input[placeholder="Nguyễn Văn A"]').fill('Nguyễn Anh Tuấn (Customer)');
    await page.locator('input[placeholder="0912 345 678"]').fill('0988776655');
    await page.locator('input[placeholder*="Lê Lợi"]').fill('123 Đường Nguyễn Huệ, Tòa nhà Bitexco');
    await page.locator('input[placeholder="Phường Bến Nghé"]').fill('Bến Nghé');
    await page.locator('input[placeholder="Quận 1"]').fill('Quận 1');
    await page.locator('input[placeholder="TP. Hồ Chí Minh"]').fill('TP. Hồ Chí Minh');

    // Chọn phương thức VietQR (mặc định đã chọn)
    const vietQrRadio = page.locator('input[value="VIETQR"]');
    await vietQrRadio.check();

    // 7. Bấm nút "Thanh toán qua VietQR ngay"
    const submitBtn = page.locator('button:has-text("Thanh toán qua VietQR ngay")');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // 8. Chờ Modal VietQR xuất hiện
    const modalHeader = page.locator('h3:has-text("Quét Mã Để Xác Nhận Đơn")');
    await expect(modalHeader).toBeVisible({ timeout: 15000 });

    // Kiểm tra các thành phần của modal
    const qrImage = page.locator('img[alt="Mã VietQR thanh toán"]');
    await expect(qrImage).toBeVisible();
    await expect(page.locator('text=Hệ thống đang tự động lắng nghe giao dịch...')).toBeVisible();
    await expect(page.locator('text=RENT-ISH CONSCIOUS FASHION')).toBeVisible();

    // Chờ ảnh QR tải xong hoàn chỉnh
    await qrImage.evaluate(
      (img: HTMLImageElement) => img.complete && img.naturalWidth > 0 || new Promise((f) => (img.onload = f))
    );
    await page.waitForTimeout(600);

    // Chụp ảnh bằng chứng Modal VietQR thanh toán
    await page.screenshot({
      path: '/Users/nguyenanhtuan/.gemini/antigravity-ide/brain/c2769262-f7e0-4fcb-ba97-1b35878db6dc/vietqr_modal_active.png',
    });

    // 9. Bấm nút "⚡ Giả Lập Quét Mã Thanh Toán Thành Công"
    const simulateBtn = page.locator('button:has-text("Giả Lập Quét Mã Thanh Toán Thành Công")');
    await expect(simulateBtn).toBeVisible();
    await simulateBtn.click();

    // 10. Modal hiển thị trạng thái Thành Công và tự động chuyển tới /checkout/success
    await expect(page.locator('text=Thanh Toán Thành Công!')).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL(/\/checkout\/success/, { timeout: 15000 });

    // Chụp ảnh trang Checkout Success
    await page.screenshot({
      path: '/Users/nguyenanhtuan/.gemini/antigravity-ide/brain/c2769262-f7e0-4fcb-ba97-1b35878db6dc/vietqr_payment_success.png',
    });

    // Xác nhận đã tới trang thành công
    await expect(page.getByRole('heading', { name: 'Đặt thuê thành công!' })).toBeVisible();
  });
});
