import { Page, Locator, test } from "@playwright/test";
import { ArticleBasePage } from "./ArticleBasePage";

export class NewsPage extends ArticleBasePage {
    readonly parentMenu: Locator;
    readonly subMenu: Locator;

    constructor(page: Page) {
        super(page);

        // Cấu hình riêng cho mục Tin tức
        this.parentMenu = page.locator("//a[@title='Quản lý bài viết']");
        this.subMenu = page.locator("//a[@href='news?act=man&type=tin-tuc']");
        this.clientUrl = "tin-tuc-va-su-kien";
    }

    // method 

    async gotoAdminMenu() {
        await test.step("Mở menu", async () => {
            await this.clickOn(this.parentMenu);
            await this.clickOn(this.subMenu);
        });
    }

    // method extends from ArticleBasePage
    async gotoAdminNews() {
        await this.gotoAdminMenu();
    }

    async addNews(title: string, slug: string, desc: string, content: string, imagePath: string) {
        await this.addArticle(title, slug, desc, content, imagePath);
    }

    async verifyNewsInAdminSuccess() {
        await this.verifyAdminSuccess();
    }

    async verifyNewsOnWebsite(title: string) {
        await this.verifyOnWebsite(title);
    }

    async deleteNews(title: string) {
        await this.deleteArticle(title);
    }

    async getClientArticleCount(): Promise<number> {
        return await this.page.getByText("Xem thêm bài viết", { exact: false }).count();
    }

    // ========== Bulk Test Methods ==========
    async copyBulkNews(count: number) {
        await this.copyBulkArticles(count);
    }

    async deleteBulkNews(prefix: string) {
        await this.deleteArticlesWithPrefix(prefix);
    }
}
