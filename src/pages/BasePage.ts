import { Page, Locator } from "@playwright/test";

export class BasePage {
    constructor(protected page: Page) { }

    // ===== CÁC HELPER DÙNG CHUNG CHO CHỨC NĂNG =====

    // Hàm điều hướng chung
    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url, { waitUntil: "domcontentloaded" });
    }

    // Hàm click an toàn kèm cơ chế đợi phần tử sẵn sàng hiển thị
    async clickOn(selector: string | Locator): Promise<void> {
        const element = typeof selector === "string" ? this.page.locator(selector) : selector;
        await element.waitFor({ state: "visible" });
        await element.click();
    }

    // Hàm điền dữ liệu an toàn vào các ô nhập liệu
    async typeInto(selector: string | Locator, text: string): Promise<void> {
        const element = typeof selector === "string" ? this.page.locator(selector) : selector;
        await element.waitFor({ state: "visible" });
        await element.fill(text);
    }

    // Lấy nội dung text của một phần tử giao diện
    async getElementText(selector: string | Locator): Promise<string> {
        const element = typeof selector === "string" ? this.page.locator(selector) : selector;
        await element.waitFor({ state: "visible" });
        return (await element.textContent())?.trim() || "";
    }

    // Chọn giá trị trong thẻ select (dropdown)
    async selectOption(selector: string | Locator, value: string | { value?: string, label?: string, index?: number }): Promise<void> {
        const element = typeof selector === "string" ? this.page.locator(selector) : selector;
        await element.waitFor({ state: "visible" });
        await element.selectOption(value);
    }

    // Hover chuột vào một phần tử
    async hoverOn(selector: string | Locator): Promise<void> {
        const element = typeof selector === "string" ? this.page.locator(selector) : selector;
        await element.waitFor({ state: "visible" });
        await element.hover();
    }

    // Upload file
    async uploadFile(selector: string | Locator, filePath: string | string[]): Promise<void> {
        const element = typeof selector === "string" ? this.page.locator(selector) : selector;
        await element.setInputFiles(filePath);
    }

    // Check vào checkbox hoặc radio button
    async checkElement(selector: string | Locator): Promise<void> {
        const element = typeof selector === "string" ? this.page.locator(selector) : selector;
        await element.waitFor({ state: "visible" });
        await element.check();
    }

    // Bỏ check checkbox
    async uncheckElement(selector: string | Locator): Promise<void> {
        const element = typeof selector === "string" ? this.page.locator(selector) : selector;
        await element.waitFor({ state: "visible" });
        await element.uncheck();
    }

    // ===== CÁC HELPER DÙNG CHUNG CHO SEO =====

    // Lấy nội dung thuộc tính meta tag theo name hoặc property
    async getMetaContent(nameOrProperty: string): Promise<string | null> {
        return await this.page.evaluate((attr) => {
            const meta = document.querySelector(
                `meta[name="${attr}"], meta[property="${attr}"]`
            );
            return meta ? meta.getAttribute("content") : null;
        }, nameOrProperty);
    }

    // Lấy text content của tất cả elements matching selector
    async getAllElementsText(selector: string): Promise<string[]> {
        return await this.page.locator(selector).allTextContents();
    }

    // Lấy URL hiện tại của trang
    getCurrentUrl(): string {
        return this.page.url();
    }

    // Kiểm tra HTTP status code của một URL (dùng cho robots.txt, sitemap, broken links)
    async checkUrlStatus(url: string): Promise<number> {
        try {
            // Thử bằng HEAD request trước để tiết kiệm băng thông và tăng tốc độ
            const response = await this.page.request.head(url, { timeout: 10000 });
            let status = response.status();

            // Fallback sang GET nếu HEAD trả về lỗi (nhiều server/WAF chặn HEAD request hoặc trả về 404/405)
            if (status >= 400) {
                const getResponse = await this.page.request.get(url, { timeout: 10000 });
                status = getResponse.status();
            }
            return status;
        } catch {
            try {
                // Fallback sang GET request nếu HEAD throw error (như timeout hoặc lỗi mạng)
                const response = await this.page.request.get(url, { timeout: 10000 });
                return response.status();
            } catch {
                return 0;
            }
        }
    }
}