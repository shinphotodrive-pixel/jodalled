export interface StandardCriterion {
  id: string;
  category: 'optical' | 'environment' | 'electrical' | 'vibration';
  categoryLabel: string;
  item: string;
  criterion: string;
  basis: string;
  complianceLevel: string;
  detailNote: string;
}

export interface VendorSpec {
  id: 'geona' | 'seo' | 'unisecu';
  name: string;
  model: string;
  badge: string;
  badgeColor: string;
  themeColor: string;
  summary: string;
  radarScores: number[]; // [다차로 커버리지, AI 센서 융합도, 파장/광량 제어, 설치/단일 함체성, 보안/암호화]
  specs: {
    systemType: string;
    cameraSensor: string;
    lightSource: string;
    wavelength: string;
    powerDrive: string;
    controlMech: string;
    estimatedCost: string;
    keyFeature: string;
  };
  highlights: string[];
  strengths: string[];
  limitations: string[];
  recommendedSite: string;
}

export interface SimulatorState {
  weather: 'clear' | 'fog' | 'rain' | 'tunnel';
  plateType: 'film' | 'paint' | 'damaged';
  distance: number; // 10 to 50 meters
  vehicleSpeed: number; // 30 to 180 km/h
  smartIr: boolean;
  exir: boolean;
  aiHdr: boolean;
  nightMode: boolean;
}

export interface SceneProduct {
  id: string;
  model: string;
  officialCode?: string;
  nameKr: string;
  nameEn: string;
  category: 'high-power-strobe' | 'continuous-fill' | 'dual-hybrid' | 'housing-integrated';
  categoryLabel: string;
  ledCount: number;
  ledBrand: string;
  colorTemp: string;
  wavelength: string;
  beamAngle: string;
  luminousFlux: string; // e.g. "≥ 5,200 lm"
  effectiveDistance: string;
  powerSupply: string;
  averagePower: string;
  peakPower: string;
  powerWattsNum?: number;
  fluxLmNum?: number;
  beamAngleMinDeg?: number;
  beamAngleMaxDeg?: number;
  triggerSync: string;
  protectionRating: string;
  operatingTemp: string;
  housingMaterial: string;
  alibabaUrl: string;
  officialUrl?: string;
  targetApplications: string[];
  keyFeatures: string[];
  specsTable: { label: string; value: string }[];
}
