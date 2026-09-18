# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: booking.spec.ts >> Booking Flow >> User can browse products and view details
- Location: tests/e2e/booking.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Trang Phục')
Expected: visible
Error: strict mode violation: locator('text=Trang Phục') resolved to 4 elements:
    1) <a href="/dresses" class="font-label-lg text-label-lg px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface transition-colors">Trang Phục</a> aka getByRole('link', { name: 'Trang Phục' })
    2) <button type="button" class="font-label-lg text-label-lg px-space-md py-2 rounded-full transition-all shadow-sm bg-surface-container-lowest hover:bg-secondary-container text-on-surface">Trang phục du lịch</button> aka getByRole('button', { name: 'Trang phục du lịch' })
    3) <h3 class="font-headline-md text-headline-md text-on-surface font-semibold mb-space-sm">1. Chọn trang phục</h3> aka getByRole('heading', { name: 'Chọn trang phục' })
    4) <p class="font-body-lg text-body-lg text-on-secondary-fixed-variant mt-space-sm mb-space-lg">Giảm ngay 600K cho lần thuê trang phục hàng hiệu …</p> aka getByText('Giảm ngay 600K cho lần thuê')

Call log:
  - Expect "toBeVisible" locator('text=Trang Phục') with timeout 5000ms
  - waiting for locator('text=Trang Phục')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]: local_shipping
      - generic [ref=e5]: Miễn phí size dự phòng cho mọi đơn hàng + Vận chuyển không phát thải
    - generic [ref=e7]:
      - link [ref=e9] [cursor=pointer]:
        - /url: /
        - img "Rent-ish Logo" [ref=e10]
      - navigation [ref=e11]:
        - link "Hàng Mới Về" [ref=e12] [cursor=pointer]:
          - /url: /dresses?sort=new
        - link "Trang Phục" [ref=e13] [cursor=pointer]:
          - /url: /dresses
        - link "Sự Kiện" [ref=e14] [cursor=pointer]:
          - /url: /occasions
        - link "Gói Hội Viên" [ref=e15] [cursor=pointer]:
          - /url: /pass
      - generic [ref=e16]:
        - generic [ref=e17]:
          - generic [ref=e18]: search
          - textbox "Tìm kiếm thương hiệu hoặc váy..." [ref=e19]
        - link "Yêu thích" [ref=e20] [cursor=pointer]:
          - /url: /wishlist
          - generic [ref=e21]: favorite
          - generic [ref=e22]: "3"
        - link "Giỏ hàng" [ref=e23] [cursor=pointer]:
          - /url: /cart
          - generic [ref=e24]: shopping_bag
          - generic [ref=e25]: "2"
        - link "Hồ sơ expand_more" [ref=e27] [cursor=pointer]:
          - /url: /profile
          - img "Hồ sơ" [ref=e28]
          - generic [ref=e29]: expand_more
  - main [ref=e30]:
    - generic [ref=e33]:
      - generic [ref=e34]:
        - generic [ref=e35]: Bộ sưu tập Xuân Hè vừa ra mắt
        - heading "Curate Your Endless Wardrobe, The Rent-ish Way" [level=1] [ref=e38]
        - paragraph [ref=e39]: Kho đồ hiệu vô tận cho những ngày cuối tuần, tiệc cưới và mọi sự kiện. Diện những xu hướng mới nhất mà không lo tốn diện tích tủ đồ.
        - generic [ref=e40]:
          - link "Bắt Đầu Thuê arrow_forward" [ref=e41] [cursor=pointer]:
            - /url: "#featured-catalog"
            - generic [ref=e42]: Bắt Đầu Thuê
            - generic [ref=e43]: arrow_forward
          - link "stylus_note Làm Trắc Nghiệm Phong Cách" [ref=e44] [cursor=pointer]:
            - /url: "#how-it-works"
            - generic [ref=e45]: stylus_note
            - generic [ref=e46]: Làm Trắc Nghiệm Phong Cách
        - generic [ref=e47]:
          - generic [ref=e48]:
            - generic [ref=e49]:
              - generic [ref=e50]: 15k+
              - generic [ref=e51]: star
            - generic [ref=e52]: Lượt thuê 5 sao
          - generic [ref=e53]:
            - generic [ref=e54]: checkroom
            - generic [ref=e56]: Miễn phí size dự phòng
          - generic [ref=e57]:
            - generic [ref=e58]: dry_cleaning
            - generic [ref=e60]: Miễn phí giặt ủi
      - generic [ref=e62]:
        - img "Người mẫu mặc váy lụa trễ vai màu hồng phấn" [ref=e64]
        - generic [ref=e65]:
          - generic [ref=e66]:
            - img "Avatar người dùng" [ref=e67]
            - generic [ref=e68]: M
            - generic [ref=e69]: K
          - generic [ref=e70]:
            - generic [ref=e71]: ✨ 35 lượt thuê tháng này
            - generic [ref=e73]: "Lịch trống tiếp theo: Thứ Sáu"
        - generic [ref=e74]:
          - generic [ref=e75]:
            - generic [ref=e76]: Đang thịnh hành
            - generic [ref=e77]:
              - generic [ref=e78]: star
              - text: 4.9 (84)
          - generic [ref=e79]: Váy Midi Cổ Đổ Lụa Bóng
          - generic [ref=e80]:
            - generic [ref=e81]: 350K
            - generic [ref=e82]: / 4 ngày
            - generic [ref=e83]: 3.6tr giá gốc
          - generic [ref=e84]:
            - generic [ref=e85]: local_shipping
            - generic [ref=e86]: Cam kết giao trước 2 ngày
    - generic [ref=e89]:
      - generic [ref=e90]:
        - button "Tất cả phong cách" [ref=e91]
        - button "Tiệc Cocktail" [ref=e92]
        - button "Dạ hội & Sự kiện" [ref=e93]
        - button "Dạo phố cuối tuần" [ref=e94]
        - button "Trang phục du lịch" [ref=e95]
        - button "Thuê 4 ngày" [ref=e96]
        - button "Thuê 8 ngày" [ref=e97]
        - button "Size 0–16" [ref=e98]
      - generic [ref=e99]: Đang hiển thị 2,418 sản phẩm chọn lọc
    - generic [ref=e102]:
      - generic [ref=e103]:
        - generic [ref=e104]:
          - generic [ref=e105]: Tuyển Tập Nổi Bật
          - heading "Xu Hướng Mùa Lễ Hội" [level=2] [ref=e106]
        - generic [ref=e107]: Bao gồm chi phí giặt sấy & bảo hiểm chỉnh sửa
      - generic [ref=e109]:
        - generic [ref=e110]:
          - generic [ref=e111]:
            - link [ref=e112] [cursor=pointer]:
              - /url: /dresses/draped-champagne-silk
              - img "Váy yếm lụa xếp nếp màu champagne" [ref=e113]
            - generic [ref=e114]: 🔥 Xu Hướng
            - button "Lưu vào danh sách yêu thích" [ref=e115]:
              - generic [ref=e116]: favorite
            - generic [ref=e117]: Đã có sẵn size 4 & 6 dự phòng
          - generic [ref=e119]:
            - generic [ref=e120]:
              - generic [ref=e121]: Christopher Esber
              - heading "Váy Yếm Lụa Màu Champagne Draping" [level=3] [ref=e122]
            - generic [ref=e123]:
              - generic [ref=e124]:
                - generic [ref=e125]:
                  - generic [ref=e126]: 380K
                  - generic [ref=e127]: / 4 ngày
                - generic [ref=e128]: Giá gốc 4900K
              - link "Thuê Ngay" [ref=e129] [cursor=pointer]:
                - /url: /dresses/draped-champagne-silk
        - generic [ref=e130]:
          - generic [ref=e131]:
            - link [ref=e132] [cursor=pointer]:
              - /url: /dresses/sunset-cowl-neck-slip
              - img "Váy hai dây lụa hồng phấn cổ đổ" [ref=e133]
            - generic [ref=e134]: Gợi ý từ Staff
            - button "Lưu vào danh sách yêu thích" [ref=e135]:
              - generic [ref=e136]: favorite
            - generic [ref=e137]: Hơn 80+ đánh giá 5 sao
          - generic [ref=e139]:
            - generic [ref=e140]:
              - generic [ref=e141]: Cult Gaia
              - heading "Váy Hai Dây Cổ Đổ Màu Hoàng Hôn" [level=3] [ref=e142]
            - generic [ref=e143]:
              - generic [ref=e144]:
                - generic [ref=e145]:
                  - generic [ref=e146]: 350K
                  - generic [ref=e147]: / 4 ngày
                - generic [ref=e148]: Giá gốc 3800K
              - link "Thuê Ngay" [ref=e149] [cursor=pointer]:
                - /url: /dresses/sunset-cowl-neck-slip
        - generic [ref=e150]:
          - generic [ref=e151]:
            - link [ref=e152] [cursor=pointer]:
              - /url: /dresses/eliana-open-back-gown
              - img "Đầm dạ hội lụa dài hở lưng Eliana" [ref=e153]
            - generic [ref=e154]: Dạ Hội
            - button "Lưu vào danh sách yêu thích" [ref=e155]:
              - generic [ref=e156]: favorite
            - generic [ref=e157]: Phù hợp nhất cho tiệc Black Tie
          - generic [ref=e159]:
            - generic [ref=e160]:
              - generic [ref=e161]: Khaite
              - heading "Đầm Dạ Hội Hở Lưng Eliana" [level=3] [ref=e162]
            - generic [ref=e163]:
              - generic [ref=e164]:
                - generic [ref=e165]:
                  - generic [ref=e166]: 480K
                  - generic [ref=e167]: / 4 ngày
                - generic [ref=e168]: Giá gốc 6200K
              - link "Thuê Ngay" [ref=e169] [cursor=pointer]:
                - /url: /dresses/eliana-open-back-gown
        - generic [ref=e170]:
          - generic [ref=e171]:
            - link [ref=e172] [cursor=pointer]:
              - /url: /dresses/sculpted-trench-set
              - img "Váy trench coat thanh lịch sang trọng" [ref=e173]
            - generic [ref=e174]: Dạo Phố Cuối Tuần
            - button "Lưu vào danh sách yêu thích" [ref=e175]:
              - generic [ref=e176]: favorite
            - generic [ref=e177]: Được thuê lại nhiều nhất
          - generic [ref=e179]:
            - generic [ref=e180]:
              - generic [ref=e181]: Zimmermann
              - heading "Set Váy Trench Coat Thanh Lịch" [level=3] [ref=e182]
            - generic [ref=e183]:
              - generic [ref=e184]:
                - generic [ref=e185]:
                  - generic [ref=e186]: 420K
                  - generic [ref=e187]: / 4 ngày
                - generic [ref=e188]: Giá gốc 5500K
              - link "Thuê Ngay" [ref=e189] [cursor=pointer]:
                - /url: /dresses/sculpted-trench-set
      - link "Khám Phá Hơn 2,400+ Mẫu Đồ Hiệu north_east" [ref=e191] [cursor=pointer]:
        - /url: /dresses
        - generic [ref=e192]: Khám Phá Hơn 2,400+ Mẫu Đồ Hiệu
        - generic [ref=e193]: north_east
    - generic [ref=e195]:
      - generic [ref=e196]:
        - generic [ref=e197]: Đơn Giản Tối Đa
        - heading "Cách Thức Hoạt Động Của Rent-ish" [level=2] [ref=e198]
        - paragraph [ref=e199]: Thời trang cao cấp được giao tận cửa nhà bạn. Trải nghiệm cảm giác chưa từng phải mặc lại một bộ đồ lần thứ hai thật dễ dàng.
      - generic [ref=e200]:
        - generic [ref=e201]:
          - generic [ref=e202]: touch_app
          - generic [ref=e204]: Bước 01
          - heading "1. Chọn trang phục" [level=3] [ref=e205]
          - paragraph [ref=e206]: Duyệt qua hàng nghìn mẫu váy, đầm dạ hội và đồ dạo phố bắt kịp xu hướng. Thêm một size dự phòng hoàn toàn miễn phí để đảm bảo độ vừa vặn hoàn hảo.
          - generic [ref=e207]:
            - generic [ref=e208]: verified
            - generic [ref=e209]: Đã bao gồm size dự phòng miễn phí
        - generic [ref=e210]:
          - generic [ref=e211]: celebration
          - generic [ref=e213]: Bước 02
          - heading "2. Tỏa sáng" [level=3] [ref=e214]
          - paragraph [ref=e215]: Tự tin diện đồ tại lễ cưới, tiệc cocktail, buổi hẹn cuối tuần hay chuyến du lịch. Chụp hình, lưu giữ khoảnh khắc mà không lo về giá.
          - generic [ref=e216]:
            - generic [ref=e217]: shield
            - generic [ref=e218]: Bảo hiểm các vết bẩn vô ý
        - generic [ref=e219]:
          - generic [ref=e220]: assignment_return
          - generic [ref=e222]: Bước 03
          - heading "3. Hoàn trả dễ dàng" [level=3] [ref=e223]
          - paragraph [ref=e224]: Bỏ đồ vào túi hoàn trả đã được thanh toán trước phí ship. Chúng tôi sẽ lo 100% chi phí giặt sấy thân thiện với môi trường.
          - generic [ref=e225]:
            - generic [ref=e226]: eco
            - generic [ref=e227]: Không cần mang ra tiệm giặt
    - generic [ref=e229]:
      - generic [ref=e230]:
        - generic [ref=e231]:
          - generic [ref=e232]: Phụ nữ thực, Vóc dáng thực
          - heading "Được yêu thích bởi các Rent-ish Babes" [level=2] [ref=e233]
        - generic [ref=e234]:
          - generic [ref=e235]: star
          - generic [ref=e236]: 4.9 / 5 Điểm trung bình
          - generic [ref=e237]: (từ hơn 12,000+ thành viên)
      - generic [ref=e238]:
        - generic [ref=e239]:
          - generic [ref=e240]:
            - generic [ref=e241]:
              - generic [ref=e242]: star
              - generic [ref=e243]: star
              - generic [ref=e244]: star
              - generic [ref=e245]: star
              - generic [ref=e246]: star
            - paragraph [ref=e247]: “Chiếc váy lụa midi màu hồng phấn thực sự hoàn hảo cho đám cưới của cô bạn thân tại Đà Lạt. Size dự phòng giúp tôi hoàn toàn an tâm, và việc trả lại đồ chưa giặt trong túi đựng cảm giác cứ như ăn gian vậy!”
          - generic [ref=e248]:
            - generic [ref=e249]:
              - generic [ref=e250]: AL
              - generic [ref=e251]:
                - generic [ref=e252]: Amanda Lê
                - generic [ref=e253]: "Cao: 1m65 · Hay mặc: Size S · Size thuê: Size S"
            - generic [ref=e254]: "Sự kiện: Tiệc cưới ngoài trời"
        - generic [ref=e255]:
          - generic [ref=e256]:
            - generic [ref=e257]:
              - generic [ref=e258]: star
              - generic [ref=e259]: star
              - generic [ref=e260]: star
              - generic [ref=e261]: star
              - generic [ref=e262]: star
            - paragraph [ref=e263]: “Tôi đã thuê chiếc đầm dạ hội satin màu ngọc lục bảo của Khaite cho đêm gala cuối năm. Tôi nhận được vô số lời khen và tiết kiệm được tới 14 triệu so với mua mới. Rent-ish đã thay đổi hoàn toàn tủ đồ của tôi.”
          - generic [ref=e264]:
            - generic [ref=e265]:
              - generic [ref=e266]: SC
              - generic [ref=e267]:
                - generic [ref=e268]: Sophia Châu
                - generic [ref=e269]: "Cao: 1m70 · Hay mặc: Size M · Size thuê: Size M"
            - generic [ref=e270]: "Sự kiện: Gala từ thiện Black Tie"
        - generic [ref=e271]:
          - generic [ref=e272]:
            - generic [ref=e273]:
              - generic [ref=e274]: star
              - generic [ref=e275]: star
              - generic [ref=e276]: star
              - generic [ref=e277]: star
              - generic [ref=e278]: star
            - paragraph [ref=e279]: “Dịch vụ chăm sóc khách hàng không chê vào đâu được. Chuyến bay của tôi bị đẩy lên sớm một ngày và họ đã chuyển phát nhanh váy đến tận Phú Quốc cho tôi mà không tính thêm phí. Trở thành khách quen từ giờ!”
          - generic [ref=e280]:
            - generic [ref=e281]:
              - generic [ref=e282]: JV
              - generic [ref=e283]:
                - generic [ref=e284]: Jessica Vũ
                - generic [ref=e285]: "Cao: 1m58 · Hay mặc: Size XS · Size thuê: Size XS"
            - generic [ref=e286]: "Sự kiện: Tiệc độc thân cuối tuần"
    - generic [ref=e290]:
      - generic [ref=e291]: Ưu Đãi Độc Quyền Dành Cho Người Mới
      - heading "Không Bao Giờ Phải Mặc Lại Một Bộ Đồ." [level=2] [ref=e292]
      - paragraph [ref=e293]: "Giảm ngay 600K cho lần thuê trang phục hàng hiệu đầu tiên của bạn. Nhập mã này lúc thanh toán:"
      - generic [ref=e294]:
        - generic [ref=e295]:
          - generic [ref=e296]: "Mã Giảm Giá:"
          - generic [ref=e297]: RENTISHFIRST
          - button "content_copy" [ref=e298]
        - link "Nhận 600K Tín Dụng" [ref=e300] [cursor=pointer]:
          - /url: "#featured-catalog"
  - contentinfo [ref=e301]:
    - generic [ref=e302]:
      - generic [ref=e303]:
        - generic [ref=e304]:
          - generic [ref=e305]: checkroom
          - generic [ref=e307]:
            - generic [ref=e308]: Vừa vặn 100%
            - generic [ref=e309]: Tặng kèm size dự phòng trong mỗi đơn hàng
        - generic [ref=e310]:
          - generic [ref=e311]: dry_cleaning
          - generic [ref=e313]:
            - generic [ref=e314]: Miễn phí giặt ủi
            - generic [ref=e315]: Không cần giặt, chỉ việc cho vào túi và gửi lại
        - generic [ref=e316]:
          - generic [ref=e317]: verified_user
          - generic [ref=e319]:
            - generic [ref=e320]: Đã bao gồm bảo hiểm
            - generic [ref=e321]: Bảo hiểm toàn diện cho vết bẩn nhỏ và lỗi khóa kéo
      - generic [ref=e322]:
        - generic [ref=e323]:
          - generic [ref=e324]:
            - img "Rent-ish Logo" [ref=e325]
            - generic [ref=e326]: Rent-ish
          - paragraph [ref=e327]: Thời trang cao cấp tinh tế cho những khoảnh khắc đáng nhớ. Mặc thiết kế mơ ước, ủng hộ thời trang bền vững và hoàn trả thật nhẹ nhàng.
          - generic [ref=e328]:
            - generic [ref=e329]: Đăng ký & nhận ưu đãi giảm 20% cho lần thuê đầu tiên
            - generic [ref=e330]:
              - textbox "Nhập địa chỉ email của bạn" [ref=e331]
              - button "Tham gia" [ref=e332]
        - generic [ref=e333]:
          - generic [ref=e334]: Trải nghiệm Rent-ish
          - list [ref=e335]:
            - listitem [ref=e336]:
              - link "Gói hội viên Rent-ish Pass" [ref=e337] [cursor=pointer]:
                - /url: /pass
            - listitem [ref=e338]:
              - link "Hướng dẫn sử dụng" [ref=e339] [cursor=pointer]:
                - /url: /how-it-works
            - listitem [ref=e340]:
              - link "Cam kết bền vững" [ref=e341] [cursor=pointer]:
                - /url: /sustainability
            - listitem [ref=e342]:
              - link "Chính sách đảm bảo vừa vặn" [ref=e343] [cursor=pointer]:
                - /url: /fit-guarantee
            - listitem [ref=e344]:
              - link "Câu hỏi thường gặp & CSKH" [ref=e345] [cursor=pointer]:
                - /url: /faq
        - generic [ref=e346]:
          - generic [ref=e347]: Showroom & CSKH
          - paragraph [ref=e348]: Flagship Styling LoftSoHo, New York, NY 10012concierge@rent-ish.com
          - generic [ref=e349]:
            - generic [ref=e350]: eco
            - generic [ref=e351]: Doanh nghiệp B-Corp chứng nhận 100% Trung hòa Carbon
      - generic [ref=e352]:
        - generic [ref=e353]: © 2026 Rent-ish Studio Inc. Bảo lưu mọi quyền.
        - generic [ref=e354]:
          - link "Chính sách bảo mật" [ref=e355] [cursor=pointer]:
            - /url: /privacy
          - link "Điều khoản dịch vụ" [ref=e356] [cursor=pointer]:
            - /url: /terms
  - button "Open Next.js Dev Tools" [ref=e362] [cursor=pointer]
  - alert [ref=e366]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Booking Flow', () => {
  4  |   test('User can browse products and view details', async ({ page }) => {
  5  |     // 1. Vào trang chủ
  6  |     await page.goto('/');
  7  | 
  8  |     // 2. Kiểm tra có hiển thị điều hướng "Trang Phục"
> 9  |     await expect(page.locator('text=Trang Phục')).toBeVisible();
     |                                                   ^ Error: expect(locator).toBeVisible() failed
  10 | 
  11 |     // 3. Kiểm tra danh sách sản phẩm nổi bật
  12 |     const productCard = page.locator('text=Thuê Ngay').first();
  13 |     await expect(productCard).toBeVisible();
  14 |     
  15 |     // Nếu có sản phẩm, bấm vào xem chi tiết
  16 |     if (await productCard.isVisible()) {
  17 |       await productCard.click();
  18 |       
  19 |       // 4. Kiểm tra xem đã chuyển hướng sang trang chi tiết chưa (Dù trang này chưa code xong)
  20 |       await expect(page).toHaveURL(/\/dresses\/.+/);
  21 |     }
  22 |   });
  23 | });
  24 | 
```