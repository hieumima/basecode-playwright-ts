import { test as webTest, expect } from "./webFixture";
import { AdminLoginPage } from "../pages/admin/AdminLoginPage";
import { NewsPage } from "../pages/admin/NewsPage";
import { ProjectPage } from "../pages/admin/ProjectPage";
import { TechDocPage } from "../pages/admin/TechDocPage";
import { ServiceCategory1Page } from "../pages/admin/ServiceCategory1Page";
import { validAdminLoginData } from "../../data/admin/adminLoginData";

type AdminFixtures = {
    newsPage: NewsPage;
    projectPage: ProjectPage;
    techDocPage: TechDocPage;
    serviceCategory1Page: ServiceCategory1Page;
    adminLoginPage: AdminLoginPage;
};

export const test = webTest.extend<AdminFixtures>({
    adminLoginPage: async ({ page }, use) => {
        await use(new AdminLoginPage(page));
    },
    newsPage: async ({ page }, use) => {
        await use(new NewsPage(page));
    },
    projectPage: async ({ page }, use) => {
        await use(new ProjectPage(page));
    },
    techDocPage: async ({ page }, use) => {
        await use(new TechDocPage(page));
    },
    serviceCategory1Page: async ({ page }, use) => {
        await use(new ServiceCategory1Page(page));
    },

    page: async ({ page }, use) => {
        await webTest.step("Tiền xử lý (Fixture): Đăng nhập tự động vào Admin", async () => {
            const adminLoginPage = new AdminLoginPage(page);
            await adminLoginPage.gotoLoginPage();
            await adminLoginPage.fillLoginForm(validAdminLoginData.username, validAdminLoginData.password);
            await adminLoginPage.clickLogin();

            await expect(page).toHaveURL(/.*madmin\/index\.php/);
        });
        
        // Trả page (đã đăng nhập) về cho các file spec chạy
        await use(page);
    },
});

export { expect };
