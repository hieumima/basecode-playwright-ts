import { Page, Locator, test } from "@playwright/test";
import { ArticleBasePage } from "./ArticleBasePage";
import { TestHelper } from "../../utils/TestHelper";

export class ProjectPage extends ArticleBasePage {
    protected parentMenu: Locator;
    protected subMenu: Locator;

    constructor(page: Page) {
        super(page);

        this.clientUrl = "du-an";

        // Cấu hình riêng cho mục Dự án
        this.parentMenu = page.locator("//a[@title='Quản lý bài viết']");
        this.subMenu = page.locator("//a[@title='Dự án']");
    }

    async gotoAdminMenu() {
        await test.step("Mở menu", async () => {
            await this.clickOn(this.parentMenu);
            await this.clickOn(this.subMenu);
        });
    }

    // Các hàm bọc (wrapper) để dễ đọc trong spec
    async gotoAdminProject() {
        await this.gotoAdminMenu();
    }

    async addProject(title: string, slug: string, desc: string, content: string, imagePath: string) {
        await this.addArticle(title, slug, desc, content, imagePath);
    }

    async verifyProjectInAdminSuccess() {
        await this.verifyAdminSuccess();
    }

    async verifyProjectOnWebsite(title: string) {
        await this.verifyOnWebsite(title);
    }

    async getClientArticleCount(): Promise<number> {
        return await this.page.getByText("Xem thêm bài viết", { exact: false }).count();
    }

    async deleteProject(title: string) {
        await this.deleteArticle(title);
    }

    // ========== Bulk Test Methods ==========
    async copyBulkProjects(count: number) {
        await this.copyBulkArticles(count);
    }

    async deleteBulkProjects(prefix: string) {
        await this.deleteArticlesWithPrefix(prefix);
    }
}
