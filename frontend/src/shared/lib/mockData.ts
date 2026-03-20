export interface HospitalType {
  id: string;
  name: string;
  category: string;
}

export const medicalTypes: HospitalType[] = [
  { id: 'h1', name: '요양병원', category: 'Medical' },
  { id: 'h2', name: '정신병원', category: 'Medical' },
  { id: 'h3', name: '가정의학과', category: 'Clinic' },
  { id: 'h4', name: '내과', category: 'Clinic' },
  { id: 'h5', name: '마취통증의학과', category: 'Clinic' },
  { id: 'h6', name: '비뇨의학과', category: 'Clinic' },
  { id: 'h7', name: '산부인과', category: 'Clinic' },
  { id: 'h8', name: '성형외과', category: 'Clinic' },
  { id: 'h9', name: '소아청소년과', category: 'Clinic' },
  { id: 'h10', name: '신경과', category: 'Clinic' },
  { id: 'h11', name: '안과', category: 'Clinic' },
  { id: 'h12', name: '외과', category: 'Clinic' },
  { id: 'h13', name: '이비인후과', category: 'Clinic' },
  { id: 'h14', name: '재활의학과', category: 'Clinic' },
  { id: 'h15', name: '정신건강의학과', category: 'Clinic' },
  { id: 'h16', name: '정형외과', category: 'Clinic' },
  { id: 'h17', name: '피부과', category: 'Clinic' },
  { id: 'h18', name: '흉부외과', category: 'Clinic' },
  { id: 'h19', name: '치과(병원)', category: 'Dental' },
  { id: 'h20', name: '한의원(병원)', category: 'Oriental' },
  { id: 'h21', name: '보건기관', category: 'Public' },
];

export const currentUser = {
  id: 'u1',
  name: '김관리',
  customClaims: {
    role: 'ADMIN',
    // Mocking that the user only has access to a specific subset, or 'all'.
    // Here we let them access everything for demo, but we can simulate no access to 'h2'
    accessibleModules: ['all'] as string[], // 'all' or array of hospital IDs
    // Let's pretend they don't have access to h2 (정신병원) for testing the UI
    deniedModules: [] as string[]
  }
};

export interface DentalProduct {
  id: string;
  code: string;
  category: string;
  name: string;
  manufacturer: string;
  spec: string;
  price: number;
  stock: number;
  isActive: boolean;
}

export const dentalProducts: DentalProduct[] = [
  { id: 'p1', code: 'DT-IMP-001', category: '임플란트', name: '오스템 TS III CA Fixture', manufacturer: '오스템임플란트', spec: '4.0 x 10mm', price: 95000, stock: 120, isActive: true },
  { id: 'p2', code: 'DT-IMP-002', category: '임플란트', name: '덴티움 SuperLine Fixture', manufacturer: '덴티움', spec: '4.5 x 10mm', price: 88000, stock: 85, isActive: true },
  { id: 'p3', code: 'DT-BRC-001', category: '교정', name: '클리피씨 브라켓', manufacturer: 'TOMY', spec: '1 Set (상/하)', price: 150000, stock: 45, isActive: true },
  { id: 'p4', code: 'DT-MTR-001', category: '인상재료', name: 'Aquasil Ultra Heavy', manufacturer: 'Dentsply Sirona', spec: '4 x 50ml', price: 62000, stock: 200, isActive: true },
  { id: 'p5', code: 'DT-MTR-002', category: '수복/접착재료', name: 'Filtek Z350 XT 라인업', manufacturer: '3M ESPE', spec: 'A2 Shade (4g)', price: 45000, stock: 320, isActive: true },
  { id: 'p6', code: 'DT-EQP-001', category: '치과장비', name: 'K3 유니트체어', manufacturer: '오스템임플란트', spec: '풀옵션 구성', price: 8500000, stock: 2, isActive: true },
  { id: 'p7', code: 'DT-INS-001', category: '진료용기구', name: '포셉 (상악대구치용)', manufacturer: 'Hu-Friedy', spec: 'No. 150', price: 110000, stock: 12, isActive: true },
  { id: 'p8', code: 'DT-MTR-003', category: '보존/엔도재료', name: 'ProTaper Next NiTi File', manufacturer: 'Dentsply Sirona', spec: 'X1-X3 25mm (3ea)', price: 78000, stock: 50, isActive: true },
  { id: 'p9', code: 'DT-HYG-001', category: '위생/기타', name: '치과용 라텍스 글러브', manufacturer: '세이프텍', spec: 'S / 100매', price: 6500, stock: 500, isActive: true },
  { id: 'p10', code: 'DT-CUT-001', category: '절삭/연마재료', name: '다이아몬드 버 (Round)', manufacturer: 'Mani', spec: 'BR-40 (5ea)', price: 12000, stock: 150, isActive: true },
];
