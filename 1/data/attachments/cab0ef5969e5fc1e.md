# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web/search.spec.ts >> Search Feature Tests >> Search should handle từ khóa chỉ có 1 khoảng trắng
- Location: tests/web/search.spec.ts:98:17

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 8
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e5]:
    - generic [ref=e6]:
      - link "Điện máy Trần Quang" [ref=e7] [cursor=pointer]:
        - /url: https://code4.mimadigi.vn/2026/july/tranquang_108426W/
        - img "Điện máy Trần Quang" [ref=e8]
      - generic [ref=e9]:
        - paragraph [ref=e10]: Công ty SX-TM-DV-KỸ THUẬT
        - paragraph [ref=e11]: ÂM THANH - ÁNH SÁNG
    - generic [ref=e13]:
      - button "Tìm kiếm" [ref=e14] [cursor=pointer]:
        - img [ref=e15]
      - textbox "Tìm theo tên sản" [ref=e16]:
        - /placeholder: "Tìm theo tên sản "
    - generic [ref=e18]:
      - generic [ref=e21]:
        - generic [ref=e22]: Hotline 1
        - link "0936106552" [ref=e23] [cursor=pointer]:
          - /url: tel:0936106552
      - generic [ref=e26]:
        - generic [ref=e27]: Hotline 2
        - link "0936106552" [ref=e28] [cursor=pointer]:
          - /url: tel:0936106552
  - generic [ref=e33]:
    - link "Danh Mục sản phẩm" [ref=e35] [cursor=pointer]:
      - /url: javascript:;
      - img [ref=e36]
      - generic [ref=e41]: Danh Mục sản phẩm
    - list [ref=e42]:
      - listitem [ref=e43]:
        - link "Trang chủ" [ref=e44] [cursor=pointer]:
          - /url: ""
      - listitem [ref=e45]:
        - link "Giới thiệu" [ref=e46] [cursor=pointer]:
          - /url: gioi-thieu
      - listitem [ref=e47]:
        - link "Dịch vụ" [ref=e48] [cursor=pointer]:
          - /url: dich-vu
          - text: Dịch vụ
      - listitem [ref=e50]:
        - link "Dự án" [ref=e51] [cursor=pointer]:
          - /url: du-an
      - listitem [ref=e52]:
        - link "Tài liệu kỹ thuật" [ref=e53] [cursor=pointer]:
          - /url: tai-lieu-ky-thuat
      - listitem [ref=e54]:
        - link "Tin tức & Sự kiện" [ref=e55] [cursor=pointer]:
          - /url: tin-tuc-va-su-kien
      - listitem [ref=e56]:
        - link "Liên hệ" [ref=e57] [cursor=pointer]:
          - /url: lien-he
  - list [ref=e60]:
    - listitem [ref=e61]:
      - link "Trang chủ" [ref=e62] [cursor=pointer]:
        - /url: https://code4.mimadigi.vn/2026/july/tranquang_108426W/
    - listitem [ref=e63]:
      - text: ">"
      - link "Sản phẩm" [ref=e64] [cursor=pointer]:
        - /url: https://code4.mimadigi.vn/2026/july/tranquang_108426W/san-pham
  - generic [ref=e68]:
    - generic [ref=e70]: Sản phẩm
    - generic [ref=e72]:
      - generic [ref=e74]:
        - link "[AUTO-TEST] Sản phẩm LoadTest 1786058954215" [ref=e76] [cursor=pointer]:
          - /url: san-pham-loadtest-1786058954215
          - img "[AUTO-TEST] Sản phẩm LoadTest 1786058954215" [ref=e77]
        - generic [ref=e78]:
          - heading "[AUTO-TEST] Sản phẩm LoadTest 1786058954215" [level=3] [ref=e79]:
            - link "[AUTO-TEST] Sản phẩm LoadTest 1786058954215" [ref=e80] [cursor=pointer]:
              - /url: san-pham-loadtest-1786058954215
          - paragraph [ref=e81]:
            - generic [ref=e82]: 90.000đ
            - generic [ref=e83]: "-10%"
            - generic [ref=e84]: 100.000đ
      - generic [ref=e86]:
        - link "Test Product Title 1786058922406" [ref=e88] [cursor=pointer]:
          - /url: test-product-title-1786058922406
          - img "Test Product Title 1786058922406"
        - generic [ref=e89]:
          - heading "Test Product Title 1786058922406" [level=3] [ref=e90]:
            - link "Test Product Title 1786058922406" [ref=e91] [cursor=pointer]:
              - /url: test-product-title-1786058922406
          - paragraph [ref=e92]:
            - generic [ref=e93]: 1.200.000đ
            - generic [ref=e94]: "-20%"
            - generic [ref=e95]: 1.500.000đ
      - generic [ref=e97]:
        - link "Loa BMB CSE-312-SE (Cặp)" [ref=e99] [cursor=pointer]:
          - /url: loa-bmb-cse-312-se-cap
          - img "Loa BMB CSE-312-SE (Cặp)" [ref=e100]
        - generic [ref=e101]:
          - heading "Loa BMB CSE-312-SE (Cặp)" [level=3] [ref=e102]:
            - link "Loa BMB CSE-312-SE (Cặp)" [ref=e103] [cursor=pointer]:
              - /url: loa-bmb-cse-312-se-cap
          - paragraph [ref=e104]:
            - generic [ref=e105]: Liên hệ báo giá
      - generic [ref=e107]:
        - link "Loa BMB CSE-310-SE (Cặp)" [ref=e109] [cursor=pointer]:
          - /url: loa-bmb-cse-310-se-cap
          - img "Loa BMB CSE-310-SE (Cặp)" [ref=e110]
        - generic [ref=e111]:
          - heading "Loa BMB CSE-310-SE (Cặp)" [level=3] [ref=e112]:
            - link "Loa BMB CSE-310-SE (Cặp)" [ref=e113] [cursor=pointer]:
              - /url: loa-bmb-cse-310-se-cap
          - paragraph [ref=e114]:
            - generic [ref=e115]: Liên hệ báo giá
      - generic [ref=e117]:
        - link "Loa BMB CSE-310-II-SE (Cặp)" [ref=e119] [cursor=pointer]:
          - /url: loa-bmb-cse-310-ii-se-cap
          - img "Loa BMB CSE-310-II-SE (Cặp)" [ref=e120]
        - generic [ref=e121]:
          - heading "Loa BMB CSE-310-II-SE (Cặp)" [level=3] [ref=e122]:
            - link "Loa BMB CSE-310-II-SE (Cặp)" [ref=e123] [cursor=pointer]:
              - /url: loa-bmb-cse-310-ii-se-cap
          - paragraph [ref=e124]:
            - generic [ref=e125]: Liên hệ báo giá
      - generic [ref=e127]:
        - link "Loa BMB CSE-308-SE (Cặp)" [ref=e129] [cursor=pointer]:
          - /url: loa-bmb-cse-308-se-cap
          - img "Loa BMB CSE-308-SE (Cặp)" [ref=e130]
        - generic [ref=e131]:
          - heading "Loa BMB CSE-308-SE (Cặp)" [level=3] [ref=e132]:
            - link "Loa BMB CSE-308-SE (Cặp)" [ref=e133] [cursor=pointer]:
              - /url: loa-bmb-cse-308-se-cap
          - paragraph [ref=e134]:
            - generic [ref=e135]: Liên hệ báo giá
      - generic [ref=e137]:
        - link "Loa BMB CSD-2000-SE (Cặp)" [ref=e139] [cursor=pointer]:
          - /url: loa-bmb-csd-2000-se-cap
          - img "Loa BMB CSD-2000-SE (Cặp)" [ref=e140]
        - generic [ref=e141]:
          - heading "Loa BMB CSD-2000-SE (Cặp)" [level=3] [ref=e142]:
            - link "Loa BMB CSD-2000-SE (Cặp)" [ref=e143] [cursor=pointer]:
              - /url: loa-bmb-csd-2000-se-cap
          - paragraph [ref=e144]:
            - generic [ref=e145]: Liên hệ báo giá
      - generic [ref=e147]:
        - link "Loa BMB CSD-880-SE (Cặp)" [ref=e149] [cursor=pointer]:
          - /url: loa-bmb-csd-880-se-cap
          - img "Loa BMB CSD-880-SE (Cặp)" [ref=e150]
        - generic [ref=e151]:
          - heading "Loa BMB CSD-880-SE (Cặp)" [level=3] [ref=e152]:
            - link "Loa BMB CSD-880-SE (Cặp)" [ref=e153] [cursor=pointer]:
              - /url: loa-bmb-csd-880-se-cap
          - paragraph [ref=e154]:
            - generic [ref=e155]: Liên hệ báo giá
  - generic [ref=e156]:
    - generic [ref=e159]:
      - generic [ref=e160]:
        - link "Điện máy Trần Quang" [ref=e161] [cursor=pointer]:
          - /url: https://code4.mimadigi.vn/2026/july/tranquang_108426W/
          - img "Điện máy Trần Quang" [ref=e162]
        - generic [ref=e163]:
          - paragraph [ref=e164]:
            - generic [ref=e166]: ÂM THANH CAMAX – CHẤT ÂM HOÀN HẢO KHẲNG ĐỊNH ĐẲNG CẤP
          - paragraph [ref=e167]: Chuyên cung cấp và phân phối các thiết bị âm thanh chính hãng cho phòng phim, karaoke gia đình và dự án hội trường chuyên nghiệp. Camax cam kết mang lại giải pháp âm thanh toàn diện, đỉnh cao cùng chính sách bảo hành dài hạn vượt trội.
        - paragraph [ref=e168]: Theo dõi chúng tôi tại
        - generic [ref=e169]:
          - link "Facebook" [ref=e170] [cursor=pointer]:
            - /url: ""
            - img "Facebook" [ref=e171]
          - link "Instargam" [ref=e172] [cursor=pointer]:
            - /url: ""
            - img "Instargam" [ref=e173]
          - link "Tiktok" [ref=e174] [cursor=pointer]:
            - /url: ""
            - img "Tiktok" [ref=e175]
      - generic [ref=e176]:
        - paragraph [ref=e177]: Thông tin công ty
        - paragraph [ref=e179]:
          - strong [ref=e180]:
            - generic [ref=e181]: CÔNG TY SX-TM-DV-KỸ THUẬT ÂM THANH - ÁNH SÁNG TRẦN QUANG
          - generic [ref=e182]:
            - text: "MST: 0319306507"
            - text: "Địa chỉ: 416 Võ Văn Vân, Xã Tân Vĩnh Lộc, Thành phố Hồ Chí Minh, Việt Nam"
            - text: "Email:"
            - link "amthanhtranquang@gmail.com" [ref=e183] [cursor=pointer]:
              - /url: mailto:amthanhtranquang@gmail.com
            - text: "Số TK: 319306507 ( MB bank ) – CN Vĩnh Lộc, TP HCM"
            - text: "Số ĐT: 0962 719 686"
            - text: "Người đại diện: TRẦN THANH QUANG"
      - generic [ref=e184]:
        - paragraph [ref=e185]: Về chúng tôi
        - list [ref=e186]:
          - listitem [ref=e187]:
            - link "Giới thiệu" [ref=e188] [cursor=pointer]:
              - /url: gioi-thieu
          - listitem [ref=e189]:
            - link "Sản phẩm" [ref=e190] [cursor=pointer]:
              - /url: san-pham
          - listitem [ref=e191]:
            - link "Dịch vụ" [ref=e192] [cursor=pointer]:
              - /url: dich-vu
          - listitem [ref=e193]:
            - link "Dự án" [ref=e194] [cursor=pointer]:
              - /url: du-an
          - listitem [ref=e195]:
            - link "Tài liệu kỹ thuật" [ref=e196] [cursor=pointer]:
              - /url: tai-lieu-ky-thuat
          - listitem [ref=e197]:
            - link "Tin tức & sự kiện" [ref=e198] [cursor=pointer]:
              - /url: tin-tuc-va-su-kien
          - listitem [ref=e199]:
            - link "Liên hệ" [ref=e200] [cursor=pointer]:
              - /url: lien-he
      - generic [ref=e201]:
        - paragraph [ref=e202]: Chính sách
        - list [ref=e203]:
          - listitem [ref=e204]:
            - link "Hướng dẫn sử dụng" [ref=e205] [cursor=pointer]:
              - /url: huong-dan-su-dung
          - listitem [ref=e206]:
            - link "Chính sách vận chuyển" [ref=e207] [cursor=pointer]:
              - /url: chinh-sach-van-chuyen
          - listitem [ref=e208]:
            - link "Chính sách đổi trả" [ref=e209] [cursor=pointer]:
              - /url: chinh-sach-doi-tra
          - listitem [ref=e210]:
            - link "Chính sách thanh toán" [ref=e211] [cursor=pointer]:
              - /url: chinh-sach-thanh-toan
          - listitem [ref=e212]:
            - link "Chính sách hậu mãi" [ref=e213] [cursor=pointer]:
              - /url: chinh-sach-hau-mai
          - listitem [ref=e214]:
            - link "Chính sách bảo mật" [ref=e215] [cursor=pointer]:
              - /url: chinh-sach-bao-mat
          - listitem [ref=e216]:
            - link "Chính sách bảo hành" [ref=e217] [cursor=pointer]:
              - /url: chinh-sach-bao-hanh
    - generic [ref=e220]: "Công ty TNHH SX-TM-DV-KỸ THUẬT ÂM THANH ÁNH SÁNG TRẦN QUAN - Giấy phép ĐKKD/Mã số thuế: 0319306507"
    - generic [ref=e223]:
      - generic [ref=e224]: Copyright ©2026 ĐIỆN MÁY TRẦN QUANG. Thiết kế Web MIMA
      - generic [ref=e225]:
        - generic [ref=e226]:
          - text: "Đang online:"
          - generic [ref=e227]: "44"
        - generic [ref=e228]: "|"
        - generic [ref=e229]:
          - text: "Hôm nay:"
          - generic [ref=e230]: "5"
        - generic [ref=e231]: "|"
        - generic [ref=e232]:
          - text: "Tổng truy cập:"
          - generic [ref=e233]: "473"
  - generic [ref=e234]:
    - 'link "Call me: 0936106552" [ref=e235] [cursor=pointer]':
      - /url: tel:0936106552
      - img [ref=e239]
      - generic [ref=e242]: "Call me: 0936106552"
    - 'link "Zalo: 0936106552" [ref=e243] [cursor=pointer]':
      - /url: https://zalo.me/0936106552
      - img [ref=e247]
      - generic [ref=e248]: "Zalo: 0936106552"
```

# Test source

```ts
  42  |                     dynamicKeyword = await homePage.getDynamicKeywordFromHome();
  43  |                     console.log(`Từ khóa ngẫu nhiên đã cào được: "${dynamicKeyword}"`);
  44  |                 });
  45  | 
  46  |                 await test.step(`2 Nhập từ khóa "${dynamicKeyword}" vào thanh search`, async () => {
  47  |                     await homePage.searchKeyword(dynamicKeyword);
  48  |                 });
  49  | 
  50  |                 await test.step("3 Kiểm tra kết quả tìm kiếm (Hỗ trợ 2 trường hợp)", async () => {
  51  |                     // Kiểm tra xem web có nút search không
  52  |                     const hasSearchButton = await homePage.searchButton.isVisible({ timeout: 2000 }).catch(() => false);
  53  | 
  54  |                     if (hasSearchButton) {
  55  |                         // Trương hợp 2: Web mới (Click button -> Chuyển sang trang kết quả)
  56  |                         await Promise.all([
  57  |                             page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(() => { }),
  58  |                             homePage.searchButton.click()
  59  |                         ]);
  60  | 
  61  |                         await TestHelper.takeScreenshot(page, 'Trang kết quả tìm kiếm');
  62  | 
  63  |                         const searchChunk = dynamicKeyword.substring(0, 15).toLowerCase();
  64  |                         const isProductVisible = await page.locator(`text=${searchChunk}`).first().isVisible({ timeout: 5000 }).catch(() => false);
  65  | 
  66  |                         if (!isProductVisible) {
  67  |                             const allText = await page.locator('body').innerText();
  68  |                             expect(allText.toLowerCase()).toContain(searchChunk);
  69  |                         } else {
  70  |                             expect(isProductVisible).toBeTruthy();
  71  |                         }
  72  |                     } else {
  73  |                         // Trường hợp 1: Web cũ (Dropdown AJAX)
  74  |                         await homePage.waitForDropdown();
  75  |                         await TestHelper.takeScreenshot(page, 'Kết quả tìm kiếm hiển thị dropdown');
  76  | 
  77  |                         const resultItems = homePage.getResultItems();
  78  |                         const count = await resultItems.count();
  79  |                         expect(count).toBeGreaterThan(0);
  80  | 
  81  |                         let foundMatch = false;
  82  |                         for (let i = 0; i < count; i++) {
  83  |                             const title = await resultItems.nth(i).getAttribute('title');
  84  |                             const searchChunk = dynamicKeyword.substring(0, 15).toLowerCase();
  85  |                             if (title && title.toLowerCase().includes(searchChunk)) {
  86  |                                 foundMatch = true;
  87  |                                 break;
  88  |                             }
  89  |                         }
  90  |                         expect(foundMatch).toBeTruthy();
  91  |                     }
  92  |                 });
  93  |             }
  94  |         );
  95  | 
  96  |         // ==================== DATA-DRIVEN NEGATIVE TEST CASES ====================
  97  |         invalidSearchCases.forEach((data) => {
  98  |             test(
  99  |                 `Search should handle ${data.scenario}`,
  100 |                 {
  101 |                     tag: [
  102 |                         `@priority:${data.priority}`,
  103 |                         "@regression",
  104 |                         "@negative",
  105 |                     ],
  106 |                     annotation: [{ type: "severity", description: data.severity }],
  107 |                 },
  108 |                 async ({ page }) => {
  109 |                     await allure.story(`Invalid Search: ${data.scenario.toUpperCase()}`);
  110 | 
  111 |                     await test.step(`Nhập từ khóa: '${data.keyword}'`, async () => {
  112 |                         await homePage.searchKeyword(data.keyword);
  113 |                     });
  114 | 
  115 |                     await test.step("Xác nhận hệ thống xử lý đúng (không trả về kết quả)", async () => {
  116 |                         await TestHelper.delay(page, 1000);
  117 | 
  118 |                         const hasSearchButton = await homePage.searchButton.isVisible({ timeout: 1000 }).catch(() => false);
  119 | 
  120 |                         if (hasSearchButton) {
  121 |                             // Nhấn tìm kiếm
  122 |                             await homePage.searchButton.click();
  123 | 
  124 |                             // Bắt lỗi khoảng trắng / rỗng (Một số web sẽ báo lỗi, một số web sẽ cho qua và trả về 0 kết quả)
  125 |                             let shouldCheckZeroProducts = true;
  126 |                             if (data.keyword.trim() === "") {
  127 |                                 const emptyMsg = page.locator("//div[contains(text(),'Chưa nhập từ khóa tìm kiếm')]");
  128 |                                 const isMsgVisible = await emptyMsg.isVisible({ timeout: 2000 }).catch(() => false);
  129 |                                 if (isMsgVisible) {
  130 |                                     await expect(emptyMsg).toBeVisible();
  131 |                                     shouldCheckZeroProducts = false;
  132 |                                 }
  133 |                             }
  134 | 
  135 |                             if (shouldCheckZeroProducts) {
  136 |                                 await page.waitForLoadState('domcontentloaded').catch(() => { });
  137 |                                 await TestHelper.delay(page, 1000);
  138 | 
  139 |                                 const products = homePage.getProductElementsOnPage();
  140 |                                 const productCount = await products.count();
  141 | 
> 142 |                                 expect(productCount).toBe(0);
      |                                                      ^ Error: expect(received).toBe(expected) // Object.is equality
  143 |                             }
  144 | 
  145 |                         } else {
  146 |                             const isVisible = await homePage.searchResultDropdown.isVisible();
  147 | 
  148 |                             if (isVisible) {
  149 |                                 const count = await homePage.getResultItems().count();
  150 |                                 expect(count).toBe(0);
  151 |                             }
  152 |                         }
  153 | 
  154 |                         await TestHelper.takeScreenshot(page, `Kết quả tìm kiếm cho ${data.scenario}`);
  155 |                     });
  156 |                 }
  157 |             );
  158 |         });
  159 |     });
  160 | }
  161 | 
```