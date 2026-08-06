export interface SeoPageTestData {
  name: string;
  path: string;
  priority: string;
  severity: string;
  seoPassThreshold?: number;
  checkCoreWebVitals?: boolean;
}


export { seoTestData } from './seoGeneratedData';
