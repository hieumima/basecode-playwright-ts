import { Page, Locator, test } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ContractPage extends BasePage {
    // Locators
    readonly fullnameInput: Locator;
    readonly phoneInput: Locator;
    readonly addressInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly contentTextarea: Locator;
    readonly sendButton: Locator;
    readonly resetButton: Locator;
    readonly successMessage: Locator;
    readonly dashboardElement: Locator;
    readonly notificationDropdown: Locator;
    readonly contactLink: Locator;
    readonly selectAllCheckbox: Locator;
    readonly deleteAllButton: Locator;
    readonly confirmDeleteButton: Locator;

    constructor(page: Page) {
        super(page);
        this.fullnameInput = page.locator("//input[@id='fullname-contact']");
        this.phoneInput = page.locator("//input[@id='phone-contact']");
        this.addressInput = page.locator("//input[@id='address-contact']");
        this.emailInput = page.locator("//input[@id='email-contact']");
        this.subjectInput = page.locator("//input[@id='subject-contact']");
        this.contentTextarea = page.locator("//textarea[@id='content-contact']");
        this.sendButton = page.locator("//button[contains(text(),'Gửi')]");
        this.resetButton = page.locator("//button[contains(text(),'Nhập lại')]");
        this.successMessage = page.locator("//div[@id='alert']");
        this.dashboardElement = page.locator("//span[@class='text-split']");
        this.notificationDropdown = page.locator("//li[@class='nav-item dropdown']//a[@class='nav-link']");
        this.contactLink = page.locator("//a[contains(text(),'Liên hệ')]");
        this.selectAllCheckbox = page.locator("//input[@id='selectall-checkbox']");
        this.deleteAllButton = page.locator("//div[@class='card-footer text-sm']//a[@id='delete-all']");
        this.confirmDeleteButton = page.locator("//button[contains(text(),'Đồng ý')]");
    }

    // Điền dữ liệu vào form liên hệ
    async fillContactForm(fullname: string, phone: string, address: string, email: string, subject: string, content: string) {
        await test.step(`Điền thông tin liên hệ: ${fullname}`, async () => {
            if (fullname) await this.typeInto(this.fullnameInput, fullname);
            if (phone) await this.typeInto(this.phoneInput, phone);
            if (address) await this.typeInto(this.addressInput, address);
            if (email) await this.typeInto(this.emailInput, email);
            if (subject) await this.typeInto(this.subjectInput, subject);
            if (content) await this.typeInto(this.contentTextarea, content);
        });
    }

    async gotoContactPage() {
        const baseUrl = process.env.BASE_URL?.endsWith('/') ? process.env.BASE_URL : process.env.BASE_URL + '/';
        await this.page.goto(baseUrl + 'lien-he');
    }

    // Bấm nút Gửi
    async clickSend() {
        await test.step("Bấm nút Gửi", async () => {
            await this.clickOn(this.sendButton);
        });
    }

    // Bấm nút Nhập lại
    async clickReset() {
        await test.step("Bấm nút Nhập lại", async () => {
            await this.clickOn(this.resetButton);
        });
    }

    async goToContactManagement() {
        await test.step("Mở danh sách Liên hệ từ thông báo", async () => {
            await this.clickOn(this.notificationDropdown);
            await this.clickOn(this.contactLink);
        });
    }

    getContactRow(uniqueName: string): Locator {
        return this.page.getByText(uniqueName).first();
    }

    async verifyContactExists(uniqueName: string) {
        await test.step(`Xác nhận liên hệ có tên '${uniqueName}' xuất hiện trong Admin`, async () => {
            const targetCell = this.getContactRow(uniqueName);
            await targetCell.waitFor({ state: 'visible', timeout: 10000 });
        });
    }

    async deleteContact() {
        await test.step(`Xóa liên hệ`, async () => {
            await this.clickOn(this.selectAllCheckbox);
            await this.clickOn(this.deleteAllButton);
            await this.clickOn(this.confirmDeleteButton);
        });
    }
}
