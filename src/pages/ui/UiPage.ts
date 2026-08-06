import { Page, test } from '@playwright/test';
import { BasePage } from '../BasePage';

export class UiPage extends BasePage {

    constructor(page: Page) {
        super(page);

    }

    /**
     * Navigate to the target web URL for UI testing
     * @param url The URL to navigate to
     */
    async gotoTargetUrl(url: string) {
        await test.step(`Điều hướng tới URL: ${url}`, async () => {
            // Dùng domcontentloaded hoặc load thay vì networkidle (networkidle rất dễ bị timeout nếu web có tracking scripts)
            await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
            // Đợi thêm một chút để đảm bảo giao diện render
            await this.page.waitForTimeout(3000);
        });
    }

    /**
     * Điều hướng đến URL và cuộn đến section cụ thể để chụp ảnh
     * @param url URL đầy đủ của trang
     * @param selector CSS selector của section cần chụp
     */
    async gotoSection(url: string, selector: string) {
        return await test.step(`Cuộn đến section: ${selector}`, async () => {
            await this.gotoTargetUrl(url);
            const locator = this.page.locator(selector).first();
            const isVisible = await locator.isVisible({ timeout: 10000 }).catch(() => false);
            if (isVisible) {
                await locator.scrollIntoViewIfNeeded();
                await this.page.waitForTimeout(500); // Để animation settle
            }
            return locator;
        });
    }

    /**
     * Hide specific elements that might cause visual flakiness
     * like dynamic ads, changing text (dates), or animated elements
     */
    async hideDynamicElements() {
        await test.step(`Ẩn các phần tử động để chụp ảnh ổn định`, async () => {
            // Ẩn tất cả các phần tử fixed/sticky (thanh menu dưới, nút gọi, zalo floating...)
            // Vì khi chụp fullPage, chúng sẽ hiển thị lơ lửng giữa ảnh hoặc dưới đáy, gây nhiễu AI.
            await this.page.evaluate(() => {
                const allElements = document.querySelectorAll('*');
                allElements.forEach(el => {
                    const style = window.getComputedStyle(el);
                    if (style.position === 'fixed' || style.position === 'sticky') {
                        (el as HTMLElement).style.display = 'none';
                    }
                });
            });
        });
    }

    /**
     * Prepare the page for screenshot
     * Scrolls through the page to ensure lazy-loaded images are loaded
     */
    async prepareForScreenshot() {
        await test.step(`Chuẩn bị trang web (ẩn hiệu ứng, lazy-load) trước khi chụp ảnh`, async () => {
            // Chuẩn hóa font chữ để tránh sai lệch pixel do OS render khác nhau
            await this.page.addStyleTag({ 
                content: `
                    * {
                        font-family: Arial, sans-serif !important;
                        letter-spacing: normal !important;
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                    /* Ép hiển thị các phần tử bị ẩn bởi thư viện AOS hoặc wow.js */
                    [data-aos], .wow, .lazy, .lazyload, .lazyloaded, [class*="fade"] {
                        opacity: 1 !important;
                        transform: none !important;
                        visibility: visible !important;
                    }
                    img {
                        content-visibility: visible !important;
                    }
                    caret-color: transparent !important;
                ` 
            });

            // Cuộn bằng wheel chuột giả lập thực tế để kích hoạt các lazy-load library bắt sự kiện wheel/scroll
            const viewportHeight = await this.page.evaluate(() => window.innerHeight);
            let scrolled = 0;
            const maxScroll = 20000; // Bảo vệ vòng lặp vô hạn
            
            while (scrolled < maxScroll) {
                const step = viewportHeight / 1.5;
                await this.page.evaluate((s) => window.scrollBy(0, s), step);
                scrolled += step;
                await this.page.waitForTimeout(300); // Đợi 0.3s mỗi lần cuộn
                
                // Check nếu đã tới đáy trang
                const isBottom = await this.page.evaluate(() => {
                    return (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
                });
                if (isBottom) break;
            }

            await this.page.waitForTimeout(2000);

            // Scroll back to top
            await this.page.evaluate(() => window.scrollTo(0, 0));

            // Wait a bit for animations to settle
            await this.page.waitForTimeout(1000);
        });
    }
}
