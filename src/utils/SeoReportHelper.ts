import { Page } from "@playwright/test";
import { SeoPageTestData } from "../../data/seo/seoData";

interface ScorecardStats {
  total: number;
  passed: number;
  failed: number;
  score: number;
  failures: { group: string; step: string; message: string }[];
}

export async function injectVisualSEOReport(
  page: Page,
  pageName: string,
  config: SeoPageTestData,
  scorecardStats: ScorecardStats,
  threshold = 70,
): Promise<void> {

  const { total, passed, failed, score, failures } = scorecardStats;
  const isPass = score >= threshold;

  let scoreColor = "#ef4444";
  let scoreLabel = "KÉM";
  let scoreIcon = "🔴";
  if (score >= 93) { scoreColor = "#22c55e"; scoreLabel = "XUẤT SẮC"; scoreIcon = "💎"; }
  else if (score >= 77) { scoreColor = "#3b82f6"; scoreLabel = "TỐT"; scoreIcon = "🟢"; }
  else if (score >= 65) { scoreColor = "#eab308"; scoreLabel = "KHÁ"; scoreIcon = "🟡"; }
  else if (score >= 50) { scoreColor = "#f97316"; scoreLabel = "TRUNG BÌNH"; scoreIcon = "🟠"; }

  const passColor = isPass ? "#22c55e" : "#ef4444";
  const passText = isPass ? "PASS" : "FAIL";
  const passIcon = isPass ? "✅" : "❌";
  const reportLabel = "SEO Báo cáo (Tự động)";

  // Group failures by their group name
  const failureGroups = new Map<string, { step: string; message: string }[]>();
  for (const f of failures) {
    if (!failureGroups.has(f.group)) failureGroups.set(f.group, []);
    failureGroups.get(f.group)!.push({ step: f.step, message: f.message });
  }

  const groupLabels: Record<string, string> = {
    "TITLE": "1. Thẻ Title",
    "META DESCRIPTION": "2. Meta Description",
    "HEADING STRUCTURE": "3. Heading (H1-H6)",
    "URL STRUCTURE": "4. URL",
    "IMAGES": "5. Hình ảnh",
    "LINKS": "6. Liên kết (Links)",
    "TECHNICAL SEO": "7. Technical SEO",
    "PERFORMANCE": "8. Tốc độ & Core Web Vitals",
    "SECURITY": "9. Bảo mật",
  };

  const keyword = (config as any)?.keyword || "N/A";

  // ─── BUILD HEADER HTML ───
  const headerHtml = `
      <div style="font-weight:bold; font-size:15px; margin-bottom:12px; border-bottom:1px solid #334155; padding-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
        <span>🎯 BÁO CÁO SEO AUDIT CHUYÊN SÂU</span>
        <span style="color:#94a3b8; font-size:11px;">${reportLabel}</span>
      </div>

      <!-- ═══ BẢNG ĐIỂM TỔNG KẾT ═══ -->
      <div style="
        background: linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,41,59,0.6) 100%);
        border: 2px solid ${scoreColor};
        border-radius: 12px;
        padding: 14px 16px;
        margin-bottom: 14px;
        position: relative;
        overflow: hidden;
      ">
        <!-- Glow effect -->
        <div style="position:absolute; top:-40px; left:-40px; width:120px; height:120px; border-radius:50%; background:${scoreColor}; opacity:0.06; pointer-events:none;"></div>

        <!-- Header dòng tiêu đề -->
        <div style="
          text-align:center;
          font-size:11px;
          font-weight:bold;
          color:#94a3b8;
          letter-spacing:2px;
          text-transform:uppercase;
          margin-bottom:10px;
          border-bottom: 1px solid #1e293b;
          padding-bottom: 8px;
        ">══ KẾT QUẢ CHẤM ĐIỂM SEO ══</div>

        <!-- Grid 2 cột: Vòng tròn điểm | Thông tin -->
        <div style="display:grid; grid-template-columns: 100px 1fr; gap:14px; align-items:center; margin-bottom:12px;">
          <!-- Vòng tròn điểm số -->
          <div style="display:flex; justify-content:center;">
            <div style="
              position:relative; width:88px; height:88px;
              border-radius:50%;
              background: conic-gradient(${scoreColor} ${score * 3.6}deg, #1e293b 0deg);
              display:flex; justify-content:center; align-items:center;
              box-shadow: 0 0 20px ${scoreColor}33;
            ">
              <div style="
                position:absolute; width:72px; height:72px;
                border-radius:50%; background:#0f172a;
                display:flex; justify-content:center; align-items:center; flex-direction:column;
              ">
                <span style="font-size:24px; font-weight:900; color:${scoreColor}; line-height:1;">${score}</span>
                <span style="font-size:8px; color:#64748b; text-transform:uppercase; font-weight:bold; letter-spacing:1px;">/ 100</span>
              </div>
            </div>
          </div>

          <!-- Thông tin điểm -->
          <div style="display:flex; flex-direction:column; gap:5px; font-size:11px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="color:#94a3b8;">Điểm số:</span>
              <strong style="color:${scoreColor}; font-size:14px;">${score}/100</strong>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="color:#94a3b8;">Đánh giá:</span>
              <strong style="color:${scoreColor};">${scoreIcon} ${scoreLabel}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="color:#94a3b8;">Ngưỡng đạt:</span>
              <span style="color:#cbd5e1;">${threshold}%</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #1e293b; padding-top:5px; margin-top:2px;">
              <span style="color:#94a3b8;">Kết quả:</span>
              <span style="
                font-weight:bold; font-size:12px;
                color:${passColor};
                background: ${isPass ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)'};
                border: 1px solid ${passColor};
                border-radius:4px; padding:1px 8px;
              ">${passIcon} ${passText}</span>
            </div>
          </div>
        </div>

        <!-- Thống kê tiêu chí -->
        <div style="
          display:grid; grid-template-columns: 1fr 1fr 1fr;
          gap:6px;
          background: rgba(0,0,0,0.25);
          border-radius: 8px;
          padding: 8px 10px;
          border: 1px solid #1e293b;
        ">
          <div style="text-align:center;">
            <div style="font-size:16px; font-weight:bold; color:#60a5fa;">${total}</div>
            <div style="font-size:9px; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Tổng tiêu chí</div>
          </div>
          <div style="text-align:center; border-left:1px solid #1e293b; border-right:1px solid #1e293b;">
            <div style="font-size:16px; font-weight:bold; color:#4ade80;">✅ ${passed}</div>
            <div style="font-size:9px; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Đạt</div>
          </div>
          <div style="text-align:center;">
            <div style="font-size:16px; font-weight:bold; color:#f87171;">❌ ${failed}</div>
            <div style="font-size:9px; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Không đạt</div>
          </div>
        </div>

        <!-- Thông tin trang & từ khóa -->
        <div style="margin-top:10px; font-size:10px; display:flex; flex-direction:column; gap:4px; border-top:1px solid #1e293b; padding-top:8px;">
          <div style="display:flex; gap:6px; align-items:flex-start;">
            <span style="color:#64748b; white-space:nowrap;">🔗 Trang:</span>
            <strong style="color:#60a5fa; word-break:break-all;">${pageName}</strong>
          </div>
          <div style="display:flex; gap:6px; align-items:flex-start;">
            <span style="color:#64748b; white-space:nowrap;">🔑 Từ khóa:</span>
            <strong style="color:#fbbf24; word-break:break-all;">${keyword}</strong>
          </div>
        </div>
      </div>

      <!-- CỘT LỖI CẦN KHẮC PHỤC -->
      <div style="pointer-events: auto;">
    `;

  let bodyHtml = "";

  if (failures.length === 0) {
    bodyHtml = `
          <div style="text-align:center; padding: 25px 15px; background:rgba(34, 197, 94, 0.08); border-radius:10px; border: 1px solid rgba(34, 197, 94, 0.3);">
            <div style="font-size: 24px; margin-bottom: 5px;">🎉</div>
            <strong style="color:#4ade80; font-size:13px; display:block; margin-bottom:5px;">Tuyệt vời! Không phát hiện lỗi SEO nào.</strong>
            <span style="color:#94a3b8; font-size:11px;">Trang đã đáp ứng đầy đủ ${total} tiêu chuẩn SEO.</span>
          </div>
        </div>
      `;
  } else {
    let groupedHtml = "";
    for (const [group, items] of failureGroups) {
      const groupLabel = groupLabels[group] || group;

      groupedHtml += `
          <div style="margin-bottom:10px;">
            <div style="font-size:11px; font-weight:bold; color:#94a3b8; margin-bottom:6px; display:flex; justify-content:space-between; text-transform:uppercase; letter-spacing:0.5px; border-bottom: 1px solid #1e293b; padding-bottom: 4px;">
              <span>${groupLabel}</span>
              <span style="color:#f87171;">${items.length} lỗi</span>
            </div>
            ${items.map((item, idx) => `
              <div style="background:rgba(239, 68, 68, 0.05); padding:8px 10px; border-radius:6px; border: 1px solid rgba(239, 68, 68, 0.15); border-left: 4px solid #ef4444; margin-bottom:4px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3px;">
                  <strong style="color:#f87171; font-size:11px;">${item.step}</strong>
                </div>
                <div style="color:#cbd5e1; font-size:10px; max-height: 60px; overflow-y: auto;">⚠️ ${item.message.length > 200 ? item.message.substring(0, 200) + '...' : item.message}</div>
              </div>
            `).join("")}
          </div>
        `;
    }

    bodyHtml = `
          <div style="font-weight:bold; font-size:12px; color:#f87171; margin-bottom:10px; text-transform:uppercase; letter-spacing:0.5px;">
            ❌ Chi tiết lỗi cần khắc phục (${failed}/${total}):
          </div>
          ${groupedHtml}
        </div>
      `;
  }

  const finalHtml = headerHtml + bodyHtml;

  // Tiêm HTML vào DOM
  await page.evaluate(({ html, scoreColor }) => {
    const oldCard = document.getElementById("seo-report-card");
    if (oldCard) oldCard.remove();

    const container = document.createElement("div");
    container.id = "seo-report-card";
    container.style.cssText = `
        position:fixed; top:10px; right:10px; width:520px;
        background:#0f172a; color:#f8fafc; border: 2px solid ${scoreColor};
        border-radius:16px; box-shadow: 0 20px 60px -10px ${scoreColor}44, 0 20px 25px -5px rgb(0 0 0 / 0.6);
        font-family:system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        padding:18px; z-index:9999999; pointer-events:none;
        max-height:94vh; overflow-y:auto; line-height:1.5;
      `;
    container.innerHTML = html;
    document.body.appendChild(container);
  }, { html: finalHtml, scoreColor });
}
