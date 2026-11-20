import {
  ComplaintCategoryId,
  EscalationLevel,
  OfficerStaff,
  PlaceTypeId,
} from '../types';

// Center coordinates of Maugang (Mauganj), Madhya Pradesh, India
export const MAUGANG_CENTER = {
  lat: 24.6775,
  lng: 81.8825,
};

// Demo OTP constant (REAL INTEGRATION NOTE: Replace with SMS OTP gateway e.g. NIC/MSG91/CDAC SMS service)
export const DEMO_OTP = '1234';

// Sample complaint photos generated locally for demo workflows
export const SAMPLE_PHOTOS = {
  pothole: '/src/assets/images/sample_road_pothole_1795151712181.jpg',
  repairedRoad: '/src/assets/images/sample_road_repaired_1795151722341.jpg',
  garbage: '/src/assets/images/sample_garbage_point_1795151713477.jpg',
  cleanStreet: '/src/assets/images/sample_clean_street_1795151712072.jpg',
};

// Editable municipal wards of Maugang Nagar Palika
export interface WardInfo {
  id: number;
  nameHi: string;
  nameEn: string;
  lat: number;
  lng: number;
}

export const WARDS: WardInfo[] = [
  { id: 1, nameHi: 'वार्ड 1 - रीवा रोड (NH-135)', nameEn: 'Ward 1 - Rewa Road (NH-135)', lat: 24.668, lng: 81.869 },
  { id: 2, nameHi: 'वार्ड 2 - हनुमना रोड', nameEn: 'Ward 2 - Hanumana Road', lat: 24.685, lng: 81.894 },
  { id: 3, nameHi: 'वार्ड 3 - चक रोड (नगर पालिका क्षेत्र)', nameEn: 'Ward 3 - Chak Road (Municipal Area)', lat: 24.678, lng: 81.886 },
  { id: 4, nameHi: 'वार्ड 4 - छोटी बाजार (मुख्य बाजार)', nameEn: 'Ward 4 - Chhoti Bazar (Main Market)', lat: 24.677, lng: 81.882 },
  { id: 5, nameHi: 'वार्ड 5 - सिविल लाइन एवं कलेक्ट्रेट', nameEn: 'Ward 5 - Civil Lines & Collectorate', lat: 24.683, lng: 81.878 },
  { id: 6, nameHi: 'वार्ड 6 - अस्पताल कॉलोनी', nameEn: 'Ward 6 - Hospital Colony', lat: 24.681, lng: 81.885 },
  { id: 7, nameHi: 'वार्ड 7 - मुख्य बस स्टैंड', nameEn: 'Ward 7 - Main Bus Stand', lat: 24.676, lng: 81.879 },
  { id: 8, nameHi: 'वार्ड 8 - देवतालाब रोड', nameEn: 'Ward 8 - Devtalab Road', lat: 24.669, lng: 81.873 },
  { id: 9, nameHi: 'वार्ड 9 - नईगढ़ी रोड एवं कृषि मंडी', nameEn: 'Ward 9 - Nai Garhi Road & Mandi', lat: 24.687, lng: 81.881 },
  { id: 10, nameHi: 'वार्ड 10 - सब्जी मंडी मोहल्ला', nameEn: 'Ward 10 - Sabji Mandi Mohalla', lat: 24.675, lng: 81.884 },
  { id: 11, nameHi: 'वार्ड 11 - तहसील एवं कोर्ट क्षेत्र', nameEn: 'Ward 11 - Tehsil & Court Area', lat: 24.684, lng: 81.873 },
  { id: 12, nameHi: 'वार्ड 12 - बहुती प्रपात मार्ग', nameEn: 'Ward 12 - Bahuti Waterfall Road', lat: 24.672, lng: 81.893 },
  { id: 13, nameHi: 'वार्ड 13 - पुरानी बस्ती (किला टोला)', nameEn: 'Ward 13 - Purani Basti (Qila Tola)', lat: 24.679, lng: 81.875 },
  { id: 14, nameHi: 'वार्ड 14 - नई बस्ती (शास्त्री नगर)', nameEn: 'Ward 14 - Nai Basti (Shastri Nagar)', lat: 24.689, lng: 81.886 },
  { id: 15, nameHi: 'वार्ड 15 - खटखरी लिंक रोड', nameEn: 'Ward 15 - Khatkhari Link Road', lat: 24.666, lng: 81.888 },
];

// Editable complaint categories and SLA durations (in hours)
export interface CategoryConfig {
  id: ComplaintCategoryId;
  slaHours: number;
  labelHi: string;
  labelEn: string;
  deptHi: string;
  deptEn: string;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    id: 'water',
    slaHours: 48,
    labelHi: 'पेयजल आपूर्ति',
    labelEn: 'Water supply',
    deptHi: 'जल प्रदाय विभाग',
    deptEn: 'Water Works Dept',
  },
  {
    id: 'streetlight',
    slaHours: 72,
    labelHi: 'स्ट्रीट लाइट',
    labelEn: 'Street light',
    deptHi: 'विद्युत शाखा',
    deptEn: 'Electrical Wing',
  },
  {
    id: 'sanitation',
    slaHours: 24,
    labelHi: 'स्वच्छता एवं कचरा',
    labelEn: 'Sanitation',
    deptHi: 'स्वास्थ्य एवं स्वच्छता विभाग',
    deptEn: 'Health & Sanitation Dept',
  },
  {
    id: 'roads',
    slaHours: 120,
    labelHi: 'सड़क मरम्मत',
    labelEn: 'Roads',
    deptHi: 'लोक निर्माण शाखा',
    deptEn: 'Public Works Dept',
  },
  {
    id: 'drainage',
    slaHours: 48,
    labelHi: 'नाली एवं जल निकासी',
    labelEn: 'Drainage',
    deptHi: 'जल निकासी एवं स्वच्छता',
    deptEn: 'Drainage & Sanitation',
  },
  {
    id: 'cattle',
    slaHours: 24,
    labelHi: 'आवारा या घायल पशु',
    labelEn: 'Stray or injured cattle',
    deptHi: 'पशु नियंत्रण दल',
    deptEn: 'Cattle Control Squad',
  },
  {
    id: 'other',
    slaHours: 96,
    labelHi: 'अन्य नगर समस्या',
    labelEn: 'Other',
    deptHi: 'सामान्य प्रशासन',
    deptEn: 'General Administration',
  },
];

export const CATEGORY_SLA_MAP: Record<ComplaintCategoryId, number> = CATEGORIES.reduce(
  (acc, item) => {
    acc[item.id] = item.slaHours;
    return acc;
  },
  {} as Record<ComplaintCategoryId, number>
);

// Escalation thresholds based on % of SLA elapsed for unresolved complaints
export const ESCALATION_THRESHOLDS = {
  dept_head: 50,
  cmo: 100,
  president: 150,
} as const;

export function getEscalationLevel(
  createdAt: string,
  category: ComplaintCategoryId,
  status: string,
  nowMs: number = Date.now()
): EscalationLevel {
  if (status === 'Resolved' || status === 'Closed') return 'none';
  const slaMs = CATEGORY_SLA_MAP[category] * 60 * 60 * 1000;
  const elapsedMs = nowMs - new Date(createdAt).getTime();
  const pct = (elapsedMs / slaMs) * 100;
  if (pct >= ESCALATION_THRESHOLDS.president) return 'president';
  if (pct >= ESCALATION_THRESHOLDS.cmo) return 'cmo';
  if (pct >= ESCALATION_THRESHOLDS.dept_head) return 'dept_head';
  return 'none';
}

export function getSlaInfo(
  createdAt: string,
  category: ComplaintCategoryId,
  status: string,
  nowMs: number = Date.now()
) {
  const slaHours = CATEGORY_SLA_MAP[category];
  const createdMs = new Date(createdAt).getTime();
  const dueMs = createdMs + slaHours * 60 * 60 * 1000;
  const remainingMs = dueMs - nowMs;
  const isClosedOrResolved = status === 'Resolved' || status === 'Closed';
  const isOverdue = !isClosedOrResolved && remainingMs < 0;
  const elapsedPct = Math.round(((nowMs - createdMs) / (slaHours * 60 * 60 * 1000)) * 100);
  return {
    slaHours,
    dueDate: new Date(dueMs),
    remainingMs,
    isOverdue,
    elapsedPct,
  };
}

// Sample field staff (fictional demo names only)
export const OFFICER_STAFF: OfficerStaff[] = [
  { id: 'staff-1', nameHi: 'अरुण कुमार साहू (फील्ड स्टाफ)', nameEn: 'Arun Kumar Sahu (Field Staff)', department: 'sanitation', wards: [1, 2, 3, 4, 8] },
  { id: 'staff-2', nameHi: 'दीपक तिवारी (फील्ड स्टाफ)', nameEn: 'Deepak Tiwari (Field Staff)', department: 'water', wards: [4, 5, 6, 7, 10] },
  { id: 'staff-3', nameHi: 'महेंद्र सिंह (फील्ड स्टाफ)', nameEn: 'Mahendra Singh (Field Staff)', department: 'streetlight', wards: [1, 3, 9, 11, 12] },
  { id: 'staff-4', nameHi: 'कविता पटेल (फील्ड स्टाफ)', nameEn: 'Kavita Patel (Field Staff)', department: 'roads', wards: [2, 5, 13, 14, 15] },
  { id: 'staff-5', nameHi: 'संतोष विश्वकर्मा (फील्ड स्टाफ)', nameEn: 'Santosh Vishwakarma (Field Staff)', department: 'drainage', wards: [6, 7, 8, 10, 13] },
];

// Nearby Place Types (15 categories as specified)
export interface PlaceTypeConfig {
  id: PlaceTypeId;
  labelHi: string;
  labelEn: string;
}

export const PLACE_TYPES: PlaceTypeConfig[] = [
  { id: 'hospital', labelHi: 'अस्पताल', labelEn: 'Hospital' },
  { id: 'blood_bank', labelHi: 'ब्लड बैंक', labelEn: 'Blood bank' },
  { id: 'police', labelHi: 'पुलिस थाना', labelEn: 'Police station' },
  { id: 'bank_atm', labelHi: 'बैंक / एटीएम', labelEn: 'Bank/ATM' },
  { id: 'post_office', labelHi: 'डाकघर', labelEn: 'Post office' },
  { id: 'public_toilet', labelHi: 'सार्वजनिक शौचालय', labelEn: 'Public toilet' },
  { id: 'petrol_pump', labelHi: 'पेट्रोल पंप', labelEn: 'Petrol pump' },
  { id: 'lpg', labelHi: 'एलपीजी गैस', labelEn: 'LPG' },
  { id: 'parking', labelHi: 'पार्किंग', labelEn: 'Parking' },
  { id: 'bus_taxi', labelHi: 'बस / टैक्सी स्टैंड', labelEn: 'Bus/taxi stand' },
  { id: 'school', labelHi: 'विद्यालय', labelEn: 'School' },
  { id: 'library', labelHi: 'पुस्तकालय', labelEn: 'Library' },
  { id: 'market', labelHi: 'बाजार', labelEn: 'Market' },
  { id: 'dharamshala', labelHi: 'धर्मशाला', labelEn: 'Dharamshala' },
  { id: 'hotel', labelHi: 'होटल', labelEn: 'Hotel' },
];

// Emergency Helplines (Obvious sample placeholder numbers — NOT real emergency numbers)
export interface HelplineItem {
  id: string;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  sampleNumber: string;
  category: 'fire' | 'ambulance' | 'police' | 'municipal' | 'women' | 'electricity';
}

export const HELPLINES: HelplineItem[] = [
  {
    id: 'hl-fire',
    titleHi: 'अग्निशमन (फायर ब्रिगेड)',
    titleEn: 'Fire Brigade',
    subtitleHi: 'आग लगने की आपात स्थिति (नमूना नंबर)',
    subtitleEn: 'Fire emergency response (Sample number)',
    sampleNumber: '1800-000-0101',
    category: 'fire',
  },
  {
    id: 'hl-ambulance',
    titleHi: 'एम्बुलेंस सेवा',
    titleEn: 'Ambulance Service',
    subtitleHi: 'चिकित्सा आपातकाल 24×7 (नमूना नंबर)',
    subtitleEn: 'Medical emergency 24x7 (Sample number)',
    sampleNumber: '1800-000-0108',
    category: 'ambulance',
  },
  {
    id: 'hl-police',
    titleHi: 'पुलिस सहायता',
    titleEn: 'Police Helpline',
    subtitleHi: 'मऊगंज पुलिस नियंत्रण कक्ष (नमूना नंबर)',
    subtitleEn: 'Maugang police control room (Sample number)',
    sampleNumber: '1800-000-0100',
    category: 'police',
  },
  {
    id: 'hl-municipal',
    titleHi: 'नगर पालिका मऊगंज कार्यालय',
    titleEn: 'Maugang Nagar Palika Office',
    subtitleHi: 'नागरिक सुविधा एवं शिकायत केंद्र (नमूना नंबर)',
    subtitleEn: 'Citizen desk & grievance cell (Sample number)',
    sampleNumber: '07663-000-311',
    category: 'municipal',
  },
  {
    id: 'hl-women',
    titleHi: 'महिला हेल्पलाइन',
    titleEn: 'Women Helpline',
    subtitleHi: 'महिला सुरक्षा एवं परामर्श (नमूना नंबर)',
    subtitleEn: 'Women safety & assistance (Sample number)',
    sampleNumber: '1800-000-1090',
    category: 'women',
  },
  {
    id: 'hl-electricity',
    titleHi: 'विद्युत फॉल्ट शिकायत',
    titleEn: 'Electricity Fault',
    subtitleHi: 'बिजली आपूर्ति एवं ट्रांसफार्मर खराबी (नमूना नंबर)',
    subtitleEn: 'Power outage & transformer fault (Sample number)',
    sampleNumber: '1800-000-1912',
    category: 'electricity',
  },
];
