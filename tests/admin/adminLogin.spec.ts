import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { AdminLoginPage } from "../../src/pages/admin/AdminLoginPage";
import { invalidAdminLoginCases, validAdminLoginData } from "../../data/admin/adminLoginData";

test.use({ video: 'on' });
test.describe("Admin Login Feature Tests", () => {
    let adminLoginPage: AdminLoginPage;

    test.beforeEach(async ({ page }) => {
        adminLoginPage = new AdminLoginPage(page);

        await allure.epic("Authentication");
        await allure.feature("Admin Login");

        await test.step("Điều hướng đến trang Đăng nhập Admin", async () => {
            await adminLoginPage.gotoLoginPage();
        });
    });

    // ==================== POSITIVE TEST CASE ====================
    test(
        "Login successfully with valid credentials",
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
            await allure.story("Valid Admin Login");

            await test.step("1 Nhập thông tin đăng nhập hợp lệ", async () => {
                await adminLoginPage.fillLoginForm(
                    validAdminLoginData.username,
                    validAdminLoginData.password
                );
            });

            await test.step("2 Click nút đăng nhập", async () => {
                await adminLoginPage.clickLogin();
            });

            await test.step("3 Xác nhận đăng nhập thành công", async () => {
                await expect(adminLoginPage.errorMessage).toBeHidden();
                await expect(page).toHaveURL(/.*madmin\/index\.php/);
                await expect(adminLoginPage.dashboardElement).toBeVisible();
                await page.waitForTimeout(2000);
            });
        }
    );

    // ==================== DATA-DRIVEN NEGATIVE TEST CASES ====================
    invalidAdminLoginCases.forEach((data) => {
        test(
            `Login should fail with ${data.scenario}`,
            {
                tag: [
                    `@priority:${data.priority}`,
                    "@regression",
                    "@negative",
                ],
                annotation: [{ type: "severity", description: data.severity }],
            },
            async ({ page }) => {
                await allure.story(`Invalid Admin Login: ${data.scenario.toUpperCase()}`);

                await test.step(`Nhập thông tin đăng nhập với trường hợp: ${data.scenario}`, async () => {
                    await adminLoginPage.fillLoginForm(
                        data.username,
                        data.password
                    );
                });

                await test.step("Click nút đăng nhập", async () => {
                    await adminLoginPage.clickLogin();
                });

                await test.step("Xác nhận hệ thống báo lỗi", async () => {
                    if (data.assertionType === "ui_error") {
                        await expect(adminLoginPage.errorMessage).toBeVisible();
                    }
                });
            }
        );
    });
});
