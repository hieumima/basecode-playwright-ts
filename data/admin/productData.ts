const timestamp = Date.now().toString();
import * as path from 'path';

export const validProductData = {
    slug: `test-product-title-${timestamp}`,
    title: `Test Product Title ${timestamp}`,
    code: `SP-${timestamp}`,
    regularPrice: "1500000",
    salePrice: "1200000",
    discount: "20",
    descHtml: `Đây là mô tả sản phẩm được tự động tạo lúc ${timestamp}. Sản phẩm chất lượng cao.`,
    contentHtml: `Đây là nội dung chi tiết của sản phẩm được tự động tạo bởi automation script lúc ${timestamp}.
  
  Chi tiết tính năng:
  - Tính năng 1
  - Tính năng 2
  Đảm bảo chất lượng tốt nhất.`,
    thongsoHtml: `Thông số kỹ thuật:
  - Trọng lượng: 1kg
  - Kích thước: 10x10x10 cm
  - Chất liệu: Nhựa cao cấp`,
    imagePath: path.resolve(process.cwd(), "data/images/test-image.jpg"),
    galleryPaths: [
        path.resolve(process.cwd(), "data/images/test-image.jpg")
    ]
};

export const invalidProductCases = [
    {
        scenario: "không nhập tiêu đề",
        title: "",
        slug: `test-product-${timestamp}`,
        code: `SP-${timestamp}`,
        regularPrice: "1500000",
        salePrice: "1200000",
        discount: "20",
        descHtml: "Mô tả sản phẩm",
        contentHtml: "Nội dung",
        thongsoHtml: "Thông số",
        imagePath: path.resolve(process.cwd(), "data/images/test-image.jpg"),
        galleryPaths: [],
        priority: "high",
        severity: "critical",
        assertionType: "form_block"
    },
    {
        scenario: "không nhập đường dẫn mẫu",
        title: `Test Product Title ${timestamp}`,
        slug: "",
        code: `SP-${timestamp}`,
        regularPrice: "1500000",
        salePrice: "1200000",
        discount: "20",
        descHtml: "Mô tả sản phẩm",
        contentHtml: "Nội dung",
        thongsoHtml: "Thông số",
        imagePath: path.resolve(process.cwd(), "data/images/test-image.jpg"),
        galleryPaths: [],
        priority: "high",
        severity: "critical",
        assertionType: "form_block"
    }
];
