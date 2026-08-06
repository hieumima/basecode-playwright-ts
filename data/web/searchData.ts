export const invalidSearchCases = [
    {
        scenario: "từ khóa chứa toàn ký tự đặc biệt",
        keyword: "@#$%^&*",
        priority: "high",
        severity: "normal",
        expectedMessage: "Không tìm thấy kết quả" // Cập nhật đúng message thực tế
    },
    {
        scenario: "từ khóa không tồn tại trên hệ thống",
        keyword: "chuoi_ky_tu_khong_bao_gio_ton_tai_12345",
        priority: "high",
        severity: "normal",
        expectedMessage: "Không tìm thấy kết quả"
    },
    {
        scenario: "từ khóa chỉ có 1 khoảng trắng",
        keyword: " ",
        priority: "low",
        severity: "minor",
        expectedMessage: ""
    }
];
