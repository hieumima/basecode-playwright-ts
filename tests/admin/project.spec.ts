import { test, expect } from "../../src/fixtures/adminFixture";
import { allure } from "allure-playwright";
import { ProjectPage } from "../../src/pages/admin/ProjectPage";
import { validProjectData, invalidProjectCases } from "../../data/admin/projectData";
import { TestHelper } from "../../src/utils/TestHelper";
import { MenuHelper } from "../../src/utils/MenuHelper";

test.use({ video: 'on' });

if (MenuHelper.hasSubMenu(['Quản lý bài viết', 'Bài viết'], ['Dự án', 'Project', 'Công trình'])) {
    test.describe("Project Management Tests", () => {
        let projectPage: ProjectPage;

        test.beforeEach(async ({ page }) => {
            projectPage = new ProjectPage(page);

            await allure.epic("Admin");
            await allure.feature("Add and Verify Projects");
        });


        // ==================== DATA-DRIVEN NEGATIVE TEST CASES ====================
        invalidProjectCases.forEach((data) => {
            test(
                `Add project should fail with ${data.scenario}`,
                {
                    tag: [
                        `@priority:${data.priority}`,
                        "@regression",
                        "@negative",
                    ],
                    annotation: [{ type: "severity", description: data.severity }],
                },
                async ({ page }) => {
                    await allure.story(`Invalid Project: ${data.scenario.toUpperCase()}`);

                    await test.step("bước 1: Điều hướng đến trang admin quản lý Dự án", async () => {
                        await projectPage.gotoAdminProject();
                    });

                    await test.step("bước 2: Nhập thông tin không hợp lệ", async () => {
                        await projectPage.addProject(
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
                                await expect(projectPage.successAdminMessage).toBeVisible({ timeout: 2000 });
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
            "Add project successfully and verify on website",
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
                await allure.story("Valid Project Addition Flow");

                await test.step("bước 1: Điều hướng đến trang admin quản lý Dự án", async () => {
                    await projectPage.gotoAdminProject();
                });

                await test.step("bước 2: Nhập thông tin và lưu dự án mới", async () => {
                    await projectPage.addProject(
                        validProjectData.title,
                        validProjectData.slug,
                        validProjectData.desc,
                        validProjectData.content,
                        validProjectData.imagePath
                    );
                });

                await test.step("bước 3: Xác nhận lưu thành công trong Admin", async () => {
                    await projectPage.verifyProjectInAdminSuccess();
                    await TestHelper.takeScreenshot(page, 'Thông báo lưu dự án thành công');
                });

                // Sử dụng khối try...finally để đảm bảo luôn xóa dữ liệu dù test có bị lỗi ở giữa chừng
                let isCreated = true;
                try {
                    await TestHelper.delay(page, 1000);

                    await test.step("bước 4: Kiểm tra dự án hiển thị ngoài Website", async () => {
                        await projectPage.verifyProjectOnWebsite(validProjectData.title);
                        await TestHelper.takeScreenshot(page, 'Dự án hiển thị trên website');
                    });

                    await TestHelper.delay(page, 1000);
                } finally {
                    if (isCreated) {
                        await test.step("bước 5: Quay lại Admin và xóa dự án vừa tạo (Cleanup)", async () => {
                            const baseUrl = process.env.BASE_URL?.endsWith('/') ? process.env.BASE_URL : process.env.BASE_URL + '/';
                            await page.goto(baseUrl + 'madmin/index.php');

                            await projectPage.gotoAdminProject();

                            await projectPage.deleteProject(validProjectData.title);
                            await TestHelper.takeScreenshot(page, 'Sau khi xóa dự án');
                        });
                    }
                }
            }
        );

        // ==================== PERFORMANCE / BULK INSERT TEST CASE ====================
        test(
            "Bulk insert 35 projects via Copy and verify Load More on website",
            {
                tag: ["@priority:high", "@smoke",
                    "@regression"],
                annotation: [{ type: "severity", description: "critical" }],
            },
            async ({ page }) => {
                test.setTimeout(10 * 60 * 1000);
                await allure.story("Bulk Insert and Pagination Verification");

                const timestamp = Date.now().toString();
                const bulkPrefix = `[AUTO-TEST] Dự án LoadTest`;
                const baseTitle = `${bulkPrefix} ${timestamp}`;
                const baseSlug = `du-an-loadtest-${timestamp}`;

                await TestHelper.runBulkPaginationTest(
                    page,
                    projectPage,
                    baseTitle,
                    baseSlug,
                    validProjectData.imagePath,
                    bulkPrefix,
                    "Dự án"
                );
            }
        );
    });
}
