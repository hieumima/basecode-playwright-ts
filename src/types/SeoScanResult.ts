export interface SeoScanResult {
  titleVal: string;
  metaVal: string | null;
  h1Texts: string[];
  allHeadings: { tag: string; text: string }[];
  headingHierarchy: { valid: boolean; issues: string[] };
  currentUrl: string;
  urlPath: string;
  images: {
    src: string;
    alt: string | null;
  }[];
  missingAltCount: number;
  internalLinks: { href: string; text: string }[];
  externalLinks: { href: string; text: string; rel: string | null }[];
  canonical: string | null;
  robots: string | null;
  isHttps: boolean;
  mixedContent: string[];
  vitals?: any;
  localMetrics?: any;
}

export default SeoScanResult;
