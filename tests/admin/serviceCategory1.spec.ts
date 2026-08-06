import { test, expect } from "../../src/fixtures/adminFixture";
import { allure } from "allure-playwright";
import { ServiceCategory1Page } from "../../src/pages/admin/ServiceCategory1Page";
import { validServiceCategory1Data, invalidServiceCategory1Cases } from "../../data/admin/serviceCategory1Data";
import { TestHelper } from "../../src/utils/TestHelper";
import { MenuHelper } from "../../src/utils/MenuHelper";

test.use({ video: 'on' });

if (MenuHelper.hasSubMenu(['Quản lý Dịch vụ'], ['Danh mục cấp 1'])) {
    test.describe("Service Category 1 Management Tests", () => {
        let servicePage: ServiceCategory1Page;

        test.beforeEach(async ({ page }) => {
            servicePage = new ServiceCategory1Page(page);

            await allure.epic("Admin");
            await allure.feature("Add and Verify Service Category 1");
        });

        // ==================== DATA-DRIVEN NEGATIVE TEST CASES ====================
        invalidServiceCategory1Cases.forEach((data) => {
            test(
                `Add Service Category 1 should fail with ${data.scenario}`,
                {
                    tag: [
                        `@priority:${data.priority}`,
                        "@regression",
                        "@negative",
                    ],
                    annotation: [{ type: "severity", description: data.severity }],
                },
                async ({ page }) => {
                    await allure.story(`Invalid Service Category 1: ${data.scenario.toUpperCase()}`);

                    await test.step("bước 1: Điều hướng đến trang admin quản lý Dịch vụ cấp 1", async () => {
                        await servicePage.gotoAdminServiceCategory1();
                    });

                    await test.step("bước 2: Nhập thông tin không hợp lệ", async () => {
                        await servicePage.addServiceCategory1(
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
                                await expect(servicePage.successAdminMessage).toBeVisible({ timeout: 2000 });
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
        });

        // ==================== POSITIVE TEST CASE ====================
        test(
            "Add Service Category 1 successfully and verify on website",
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
                await allure.story("Valid Service Category 1 Addition Flow");

                await test.step("bước 1: Điều hướng đến trang admin quản lý Dịch vụ cấp 1", async () => {
                    await servicePage.gotoAdminServiceCategory1();
                });

                await test.step("bước 2: Nhập thông tin và lưu danh mục mới", async () => {
                    await servicePage.addServiceCategory1(
                        validServiceCategory1Data.title,
                        validServiceCategory1Data.slug,
                        validServiceCategory1Data.desc,
                        validServiceCategory1Data.content,
                        validServiceCategory1Data.imagePath
                    );
                });

                await test.step("bước 3: Xác nhận lưu thành công trong Admin", async () => {
                    await servicePage.verifyServiceCategory1InAdminSuccess();
                    await TestHelper.takeScreenshot(page, 'Thông báo lưu dịch vụ cấp 1 thành công');
                });

                // Dọn dẹp dữ liệu
                let isCreated = true;
                try {
                    await TestHelper.delay(page, 1000);

                    await test.step("bước 4: Kiểm tra danh mục hiển thị ngoài Website", async () => {
                        await servicePage.verifyServiceCategory1OnWebsite(validServiceCategory1Data.title);
                        await TestHelper.takeScreenshot(page, 'Dịch vụ cấp 1 hiển thị trên website');
                    });

                    await TestHelper.delay(page, 1000);
                } finally {
                    if (isCreated) {
                        await test.step("bước 5: Quay lại Admin và xóa danh mục vừa tạo (Cleanup)", async () => {
                            const baseUrl = process.env.BASE_URL?.endsWith('/') ? process.env.BASE_URL : process.env.BASE_URL + '/';
                            await page.goto(baseUrl + 'madmin/index.php');
                            await servicePage.gotoAdminServiceCategory1();
                            await servicePage.deleteServiceCategory1(validServiceCategory1Data.title);
                            await TestHelper.takeScreenshot(page, 'Sau khi xóa dịch vụ cấp 1');
                        });
                    }
                }
            }
        );

        // ==================== PERFORMANCE / BULK INSERT TEST CASE ====================
        test(
            "Bulk insert 35 Service Category 1 manually and verify Load More on website",
            {
                tag: ["@priority:high", "@smoke", "@regression",],
                annotation: [{ type: "severity", description: "critical" }],
            },
            async ({ page }) => {
                test.setTimeout(15 * 60 * 1000); // 15 phút vì thao tác manual sẽ lâu hơn
                await allure.story("Bulk Insert Manually and Pagination Verification");

                const timestamp = Date.now().toString();
                const bulkPrefix = `[AUTO-TEST] Dịch vụ LoadTest`;
                const baseTitle = `${bulkPrefix} ${timestamp}`;
                const baseSlug = `dich-vu-loadtest-${timestamp}`;

                await TestHelper.runManualBulkPaginationTest(
                    page,
                    servicePage,
                    baseTitle,
                    baseSlug,
                    validServiceCategory1Data.imagePath,
                    bulkPrefix,
                    "Dịch vụ cấp 1",
                    {
                        addCount: 35,
                        desc: validServiceCategory1Data.desc,
                        content: validServiceCategory1Data.content
                    }
                );
            }
        );
    });
}
