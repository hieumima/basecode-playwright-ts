import { Page } from "@playwright/test";
import SeoScanResult from "../../../types/SeoScanResult";
import { DomExtractor } from "../extractors/DomExtractor";

export class SeoScanner {
  constructor(private page: Page, private extractor: DomExtractor) { }

  async scanSEOMetadata(): Promise<SeoScanResult> {
    const currentUrl = this.page.url();
    const urlObj = new URL(currentUrl);
    const urlPath = urlObj.pathname + urlObj.search;
    const isHttps = this.extractor.isHttps();

    const [
      titleVal,
      metaVal,
      h1Texts,
      allHeadings,
      images,
      internalLinks,
      externalLinks,
      canonical,
      robots,
      mixedContent,
    ] = await Promise.all([
      this.extractor.getTitle(),
      this.extractor.getMetaDescription(),
      this.extractor.getH1Elements(),
      this.extractor.getAllHeadings(),
      this.extractor.getImages(),
      this.extractor.getInternalLinks(),
      this.extractor.getExternalLinks(),
      this.extractor.getCanonicalUrl(),
      this.extractor.getRobotsContent(),
      this.extractor.getMixedContent(),
    ]);

    const hierarchyIssues: string[] = [];
    let lastLevel = 0;
    for (const heading of allHeadings) {
      const level = parseInt(heading.tag.replace("h", ""));
      if (lastLevel > 0 && level > lastLevel + 1) {
        hierarchyIssues.push(`Nhảy cấp từ H${lastLevel} → H${level} ("${heading.text}")`);
      }
      lastLevel = level;
    }
    const headingHierarchy = { valid: hierarchyIssues.length === 0, issues: hierarchyIssues };

    const missingAltCount = images.filter((img) => img.alt === null || img.alt.trim() === "").length;

    return {
      titleVal, metaVal, h1Texts, allHeadings, headingHierarchy,
      currentUrl, urlPath,
      images, missingAltCount,
      internalLinks, externalLinks,
      canonical, robots,
      isHttps, mixedContent,
    };
  }
}

