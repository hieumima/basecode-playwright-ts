import * as fs from 'fs';
import * as path from 'path';

export class FeatureHelper {
    private static featureData: any = null;

    private static loadData() {
        if (!this.featureData) {
            try {
                const dataPath = path.resolve(__dirname, '../../data/templates/scanned-frontend.json');
                if (fs.existsSync(dataPath)) {
                    const rawData = fs.readFileSync(dataPath, 'utf-8');
                    this.featureData = JSON.parse(rawData);
                } else {
                    this.featureData = { features: {} };
                }
            } catch (error) {
                console.error("Lỗi đọc file scanned-features.json:", error);
                this.featureData = { features: {} };
            }
        }
    }

    /**
     * Kiểm tra xem website có chức năng tìm kiếm không (dựa trên kết quả quét tự động)
     */
    static hasSearchFeature(): boolean {
        this.loadData();
        return this.featureData?.features?.search === true;
    }
}
