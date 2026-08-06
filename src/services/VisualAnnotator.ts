import * as fs from 'fs';
import * as path from 'path';
import sharp, { OverlayOptions } from 'sharp';


export class VisualAnnotator {

    /**
     * Dùng kết quả AI để tính toán tọa độ, cắt riêng từng khúc lỗi ra và tạo ảnh so sánh 3-in-1 (snippet).
     */
    static async annotateAiDifferences(
        expectedPath: string,
        actualPath: string,
        outputDir: string,
        sectionName: string,
        issues: Array<{ description: string, web_box_2d: [number, number, number, number], figma_box_2d: [number, number, number, number] }>
    ): Promise<Array<{ description: string, outputPath: string }>> {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const safeName = sectionName.replace(/[^a-zA-Z0-9\u00C0-\u024F]/g, '_');
        const actualMeta = await sharp(actualPath).metadata();
        const figmaMeta = await sharp(expectedPath).metadata();
        const actualWidth = actualMeta.width || 1920;
        const actualHeight = actualMeta.height || 1080;
        const figmaWidth = figmaMeta.width || 1920;
        const figmaHeight = figmaMeta.height || 1080;

        const results: Array<{ description: string, outputPath: string }> = [];

        for (let i = 0; i < issues.length; i++) {
            const issue = issues[i];
            const shortDescRaw = issue.description.length > 50 ? issue.description.substring(0, 50) + '...' : issue.description;
            const shortDesc = shortDescRaw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

            // --- 1. Tạo SVG Annotate cho ảnh Web gốc (chưa crop) ---
            const [w_ymin, w_xmin, w_ymax, w_xmax] = issue.web_box_2d;
            const wx = Math.max(0, Math.round((w_xmin / 1000) * actualWidth));
            const wy = Math.max(0, Math.round((w_ymin / 1000) * actualHeight));
            const ww = Math.min(actualWidth - wx, Math.round(((w_xmax - w_xmin) / 1000) * actualWidth));
            const wh = Math.min(actualHeight - wy, Math.round(((w_ymax - w_ymin) / 1000) * actualHeight));

            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${actualWidth}" height="${actualHeight}">
                <rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="rgba(255,59,48,0.12)" stroke="#FF3B30" stroke-width="4" stroke-dasharray="8,4" rx="3" />
                <rect x="${wx}" y="${Math.max(0, wy - 24)}" width="350" height="24" fill="#FF3B30" />
                <text x="${wx + 6}" y="${Math.max(0, wy - 24) + 16}" font-size="14" fill="white" font-family="Arial" font-weight="bold">⚠ ${shortDesc}</text>
            </svg>`;

            const diffAnnFull = path.join(outputDir, `${safeName}_issue_${i}_ann_full.png`);
            await sharp(actualPath).composite([{ input: Buffer.from(svg), top: 0, left: 0 }]).png().toFile(diffAnnFull);

            // --- 2. Cắt (Crop) 3 ảnh ---
            const PADDING = 100;

            // Web Crop
            const webCropY = Math.max(0, wy - PADDING);
            const webCropH = Math.min(actualHeight - webCropY, wh + PADDING * 2);

            // Figma Crop
            const [f_ymin, , f_ymax,] = issue.figma_box_2d;
            const fy = Math.max(0, Math.round((f_ymin / 1000) * figmaHeight));
            const fh = Math.round(((f_ymax - f_ymin) / 1000) * figmaHeight);

            const figmaCropY = Math.max(0, fy - PADDING);
            const figmaCropH = Math.min(figmaHeight - figmaCropY, fh + PADDING * 2);

            const figmaCropPath = path.join(outputDir, `${safeName}_issue_${i}_figma_crop.png`);
            const webCropPath = path.join(outputDir, `${safeName}_issue_${i}_web_crop.png`);
            const annCropPath = path.join(outputDir, `${safeName}_issue_${i}_ann_crop.png`);

            await sharp(expectedPath).extract({ left: 0, top: figmaCropY, width: figmaWidth, height: figmaCropH }).toFile(figmaCropPath);
            await sharp(actualPath).extract({ left: 0, top: webCropY, width: actualWidth, height: webCropH }).toFile(webCropPath);
            await sharp(diffAnnFull).extract({ left: 0, top: webCropY, width: actualWidth, height: webCropH }).toFile(annCropPath);

            // --- 3. Ghép Side by Side ---
            const sideBySidePath = path.join(outputDir, `${safeName}_issue_${i}_comparison.png`);
            await this.createSideBySide(figmaCropPath, webCropPath, annCropPath, sideBySidePath, `Issue ${i + 1}`);

            results.push({ description: issue.description, outputPath: sideBySidePath });

            // Cleanup tạm
            if (fs.existsSync(diffAnnFull)) fs.unlinkSync(diffAnnFull);
            if (fs.existsSync(figmaCropPath)) fs.unlinkSync(figmaCropPath);
            if (fs.existsSync(webCropPath)) fs.unlinkSync(webCropPath);
            if (fs.existsSync(annCropPath)) fs.unlinkSync(annCropPath);
        }

        return results;
    }

    /**
     * Dùng kết quả AI để tính toán tọa độ, vẽ box trực tiếp lên ảnh Mobile.
     */
    static async annotateMobileIssues(
        actualPath: string,
        outputDir: string,
        sectionName: string,
        issues: Array<{ description: string, web_box_2d: [number, number, number, number] }>
    ): Promise<Array<{ description: string, outputPath: string }>> {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const safeName = sectionName.replace(/[^a-zA-Z0-9\u00C0-\u024F]/g, '_');
        const actualMeta = await sharp(actualPath).metadata();
        const actualWidth = actualMeta.width || 1920;
        const actualHeight = actualMeta.height || 1080;

        let svgContent = '';

        for (let i = 0; i < issues.length; i++) {
            const issue = issues[i];
            const shortDescRaw = issue.description.length > 50 ? issue.description.substring(0, 50) + '...' : issue.description;
            const shortDesc = shortDescRaw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

            const [w_ymin, w_xmin, w_ymax, w_xmax] = issue.web_box_2d;
            const wx = Math.max(0, Math.round((w_xmin / 1000) * actualWidth));
            const wy = Math.max(0, Math.round((w_ymin / 1000) * actualHeight));
            const ww = Math.min(actualWidth - wx, Math.round(((w_xmax - w_xmin) / 1000) * actualWidth));
            const wh = Math.min(actualHeight - wy, Math.round(((w_ymax - w_ymin) / 1000) * actualHeight));

            svgContent += `
                <rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="rgba(255,59,48,0.12)" stroke="#FF3B30" stroke-width="4" stroke-dasharray="8,4" rx="3" />
                <rect x="${wx}" y="${Math.max(0, wy - 24)}" width="350" height="24" fill="#FF3B30" />
                <text x="${wx + 6}" y="${Math.max(0, wy - 24) + 16}" font-size="14" fill="white" font-family="Arial" font-weight="bold">⚠ ${shortDesc}</text>
            `;
        }

        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${actualWidth}" height="${actualHeight}">${svgContent}</svg>`;
        const annotatedBuffer = await sharp(actualPath).composite([{ input: Buffer.from(svg), top: 0, left: 0 }]).png().toBuffer();

        const viewportHeight = 900; // Mô phỏng độ cao màn hình điện thoại
        const results: Array<{ description: string, outputPath: string }> = [];
        
        for (let i = 0; i < issues.length; i++) {
            const issue = issues[i];
            const wy = Math.max(0, Math.round((issue.web_box_2d[0] / 1000) * actualHeight));
            const wh = Math.round(((issue.web_box_2d[2] - issue.web_box_2d[0]) / 1000) * actualHeight);
            
            let webCropY = Math.max(0, wy + (wh / 2) - (viewportHeight / 2));
            if (webCropY + viewportHeight > actualHeight) {
                webCropY = Math.max(0, actualHeight - viewportHeight);
            }
            const webCropH = Math.min(actualHeight - webCropY, viewportHeight);

            const annCropPath = path.join(outputDir, `${safeName}_mobile_issue_${i}.png`);
            await sharp(annotatedBuffer)
                .extract({ left: 0, top: Math.round(webCropY), width: actualWidth, height: Math.round(webCropH) })
                .toFile(annCropPath);

            results.push({ description: issue.description, outputPath: annCropPath });
        }

        return results;
    }

    // ─────────────────────────────────────────────────
    // PRIVATE HELPERS
    // ─────────────────────────────────────────────────
    /**
     * Tạo ảnh side-by-side 3-in-1:
     * | FIGMA (Expected) | WEB Thực tế (Actual) | DIFF Annotated |
     */
    private static async createSideBySide(
        expectedPath: string,
        actualPath: string,
        diffPath: string,
        outputPath: string,
        sectionName: string
    ): Promise<void> {
        const LABEL_HEIGHT = 32;
        const PADDING = 20;
        const FONT_SIZE = 16;

        const [expMeta, actMeta, difMeta] = await Promise.all([
            sharp(expectedPath).metadata(),
            sharp(actualPath).metadata(),
            sharp(diffPath).metadata(),
        ]);

        const maxW = Math.max(expMeta.width!, actMeta.width!, difMeta.width!);
        const totalW = maxW;
        const block1H = expMeta.height! + LABEL_HEIGHT;
        const block2H = actMeta.height! + LABEL_HEIGHT;
        const block3H = difMeta.height! + LABEL_HEIGHT;
        const totalH = block1H + block2H + block3H + PADDING * 2;

        const labelSvg = (text: string, w: number, color: string) => Buffer.from(`
            <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${LABEL_HEIGHT}">
                <rect width="${w}" height="${LABEL_HEIGHT}" fill="${color}" />
                <text x="${w / 2}" y="${LABEL_HEIGHT - 10}"
                      text-anchor="middle" font-size="${FONT_SIZE}"
                      font-family="Arial" font-weight="bold" fill="white">
                    ${text}
                </text>
            </svg>
        `);

        // Canvas nền trắng
        const canvas = sharp({
            create: {
                width: totalW,
                height: totalH,
                channels: 3,
                background: { r: 245, g: 245, b: 245 }
            }
        });

        const escapedSectionName = sectionName.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const compositeInputs: OverlayOptions[] = [
            // Block 1: FIGMA
            { input: await sharp(labelSvg(`FIGMA — ${escapedSectionName}`, maxW, '#007AFF')).png().toBuffer(), top: 0, left: 0 },
            { input: expectedPath, top: LABEL_HEIGHT, left: 0 },

            // Block 2: WEB
            { input: await sharp(labelSvg('WEB Thực tế', maxW, '#34C759')).png().toBuffer(), top: block1H + PADDING, left: 0 },
            { input: actualPath, top: block1H + PADDING + LABEL_HEIGHT, left: 0 },

            // Block 3: DIFF
            { input: await sharp(labelSvg('DIFF Annotated', maxW, '#FF3B30')).png().toBuffer(), top: block1H + block2H + PADDING * 2, left: 0 },
            { input: diffPath, top: block1H + block2H + PADDING * 2 + LABEL_HEIGHT, left: 0 },
        ];

        await canvas.composite(compositeInputs).png().toFile(outputPath);
    }
}
