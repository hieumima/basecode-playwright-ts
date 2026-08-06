import * as path from 'path';

const timestamp = Date.now().toString();

export const validServiceCategory1Data = {
  slug: `test-dich-vu-cap-1-${timestamp}`,
  title: `Test Dịch vụ cấp 1 ${timestamp}`,
  desc: `Đây là đoạn mô tả ngắn dịch vụ cấp 1 được tự động tạo lúc ${timestamp}.`,
  content: `Đây là nội dung chi tiết dịch vụ cấp 1 được tự động tạo bởi Playwright lúc ${timestamp}.`,
  imagePath: path.resolve(process.cwd(), "data/images/test-image.jpg")
};

export const invalidServiceCategory1Cases = [
    {
        scenario: "không nhập tiêu đề",
        title: "",
        slug: `test-dich-vu-cap-1-${timestamp}`,
        desc: "Mô tả ngắn",
        content: "Nội dung",
        imagePath: path.resolve(process.cwd(), "data/images/test-image.jpg"),
        priority: "high",
        severity: "critical",
        assertionType: "form_block"
    },
    {
        scenario: "không nhập đường dẫn mẫu",
        title: `Test Dịch vụ cấp 1 ${timestamp}`,
        slug: "",
        desc: "Mô tả ngắn",
        content: "Nội dung",
        imagePath: path.resolve(process.cwd(), "data/images/test-image.jpg"),
        priority: "high",
        severity: "critical",
        assertionType: "form_block"
    }
];
