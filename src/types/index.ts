export interface DeviceSpec {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  tagline: string;
  imageUrl: string;
  secondaryImageUrl: string;
  modes: DeviceMode[];
  keySpecs: {
    label: string;
    value: string;
    detail: string;
  }[];
  advantages: string[];
  certifications: string[];
}

export interface DeviceMode {
  id: string;
  name: string;
  nameKr: string;
  frequency: string;
  frequencyValue: number; // in kHz
  penetrationDepth: string; // in mm
  deliveryRate: number; // in %
  ledWavelength: string; // e.g. 630nm Red LED
  color: string;
  description: string;
  recommendedFor: string;
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  patientInfo: string;
  treatmentCount: string;
  protocolUsed: string;
  beforeImage: string;
  afterImage: string;
  metrics: {
    hydration: string;
    elasticity: string;
    poreReduction: string;
    pigmentReduction: string;
  };
  summary: string;
}

export interface TechInnovation {
  id: string;
  number: string;
  title: string;
  subTitle: string;
  description: string;
  iconName: string;
  patentNo: string;
  tags: string[];
  clinicalBenefit: string;
}

export interface DoctorReview {
  id: string;
  doctorName: string;
  hospitalName: string;
  position: string;
  avatar: string;
  quote: string;
  treatmentStats: string;
}

export interface Certification {
  id: string;
  organization: string;
  title: string;
  docNumber: string;
  validThrough: string;
  badgeText: string;
  description: string;
  issuerLogoText: string;
}

export interface AtonPlusSolution {
  id: string;
  code: string;
  name: string;
  volume: string;
  target: string;
  color: string;
  description: string;
  keyIngredients: {
    name: string;
    role: string;
  }[];
  effects: string[];
}

export interface ComparisonRow {
  category: string;
  surgery: string;
  airjetHifu: string;
  theCelljet: string;
  theCelljetHighlight?: boolean;
}
