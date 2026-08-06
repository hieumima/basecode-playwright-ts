const timestamp = Date.now().toString();
import * as path from 'path';

export const validNewsData = {
  slug: `test-news-title-${timestamp}`,
  title: `Test News Title ${timestamp}`,
  desc: `Đây là đoạn mô tả ngắn được tự động tạo lúc ${timestamp} nhằm kiểm thử độ hiển thị của giao diện thẻ bài viết trên hệ thống. Đoạn văn này đủ dài để kiểm tra xem layout card tin tức có bị lệch dòng hay cắt chữ (truncate) không đúng định dạng hay không.`,
  content: `Đây là nội dung chi tiết của bài viết được tự động tạo bởi Playwright automation script vào lúc ${timestamp}.

  Phần 1: Tổng quan về hệ thống và công nghệ
  Hệ thống đang tích hợp các giải pháp công nghệ hiện đại nhằm nâng cao trải nghiệm người dùng. Việc kiểm thử với một đoạn văn bản dài giúp đảm bảo trình soạn thảo Rich Text Editor (TinyMCE/CKEditor) hoạt động ổn định, không bị lỗi font chữ hay rớt dòng ngẫu nhiên.
  
  Phần 2: Thông số kỹ thuật và ứng dụng thực tế
  - Kiểm tra khả năng hiển thị các ký tự đặc biệt, dấu câu tiếng Việt đầy đủ.
  - Kiểm tra tính ổn định của cơ sở dữ liệu khi lưu trữ các bài viết có dung lượng text lớn.
  - Đảm bảo khi hiển thị ra ngoài trang Client (/tin-tuc), toàn bộ nội dung này được render chính xác 100% so với những gì admin đã nhập.`,
  imagePath: path.resolve(process.cwd(), "data/images/test-image.jpg")
};

export const invalidNewsCases = [
    {
        scenario: "không nhập tiêu đề",
        title: "",
        slug: `test-news-${timestamp}`,
        desc: "Mô tả ngắn",
        content: "Nội dung",
        imagePath: path.resolve(process.cwd(), "data/images/test-image.jpg"),
        priority: "high",
        severity: "critical",
        assertionType: "form_block"
    },
    {
        scenario: "không nhập đường dẫn mẫu",
        title: `Test News Title ${timestamp}`,
        slug: "",
        desc: "Mô tả ngắn",
        content: "Nội dung",
        imagePath: path.resolve(process.cwd(), "data/images/test-image.jpg"),
        priority: "high",
        severity: "critical",
        assertionType: "form_block"
    }
];
