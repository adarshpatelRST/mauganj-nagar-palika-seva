export type Language = 'hi' | 'en';

export type AppMode = 'citizen' | 'officer';

export type OfficerRole = 'field_staff' | 'dept_officer' | 'cmo' | 'mayor' | 'admin';

export type CitizenTab = 'home' | 'report' | 'services' | 'nearby' | 'profile';

export type CitizenScreen =
  | 'home'
  | 'report'
  | 'services'
  | 'nearby'
  | 'profile'
  | 'complaints'
  | 'complaint_detail'
  | 'helplines'
  | 'bills'
  | 'garbage'
  | 'temple'
  | 'cityinfo'
  | 'notifications'
  | 'about'
  | 'faq'
  | 'terms'
  | 'privacy'
  | 'auth';

export type ComplaintCategoryId =
  | 'water'
  | 'streetlight'
  | 'sanitation'
  | 'roads'
  | 'drainage'
  | 'cattle'
  | 'other';

export type ComplaintStatus =
  | 'Registered'
  | 'Assigned'
  | 'In progress'
  | 'Resolved'
  | 'Closed'
  | 'Reopened';

export type EscalationLevel = 'none' | 'dept_head' | 'cmo' | 'president';

export interface ComplaintHistoryItem {
  time: string;
  status: ComplaintStatus;
  note: string;
  by: string;
}

export interface Complaint {
  id: string;
  mobile: string;
  name: string;
  ward: number;
  category: ComplaintCategoryId;
  landmark: string;
  lat?: number;
  lng?: number;
  description?: string;
  beforePhoto?: string;
  afterPhoto?: string;
  createdAt: string;
  status: ComplaintStatus;
  assignedTo?: string;
  rating?: number;
  ratingComment?: string;
  history: ComplaintHistoryItem[];
}

export type PlaceTypeId =
  | 'hospital'
  | 'blood_bank'
  | 'police'
  | 'bank_atm'
  | 'post_office'
  | 'public_toilet'
  | 'petrol_pump'
  | 'lpg'
  | 'parking'
  | 'bus_taxi'
  | 'school'
  | 'library'
  | 'market'
  | 'dharamshala'
  | 'hotel';

export interface Place {
  id: string;
  type: PlaceTypeId;
  name: string;
  nameHi: string;
  address: string;
  addressHi: string;
  lat: number;
  lng: number;
  phone: string;
}

export interface Notice {
  id: string;
  type: 'notice' | 'tender' | 'navratri';
  titleHi: string;
  titleEn: string;
  bodyHi: string;
  bodyEn: string;
  date: string;
  refNo: string;
}

export interface TaxAccount {
  propertyId: string;
  ownerNameHi: string;
  ownerNameEn: string;
  ward: number;
  addressHi: string;
  addressEn: string;
  propertyTaxDue: number;
  waterTaxDue: number;
  lastPaidDate: string;
}

export interface Payment {
  id: string;
  receiptNo: string;
  propertyId: string;
  taxType: 'property' | 'water';
  amount: number;
  method: 'UPI' | 'Card';
  paidAt: string;
  payerName: string;
}

export interface RouteStop {
  nameHi: string;
  nameEn: string;
  ward: number;
  lat: number;
  lng: number;
  etaOffsetMin: number;
}

export interface Route {
  id: string;
  vehicleNo: string;
  driverNameHi: string;
  driverNameEn: string;
  wardsCovered: number[];
  scheduleHi: string;
  scheduleEn: string;
  status?: 'on_route' | 'delayed' | 'completed';
  statusNoteHi?: string;
  statusNoteEn?: string;
  stops: RouteStop[];
}

export interface FestivalEvent {
  id: string;
  dateHi: string;
  dateEn: string;
  titleHi: string;
  titleEn: string;
  detailsHi: string;
  detailsEn: string;
  crowdLevel: 'low' | 'medium' | 'high';
}

export interface Contact {
  id: string;
  departmentHi: string;
  departmentEn: string;
  officerNameHi: string;
  officerNameEn: string;
  designationHi: string;
  designationEn: string;
  phone: string;
  officeHoursHi: string;
  officeHoursEn: string;
}

export interface WardDirectoryEntry {
  ward: number;
  areaHi: string;
  areaEn: string;
  councillorHi: string;
  councillorEn: string;
  wardOfficerHi: string;
  wardOfficerEn: string;
  phone: string;
}

export interface CertificateApplication {
  applicationId: string;
  type: 'birth' | 'death' | 'building';
  applicantHi: string;
  applicantEn: string;
  ward: number;
  submittedDate: string;
  statusHi: string;
  statusEn: string;
  remarksHi: string;
  remarksEn: string;
}

export interface LostAndFoundReport {
  id: string;
  type: 'lost' | 'found';
  itemHi: string;
  location: string;
  contactName: string;
  contactPhone: string;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  titleHi: string;
  titleEn: string;
  bodyHi: string;
  bodyEn: string;
  time: string;
  read: boolean;
  channel: 'SMS' | 'Push';
  complaintId?: string;
  targetMobile?: string;
}

export interface CitizenProfile {
  isAuthenticated: boolean;
  mobile: string;
  name: string;
  ward: number;
}

export interface CitizenAccount {
  mobile: string;
  name: string;
  ward: number;
  registeredAt: string;
}

export interface OfficerStaff {
  id: string;
  nameHi: string;
  nameEn: string;
  department: ComplaintCategoryId | 'all';
  wards: number[];
}

export interface Employee extends OfficerStaff {
  empCode: string;
  mobile: string;
  pin: string;
  role: OfficerRole;
  active: boolean;
}

export interface ParkingZoneStatus {
  id: string;
  nameHi: string;
  nameEn: string;
  available: number;
  capacity: number;
  status: 'open' | 'tight' | 'full';
}

export interface DarshanTimingItem {
  id: string;
  labelHi: string;
  labelEn: string;
  time: string;
}

export interface TempleLiveFeed {
  crowdLevel: 'low' | 'medium' | 'high';
  ropewayStatusHi: string;
  ropewayStatusEn: string;
  stairsNoteHi: string;
  stairsNoteEn: string;
  toiletsWaterNoteHi: string;
  toiletsWaterNoteEn: string;
  parkingZones: ParkingZoneStatus[];
  darshanTimings: DarshanTimingItem[];
  updatedAt: string;
}

export interface HelplineItem {
  id: string;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  sampleNumber: string;
  category: 'fire' | 'ambulance' | 'police' | 'municipal' | 'women' | 'electricity';
}
