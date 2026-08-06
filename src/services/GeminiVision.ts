import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import sharp from 'sharp';

export class GeminiVision {
    private ai: GoogleGenAI;

    constructor() {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("Thiếu biến môi trường GEMINI_API_KEY");
        }
        this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }

    private async fileToGenerativePart(filePath: string, mimeType: string) {
        console.log(`[GeminiVision] Processing file with sharp: ${filePath}`);
        if (!fs.existsSync(filePath)) {
            console.log(`[GeminiVision] File does not exist! ${filePath}`);
        } else {
            console.log(`[GeminiVision] File size: ${fs.statSync(filePath).size} bytes`);
        }

        try {
            const compressedBuffer = await sharp(filePath)
                .resize({ width: 1280, withoutEnlargement: true }) // Giới hạn chiều rộng
                .jpeg({ quality: 70 }) // Đổi sang JPEG cho nhẹ
                .toBuffer();
            console.log(`[GeminiVision] Successfully compressed ${filePath}`);
            return {
                inlineData: {
                    data: compressedBuffer.toString("base64"),
                    mimeType: "image/jpeg"
                },
            };
        } catch (error) {
            console.error(`[GeminiVision] Sharp failed on file: ${filePath}`);
            throw error;
        }
    }

    async compareImages(figmaPath: string, webPath: string): Promise<{ pass: boolean, reason: string, issues?: Array<{ description: string, web_box_2d: [number, number, number, number], figma_box_2d: [number, number, number, number] }> }> {
        try {
            const figmaPart = await this.fileToGenerativePart(figmaPath, "image/jpeg");
            const webPart = await this.fileToGenerativePart(webPath, "image/jpeg");

            const prompt = `Bạn là một chuyên gia kiểm thử giao diện người dùng (UI/UX Automation Tester) vô cùng khắt khe.
Nhiệm vụ của bạn là soi thật kỹ 2 bức ảnh toàn trang: Ảnh 1 là bản thiết kế chuẩn trên Figma, Ảnh 2 là giao diện thực tế trên Web.
Hãy đánh giá chi tiết xem giao diện Web thực tế có bám sát thiết kế Figma từ trên xuống dưới (bao gồm cả Header, Body, Footer) và đảm bảo trải nghiệm người dùng (UX/UI) hay không. Vui lòng BẮT CÁC LỖI sau:
1. Lỗi cấu trúc: Mất khối nội dung (section), layout bị vỡ, đè lên nhau, hoặc căn lề (alignment) sai.
2. Lỗi UI/Thẩm mỹ: Màu sắc (background, text, button) không đúng thiết kế. Kích thước chữ (typography) sai lệch rõ rệt (quá to hoặc quá nhỏ làm mất sự tinh tế).
3. Lỗi khoảng cách (Spacing): Khoảng cách (padding/margin) giữa các phần tử quá hẹp, quá rộng, hoặc không đồng đều gây nhức mắt.
4. Lỗi UX tổng thể: Giao diện thực tế nhìn thô, không hợp mắt, kém sang trọng hơn so với bản thiết kế.

Hãy phớt lờ các lỗi sau:
1. Nội dung text cụ thể (vì web có thể dùng data thật khác data mẫu).
2. Hình ảnh sản phẩm thật khác với ảnh mẫu (placeholder).

Quan trọng: Nếu phát hiện lỗi nghiêm trọng (đặc biệt là thiếu hụt section hoặc vỡ layout), bạn phải cung cấp vị trí ƯỚC TÍNH của lỗi đó trên CẢ 2 BỨC ẢNH dưới dạng Bounding Box [ymin, xmin, ymax, xmax]. Tọa độ chuẩn hóa từ 0 đến 1000 (0,0 là góc trên trái, 1000,1000 là góc dưới phải).

Trả về kết quả dưới định dạng JSON như sau:
{
  "pass": boolean (true nếu giống, false nếu có lỗi),
  "reason": "Giải thích lý do tổng quan",
  "issues": [
    {
      "description": "Mô tả chi tiết phần bị thiếu/lỗi",
      "web_box_2d": [ymin, xmin, ymax, xmax],
      "figma_box_2d": [ymin, xmin, ymax, xmax]
    }
  ]
}`;

            // Danh sách các model từ mạnh nhất/mới nhất đến các bản Lite (để tối đa hóa số lần gọi API miễn phí)
            const modelsToTry = [
                'gemini-3.6-flash',
                'gemini-3.5-flash',
                'gemini-3-flash',
                'gemini-2.5-flash',
                'gemini-3.5-flash-lite', // Bản Lite thường có quota cực cao (500 RPD)
                'gemini-3.1-flash-lite',
                'gemini-1.5-flash',
                'gemini-flash-latest'
            ];

            let lastError: any = null;

            for (const model of modelsToTry) {
                try {
                    console.log(`[GeminiVision] Đang thử gọi model: ${model}...`);
                    const response = await this.ai.models.generateContent({
                        model: model,
                        contents: [
                            prompt,
                            figmaPart,
                            webPart
                        ],
                        config: {
                            responseMimeType: "application/json",
                        }
                    });

                    const text = response.text || "{}";
                    return JSON.parse(text);
                } catch (err: any) {
                    console.warn(`[GeminiVision] Model ${model} gặp lỗi: ${err.message || err}. Đang chuyển sang model tiếp theo...`);
                    lastError = err;
                    // Tiếp tục vòng lặp để thử model khác (fallback)
                }
            }

            console.error("Gemini Vision Error (All models exhausted):", lastError);
            return { pass: false, reason: `Lỗi gọi API AI (đã thử hết các model): ${lastError?.message || lastError}` };
        } catch (outerErr: any) {
            console.error("Gemini Vision Outer Error:", outerErr);
            return { pass: false, reason: `Lỗi chuẩn bị dữ liệu AI: ${outerErr.message || outerErr}` };
        }
    }

    async evaluateMobileUI(webPath: string): Promise<{ pass: boolean, reason: string, issues?: Array<{ description: string, web_box_2d: [number, number, number, number] }> }> {
        try {
            const webPart = await this.fileToGenerativePart(webPath, "image/jpeg");

            const prompt = `Bạn là một chuyên gia kiểm thử UX/UI.
Nhiệm vụ của bạn là xem xét bức ảnh chụp giao diện Mobile toàn trang này và tìm ra các lỗi dàn trang (layout) THẬT SỰ RÕ RÀNG.
Hãy BẮT CÁC LỖI sau (nếu có):
1. Vỡ layout: Các khối nội dung chồng chéo lên nhau một cách bất thường, lệch lạc, hoặc bị cắt xén (đặc biệt là text).
2. Tràn viền (Overflow): Các phần tử tràn ra ngoài chiều rộng màn hình, gây xuất hiện thanh cuộn ngang.
3. Khoảng cách (Spacing): Khoảng cách quá chật hẹp khiến giao diện bí bách, chữ đè sát vào viền mà không có khoảng trống.

LƯU Ý QUAN TRỌNG: 
- BẠN TUYỆT ĐỐI KHÔNG ĐƯỢC BỊA RA LỖI (hallucinate). Nếu giao diện bình thường, hãy trả về pass = true.
- BỎ QUA các thiết kế phá cách cố ý (ví dụ: nút "Xem thêm" hình tròn đè lên văn bản nhạt màu ở nền). Đây là phong cách thiết kế, không phải lỗi đè nội dung.
- Chỉ báo lỗi đè nội dung nếu hai phần tử tĩnh (static elements) nằm trên cùng một mặt phẳng THẬT SỰ bị đè lên nhau một cách lỗi lõm, gây mất chữ hoặc không thể đọc được.
- Đôi khi ảnh có thể bị cắt hơi đột ngột ở mép dưới do quá trình chụp ảnh, đó không phải là lỗi overflow hay cắt xén.

Quan trọng: Khi phát hiện lỗi, bạn phải trích dẫn một đoạn text ngắn (khoảng 3-6 từ) nằm NGAY TẠI vị trí lỗi (trích dẫn chính xác từng chữ trên hình) vào trường "anchor_text". Hệ thống sẽ dùng text này để dò tìm tọa độ chính xác. Đồng thời cung cấp vị trí ƯỚC TÍNH vào "web_box_2d" dưới dạng [ymin, xmin, ymax, xmax] (chuẩn hóa 0-1000).

Hãy trả kết quả bằng chuỗi JSON (KHÔNG bọc trong markdown code block) theo đúng định dạng sau:
{
    "pass": boolean, 
    "reason": "Giải thích ngắn gọn lý do tại sao pass hoặc fail",
    "issues": [
        {
            "description": "Mô tả chi tiết lỗi",
            "anchor_text": "Đoạn text ngắn nằm ngay tại lỗi để làm mỏ neo dò tìm tọa độ",
            "web_box_2d": [ymin, xmin, ymax, xmax]
        }
    ]
}`;

            const modelsToTry = [
                'gemini-3.6-flash',
                'gemini-3.5-flash',
                'gemini-3-flash',
                'gemini-2.5-flash',
                'gemini-3.5-flash-lite',
                'gemini-3.1-flash-lite',
                'gemini-1.5-flash',
                'gemini-flash-latest'
            ];

            let lastError: any = null;

            for (const model of modelsToTry) {
                try {
                    console.log(`[GeminiVision] Đang thử gọi model (Mobile Heuristic): ${model}...`);
                    const response = await this.ai.models.generateContent({
                        model: model,
                        contents: [
                            prompt,
                            webPart
                        ],
                        config: {
                            responseMimeType: "application/json",
                        }
                    });

                    const text = response.text || "{}";
                    return JSON.parse(text);
                } catch (err: any) {
                    console.warn(`[GeminiVision] Model ${model} gặp lỗi: ${err.message || err}. Đang chuyển sang model tiếp theo...`);
                    lastError = err;
                }
            }

            console.error("Gemini Vision Error (All models exhausted):", lastError);
            return { pass: false, reason: `Lỗi gọi API AI (đã thử hết các model): ${lastError?.message || lastError}` };
        } catch (outerErr: any) {
            console.error("Gemini Vision Outer Error:", outerErr);
            return { pass: false, reason: `Lỗi chuẩn bị dữ liệu AI: ${outerErr.message || outerErr}` };
        }
    }
}
