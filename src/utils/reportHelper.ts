import { Page } from "@playwright/test";
import * as allure from "allure-js-commons";

// Biến toàn cục để theo dõi xem trong một customStep có tiêu chí nào bị fail không
export const globalStepContext = {
    hasError: false
};

// ==================== CUSTOM STEP ====================

export async function customStep(
    page: Page,
    stepName: string,
    action: () => Promise<void>,
    options?: { screenshot?: boolean }
): Promise<void> {
    globalStepContext.hasError = false; // Reset trước mỗi step lớn

    try {
        await allure.step(stepName, async () => {
            await action();
            if (options?.screenshot) {
                const screenshot = await page.screenshot({ fullPage: false });
                await allure.attachment(`Ảnh chụp: ${stepName}`, screenshot, "image/png");
            }

            // Nếu trong quá trình chạy action() có bất kỳ sc.check() nào fail
            // Ta chủ động throw một lỗi ở cuối để ép Allure đánh dấu bước cha này là FAILED (màu Đỏ)
            if (globalStepContext.hasError) {
                throw new Error("STEP_HAS_FAILURES");
            }
        });
    } catch (e: any) {
        // Nuốt lỗi đặc biệt này để bài test tiếp tục chạy các step tiếp theo
        // Những lỗi code crash thật sự thì vẫn ném ra ngoài
        if (e.message !== "STEP_HAS_FAILURES") {
            throw e;
        }
    }
}

// ==================== SEO SCORECARD ====================

interface ScorecardFailure {
    group: string;
    step: string;
    message: string;
}

export class SeoScorecard {
    private totalChecks = 0;
    private passedChecks = 0;
    private failures: ScorecardFailure[] = [];
    private currentGroup: string = "KHÁC";

    /** Bắt đầu một nhóm tiêu chí mới (vd: "META DESCRIPTION") */
    startGroup(groupName: string) {
        this.currentGroup = groupName;
    }

    /**
     * Wrap 1 tiêu chí SEO con vào allure.step().
     *
     * @param stepName    — Tên hiển thị trên Allure (VD: "1.1 — Title phải có nội dung")
     * @param condition   — true = PASS, false = FAIL
     * @param errorMessage — Mô tả lỗi khi condition = false
     */
    async check(
        stepName: string,
        condition: boolean,
        errorMessage: string
    ): Promise<void> {
        this.totalChecks++;

        if (condition) {
            this.passedChecks++;
            await allure.step(`✅ ${stepName}`, async () => {
                // Step rỗng → Allure tự đánh PASS
            });
        } else {
            // ❌ FAIL
            this.failures.push({ group: this.currentGroup, step: stepName, message: errorMessage });
            globalStepContext.hasError = true; // Báo hiệu cho thư mục cha biết là có lỗi

            try {
                await allure.step(`❌ ${stepName}`, async () => {
                    await allure.attachment(
                        "Chi tiết lỗi",
                        Buffer.from(errorMessage, "utf-8"),
                        "text/plain"
                    );
                    throw new Error(errorMessage); // Ép Allure đánh ❌ cho step con này
                });
            } catch {
                // Nuốt lỗi ở step con để code action() vẫn chạy kiểm tra tiếp các tiêu chí khác
            }
        }
    }

    /** Lấy điểm hiện tại (0–100) */
    get score(): number {
        if (this.totalChecks === 0) return 100;
        return Math.round((this.passedChecks / this.totalChecks) * 100);
    }

    /** Lấy thống kê chi tiết */
    get stats() {
        return {
            total: this.totalChecks,
            passed: this.passedChecks,
            failed: this.totalChecks - this.passedChecks,
            score: this.score,
            failures: [...this.failures],
        };
    }

    async finalizeScore(page: Page, threshold = 70): Promise<void> {
        const { total, passed, failed, score, failures } = this.stats;

        // Xác định trạng thái
        const isPass = score >= threshold;
        const statusText = isPass ? "PASS" : "FAIL";

        // Thang điểm SEO mới
        let scoreLabel: string;
        let statusIcon: string;
        if (score >= 93) {
            scoreLabel = "XUẤT SẮC";
            statusIcon = "💎";
        } else if (score >= 77) {
            scoreLabel = "TỐT";
            statusIcon = "🟢";
        } else if (score >= 65) {
            scoreLabel = "KHÁ";
            statusIcon = "🟡";
        } else if (score >= 50) {
            scoreLabel = "TRUNG BÌNH";
            statusIcon = "🟠";
        } else {
            scoreLabel = "KÉM";
            statusIcon = "🔴";
        }

        // Tạo báo cáo tổng kết dạng text
        const summaryLines = [
            `══════════════════════════════════════`,
            `   ${statusIcon} KẾT QUẢ CHẤM ĐIỂM SEO`,
            `══════════════════════════════════════`,
            `   Điểm số:     ${score}/100`,
            `   Đánh giá:    ${scoreLabel}`,
            `   Ngưỡng đạt:  ${threshold}%`,
            `   Kết quả:     ${statusText}`,
            `──────────────────────────────────────`,
            `   Tổng tiêu chí:  ${total}`,
            `   ✅ Đạt:          ${passed}`,
            `   ❌ Không đạt:    ${failed}`,
            `══════════════════════════════════════`,
        ];

        if (failures.length > 0) {
            summaryLines.push(``, `📋 CHI TIẾT LỖI CẦN KHẮC PHỤC (${failed}/${total}):`);

            // Group errors by their assigned group
            const groupedFailures = failures.reduce((acc, f) => {
                if (!acc[f.group]) acc[f.group] = [];
                acc[f.group].push(f);
                return acc;
            }, {} as Record<string, ScorecardFailure[]>);

            let globalIndex = 1;
            for (const [group, items] of Object.entries(groupedFailures)) {
                summaryLines.push(`--- ${group.toUpperCase()} ---`);
                items.forEach((f) => {
                    summaryLines.push(`   ${globalIndex}. [${f.step}]`);
                    summaryLines.push(`      → ${f.message}`);
                    globalIndex++;
                });
            }
        }

        const summaryText = summaryLines.join("\n");

        // Step cuối cùng — hiển thị bảng điểm + quyết định PASS/FAIL
        await customStep(
            page,
            `🏆 Kết quả chấm điểm SEO: ${score}/100 — ${statusText} (${scoreLabel})`,
            async () => {
                // Đính kèm bảng điểm text
                await allure.attachment(
                    "Bảng điểm SEO",
                    Buffer.from(summaryText, "utf-8"),
                    "text/plain"
                );

                // Gắn description vào Test Case trên Allure
                await allure.description(
                    `[${statusText}] Điểm SEO: ${score}/100 | Đạt: ${passed}/${total} tiêu chí | Ngưỡng: ${threshold}%\n\n` +
                    `${scoreLabel}`
                );

                // 🚀 ĐÂY LÀ DÒNG DUY NHẤT quyết định Test PASS hay FAIL
                if (!isPass) {
                    throw new Error(
                        `❌ FAIL — Điểm SEO ${score}/100 dưới ngưỡng ${threshold}%. ` +
                        `Có ${failed}/${total} tiêu chí không đạt.`
                    );
                }
            },
            { screenshot: true }
        );
    }
}