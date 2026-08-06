import { test, expect } from "../../src/fixtures/adminFixture";
import { allure } from "allure-playwright";
import { ProductPage } from "../../src/pages/admin/ProductPage";
import { validProductData, invalidProductCases } from "../../data/admin/productData";
import { TestHelper } from "../../src/utils/TestHelper";
import { MenuHelper } from "../../src/utils/MenuHelper";

test.use({ video: 'on' });

// Chỉ định nghĩa và chạy Test nếu có ít nhất 1 menu khớp với các Alias sau
if (MenuHelper.hasSubMenu(['Quản lý sản phẩm', 'Sản phẩm'], ['Sản phẩm', 'Danh sách sản phẩm'])) {
    test.describe("Product Management Tests", () => {
        let productPage: ProductPage;

        test.beforeEach(async ({ page }) => {
            productPage = new ProductPage(page);

            await allure.epic("Admin");
            await allure.feature("Add and Verify Product");
        });

        // ==================== DATA-DRIVEN NEGATIVE TEST CASES ====================
        invalidProductCases.forEach((data) => {
            test(
                `Add product should fail with ${data.scenario}`,
                {
                    tag: [
                        `@priority:${data.priority}`,
                        "@regression",
                        "@negative",
                    ],
                    annotation: [{ type: "severity", description: data.severity }],
                },
                async ({ page }) => {
                    await allure.story(`Invalid Product: ${data.scenario.toUpperCase()}`);

                    await test.step("bước 1: Điều hướng đến trang admin quản lý Sản phẩm", async () => {
                        await productPage.gotoAdminProduct();
                    });

                    await test.step("bước 2: Nhập thông tin không hợp lệ", async () => {
                        await productPage.addNewProduct(
                            data.title,
                            data.slug,
                            data.code,
                            data.regularPrice,
                            data.salePrice,
                            data.discount,
                            data.descHtml,
                            data.contentHtml,
                            data.thongsoHtml,
                            data.imagePath,
                            data.galleryPaths
                        );
                    });

                    await test.step("bước 3: Xác nhận hệ thống chặn lưu (Báo lỗi)", async () => {
                        if (data.assertionType === "form_block") {
                            try {
                                await expect(productPage.successAdminMessage).toBeVisible({ timeout: 2000 });
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
            "Add product successfully and verify on website",
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
                await allure.story("Valid Product Addition Flow");

                await test.step("bước 1: Điều hướng đến trang admin quản lý Sản phẩm", async () => {
                    await productPage.gotoAdminProduct();
                });

                await test.step("bước 2: Nhập thông tin và lưu sản phẩm mới", async () => {
                    await productPage.addNewProduct(
                        validProductData.title,
                        validProductData.slug,
                        validProductData.code,
                        validProductData.regularPrice,
                        validProductData.salePrice,
                        validProductData.discount,
                        validProductData.descHtml,
                        validProductData.contentHtml,
                        validProductData.thongsoHtml,
                        validProductData.imagePath,
                        validProductData.galleryPaths
                    );
                });

                await test.step("bước 3: Xác nhận lưu thành công trong Admin", async () => {
                    await productPage.verifyProductInAdminSuccess();
                    await TestHelper.takeScreenshot(page, 'Thông báo lưu sản phẩm thành công');
                });

                // Sử dụng khối try...finally để đảm bảo luôn xóa dữ liệu dù test có bị lỗi ở giữa chừng
                let isCreated = true;
                try {
                    await TestHelper.delay(page, 1000);

                    await test.step("bước 4: Kiểm tra sản phẩm hiển thị ngoài Website", async () => {
                        await productPage.verifyProductOnWebsite(validProductData.title);
                        await TestHelper.takeScreenshot(page, 'Sản phẩm hiển thị trên website');
                    });

                    await TestHelper.delay(page, 1000);
                } finally {
                    if (isCreated) {
                        await test.step("bước 5: Quay lại Admin và xóa sản phẩm vừa tạo (Cleanup)", async () => {

                            const baseUrl = process.env.BASE_URL?.endsWith('/') ? process.env.BASE_URL : process.env.BASE_URL + '/';

                            await page.goto(baseUrl + 'madmin/index.php');

                            await productPage.gotoAdminProduct();

                            await productPage.deleteProduct(validProductData.title);
                            await TestHelper.takeScreenshot(page, 'Sau khi xóa sản phẩm');
                        });
                    }
                }
            }
        );

        // ==================== PERFORMANCE / BULK INSERT TEST CASE ====================
        test(
            "Bulk insert 35 products via Copy and verify Load More on website",
            {
                tag: ["@priority:high", "@smoke",
                    "@regression"],
                annotation: [{ type: "severity", description: "critical" }],
            },
            async ({ page }) => {
                test.setTimeout(10 * 60 * 1000);
                await allure.story("Bulk Insert and Pagination Verification");

                const timestamp = Date.now().toString();
                const bulkPrefix = `[AUTO-TEST] Sản phẩm LoadTest`;
                const baseTitle = `${bulkPrefix} ${timestamp}`;
                const baseSlug = `san-pham-loadtest-${timestamp}`;

                await TestHelper.runBulkPaginationTest(
                    page,
                    productPage,
                    baseTitle,
                    baseSlug,
                    validProductData.imagePath,
                    bulkPrefix,
                    "Sản phẩm",
                    {
                        beforeSaveAction: async () => { }
                    }
                );
            }
        );
    });
}
