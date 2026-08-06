export interface FigmaFrame {
    id: string;
    name: string;
    page: string;
    y: number;
    height: number;
    topLevelFrame?: string;
    type?: string;
}

export interface UiSectionTestData {
    page: string;
    path: string;
    sectionName: string;
    selector: string;
    figmaNodeId: string | null;
    figmaFrameName: string | null;
    matchScore: number;
}

/**
 * Cấu trúc file scanned-figma-frames.json
 */
export interface ScannedFigmaFramesFile {
    timestamp: string;
    fileKey: string;
    frames: FigmaFrame[];
}
