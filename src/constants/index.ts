import {
  ComplaintCategoryId,
  EscalationLevel,
  OfficerStaff,
  PlaceTypeId,
} from '../types';
import potholeImg from '../assets/images/sample_road_pothole_1795151712181.jpg';
import repairedRoadImg from '../assets/images/sample_road_repaired_1795151722341.jpg';
import garbageImg from '../assets/images/sample_garbage_point_1795151713477.jpg';
import cleanStreetImg from '../assets/images/sample_clean_street_1795151712072.jpg';
import devtalabTempleImg from '../assets/images/mauganj_devtalab_temple.jpg';
import townSquareImg from '../assets/images/mauganj_town_square.jpg';
import heritageGardenImg from '../assets/images/mauganj_heritage_garden.jpg';
import mauganjCleanStreetImg from '../assets/images/mauganj_clean_street.jpg';

// Center coordinates of Mauganj, Madhya Pradesh, India
export const MAUGANJ_CENTER = {
  lat: 24.6800,
  lng: 81.8800,
};

// Demo OTP constant (REAL INTEGRATION NOTE: Replace with SMS OTP gateway e.g. NIC/MSG91/CDAC SMS service)
export const DEMO_OTP = '1234';

// Official Madhya Pradesh e-Nagarpalika Citizen Tax Payment Portal
export const E_NAGARPALIKA_PORTAL_URL = 'https://enagarpalika.mp.gov.in/login';

// Sample complaint photos generated locally for demo workflows
export const SAMPLE_PHOTOS = {
  pothole: potholeImg,
  repairedRoad: repairedRoadImg,
  garbage: garbageImg,
  cleanStreet: cleanStreetImg,
};

// Realistic mock app screenshots for reporting technical/app-related glitches
export const SAMPLE_APP_SCREENSHOTS = {
  errorDialog: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" height="280">
      <defs>
        <linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
        <linearGradient id="topbar1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#1976d2"/>
          <stop offset="100%" stop-color="#0d47a1"/>
        </linearGradient>
      </defs>
      <rect width="400" height="280" rx="16" fill="url(#bg1)"/>
      <rect width="400" height="46" rx="16" fill="url(#topbar1)"/>
      <rect y="32" width="400" height="14" fill="url(#topbar1)"/>
      <circle cx="28" cy="23" r="9" fill="rgba(255,255,255,0.2)"/>
      <text x="46" y="28" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="700">मऊगंज सेवा · Mauganj Nagar Palika</text>
      <rect x="30" y="66" width="340" height="190" rx="14" fill="#ffffff"/>
      <circle cx="200" cy="106" r="22" fill="#fee2e2"/>
      <path d="M200 95v14M200 117v2" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>
      <text x="200" y="146" text-anchor="middle" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="800">ऐप नेटवर्क त्रुटि (Connection Timed Out)</text>
      <text x="200" y="166" text-anchor="middle" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="10.5">सर्वर से संपर्क नहीं हो सका · Error Code: 504_TIMEOUT</text>
      <rect x="65" y="180" width="270" height="22" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="200" y="195" text-anchor="middle" fill="#dc2626" font-family="monospace" font-size="9.5" font-weight="700">POST /api/v2/complaints (ERR_TIMEOUT)</text>
      <rect x="50" y="214" width="140" height="28" rx="8" fill="#e2e8f0"/>
      <text x="120" y="232" text-anchor="middle" fill="#475569" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="700">रद्द करें / Cancel</text>
      <rect x="210" y="214" width="140" height="28" rx="8" fill="#2563eb"/>
      <text x="280" y="232" text-anchor="middle" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="700">पुनः प्रयास करें / Retry</text>
    </svg>`
  )}`,
  mapGlitch: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" height="280">
      <defs>
        <linearGradient id="mapbg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1e293b"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <pattern id="grid1" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="400" height="280" rx="16" fill="url(#mapbg1)"/>
      <rect width="400" height="280" fill="url(#grid1)"/>
      <rect width="400" height="46" rx="16" fill="#0284c7"/>
      <rect y="32" width="400" height="14" fill="#0284c7"/>
      <text x="20" y="28" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="700">कचरा वाहन लाइव ट्रैकिंग (Garbage Van Live Map)</text>
      <path d="M 60 120 Q 140 80 200 140 T 340 180" fill="none" stroke="rgba(239,68,68,0.5)" stroke-width="3" stroke-dasharray="6 4"/>
      <circle cx="200" cy="140" r="14" fill="rgba(239,68,68,0.2)"/>
      <circle cx="200" cy="140" r="6" fill="#ef4444"/>
      <rect x="36" y="78" width="328" height="166" rx="14" fill="rgba(15,23,42,0.92)" stroke="#f59e0b" stroke-width="1.5"/>
      <path d="M200 98 L218 130 L182 130 Z" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
      <path d="M200 110v8M200 122v2" stroke="#b45309" stroke-width="2" stroke-linecap="round"/>
      <text x="200" y="152" text-anchor="middle" fill="#fef08a" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="800">मैप टाइल्स लोड नहीं हो सकीं (Map Loading Error)</text>
      <text x="200" y="172" text-anchor="middle" fill="#e2e8f0" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="10.5">GPS सिग्नल कनेक्शन त्रुटि · Code: ERR_MAPBOX_TIMEOUT</text>
      <rect x="65" y="186" width="270" height="20" rx="5" fill="#334155"/>
      <text x="200" y="200" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="9">Lat: 24.6800° N, Lng: 81.8800° E (Signal Offline)</text>
      <rect x="130" y="214" width="140" height="24" rx="6" fill="#f59e0b"/>
      <text x="200" y="230" text-anchor="middle" fill="#78350f" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="800">रिफ्रेश करें / Reload Map</text>
    </svg>`
  )}`,
};

export const MUNICIPAL_GALLERY = {
  pothole: potholeImg,
  repairedRoad: repairedRoadImg,
  garbage: garbageImg,
  cleanStreet: cleanStreetImg,
  temple: devtalabTempleImg,
  townSquare: townSquareImg,
  heritageGarden: heritageGardenImg,
  mauganjCleanStreet: mauganjCleanStreetImg,
};

// Editable municipal wards of Mauganj Nagar Palika
export interface WardInfo {
  id: number;
  nameHi: string;
  nameEn: string;
  lat: number;
  lng: number;
}

export const WARDS: WardInfo[] = [
  { id: 1, nameHi: 'वार्ड 1 - चाक रोड / एलआईसी क्षेत्र', nameEn: 'Ward 1 - Chak Road / LIC Area', lat: 24.677, lng: 81.874 },
  { id: 2, nameHi: 'वार्ड 2 - रीवा रोड (NH-135)', nameEn: 'Ward 2 - Rewa Road (NH-135)', lat: 24.674, lng: 81.868 },
  { id: 3, nameHi: 'वार्ड 3 - नगर पालिका एवं मुख्य बाजार', nameEn: 'Ward 3 - Nagar Palika & Main Market', lat: 24.680, lng: 81.879 },
  { id: 4, nameHi: 'वार्ड 4 - छोटी बाजार', nameEn: 'Ward 4 - Chhoti Bazar', lat: 24.681, lng: 81.882 },
  { id: 5, nameHi: 'वार्ड 5 - सिविल लाइन / कलेक्ट्रेट क्षेत्र', nameEn: 'Ward 5 - Civil Lines / Collectorate Area', lat: 24.686, lng: 81.876 },
  { id: 6, nameHi: 'वार्ड 6 - घुरेहटा मोहल्ला', nameEn: 'Ward 6 - Ghurehata Mohalla', lat: 24.685, lng: 81.885 },
  { id: 7, nameHi: 'वार्ड 7 - मऊगंज बस स्टैंड', nameEn: 'Ward 7 - Mauganj Bus Stand', lat: 24.679, lng: 81.877 },
  { id: 8, nameHi: 'वार्ड 8 - भाटी मोड़ / सीधी रोड', nameEn: 'Ward 8 - Bhati Mod / Sidhi Road', lat: 24.671, lng: 81.883 },
  { id: 9, nameHi: 'वार्ड 9 - हनुमना रोड (NH-135)', nameEn: 'Ward 9 - Hanumana Road (NH-135)', lat: 24.688, lng: 81.891 },
  { id: 10, nameHi: 'वार्ड 10 - पटेरी मोहल्ला', nameEn: 'Ward 10 - Pateri Mohalla', lat: 24.676, lng: 81.886 },
  { id: 11, nameHi: 'वार्ड 11 - कटरा रोड / कृषि मंडी', nameEn: 'Ward 11 - Katra Road / Krishi Mandi', lat: 24.689, lng: 81.872 },
  { id: 12, nameHi: 'वार्ड 12 - देवतलाब रोड', nameEn: 'Ward 12 - Devtalab Road', lat: 24.673, lng: 81.892 },
  { id: 13, nameHi: 'वार्ड 13 - पुरानी बस्ती', nameEn: 'Ward 13 - Purani Basti', lat: 24.683, lng: 81.873 },
  { id: 14, nameHi: 'वार्ड 14 - नई बस्ती', nameEn: 'Ward 14 - Nai Basti', lat: 24.692, lng: 81.881 },
  { id: 15, nameHi: 'वार्ड 15 - बजरंग नगर / गायत्री मंदिर क्षेत्र', nameEn: 'Ward 15 - Bajrang Nagar / Gayatri Mandir', lat: 24.669, lng: 81.876 },
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
    id: 'handpump',
    slaHours: 48,
    labelHi: 'हैंडपंप मरम्मत',
    labelEn: 'Handpump repair',
    deptHi: 'जल प्रदाय एवं हैंडपंप शाखा',
    deptEn: 'Water Works & Handpump Branch',
  },
  {
    id: 'water',
    slaHours: 48,
    labelHi: 'पेयजल आपूर्ति पाइप लाइन मरम्मत',
    labelEn: 'Drinking water pipeline repair',
    deptHi: 'जल प्रदाय शाखा',
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
    labelHi: 'आवारा, घायल या मृत पशु',
    labelEn: 'Stray, injured or dead animal',
    deptHi: 'पशु नियंत्रण एवं स्वच्छता दल',
    deptEn: 'Cattle Control & Sanitation Squad',
  },
  {
    id: 'other',
    slaHours: 96,
    labelHi: 'अन्य नगर समस्या',
    labelEn: 'Other',
    deptHi: 'सामान्य प्रशासन',
    deptEn: 'General Administration',
  },
  {
    id: 'app_issue',
    slaHours: 24,
    labelHi: 'ऐप संबंधित समस्या (Admin)',
    labelEn: 'App Related Issue (Admin)',
    deptHi: 'नगर पालिका IT एवं प्रशासन (Admin)',
    deptEn: 'Municipal IT & Admin',
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
    subtitleEn: 'Mauganj police control room (Sample number)',
    sampleNumber: '1800-000-0100',
    category: 'police',
  },
  {
    id: 'hl-municipal',
    titleHi: 'नगर पालिका मऊगंज कार्यालय',
    titleEn: 'Nagar Palika Office',
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
