import { test as baseTest, expect } from "@playwright/test";
import { SeoPage } from "../pages/seo/SeoPage";

type WebFixtures = {
    seoPage: SeoPage;
};

export const test = baseTest.extend<WebFixtures>({
    seoPage: async ({ page }, use) => {
        await use(new SeoPage(page));
    },

    page: async ({ page }, use) => {
        // LỚP KHIÊN 1: Chặn tải các tài nguyên không mong muốn tại tầng Network
        await page.route("**/*", (route) => {
            const url = route.request().url();
            const blockedResources = [
                "googleads",
                "googlesyndication",
                "doubleclick",
                "adservice",
                "vignette",
                "adsbygoogle",
                "analytics", // Chặn thêm các đoạn mã theo dõi để tăng tốc độ tải trang
            ];

            if (blockedResources.some((keyword) => url.includes(keyword))) {
                route.abort();
            } else {
                route.continue();
            }
        });

        // LỚP KHIÊN 2: Tiêm CSS ẩn các vùng chứa quảng cáo lỗi tại tầng DOM
        await page.addInitScript(() => {
            const style = document.createElement("style");
            style.innerHTML = `
        iframe[name^="aswift"], 
        iframe[id^="ad_"], 
        .adsbygoogle, 
        div[id^="google_vignette"],
        #ad-container { 
            display: none !important; 
            width: 0 !important; 
            height: 0 !important; 
        }
      `;
            document.documentElement.appendChild(style);
        });

        await use(page);
    },
});

export { expect };
