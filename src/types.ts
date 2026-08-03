export interface GoogleReview {
  author: string;
  publishTime: string;
  text: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'automatyka' | 'alarmy' | 'ogrodzenia' | 'monitoring';
  categoryLabel: string;
  location: string;
  year: string;
  description: string;
  features: string[];
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface EstimationConfig {
  serviceType: 'automatyka' | 'monitoring' | 'alarmy' | 'ogrodzenia';
  gateType?: 'przesuwna' | 'skrzydlowa' | 'garażowa';
  gateWeight?: 'lekka' | 'srednia' | 'ciezka';
  camerasCount?: number;
  alarmSensorsCount?: number;
  fenceMeters?: number;
  includeInstallation: boolean;
  smartHomeIntegration: boolean;
}
