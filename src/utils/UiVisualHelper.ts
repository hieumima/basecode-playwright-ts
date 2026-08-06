import { Page, test, expect, TestInfo } from '@playwright/test';
import { allure } from 'allure-playwright';
import * as path from 'path';
import * as fs from 'fs';
import { UiPage } from '../pages/ui/UiPage';
import { FigmaService } from '../services/FigmaService';
import { VisualAnnotator } from '../services/VisualAnnotator';
import { GeminiVision } from '../services/GeminiVision';
import { UiSectionTestData } from '../../data/ui/uiTypes';

export class UiVisualHelper {
    private static figmaService = new FigmaService();

    static async runVisualComparison(
        page: Page,
        uiPage: UiPage,
        data: UiSectionTestData,
        testInfo: TestInfo
    ) {
        const FILE_KEY = process.env.UI_TEST_FIGMA_FILE_KEY || '';
        const BASE_URL = (process.env.BASE_URL || '').replace(/\/$/, '');

        // ── Kiểm tra cấu hình ──
        if (!FILE_KEY || !BASE_URL) {
            test.skip(!FILE_KEY, 'Thiếu UI_TEST_FIGMA_FILE_KEY trong .env');
            test.skip(!BASE_URL, 'Thiếu BASE_URL trong .env');
            return;
        }

        // ── Skip nếu không match được Figma frame ──
        if (!data.figmaNodeId) {
            test.skip(true, `Không tìm được Figma frame cho "${data.sectionName}" (matchScore: ${data.matchScore}). Hãy thêm vào uiManualConfig.ts`);
            return;
        }

        const fullUrl = `${BASE_URL}${data.path}`;

        // Thư mục lưu ảnh diff cho test này
        const diffDir = path.join(testInfo.outputDir, 'visual-diff');

        // ── Step 1: Tải ảnh Figma và Xử lý ──
        const safeNodeId = data.figmaNodeId!.replace(/[^a-z0-9]/gi, '_');
        const downloadedFigmaImagePath = path.join(testInfo.project.outputDir, `${safeNodeId}_figma.png`);
        const finalFigmaImagePath = path.join(diffDir, `${data.sectionName.replace(/[^a-z0-9]/gi, '_')}_figma_expected.png`);

        await test.step('1. Tải ảnh thiết kế từ Figma', async () => {
            // Tải từ Figma (có cơ chế cache và mutex trong FigmaService)
            await this.figmaService.downloadSnapshot(FILE_KEY, data.figmaNodeId!, downloadedFigmaImagePath);

            if (!fs.existsSync(diffDir)) fs.mkdirSync(diffDir, { recursive: true });

            fs.copyFileSync(downloadedFigmaImagePath, finalFigmaImagePath);

            await allure.attachment('Figma Expected', fs.readFileSync(finalFigmaImagePath), 'image/png');
        });

        // ── Step 2: Chụp ảnh web ──
        const actualImagePath = path.join(diffDir, `${data.sectionName.replace(/[^a-z0-9]/gi, '_')}_actual.png`);
        await test.step(`2. Chụp ảnh section "${data.sectionName}" trên web`, async () => {
            const locator = await uiPage.gotoSection(fullUrl, data.selector);
            await uiPage.hideDynamicElements();
            await uiPage.prepareForScreenshot();

            const isVisible = await locator.isVisible({ timeout: 10000 }).catch(() => false);
            if (!isVisible) {
                throw new Error(`Không tìm thấy element "${data.selector}" trên trang ${fullUrl}`);
            }

            await page.screenshot({
                path: actualImagePath,
                fullPage: true,
                animations: 'disabled'
            });
            await allure.attachment('Web Actual', fs.readFileSync(actualImagePath), 'image/png');
        });

        // ── Step 3: So sánh + Annotate ──
        let aiResult: { pass: boolean, reason: string, issues?: Array<{ description: string, web_box_2d: [number, number, number, number], figma_box_2d: [number, number, number, number] }> };
        await test.step('3. Phân tích ngữ cảnh với Gemini AI', async () => {
            const gemini = new GeminiVision();
            aiResult = await gemini.compareImages(finalFigmaImagePath, actualImagePath);
            await allure.parameter('AI Pass', String(aiResult.pass));
            await allure.attachment('AI Reason', Buffer.from(aiResult.reason, 'utf-8'), 'text/plain');

            if (!aiResult.pass && aiResult.issues && aiResult.issues.length > 0) {
                const snippetResults = await VisualAnnotator.annotateAiDifferences(
                    finalFigmaImagePath,
                    actualImagePath,
                    diffDir,
                    data.sectionName,
                    aiResult.issues
                );

                let idx = 1;
                for (const snippet of snippetResults) {
                    await allure.attachment(`Lỗi ${idx}: ${snippet.description.substring(0, 30)}...`, fs.readFileSync(snippet.outputPath), 'image/png');
                    idx++;
                }
                aiResult.reason += `\nĐã đính kèm ${snippetResults.length} ảnh chi tiết lỗi vào báo cáo.`;
            }
        });

        await test.step('4. Kiểm tra kết quả AI', async () => {
            expect(aiResult!.pass, `AI báo lỗi: ${aiResult!.reason}`).toBe(true);
        });
    }
}
