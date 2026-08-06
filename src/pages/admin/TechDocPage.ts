import { Page, Locator, test } from "@playwright/test";
import { ArticleBasePage } from "./ArticleBasePage";

export class TechDocPage extends ArticleBasePage {
    readonly parentMenu: Locator;
    readonly subMenu: Locator;

    constructor(page: Page) {
        super(page);

        // Cấu hình riêng cho mục Tài liệu kỹ thuật
        this.parentMenu = page.locator("//a[@title='Quản lý bài viết']");
        this.subMenu = page.locator("//a[@title='Tài liệu kỹ thuật']");
        this.clientUrl = "tai-lieu-ky-thuat";
    }

    async gotoAdminMenu() {
        await test.step("Mở menu", async () => {
            await this.clickOn(this.parentMenu);
            await this.clickOn(this.subMenu);
        });
    }


    // Các hàm bọc (wrapper) để dễ đọc trong spec
    async gotoAdminTechDoc() {
        await this.gotoAdminMenu();
    }

    async addTechDoc(title: string, slug: string, desc: string, content: string, imagePath: string) {
        await this.addArticle(title, slug, desc, content, imagePath);
    }

    async verifyTechDocInAdminSuccess() {
        await this.verifyAdminSuccess();
    }

    async verifyTechDocOnWebsite(title: string) {
        await this.verifyOnWebsite(title);
    }

    async deleteTechDoc(title: string) {
        await this.deleteArticle(title);
    }

    async getClientArticleCount(): Promise<number> {
        return await this.page.getByText("Xem thêm bài viết", { exact: false }).count();
    }

    // ========== Bulk Test Methods ==========
    async copyBulkTechDocs(count: number) {
        await this.copyBulkArticles(count);
    }

    async deleteBulkTechDocs(prefix: string) {
        await this.deleteArticlesWithPrefix(prefix);
    }
}
