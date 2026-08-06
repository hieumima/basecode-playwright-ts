import * as path from 'path';

const timestamp = Date.now().toString();

export const validTechDocData = {
  slug: `tai-lieu-ky-thuat-test-${timestamp}`,
  title: `Tài liệu kỹ thuật Automation ${timestamp}`,
  desc: `Đây là tài liệu kỹ thuật được tạo tự động lúc ${timestamp} nhằm mục đích kiểm thử phần mềm. Đoạn mô tả này tóm tắt ngắn gọn nội dung của tài liệu.`,
  content: `Đây là nội dung chi tiết của tài liệu kỹ thuật tự động tạo bởi Playwright lúc ${timestamp}.

  Chương 1: Yêu cầu hệ thống
  - Hỗ trợ tốt các module quản lý.
  - Tích hợp tự động hóa UI test.
  
  Chương 2: Hướng dẫn cài đặt
  1. Tải source code.
  2. Cấu hình môi trường.
  3. Khởi chạy hệ thống.`,
  imagePath: path.resolve(process.cwd(), "data/images/test-image.jpg")
};

export const invalidTechDocCases = [
    {
        scenario: "không nhập tiêu đề",
        title: "",
        slug: `tai-lieu-ky-thuat-${timestamp}`,
        desc: "Mô tả ngắn",
        content: "Nội dung",
        imagePath: path.resolve(process.cwd(), "data/images/test-image.jpg"),
        priority: "high",
        severity: "critical",
        assertionType: "form_block"
    },
    {
        scenario: "không nhập đường dẫn mẫu",
        title: `Tài liệu kỹ thuật ${timestamp}`,
        slug: "",
        desc: "Mô tả ngắn",
        content: "Nội dung",
        imagePath: path.resolve(process.cwd(), "data/images/test-image.jpg"),
        priority: "high",
        severity: "critical",
        assertionType: "form_block"
    }
];
