# 🎭 Playwright TypeScript Automation Testing Boilerplate

Đây là bộ khung nền tảng (**Boilerplate Framework**) kiểm thử tự động End-to-End (E2E) chuyên nghiệp được xây dựng trên sự kết hợp giữa **Playwright** và **TypeScript**. Framework được thiết kế theo tiêu chuẩn doanh nghiệp, tối ưu cho việc tái sử dụng, dễ dàng mở rộng, hỗ trợ chạy trên nhiều môi trường khác nhau (**Multi-environment**), tích hợp sẵn CI/CD (GitLab CI) và có các kịch bản chạy tự động (Auto-discovery) vô cùng mạnh mẽ.

---

## 🌟 Tính Năng Nổi Bật (Key Features)

*   **Cấu trúc Page Object Model (POM):** Phân tách rõ ràng giữa kịch bản kiểm thử (Tests) và đối tượng trang (Pages). Được phân cấp theo các module rõ ràng: `admin`, `web`, `seo`.
*   **Quản Lý Đa Môi Trường (Multi-environment):** Tự động áp dụng cấu hình (`dev`, `qa`, `staging`) thông qua thư mục `config/.env.*`.
*   **Fixture Linh Hoạt:** Phân chia thành `adminFixture` và `webFixture`, giúp tối ưu hóa quá trình setup và teardown trạng thái trình duyệt cho từng ngữ cảnh người dùng.
*   **Tự Động Quét Cấu Trúc Menu (Auto-Discovery):** Tích hợp `global.setup.ts` cho phép tự động giả lập đăng nhập Admin và trích xuất toàn bộ cấu trúc Menu (Sidebar Tree) ra file JSON để phục vụ cho các kiểm thử tính toàn vẹn (Integrity testing).
*   **Kiểm Thử SEO Tự Động:** Hỗ trợ script `generateSeoData.ts` (Cheerio-based) tự động đọc Sitemap, thu thập thẻ Meta/Title từ trang web, hợp nhất với cấu hình tùy chỉnh để tạo sẵn data testing.
*   **Báo cáo Allure Chuyên Nghiệp:** Tích hợp `allure-playwright`, tự động chụp ảnh màn hình khi có lỗi, phân tách các bước rõ ràng thông qua `customStep` và hiển thị lịch sử (Trend) chạy test.
*   **CI/CD Pipeline Sẵn Sàng (GitLab CI):** Tích hợp phân mảnh song song (Sharding), xuất báo cáo lên GitLab Pages và gửi cảnh báo tự động qua Email (`swaks`).

---

## 📁 Cấu Trúc Thư Mục Lõi (Core Architecture)

```text
basecode-playwright-ts/
├── .gitlab-ci.yml              # Pipeline GitLab CI (Test, Report, Deploy Pages, Email Notification)
├── config/                     # Thư mục lưu trữ biến môi trường (.env-example.dev, .env.qa,...)
├── data/
│   ├── seo/                    # Cấu hình dữ liệu SEO tĩnh (seoManualConfig)
│   └── templates/              # Thư mục lưu trữ file sinh tự động (scanned-menu.json)
├── scripts/
│   └── generateSeoData.ts      # Script Node.js tự động đọc Sitemap và sinh file test data
├── src/
│   ├── constants/              # Các hằng số cấu hình toàn cục (Global constants)
│   ├── fixtures/               # Khởi tạo Fixture Playwright (adminFixture.ts, webFixture.ts)
│   ├── pages/                  # Đối tượng giao diện POM (BasePage.ts, admin/, seo/, web/)
│   ├── services/               # Quản lý các kết nối API, dịch vụ tiện ích khác
│   ├── setup/
│   │   └── global.setup.ts     # Global Setup Playwright - Chứa logic Auto-Discovery menu
│   ├── types/                  # Các Interfaces và Types khai báo dùng chung
│   └── utils/                  # Thư viện tiện ích xử lý chuỗi, thời gian, report (reportHelper.ts)
├── tests/
│   ├── admin/                  # Kịch bản kiểm thử dành riêng cho hệ quản trị (CMS)
│   ├── seo/                    # Kịch bản kiểm thử các tiêu chí On-Page SEO
│   └── web/                    # Kịch bản kiểm thử người dùng ngoài Frontend
├── package.json                # Quản lý dependencies và Scripts chạy test NPM
└── playwright.config.ts        # Cấu hình lõi Playwright (Workers, Retries, Reporters, timeout)
```

---

## 🛠️ Yêu Cầu Hệ Thống (Prerequisites)

*   **Node.js**: Phiên bản LTS khuyến nghị (từ `18.x.x` hoặc mới hơn, hiện CI chạy trên `20.x`).
*   **NPM**: Trình quản lý gói.
*   **Java (JDK)**: Cần thiết để tạo báo cáo **Allure Report** cục bộ (Local).

---

## 🚀 Hướng Dẫn Cài Đặt (Local Setup)

1. **Cài đặt các gói thư viện NPM:**
   ```bash
   npm install
   ```

2. **Cài đặt Browser Engine:**
   ```bash
   npx playwright install --with-deps chrome
   ```

3. **Thiết lập Môi trường (.env):**
   Copy các file `.env-example.*` trong thư mục `config/` thành `.env.*` (VD: `.env.dev`, `.env.qa`).
   Bổ sung thêm tài khoản Admin, đường dẫn `BASE_URL` cho từng file cấu hình tương ứng.

---

## 🏃 Thực Thi Kiểm Thử (Running Tests)

Bạn có thể truyền biến `ENV` vào trước lệnh chạy để chọn môi trường (mặc định nếu không truyền là `qa`).

### Lệnh chay thông dụng bằng NPM Scripts:

*   **Chạy toàn bộ (Clean Allure + Generate SEO + Test):**
    ```bash
    # Windows PowerShell
    $env:ENV="qa"; npm run test
    
    # macOS/Linux (Bash)
    ENV=qa npm run test
    ```
*   **Chạy riêng kiểm thử Playwright:**
    ```bash
    ENV=staging npx playwright test
    ```

### Chạy Theo Tag Hoặc Module:
*   Chỉ chạy bộ test ở module Admin:
    ```bash
    npx playwright test tests/admin/
    ```
*   Chạy bài kiểm thử chứa nhãn/tag `@smoke`:
    ```bash
    npx playwright test --grep @smoke
    ```

---

## 📊 Báo Cáo Kiểm Thử & CI/CD (Reporting & CI)

### Xem Báo Cáo Allure Local
1. Lệnh tạo dữ liệu: `npx allure generate allure-results --clean -o allure-report`
2. Lệnh mở server xem báo cáo: `npx allure open allure-report`

### Pipeline CI/CD trên GitLab
Dự án được cấu hình bằng `.gitlab-ci.yml` chứa các Job cốt lõi:
1. `execute-tests`: Chạy test phân mảnh (3 luồng song song) và nén cache thư viện `.npm/`.
2. `pages`: Tổng hợp `allure-results`, tạo và lưu trữ Allure lên GitLab Pages. Đính kèm lịch sử (History Trend) giữa các lần chạy.
3. `send-email`: Sử dụng SMTP (`EMAIL_USERNAME`, `EMAIL_PASSWORD`) để gửi email chi tiết cho các thành viên trong đội ngũ QA.

---

## 💡 Best Practices Trong Dự Án

*   **Sử dụng Fixtures:** Kịch bản ở mục `tests/admin/` nên sử dụng `adminFixture`, tương tự với thư mục `tests/web/`. Không dùng chung chung để đảm bảo tính phân tách Session.
*   **Sử dụng BasePage:** Bất kỳ Page Object mới nào ở `src/pages/` cũng phải kế thừa `BasePage`. Điều này sẽ giúp bạn tận dụng được các hàm wait linh hoạt.
*   **Tạo Data SEO Tự Động:** Nếu có cập nhật Sitemap trên môi trường QA/Staging, hãy chạy lệnh `npm run generate-seo` để tự động kéo các cấu hình trang mới nhất về làm dữ liệu test, thay vì phải sửa script kiểm thử một cách thủ công.