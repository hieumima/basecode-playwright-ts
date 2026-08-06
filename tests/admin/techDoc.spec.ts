import { test, expect } from "../../src/fixtures/adminFixture";
import { allure } from "allure-playwright";
import { TechDocPage } from "../../src/pages/admin/TechDocPage";
import { validTechDocData, invalidTechDocCases } from "../../data/admin/techDocData";
import { TestHelper } from "../../src/utils/TestHelper";
import { MenuHelper } from "../../src/utils/MenuHelper";

test.use({ video: 'on' });

if (MenuHelper.hasSubMenu(['Quản lý bài viết', 'Bài viết'], ['Tài liệu kỹ thuật', 'Tech Doc', 'Tài liệu', 'Hồ sơ năng lực'])) {
    test.describe("Technical Document Management Tests", () => {
        let techDocPage: TechDocPage;

        test.beforeEach(async ({ page }) => {
            techDocPage = new TechDocPage(page);

            await allure.epic("Admin");
            await allure.feature("Add and Verify Technical Documents");
        });


        // ==================== DATA-DRIVEN NEGATIVE TEST CASES ====================
        invalidTechDocCases.forEach((data) => {
            test(
                `Add technical document should fail with ${data.scenario}`,
                {
                    tag: [
                        `@priority:${data.priority}`,
                        "@regression",
                        "@negative",
                    ],
                    annotation: [{ type: "severity", description: data.severity }],
                },
                async ({ page }) => {
                    await allure.story(`Invalid Tech Doc: ${data.scenario.toUpperCase()}`);

                    await test.step("bước 1: Điều hướng đến trang admin quản lý Tài liệu kỹ thuật", async () => {
                        await techDocPage.gotoAdminTechDoc();
                    });

                    await test.step("bước 2: Nhập thông tin không hợp lệ", async () => {
                        await techDocPage.addTechDoc(
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
                                await expect(techDocPage.successAdminMessage).toBeVisible({ timeout: 2000 });
                                throw new Error(`Web có bug: Test case '${data.scenario}' vẫn lưu thành công!`);
                            } catch (error: any) {
                                if (error.message.includes('Web có bug')) {
                                    throw error;
                                }
                                // Expected to fail validation
                            }
                        }
                    });
                }
            );
        });

        // ==================== POSITIVE TEST CASE ====================
        test(
            "Add technical document successfully and verify on website",
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
                await allure.story("Valid Technical Document Addition Flow");

                await test.step("bước 1: Điều hướng đến trang admin quản lý Tài liệu kỹ thuật", async () => {
                    await techDocPage.gotoAdminTechDoc();
                });

                await test.step("bước 2: Nhập thông tin và lưu tài liệu mới", async () => {
                    await techDocPage.addTechDoc(
                        validTechDocData.title,
                        validTechDocData.slug,
                        validTechDocData.desc,
                        validTechDocData.content,
                        validTechDocData.imagePath
                    );
                });

                await test.step("bước 3: Xác nhận lưu thành công trong Admin", async () => {
                    await techDocPage.verifyTechDocInAdminSuccess();
                    await TestHelper.takeScreenshot(page, 'Thông báo lưu tài liệu thành công');
                });

                // Sử dụng khối try...finally để đảm bảo luôn xóa dữ liệu dù test có bị lỗi ở giữa chừng
                let isCreated = true;
                try {
                    await TestHelper.delay(page, 1000);

                    await test.step("bước 4: Kiểm tra tài liệu hiển thị ngoài Website", async () => {
                        await techDocPage.verifyTechDocOnWebsite(validTechDocData.title);
                        await TestHelper.takeScreenshot(page, 'Tài liệu hiển thị trên website');
                    });

                    await TestHelper.delay(page, 1000);
                } finally {
                    if (isCreated) {
                        await test.step("bước 5: Quay lại Admin và xóa tài liệu vừa tạo (Cleanup)", async () => {
                            const baseUrl = process.env.BASE_URL?.endsWith('/') ? process.env.BASE_URL : process.env.BASE_URL + '/';
                            await page.goto(baseUrl + 'madmin/index.php');

                            await techDocPage.gotoAdminTechDoc();

                            await techDocPage.deleteTechDoc(validTechDocData.title);
                            await TestHelper.takeScreenshot(page, 'Sau khi xóa tài liệu');
                        });
                    }
                }
            }
        );

        // ==================== PERFORMANCE / BULK INSERT TEST CASE ====================
        test(
            "Bulk insert 35 technical documents via Copy and verify Load More on website",
            {
                tag: ["@priority:high", "@smoke",
                    "@regression"],
                annotation: [{ type: "severity", description: "critical" }],
            },
            async ({ page }) => {
                test.setTimeout(10 * 60 * 1000);
                await allure.story("Bulk Insert and Pagination Verification");

                const timestamp = Date.now().toString();
                const bulkPrefix = `[AUTO-TEST] Tài liệu LoadTest`;
                const baseTitle = `${bulkPrefix} ${timestamp}`;
                const baseSlug = `tai-lieu-loadtest-${timestamp}`;

                await TestHelper.runBulkPaginationTest(
                    page,
                    techDocPage,
                    baseTitle,
                    baseSlug,
                    validTechDocData.imagePath,
                    bulkPrefix,
                    "Tài liệu kỹ thuật"
                );
            }
        );
    });
}
