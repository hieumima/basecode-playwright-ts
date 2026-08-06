import { Page, Locator, test, expect } from "@playwright/test";
import { BasePage } from "../BasePage";
import { TestHelper } from "../../utils/TestHelper";

export class ArticleBasePage extends BasePage {
    // Shared Locators
    readonly addNewButton: Locator;

    readonly titleInput: Locator;
    readonly slugInput: Locator;
    readonly descTextarea: Locator;
    readonly contentHtml: Locator;
    readonly imageUploadButton: Locator;
    readonly saveButton: Locator;

    readonly successAdminMessage: Locator;

    readonly confirmDeleteButton: Locator;

    // Bulk action locators
    readonly tableRows: Locator;
    readonly bulkDeleteBtn: Locator;

    // Copy item locators
    readonly firstCopyDropdownBtn: Locator;
    readonly copyNowBtn: Locator;
    readonly firstShowCheckbox: Locator;

    // Client-side generic locators
    readonly loadMoreBtn: Locator;

    // Product locators
    readonly codeInput: Locator;
    readonly regularPriceInput: Locator;
    readonly salePriceInput: Locator;
    readonly discountInput: Locator;
    readonly galleryUploadButton: Locator;

    readonly descviHtml: Locator;
    readonly contentviHtml: Locator;
    readonly thongsoviHtml: Locator;

    // Properties to store child-specific data
    protected clientUrl!: string;

    constructor(page: Page) {
        super(page);

        // Shared locators for generic admin interface
        this.addNewButton = page.locator("//div[@class='card-footer text-sm sticky-top']//a[@title='Thêm mới'][contains(text(),'Thêm mới')]");

        this.titleInput = page.locator("//input[@id='namevi']");
        this.slugInput = page.locator("(//input[@id='slugvi'])[1]");
        this.descTextarea = page.locator("//textarea[@id='descvi']");
        this.contentHtml = page.locator("iframe.cke_wysiwyg_frame");
        this.imageUploadButton = page.locator("//label[@id='photo-zone']");

        this.saveButton = page.locator("button[type='submit']").filter({ hasText: /^Lưu$|^Lưu và thoát$|^Lưu & thoát$/i }).first();

        this.confirmDeleteButton = page.locator("//button[contains(text(),'Đồng ý') or contains(text(),'OK')]");

        this.successAdminMessage = page.locator("//div[@class='card card-primary card-outline text-sm mb-0']");

        this.tableRows = page.locator('tbody tr');
        this.bulkDeleteBtn = page.locator("(//a[@id='delete-all'])[2]");

        this.firstCopyDropdownBtn = page.locator("(//a[@id='dropdownCopy'])[1]");
        this.copyNowBtn = page.locator("//ul[contains(@class,'show')]//a[contains(@class,'copy-now')]");
        this.firstShowCheckbox = page.locator("(//input[contains(@id,'show-checkbox-hienthi')])[1]");

        this.loadMoreBtn = page.locator("//span[@class='txt']");

        // Cấu hình locators cho sản phẩm
        this.codeInput = page.locator("//input[@id='code']");
        this.regularPriceInput = page.locator("//input[@id='regular_price']");
        this.salePriceInput = page.locator("//input[@id='sale_price']");
        this.discountInput = page.locator("//input[@id='discount']");
        this.galleryUploadButton = page.locator("//div[@class='jFiler-input-inner']");

        this.descviHtml = page.frameLocator('#cke_descvi iframe.cke_wysiwyg_frame').locator('body');
        this.contentviHtml = page.frameLocator('#cke_contentvi iframe.cke_wysiwyg_frame').locator('body');
        this.thongsoviHtml = page.frameLocator('#cke_thongsovi iframe.cke_wysiwyg_frame').locator('body');
    }

    // Removed gotoAdminMenu per user request

    async addArticle(title: string, slug: string, desc: string, content: string, imagePath: string) {
        await test.step(`Thêm bài viết mới: ${title}`, async () => {
            await this.clickOn(this.addNewButton);

            if (title) await this.typeInto(this.titleInput, title);
            if (slug) await this.typeInto(this.slugInput, slug);
            if (desc) await this.typeInto(this.descTextarea, desc);

            if (content) {
                const frame = this.page.frameLocator("iframe.cke_wysiwyg_frame");
                await frame.locator("body").fill(content);
            }

            if (imagePath) {
                const fileChooserPromise = this.page.waitForEvent('filechooser');
                await this.clickOn(this.imageUploadButton);
                const fileChooser = await fileChooserPromise;
                await fileChooser.setFiles(imagePath);
                await TestHelper.delay(this.page, 3000);
            }

            await this.clickOn(this.saveButton);
        });
    }

    async addProduct(
        title: string,
        slug: string,
        code: string,
        regularPrice: string,
        salePrice: string,
        discount: string,
        descHtml: string,
        contentHtml: string,
        thongsoHtml: string,
        imagePath: string,
        galleryPaths?: string[]
    ) {
        await test.step(`Thêm sản phẩm mới: ${title}`, async () => {
            await this.clickOn(this.addNewButton);

            if (title) await this.typeInto(this.titleInput, title);
            if (slug) await this.typeInto(this.slugInput, slug);

            if (code) await this.typeInto(this.codeInput, code);
            if (regularPrice) await this.typeInto(this.regularPriceInput, regularPrice);
            if (salePrice) await this.typeInto(this.salePriceInput, salePrice);
            if (discount) await this.typeInto(this.discountInput, discount);

            if (descHtml) {
                await this.descviHtml.fill(descHtml);
            }

            if (contentHtml) {
                try {
                    await this.contentviHtml.fill(contentHtml, { timeout: 2000 });
                } catch (e) {
                    const frame = this.page.frameLocator("iframe.cke_wysiwyg_frame").first();
                    await frame.locator("body").fill(contentHtml);
                }
            }

            if (thongsoHtml) {
                await this.thongsoviHtml.fill(thongsoHtml);
            }

            if (imagePath) {
                const fileChooserPromise = this.page.waitForEvent('filechooser');
                await this.clickOn(this.imageUploadButton);
                const fileChooser = await fileChooserPromise;
                await fileChooser.setFiles(imagePath);
                await TestHelper.delay(this.page, 3000);
            }

            if (galleryPaths && galleryPaths.length > 0) {
                const fileChooserPromise = this.page.waitForEvent('filechooser');
                await this.clickOn(this.galleryUploadButton);
                const fileChooser = await fileChooserPromise;
                await fileChooser.setFiles(galleryPaths);
                await TestHelper.delay(this.page, 3000);
            }

            await this.clickOn(this.saveButton);
        });
    }

    async verifyAdminSuccess() {
        await test.step("Xác nhận thông báo lưu thành công trong Admin", async () => {
            await this.successAdminMessage.waitFor({ state: 'visible', timeout: 5000 });
        });
    }

    async verifyOnWebsite(title: string) {
        await test.step(`Kiểm tra bài viết '${title}' hiển thị trên trang web`, async () => {
            const baseUrl = process.env.BASE_URL?.endsWith('/') ? process.env.BASE_URL : process.env.BASE_URL + '/';
            // Thêm tham số nocache để tránh tình trạng website lưu cache không hiện bài mới
            await this.page.goto(baseUrl + this.clientUrl);

            // Cải thiện locator: Tìm thẳng văn bản tiêu đề
            const articleItem = this.page.getByText(title, { exact: false }).first();
            await articleItem.waitFor({ state: 'visible', timeout: 5000 });
        });
    }

    async deleteArticle(title: string) {
        await test.step(`Xóa bài viết '${title}' trong Admin`, async () => {
            const dialogHandler = async (dialog: any) => {
                await dialog.accept();
            };
            this.page.on('dialog', dialogHandler);

            // Thực hiện tìm kiếm bài viết trước để đảm bảo bài viết nằm ở trang 1 (Tránh lỗi do Bulk Test đẩy bài viết sang trang 2)
            try {
                const searchInput = this.page.locator("input[placeholder*='Tìm kiếm' i], input#keyword, input[name='keyword']").first();
                const searchBtn = this.page.locator("button, a").filter({ has: this.page.locator(".fa-search") }).first();

                if (await searchInput.isVisible({ timeout: 2000 })) {
                    await searchInput.fill(title);
                    if (await searchBtn.isVisible({ timeout: 1000 })) {
                        await Promise.all([
                            this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 5000 }).catch(() => { }),
                            searchBtn.click()
                        ]);
                    } else {
                        await Promise.all([
                            this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 5000 }).catch(() => { }),
                            searchInput.press('Enter')
                        ]);
                    }
                    await TestHelper.delay(this.page, 1000);
                }
            } catch (error) {
                // Bỏ qua nếu không tìm thấy thanh tìm kiếm
            }

            // Đợi bảng dữ liệu load xong trước khi tìm row
            await this.tableRows.first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => { });
            await TestHelper.delay(this.page, 500);

            const rowLocator = this.page.locator('tr').filter({ hasText: title }).first();

            try {
                // Chờ thẻ tr xuất hiện
                await rowLocator.waitFor({ state: 'attached', timeout: 5000 });

                // Dùng CSS Selector tìm đúng thẻ <a> bọc ngoài icon trash
                const deleteBtn = rowLocator.locator("a").filter({ has: this.page.locator(".fa-trash-alt, .fa-trash") }).first();
                await deleteBtn.waitFor({ state: 'visible', timeout: 3000 });
                await deleteBtn.click({ force: true });
            } catch (error) {
                // Fallback cho giao diện dạng list (div, li)
                const itemLocator = this.page.locator('div, li').filter({ hasText: title }).first();
                await itemLocator.waitFor({ state: 'attached', timeout: 3000 }).catch(() => { });

                const deleteBtn = itemLocator.locator("a").filter({ has: this.page.locator(".fa-trash-alt, .fa-trash") }).first();
                if (await deleteBtn.isVisible().catch(() => false) || await deleteBtn.count() > 0) {
                    await deleteBtn.click({ force: true }).catch(() => { });
                } else {
                    console.log(`Bỏ qua: Không tìm thấy nút xóa cho bài viết '${title}' (có thể đã bị xóa hoặc không tồn tại)`);
                }
            }

            // Chờ modal xác nhận (SweetAlert) nếu có
            await this.confirmDeleteButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
            if (await this.confirmDeleteButton.isVisible()) {
                // Click Đồng ý và đợi load lại bảng để chắc chắn server đã xử lý xóa
                await Promise.all([
                    this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => {
                        // Fallback nếu web dùng AJAX để xóa thay vì reload trang
                        return this.page.waitForLoadState('networkidle', { timeout: 3000 }).catch(() => { });
                    }),
                    this.confirmDeleteButton.click({ force: true })
                ]);
            }

            await TestHelper.delay(this.page, 2000);

            this.page.off('dialog', dialogHandler);
        });
    }

    async deleteArticlesWithPrefix(prefix: string) {
        await test.step(`Xóa hàng loạt các bài viết có tiền tố '${prefix}'`, async () => {
            let hasItemsToDelete = true;
            let emptyChecks = 0; // Đếm số lần không tìm thấy dữ liệu để retry

            while (hasItemsToDelete && emptyChecks < 3) {
                // Đợi cho mạng ổn định một chút phòng trường hợp AJAX đang tải dữ liệu bảng mới
                await this.page.waitForLoadState('domcontentloaded');
                await TestHelper.delay(this.page, 1500); // Thêm lại delay cứng nhỏ vì nếu web dùng AJAX thì loadState không bắt được

                hasItemsToDelete = false;
                const rows = await this.tableRows.all();
                let clickedCount = 0;

                for (const row of rows) {
                    const rowText = await row.innerText().catch(() => ""); // Bắt lỗi lỡ DOM bị detached

                    if (rowText.includes(prefix)) {
                        const rowCheckbox = row.locator('.select-checkbox').first();
                        if (await rowCheckbox.count() > 0) {
                            const isChecked = await rowCheckbox.evaluate((node: HTMLInputElement) => node.checked).catch(() => false);
                            if (!isChecked) {
                                await rowCheckbox.evaluate((node: HTMLElement) => node.click()).catch(() => { });
                            }
                            clickedCount++;
                            hasItemsToDelete = true;
                        }
                    }
                }

                if (clickedCount > 0) {
                    emptyChecks = 0; // Đã tìm thấy và xóa, reset lại biến đếm
                    const dialogHandler = async (dialog: any) => {
                        await dialog.accept();
                    };
                    this.page.on('dialog', dialogHandler);

                    // Click xóa hàng loạt
                    await this.bulkDeleteBtn.evaluate((el: HTMLElement) => el.click());
                    await this.confirmDeleteButton.waitFor({ state: 'visible', timeout: 1500 }).catch(() => { });

                    if (await this.confirmDeleteButton.isVisible().catch(() => false)) {
                        // Click Đồng ý và đợi load lại bảng
                        await Promise.all([
                            this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => { }),
                            this.confirmDeleteButton.click({ force: true }).catch(() => { })
                        ]);
                    } else {
                        await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 }).catch(() => { });
                    }

                    this.page.off('dialog', dialogHandler);

                    // Thêm khoảng nghỉ sau khi xác nhận xóa để hệ thống server/AJAX kịp xử lý xong
                    await TestHelper.delay(this.page, 2000);
                } else {
                    // Nếu không tìm thấy, có thể là do AJAX load chậm, ta tăng biến đếm và thử lại thay vì thoát luôn
                    emptyChecks++;
                    if (emptyChecks < 3) {
                        hasItemsToDelete = true; // Tiếp tục vòng lặp để thử lại
                        console.log(`Chưa thấy bài viết nào chứa '${prefix}', thử lại lần ${emptyChecks}...`);
                    }
                }
            }
        });
    }

    async copyFirstItemAndShow() {
        const currentUrl = this.page.url();

        const dialogHandler = async (dialog: any) => {
            await dialog.accept();
        };
        this.page.on('dialog', dialogHandler);

        const copyBtn = this.page.locator("a.copy-now").first();

        // Mở dropdown bằng vòng lặp thử lại (tránh trường hợp JS chưa nhận click)
        let copyVisible = false;
        for (let i = 0; i < 3; i++) {
            await this.firstCopyDropdownBtn.click({ force: true }).catch(() => { });
            await copyBtn.waitFor({ state: 'visible', timeout: 500 }).catch(() => { });
            if (await copyBtn.isVisible().catch(() => false)) {
                copyVisible = true;
                break;
            }
        }

        if (copyVisible) {
            // Xóa href để tránh navigate sai
            await copyBtn.evaluate((el: HTMLAnchorElement) => {
                el.removeAttribute('href');
            });

            // Xử lý Click và đợi Navigation đồng thời (Tốc độ tối đa, không cần delay)
            await Promise.all([
                this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 5000 }).catch(() => { }),
                copyBtn.evaluate((el: HTMLElement) => el.click()) // Dùng evaluate click để bỏ qua lỗi ẩn hiện của dropdown
            ]);
        } else {
            // Log bằng console.log thay vì console.error để không sinh ra stderr exception trong PS
            console.log("CẢNH BÁO: Nút Copy không xuất hiện sau 3 lần thử mở dropdown!");
        }

        // Xử lý confirm dialog nếu có (kiểm tra tức thời, không timeout)
        if (await this.confirmDeleteButton.isVisible().catch(() => false)) {
            await this.confirmDeleteButton.click({ force: true }).catch(() => { });
        }

        // Xử lý lỗi văng ra dashboard madmin/#
        if (!this.page.url().includes('act=man') || this.page.url().endsWith('#')) {
            await this.page.goto(currentUrl, { waitUntil: 'domcontentloaded' });
        }

        // Bật checkbox hiển thị (chờ xuất hiện rồi check tức thời)
        await this.firstShowCheckbox.waitFor({ state: 'attached', timeout: 2000 }).catch(() => { });
        if (await this.firstShowCheckbox.count() > 0) {
            const isChecked = await this.firstShowCheckbox.evaluate((node: HTMLInputElement) => node.checked).catch(() => true);
            if (!isChecked) {
                await this.firstShowCheckbox.evaluate((node: HTMLInputElement) => node.click()).catch(() => { });
            }
        }

        this.page.off('dialog', dialogHandler);
    }

    async addBulkArticlesManually(count: number, baseTitle: string, baseSlug: string, desc: string, content: string, imagePath: string) {
        for (let i = 1; i <= count; i++) {
            await test.step(`Thêm thủ công lần thứ ${i}`, async () => {
                const currentTitle = `${baseTitle} - ${i}`;
                const currentSlug = `${baseSlug}-${i}`;

                await this.addArticle(currentTitle, currentSlug, desc, content, imagePath);

                await this.verifyAdminSuccess();

                // Bấm vào nút "Click vào đây nếu không muốn đợi lâu" để tối ưu thời gian (bỏ qua chờ redirect tự động)
                const fastForwardLink = this.successAdminMessage.locator("//a[contains(text(),'Click vào đây nếu không muốn đợi lâu')]");
                if (await fastForwardLink.isVisible({ timeout: 1500 }).catch(() => false)) {
                    await Promise.all([
                        this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 5000 }).catch(() => {}),
                        fastForwardLink.click({ force: true })
                    ]);
                }

                // Nếu sau khi lưu mà chưa quay về trang danh sách (chưa có nút thêm mới), thử click "Thoát" hoặc goBack
                if (await this.addNewButton.isHidden().catch(() => true)) {
                    const exitBtn = this.page.locator("a.btn-danger").filter({ hasText: /Thoát/i }).first();
                    if (await exitBtn.isVisible().catch(() => false)) {
                        await exitBtn.click();
                    } else {
                        await this.page.goBack({ waitUntil: 'domcontentloaded' });
                    }
                }
            });
        }
    }

    async copyBulkArticles(count: number) {
        for (let i = 0; i < count; i++) {
            await test.step(`Nhân bản lần thứ ${i + 1}`, async () => {
                await this.copyFirstItemAndShow();
            });
        }
    }

    async scrollToBottom() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
        await TestHelper.delay(this.page, 1000);
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await TestHelper.delay(this.page, 1000);
    }
}
