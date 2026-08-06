import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { uiTestData } from '../../data/ui/uiGeneratedData';
import { UiPage } from '../../src/pages/ui/UiPage';
import { UiMobileHelper } from '../../src/utils/UiMobileHelper';

if (uiTestData.length > 0) {
    test.describe("Mobile UI Tests", () => {

        let uiPage: UiPage;

        test.beforeEach(async ({ page }) => {
            uiPage = new UiPage(page);
            await allure.epic('UI');
            await allure.feature("UI Mobile Tests");
        });

        uiTestData.forEach((section) => {
            if (section.selector === 'body' || section.sectionName === 'Toàn bộ trang') {
                const pageTag = '@ui-' + section.page.toLowerCase()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '-');
                const testTags = [
                    '@priority:high',
                    '@smoke',
                    '@regression',
                    '@uimobile',
                    pageTag
                ];

                test(
                    `[${section.page}] [${section.sectionName}] Đánh giá trên Mobile`,
                    { tag: testTags },
                    async ({ page }, testInfo) => {
                        test.setTimeout(600000);
                        await allure.feature(section.page);
                        await allure.story(section.sectionName);

                        await UiMobileHelper.runMobileHeuristic(page, uiPage, section, testInfo);
                    }
                );
            }
        });
    });
} else {
    test('Chưa có data cho Mobile UI Tests', () => {
        console.warn('Chạy: npm run generate-ui để sinh data');
    });
}
