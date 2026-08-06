import { Page, Locator, test } from "@playwright/test";
import { ArticleBasePage } from "./ArticleBasePage";

export class ProductPage extends ArticleBasePage {
    readonly parentMenu: Locator;
    readonly subMenu: Locator;

    constructor(page: Page) {
        super(page);

        // Cấu hình riêng cho mục Sản phẩm
        this.parentMenu = page.locator("(//a[@title='Sản phẩm'])[1]");
        this.subMenu = page.locator("//a[@href='product?act=man&type=san-pham']");
        this.clientUrl = "san-pham";
    }

    async gotoAdminMenu() {
        await test.step("Mở menu", async () => {
            await this.clickOn(this.parentMenu);
            await this.clickOn(this.subMenu);
        });
    }

    async gotoAdminProduct() {
        await this.gotoAdminMenu();
    }

    async addNewProduct(
        title: string,
        slug: string,
        code: string,
        regularPrice: string,
        salePrice: string,
        discount: string,
        descHtml: string,
        contentHtml: string,
        thongsoHtml: string,
        imagePath: string,
        galleryPaths?: string[]
    ) {
        await this.addProduct(title, slug, code, regularPrice, salePrice, discount, descHtml, contentHtml, thongsoHtml, imagePath, galleryPaths);
    }

    // Ghi đè phương thức addArticle của ArticleBasePage để dùng cho bulk test (TestHelper gọi hàm này)
    async addArticle(title: string, slug: string, desc: string, content: string, imagePath: string) {
        await this.addProduct(
            title, 
            slug, 
            `SP-AUTO-${Date.now()}`, 
            "100000", 
            "90000", 
            "10", 
            desc, // descHtml
            content, // contentHtml
            "", // thongsoHtml
            imagePath
        );
    }

    async verifyProductInAdminSuccess() {
        await this.verifyAdminSuccess();
    }

    async verifyProductOnWebsite(title: string) {
        await this.verifyOnWebsite(title);
    }

    async deleteProduct(title: string) {
        await this.deleteArticle(title);
    }

    async getClientArticleCount(): Promise<number> {
        return await this.page.locator(".box-product").count();
    }

    // ========== Bulk Test Methods ==========
    async copyBulkProduct(count: number) {
        await this.copyBulkArticles(count);
    }

    async deleteBulkProduct(prefix: string) {
        await this.deleteArticlesWithPrefix(prefix);
    }
}
