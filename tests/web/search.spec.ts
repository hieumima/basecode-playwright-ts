import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { HomePage } from "../../src/pages/web/HomePage";
import { invalidSearchCases } from "../../data/web/searchData";
import { TestHelper } from "../../src/utils/TestHelper";
import { FeatureHelper } from "../../src/utils/FeatureHelper";

test.use({ video: 'on' });
if (FeatureHelper.hasSearchFeature()) {
    test.describe("Search Feature Tests", () => {
        let homePage: HomePage;

        test.beforeEach(async ({ page }) => {
            homePage = new HomePage(page);

            await allure.epic("Web");
            await allure.feature("Search from Homepage Dropdown");

            await test.step("Điều hướng đến trang chủ", async () => {
                await homePage.gotoHomePage();
            });
        });

        // ==================== POSITIVE TEST CASE (DYNAMIC DATA) ====================
        test(
            "Search form successfully finds product using dynamic keyword from homepage",
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
                await allure.story("Dynamic Keyword Search");

                let dynamicKeyword = "";

                await test.step("1 Cào lấy một tên sản phẩm ngẫu nhiên trên trang chủ", async () => {
                    dynamicKeyword = await homePage.getDynamicKeywordFromHome();
                    console.log(`Từ khóa ngẫu nhiên đã cào được: "${dynamicKeyword}"`);
                });

                await test.step(`2 Nhập từ khóa "${dynamicKeyword}" vào thanh search`, async () => {
                    await homePage.searchKeyword(dynamicKeyword);
                });

                await test.step("3 Kiểm tra kết quả tìm kiếm (Hỗ trợ 2 trường hợp)", async () => {
                    // Kiểm tra xem web có nút search không
                    const hasSearchButton = await homePage.searchButton.isVisible({ timeout: 2000 }).catch(() => false);

                    if (hasSearchButton) {
                        // Trương hợp 2: Web mới (Click button -> Chuyển sang trang kết quả)
                        await Promise.all([
                            page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(() => { }),
                            homePage.searchButton.click()
                        ]);

                        await TestHelper.takeScreenshot(page, 'Trang kết quả tìm kiếm');

                        const searchChunk = dynamicKeyword.substring(0, 15).toLowerCase();
                        const isProductVisible = await page.locator(`text=${searchChunk}`).first().isVisible({ timeout: 5000 }).catch(() => false);

                        if (!isProductVisible) {
                            const allText = await page.locator('body').innerText();
                            expect(allText.toLowerCase()).toContain(searchChunk);
                        } else {
                            expect(isProductVisible).toBeTruthy();
                        }
                    } else {
                        // Trường hợp 1: Web cũ (Dropdown AJAX)
                        await homePage.waitForDropdown();
                        await TestHelper.takeScreenshot(page, 'Kết quả tìm kiếm hiển thị dropdown');

                        const resultItems = homePage.getResultItems();
                        const count = await resultItems.count();
                        expect(count).toBeGreaterThan(0);

                        let foundMatch = false;
                        for (let i = 0; i < count; i++) {
                            const title = await resultItems.nth(i).getAttribute('title');
                            const searchChunk = dynamicKeyword.substring(0, 15).toLowerCase();
                            if (title && title.toLowerCase().includes(searchChunk)) {
                                foundMatch = true;
                                break;
                            }
                        }
                        expect(foundMatch).toBeTruthy();
                    }
                });
            }
        );

        // ==================== DATA-DRIVEN NEGATIVE TEST CASES ====================
        invalidSearchCases.forEach((data) => {
            test(
                `Search should handle ${data.scenario}`,
                {
                    tag: [
                        `@priority:${data.priority}`,
                        "@regression",
                        "@negative",
                    ],
                    annotation: [{ type: "severity", description: data.severity }],
                },
                async ({ page }) => {
                    await allure.story(`Invalid Search: ${data.scenario.toUpperCase()}`);

                    await test.step(`Nhập từ khóa: '${data.keyword}'`, async () => {
                        await homePage.searchKeyword(data.keyword);
                    });

                    await test.step("Xác nhận hệ thống xử lý đúng (không trả về kết quả)", async () => {
                        await TestHelper.delay(page, 1000);

                        const hasSearchButton = await homePage.searchButton.isVisible({ timeout: 1000 }).catch(() => false);

                        if (hasSearchButton) {
                            // Nhấn tìm kiếm
                            await homePage.searchButton.click();

                            // Bắt lỗi khoảng trắng / rỗng (Một số web sẽ báo lỗi, một số web sẽ cho qua và trả về 0 kết quả)
                            let shouldCheckZeroProducts = true;
                            if (data.keyword.trim() === "") {
                                const emptyMsg = page.locator("//div[contains(text(),'Chưa nhập từ khóa tìm kiếm')]");
                                const isMsgVisible = await emptyMsg.isVisible({ timeout: 2000 }).catch(() => false);
                                if (isMsgVisible) {
                                    await expect(emptyMsg).toBeVisible();
                                    shouldCheckZeroProducts = false;
                                }
                            }

                            if (shouldCheckZeroProducts) {
                                await page.waitForLoadState('domcontentloaded').catch(() => { });
                                await TestHelper.delay(page, 1000);

                                const products = homePage.getProductElementsOnPage();
                                const productCount = await products.count();

                                expect(productCount).toBe(0);
                            }

                        } else {
                            const isVisible = await homePage.searchResultDropdown.isVisible();

                            if (isVisible) {
                                const count = await homePage.getResultItems().count();
                                expect(count).toBe(0);
                            }
                        }

                        await TestHelper.takeScreenshot(page, `Kết quả tìm kiếm cho ${data.scenario}`);
                    });
                }
            );
        });
    });
}
