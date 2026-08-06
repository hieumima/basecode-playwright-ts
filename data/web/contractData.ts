const timestamp = Date.now().toString();

export const validContractData = {
    fullname: `Nguyen Van A ${timestamp}`,
    phone: "0796625425",
    address: "123 Street, City",
    email: `nguyenvana${timestamp}@example.com`,
    subject: "Test Subject",
    content: "This is a test content for the contract form."
};

export const invalidContractCases = [
    {
        scenario: "bỏ trống họ tên",
        fullname: "",
        phone: "0796625425",
        address: "123 Street, City",
        email: "nguyenvana@example.com",
        subject: "Test Subject",
        content: "This is a test content.",
        priority: "high",
        severity: "critical",
        assertionType: "form_block",
        expectedMessage: "Vui lòng nhập họ tên"
    },
    {
        scenario: "sai định dạng email",
        fullname: "Nguyen Van B",
        phone: "0796625425",
        address: "456 Avenue, City",
        email: "invalid-email-format",
        subject: "Test Subject",
        content: "This is a test content for invalid email.",
        priority: "medium",
        severity: "normal",
        assertionType: "form_block",
        expectedMessage: "Email không hợp lệ"
    },
    {
        scenario: "bỏ trống điện thoại",
        fullname: "Nguyen Van C",
        phone: "",
        address: "123 Street, City",
        email: "nguyenvanc@example.com",
        subject: "Test Subject",
        content: "This is a test content.",
        priority: "high",
        severity: "critical",
        assertionType: "form_block",
        expectedMessage: "Vui lòng nhập số điện thoại"
    },
    {
        scenario: "bỏ trống email",
        fullname: "Nguyen Van D",
        phone: "0796625425",
        address: "123 Street, City",
        email: "",
        subject: "Test Subject",
        content: "This is a test content.",
        priority: "high",
        severity: "critical",
        assertionType: "form_block",
        expectedMessage: "Vui lòng nhập email"
    },
    {
        scenario: "bỏ trống nội dung",
        fullname: "Nguyen Van E",
        phone: "0796625425",
        address: "123 Street, City",
        email: "nguyenvane@example.com",
        subject: "Test Subject",
        content: "",
        priority: "high",
        severity: "critical",
        assertionType: "form_block",
        expectedMessage: "Vui lòng nhập nội dung"
    },
    {
        scenario: "số điện thoại quá ngắn",
        fullname: "Nguyen Van F",
        phone: "0912345",
        address: "123 Street, City",
        email: "nguyenvane@example.com",
        subject: "Test Subject",
        content: "This is a test content.",
        priority: "medium",
        severity: "normal",
        assertionType: "form_block",
        expectedMessage: "Số điện thoại không hợp lệ"
    },
    {
        scenario: "số điện thoại chứa chữ cái",
        fullname: "Nguyen Van G",
        phone: "0912345abc",
        address: "123 Street, City",
        email: "nguyenvane@example.com",
        subject: "Test Subject",
        content: "This is a test content.",
        priority: "medium",
        severity: "normal",
        assertionType: "form_block",
        expectedMessage: "Số điện thoại không hợp lệ"
    },
    {
        scenario: "nhập toàn khoảng trắng",
        fullname: "      ",
        phone: "0796625425",
        address: "123 Street, City",
        email: "nguyenvane@example.com",
        subject: "Test Subject",
        content: "This is a test content.",
        priority: "medium",
        severity: "normal",
        assertionType: "form_block",
        expectedMessage: "Vui lòng nhập họ tên"
    },
    {
        scenario: "tấn công XSS",
        fullname: "<script>alert('hack')</script>",
        phone: "0796625425",
        address: "123 Street, City",
        email: "nguyenvane@example.com",
        subject: "Test Subject",
        content: "This is a test content.",
        priority: "high",
        severity: "critical",
        assertionType: "form_block",
        expectedMessage: "Ký tự không hợp lệ"
    }
];
