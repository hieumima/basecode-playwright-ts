import { Page, Locator, test } from "@playwright/test";
import { ArticleBasePage } from "./ArticleBasePage";

export class ServiceCategory1Page extends ArticleBasePage {
    readonly parentMenu: Locator;
    readonly subMenu: Locator;

    constructor(page: Page) {
        super(page);
        this.parentMenu = page.locator("//a[@title='Quản lý Dịch vụ']");
        this.subMenu = page.locator("//a[@href='news?act=man_list&type=dich-vu']");
        this.clientUrl = "dich-vu";
    }

    // method 

    async gotoAdminMenu() {
        await test.step("Mở menu", async () => {
            await this.clickOn(this.parentMenu);
            await this.clickOn(this.subMenu);
        });
    }

    // method extends from ArticleBasePage
    async gotoAdminServiceCategory1() {
        await this.gotoAdminMenu();
    }

    async addArticle(title: string, slug: string, desc: string, content: string, imagePath: string) {
        await super.addArticle(title, slug, "", content, imagePath);
    }

    async addServiceCategory1(title: string, slug: string, desc: string, content: string, imagePath: string) {
        await this.addArticle(title, slug, desc, content, imagePath);
    }

    async verifyServiceCategory1InAdminSuccess() {
        await this.verifyAdminSuccess();
    }

    async verifyServiceCategory1OnWebsite(title: string) {
        await test.step(`Kiểm tra danh mục '${title}' hiển thị trên trang web`, async () => {
            const baseUrl = process.env.BASE_URL?.endsWith('/') ? process.env.BASE_URL : process.env.BASE_URL + '/';
            await this.page.goto(baseUrl + this.clientUrl);

            const articleItem = this.page.getByText(title, { exact: false }).first();
            await articleItem.waitFor({ state: 'attached', timeout: 5000 });
        });
    }

    async deleteServiceCategory1(title: string) {
        await this.deleteArticle(title);
    }

    async getClientArticleCount(): Promise<number> {
        return await this.page.getByText("Xem thêm", { exact: false }).count();
    }

    // ========== Bulk Test Methods ==========
    async deleteBulkServiceCategory1(prefix: string) {
        await this.deleteArticlesWithPrefix(prefix);
    }
}
