import { test, expect } from "../../src/fixtures/adminFixture";
import { allure } from "allure-playwright";
import { NewsPage } from "../../src/pages/admin/NewsPage";
import { validNewsData, invalidNewsCases } from "../../data/admin/newsData";
import { TestHelper } from "../../src/utils/TestHelper";
import { MenuHelper } from "../../src/utils/MenuHelper";

test.use({ video: 'on' });

// Chỉ định nghĩa và chạy Test nếu có ít nhất 1 menu khớp với các Alias sau
if (MenuHelper.hasSubMenu(['Quản lý bài viết'], ['Tin tức', 'BLOG', 'Bài viết'])) {
    test.describe("News Management Tests", () => {
        let newsPage: NewsPage;

        test.beforeEach(async ({ page }) => {
            newsPage = new NewsPage(page);

            await allure.epic("Admin");
            await allure.feature("Add and Verify News");
        });

        // ==================== DATA-DRIVEN NEGATIVE TEST CASES ====================
        invalidNewsCases.forEach((data) => {
            test(
                `Add news should fail with ${data.scenario}`,
                {
                    tag: [
                        `@priority:${data.priority}`,
                        "@regression",
                        "@negative",
                    ],
                    annotation: [{ type: "severity", description: data.severity }],
                },
                async ({ page }) => {
                    await allure.story(`Invalid News: ${data.scenario.toUpperCase()}`);

                    await test.step("bước 1: Điều hướng đến trang admin quản lý Tin tức", async () => {
                        await newsPage.gotoAdminNews();
                    });

                    await test.step("bước 2: Nhập thông tin không hợp lệ", async () => {
                        await newsPage.addNews(
                            data.title,
                            data.slug,
                            data.desc,
                            data.content,
                            data.imagePath
                        );
                    });

                    await test.step("bước 3: Xác nhận hệ thống chặn lưu (Báo lỗi)", async () => {
                        if (data.assertionType === "form_block") {
                            try {
                                await expect(newsPage.successAdminMessage).toBeVisible({ timeout: 2000 });
                                throw new Error(`Web có bug: Test case '${data.scenario}' vẫn lưu thành công!`);
                            } catch (error: any) {
                                if (error.message.includes('Web có bug')) {
                                    throw error;
                                }
                                // Form blocked, expected behavior
                            }
                        }
                    });
                }
            );
        });    // ==================== POSITIVE TEST CASE ====================
        test(
            "Add news successfully and verify on website",
            {
                tag: [
                    "@priority:critical",
                    "@smoke",
                    "@regression",
                    "@positive",
                ],
                annotation: [{ type: "severity", description: "blocker" }],
            },
            async ({ page }) => {
                await allure.story("Valid News Addition Flow");

                await test.step("bước 1: Điều hướng đến trang admin quản lý Tin tức", async () => {
                    await newsPage.gotoAdminNews();
                });

                await test.step("bước 2: Nhập thông tin và lưu tin tức mới", async () => {

                    await newsPage.addNews(
                        validNewsData.title,
                        validNewsData.slug,
                        validNewsData.desc,
                        validNewsData.content,
                        validNewsData.imagePath
                    );
                });

                await test.step("bước 3: Xác nhận lưu thành công trong Admin", async () => {
                    await newsPage.verifyNewsInAdminSuccess();
                    await TestHelper.takeScreenshot(page, 'Thông báo lưu tin tức thành công');
                });

                // Sử dụng khối try...finally để đảm bảo luôn xóa dữ liệu dù test có bị lỗi ở giữa chừng
                let isCreated = true;
                try {
                    await TestHelper.delay(page, 1000);

                    await test.step("bước 4: Kiểm tra tin tức hiển thị ngoài Website", async () => {
                        await newsPage.verifyNewsOnWebsite(validNewsData.title);
                        await TestHelper.takeScreenshot(page, 'Tin tức hiển thị trên website');
                    });

                    await TestHelper.delay(page, 1000);
                } finally {
                    if (isCreated) {
                        await test.step("bước 5: Quay lại Admin và xóa tin tức vừa tạo (Cleanup)", async () => {

                            const baseUrl = process.env.BASE_URL?.endsWith('/') ? process.env.BASE_URL : process.env.BASE_URL + '/';

                            await page.goto(baseUrl + 'madmin/index.php');

                            await newsPage.gotoAdminNews();

                            await newsPage.deleteNews(validNewsData.title);
                            await TestHelper.takeScreenshot(page, 'Sau khi xóa tin tức');
                        });
                    }
                }
            }
        );

        // ==================== PERFORMANCE / BULK INSERT TEST CASE ====================
        test(
            "Bulk insert 35 news via Copy and verify Load More on website",
            {
                tag: ["@priority:high", "@smoke",
                    "@regression"],
                annotation: [{ type: "severity", description: "critical" }],
            },
            async ({ page }) => {
                test.setTimeout(10 * 60 * 1000);
                await allure.story("Bulk Insert and Pagination Verification");

                const timestamp = Date.now().toString();
                const bulkPrefix = `[AUTO-TEST] Tin tức LoadTest`;
                const baseTitle = `${bulkPrefix} ${timestamp}`;
                const baseSlug = `tin-tuc-loadtest-${timestamp}`;

                await TestHelper.runBulkPaginationTest(
                    page,
                    newsPage,
                    baseTitle,
                    baseSlug,
                    validNewsData.imagePath,
                    bulkPrefix,
                    "Tin tức"
                );
            }
        );
    });
}
