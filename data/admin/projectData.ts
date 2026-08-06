import * as path from 'path';

const timestamp = Date.now().toString();

export const validProjectData = {
  slug: `du-an-test-${timestamp}`,
  title: `Dự án Automation ${timestamp}`,
  desc: `Đây là đoạn mô tả ngắn về dự án được tự động tạo lúc ${timestamp}.`,
  content: `Đây là nội dung chi tiết của dự án tự động tạo bởi Playwright lúc ${timestamp}.`,
  imagePath: path.resolve(process.cwd(), "data/images/test-image.jpg")
};

export const invalidProjectCases = [
    {
        scenario: "không nhập tiêu đề",
        title: "",
        slug: `du-an-${timestamp}`,
        desc: "Mô tả ngắn",
        content: "Nội dung",
        imagePath: path.resolve(process.cwd(), "data/images/test-image.jpg"),
        priority: "high",
        severity: "critical",
        assertionType: "form_block"
    },
    {
        scenario: "không nhập đường dẫn mẫu",
        title: `Dự án ${timestamp}`,
        slug: "",
        desc: "Mô tả ngắn",
        content: "Nội dung",
        imagePath: path.resolve(process.cwd(), "data/images/test-image.jpg"),
        priority: "high",
        severity: "critical",
        assertionType: "form_block"
    }
];
