import React from 'react';
import {
  AlertCircle,
  Construction,
  Droplets,
  Lightbulb,
  PawPrint,
  Smartphone,
  Trash2,
  Waves,
  Wrench,
} from 'lucide-react';
import { ComplaintCategoryId } from '../types';

export interface ProblemCategoryItem {
  id: ComplaintCategoryId;
  labelHi: string;
  labelEn: string;
  shortLabelHi: string;
  shortLabelEn: string;
  descHi: string;
  descEn: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  slaHours: number;
  deptHi: string;
  deptEn: string;
}

export const PROBLEM_CATEGORIES: ProblemCategoryItem[] = [
  {
    id: 'handpump',
    labelHi: 'हैंडपंप मरम्मत',
    labelEn: 'Handpump Repair',
    shortLabelHi: 'हैंडपंप मरम्मत',
    shortLabelEn: 'Handpump Repair',
    descHi: 'हैंडपंप खराब, जल रिसाव या हैंडल समस्या',
    descEn: 'Faulty handpump, leakage or handle repair',
    icon: Wrench,
    iconBg: 'bg-[#E0F2FE] text-[#0284C7] dark:bg-[#0C4A6E] dark:text-[#38BDF8]',
    slaHours: 48,
    deptHi: 'जल प्रदाय एवं हैंडपंप शाखा',
    deptEn: 'Water Works & Handpump Branch',
  },
  {
    id: 'water',
    labelHi: 'पेयजल आपूर्ति पाइप लाइन मरम्मत',
    labelEn: 'Drinking Water Pipeline Repair',
    shortLabelHi: 'पेयजल पाइपलाइन',
    shortLabelEn: 'Water Pipeline',
    descHi: 'मुख्य पाइपलाइन लीकेज, वाल्व खराबी या दूषित जल',
    descEn: 'Pipeline leak, low pressure or contaminated water',
    icon: Droplets,
    iconBg: 'bg-[#DBEAFE] text-[#2563EB] dark:bg-[#1E3A8A] dark:text-[#60A5FA]',
    slaHours: 48,
    deptHi: 'जल प्रदाय शाखा',
    deptEn: 'Water Works Dept',
  },
  {
    id: 'cattle',
    labelHi: 'आवारा, घायल या मृत पशु',
    labelEn: 'Stray, Injured or Dead Animal',
    shortLabelHi: 'आवारा / मृत पशु',
    shortLabelEn: 'Stray/Dead Cattle',
    descHi: 'मार्ग अवरोधक मवेशी, घायल या मृत पशु निष्कासन',
    descEn: 'Stray cattle on road, injured animal or carcass disposal',
    icon: PawPrint,
    iconBg: 'bg-[#FFE4E6] text-[#E11D48] dark:bg-[#881337] dark:text-[#FB7185]',
    slaHours: 24,
    deptHi: 'पशु नियंत्रण एवं स्वच्छता दल',
    deptEn: 'Cattle Control & Sanitation Squad',
  },
  {
    id: 'sanitation',
    labelHi: 'स्वच्छता एवं कचरा',
    labelEn: 'Sanitation & Garbage',
    shortLabelHi: 'कचरा व सफाई',
    shortLabelEn: 'Garbage & Clean',
    descHi: 'डस्टबिन भरा होना, सड़क पर कचरा ढेर या गंदगी',
    descEn: 'Overflowing dustbin, street garbage heap',
    icon: Trash2,
    iconBg: 'bg-[#DCFCE7] text-[#16A34A] dark:bg-[#14532D] dark:text-[#4ADE80]',
    slaHours: 24,
    deptHi: 'स्वास्थ्य एवं स्वच्छता विभाग',
    deptEn: 'Health & Sanitation Dept',
  },
  {
    id: 'roads',
    labelHi: 'सड़क मरम्मत',
    labelEn: 'Road Repair & Potholes',
    shortLabelHi: 'सड़क मरम्मत',
    shortLabelEn: 'Road Repair',
    descHi: 'सड़क पर गड्ढा, उखड़ा डामर या दुर्घटना संभावित स्थल',
    descEn: 'Potholes, broken asphalt or road repair',
    icon: Construction,
    iconBg: 'bg-[#FFEDD5] text-[#EA580C] dark:bg-[#7C2D12] dark:text-[#FB923C]',
    slaHours: 120,
    deptHi: 'लोक निर्माण शाखा',
    deptEn: 'Public Works Dept',
  },
  {
    id: 'streetlight',
    labelHi: 'स्ट्रीट लाइट',
    labelEn: 'Street Light',
    shortLabelHi: 'स्ट्रीट लाइट',
    shortLabelEn: 'Street Light',
    descHi: 'खंभे की लाइट बंद, झूलते तार या अंधेरा',
    descEn: 'Non-functional street light or hanging wires',
    icon: Lightbulb,
    iconBg: 'bg-[#FEF9C3] text-[#CA8A04] dark:bg-[#713F12] dark:text-[#FACC15]',
    slaHours: 72,
    deptHi: 'विद्युत शाखा',
    deptEn: 'Electrical Wing',
  },
  {
    id: 'drainage',
    labelHi: 'नाली एवं जल निकासी',
    labelEn: 'Drainage & Sewage',
    shortLabelHi: 'नाली निकासी',
    shortLabelEn: 'Drainage',
    descHi: 'नाली चोक, गंदे पानी का भराव या टूटी नाली',
    descEn: 'Choked drain, wastewater overflow or broken drain',
    icon: Waves,
    iconBg: 'bg-[#CCFBF1] text-[#0D9488] dark:bg-[#115E59] dark:text-[#2DD4BF]',
    slaHours: 48,
    deptHi: 'जल निकासी एवं स्वच्छता',
    deptEn: 'Drainage & Sanitation',
  },
  {
    id: 'app_issue',
    labelHi: 'ऐप संबंधित समस्या',
    labelEn: 'App Related Issue',
    shortLabelHi: 'ऐप समस्या',
    shortLabelEn: 'App Issue',
    descHi: 'लॉगिन, OTP, मैप या ऐप में कोई बग / दिक्कत',
    descEn: 'Login, OTP, map or mobile app technical glitches',
    icon: Smartphone,
    iconBg: 'bg-[#F3E8FF] text-[#9333EA] dark:bg-[#581C87] dark:text-[#C084FC]',
    slaHours: 24,
    deptHi: 'नगर पालिका IT एवं प्रशासन (Admin)',
    deptEn: 'Municipal IT & Admin',
  },
  {
    id: 'other',
    labelHi: 'अन्य नगर समस्या',
    labelEn: 'Other Civic Problem',
    shortLabelHi: 'अन्य समस्या',
    shortLabelEn: 'Other Problem',
    descHi: 'पार्क रखरखाव, अतिक्रमण या अन्य सार्वजनिक समस्या',
    descEn: 'Park maintenance, encroachment or other issues',
    icon: AlertCircle,
    iconBg: 'bg-[#F1F5F9] text-[#64748B] dark:bg-[#334155] dark:text-[#94A3B8]',
    slaHours: 96,
    deptHi: 'सामान्य प्रशासन',
    deptEn: 'General Administration',
  },
];
