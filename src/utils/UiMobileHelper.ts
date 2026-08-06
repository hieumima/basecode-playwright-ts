import { Page, test, expect, TestInfo } from '@playwright/test';
import { allure } from 'allure-playwright';
import * as path from 'path';
import * as fs from 'fs';
import { UiPage } from '../pages/ui/UiPage';
import { VisualAnnotator } from '../services/VisualAnnotator';
import { GeminiVision } from '../services/GeminiVision';
import { UiSectionTestData } from '../../data/ui/uiTypes';

export class UiMobileHelper {
    static async runMobileHeuristic(
        page: Page,
        uiPage: UiPage,
        data: UiSectionTestData,
        testInfo: TestInfo
    ) {
        const BASE_URL = (process.env.BASE_URL || '').replace(/\/$/, '');

        if (!BASE_URL) {
            test.skip(true, 'Thiếu BASE_URL trong .env');
            return;
        }

        const fullUrl = `${BASE_URL}${data.path}`;
        const diffDir = path.join(testInfo.outputDir, 'mobile-issues');

        const actualImagePath = path.join(diffDir, `${data.sectionName.replace(/[^a-z0-9]/gi, '_')}_mobile.png`);
        if (!fs.existsSync(diffDir)) fs.mkdirSync(diffDir, { recursive: true });

        await test.step(`1. Chụp ảnh màn hình thiết bị Mobile cho "${data.sectionName}"`, async () => {
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
            await allure.attachment('Mobile Screenshot', fs.readFileSync(actualImagePath), 'image/png');
        });

        let aiResult: { pass: boolean, reason: string, issues?: Array<{ description: string, anchor_text?: string, web_box_2d: [number, number, number, number] }> };
        await test.step('2. AI Đánh giá UX/UI', async () => {
            const gemini = new GeminiVision();
            aiResult = await gemini.evaluateMobileUI(actualImagePath);
            await allure.parameter('AI Pass', String(aiResult.pass));
            await allure.attachment('AI Reason', Buffer.from(aiResult.reason, 'utf-8'), 'text/plain');

            if (!aiResult.pass && aiResult.issues && aiResult.issues.length > 0) {
                // Tinh chỉnh độ chuẩn xác của tọa độ bằng Playwright
                const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
                const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);

                for (const issue of aiResult.issues) {
                    if (issue.anchor_text) {
                        try {
                            const el = page.getByText(issue.anchor_text).first();
                            if (await el.isVisible({ timeout: 1000 })) {
                                const box = await el.boundingBox();
                                if (box) {
                                    const padding = 20;
                                    const ymin = Math.max(0, box.y - padding);
                                    const xmin = Math.max(0, box.x - padding);
                                    const ymax = Math.min(pageHeight, box.y + box.height + padding);
                                    const xmax = Math.min(pageWidth, box.x + box.width + padding);
                                    
                                    issue.web_box_2d = [
                                        (ymin / pageHeight) * 1000,
                                        (xmin / pageWidth) * 1000,
                                        (ymax / pageHeight) * 1000,
                                        (xmax / pageWidth) * 1000
                                    ];
                                }
                            }
                        } catch (e) {
                            // Fallback dùng tọa độ của AI nếu không tìm thấy text
                        }
                    }
                }

                const snippetResults = await VisualAnnotator.annotateMobileIssues(
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

        await test.step('3. Kiểm tra kết quả', async () => {
            expect(aiResult!.pass, `AI báo lỗi: ${aiResult!.reason}`).toBe(true);
        });
    }
}
