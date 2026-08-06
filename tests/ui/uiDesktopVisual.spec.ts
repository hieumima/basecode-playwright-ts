import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { uiTestData } from '../../data/ui/uiGeneratedData';
import { UiPage } from '../../src/pages/ui/UiPage';
import { UiVisualHelper } from '../../src/utils/UiVisualHelper';

if (uiTestData.length > 0) {
    test.describe("Desktop UI Visual Tests", () => {
        let uiPage: UiPage;

        test.beforeEach(async ({ page }) => {
            uiPage = new UiPage(page);
            await allure.epic('UI');
            await allure.feature('UI Desktop Visual Tests')
        });

        uiTestData.forEach((section) => {
            const pageTag = '@ui-' + section.page.toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '-');
            const testTags = [
                '@priority:high',
                '@smoke',
                '@regression',
                '@uidesktop',
                pageTag
            ];

            test(
                `[${section.page}] [${section.sectionName}] So sánh Figma ↔ Web`,
                { tag: testTags },
                async ({ page }, testInfo) => {
                    test.setTimeout(600000); // Tăng timeout lên 10 phút vì Figma S3 tải ảnh rất chậm ở một số mạng
                    await allure.feature(section.page);
                    await allure.story(section.sectionName);

                    await UiVisualHelper.runVisualComparison(page, uiPage, section, testInfo);
                }
            );
        });
    });
} else {
    test('Chưa có data cho UI Desktop Visual Tests', () => {
        console.warn('Chạy: npm run generate-ui để sinh data');
    });
}
