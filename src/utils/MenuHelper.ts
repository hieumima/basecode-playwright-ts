import * as fs from 'fs';
import * as path from 'path';

export class MenuHelper {
    private static scannedData: Record<string, string[]> | null = null;

    /**
     * Load data từ file JSON đã quét
     */
    private static loadData() {
        if (this.scannedData !== null) return;
        
        try {
            const configPath = path.resolve(__dirname, '../../data/templates/scanned-menu.json');
            if (fs.existsSync(configPath)) {
                const fileContent = fs.readFileSync(configPath, 'utf8');
                const parsed = JSON.parse(fileContent);
                this.scannedData = parsed.menus || {};
            } else {
                this.scannedData = {};
                console.warn('CẢNH BÁO: Không tìm thấy file scanned-menu.json. Hãy chạy Global Setup trước.');
            }
        } catch (e) {
            console.warn('CẢNH BÁO: Lỗi khi đọc file scanned-menu.json:', e);
            this.scannedData = {};
        }
    }

    /**
     * Kiểm tra xem 1 trong các từ khóa Menu Con có tồn tại BÊN TRONG 1 trong các Menu Cha hay không.
     * Quét qua các Menu Cha thỏa mãn điều kiện parentAliases. Không phân biệt HOA/thường.
     * 
     * @example
     * MenuHelper.hasSubMenu(['Quản lý bài viết', 'Bài viết'], ['Tin tức', 'BLOG', 'Bài viết'])
     * 
     * @param parentAliases Mảng các từ khóa tương đương của Menu Cha
     * @param subAliases Mảng các từ khóa tương đương của Menu Con
     * @returns true nếu tìm thấy ít nhất 1
     */
    public static hasSubMenu(parentAliases: string[], subAliases: string[]): boolean {
        this.loadData();
        if (!this.scannedData) return false;

        const lowerParentAliases = parentAliases.map(a => a.toLowerCase().trim());
        const lowerSubAliases = subAliases.map(a => a.toLowerCase().trim());

        for (const parentKey of Object.keys(this.scannedData)) {
            const lowerParentKey = parentKey.toLowerCase().trim();
            // Nếu Menu Cha hiện tại không khớp với parentAliases thì bỏ qua, không tìm bên trong
            if (!lowerParentAliases.some(alias => lowerParentKey.includes(alias) || lowerParentKey === alias)) {
                continue;
            }

            const subMenus = this.scannedData[parentKey];
            if (!Array.isArray(subMenus)) continue;

            for (const sub of subMenus) {
                const lowerSub = sub.toLowerCase().trim();
                // Kiểm tra xem menu con hiện tại có khớp (hoặc chứa) từ khóa nào trong danh sách không
                if (lowerSubAliases.some(alias => lowerSub.includes(alias) || lowerSub === alias)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Kiểm tra sự tồn tại của Menu Cha
     */
    public static hasTopMenu(aliases: string[]): boolean {
        this.loadData();
        if (!this.scannedData) return false;

        const lowerAliases = aliases.map(a => a.toLowerCase().trim());
        const parentKeys = Object.keys(this.scannedData).map(k => k.toLowerCase().trim());

        return parentKeys.some(parent => 
            lowerAliases.some(alias => parent.includes(alias) || parent === alias)
        );
    }
}
