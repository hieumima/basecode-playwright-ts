import { test } from "../../src/fixtures/webFixture";
import { allure } from "allure-playwright";
import { customStep, SeoScorecard } from "../../src/utils/reportHelper";
import { seoTestData } from "../../data/seo/seoData";
import { SeoScanResult } from "../../src/types/SeoScanResult";
import { DEFAULT_SEO_CONFIG } from "../../src/constants/seoDefaults";
import { PageSpeedService } from "../../src/services/PageSpeedService";

test.describe("SEO Page", () => {
  test.describe.configure({ mode: "parallel" });

  test.beforeEach(async () => {
    await allure.epic("SEO");
    await allure.feature("SEO Page");
  });

  // Duyệt qua mảng dữ liệu để tạo ra các test cases tự động (Data-driven)
  seoTestData.forEach((data) => {
    test(
      `Kiểm tra SEO Onpage: ${data.name} (${data.path})`,
      {
        tag: [
          "@seo",
          `@priority:${data.priority}`,
          "@regression",
          "@smoke",
        ],
        annotation: [{ type: "severity", description: data.severity }],
      },
      async ({ page, seoPage }) => {
        await allure.story(`Phân tích SEO chuyên sâu: ${data.name}`);

        const config = { ...DEFAULT_SEO_CONFIG, ...data };

        const scorecard = new SeoScorecard();
        const pageSpeedService = new PageSpeedService();

        // ── KÍCH HOẠT API SONG SONG NGAY TỪ ĐẦU ──
        const baseUrlStr = (process.env.BASE_URL as string).replace(/\/$/, "");
        const pathStr = config.path.startsWith("/") ? config.path : `/${config.path}`;
        const fullUrl = baseUrlStr + pathStr;

        const vitalsPromise = config.checkCoreWebVitals !== false
          ? (async () => {
            const mobile = await pageSpeedService.getCoreWebVitals(fullUrl, "mobile");
            // Delay nhỏ để tránh bị Google block (Rate Limit) do gửi 2 requests cùng lúc
            await new Promise(resolve => setTimeout(resolve, 1000));
            const desktop = await pageSpeedService.getCoreWebVitals(fullUrl, "desktop");
            return { mobile, desktop };
          })()
          : Promise.resolve({ mobile: null, desktop: null });

        // ── STEP 1: Truy cập trang ──
        let navigationResponse: any;
        await customStep(page, `1. Truy cập trang: ${config.name}`, async () => {
          navigationResponse = await page.goto(fullUrl, { waitUntil: "domcontentloaded" });
        });

        // ── STEP 2: Quét toàn bộ dữ liệu SEO & Tốc độ ──
        let scan: SeoScanResult;
        let vitals: any = null;
        let localMetrics: any = null;

        await customStep(page, "2. Quét toàn bộ dữ liệu Technical SEO & Performance", async () => {
          const scanPromise = seoPage.scanSEOMetadata();
          const localMetricsPromise = seoPage.getLocalPerformanceMetrics();

          const [scanResult, vitalsResult, localMetricsResult] = await Promise.all([
            scanPromise,
            vitalsPromise,
            localMetricsPromise
          ]);

          scan = scanResult;
          vitals = vitalsResult;
          localMetrics = localMetricsResult;

          scan.vitals = vitals;
          scan.localMetrics = localMetrics;
        });

        await customStep(page, "3. Xác thực Title", async () => {
          await seoPage.verifyTitle(scan!, scorecard);
        });

        await customStep(page, "4. Xác thực Meta Description", async () => {
          await seoPage.verifyMetaDescription(scan!, scorecard);
        });

        await customStep(page, "5. Xác thực cấu trúc Heading (H1 duy nhất + phân cấp)", async () => {
          await seoPage.verifyHeadingStructure(scan!, scorecard);
        });

        await customStep(page, "6. Xác thực URL (chữ thường, gạch ngang, không ký tự đặc biệt)", async () => {
          await seoPage.verifyUrlStructure(scan!, scorecard);
        });

        await customStep(page, "7. Đảm bảo 100% hình ảnh có thẻ Alt", async () => {
          await seoPage.verifyImages(scan!, scorecard);
        });

        await customStep(page, "8. Xác thực không có broken links", async () => {
          await seoPage.verifyLinks(scan!, scorecard);
        });

        await customStep(page, "9. Xác thực Technical SEO (Canonical, Robots, Sitemap, Robots.txt)", async () => {
          await seoPage.verifyTechnicalSeo(scan!, scorecard);
        });

        await customStep(page, "10. Xác thực Tốc độ tải trang & Core Web Vitals", async () => {
          await seoPage.verifyPerformance(vitals, localMetrics, scorecard);
        });

        await customStep(page, "11. Xác thực Bảo mật (HTTPS + Mixed Content)", async () => {
          await seoPage.verifySecurity(scan!, scorecard);
        });

        await customStep(page, "12. Tổng kết điểm số SEO On-page", async () => {
          // Inject visual report VÀO TRANG WEB với dữ liệu đồng bộ từ scorecard
          await seoPage.injectVisualSEOReport(config.name, config, scorecard.stats);
          await scorecard.finalizeScore(page, config.seoPassThreshold ?? 70);
        });
      }
    );
  });
});
