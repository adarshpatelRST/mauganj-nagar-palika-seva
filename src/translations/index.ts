import { ComplaintStatus, EscalationLevel, Language } from '../types';

export interface Translations {
  appName: string;
  appShort: string;
  demoBanner: string;
  citizenApp: string;
  officerApp: string;
  hindi: string;
  english: string;
  back: string;
  close: string;
  cancel: string;
  confirm: string;
  submit: string;
  next: string;
  previous: string;
  search: string;
  all: string;
  sampleTag: string;
  optional: string;
  required: string;
  wardLabel: string;
  hoursShort: string;
  daysShort: string;
  minutesShort: string;
  kmAway: string;
  offlineBanner: string;
  installApp: string;
  installIOS: string;
  iosGuideTitle: string;
  iosGuideStep1: string;
  iosGuideStep2: string;

  // Navigation tabs
  navHome: string;
  navReport: string;
  navServices: string;
  navNearby: string;
  navProfile: string;

  // Onboarding
  onboardingWelcome: string;
  onboardingSubtitle: string;
  chooseLanguage: string;
  enterMobileTitle: string;
  enterMobileHint: string;
  mobilePlaceholder: string;
  namePlaceholder: string;
  yourName: string;
  selectWard: string;
  sendOtp: string;
  otpTitle: string;
  otpSentTo: string;
  otpDemoHint: string;
  verifyOtp: string;
  resendOtp: string;
  resendIn: string;
  changeNumber: string;
  errInvalidMobile: string;
  errInvalidName: string;
  errInvalidOtp: string;
  skipDemoLogin: string;

  // Home
  greetingCitizen: string;
  reportProblemCta: string;
  reportProblemSub: string;
  quickServices: string;
  tilePayTax: string;
  tileHelplines: string;
  tileNearby: string;
  tileGarbageVan: string;
  tileTempleInfo: string;
  tileTrackComplaint: string;
  noticeBoard: string;
  viewAll: string;
  myActiveComplaints: string;
  noActiveComplaints: string;
  noActiveComplaintsAction: string;

  // Complaints & Reporting
  reportStepTitle: string;
  step1Photo: string;
  step2Category: string;
  step3Location: string;
  step4Details: string;
  takeOrUploadPhoto: string;
  uploadPhotoBtn: string;
  useSamplePhoto: string;
  samplePotholeLabel: string;
  sampleGarbageLabel: string;
  removePhoto: string;
  photoOptionalHint: string;
  selectCategoryPrompt: string;
  slaTarget: string;
  detectGpsBtn: string;
  gpsDetected: string;
  gpsSimulatedNote: string;
  gpsFallbackNote: string;
  landmarkLabel: string;
  landmarkPlaceholder: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  voiceNoteBtn: string;
  voicePlaceholderToast: string;
  reviewBeforeSubmit: string;
  submitComplaintBtn: string;
  complaintSuccessTitle: string;
  complaintSuccessBody: string;
  viewComplaintBtn: string;
  errSelectCategory: string;
  errEnterLandmark: string;
  errSelectWard: string;
  trackComplaintsTitle: string;
  searchByIdPlaceholder: string;
  noComplaintsFound: string;
  noComplaintsHint: string;
  complaintDetailTitle: string;
  complaintIdLabel: string;
  assignedOfficerLabel: string;
  unassignedLabel: string;
  slaDueLabel: string;
  overdueFlag: string;
  withinSlaFlag: string;
  beforePhotoLabel: string;
  afterPhotoLabel: string;
  noPhotoAttached: string;
  timelineTitle: string;
  feedbackPromptTitle: string;
  feedbackPromptBody: string;
  rateExperience: string;
  feedbackCommentPlaceholder: string;
  submitRatingBtn: string;
  reopenComplaintBtn: string;
  reopenReasonPlaceholder: string;
  confirmReopenBtn: string;
  errSelectRating: string;
  errEnterReopenReason: string;
  citizenRatingLabel: string;

  // Status labels
  statusLabels: Record<ComplaintStatus, string>;
  escalationLabels: Record<EscalationLevel, string>;

  // Services Hub
  servicesHubTitle: string;
  servicesHubSub: string;
  serviceCityInfo: string;
  serviceCityInfoSub: string;
  serviceBillsSub: string;
  serviceHelplinesSub: string;
  serviceGarbageSub: string;
  serviceTempleSub: string;
  serviceTrackSub: string;
  appIssuesTitle: string;
  appIssuesSub: string;
  aboutAppTitle: string;
  aboutAppSub: string;
  achievementsTitle: string;
  achievementsSub: string;
  newsTitle: string;
  newsSub: string;
  achievementsFilterAll: string;
  newsFilterAll: string;
  newsBreakingBadge: string;
  newsTodayLive: string;
  tankerBookingTitle: string;
  tankerBookingSub: string;
  jcbBookingTitle: string;
  jcbBookingSub: string;
  cameraOnlyPrompt: string;
  liveCameraSecurityNote: string;
  openCameraBtn: string;
  capturePhotoBtn: string;
  retakePhotoBtn: string;
  cameraPermissionDenied: string;
  cameraSwitchBtn: string;
  vehicleLiveLocationTitle: string;
  vehicleCurrentStatus: string;
  liveGpsTracking: string;
  speedLabel: string;
  lastPingLabel: string;
  stopsTimelineTitle: string;
  completedStopLabel: string;
  currentStopLabel: string;
  upcomingStopLabel: string;
  setArrivalAlertBtn: string;
  arrivalAlertSetMsg: string;

  // Helplines
  helplinesTitle: string;
  helplinesDisclaimer: string;
  tapToCall: string;
  simulatedCallNotice: string;

  // Nearby
  nearbyTitle: string;
  listView: string;
  mapView: string;
  getDirections: string;
  callPlace: string;
  placesFound: string;
  noPlacesInCategory: string;
  clearFilter: string;

  // Bills
  billsTitle: string;
  propertyTax: string;
  waterTax: string;
  electricityInfoTile: string;
  electricityInfoDesc: string;
  electricityPortalNote: string;
  enterPropertyId: string;
  propertyIdPlaceholder: string;
  sampleIdsHint: string;
  fetchDuesBtn: string;
  errPropertyIdRequired: string;
  errPropertyIdNotFound: string;
  ownerName: string;
  propertyAddress: string;
  dueAmount: string;
  alreadyPaidMsg: string;
  choosePaymentMethod: string;
  payViaUpi: string;
  payViaCard: string;
  upiIdPlaceholder: string;
  cardLast4Placeholder: string;
  errEnterUpi: string;
  errEnterCard: string;
  payNowSimulated: string;
  paymentReceiptTitle: string;
  receiptNoLabel: string;
  paidOnLabel: string;
  paymentModeLabel: string;
  demoPaymentDisclaimer: string;
  recentPaymentsTitle: string;
  noPaymentsYet: string;
  payAnotherBill: string;

  // Garbage Van
  garbageTitle: string;
  selectYourWard: string;
  liveVanMapTitle: string;
  estimatedArrival: string;
  vanMovingStatus: string;
  routeListTitle: string;
  vehicleLabel: string;
  driverLabel: string;
  wardsCoveredLabel: string;
  scheduleLabel: string;
  noRouteForWard: string;
  viewAllRoutes: string;

  // Temple & Pilgrim
  templeTitle: string;
  templeSubtitle: string;
  crowdLevelTitle: string;
  crowdLow: string;
  crowdMedium: string;
  crowdHigh: string;
  darshanTimingsTitle: string;
  ropewayStairsTitle: string;
  parkingTitle: string;
  toiletsWaterTitle: string;
  festivalCalendarTitle: string;
  lostFoundTitle: string;
  lostItemTab: string;
  foundItemTab: string;
  itemDescLabel: string;
  itemDescPlaceholder: string;
  locationSeenPlaceholder: string;
  contactPhonePlaceholder: string;
  submitLostFoundBtn: string;
  lostFoundSubmitted: string;
  errLostFoundFields: string;
  recentLostFound: string;

  // City Info
  cityInfoTitle: string;
  tabContacts: string;
  tabWards: string;
  tabNotices: string;
  tabCertificates: string;
  councillorLabel: string;
  wardOfficerLabel: string;
  certInfoTitle: string;
  certBirthDeathInfo: string;
  certBuildingInfo: string;
  checkStatusTitle: string;
  appIdPlaceholder: string;
  sampleAppIdsHint: string;
  checkStatusBtn: string;
  errAppIdRequired: string;
  errAppIdNotFound: string;

  // Notifications
  notificationsTitle: string;
  markAllRead: string;
  noNotifications: string;
  noNotificationsHint: string;
  simulatedSmsPushNote: string;

  // Profile
  profileTitle: string;
  myComplaintsLink: string;
  languageLabel: string;
  darkModeLabel: string;
  lightModeLabel: string;
  resetDemoData: string;
  resetConfirmTitle: string;
  resetConfirmBody: string;
  resetDoneToast: string;
  signOutDemo: string;
  appVersionNote: string;

  // Officer App
  officerRolePickerTitle: string;
  roleFieldStaff: string;
  roleFieldStaffSub: string;
  roleDeptOfficer: string;
  roleDeptOfficerSub: string;
  roleCmo: string;
  roleCmoSub: string;
  switchRole: string;
  fieldStaffTitle: string;
  selectStaffAccount: string;
  myTasksTab: string;
  timeRemaining: string;
  overdueBy: string;
  openInMaps: string;
  startWorkBtn: string;
  markResolvedTitle: string;
  afterPhotoRequiredLabel: string;
  resolutionRemarkLabel: string;
  resolutionRemarkPlaceholder: string;
  markResolvedBtn: string;
  errAfterPhotoRequired: string;
  errRemarkRequired: string;
  noAssignedTasks: string;
  noAssignedTasksHint: string;

  deptOfficerTitle: string;
  filterStatus: string;
  filterCategory: string;
  filterWard: string;
  onlyOverdue: string;
  assignOfficer: string;
  reassignOfficer: string;
  assignNotePlaceholder: string;
  saveAssignmentBtn: string;
  escalationLabel: string;

  cmoTitle: string;
  kpiTotal: string;
  kpiPending: string;
  kpiOverdue: string;
  kpiSlaPct: string;
  kpiAvgRating: string;
  chartByCategory: string;
  wardWiseTable: string;
  colWard: string;
  colTotal: string;
  colPending: string;
  colOverdue: string;
  colResolved: string;
  topOverdueTitle: string;
  exportCsvBtn: string;
  csvExportedToast: string;
  municipalSummaryTitle: string;
  taxPaymentsCount: string;
  taxRevenueSample: string;
  activeNoticesCount: string;

  // Auth: Citizen Login / Register & Employee Login
  citizenLoginTab: string;
  citizenRegisterTab: string;
  citizenLoginTitle: string;
  citizenLoginHint: string;
  citizenRegisterTitle: string;
  citizenRegisterHint: string;
  errCitizenNotFound: string;
  errCitizenAlreadyExists: string;
  quickDemoCitizens: string;
  switchToEmployeeLogin: string;
  switchToCitizenLogin: string;
  employeeLoginTitle: string;
  employeeLoginSubtitle: string;
  empIdOrMobileLabel: string;
  empIdOrMobilePlaceholder: string;
  empPinLabel: string;
  empPinPlaceholder: string;
  empLoginBtn: string;
  empDemoHint: string;
  empQuickFillTitle: string;
  errInvalidEmpCredentials: string;
  errEmpInactive: string;
  logoutBtn: string;

  // Roles (Mayor & Admin) & Officer Request Inspection
  roleMayor: string;
  roleMayorSub: string;
  roleAdmin: string;
  roleAdminSub: string;
  mayorTitle: string;
  adminTitle: string;
  viewRequestBtn: string;
  analyticsTab: string;
  allRequestsTab: string;
  citizenDetailsTitle: string;
  officerDirectiveLabel: string;
  officerDirectivePlaceholder: string;
  addDirectiveBtn: string;
  directiveSavedToast: string;
  myComplaintsOnlyNote: string;

  // Admin Portal
  adminTabEmployees: string;
  adminTabNotices: string;
  adminTabLiveFeeds: string;
  adminTabCityInfo: string;
  adminTabRequests: string;
  addEmployeeBtn: string;
  editRoleLabel: string;
  activeLabel: string;
  inactiveLabel: string;
  saveChangesBtn: string;
  deleteBtn: string;
  addNoticeBtn: string;
  broadcastPushLabel: string;
  templeLiveFeedTitle: string;
  garbageLiveFeedTitle: string;
  liveFeedUpdatedToast: string;
  departmentLabel: string;
  deptScopeNote: string;
  staffScopeNote: string;
  deptFieldStaffLabel: string;
  noDeptFieldStaff: string;
  deptOfficersGroupLabel: string;
  fieldStaffGroupLabel: string;
  leadershipGroupLabel: string;

  // About, FAQs, Terms of Use, Privacy Policy
  infoAndLegalSection: string;
  aboutTitle: string;
  aboutSub: string;
  faqTitle: string;
  faqSub: string;
  termsTitle: string;
  termsSub: string;
  privacyTitle: string;
  privacySub: string;
  aboutIntro: string;
  aboutMissionTitle: string;
  aboutMissionBody: string;
  aboutHighlights: { label: string; value: string }[];
  aboutContactTitle: string;
  aboutContactBody: string;
  faqItems: { q: string; a: string }[];
  termsUpdatedLabel: string;
  termsSections: { heading: string; body: string }[];
  privacyUpdatedLabel: string;
  privacySections: { heading: string; body: string }[];

  // Front Page (City Carousel + Services + Register/Login)
  frontCityTagline: string;
  frontServicesTitle: string;
  frontServicesSub: string;
  frontAuthTitle: string;
  frontAuthSub: string;
  frontLoginCta: string;
  frontRegisterCta: string;
  frontLoginRequiredToast: string;
  frontCarouselSlides: { title: string; subtitle: string }[];
}

export const TRANSLATIONS: Record<Language, Translations> = {
  hi: {
    appName: 'मऊगंज नगर पालिका सेवा',
    appShort: 'मऊगंज सेवा',
    demoBanner: 'डेमो संस्करण, नमूना डेटा। OTP 1234।',
    citizenApp: 'नागरिक ऐप',
    officerApp: 'अधिकारी ऐप',
    hindi: 'हिन्दी',
    english: 'English',
    back: 'वापस',
    close: 'बंद करें',
    cancel: 'रद्द करें',
    confirm: 'पुष्टि करें',
    submit: 'जमा करें',
    next: 'आगे बढ़ें',
    previous: 'पिछला',
    search: 'खोजें',
    all: 'सभी',
    sampleTag: 'नमूना',
    optional: 'वैकल्पिक',
    required: 'अनिवार्य',
    wardLabel: 'वार्ड',
    hoursShort: 'घंटे',
    daysShort: 'दिन',
    minutesShort: 'मिनट',
    kmAway: 'किमी दूर',
    offlineBanner: 'ऑफ़लाइन मोड — सहेजा गया डेटा दिखाया जा रहा है।',
    installApp: 'ऐप इंस्टॉल करें',
    installIOS: 'iPhone पर इंस्टॉल करें',
    iosGuideTitle: 'होम स्क्रीन पर जोड़ें',
    iosGuideStep1: '1. Safari में नीचे Share बटन पर टैप करें।',
    iosGuideStep2: '2. "Add to Home Screen" चुनें और जोड़ें।',

    navHome: 'होम',
    navReport: 'शिकायत',
    navServices: 'सेवाएं',
    navNearby: 'आसपास',
    navProfile: 'प्रोफ़ाइल',

    onboardingWelcome: 'मऊगंज नगर पालिका सेवा में स्वागत है',
    onboardingSubtitle: 'नागरिक शिकायतें, कर भुगतान, कचरा वाहन और तीर्थयात्री सुविधाएं एक ही ऐप में।',
    chooseLanguage: 'अपनी भाषा चुनें',
    enterMobileTitle: 'मोबाइल नंबर से प्रवेश करें',
    enterMobileHint: 'डेमो लॉगिन के लिए कोई भी 10 अंकों का मोबाइल नंबर दर्ज करें।',
    mobilePlaceholder: '10 अंकों का मोबाइल नंबर',
    namePlaceholder: 'आपका पूरा नाम (उदा. राजेश शुक्ला)',
    yourName: 'नागरिक का नाम',
    selectWard: 'अपना वार्ड चुनें',
    sendOtp: 'OTP प्राप्त करें',
    otpTitle: 'OTP सत्यापन',
    otpSentTo: 'नमूना SMS OTP भेजा गया:',
    otpDemoHint: 'डेमो के लिए हमेशा OTP 1234 दर्ज करें।',
    verifyOtp: 'सत्यापित करें और आगे बढ़ें',
    resendOtp: 'OTP पुनः भेजें',
    resendIn: 'पुनः भेजें:',
    changeNumber: 'नंबर बदलें',
    errInvalidMobile: 'कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।',
    errInvalidName: 'कृपया कम से कम 2 अक्षरों का नाम दर्ज करें।',
    errInvalidOtp: 'गलत OTP। डेमो के लिए 1234 दर्ज करें।',
    skipDemoLogin: 'सीधे डेमो देखें (नमूना प्रोफ़ाइल)',

    greetingCitizen: 'नमस्ते',
    reportProblemCta: 'समस्या दर्ज करें',
    reportProblemSub: 'फोटो और लोकेशन के साथ 4 चरणों में शिकायत दर्ज करें',
    quickServices: 'त्वरित सेवाएं',
    tilePayTax: 'कर भुगतान',
    tileHelplines: 'हेल्पलाइन',
    tileNearby: 'आसपास खोजें',
    tileGarbageVan: 'कचरा वाहन',
    tileTempleInfo: 'मंदिर सूचना',
    tileTrackComplaint: 'शिकायत ट्रैक',
    noticeBoard: 'सूचना पटल',
    viewAll: 'सभी देखें',
    myActiveComplaints: 'मेरी सक्रिय शिकायतें',
    noActiveComplaints: 'अभी कोई सक्रिय शिकायत नहीं है।',
    noActiveComplaintsAction: 'नई शिकायत दर्ज करने के लिए ऊपर "समस्या दर्ज करें" पर टैप करें।',

    reportStepTitle: 'नई शिकायत दर्ज करें',
    step1Photo: '1. फोटो जोड़ें',
    step2Category: '2. श्रेणी चुनें',
    step3Location: '3. स्थान एवं वार्ड',
    step4Details: '4. विवरण व पुष्टि',
    takeOrUploadPhoto: 'समस्या का फोटो लें या चुनें',
    uploadPhotoBtn: 'कैमरा / गैलरी से फोटो चुनें',
    useSamplePhoto: 'या डेमो नमूना फोटो चुनें',
    samplePotholeLabel: 'सड़क गड्ढा (नमूना)',
    sampleGarbageLabel: 'कचरा जमाव (नमूना)',
    removePhoto: 'फोटो हटाएं',
    photoOptionalHint: 'स्पष्ट फोटो होने पर फील्ड टीम को समस्या जल्दी हल करने में मदद मिलती है।',
    selectCategoryPrompt: 'समस्या की श्रेणी चुनें (समय-सीमा सहित)',
    slaTarget: 'निराकरण समय-सीमा:',
    detectGpsBtn: 'मेरा GPS स्थान प्राप्त करें',
    gpsDetected: 'GPS स्थान प्राप्त हुआ',
    gpsSimulatedNote: 'डेमो मोड: मऊगंज वार्ड केंद्र का GPS निर्देशांक उपयोग किया गया।',
    gpsFallbackNote: 'GPS उपलब्ध न होने पर नीचे वार्ड और लैंडमार्क दर्ज करें।',
    landmarkLabel: 'नजदीकी पहचान / पता (लैंडमार्क)',
    landmarkPlaceholder: 'उदा. छोटी बाजार चौक के पास, मुख्य सड़क',
    descriptionLabel: 'अतिरिक्त विवरण',
    descriptionPlaceholder: 'समस्या के बारे में संक्षिप्त जानकारी लिखें...',
    voiceNoteBtn: 'वॉइस संदेश रिकॉर्ड करें (डेमो)',
    voicePlaceholderToast: 'वॉइस रिकॉर्डिंग वास्तविक ऐप में माइक्रोफ़ोन API से जुड़ेगी (डेमो प्लेसहोल्डर)।',
    reviewBeforeSubmit: 'शिकायत सारांश',
    submitComplaintBtn: 'शिकायत जमा करें',
    complaintSuccessTitle: 'शिकायत सफलतापूर्वक दर्ज हुई',
    complaintSuccessBody: 'आपकी शिकायत दर्ज कर ली गई है और संबंधित विभाग को सूचित किया गया है।',
    viewComplaintBtn: 'शिकायत की स्थिति देखें',
    errSelectCategory: 'कृपया समस्या की एक श्रेणी चुनें।',
    errEnterLandmark: 'कृपया नजदीकी स्थान (लैंडमार्क) दर्ज करें।',
    errSelectWard: 'कृपया अपना वार्ड चुनें।',
    trackComplaintsTitle: 'शिकायतें एवं स्थिति',
    searchByIdPlaceholder: 'शिकायत आईडी या लैंडमार्क खोजें (उदा. MGJ-2026-0001)',
    noComplaintsFound: 'इस फ़िल्टर में कोई शिकायत नहीं मिली।',
    noComplaintsHint: 'फ़िल्टर बदलें या नई शिकायत दर्ज करें।',
    complaintDetailTitle: 'शिकायत विवरण',
    complaintIdLabel: 'शिकायत आईडी',
    assignedOfficerLabel: 'नियुक्त कर्मचारी',
    unassignedLabel: 'नियुक्ति लंबित',
    slaDueLabel: 'SLA समय-सीमा',
    overdueFlag: 'समय-सीमा पार (अतिदेय)',
    withinSlaFlag: 'समय-सीमा के भीतर',
    beforePhotoLabel: 'समस्या का फोटो (पहले)',
    afterPhotoLabel: 'निराकरण का फोटो (बाद में)',
    noPhotoAttached: 'कोई फोटो संलग्न नहीं',
    timelineTitle: 'कार्यवाही विवरण (टाइमलाइन)',
    feedbackPromptTitle: 'निराकरण पर अपनी प्रतिक्रिया दें',
    feedbackPromptBody: 'क्या आपकी समस्या संतोषजनक रूप से हल हो गई है? रेटिंग देकर बंद करें या पुनः खोलें।',
    rateExperience: 'सेवा को रेटिंग दें (1 से 5 स्टार)',
    feedbackCommentPlaceholder: 'अपनी टिप्पणी लिखें (वैकल्पिक)...',
    submitRatingBtn: 'रेटिंग जमा करें व बंद करें',
    reopenComplaintBtn: 'समस्या हल नहीं हुई — पुनः खोलें',
    reopenReasonPlaceholder: 'पुनः खोलने का कारण लिखें (अनिवार्य)...',
    confirmReopenBtn: 'पुनः खोलने की पुष्टि करें',
    errSelectRating: 'कृपया 1 से 5 के बीच रेटिंग चुनें।',
    errEnterReopenReason: 'कृपया शिकायत पुनः खोलने का कारण लिखें।',
    citizenRatingLabel: 'नागरिक रेटिंग',

    statusLabels: {
      Registered: 'दर्ज की गई',
      Assigned: 'अधिकारी को सौंपी गई',
      'In progress': 'कार्य प्रगति पर',
      Resolved: 'निराकृत',
      Closed: 'बंद',
      Reopened: 'पुनः खोली गई',
    },
    escalationLabels: {
      none: 'सामान्य स्तर',
      dept_head: 'स्तर 1: विभाग प्रमुख (50%+ समय)',
      cmo: 'स्तर 2: सीएमओ (100%+ समय)',
      president: 'स्तर 3: अध्यक्ष (150%+ समय)',
    },

    servicesHubTitle: 'नगर पालिका सेवाएं',
    servicesHubSub: 'मऊगंज नगर पालिका की सभी डिजिटल नागरिक सेवाएं',
    serviceCityInfo: 'शहर एवं नगर पालिका जानकारी',
    serviceCityInfoSub: 'विभाग संपर्क, पार्षद, निविदाएं, प्रमाण-पत्र स्थिति',
    serviceBillsSub: 'संपत्ति कर, जल कर भुगतान व बिजली सूचना',
    serviceHelplinesSub: 'अग्निशमन, एम्बुलेंस, पुलिस व आपातकालीन कॉल',
    serviceGarbageSub: 'कचरा संग्रहण वाहन मार्ग व आगमन समय',
    serviceTempleSub: 'देवतलाब व अष्टभुजा मंदिर दर्शन, आरती, भीड़ व पार्किंग',
    serviceTrackSub: 'अपनी दर्ज शिकायतों की स्थिति और इतिहास देखें',
    appIssuesTitle: 'ऐप संबंधित समस्याएं',
    appIssuesSub: 'ऐप में बग या तकनीकी दिक्कत की सीधे एडमिन से शिकायत',
    aboutAppTitle: 'ऐप के बारे में',
    aboutAppSub: 'संस्करण v2.1.0 एवं IT प्रशासन विवरण',
    achievementsTitle: 'नगर पालिका द्वारा किये गए कार्य',
    achievementsSub: 'नगर पालिका द्वारा पूर्ण किए गए प्रमुख विकास एवं जनकल्याणकारी कार्य',
    newsTitle: 'नगर समाचार अपडेट',
    newsSub: 'मऊगंज नगर पालिका की दैनिक सूचनाएं, बुलेटिन एवं ताज़ा समाचार',
    achievementsFilterAll: 'सभी कार्य',
    newsFilterAll: 'सभी समाचार',
    newsBreakingBadge: 'ताज़ा अपडेट',
    newsTodayLive: 'आज का दैनिक बुलेटिन',
    tankerBookingTitle: 'पानी टैंकर बुकिंग',
    tankerBookingSub: 'आपातकालीन पेयजल व आयोजनों हेतु नगर पालिका टैंकर मंगाएं',
    jcbBookingTitle: 'जेसीबी / भारी मशीनरी बुकिंग',
    jcbBookingSub: 'मलबा हटाने, सफाई व खुदाई हेतु नगर पालिका जेसीबी मंगाएं',
    cameraOnlyPrompt: 'लाइव कैमरे से फोटो खींचें',
    liveCameraSecurityNote: 'सुरक्षा नियम: केवल मौके से लाइव कैमरे द्वारा ली गई फोटो ही मान्य है। गैलरी से अपलोडिंग प्रतिबंधित है।',
    openCameraBtn: 'लाइव कैमरा चालू करें',
    capturePhotoBtn: 'फोटो क्लिक करें',
    retakePhotoBtn: 'पुनः फोटो खींचें',
    cameraPermissionDenied: 'कैमरा अनुमति अस्वीकृत है। कृपया ब्राउज़र सेटिंग्स में कैमरा की अनुमति दें।',
    cameraSwitchBtn: 'कैमरा बदलें',
    vehicleLiveLocationTitle: 'वाहन की वर्तमान स्थिति (लाइव ट्रैकिंग)',
    vehicleCurrentStatus: 'कचरा संग्रहण जारी',
    liveGpsTracking: 'AIS-140 लाइव जीपीएस',
    speedLabel: 'गति',
    lastPingLabel: 'अंतिम सिग्नल',
    stopsTimelineTitle: 'मार्ग स्टॉप एवं संग्रहण प्रगति',
    completedStopLabel: 'कचरा उठाव संपन्न',
    currentStopLabel: 'वाहन अभी यहाँ है',
    upcomingStopLabel: 'आगामी स्टॉप',
    setArrivalAlertBtn: 'आगमन अलार्म सेट करें',
    arrivalAlertSetMsg: 'वाहन आपके वार्ड में पहुँचने पर अलर्ट भेजा जाएगा',

    helplinesTitle: 'आपातकालीन हेल्पलाइन',
    helplinesDisclaimer: 'सूचना: ये सभी डेमो हेतु स्पष्ट नमूना नंबर हैं। वास्तविक आपातकाल में आधिकारिक नंबर डायल करें।',
    tapToCall: 'कॉल करें',
    simulatedCallNotice: 'डेमो कॉल डायलर खोला जा रहा है:',

    nearbyTitle: 'मेरे आसपास (मऊगंज)',
    listView: 'सूची',
    mapView: 'नक्शा',
    getDirections: 'दिशा-निर्देश',
    callPlace: 'कॉल',
    placesFound: 'स्थान मिले',
    noPlacesInCategory: 'इस श्रेणी में कोई स्थान उपलब्ध नहीं है।',
    clearFilter: 'सभी श्रेणियां देखें',

    billsTitle: 'कर एवं बिल भुगतान',
    propertyTax: 'संपत्ति कर',
    waterTax: 'जल कर',
    electricityInfoTile: 'बिजली बिल (केवल जानकारी)',
    electricityInfoDesc: 'मऊगंज क्षेत्र की विद्युत आपूर्ति मध्य प्रदेश पूर्व क्षेत्र विद्युत वितरण कंपनी (MPPKVVCL) द्वारा संचालित है। बिजली बिल का भुगतान आधिकारिक विद्युत पोर्टल पर किया जाता है।',
    electricityPortalNote: 'नगर पालिका ऐप केवल संपत्ति कर और जल कर एकत्र करता है।',
    enterPropertyId: 'संपत्ति आईडी (Property ID) दर्ज करें',
    propertyIdPlaceholder: 'उदा. MGJ-P-1001',
    sampleIdsHint: 'नमूना आईडी: MGJ-P-1001, MGJ-P-1002, MGJ-P-1003',
    fetchDuesBtn: 'बकाया राशि देखें',
    errPropertyIdRequired: 'कृपया संपत्ति आईडी दर्ज करें।',
    errPropertyIdNotFound: 'यह संपत्ति आईडी नमूना रिकॉर्ड में नहीं मिली। कृपया MGJ-P-1001 आज़माएं।',
    ownerName: 'स्वामी का नाम',
    propertyAddress: 'पता',
    dueAmount: 'देय राशि',
    alreadyPaidMsg: 'इस खाते पर कोई बकाया राशि शेष नहीं है।',
    choosePaymentMethod: 'भुगतान माध्यम चुनें (डेमो सिमुलेशन)',
    payViaUpi: 'UPI द्वारा भुगतान',
    payViaCard: 'डेबिट / क्रेडिट कार्ड',
    upiIdPlaceholder: 'उदा. citizen@upi',
    cardLast4Placeholder: 'कार्ड के अंतिम 4 अंक (उदा. 4242)',
    errEnterUpi: 'कृपया मान्य UPI आईडी दर्ज करें (जैसे name@upi)।',
    errEnterCard: 'कृपया कार्ड के 4 अंक दर्ज करें।',
    payNowSimulated: 'भुगतान करें (डेमो)',
    paymentReceiptTitle: 'भुगतान रसीद (नमूना)',
    receiptNoLabel: 'रसीद संख्या',
    paidOnLabel: 'भुगतान दिनांक व समय',
    paymentModeLabel: 'माध्यम',
    demoPaymentDisclaimer: 'यह एक डेमो रसीद है। कोई वास्तविक धनराशि नहीं काटी गई है।',
    recentPaymentsTitle: 'हाल के भुगतान',
    noPaymentsYet: 'अभी तक कोई कर भुगतान नहीं हुआ है।',
    payAnotherBill: 'अन्य कर भुगतान करें',

    garbageTitle: 'कचरा वाहन ट्रैकिंग',
    selectYourWard: 'अपना वार्ड चुनें',
    liveVanMapTitle: 'लाइव वाहन मार्ग (डेमो सिमुलेशन)',
    estimatedArrival: 'अनुमानित आगमन समय',
    vanMovingStatus: 'वाहन मार्ग पर सक्रिय है',
    routeListTitle: 'कचरा संग्रहण मार्ग सूची',
    vehicleLabel: 'वाहन संख्या',
    driverLabel: 'चालक (नमूना)',
    wardsCoveredLabel: 'कवर किए गए वार्ड',
    scheduleLabel: 'समय-सारणी',
    noRouteForWard: 'इस वार्ड के लिए मार्ग जानकारी लोड नहीं हो सकी।',
    viewAllRoutes: 'सभी मार्ग देखें',

    templeTitle: 'देवतलाब व अष्टभुजा मंदिर सेवाएं',
    templeSubtitle: 'देवतलाब शिव मंदिर व माँ अष्टभुजा धाम दर्शन, सुविधाएं एवं मेला सूचनाएं',
    crowdLevelTitle: 'वर्तमान भीड़ स्तर (नमूना)',
    crowdLow: 'कम भीड़ (लगभग 20 मिनट दर्शन समय)',
    crowdMedium: 'मध्यम भीड़ (लगभग 45-60 मिनट)',
    crowdHigh: 'अधिक भीड़ (लगभग 90+ मिनट)',
    darshanTimingsTitle: 'दर्शन एवं आरती समय-सारणी',
    ropewayStairsTitle: 'शटल एवं मंदिर मार्ग की जानकारी',
    parkingTitle: 'पार्किंग उपलब्धता (नमूना)',
    toiletsWaterTitle: 'अस्थायी शौचालय एवं पेयजल केंद्र',
    festivalCalendarTitle: 'पर्व कैलेंडर एवं मेला सूचनाएं',
    lostFoundTitle: 'खोया-पाया रिपोर्ट फॉर्म',
    lostItemTab: 'सामान खोया है',
    foundItemTab: 'सामान मिला है',
    itemDescLabel: 'वस्तु / व्यक्ति का विवरण',
    itemDescPlaceholder: 'उदा. नीला बैग या मोबाइल फोन',
    locationSeenPlaceholder: 'स्थान (उदा. मंदिर मुख्य द्वार के पास)',
    contactPhonePlaceholder: 'संपर्क मोबाइल नंबर (10 अंक)',
    submitLostFoundBtn: 'खोया-पाया रिपोर्ट दर्ज करें',
    lostFoundSubmitted: 'खोया-पाया रिपोर्ट सहायता केंद्र में दर्ज हो गई है।',
    errLostFoundFields: 'कृपया विवरण, स्थान और 10 अंकों का संपर्क नंबर भरें।',
    recentLostFound: 'हाल की खोया-पाया प्रविष्टियां',

    cityInfoTitle: 'शहर व नगर पालिका जानकारी',
    tabContacts: 'विभाग संपर्क',
    tabWards: 'वार्ड व पार्षद',
    tabNotices: 'सूचना व निविदा',
    tabCertificates: 'प्रमाण-पत्र',
    councillorLabel: 'पार्षद (नमूना)',
    wardOfficerLabel: 'वार्ड प्रभारी (नमूना)',
    certInfoTitle: 'प्रमाण-पत्र एवं भवन अनुज्ञा जानकारी',
    certBirthDeathInfo: 'जन्म व मृत्यु प्रमाण-पत्र: घटना के 21 दिनों के भीतर निःशुल्क पंजीकरण। आवश्यक दस्तावेज़: अस्पताल डिस्चार्ज पर्ची, माता-पिता का पहचान पत्र।',
    certBuildingInfo: 'भवन निर्माण अनुज्ञा: भूखंड स्वामित्व दस्तावेज़, स्वीकृत मानचित्र व शपथ-पत्र के साथ ऑनलाइन आवेदन करें।',
    checkStatusTitle: 'आवेदन की स्थिति जांचें (नमूना)',
    appIdPlaceholder: 'आवेदन संख्या दर्ज करें (उदा. MGJ-BC-2026-101)',
    sampleAppIdsHint: 'नमूना आईडी: MGJ-BC-2026-101, MGJ-DC-2026-204, MGJ-BP-2026-309',
    checkStatusBtn: 'स्थिति देखें',
    errAppIdRequired: 'कृपया आवेदन संख्या दर्ज करें।',
    errAppIdNotFound: 'यह आवेदन संख्या नहीं मिली। कृपया नमूना आईडी आज़माएं।',

    notificationsTitle: 'सूचनाएं (SMS / Push डेमो)',
    markAllRead: 'सभी पढ़ा हुआ चिह्नित करें',
    noNotifications: 'कोई सूचना उपलब्ध नहीं है।',
    noNotificationsHint: 'जब आप शिकायत दर्ज करेंगे या बिल भुगतान करेंगे, तो यहां सूचनाएं दिखेंगी।',
    simulatedSmsPushNote: 'डेमो मोड में SMS और Push अलर्ट ऐप के भीतर दिखाए जाते हैं।',

    profileTitle: 'मेरी प्रोफ़ाइल व सेटिंग्स',
    myComplaintsLink: 'मेरी सभी शिकायतें देखें',
    languageLabel: 'ऐप की भाषा',
    darkModeLabel: 'डार्क मोड',
    lightModeLabel: 'लाइट मोड',
    resetDemoData: 'डेमो डेटा रीसेट करें',
    resetConfirmTitle: 'क्या आप डेमो डेटा रीसेट करना चाहते हैं?',
    resetConfirmBody: 'सभी नई शिकायतें, भुगतान और बदलाव हट जाएंगे और प्रारंभिक 12 नमूना शिकायतें वापस आ जाएंगी।',
    resetDoneToast: 'डेमो डेटा प्रारंभिक स्थिति में रीसेट हो गया।',
    signOutDemo: 'मोबाइल लॉगिन बदलें',
    appVersionNote: 'मऊगंज नगर पालिका सेवा • स्वीकृति डेमो संस्करण',

    officerRolePickerTitle: 'अधिकारी भूमिका चुनें (बिना पासवर्ड डेमो)',
    roleFieldStaff: 'फील्ड स्टाफ',
    roleFieldStaffSub: 'सौंपे गए कार्य देखें, कार्य शुरू करें और बाद के फोटो के साथ निराकरण करें',
    roleDeptOfficer: 'विभाग अधिकारी',
    roleDeptOfficerSub: 'सभी शिकायतें फ़िल्टर करें, कर्मचारी नियुक्त करें और एस्केलेशन देखें',
    roleCmo: 'सीएमओ (CMO) डैशबोर्ड',
    roleCmoSub: 'SLA रिपोर्ट, वार्ड प्रदर्शन तालिका, अतिदेय सूची व CSV निर्यात',
    switchRole: 'भूमिका बदलें',
    fieldStaffTitle: 'मेरे कार्य (फील्ड स्टाफ)',
    selectStaffAccount: 'स्टाफ चुनें:',
    myTasksTab: 'मेरे सौंपे कार्य',
    timeRemaining: 'शेष समय:',
    overdueBy: 'अतिदेय:',
    openInMaps: 'मैप में स्थान खोलें',
    startWorkBtn: 'कार्य प्रारंभ करें',
    markResolvedTitle: 'शिकायत निराकृत करें',
    afterPhotoRequiredLabel: 'निराकरण के बाद का फोटो (अनिवार्य)',
    resolutionRemarkLabel: 'निराकरण टिप्पणी (अनिवार्य)',
    resolutionRemarkPlaceholder: 'किए गए कार्य का संक्षिप्त विवरण लिखें...',
    markResolvedBtn: 'निराकृत चिह्नित करें',
    errAfterPhotoRequired: 'निराकरण के लिए बाद का फोटो अपलोड करना अनिवार्य है।',
    errRemarkRequired: 'कृपया निराकरण टिप्पणी दर्ज करें (कम से कम 5 अक्षर)।',
    noAssignedTasks: 'आपको अभी कोई लंबित कार्य नहीं सौंपा गया है।',
    noAssignedTasksHint: 'जब आपके विभाग अधिकारी आपको कोई शिकायत सौंपेंगे, तो वह यहाँ दिखेगी।',

    deptOfficerTitle: 'विभाग अधिकारी कंसोल',
    filterStatus: 'स्थिति',
    filterCategory: 'श्रेणी',
    filterWard: 'वार्ड',
    onlyOverdue: 'केवल अतिदेय',
    assignOfficer: 'स्टाफ नियुक्त करें',
    reassignOfficer: 'पुनः नियुक्त करें',
    assignNotePlaceholder: 'निर्देश टिप्पणी (वैकल्पिक)...',
    saveAssignmentBtn: 'नियुक्ति सहेजें',
    escalationLabel: 'एस्केलेशन स्तर',

    cmoTitle: 'सीएमओ (CMO) प्रबंधन डैशबोर्ड',
    kpiTotal: 'कुल शिकायतें',
    kpiPending: 'लंबित',
    kpiOverdue: 'अतिदेय',
    kpiSlaPct: 'SLA में निराकृत',
    kpiAvgRating: 'औसत रेटिंग',
    chartByCategory: 'श्रेणी के अनुसार शिकायतें',
    wardWiseTable: 'वार्ड-वार सारणी',
    colWard: 'वार्ड',
    colTotal: 'कुल',
    colPending: 'लंबित',
    colOverdue: 'अतिदेय',
    colResolved: 'निराकृत',
    topOverdueTitle: 'शीर्ष 5 सर्वाधिक अतिदेय शिकायतें',
    exportCsvBtn: 'CSV रिपोर्ट डाउनलोड करें',
    csvExportedToast: 'शिकायतों की CSV फ़ाइल डाउनलोड हो गई।',
    municipalSummaryTitle: 'अन्य नगर पालिका आंकड़े (नमूना)',
    taxPaymentsCount: 'कर भुगतान संख्या',
    taxRevenueSample: 'कुल कर संग्रहण',
    activeNoticesCount: 'सक्रिय सूचनाएं व निविदाएं',

    citizenLoginTab: 'नागरिक लॉगिन',
    citizenRegisterTab: 'नया पंजीकरण',
    citizenLoginTitle: 'पंजीकृत मोबाइल से लॉगिन करें',
    citizenLoginHint: 'अपना पंजीकृत 10 अंकों का मोबाइल नंबर दर्ज करें (डेमो OTP: 1234)।',
    citizenRegisterTitle: 'नया नागरिक खाता बनाएं',
    citizenRegisterHint: 'पहली बार उपयोग कर रहे हैं? अपना नाम, वार्ड व मोबाइल दर्ज करें।',
    errCitizenNotFound: 'यह मोबाइल नंबर पंजीकृत नहीं है। कृपया "नया पंजीकरण" टैब से खाता बनाएं।',
    errCitizenAlreadyExists: 'यह मोबाइल नंबर पहले से पंजीकृत है। कृपया "नागरिक लॉगिन" से प्रवेश करें।',
    quickDemoCitizens: 'त्वरित डेमो नागरिक लॉगिन:',
    switchToEmployeeLogin: 'कर्मचारी / अधिकारी / एडमिन लॉगिन पर जाएं',
    switchToCitizenLogin: 'नागरिक लॉगिन पर वापस जाएं',
    employeeLoginTitle: 'कर्मचारी व अधिकारी लॉगिन',
    employeeLoginSubtitle: 'फील्ड स्टाफ, विभाग अधिकारी, CMO, महापौर / अध्यक्ष एवं एडमिन पोर्टल',
    empIdOrMobileLabel: 'कर्मचारी आईडी या मोबाइल नंबर',
    empIdOrMobilePlaceholder: 'उदा. EMP-DO-01 या 9900000010',
    empPinLabel: 'सुरक्षा पिन (4 अंक)',
    empPinPlaceholder: 'डेमो पिन: 1234',
    empLoginBtn: 'अधिकारी पोर्टल में लॉगिन करें',
    empDemoHint: 'डेमो पिन सभी कर्मचारियों के लिए 1234 है। नीचे से किसी भी भूमिका का त्वरित चयन करें:',
    empQuickFillTitle: 'डेमो भूमिका त्वरित लॉगिन (ऑटो-फ़िल)',
    errInvalidEmpCredentials: 'अमान्य कर्मचारी आईडी/मोबाइल या पिन। कृपया जांचें (डेमो पिन: 1234)।',
    errEmpInactive: 'यह कर्मचारी खाता एडमिन द्वारा निष्क्रिय किया गया है।',
    logoutBtn: 'लॉगआउट',

    roleMayor: 'महापौर / नगर पालिका अध्यक्ष',
    roleMayorSub: 'नगर विश्लेषण, वार्ड प्रदर्शन एवं सभी नागरिक शिकायतों का प्रत्यक्ष अवलोकन',
    roleAdmin: 'सिस्टम एडमिन (Admin)',
    roleAdminSub: 'कर्मचारी व भूमिका प्रबंधन, सूचनाएं, लाइव फ़ीड और नगर जानकारी अपडेट करें',
    mayorTitle: 'महापौर / अध्यक्ष डैशबोर्ड',
    adminTitle: 'एडमिन नियंत्रण कक्ष',
    viewRequestBtn: 'विवरण देखें',
    analyticsTab: 'विश्लेषण',
    allRequestsTab: 'सभी शिकायतें',
    citizenDetailsTitle: 'शिकायतकर्ता विवरण',
    officerDirectiveLabel: 'अधिकारी निर्देश / निरीक्षण टिप्पणी',
    officerDirectivePlaceholder: 'फील्ड टीम या विभाग के लिए निर्देश लिखें...',
    addDirectiveBtn: 'निर्देश दर्ज करें',
    directiveSavedToast: 'अधिकारी टिप्पणी शिकायत टाइमलाइन में दर्ज हो गई।',
    myComplaintsOnlyNote: 'गोपनीयता: यहाँ केवल आपके मोबाइल नंबर से दर्ज शिकायतें दिखाई जाती हैं।',

    adminTabEmployees: 'कर्मचारी',
    adminTabNotices: 'सूचनाएं',
    adminTabLiveFeeds: 'लाइव फ़ीड',
    adminTabCityInfo: 'नगर जानकारी',
    adminTabRequests: 'शिकायतें',
    addEmployeeBtn: 'नया कर्मचारी जोड़ें',
    editRoleLabel: 'भूमिका बदलें',
    activeLabel: 'सक्रिय',
    inactiveLabel: 'निष्क्रिय',
    saveChangesBtn: 'परिवर्तन सहेजें',
    deleteBtn: 'हटाएं',
    addNoticeBtn: 'नई सूचना प्रकाशित करें',
    broadcastPushLabel: 'नागरिकों को पुश सूचना भी भेजें',
    templeLiveFeedTitle: 'देवतलाब व अष्टभुजा मंदिर लाइव फ़ीड',
    garbageLiveFeedTitle: 'कचरा वाहन लाइव रूट फ़ीड',
    liveFeedUpdatedToast: 'लाइव डेटा सफलतापूर्वक अपडेट हो गया।',
    departmentLabel: 'विभाग',
    deptScopeNote: 'केवल आपके विभाग की शिकायतें दिखाई जा रही हैं।',
    staffScopeNote: 'केवल आपको सौंपी गई शिकायतें दिखाई जा रही हैं।',
    deptFieldStaffLabel: 'विभागीय फील्ड स्टाफ',
    noDeptFieldStaff: 'इस विभाग में कोई सक्रिय फील्ड स्टाफ उपलब्ध नहीं है।',
    deptOfficersGroupLabel: 'विभाग अधिकारी (विभाग अनुसार)',
    fieldStaffGroupLabel: 'फील्ड स्टाफ (विभाग अनुसार)',
    leadershipGroupLabel: 'प्रशासन एवं नेतृत्व (सभी विभाग)',

    infoAndLegalSection: 'जानकारी एवं नीतियां',
    aboutTitle: 'हमारे बारे में',
    aboutSub: 'मऊगंज नगर पालिका परिषद एवं ऐप का परिचय',
    faqTitle: 'सामान्य प्रश्न (FAQs)',
    faqSub: 'शिकायत, कर भुगतान और सेवाओं से जुड़े प्रश्न',
    termsTitle: 'उपयोग की शर्तें',
    termsSub: 'नागरिक पोर्टल के नियम एवं शर्तें',
    privacyTitle: 'गोपनीयता नीति',
    privacySub: 'आपका डेटा कैसे सुरक्षित और गोपनीय रखा जाता है',
    aboutIntro:
      'मऊगंज नगर पालिका सेवा (Mauganj Nagar Palika Seva) नगर पालिका परिषद, मऊगंज (मध्य प्रदेश) का एकीकृत डिजिटल नागरिक एवं तीर्थयात्री सेवा मंच है। इसका उद्देश्य नागरिकों को शिकायत निवारण, नगर कर भुगतान, कचरा वाहन ट्रैकिंग और देवतलाब शिव मंदिर व माँ अष्टभुजा धाम से जुड़ी सुविधाएं सरल, पारदर्शी और समयबद्ध रूप से उपलब्ध कराना है।',
    aboutMissionTitle: 'हमारा उद्देश्य',
    aboutMissionBody:
      'हर नागरिक की शिकायत सीधे संबंधित विभाग के अधिकारी और विभागीय फील्ड स्टाफ तक पहुंचे, तय SLA समय-सीमा में समाधान हो, और कार्य पूरा होने पर नागरिक स्वयं फोटो देखकर अपनी संतुष्टि या पुनः खोलने की प्रतिक्रिया दे सकें।',
    aboutHighlights: [
      { label: 'कुल वार्ड', value: '15 वार्ड' },
      { label: 'सेवा विभाग', value: '7 विभाग' },
      { label: 'शिकायत ट्रैकिंग', value: '24×7 लाइव' },
      { label: 'तीर्थयात्री सहायता', value: 'देवतलाब व अष्टभुजा' },
    ],
    aboutContactTitle: 'कार्यालय संपर्क',
    aboutContactBody:
      'कार्यालय नगर पालिका परिषद, एलआईसी कार्यालय के पास, चाक रोड, वार्ड 3, मऊगंज, जिला मऊगंज (म.प्र.) 486331 · कार्य समय: सोम–शनि, प्रातः 10:00 से सायं 5:30 तक।',
    faqItems: [
      {
        q: 'नई शिकायत कैसे दर्ज करें और उसकी स्थिति कैसे जानें?',
        a: 'होम स्क्रीन पर "शिकायत दर्ज" चुनें, फोटो जोड़ें, श्रेणी चुनें, GPS या वार्ड/लैंडमार्क दर्ज करें और सबमिट करें। आपको MGJ-2026-xxxx आईडी मिलेगी जिसे आप "शिकायत स्थिति" से कभी भी ट्रैक कर सकते हैं।',
      },
      {
        q: 'क्या अन्य नागरिक मेरी शिकायतें देख सकते हैं?',
        a: 'नहीं। गोपनीयता के तहत प्रत्येक नागरिक को केवल अपने पंजीकृत मोबाइल नंबर से दर्ज शिकायतें ही दिखाई देती हैं। विभागीय अधिकारी केवल अपने विभाग की और फील्ड स्टाफ केवल उन्हें सौंपी गई शिकायतें देख सकते हैं।',
      },
      {
        q: 'विभिन्न श्रेणियों की SLA समय-सीमा क्या है?',
        a: 'सफाई व आवारा/घायल पशु: 24 घंटे, पेयजल व नाली/जलभराव: 48 घंटे, स्ट्रीट लाइट: 72 घंटे, अन्य मामले: 96 घंटे, और सड़क मरम्मत: 120 घंटे। समय-सीमा पार होने पर शिकायत स्वतः उच्च अधिकारियों को एस्केलेट होती है।',
      },
      {
        q: 'यदि समस्या ठीक से हल न हुई हो तो क्या करें?',
        a: '"निराकृत (Resolved)" स्थिति आने पर आप शिकायत विवरण में "समाधान नहीं हुआ — पुनः खोलें" बटन दबाकर कारण लिख सकते हैं। शिकायत तुरंत विभाग को पुनः भेजी जाएगी।',
      },
      {
        q: 'क्या मैं इस ऐप से बिजली का बिल भी भर सकता हूँ?',
        a: 'मऊगंज नगर पालिका केवल संपत्ति कर और जल कर संग्रह करती है। बिजली बिल का भुगतान मध्य प्रदेश पूर्व क्षेत्र विद्युत वितरण कंपनी (MPPKVVCL) के पोर्टल पर किया जाता है।',
      },
      {
        q: 'कचरा वाहन ट्रैकिंग कैसे काम करती है?',
        a: '"कचरा वाहन" मॉड्यूल में अपना वार्ड चुनें। आपको अपने वार्ड के वाहन नंबर, रूट के स्टॉप और अनुमानित आगमन समय की जानकारी दिखाई देगी।',
      },
      {
        q: 'देवतलाब व अष्टभुजा मंदिर दर्शन व खोया-पाया सेवा कैसे उपयोग करें?',
        a: '"मंदिर जानकारी" में दर्शन व आरती समय, भीड़ स्तर, शटल/मार्ग अपडेट, पार्किंग उपलब्धता और खोया-पाया रिपोर्ट फॉर्म एक ही जगह उपलब्ध है।',
      },
    ],
    termsUpdatedLabel: 'अंतिम अद्यतन: 2026 (अनुमोदन डेमो संस्करण)',
    termsSections: [
      {
        heading: '1. सेवा का दायरा',
        body: 'यह पोर्टल मऊगंज नगर पालिका परिषद की नागरिक सेवाओं—शिकायत निवारण, संपत्ति/जल कर जानकारी, कचरा संग्रहण समय-सारणी, नजदीकी सुविधाएं और तीर्थयात्री सहायता—के डिजिटल उपयोग के लिए प्रदान किया गया है।',
      },
      {
        heading: '2. नागरिक दायित्व एवं सही जानकारी',
        body: 'शिकायत दर्ज करते समय सही स्थान, वार्ड, वास्तविक फोटो और सटीक विवरण देना आवश्यक है। भ्रामक, अश्लील या फर्जी शिकायतें दर्ज करना प्रतिबंधित है और ऐसी प्रविष्टियां निरस्त की जा सकती हैं।',
      },
      {
        heading: '3. SLA समय-सीमा एवं एस्केलेशन',
        body: 'प्रदर्शित SLA समय-सीमाएं मानक सेवा लक्ष्य हैं। आपातकालीन स्थितियों, भारी वर्षा या प्रमुख पर्व (जैसे महाशिवरात्रि, सावन व नवरात्रि मेला) के दौरान कार्य-समय में व्यावहारिक परिवर्तन संभव है।',
      },
      {
        heading: '4. कर भुगतान एवं रसीद',
        body: 'ऑनलाइन कर भुगतान की रसीदें संबंधित संपत्ति आईडी के विरुद्ध जारी होती हैं। वर्तमान डेमो संस्करण में कोई वास्तविक वित्तीय लेन-देन नहीं होता; सभी रसीदें केवल प्रदर्शन हेतु हैं।',
      },
      {
        heading: '5. डेमो संस्करण सूचना',
        body: 'यह संस्करण नगर पालिका अनुमोदन एवं समीक्षा के लिए तैयार किया गया है। इसमें प्रयुक्त नाम, हेल्पलाइन नंबर, कर्मचारी आईडी और डेटा नमूना (Sample) हैं।',
      },
    ],
    privacyUpdatedLabel: 'अंतिम अद्यतन: 2026 (नागरिक डेटा सुरक्षा नीति)',
    privacySections: [
      {
        heading: '1. हम कौन-सी जानकारी एकत्र करते हैं',
        body: 'नागरिक पंजीकरण व शिकायत निवारण के लिए आपका नाम, 10 अंकों का मोबाइल नंबर, वार्ड संख्या, और शिकायत के साथ अपलोड की गई फोटो तथा GPS/लैंडमार्क जानकारी उपयोग की जाती है।',
      },
      {
        heading: '2. जानकारी का उपयोग',
        body: 'आपका डेटा केवल शिकायतों को सही विभाग व फील्ड स्टाफ तक पहुंचाने, स्थिति अपडेट (SMS/पुश सूचना) भेजने और नगर सेवाओं की गुणवत्ता सुधारने के लिए किया जाता है।',
      },
      {
        heading: '3. सख्त गोपनीयता एवं भूमिका-आधारित पहुंच',
        body: 'एक नागरिक किसी अन्य नागरिक की शिकायतें या व्यक्तिगत विवरण नहीं देख सकता। विभागीय अधिकारी केवल अपने विभाग की शिकायतें और फील्ड स्टाफ केवल उन्हें सौंपी गई शिकायतें देख सकते हैं।',
      },
      {
        heading: '4. स्थानीय संग्रहण एवं डेटा रीसेट (डेमो)',
        body: 'इस डेमो ऐप में आपका डेटा केवल आपके ब्राउज़र के लोकल स्टोरेज में सहेजा जाता है और किसी बाहरी सर्वर पर साझा नहीं किया जाता। आप प्रोफ़ाइल से "डेमो डेटा रीसेट करें" चुनकर कभी भी इसे मिटा सकते हैं।',
      },
      {
        heading: '5. गोपनीयता संपर्क',
        body: 'डेटा सुधार या गोपनीयता संबंधी किसी भी प्रश्न के लिए नगर पालिका परिषद मऊगंज के आईटी एवं नागरिक सुविधा केंद्र से संपर्क किया जा सकता है।',
      },
    ],

    frontCityTagline: 'नगर पालिका परिषद, मऊगंज · मध्य प्रदेश',
    frontServicesTitle: 'मऊगंज नगर की सभी सेवाएं',
    frontServicesSub: 'नागरिक व तीर्थयात्री सेवाओं के लिए नीचे किसी भी विकल्प पर टैप करें',
    frontAuthTitle: 'नागरिक खाता — लॉगिन या पंजीकरण',
    frontAuthSub: 'शिकायत दर्ज करने, स्थिति ट्रैक करने और नगर कर भुगतान के लिए प्रवेश करें।',
    frontLoginCta: 'लॉगिन करें',
    frontRegisterCta: 'नया पंजीकरण',
    frontLoginRequiredToast: 'इस सेवा का उपयोग करने के लिए कृपया नागरिक लॉगिन या पंजीकरण करें।',
    frontCarouselSlides: [
      {
        title: 'देवतलाब शिव मंदिर व माँ अष्टभुजा धाम',
        subtitle: 'दर्शन समय, शटल सेवा, पार्किंग और तीर्थयात्री सहायता',
      },
      {
        title: 'छोटी बाजार एवं मऊगंज नगर पालिका',
        subtitle: '15 वार्डों में पारदर्शी एवं समयबद्ध नागरिक सेवाएं',
      },
      {
        title: 'स्वच्छ एवं हरित मऊगंज अभियान',
        subtitle: 'डोर-टू-डोर कचरा वाहन ट्रैकिंग व स्वच्छता शिकायत निवारण',
      },
      {
        title: 'मऊगंज विंध्य धरोहर एवं उद्यान',
        subtitle: 'नगर सूचना पट्ट, नजदीकी सुविधाएं व आपातकालीन हेल्पलाइन',
      },
    ],
  },

  en: {
    appName: 'Mauganj Nagar Palika Seva',
    appShort: 'Mauganj Seva',
    demoBanner: 'Demo version, sample data. OTP 1234.',
    citizenApp: 'Citizen app',
    officerApp: 'Officer app',
    hindi: 'हिन्दी',
    english: 'English',
    back: 'Back',
    close: 'Close',
    cancel: 'Cancel',
    confirm: 'Confirm',
    submit: 'Submit',
    next: 'Next',
    previous: 'Back',
    search: 'Search',
    all: 'All',
    sampleTag: 'Sample',
    optional: 'Optional',
    required: 'Required',
    wardLabel: 'Ward',
    hoursShort: 'h',
    daysShort: 'd',
    minutesShort: 'min',
    kmAway: 'km away',
    offlineBanner: 'Offline mode — showing cached shell and local data.',
    installApp: 'Install App',
    installIOS: 'Install on iOS',
    iosGuideTitle: 'Install on iPhone / iPad',
    iosGuideStep1: '1. Tap the Share button in the Safari toolbar.',
    iosGuideStep2: '2. Scroll down and tap "Add to Home Screen".',

    navHome: 'Home',
    navReport: 'Report',
    navServices: 'Services',
    navNearby: 'Nearby',
    navProfile: 'Profile',

    onboardingWelcome: 'Welcome to Mauganj Nagar Palika Seva',
    onboardingSubtitle: 'Grievance redressal, municipal taxes, garbage van tracking, and pilgrim services in one portal.',
    chooseLanguage: 'Choose your language',
    enterMobileTitle: 'Sign in with mobile number',
    enterMobileHint: 'Enter any 10-digit mobile number for this demo.',
    mobilePlaceholder: '10-digit mobile number',
    namePlaceholder: 'Your full name (e.g. Rajesh Shukla)',
    yourName: 'Citizen name',
    selectWard: 'Select your ward',
    sendOtp: 'Get OTP',
    otpTitle: 'Verify OTP',
    otpSentTo: 'Simulated SMS OTP sent to:',
    otpDemoHint: 'Always enter OTP 1234 for this demo.',
    verifyOtp: 'Verify & Continue',
    resendOtp: 'Resend OTP',
    resendIn: 'Resend in',
    changeNumber: 'Change number',
    errInvalidMobile: 'Please enter a valid 10-digit mobile number.',
    errInvalidName: 'Please enter your name (at least 2 characters).',
    errInvalidOtp: 'Invalid OTP. Please enter 1234 for the demo.',
    skipDemoLogin: 'Continue with sample profile',

    greetingCitizen: 'Namaste',
    reportProblemCta: 'Report a problem',
    reportProblemSub: 'Submit photo & location in 4 simple steps',
    quickServices: 'Quick services',
    tilePayTax: 'Pay tax',
    tileHelplines: 'Helplines',
    tileNearby: 'Nearby',
    tileGarbageVan: 'Garbage van',
    tileTempleInfo: 'Temple info',
    tileTrackComplaint: 'Track complaint',
    noticeBoard: 'Notice board',
    viewAll: 'View all',
    myActiveComplaints: 'My active complaints',
    noActiveComplaints: 'You have no active complaints right now.',
    noActiveComplaintsAction: 'Tap "Report a problem" above to submit a municipal issue.',

    reportStepTitle: 'Report a problem',
    step1Photo: '1. Add photo',
    step2Category: '2. Category',
    step3Location: '3. Location & Ward',
    step4Details: '4. Details & Submit',
    takeOrUploadPhoto: 'Capture or upload an issue photo',
    uploadPhotoBtn: 'Choose from Camera / Gallery',
    useSamplePhoto: 'Or pick a sample demo photo',
    samplePotholeLabel: 'Road pothole (Sample)',
    sampleGarbageLabel: 'Garbage overflow (Sample)',
    removePhoto: 'Remove photo',
    photoOptionalHint: 'A clear photo helps field staff locate and resolve the issue faster.',
    selectCategoryPrompt: 'Choose issue category (with SLA target)',
    slaTarget: 'SLA target:',
    detectGpsBtn: 'Detect my GPS location',
    gpsDetected: 'GPS location captured',
    gpsSimulatedNote: 'Demo mode: Used Mauganj ward centre GPS coordinates.',
    gpsFallbackNote: 'If GPS is unavailable, select your ward and enter a landmark below.',
    landmarkLabel: 'Nearest landmark / street address',
    landmarkPlaceholder: 'e.g. Near Chhoti Bazar Chowk main road',
    descriptionLabel: 'Additional description',
    descriptionPlaceholder: 'Describe the issue briefly...',
    voiceNoteBtn: 'Record voice note (Demo)',
    voicePlaceholderToast: 'Voice note recording will connect to device mic in production (demo placeholder).',
    reviewBeforeSubmit: 'Complaint summary',
    submitComplaintBtn: 'Submit complaint',
    complaintSuccessTitle: 'Complaint registered',
    complaintSuccessBody: 'Your complaint has been logged and routed to the concerned municipal wing.',
    viewComplaintBtn: 'View complaint status',
    errSelectCategory: 'Please select a complaint category.',
    errEnterLandmark: 'Please enter a nearby landmark or address.',
    errSelectWard: 'Please select your ward.',
    trackComplaintsTitle: 'Track complaints',
    searchByIdPlaceholder: 'Search by ID or landmark (e.g. MGJ-2026-0001)',
    noComplaintsFound: 'No complaints match this filter.',
    noComplaintsHint: 'Try clearing your filter or register a new complaint.',
    complaintDetailTitle: 'Complaint details',
    complaintIdLabel: 'Complaint ID',
    assignedOfficerLabel: 'Assigned officer',
    unassignedLabel: 'Pending assignment',
    slaDueLabel: 'SLA due time',
    overdueFlag: 'Overdue',
    withinSlaFlag: 'Within SLA',
    beforePhotoLabel: 'Before photo (Citizen)',
    afterPhotoLabel: 'After photo (Resolution)',
    noPhotoAttached: 'No photo attached',
    timelineTitle: 'Status timeline',
    feedbackPromptTitle: 'Rate the resolution',
    feedbackPromptBody: 'Are you satisfied with the work completed? Submit a rating to close or reopen the issue.',
    rateExperience: 'Rate service (1 to 5 stars)',
    feedbackCommentPlaceholder: 'Add a short feedback note (optional)...',
    submitRatingBtn: 'Submit rating & close',
    reopenComplaintBtn: 'Not resolved — Reopen',
    reopenReasonPlaceholder: 'Explain why this needs to be reopened (required)...',
    confirmReopenBtn: 'Confirm reopen',
    errSelectRating: 'Please select a star rating from 1 to 5.',
    errEnterReopenReason: 'Please enter a reason to reopen this complaint.',
    citizenRatingLabel: 'Citizen rating',

    statusLabels: {
      Registered: 'Registered',
      Assigned: 'Assigned',
      'In progress': 'In progress',
      Resolved: 'Resolved',
      Closed: 'Closed',
      Reopened: 'Reopened',
    },
    escalationLabels: {
      none: 'Normal',
      dept_head: 'Level 1: Dept Head (50%+ SLA)',
      cmo: 'Level 2: CMO (100%+ SLA)',
      president: 'Level 3: President (150%+ SLA)',
    },

    servicesHubTitle: 'Municipal Services',
    servicesHubSub: 'All Mauganj Nagar Palika citizen services',
    serviceCityInfo: 'City & Nagar Palika Info',
    serviceCityInfoSub: 'Department contacts, councillors, tenders, certificates',
    serviceBillsSub: 'Property tax, water tax & electricity info',
    serviceHelplinesSub: 'Fire, ambulance, police & municipal helplines',
    serviceGarbageSub: 'Waste collection routes & estimated arrival',
    serviceTempleSub: 'Devtalab & Ashtabhuja timings, crowd, parking & lost/found',
    serviceTrackSub: 'Track status & timeline of registered grievances',
    appIssuesTitle: 'App Related Issues',
    appIssuesSub: 'Direct grievance to Municipal Admin for app issues',
    aboutAppTitle: 'About App',
    aboutAppSub: 'Version v2.1.0 & IT administration details',
    achievementsTitle: 'Works Done by Nagar Palika',
    achievementsSub: 'Major development works & milestones completed by Nagar Palika',
    newsTitle: 'City News Updates',
    newsSub: "Daily municipal bulletin, announcements & today's civic news",
    achievementsFilterAll: 'All Works',
    newsFilterAll: 'All News',
    newsBreakingBadge: 'Breaking Update',
    newsTodayLive: "Today's Daily Bulletin",
    tankerBookingTitle: 'Water Tanker Booking',
    tankerBookingSub: 'Request emergency or event water tanker from Nagar Palika',
    jcbBookingTitle: 'JCB & Machinery Booking',
    jcbBookingSub: 'Book municipal JCB earthmover for debris removal & excavation',
    cameraOnlyPrompt: 'Capture Photo Using Live Camera',
    liveCameraSecurityNote: 'Security Rule: Only live photographs taken at the spot are accepted. Gallery upload is restricted.',
    openCameraBtn: 'Open Live Camera',
    capturePhotoBtn: 'Capture Photo',
    retakePhotoBtn: 'Retake Photo',
    cameraPermissionDenied: 'Camera access denied. Please allow camera access in browser settings.',
    cameraSwitchBtn: 'Switch Camera',
    vehicleLiveLocationTitle: 'Current Vehicle Location (Live Tracking)',
    vehicleCurrentStatus: 'Waste Collection In Progress',
    liveGpsTracking: 'AIS-140 Live GPS',
    speedLabel: 'Speed',
    lastPingLabel: 'Last Signal',
    stopsTimelineTitle: 'Route Stops & Collection Progress',
    completedStopLabel: 'Waste Collected',
    currentStopLabel: 'Vehicle Is Here Right Now',
    upcomingStopLabel: 'Upcoming Stop',
    setArrivalAlertBtn: 'Set Arrival Alert',
    arrivalAlertSetMsg: 'Arrival alert set for your ward',

    helplinesTitle: 'Emergency Helplines',
    helplinesDisclaimer: 'Notice: All numbers below are obvious sample placeholders for demo review only.',
    tapToCall: 'Call',
    simulatedCallNotice: 'Opening demo dialer for:',

    nearbyTitle: "What's Near Me (Mauganj)",
    listView: 'List',
    mapView: 'Map',
    getDirections: 'Get directions',
    callPlace: 'Call',
    placesFound: 'places found',
    noPlacesInCategory: 'No places listed in this category.',
    clearFilter: 'Show all categories',

    billsTitle: 'Pay Municipal Bills',
    propertyTax: 'Property Tax',
    waterTax: 'Water Tax',
    electricityInfoTile: 'Electricity Bill (Information Only)',
    electricityInfoDesc: 'Electricity supply in Mauganj is managed by MP Poorv Kshetra Vidyut Vitaran Co. (MPPKVVCL). Please pay electricity bills on the state utility portal.',
    electricityPortalNote: 'Mauganj Nagar Palika collects only Property Tax and Water Tax.',
    enterPropertyId: 'Enter Property ID',
    propertyIdPlaceholder: 'e.g. MGJ-P-1001',
    sampleIdsHint: 'Sample IDs: MGJ-P-1001, MGJ-P-1002, MGJ-P-1003',
    fetchDuesBtn: 'Fetch Dues',
    errPropertyIdRequired: 'Please enter a Property ID.',
    errPropertyIdNotFound: 'Property ID not found in sample records. Try MGJ-P-1001.',
    ownerName: 'Owner name',
    propertyAddress: 'Address',
    dueAmount: 'Due amount',
    alreadyPaidMsg: 'No outstanding dues remaining on this account.',
    choosePaymentMethod: 'Choose payment method (Simulated)',
    payViaUpi: 'Pay via UPI',
    payViaCard: 'Debit / Credit Card',
    upiIdPlaceholder: 'e.g. citizen@upi',
    cardLast4Placeholder: 'Last 4 digits of card (e.g. 4242)',
    errEnterUpi: 'Please enter a valid UPI ID (e.g. name@upi).',
    errEnterCard: 'Please enter 4 digits for the demo card.',
    payNowSimulated: 'Pay Now (Simulated)',
    paymentReceiptTitle: 'Payment Receipt (Sample)',
    receiptNoLabel: 'Receipt No.',
    paidOnLabel: 'Paid on',
    paymentModeLabel: 'Payment mode',
    demoPaymentDisclaimer: 'Demo receipt only. No actual financial transaction took place.',
    recentPaymentsTitle: 'Recent Payments',
    noPaymentsYet: 'No tax payments made in this session yet.',
    payAnotherBill: 'Pay another bill',

    garbageTitle: 'Garbage Van Tracking',
    selectYourWard: 'Select your ward',
    liveVanMapTitle: 'Live Van Route (Simulated GPS)',
    estimatedArrival: 'Estimated arrival',
    vanMovingStatus: 'Van active on route',
    routeListTitle: 'Collection Routes',
    vehicleLabel: 'Vehicle No.',
    driverLabel: 'Driver (Sample)',
    wardsCoveredLabel: 'Wards covered',
    scheduleLabel: 'Schedule',
    noRouteForWard: 'No route assigned for this ward in sample data.',
    viewAllRoutes: 'View all routes',

    templeTitle: 'Devtalab & Ashtabhuja Services',
    templeSubtitle: 'Devtalab Shiv Mandir & Maa Ashtabhuja Dham darshan, facilities & mela notices',
    crowdLevelTitle: 'Current Crowd Level (Sample)',
    crowdLow: 'Low crowd (~20 min darshan wait)',
    crowdMedium: 'Medium crowd (~45-60 min wait)',
    crowdHigh: 'High crowd (~90+ min wait)',
    darshanTimingsTitle: 'Darshan & Aarti Timings',
    ropewayStairsTitle: 'Shuttle & Temple Route Info',
    parkingTitle: 'Parking Availability (Sample)',
    toiletsWaterTitle: 'Temporary Toilets & Water Points',
    festivalCalendarTitle: 'Festival Calendar & Mela Notices',
    lostFoundTitle: 'Lost & Found Report Form',
    lostItemTab: 'Lost item',
    foundItemTab: 'Found item',
    itemDescLabel: 'Item / person description',
    itemDescPlaceholder: 'e.g. Blue backpack or mobile phone',
    locationSeenPlaceholder: 'Location (e.g. Near temple main gate)',
    contactPhonePlaceholder: 'Contact mobile (10 digits)',
    submitLostFoundBtn: 'Submit Lost & Found Report',
    lostFoundSubmitted: 'Lost & Found report logged at pilgrim helpdesk.',
    errLostFoundFields: 'Please enter description, location, and a valid 10-digit phone number.',
    recentLostFound: 'Recent Lost & Found entries',

    cityInfoTitle: 'City & Municipal Info',
    tabContacts: 'Departments',
    tabWards: 'Wards & Reps',
    tabNotices: 'Notices & Tenders',
    tabCertificates: 'Certificates',
    councillorLabel: 'Councillor (Sample)',
    wardOfficerLabel: 'Ward Officer (Sample)',
    certInfoTitle: 'Certificates & Building Permission',
    certBirthDeathInfo: 'Birth & Death Certificates: Free registration within 21 days of event. Required: hospital discharge slip and parent/applicant ID.',
    certBuildingInfo: 'Building Permission: Apply online with land ownership deed, approved site plan, and affidavit.',
    checkStatusTitle: 'Check Application Status (Sample)',
    appIdPlaceholder: 'Enter Application ID (e.g. MGJ-BC-2026-101)',
    sampleAppIdsHint: 'Sample IDs: MGJ-BC-2026-101, MGJ-DC-2026-204, MGJ-BP-2026-309',
    checkStatusBtn: 'Check Status',
    errAppIdRequired: 'Please enter an application ID.',
    errAppIdNotFound: 'Application ID not found. Try one of the sample IDs below.',

    notificationsTitle: 'Notifications (SMS / Push Demo)',
    markAllRead: 'Mark all read',
    noNotifications: 'No notifications yet.',
    noNotificationsHint: 'Simulated SMS and push alerts appear here when you report issues or pay bills.',
    simulatedSmsPushNote: 'In this demo, SMS and push notifications appear in-app.',

    profileTitle: 'Profile & Settings',
    myComplaintsLink: 'View my complaints',
    languageLabel: 'App language',
    darkModeLabel: 'Dark mode',
    lightModeLabel: 'Light mode',
    resetDemoData: 'Reset demo data',
    resetConfirmTitle: 'Reset all demo data?',
    resetConfirmBody: 'All new complaints, payments, and edits will be cleared and the 12 initial sample complaints will be restored.',
    resetDoneToast: 'Demo data restored to initial sample state.',
    signOutDemo: 'Change mobile login',
    appVersionNote: 'Mauganj Nagar Palika Seva • Approval Demo Build',

    officerRolePickerTitle: 'Select Officer Role (No password)',
    roleFieldStaff: 'Field Staff',
    roleFieldStaffSub: 'View assigned tasks by SLA left, start work & resolve with after photo',
    roleDeptOfficer: 'Department Officer',
    roleDeptOfficerSub: 'Filter all complaints, assign/reassign staff & monitor escalations',
    roleCmo: 'CMO Dashboard',
    roleCmoSub: 'SLA analytics, category chart, ward table, overdue list & CSV export',
    switchRole: 'Switch role',
    fieldStaffTitle: 'My Tasks (Field Staff)',
    selectStaffAccount: 'Active staff:',
    myTasksTab: 'Assigned to me',
    timeRemaining: 'Time left:',
    overdueBy: 'Overdue by:',
    openInMaps: 'Open location in Maps',
    startWorkBtn: 'Start work',
    markResolvedTitle: 'Mark complaint resolved',
    afterPhotoRequiredLabel: 'After-work photo (Required)',
    resolutionRemarkLabel: 'Resolution remark (Required)',
    resolutionRemarkPlaceholder: 'Summarize the repair or cleaning work done...',
    markResolvedBtn: 'Mark resolved',
    errAfterPhotoRequired: 'An after-work photo is required before marking resolved.',
    errRemarkRequired: 'Please enter a resolution remark (at least 5 characters).',
    noAssignedTasks: 'No pending requests are currently assigned to you.',
    noAssignedTasksHint: 'Requests assigned to you by your Department Officer will appear here.',

    deptOfficerTitle: 'Department Officer Console',
    filterStatus: 'Status',
    filterCategory: 'Category',
    filterWard: 'Ward',
    onlyOverdue: 'Overdue only',
    assignOfficer: 'Assign staff',
    reassignOfficer: 'Reassign',
    assignNotePlaceholder: 'Assignment instruction (optional)...',
    saveAssignmentBtn: 'Save assignment',
    escalationLabel: 'Escalation',

    cmoTitle: 'CMO Executive Dashboard',
    kpiTotal: 'Total',
    kpiPending: 'Pending',
    kpiOverdue: 'Overdue',
    kpiSlaPct: 'Resolved in SLA',
    kpiAvgRating: 'Avg Rating',
    chartByCategory: 'Complaints by Category',
    wardWiseTable: 'Ward-wise Summary',
    colWard: 'Ward',
    colTotal: 'Total',
    colPending: 'Pending',
    colOverdue: 'Overdue',
    colResolved: 'Resolved',
    topOverdueTitle: 'Top 5 Most Overdue Complaints',
    exportCsvBtn: 'Export CSV Report',
    csvExportedToast: 'Complaints CSV report downloaded.',
    municipalSummaryTitle: 'Municipal Activity Summary (Sample)',
    taxPaymentsCount: 'Tax payments',
    taxRevenueSample: 'Total tax collected',
    activeNoticesCount: 'Active notices & tenders',

    citizenLoginTab: 'Citizen Login',
    citizenRegisterTab: 'Sign Up',
    citizenLoginTitle: 'Sign in with registered mobile',
    citizenLoginHint: 'Enter your registered 10-digit mobile number (Demo OTP: 1234).',
    citizenRegisterTitle: 'Create new citizen account',
    citizenRegisterHint: 'New citizen? Enter your mobile, name, and ward to register.',
    errCitizenNotFound: 'Mobile number not registered. Please use the Sign Up tab to register.',
    errCitizenAlreadyExists: 'This mobile number is already registered. Please switch to Citizen Login.',
    quickDemoCitizens: 'Quick demo citizen accounts:',
    switchToEmployeeLogin: 'Go to Employee / Officer / Admin Login',
    switchToCitizenLogin: 'Back to Citizen Login',
    employeeLoginTitle: 'Employee & Officer Login',
    employeeLoginSubtitle: 'Field Staff, Department Officer, CMO, Mayor / President & Admin Portal',
    empIdOrMobileLabel: 'Employee ID or Mobile Number',
    empIdOrMobilePlaceholder: 'e.g. EMP-DO-01 or 9900000010',
    empPinLabel: 'Security PIN (4 digits)',
    empPinPlaceholder: 'Demo PIN: 1234',
    empLoginBtn: 'Sign in to Officer Portal',
    empDemoHint: 'Demo PIN is 1234 for all seeded accounts. Tap any role below to auto-fill:',
    empQuickFillTitle: 'Quick Demo Login (Auto-fill)',
    errInvalidEmpCredentials: 'Invalid Employee ID/Mobile or PIN. Check credentials (Demo PIN: 1234).',
    errEmpInactive: 'This employee account has been deactivated by Admin.',
    logoutBtn: 'Logout',

    roleMayor: 'Mayor / Municipal President',
    roleMayorSub: 'City analytics, ward metrics & full inspection of all citizen complaints',
    roleAdmin: 'System Admin',
    roleAdminSub: 'Manage employees & roles, publish notices, update live feeds & city info',
    mayorTitle: 'Mayor / President Dashboard',
    adminTitle: 'Admin Control Center',
    viewRequestBtn: 'View Request',
    analyticsTab: 'Analytics',
    allRequestsTab: 'All Requests',
    citizenDetailsTitle: 'Complainant Details',
    officerDirectiveLabel: 'Officer Directive / Inspection Remark',
    officerDirectivePlaceholder: 'Enter official instruction for field team or department...',
    addDirectiveBtn: 'Add Directive',
    directiveSavedToast: 'Official remark recorded in complaint timeline.',
    myComplaintsOnlyNote: 'Privacy: Only complaints submitted from your mobile number are visible here.',

    adminTabEmployees: 'Employees',
    adminTabNotices: 'Notices',
    adminTabLiveFeeds: 'Live Feeds',
    adminTabCityInfo: 'City Info',
    adminTabRequests: 'Requests',
    addEmployeeBtn: 'Add Employee',
    editRoleLabel: 'Change Role',
    activeLabel: 'Active',
    inactiveLabel: 'Inactive',
    saveChangesBtn: 'Save Changes',
    deleteBtn: 'Delete',
    addNoticeBtn: 'Publish New Notice',
    broadcastPushLabel: 'Also send in-app Push notification to citizens',
    templeLiveFeedTitle: 'Devtalab & Ashtabhuja Live Feed',
    garbageLiveFeedTitle: 'Garbage Van Live Route Feed',
    liveFeedUpdatedToast: 'Live data feed updated across the app.',
    departmentLabel: 'Department',
    deptScopeNote: 'Showing only requests belonging to your department.',
    staffScopeNote: 'Showing only requests assigned specifically to you.',
    deptFieldStaffLabel: 'Department Field Staff',
    noDeptFieldStaff: 'No active field staff available in this department.',
    deptOfficersGroupLabel: 'Department Officers (By Department)',
    fieldStaffGroupLabel: 'Field Staff (By Department)',
    leadershipGroupLabel: 'Leadership & Admin (All Departments)',

    infoAndLegalSection: 'Information & Legal',
    aboutTitle: 'About Us',
    aboutSub: 'About Mauganj Nagar Palika Parishad & this portal',
    faqTitle: 'FAQs',
    faqSub: 'Common questions about complaints, taxes & services',
    termsTitle: 'Terms of Use',
    termsSub: 'Rules and guidelines for using the citizen portal',
    privacyTitle: 'Privacy Policy',
    privacySub: 'How your citizen data is kept private and secure',
    aboutIntro:
      'Mauganj Nagar Palika Seva is the unified digital citizen and pilgrim services platform for Mauganj Nagar Palika Parishad, District Mauganj (Madhya Pradesh). It brings grievance redressal, municipal tax services, garbage van tracking, city information, and Devtalab Shiv Mandir & Maa Ashtabhuja Dham pilgrim support into one accessible mobile portal.',
    aboutMissionTitle: 'Our Mission',
    aboutMissionBody:
      'Every citizen grievance is routed directly to the concerned municipal department officer and departmental field staff, tracked against clear SLA timelines, and closed only after before/after verification and citizen feedback.',
    aboutHighlights: [
      { label: 'Municipal Wards', value: '15 Wards' },
      { label: 'Service Wings', value: '7 Depts' },
      { label: 'Grievance Tracking', value: '24×7 Live' },
      { label: 'Pilgrim Support', value: 'Devtalab & Ashtabhuja' },
    ],
    aboutContactTitle: 'Municipal Office Contact',
    aboutContactBody:
      'Office of Nagar Palika Parishad, Near LIC Office, Chak Road, Ward 3, Mauganj, District Mauganj (M.P.) 486331 · Office Hours: Mon–Sat, 10:00 AM – 5:30 PM.',
    faqItems: [
      {
        q: 'How do I submit a complaint and track its progress?',
        a: 'Tap "Report Issue" from Home, add a photo, select a category, set GPS or ward/landmark, and submit. You receive a unique ID (MGJ-2026-xxxx) to track live updates under "Track complaint".',
      },
      {
        q: 'Can other citizens view my submitted complaints?',
        a: 'No. Strict privacy controls ensure each citizen can only view complaints submitted from their own registered mobile number. Department officers only view their own department requests, and field staff only view tasks assigned to them.',
      },
      {
        q: 'What are the SLA resolution timelines by category?',
        a: 'Sanitation & Stray/Injured Cattle: 24h, Water Supply & Drainage: 48h, Street Lights: 72h, Other Issues: 96h, and Roads: 120h. Overdue complaints automatically escalate to senior leadership.',
      },
      {
        q: 'What if my issue is marked Resolved but not fixed properly?',
        a: 'Open the resolved complaint and tap "Not resolved — Reopen" with a brief reason. It immediately returns to the concerned department for follow-up.',
      },
      {
        q: 'Can I pay electricity bills through this app?',
        a: 'Mauganj Nagar Palika collects only Property Tax and Water Tax. Electricity supply and billing are managed by MP Poorv Kshetra Vidyut Vitaran Co. (MPPKVVCL).',
      },
      {
        q: 'How does Garbage Van Tracking work?',
        a: 'Open the "Garbage van" section and pick your ward to check the assigned collection vehicle, route stops, schedule, and estimated arrival time.',
      },
      {
        q: 'What pilgrim services are included for Devtalab & Ashtabhuja Temples?',
        a: 'Under "Temple info", pilgrims can check daily darshan & aarti timings, live crowd level, shuttle & route updates, parking availability, and submit Lost & Found reports.',
      },
    ],
    termsUpdatedLabel: 'Last updated: 2026 (Approval Demo Build)',
    termsSections: [
      {
        heading: '1. Scope of Services',
        body: 'This portal provides digital access to Mauganj Nagar Palika Parishad services including grievance reporting, municipal property and water tax utilities, waste collection tracking, local civic directories, and pilgrim assistance.',
      },
      {
        heading: '2. Citizen Responsibilities',
        body: 'Users agree to submit genuine civic issues with accurate ward, landmark, and photo details. Submitting false, abusive, or misleading reports is prohibited and may be rejected or closed by municipal authorities.',
      },
      {
        heading: '3. Service Level Agreements (SLA)',
        body: 'Displayed SLA targets represent standard resolution timelines per municipal wing. Actual resolution times may vary during extreme weather, emergencies, or major festival periods such as Mahashivratri, Sawan & Navratri Mela.',
      },
      {
        heading: '4. Municipal Tax Payments & Receipts',
        body: 'Tax payments apply to the specified Property ID. In this approval demo build, all payment flows and receipts are simulated and no real financial transactions occur.',
      },
      {
        heading: '5. Demo Notice',
        body: 'This application is an interactive approval prototype using sample citizen records, sample helpline numbers, and local browser state.',
      },
    ],
    privacyUpdatedLabel: 'Last updated: 2026 (Citizen Data Protection Policy)',
    privacySections: [
      {
        heading: '1. Information We Collect',
        body: 'To provide municipal services, the portal collects your name, 10-digit mobile number, ward number, and any photos, landmarks, or optional GPS coordinates attached to a grievance.',
      },
      {
        heading: '2. How Your Data Is Used',
        body: 'Your information is used solely to route complaints to the appropriate municipal department and field staff, deliver status notifications, and improve civic service delivery in Mauganj.',
      },
      {
        heading: '3. Strict Access Isolation & Confidentiality',
        body: 'Citizens can only access their own complaints and personal notifications. Department officers only view requests within their assigned department, and field staff only view requests assigned specifically to them.',
      },
      {
        heading: '4. Local Storage & Data Reset (Demo)',
        body: 'In this demo build, all records remain locally in your browser storage and are not transmitted to external servers. You can erase and reset all sample data anytime from Profile > Reset demo data.',
      },
      {
        heading: '5. Privacy Contact',
        body: 'For data correction requests or privacy inquiries, please contact the Citizen Facilitation & IT Cell at Nagar Palika Parishad, Mauganj.',
      },
    ],

    frontCityTagline: 'Nagar Palika Parishad, Mauganj · Madhya Pradesh',
    frontServicesTitle: 'Mauganj City Services',
    frontServicesSub: 'Tap any municipal or pilgrim service below to explore',
    frontAuthTitle: 'Citizen Account — Login or Register',
    frontAuthSub: 'Sign in or register to report civic issues, track status, and pay municipal taxes.',
    frontLoginCta: 'Login',
    frontRegisterCta: 'Register',
    frontLoginRequiredToast: 'Please login or register with your mobile number to use this service.',
    frontCarouselSlides: [
      {
        title: 'Devtalab Shiv Mandir & Maa Ashtabhuja Dham',
        subtitle: 'Darshan timings, shuttle status, parking & pilgrim support',
      },
      {
        title: 'Chhoti Bazar & Mauganj Municipal Center',
        subtitle: 'Transparent, SLA-tracked civic services across all 15 wards',
      },
      {
        title: 'Clean & Green Mauganj Initiative',
        subtitle: 'Live garbage van routes & fast sanitation redressal',
      },
      {
        title: 'Mauganj Vindhya Heritage & Public Parks',
        subtitle: 'City notices, nearby facilities & emergency helplines',
      },
    ],
  },
};
