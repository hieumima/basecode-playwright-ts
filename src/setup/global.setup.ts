import { chromium, FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
// No extra imports

async function globalSetup(config: FullConfig) {
  const environment = process.env.ENV || 'qa';
  dotenv.config({ path: path.resolve(__dirname, `../config/.env.${environment}`) });
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });

  console.log('--- STARTING AUTO-DISCOVERY MENU SCAN ---');

  const browser = await chromium.launch({
    channel: 'chrome',
    headless: process.env.CI ? true : false
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseUrl = process.env.BASE_URL || 'https://admin.example.com';

  try {
    // 1. Navigate to Admin Login Page
    const loginUrl = baseUrl.endsWith('/') ? baseUrl + 'madmin/login' : baseUrl + '/madmin/login';
    console.log(`Đang truy cập trang login: ${loginUrl}...`);
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });

    // Thực hiện Đăng nhập
    console.log('Đang thực hiện đăng nhập...');
    const username = process.env.ADMIN_NAME || "admin@example.com";
    const password = process.env.ADMIN_PASSWORD || "adminpassword";

    await page.locator("//input[@id='username']").fill(username);
    await page.locator("//input[@id='password']").fill(password);
    await page.locator("//button[@class='login-btn btn-login']").click();

    // Đợi Dashboard xuất hiện để chắc chắn đã login thành công
    await page.locator("//span[@class='text-split']").waitFor({ state: 'visible', timeout: 15000 });
    console.log('Đăng nhập thành công!');

    // 2. Định vị thanh Menu bằng locator do bạn cung cấp
    const sidebarLocator = page.locator("//aside[@class='main-sidebar sidebar-dark-primary elevation-4 text-sm']");

    // Đợi container xuất hiện (timeout 10s)
    await sidebarLocator.waitFor({ state: 'attached', timeout: 10000 }).catch(() => {
      console.warn('CẢNH BÁO: Không tìm thấy thanh menu trong 10s. Vui lòng kiểm tra lại quá trình login hoặc locator.');
    });

    // --- DEBUG: Dump HTML của sidebar ra file để phân tích ---
    const html = await sidebarLocator.innerHTML();
    fs.writeFileSync(path.resolve(__dirname, '../../data/templates/sidebar.html'), html, 'utf-8');
    // ---------------------------------------------------------

    // 3. Quét toàn bộ cấu trúc Menu bằng page.evaluate (lấy cả menu bị ẩn)
    const menuTree = await page.evaluate(() => {
      const sidebar = document.querySelector("aside.main-sidebar");
      if (!sidebar) return {};

      const tree: Record<string, string[]> = {};

      // Tìm danh sách (ul) chính chứa các menu
      const mainNav = sidebar.querySelector('nav > ul') || sidebar.querySelector('ul');
      if (!mainNav) return tree;

      // Lặp qua các thẻ li cấp 1
      const topLevelItems = Array.from(mainNav.children).filter(el => el.tagName.toLowerCase() === 'li');

      for (const li of topLevelItems) {
        // Lấy thẻ <a> đầu tiên làm tên Menu Cha
        const parentLink = li.querySelector('a');
        if (!parentLink) continue;

        // Dùng textContent để lấy chữ (bao gồm cả chữ bị ẩn bằng CSS)
        let parentName = parentLink.textContent?.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ') || '';

        if (parentName === '') continue;

        // Lấy TẤT CẢ các thẻ <a> nằm bên trong BẤT KỲ thẻ <ul> nào thuộc về Group này
        // Sử dụng :scope để đảm bảo chỉ tìm ul nằm BÊN TRONG thẻ li hiện tại (tránh bắt nhầm chính thẻ a của menu cha)
        const subItems = Array.from(li.querySelectorAll(':scope ul a'));

        if (subItems.length > 0) {
          const subNames = subItems.map(a => a.textContent?.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ') || '')
            .filter(name => name !== '' && name !== parentName);
          // Giữ nguyên toàn bộ, KHÔNG dùng Set để tránh xóa mất các menu trùng tên (VD: 2 cái Chi tiết sản phẩm)
          tree[parentName] = subNames;
        } else {
          tree[parentName] = [];
        }
      }
      return tree;
    });

    console.log(`Đã bóc tách được cây thư mục menu:`, menuTree);

    // 4. Lưu vào thư mục data/templates/scanned-menu.json
    const configDir = path.resolve(__dirname, '../../data/templates');
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    const outputPath = path.join(configDir, 'scanned-menu.json');
    const dataToSave = {
      timestamp: new Date().toISOString(),
      baseUrl: baseUrl,
      menus: menuTree
    };

    fs.writeFileSync(outputPath, JSON.stringify(dataToSave, null, 2), 'utf-8');
    console.log(`✅ Đã lưu file Data tại: ${outputPath}`);

  } catch (error) {
    console.error('❌ Lỗi quét menu:', error);
  } finally {
    await scanFrontendFeatures(baseUrl, browser);
    await scanFrontendFeatures(baseUrl, browser);
    await browser.close();
    console.log('--- END AUTO-DISCOVERY ---');
  }
}

async function scanFrontendFeatures(baseUrl: string, browser: any) {
  console.log('--- STARTING FRONTEND FEATURE SCAN ---');
  let page;
  try {
    const context = await browser.newContext();
    page = await context.newPage();
    console.log(`Đang truy cập trang chủ: ${baseUrl}...`);

    // Mở trang chủ
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    // Dùng page.evaluate để chạy Heuristic Analysis (Tìm ô input search)
    const hasSearch = await page.evaluate(() => {
      // Tìm tất cả các thẻ input
      const inputs = Array.from(document.querySelectorAll('input'));

      for (const input of inputs) {
        // Loại trừ các input ẩn
        if (input.type === 'hidden' || input.style.display === 'none') continue;

        const type = input.type.toLowerCase();
        const name = (input.name || '').toLowerCase();
        const placeholder = (input.placeholder || '').toLowerCase();
        const id = (input.id || '').toLowerCase();
        const className = (input.className || '').toLowerCase();

        // Các đặc điểm nhận diện thanh tìm kiếm
        if (type === 'search') return true;
        if (name === 'q' || name === 'keyword' || name === 'search') return true;
        if (placeholder.includes('tìm kiếm') || placeholder.includes('search')) return true;
        if (id.includes('search') || id === 'keyword') return true;
        if (className.includes('search')) return true;
      }

      // Nếu không có input rõ ràng, thử tìm form action chứa chữ search
      const forms = Array.from(document.querySelectorAll('form'));
      for (const form of forms) {
        const action = (form.getAttribute('action') || '').toLowerCase();
        if (action.includes('search') || action.includes('tim-kiem')) return true;
      }

      return false;
    });

    console.log(`✅ Kết quả phân tích Heuristic - Có thanh tìm kiếm: ${hasSearch ? 'CÓ' : 'KHÔNG'}`);

    const featuresDir = path.resolve(__dirname, '../../data/templates');
    if (!fs.existsSync(featuresDir)) {
      fs.mkdirSync(featuresDir, { recursive: true });
    }

    const featurePath = path.join(featuresDir, 'scanned-frontend.json');
    const featureData = {
      timestamp: new Date().toISOString(),
      baseUrl: baseUrl,
      features: {
        search: hasSearch
      }
    };

    fs.writeFileSync(featurePath, JSON.stringify(featureData, null, 2), 'utf-8');
    console.log(`✅ Đã lưu cấu hình Frontend tại: ${featurePath}`);

  } catch (error) {
    console.error('❌ Lỗi quét Frontend:', error);
  } finally {
    if (page) await page.close();
  }
}
export default globalSetup;
