import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import { seoManualConfig } from '../data/seo/seoManualConfig';
import { SeoPageTestData } from '../data/seo/seoData';


// Load environment variables
dotenv.config();

const BASE_URL = process.env.BASE_URL;

async function fetchSitemapUrls(sitemapUrl: string, maxLimit?: number): Promise<string[]> {
  try {
    const response = await fetch(sitemapUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
      }
    });
    if (!response.ok) {
      console.warn(`Sitemap not found at ${sitemapUrl} (${response.status})`);
      return [];
    }
    const xml = await response.text();
    const $ = cheerio.load(xml, { xmlMode: true });

    const isSitemapIndex = $('sitemapindex').length > 0;

    if (isSitemapIndex) {
      console.log(`Found sitemap index at ${sitemapUrl}. Fetching sub-sitemaps...`);
      const sitemapPromises: Promise<string[]>[] = [];
      $('sitemap > loc, sitemap loc').each((_, el) => {
        const subSitemapUrl = $(el).text().trim();
        if (subSitemapUrl) {
          let limit = undefined;
          if (subSitemapUrl.includes('sitemap_product')) limit = 5;
          else if (subSitemapUrl.includes('sitemap_blog')) limit = 5;
          sitemapPromises.push(fetchSitemapUrls(subSitemapUrl, limit));
        }
      });

      const results = await Promise.all(sitemapPromises);
      return results.flat();
    } else {
      const urls: string[] = [];
      $('url > loc, loc').each((_, el) => {
        const url = $(el).text().trim();
        // Bỏ qua các URL sitemap nếu vô tình lọt vào
        if (url && !url.endsWith('.xml')) {
          urls.push(url);
        }
      });
      // Lọc các kết quả trùng lặp nếu query selector lấy dư
      let uniqueUrls = Array.from(new Set(urls));
      if (maxLimit && uniqueUrls.length > maxLimit) {
        // Shuffle array
        uniqueUrls = uniqueUrls.sort(() => 0.5 - Math.random());
        uniqueUrls = uniqueUrls.slice(0, maxLimit);
      }
      return uniqueUrls;
    }
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    return [];
  }
}

async function extractPageName(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      console.warn(`Failed to fetch ${url} - Status: ${response.status}`);
      return '';
    }
    const html = await response.text();

    if (html.includes('Just a moment...') || html.includes('cf-browser-verification')) {
      console.warn(`[WARNING] Request to ${url} was blocked by Cloudflare/WAF!`);
      return '';
    }

    const $ = cheerio.load(html);
    let name = $('title').text().trim() || $('h1').first().text().trim() || url;
    if (name.includes('|')) name = name.split('|')[0].trim();
    if (name.includes('-')) name = name.split('-')[0].trim();

    return name;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return '';
  }
}

async function run() {
  console.log('Starting SEO data generation...');

  if (!BASE_URL) {
    console.error('ERROR: BASE_URL is not defined in environment variables.');
    process.exit(1);
  }

  const sitemapUrl = BASE_URL.endsWith('/') ? BASE_URL + 'sitemap.xml' : BASE_URL + '/sitemap.xml';
  console.log(`Fetching sitemap from: ${sitemapUrl}`);

  const sitemapUrls = await fetchSitemapUrls(sitemapUrl);
  console.log(`Found ${sitemapUrls.length} URLs in sitemap.`);

  const finalData: SeoPageTestData[] = [];

  const processedPaths = new Set<string>();

  for (const fullUrl of sitemapUrls) {
    const urlObj = new URL(fullUrl);
    const baseUrlObj = new URL(BASE_URL as string);
    const basePath = baseUrlObj.pathname; // e.g. "/2026/july/tranquang_108426W/"
    
    let relativePath = urlObj.pathname;
    
    if (relativePath.startsWith(basePath)) {
      // Strip basePath but ensure it still starts with '/'
      relativePath = '/' + relativePath.slice(basePath.length);
    } else if (relativePath === basePath.slice(0, -1) && basePath.length > 1) {
      relativePath = '/';
    }

    processedPaths.add(relativePath);

    // Find manual config
    const manualEntry = seoManualConfig.find(item => item.path === relativePath);

    // Fetch meta data if not overridden by manual config
    let name = manualEntry?.name;

    if (!name) {
      console.log(`Fetching metadata for ${fullUrl}...`);
      name = await extractPageName(fullUrl);
    }

    // Default configuration for auto-generated items
    const baseEntry: SeoPageTestData = {
      name: name!,
      path: relativePath,
      priority: "medium",
      severity: "normal",
      checkCoreWebVitals: true
    };

    // Merge manual overrides over the defaults
    finalData.push({
      ...baseEntry,
      ...manualEntry
    });
  }

  // Add any manual entries that were NOT in the sitemap
  for (const manualEntry of seoManualConfig) {
    if (!processedPaths.has(manualEntry.path)) {
      console.log(`Adding manual entry not found in sitemap: ${manualEntry.path}`);
      const baseEntry: SeoPageTestData = {
        name: manualEntry.name || manualEntry.path,
        path: manualEntry.path,
        priority: "medium",
        severity: "normal"
      };
      finalData.push({ ...baseEntry, ...manualEntry });
    }
  }

  // Generate the TypeScript file content
  const fileContent = `// TẬP TIN NÀY ĐƯỢC TẠO TỰ ĐỘNG BỞI scripts/generateSeoData.ts
// Không nên sửa trực tiếp file này. Hãy sửa data/seo/seoManualConfig.ts

import { SeoPageTestData } from "./seoData";

export const seoTestData: SeoPageTestData[] = ${JSON.stringify(finalData, null, 2)};
`;

  const outputPath = path.join(__dirname, '../data/seo/seoGeneratedData.ts');
  fs.writeFileSync(outputPath, fileContent, 'utf-8');
  console.log(`SEO data generated successfully with ${finalData.length} items.`);
  console.log(`Output written to ${outputPath}`);
}

run().catch(console.error);
