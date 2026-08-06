import { Page, Locator } from "@playwright/test";
import { BasePage } from "../BasePage";

export class HomePage extends BasePage {
    readonly searchInput: Locator;
    readonly searchResultDropdown: Locator;
    readonly searchButton: Locator;
    
    constructor(page: Page) {
        super(page);
        // Hỗ trợ quét tìm ô search với nhiều kịch bản (Smart Locator cho multi-tenant)
        this.searchInput = page.locator("input#keyword")
            .or(page.locator("input[name='keyword']"))
            .or(page.locator("input[type='search']"))
            .or(page.locator("input[name='q']"))
            .or(page.locator("input[name='search']"))
            .or(page.locator("input[placeholder*='tìm kiếm' i]"))
            .or(page.locator("input[placeholder*='search' i]"))
            .or(page.locator("input[placeholder*='Tên sản phẩm' i]"));
        this.searchResultDropdown = page.locator("//div[@id='search-result']");
        // Nút tìm kiếm của web mới (Hỗ trợ button, submit, hoặc label giả button)
        this.searchButton = page.locator("button[title='Tìm kiếm'], .search button, form button[type='submit'], label[for='keyword'], label[onclick*='onSearch']").first();
    }

    /**
     * Mở trang chủ
     */
    async gotoHomePage() {
        const baseUrl = process.env.BASE_URL?.endsWith('/') ? process.env.BASE_URL : process.env.BASE_URL + '/';
        await this.page.goto(baseUrl); 
        await this.page.waitForLoadState("domcontentloaded");
    }

    /**
     * Lấy động một từ khóa (tên sản phẩm) từ trang chủ bằng cách dùng page.evaluate.
     * Cách này chạy trực tiếp trên browser, tìm thấy 1 sản phẩm hợp lệ là dừng ngay (O(1)),
     * giúp tối ưu hiệu năng cực tốt thay vì quét hàng ngàn sản phẩm.
     */
    async getDynamicKeywordFromHome(): Promise<string> {
        const keyword = await this.page.evaluate(() => {
            // 1. Ưu tiên tìm theo các class/tag phổ biến của tên sản phẩm
            const commonProductSelectors = [
                '.product-name', '.product-title', '.title-product', 
                'h3.title', '.item-title', 'h3 > a', 'h2 > a'
            ];
            
            for (const selector of commonProductSelectors) {
                const element = document.querySelector(selector);
                if (element && element.textContent) {
                    const text = element.textContent.trim();
                    if (text.length > 5) return text;
                }
            }

            // 2. Nếu không tìm thấy bằng class chuẩn, fallback sang việc duyệt thẻ <a> 
            // nhưng dừng lại ngay khi tìm thấy 1 text hợp lý (để không tốn thời gian)
            const links = Array.from(document.querySelectorAll('a'));
            const ignoreWords = [
                'trang chủ', 'giới thiệu', 'liên hệ', 'tin tức', 
                'đăng nhập', 'đăng ký', 'giỏ hàng', 'xem thêm', 
                'chi tiết', 'danh mục', 'sản phẩm', 'khuyến mãi'
            ];
            
            for (const link of links) {
                const text = link.textContent?.trim() || "";
                const textLower = text.toLowerCase();
                
                // Tiêu chí: Text độ dài vừa phải và không phải là các menu hệ thống
                if (text.length > 10 && text.length < 80) {
                    const isSystemLink = ignoreWords.some(ignore => textLower.includes(ignore));
                    if (!isSystemLink) {
                        return text; // Dừng ngay lập tức khi tìm thấy 1 cái
                    }
                }
            }
            return "";
        });

        if (!keyword) {
            throw new Error("Không thể trích xuất được từ khóa sản phẩm nào từ trang hiện tại!");
        }

        return keyword;
    }

    /**
     * Nhập từ khóa vào ô tìm kiếm
     */
    async searchKeyword(keyword: string) {
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.fill(keyword);
        // Có thể cần delay 1 chút hoặc gõ từng phím để trigger sự kiện hiện dropdown (AJAX search)
        await this.searchInput.pressSequentially(' ', { delay: 100 }); 
        // Bấm phím backspace để xóa dấu cách vừa nhập
        await this.page.keyboard.press('Backspace');
    }

    /**
     * Chờ dropdown search xuất hiện
     */
    async waitForDropdown() {
        await this.searchResultDropdown.waitFor({ state: 'visible', timeout: 5000 });
    }

    /**
     * Lấy danh sách các phần tử chứa kết quả sản phẩm trong dropdown
     * (Hỗ trợ thẻ a, li, hoặc các div có class thông dụng)
     */
    getResultItems(): Locator {
        return this.searchResultDropdown.locator("a, li, .search-item, .result-item, .autocomplete-suggestion, .item");
    }

    /**
     * Lấy danh sách các thẻ sản phẩm hiển thị trên trang kết quả.
     * Dùng một list các class CSS phổ biến nhất trong giới thiết kế web.
     * Cực kỳ hiệu quả cho bài toán multi-tenant.
     */
    getProductElementsOnPage(): Locator {
        return this.page.locator('.product-item, .item-product, .product-card, .col-product, article.product, .product-block, .product-grid-item, .item-box, .product, .name-product');
    }
}
