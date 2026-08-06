import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import { SeoPageTestData } from "../../../data/seo/seoData";
import { injectVisualSEOReport } from "../../utils/SeoReportHelper";
import { SeoScorecard } from "../../utils/reportHelper";
import { SeoScanResult } from "../../types/SeoScanResult";
import { DomExtractor } from "./extractors/DomExtractor";
import { SeoScanner } from "./scanners/SeoScanner";

export class SeoPage extends BasePage {
  async scanSEOMetadata(): Promise<SeoScanResult> {
    const domExtractor = new DomExtractor(this.page);
    const seoScanner = new SeoScanner(this.page, domExtractor);
    return seoScanner.scanSEOMetadata();
  }

  // ==================== VISUAL REPORT ====================
  async injectVisualSEOReport(pageName: string, config: SeoPageTestData, scorecardStats: { total: number; passed: number; failed: number; score: number; failures: { group: string; step: string; message: string }[] }) {
    await injectVisualSEOReport(this.page, pageName, config, scorecardStats);
  }

  // ==================== VERIFY METHODS ====================

  /** Xác thực thẻ Title */
  async verifyTitle(scan: SeoScanResult, sc: SeoScorecard) {
    sc.startGroup("TITLE");
    const { titleVal } = scan;

    await sc.check(
      `Title phải có nội dung (hiện tại: ${titleVal.length} ký tự)`,
      !!titleVal && titleVal.length > 0,
      "Title tag không tồn tại hoặc rỗng!"
    );
  }

  /** Xác thực Meta Description */
  async verifyMetaDescription(scan: SeoScanResult, sc: SeoScorecard) {
    sc.startGroup("META DESCRIPTION");
    const { metaVal } = scan;

    await sc.check(
      `Meta description tồn tại (${metaVal ? metaVal.length + " ký tự" : "Không tìm thấy"})`,
      metaVal !== null && metaVal.length > 0,
      "Thẻ <meta name=\"description\"> không tồn tại hoặc rỗng!"
    );
  }

  /** Xác thực cấu trúc Heading */
  async verifyHeadingStructure(scan: SeoScanResult, sc: SeoScorecard) {
    sc.startGroup("HEADING STRUCTURE");
    const { h1Texts, headingHierarchy } = scan;

    await sc.check(
      `Trang có đúng 1 thẻ H1 (hiện tại: ${h1Texts.length} thẻ)`,
      h1Texts.length === 1,
      h1Texts.length === 0
        ? "Trang không có thẻ H1 nào!"
        : `Trang có ${h1Texts.length} thẻ H1, bắt buộc đúng 1 thẻ duy nhất!`
    );

    await sc.check(
      `Heading phân cấp hợp lệ (${headingHierarchy.issues.length} lỗi)`,
      headingHierarchy.valid,
      `Heading phân cấp sai: ${headingHierarchy.issues.join("; ")}`
    );
  }

  /** Xác thực cấu trúc URL */
  async verifyUrlStructure(scan: SeoScanResult, sc: SeoScorecard) {
    sc.startGroup("URL STRUCTURE");
    let { urlPath } = scan;

    // Loại bỏ phần base path của BASE_URL để chỉ kiểm tra slug thực tế
    const baseUrlStr = process.env.BASE_URL as string || "";
    if (baseUrlStr) {
      try {
        const basePath = new URL(baseUrlStr).pathname;
        if (basePath.length > 1 && urlPath.startsWith(basePath)) {
          urlPath = '/' + urlPath.slice(basePath.length);
        } else if (basePath.length > 1 && urlPath === basePath.slice(0, -1)) {
          urlPath = '/';
        }
      } catch (e) {}
    }

    await sc.check(
      `4.3 — URL không chứa dấu gạch dưới`,
      !urlPath.includes("_"),
      `URL chứa dấu gạch dưới: ${urlPath}`
    );

    await sc.check(
      `4.4 — URL toàn chữ thường`,
      urlPath === urlPath.toLowerCase(),
      `URL chứa chữ hoa: ${urlPath}`
    );

    const hasSpecialChars = /[^a-z0-9\-\/\.]/i.test(urlPath.split("?")[0]);
    const hasTrackingParams = /[?&](utm_|fbclid|gclid|ref=)/.test(urlPath);
    await sc.check(
      `URL không chứa ký tự đặc biệt hoặc tham số tracking thừa`,
      !hasSpecialChars && !hasTrackingParams,
      `URL "${urlPath}" ${hasSpecialChars ? "chứa ký tự đặc biệt" : ""} ${hasTrackingParams ? "chứa tracking param" : ""}`
    );
  }

  /** Xác thực hình ảnh */
  async verifyImages(scan: SeoScanResult, sc: SeoScorecard) {
    sc.startGroup("IMAGES");
    const { images, missingAltCount } = scan;

    await sc.check(
      `100% ảnh có thuộc tính alt (thiếu: ${missingAltCount}/${images.length})`,
      missingAltCount === 0,
      `Có ${missingAltCount} hình ảnh thiếu thuộc tính 'alt'. VD: ${images.filter((img) => !img.alt).slice(0, 3).map((img) => img.src).join(", ")}`
    );
  }

  /** Xác thực liên kết */
  async verifyLinks(scan: SeoScanResult, sc: SeoScorecard) {
    sc.startGroup("LINKS");
    const { internalLinks, externalLinks } = scan;

    const brokenLinks: string[] = [];
    const isCheckable = (href: string) => href && !href.startsWith("#") && !href.startsWith("javascript:") && !href.startsWith("mailto:") && !href.startsWith("tel:");

    // Dùng page.evaluate để lấy URL đã được trình duyệt resolve chính xác (giống hệt khi user click vào link)
    const resolvedLinks = await this.page.evaluate((links: { href: string }[]) => {
      return links.map(l => {
        try {
          const a = document.createElement('a');
          a.href = l.href;
          return a.href; // Trình duyệt tự resolve chính xác URL
        } catch {
          return '';
        }
      });
    }, [...internalLinks, ...externalLinks].filter(l => isCheckable(l.href)));

    const rawHrefs = [...internalLinks, ...externalLinks]
      .filter(l => isCheckable(l.href))
      .map(l => l.href);

    // Map: resolvedUrl -> rawHref (để báo lỗi dùng tên gốc cho dễ đọc)
    const urlMap = new Map<string, string>();
    for (let i = 0; i < resolvedLinks.length; i++) {
      if (resolvedLinks[i] && !urlMap.has(resolvedLinks[i])) {
        urlMap.set(resolvedLinks[i], rawHrefs[i]);
      }
    }

    const uniqueUrls = Array.from(urlMap.keys()).slice(0, 100);
    const CHUNK_SIZE = 20;
    const BROWSER_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

    for (let i = 0; i < uniqueUrls.length; i += CHUNK_SIZE) {
      const chunk = uniqueUrls.slice(i, i + CHUNK_SIZE);

      await Promise.all(
        chunk.map(async (resolvedUrl) => {
          const rawHref = urlMap.get(resolvedUrl) || resolvedUrl;

          try {
            let status = 0;
            try {
              const resp = await fetch(resolvedUrl, {
                method: "HEAD",
                headers: { "User-Agent": BROWSER_UA },
                redirect: "follow",
                signal: AbortSignal.timeout(5000),
              });
              status = resp.status;
            } catch {
              status = 0;
            }

            if (status === 0 || status >= 400) {
              try {
                const resp = await fetch(resolvedUrl, {
                  method: "GET",
                  headers: { "User-Agent": BROWSER_UA },
                  redirect: "follow",
                  signal: AbortSignal.timeout(8000),
                });
                status = resp.status;
              } catch {
              }
            }

            if (status >= 400 || status === 0) {
              const altUrl = resolvedUrl.endsWith("/")
                ? resolvedUrl.slice(0, -1)
                : resolvedUrl + "/";
              try {
                const altResp = await fetch(altUrl, {
                  method: "GET",
                  headers: { "User-Agent": BROWSER_UA },
                  redirect: "follow",
                  signal: AbortSignal.timeout(8000),
                });
                if (altResp.status >= 200 && altResp.status < 400) {
                  status = altResp.status;
                }
              } catch {
              }

              // Nếu Node.js fetch vẫn báo lỗi, xác minh lần cuối bằng chính trình duyệt
              // (có đầy đủ cookies, session, JS redirect) để tránh bắt oan
              if (status >= 400 || status === 0) {
                try {
                  const browserStatus = await this.page.evaluate(async (url: string) => {
                    try {
                      const resp = await fetch(url, { method: "GET", redirect: "follow" });
                      return resp.status;
                    } catch {
                      return 0;
                    }
                  }, resolvedUrl);

                  if (browserStatus >= 200 && browserStatus < 400) {
                    status = browserStatus; // Trình duyệt xác nhận link OK → bỏ qua
                  }
                } catch {
                }
              }

              if (status >= 400 || status === 0) {
                brokenLinks.push(`${rawHref} (status: ${status})`);
              }
            }
          } catch (e) {
            brokenLinks.push(`${rawHref} (error)`);
          }
        })
      );
    }

    await sc.check(
      `Không có broken links (lỗi: ${brokenLinks.length}/${uniqueUrls.length})`,
      brokenLinks.length === 0,
      `Broken links: ${brokenLinks.join(", ")}`
    );
  }

  /** Xác thực Technical SEO */
  async verifyTechnicalSeo(scan: SeoScanResult, sc: SeoScorecard) {
    sc.startGroup("TECHNICAL SEO");

    const isCanonicalOk = !!scan.canonical && /^https?:\/\//.test(scan.canonical);
    await sc.check(
      `Canonical URL hợp lệ (${scan.canonical || "Không có"})`,
      isCanonicalOk,
      scan.canonical === null
        ? "Thiếu thẻ <link rel=\"canonical\">. Nguy cơ trùng lặp!"
        : `URL Canonical không hợp lệ: "${scan.canonical}"`
    );

    const isNoindex = !!scan.robots?.toLowerCase().includes("noindex");
    await sc.check(
      `Robots: ${scan.robots || "Mặc định Index"} (mong muốn: INDEX)`,
      !isNoindex,
      "Trang mong muốn INDEX nhưng đang bị gắn 'noindex'!"
    );

    // Dùng BASE_URL thay vì origin để tìm robots.txt và sitemap.xml
    // Vì trên môi trường staging, chúng nằm trong thư mục con (ví dụ: /2026/july/tranquang_108426W/)
    const baseUrl = (process.env.BASE_URL as string || new URL(scan.currentUrl).origin).replace(/\/$/, '');
    const [robotsTxtStatus, sitemapStatus] = await Promise.all([
      this.checkUrlStatus(`${baseUrl}/robots.txt`),
      this.checkUrlStatus(`${baseUrl}/sitemap.xml`)
    ]);

    await sc.check(
      `robots.txt trả về status ${robotsTxtStatus}`,
      robotsTxtStatus === 200,
      `robots.txt trả về status ${robotsTxtStatus}, cần 200`
    );

    await sc.check(
      `sitemap.xml trả về status ${sitemapStatus}`,
      sitemapStatus === 200,
      `sitemap.xml trả về status ${sitemapStatus}, cần 200`
    );
  }

  /** Lấy dữ liệu tốc độ cục bộ (Local Performance) từ Playwright */
  async getLocalPerformanceMetrics() {
    try {
      const localMetrics = await this.page.evaluate(() => {
        return new Promise((resolve) => {
          let lcp: number | null = null;
          let cls = 0;
          let lcpElementStr: string | null = null;
          let clsElementsArr: string[] = [];

          try {
            new PerformanceObserver((entryList) => {
              const entries = entryList.getEntries();
              const lastEntry = entries[entries.length - 1] as any;
              lcp = lastEntry.startTime;
              if (lastEntry.element) {
                const html = lastEntry.element.outerHTML || "";
                lcpElementStr = html.length > 200 ? html.substring(0, 200) + '...' : html;
              } else if (lastEntry.url) {
                lcpElementStr = `Image: ${lastEntry.url}`;
              }
            }).observe({ type: 'largest-contentful-paint', buffered: true });
          } catch (e) { }

          try {
            new PerformanceObserver((entryList) => {
              for (const entry of entryList.getEntries() as any[]) {
                if (!entry.hadRecentInput) {
                  cls += entry.value;
                  if (entry.sources && entry.sources.length > 0) {
                    entry.sources.forEach((source: any) => {
                      if (source.node) {
                        const html = source.node.outerHTML || "";
                        const snippet = html.length > 150 ? html.substring(0, 150) + '...' : html;
                        if (snippet && snippet.trim() !== "" && !clsElementsArr.includes(snippet)) {
                          clsElementsArr.push(snippet.trim());
                        }
                      }
                    });
                  }
                }
              }
            }).observe({ type: 'layout-shift', buffered: true });
          } catch (e) { }

          // Đợi 1 giây để thu thập dữ liệu Paint
          setTimeout(() => {
            const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
            const loadTime = navEntry ? navEntry.loadEventEnd - navEntry.startTime : null;

            if (lcp === null && navEntry) {
              lcp = navEntry.domContentLoadedEventEnd - navEntry.startTime;
            }

            resolve({
              lcp: lcp ? Math.round(lcp) : null,
              cls: Number(cls.toFixed(3)),
              loadTime: loadTime ? Math.round(loadTime) : null,
              lcpElement: lcpElementStr,
              clsElements: clsElementsArr
            });
          }, 1000);
        });
      });
      return localMetrics;
    } catch (e) {
      return null;
    }
  }

  /** Xác thực Core Web Vitals (Tốc độ tải trang) */
  async verifyPerformance(vitals: any, localMetrics: any, sc: SeoScorecard) {
    sc.startGroup("PERFORMANCE");

    const hasMobile = !!vitals?.mobile;
    const hasDesktop = !!vitals?.desktop;

    if (!hasMobile && !hasDesktop) {
      await sc.check(
        `Google PageSpeed API`,
        false,
        "❌ CẢNH BÁO: Không lấy được dữ liệu PageSpeed API (null cho cả mobile lẫn desktop)."
      );
    } else {
      await sc.check(`Google PageSpeed API`, true, "Lấy dữ liệu thành công");
    }

    // ── Trích xuất width/height/src thật từ HTML để tính con số cụ thể ──
    const extractImgInfo = (html: string | null) => {
      if (!html) return null;
      const width = html.match(/width=["'](\d+)["']/)?.[1];
      const height = html.match(/height=["'](\d+)["']/)?.[1];
      const src = html.match(/(?:data-)?src=["']([^"']+)["']/)?.[1];
      return {
        width: width ? parseInt(width) : null,
        height: height ? parseInt(height) : null,
        src: src ?? null,
      };
    };

    const buildLcpSuggestion = (lcpElement: string | null, pageUrl: string): string => {
      const isImage = lcpElement?.toLowerCase().includes('<img') ?? false;

      if (!isImage) {
        return `\n[Vấn đề]: Phần tử LCP là dạng văn bản (Text/Heading), thời gian hiển thị phụ thuộc chủ yếu vào tốc độ máy chủ và việc tải Web Font.` +
          `\n[Thông số hiện tại]: Phần tử LCP: ${lcpElement || 'Không rõ'}` +
          `\n[Chỉ thị hành động]: Tối ưu TTFB của máy chủ xuống dưới 0.3s và ưu tiên tải trước Web Font đang sử dụng.` +
          `\n[Code thay thế]:\n<!-- Đặt trong <head> -->\n<link rel="preload" href="/path/to/your-font.woff2" as="font" type="font/woff2" crossorigin>\n\n// Đo TTFB:\ncurl -o /dev/null -s -w "TTFB: %{time_starttransfer}s\\n" ${pageUrl}`;
      }

      const img = extractImgInfo(lcpElement);

      if (img?.width && img?.height) {
        const retinaW = img.width * 2;
        const retinaH = img.height * 2;
        const pixelCount = img.width * img.height;
        const estMaxKB = Math.round((pixelCount / 10000) * 1.8);

        return `\n[Vấn đề]: Tải ảnh LCP chậm do chưa được tối ưu kích thước, định dạng và chưa được ưu tiên tải sớm.` +
          `\n[Thông số hiện tại]: Kích thước hiển thị thực tế: ${img.width}x${img.height}px.` +
          `\n[Chỉ thị hành động]: Nén ảnh gốc về kích thước tối đa ${retinaW}x${retinaH}px (2x cho Retina), định dạng .webp, dung lượng dưới ${estMaxKB}KB. Đặt width, height, aspect-ratio và preload ảnh này.` +
          `\n[Code thay thế]:\n<!-- Đặt thẻ preload trong <head> -->\n<link rel="preload" as="image" href="${img.src ?? '[URL_ẢNH]'}" fetchpriority="high">\n\n<!-- Sửa thẻ <img> thành: -->\n<img src="${img.src ?? '[URL_ẢNH]'}" width="${img.width}" height="${img.height}" style="aspect-ratio: ${img.width} / ${img.height}; width: 100%; height: auto; object-fit: cover;" alt="LCP Image">\n\n// Lệnh nén ảnh bằng cwebp:\ncwebp -q 78 -resize ${retinaW} ${retinaH} input.png -o output.webp`;
      }

      return `\n[Vấn đề]: Phần tử LCP là ảnh nhưng không có thuộc tính width/height trong HTML.` +
        `\n[Thông số hiện tại]: Kích thước không xác định từ HTML thô.` +
        `\n[Chỉ thị hành động]: Dùng DevTools (Computed tab) đo kích thước hiển thị thực tế. Resize ảnh gốc bằng 2x kích thước hiển thị (định dạng .webp, quality 75-80), khai báo kích thước cứng vào HTML và thêm thẻ preload.` +
        `\n[Code thay thế]:\n<!-- Đặt thẻ preload trong <head> -->\n<link rel="preload" as="image" href="[URL_ẢNH]" fetchpriority="high">\n\n<!-- Sửa thẻ <img> (thay X, Y bằng số đo thực tế): -->\n<img src="[URL_ẢNH]" width="X" height="Y" style="aspect-ratio: X / Y; width: 100%; height: auto; object-fit: cover;" alt="LCP Image">`;
    };

    const buildClsSuggestion = (clsElements: string[]): string => {
      if (!clsElements?.length) {
        return `\n[Vấn đề]: Xảy ra Cumulative Layout Shift (nhảy giao diện) nhưng không nhận diện được phần tử cụ thể từ báo cáo.` +
          `\n[Thông số hiện tại]: Không có dữ liệu phần tử CLS.` +
          `\n[Chỉ thị hành động]: Ghi lại Performance profile trong Chrome DevTools, xác định Layout Shift (màu đỏ). Thêm width/height hoặc aspect-ratio cố định cho phần tử gây nhảy.` +
          `\n[Code thay thế]:\n/* CSS giữ chỗ cho khối nội dung động (thay số 16 / 9 bằng tỷ lệ thực tế) */\n.layout-shift-element {\n  aspect-ratio: 16 / 9;\n  width: 100%;\n  overflow: hidden;\n}`;
      }

      const imgInElement = clsElements.find(el => el.toLowerCase().includes('<img'));
      const img = imgInElement ? extractImgInfo(imgInElement) : null;

      if (img?.width && img?.height) {
        const ratio = (img.width / img.height).toFixed(3);
        return `\n[Vấn đề]: Thiếu khoảng trống giữ chỗ trước khi load ảnh gây nhảy nội dung (CLS).` +
          `\n[Thông số hiện tại]: Phần tử gây dịch chuyển: ${clsElements.slice(0, 3).join(' | ')}. Kích thước ảnh: ${img.width}x${img.height}px.` +
          `\n[Chỉ thị hành động]: Bổ sung ngay width, height cứng vào HTML và aspect-ratio vào CSS cho ảnh này để trình duyệt vẽ sẵn khoảng trống trước khi ảnh tải xong.` +
          `\n[Code thay thế]:\n<!-- HTML: -->\n<img src="${img.src ?? '[URL_ẢNH]'}" width="${img.width}" height="${img.height}" alt="Image">\n\n/* CSS: */\nimg.cls-element {\n  aspect-ratio: ${img.width} / ${img.height}; /* Tỷ lệ ${ratio} */\n  width: 100%;\n  height: auto;\n  object-fit: cover;\n}`;
      }

      return `\n[Vấn đề]: Các phần tử (không phải ảnh có sẵn width/height rõ ràng) thay đổi kích thước đột ngột trong lúc tải trang.` +
        `\n[Thông số hiện tại]: Phần tử gây nhảy: ${clsElements.slice(0, 3).join(' | ')}.` +
        `\n[Chỉ thị hành động]: Nếu là font chữ, dùng size-adjust. Nếu là ảnh/iframe, bắt buộc khai báo width/height hoặc CSS aspect-ratio. Đối với ảnh lazy-load, phải có kích thước giữ chỗ.` +
        `\n[Code thay thế]:\n/* Giải pháp 1: Giữ chỗ bằng aspect-ratio */\n.cls-element {\n  aspect-ratio: 4 / 3; /* Điền tỷ lệ đo được */\n  width: 100%;\n}\n\n/* Giải pháp 2: Sửa nhảy font bằng size-adjust */\n@font-face {\n  font-family: 'Fallback Font';\n  src: local('Arial');\n  size-adjust: 90%; /* Điều chỉnh để khớp font chính */\n}`;
    };

    const INP_SUGGESTION =
      `\n[Vấn đề]: Tương tác của người dùng (click, phím) bị kẹt do Main Thread đang bận chạy tác vụ JS nặng (Long Task > 50ms).` +
      `\n[Thông số hiện tại]: Độ trễ phản hồi INP hiện tại vượt quá ngưỡng an toàn (200ms).` +
      `\n[Chỉ thị hành động]: Xác định file JS gây nghẽn trong DevTools Performance. Đẩy các script bên thứ ba sang defer. Chẻ nhỏ tác vụ nặng bằng setTimeout hoặc requestIdleCallback để giải phóng Main Thread.` +
      `\n[Code thay thế]:\n<!-- 1. Trì hoãn script bên thứ 3 (Ads, Analytics, Chat): -->\n<script defer src="https://third-party.com/script.js"></script>\n\n// 2. Chẻ nhỏ tác vụ JS nặng:\nfunction yieldToMain() {\n  return new Promise(resolve => {\n    setTimeout(resolve, 0);\n  });\n}\n\nasync function processLargeArray(items) {\n  for (let i = 0; i < items.length; i++) {\n    doHeavyWork(items[i]);\n    // Nhường Main Thread mỗi 50 phần tử để nhận click của user\n    if (i % 50 === 0) await yieldToMain();\n  }\n}`;

    const checkMetrics = async (platform: string, v: any, fallbackMetrics: any = null) => {
      const finalLcp = v?.lcp ?? fallbackMetrics?.lcp ?? null;
      const finalCls = v?.cls ?? fallbackMetrics?.cls ?? null;
      const finalInp = v?.inp ?? fallbackMetrics?.inp ?? null;
      const pageUrl = (this as any).page?.url?.() ?? '[URL trang]';

      // ── LCP ──────────────────────────────────────────
      if (finalLcp === null) {
        await sc.check(
          `[${platform}] LCP (Largest Contentful Paint) — KHÔNG CÓ DỮ LIỆU`,
          false,
          `[${platform}] Không lấy được LCP từ API lẫn Local.`
        );
      } else {
        const lcpElement = v?.insights?.lcpElement ?? fallbackMetrics?.lcpElement ?? null;
        const lcpHint = lcpElement
          ? `\n      → Thủ phạm LCP: ${lcpElement}`
          : `\n      → (Không xác định được phần tử LCP)`;

        await sc.check(
          `[${platform}] LCP (Largest Contentful Paint): ${finalLcp}ms (< 2500ms)`,
          finalLcp < 2500,
          `[${platform}] LCP quá cao: ${finalLcp}ms (chuẩn: < 2.5s)${lcpHint}\n${buildLcpSuggestion(lcpElement, pageUrl)}`
        );
      }

      // ── INP ──────────────────────────────────────────
      if (finalInp === null) {
        await sc.check(`[${platform}] INP (Interaction to Next Paint) — Bỏ qua (chưa có tương tác)`, true, "");
      } else {
        await sc.check(
          `[${platform}] INP (Interaction to Next Paint): ${finalInp}ms (< 200ms)`,
          finalInp < 200,
          `[${platform}] INP quá cao: ${finalInp}ms (chuẩn: < 200ms)\n${INP_SUGGESTION}`
        );
      }

      // ── CLS ──────────────────────────────────────────
      if (finalCls === null) {
        await sc.check(
          `[${platform}] CLS (Cumulative Layout Shift) — KHÔNG CÓ DỮ LIỆU`,
          false,
          `[${platform}] Không lấy được CLS từ API lẫn Local.`
        );
      } else {
        const clsElements = v?.insights?.clsElements ?? fallbackMetrics?.clsElements ?? [];
        const clsHint = clsElements.length
          ? `\n      → Thủ phạm CLS:\n          - ${clsElements.join('\n          - ')}`
          : `\n      → (Không xác định được phần tử dịch chuyển)`;
        await sc.check(
          `[${platform}] CLS (Cumulative Layout Shift): ${finalCls} (< 0.1)`,
          finalCls < 0.1,
          `[${platform}] CLS quá cao: ${finalCls} (chuẩn: < 0.1)${clsHint}\n${buildClsSuggestion(clsElements)}`
        );
      }
    };

    const fallbackMobile = localMetrics?.mobile ?? localMetrics;
    const fallbackDesktop = localMetrics?.desktop ?? localMetrics;

    await checkMetrics('📱 MOBILE (ƯU TIÊN)', vitals?.mobile, fallbackMobile);
    await checkMetrics('💻 Desktop', vitals?.desktop, fallbackDesktop);
  }


  /** Xác thực Bảo mật */
  async verifySecurity(scan: SeoScanResult, sc: SeoScorecard) {
    sc.startGroup("SECURITY");
    // HTTPS
    await sc.check(
      `HTTPS: ${scan.isHttps ? "Đã bật" : "Chưa bật"}`,
      scan.isHttps,
      `Trang đang dùng HTTP: ${scan.currentUrl}`
    );

    // Mixed Content
    await sc.check(
      `Mixed Content: ${scan.mixedContent.length} tài nguyên HTTP`,
      scan.mixedContent.length === 0,
      `Phát hiện ${scan.mixedContent.length} tài nguyên HTTP trên HTTPS: ${scan.mixedContent.slice(0, 5).join(", ")}`
    );
  }
}
