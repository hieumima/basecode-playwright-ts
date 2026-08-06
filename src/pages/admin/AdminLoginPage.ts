import { Page, Locator, test } from "@playwright/test";
import { BasePage } from "../BasePage";

export class AdminLoginPage extends BasePage {
    // Locators
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly dashboardElement: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator("//input[@id='username']");
        this.passwordInput = page.locator("//input[@id='password']");
        this.loginButton = page.locator("//button[@class='login-btn btn-login']");
        this.errorMessage = page.locator("//div[@role='alert']");
        this.dashboardElement = page.locator("//span[@class='text-split']");
    }

    async fillLoginForm(username?: string, password?: string) {
        await test.step(`Điền thông tin đăng nhập`, async () => {
            if (username !== undefined && username !== null && username !== "") {
                await this.typeInto(this.usernameInput, username);
            } else if (username === "") {
                await this.usernameInput.fill("");
            }

            if (password !== undefined && password !== null && password !== "") {
                await this.typeInto(this.passwordInput, password);
            } else if (password === "") {
                await this.passwordInput.fill("");
            }
        });
    }

    async gotoLoginPage() {
        const baseUrl = process.env.BASE_URL?.endsWith('/') ? process.env.BASE_URL : process.env.BASE_URL + '/';
        await this.page.goto(baseUrl + 'madmin/login');
    }

    async clickLogin() {
        await test.step("Bấm nút Đăng nhập", async () => {
            await this.clickOn(this.loginButton);
        });
    }
}
