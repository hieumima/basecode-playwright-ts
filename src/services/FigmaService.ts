import * as fs from 'fs';
import * as path from 'path';
import { FigmaFrame } from '../../data/ui/uiTypes';

export class FigmaService {
    private token: string;

    constructor() {
        this.token = process.env.UI_TEST_FIGMA_TOKEN || '';
        if (!this.token) {
            console.error('[FigmaService] UI_TEST_FIGMA_TOKEN is missing! process.env keys: ' + Object.keys(process.env).join(', '));
        }
    }

    /**
     * Download the image from Figma API and save it to the specified path
     * @param fileKey The Figma file key from URL
     * @param rawNodeId The node ID (can be 1-2 or 1:2)
     * @param savePath The path to save the PNG image
     */
    public async downloadSnapshot(fileKey: string, rawNodeId: string, savePath: string): Promise<boolean> {
        if (!this.token) {
            throw new Error('Cannot download from Figma: Token is missing');
        }

        if (!fileKey || !rawNodeId) {
            throw new Error('Figma fileKey or nodeId is missing');
        }

        const fs = require('fs');
        const lockFile = savePath + '.lock';
        
        // Ensure directory exists
        const dir = path.dirname(savePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Caching mechanism with lockfile for parallel test workers
        let lockAcquired = false;
        while (!lockAcquired) {
            try {
                // Atomic check-and-create
                const fd = fs.openSync(lockFile, 'wx');
                fs.writeSync(fd, 'locked');
                fs.closeSync(fd);
                lockAcquired = true;
            } catch (e: any) {
                if (e.code === 'EEXIST') {
                    console.log(`[FigmaService] Another process is downloading to ${savePath}. Waiting...`);
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Non-blocking sleep
                } else {
                    throw e;
                }
            }
        }

        if (fs.existsSync(savePath) && fs.statSync(savePath).size > 1000) {
            console.log(`[FigmaService] Snapshot already cached at: ${savePath}`);
            fs.unlinkSync(lockFile);
            return true;
        }

        // Figma API often uses ':' instead of '-' for node_id
        const nodeId = rawNodeId.replace('-', ':');

        try {
            // Step 1: Get the image URL from Figma API
            const apiUrl = `https://api.figma.com/v1/images/${fileKey}?ids=${nodeId}&format=png`;
            console.log('Downloading image from:', apiUrl);
            const response = await fetch(apiUrl, {
                headers: {
                    'X-Figma-Token': this.token
                }
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Figma API error: ${response.status} ${response.statusText} - ${text}`);
            }

            const data = await response.json();
            const imageUrl = data.images[nodeId];

            if (!imageUrl) {
                throw new Error(`Image not found for node ID ${nodeId} in Figma response`);
            }

            console.log('Downloading file using native https stream...');
            const https = require('https');
            
            await new Promise((resolve, reject) => {
                https.get(imageUrl, (res: any) => {
                    if (res.statusCode !== 200) {
                        reject(new Error(`Failed to fetch image: ${res.statusCode}`));
                        return;
                    }
                    const stream = fs.createWriteStream(savePath);
                    res.pipe(stream);
                    stream.on('finish', () => {
                        stream.close();
                        resolve(true);
                    });
                    stream.on('error', (err: any) => {
                        fs.unlinkSync(savePath);
                        reject(err);
                    });
                }).on('error', reject).setTimeout(60000, function(this: any) {
                    this.abort();
                    reject(new Error("Download timeout after 60s"));
                });
            });

            console.log(`Successfully downloaded Figma snapshot to: ${savePath}`);
            return true;

        } catch (error) {
            console.error('Error downloading from Figma:', error);
            throw error;
        } finally {
            if (fs.existsSync(lockFile)) fs.unlinkSync(lockFile);
        }
    }

    /**
     * Lấy toàn bộ danh sách FRAME nodes từ tất cả pages trong file Figma.
     * Dùng API: GET /v1/files/:key
     * Không cần biết nodeId trước — tự quét toàn bộ cây document.
     * @param fileKey Figma file key (từ URL)
     * @returns Danh sách FigmaFrame với id, name, page
     */
    public async fetchAllFrames(fileKey: string): Promise<FigmaFrame[]> {
        if (!this.token) {
            throw new Error('Cannot fetch Figma frames: Token is missing');
        }
        if (!fileKey) {
            throw new Error('Figma fileKey is missing');
        }

        const apiUrl = `https://api.figma.com/v1/files/${fileKey}`;
        console.log(`Fetching Figma file structure from: ${apiUrl}`);

        const response = await fetch(apiUrl, {
            headers: { 'X-Figma-Token': this.token }
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Figma API error: ${response.status} ${response.statusText} - ${text}`);
        }

        const data = await response.json();
        const frames: FigmaFrame[] = [];

        // Duyệt qua tất cả pages (CANVAS nodes) trong document
        const pages = data?.document?.children ?? [];

        // Chỉ lấy các Frame / Section nằm ngay dưới cùng của mỗi Page (Top Level Frames)
        for (const page of pages) {
            if (page.type !== 'CANVAS' || !page.children) continue;

            for (const node of page.children) {
                if (['FRAME', 'SECTION', 'COMPONENT', 'GROUP', 'INSTANCE'].includes(node.type)) {
                    const bbox = node.absoluteBoundingBox;
                    if (bbox) {
                        frames.push({
                            id: node.id,
                            name: node.name,
                            page: page.name,
                            y: Math.round(bbox.y),
                            height: Math.round(bbox.height),
                            topLevelFrame: node.name,
                            type: node.type
                        });
                    }
                }
            }
        }

        console.log(`✅ Figma: Tìm thấy ${frames.length} frames trên ${pages.length} pages.`);
        return frames;
    }

    /**
     * Tải ảnh PNG của một node từ Figma về buffer (không lưu file)
     * Dùng nội bộ trong VisualAnnotator để so sánh pixel
     */
    public async fetchImageBuffer(fileKey: string, rawNodeId: string): Promise<Buffer> {
        if (!this.token) throw new Error('Token is missing');

        const nodeId = rawNodeId.replace('-', ':');
        const apiUrl = `https://api.figma.com/v1/images/${fileKey}?ids=${nodeId}&format=png&scale=1`;

        const response = await fetch(apiUrl, {
            headers: { 'X-Figma-Token': this.token }
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Figma API error: ${response.status} - ${text}`);
        }

        const data = await response.json();
        const imageUrl = data.images[nodeId];
        if (!imageUrl) throw new Error(`Image URL not found for node ${nodeId}`);

        const imageResponse = await fetch(imageUrl);
        if (!imageResponse.ok) throw new Error(`Failed to download image from ${imageUrl}`);

        const arrayBuffer = await imageResponse.arrayBuffer();
        return Buffer.from(arrayBuffer);
    }
}
