export const validAdminLoginData = {
    username: process.env.ADMIN_NAME || "admin@example.com",
    password: process.env.ADMIN_PASSWORD || "adminpassword",
};

export const invalidAdminLoginCases = [
    {
        scenario: "bỏ trống tên đăng nhập",
        username: "",
        password: "password123",
        priority: "high",
        severity: "critical",
        assertionType: "ui_error",
        expectedMessage: "Vui lòng nhập tên đăng nhập"
    },
    {
        scenario: "bỏ trống mật khẩu",
        username: "admin",
        password: "",
        priority: "high",
        severity: "critical",
        assertionType: "ui_error",
        expectedMessage: "Vui lòng nhập mật khẩu"
    },
    {
        scenario: "sai tên đăng nhập",
        username: "wronguser",
        password: "password123",
        priority: "high",
        severity: "critical",
        assertionType: "ui_error",
        expectedMessage: "Sai tên đăng nhập hoặc mật khẩu"
    },
    {
        scenario: "sai mật khẩu",
        username: "admin",
        password: "wrongpassword",
        priority: "high",
        severity: "critical",
        assertionType: "ui_error",
        expectedMessage: "Sai tên đăng nhập hoặc mật khẩu"
    },
    {
        scenario: "tấn công SQL Injection",
        username: "admin' OR '1'='1",
        password: "password123",
        priority: "high",
        severity: "critical",
        assertionType: "ui_error",
        expectedMessage: "Sai tên đăng nhập hoặc mật khẩu"
    }
];
