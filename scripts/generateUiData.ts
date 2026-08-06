import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import {
    ScannedFigmaFramesFile,
    FigmaFrame,
    UiSectionTestData
} from '../data/ui/uiTypes';

const environment = process.env.ENV || 'qa';
dotenv.config({ path: path.resolve(__dirname, `../config/.env.${environment}`) });
dotenv.config();

const FIGMA_TOKEN = process.env.UI_TEST_FIGMA_TOKEN || '';
const FIGMA_FILE_KEY = process.env.UI_TEST_FIGMA_FILE_KEY || '';

function normalize(str: string): string {
    return str.toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9 ]/g, ' ')
        .replace(/\s+/g, ' ').trim();
}

function similarityScore(a: string, b: string): number {
    const wordsA = new Set(normalize(a).split(' ').filter(Boolean));
    const wordsB = new Set(normalize(b).split(' ').filter(Boolean));
    if (wordsA.size === 0 || wordsB.size === 0) return 0;
    let commonCount = 0;
    for (const word of wordsA) if (wordsB.has(word)) commonCount++;
    return commonCount / new Set([...wordsA, ...wordsB]).size;
}

// ──────────────────────────────────────────
// BƯỚC 1: Lấy các Top Level Frames từ Figma
// ──────────────────────────────────────────
import { FigmaService } from '../src/services/FigmaService';

async function fetchTopLevelFigmaFrames(fileKey: string, token: string): Promise<FigmaFrame[]> {
    const figmaService = new FigmaService();
    // FigmaService uses UI_TEST_FIGMA_TOKEN from env automatically
    return await figmaService.fetchAllFrames(fileKey);
}

// removed obsolete functions

function generateTs(testData: UiSectionTestData[]): string {
    return `// ============================================================
// TẬP TIN NÀY ĐƯỢC TẠO TỰ ĐỘNG BỞI scripts/generateUiData.ts
// KHÔNG sửa trực tiếp — hãy chạy lại script để cập nhật
// ============================================================

import { UiSectionTestData } from './uiTypes';

export const uiTestData: UiSectionTestData[] = ${JSON.stringify(testData, null, 2)};
`;
}

// ──────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────
async function run() {
    console.log('Bắt đầu sinh UI Test Data (Auto-Crop Ratio Mode)...\n');
    if (!FIGMA_TOKEN || !FIGMA_FILE_KEY) {
        console.error(' Thiếu UI_TEST_FIGMA_TOKEN hoặc UI_TEST_FIGMA_FILE_KEY trong .env');
        process.exit(1);
    }

    const BASE_URL = (process.env.BASE_URL || '').replace(/\/$/, '');
    if (!BASE_URL) {
        console.error(' Thiếu BASE_URL trong .env');
        process.exit(1);
    }

    const allFrames = await fetchTopLevelFigmaFrames(FIGMA_FILE_KEY, FIGMA_TOKEN);
    fs.writeFileSync(
        path.resolve(__dirname, '../data/templates/scanned-figma-frames.json'),
        JSON.stringify({ timestamp: new Date().toISOString(), fileKey: FIGMA_FILE_KEY, frames: allFrames }, null, 2),
        'utf-8'
    );

    const topFrames = allFrames.filter(f => ['FRAME', 'SECTION'].includes(f.type || '') && f.name === f.topLevelFrame);
    const testData: UiSectionTestData[] = [];

    // --- SITEMAP AUTO-DISCOVERY ---
    console.log(` Đang tải sitemap từ: ${BASE_URL}/sitemap.xml...`);
    const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`).catch(() => null);
    let urls: string[] = [];
    if (sitemapRes && sitemapRes.ok) {
        const sitemapText = await sitemapRes.text();
        const matches = sitemapText.match(/<loc>(.*?)<\/loc>/g);
        if (matches) {
            urls = matches.map(u => u.replace(/<\/?loc>/g, ''));
        }
    }

    if (urls.length === 0) {
        console.error(' Không thể lấy sitemap hoặc sitemap trống!');
        process.exit(1);
    }

    // Tự động tìm các URL cho các trang cần test
    const homeUrl = urls.find(u => u === BASE_URL || u === `${BASE_URL}/`);
    const aboutUrl = urls.find(u => u.includes('/gioi-thieu'));
    const productUrl = urls.find(u => u.includes('/san-pham'));
    // Lấy đại 1 URL sản phẩm chi tiết (ví dụ có chứa đuôi cap, hoặc một sản phẩm cụ thể, ở đây chọn loa-bmb-cse-312-se-cap)
    const detailUrl = urls.find(u => u.includes('/loa-bmb-cse-312-se-cap')) || urls.find(u => u !== productUrl && u.includes('-cap'));

    const getRelativePath = (u?: string) => {
        if (!u) return '';
        const rel = u.replace(BASE_URL, '');
        return rel.startsWith('/') ? rel : '/' + rel;
    };

    const pagesToTest = [
        { name: 'Trang chủ', path: getRelativePath(homeUrl), figmaFrameName: 'trangchu' },
        { name: 'Giới thiệu', path: getRelativePath(aboutUrl), figmaFrameName: 'gioithieu' },
        { name: 'Sản phẩm', path: getRelativePath(productUrl), figmaFrameName: 'sanpham' },
        { name: 'Chi tiết sản phẩm', path: getRelativePath(detailUrl), figmaFrameName: 'chitiet' }
    ].filter(p => p.path && p.path !== '/undefined'); // Bỏ qua nếu không tìm thấy path

    for (const page of pagesToTest) {
        console.log(`\n Xử lý trang: ${page.name} (${page.path})`);

        let bestFrame = topFrames.find(f => similarityScore(page.figmaFrameName, f.name) > 0.5);
        if (!bestFrame) {
            console.warn(` Không tìm thấy Top-Level Frame nào cho trang ${page.name} (Tên dự kiến: ${page.figmaFrameName}). Bỏ qua!`);
            continue;
        }


        testData.push({
            page: page.name,
            path: page.path,
            sectionName: 'Toàn bộ trang',
            selector: 'body',
            figmaNodeId: bestFrame.id.replace(':', '-'),
            figmaFrameName: bestFrame.name,
            matchScore: 1.0
        });
    }

    const outputTsPath = path.resolve(__dirname, '../data/ui/uiGeneratedData.ts');
    if (!fs.existsSync(path.dirname(outputTsPath))) fs.mkdirSync(path.dirname(outputTsPath), { recursive: true });
    fs.writeFileSync(outputTsPath, generateTs(testData), 'utf-8');
    console.log(`\n Hoàn tất! Đã lưu: ${outputTsPath}`);
}

run().catch(err => {
    console.error('Lỗi:', err);
    process.exit(1);
});

