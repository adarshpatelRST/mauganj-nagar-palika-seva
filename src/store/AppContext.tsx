import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { HELPLINES } from '../constants';
import {
  createSeedComplaints,
  createSeedNotifications,
  DEFAULT_CITIZEN_MOBILE,
  DEFAULT_CITIZEN_NAME,
  DEFAULT_CITIZEN_WARD,
  SEED_CITIZENS,
  SEED_CONTACTS,
  SEED_EMPLOYEES,
  SEED_GARBAGE_ROUTES,
  SEED_LOST_FOUND,
  SEED_NOTICES,
  SEED_PAYMENTS,
  SEED_TAX_ACCOUNTS,
  SEED_TEMPLE_FEED,
  SEED_WARD_DIRECTORY,
} from '../data/seedData';
import { TRANSLATIONS, Translations } from '../translations';
import {
  AppMode,
  AppNotification,
  CitizenAccount,
  CitizenProfile,
  Complaint,
  ComplaintCategoryId,
  Contact,
  Employee,
  HelplineItem,
  Language,
  LostAndFoundReport,
  Notice,
  OfficerRole,
  Payment,
  Route,
  TaxAccount,
  TempleLiveFeed,
  WardDirectoryEntry,
} from '../types';

const STORAGE_KEY = 'maugang_nagar_palika_demo_v1';

interface PersistedState {
  language: Language;
  darkMode: boolean;
  appMode: AppMode;
  officerRole: OfficerRole | null;
  loggedInEmployeeId: string | null;
  activeStaffId: string;
  citizen: CitizenProfile;
  citizens: CitizenAccount[];
  employees: Employee[];
  complaints: Complaint[];
  taxAccounts: TaxAccount[];
  payments: Payment[];
  notices: Notice[];
  lostAndFound: LostAndFoundReport[];
  notifications: AppNotification[];
  contacts: Contact[];
  wardDirectory: WardDirectoryEntry[];
  garbageRoutes: Route[];
  templeFeed: TempleLiveFeed;
  helplines: HelplineItem[];
}

function buildInitialState(): PersistedState {
  return {
    language: 'hi',
    darkMode: false,
    appMode: 'citizen',
    officerRole: null,
    loggedInEmployeeId: null,
    activeStaffId:
      SEED_EMPLOYEES.find((e) => e.role === 'field_staff')?.id || SEED_EMPLOYEES[0].id,
    citizen: {
      isAuthenticated: false,
      mobile: DEFAULT_CITIZEN_MOBILE,
      name: DEFAULT_CITIZEN_NAME,
      ward: DEFAULT_CITIZEN_WARD,
    },
    citizens: SEED_CITIZENS,
    employees: SEED_EMPLOYEES,
    complaints: createSeedComplaints(),
    taxAccounts: SEED_TAX_ACCOUNTS,
    payments: SEED_PAYMENTS,
    notices: SEED_NOTICES,
    lostAndFound: SEED_LOST_FOUND,
    notifications: createSeedNotifications(),
    contacts: SEED_CONTACTS,
    wardDirectory: SEED_WARD_DIRECTORY,
    garbageRoutes: SEED_GARBAGE_ROUTES.map((r) => ({ ...r, status: r.status || 'on_route' })),
    templeFeed: SEED_TEMPLE_FEED,
    helplines: HELPLINES,
  };
}

function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return buildInitialState();
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    const fallback = buildInitialState();
    return {
      ...fallback,
      ...parsed,
      citizen: { ...fallback.citizen, ...(parsed.citizen || {}) },
      citizens:
        Array.isArray(parsed.citizens) && parsed.citizens.length > 0
          ? parsed.citizens
          : fallback.citizens,
      employees:
        Array.isArray(parsed.employees) && parsed.employees.length > 0
          ? parsed.employees
          : fallback.employees,
      complaints:
        Array.isArray(parsed.complaints) && parsed.complaints.length > 0
          ? parsed.complaints
          : fallback.complaints,
      taxAccounts:
        Array.isArray(parsed.taxAccounts) && parsed.taxAccounts.length > 0
          ? parsed.taxAccounts
          : fallback.taxAccounts,
      payments: Array.isArray(parsed.payments) ? parsed.payments : fallback.payments,
      notices:
        Array.isArray(parsed.notices) && parsed.notices.length > 0
          ? parsed.notices
          : fallback.notices,
      lostAndFound: Array.isArray(parsed.lostAndFound)
        ? parsed.lostAndFound
        : fallback.lostAndFound,
      notifications: Array.isArray(parsed.notifications)
        ? parsed.notifications
        : fallback.notifications,
      contacts:
        Array.isArray(parsed.contacts) && parsed.contacts.length > 0
          ? parsed.contacts
          : fallback.contacts,
      wardDirectory:
        Array.isArray(parsed.wardDirectory) && parsed.wardDirectory.length > 0
          ? parsed.wardDirectory
          : fallback.wardDirectory,
      garbageRoutes:
        Array.isArray(parsed.garbageRoutes) && parsed.garbageRoutes.length > 0
          ? parsed.garbageRoutes
          : fallback.garbageRoutes,
      templeFeed: parsed.templeFeed ? { ...fallback.templeFeed, ...parsed.templeFeed } : fallback.templeFeed,
      helplines:
        Array.isArray(parsed.helplines) && parsed.helplines.length > 0
          ? parsed.helplines
          : fallback.helplines,
    };
  } catch {
    return buildInitialState();
  }
}

export interface ToastMessage {
  id: string;
  title: string;
  body?: string;
  channel?: 'SMS' | 'Push' | 'Info';
}

interface AppContextValue extends PersistedState {
  t: Translations;
  toast: ToastMessage | null;
  loggedInEmployee: Employee | null;
  dismissToast: () => void;
  showToast: (title: string, body?: string, channel?: 'SMS' | 'Push' | 'Info') => void;
  setLanguage: (lang: Language) => void;
  toggleDarkMode: () => void;
  setAppMode: (mode: AppMode) => void;
  setOfficerRole: (role: OfficerRole | null) => void;
  setActiveStaffId: (staffId: string) => void;

  // Citizen Auth
  findCitizenByMobile: (mobile: string) => CitizenAccount | undefined;
  loginCitizen: (mobile: string) => { ok: boolean; error?: string };
  registerCitizen: (mobile: string, name: string, ward: number) => void;
  completeOnboarding: (mobile: string, name: string, ward: number) => void;
  signOutCitizen: () => void;
  updateCitizenWard: (ward: number) => void;

  // Employee Auth
  loginEmployee: (
    identifier: string,
    pin: string
  ) => { ok: boolean; error?: string; employee?: Employee };
  logoutEmployee: () => void;

  // Complaints
  createComplaint: (input: {
    category: ComplaintCategoryId;
    ward: number;
    landmark: string;
    lat?: number;
    lng?: number;
    description?: string;
    beforePhoto?: string;
  }) => Complaint;
  assignComplaint: (complaintId: string, staffId: string, note?: string, assignedBy?: string) => void;
  addOfficerDirective: (complaintId: string, note: string, byLabel: string) => void;
  startComplaintWork: (complaintId: string, staffName: string) => void;
  resolveComplaint: (complaintId: string, afterPhoto: string, remark: string, staffName: string) => void;
  rateComplaint: (complaintId: string, rating: number, comment?: string) => void;
  reopenComplaint: (complaintId: string, reason: string) => void;

  // Bills & Temple
  payTaxBill: (
    propertyId: string,
    taxType: 'property' | 'water',
    method: 'UPI' | 'Card'
  ) => Payment | null;
  addLostAndFound: (report: Omit<LostAndFoundReport, 'id' | 'createdAt'>) => void;

  // Admin Management & Real-Time Feeds
  addEmployee: (emp: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, patch: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  addNotice: (notice: Omit<Notice, 'id'>, broadcastPush?: boolean) => void;
  updateNotice: (id: string, patch: Partial<Notice>) => void;
  deleteNotice: (id: string) => void;
  updateTempleFeed: (patch: Partial<TempleLiveFeed>) => void;
  updateGarbageRoute: (id: string, patch: Partial<Route>) => void;
  addContact: (contact: Omit<Contact, 'id'>) => void;
  updateContact: (id: string, patch: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  updateWardDirectoryEntry: (ward: number, patch: Partial<WardDirectoryEntry>) => void;
  updateHelpline: (id: string, patch: Partial<HelplineItem>) => void;

  // Notifications & Reset
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PersistedState>(() => loadState());
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore quota exceeded in extreme cases with large photos
    }
  }, [state]);

  useEffect(() => {
    const root = document.documentElement;
    if (state.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.lang = state.language;
  }, [state.darkMode, state.language]);

  const showToast = (title: string, body?: string, channel: 'SMS' | 'Push' | 'Info' = 'Info') => {
    const id = `toast-${Date.now()}`;
    setToast({ id, title, body, channel });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const pushNotification = (
    titleHi: string,
    titleEn: string,
    bodyHi: string,
    bodyEn: string,
    channel: 'SMS' | 'Push',
    complaintId?: string,
    targetMobile?: string
  ) => {
    // REAL INTEGRATION NOTE: Connect to SMS Gateway (DLT-approved NIC/MSG91) and Firebase Cloud Messaging (FCM) push service
    const notif: AppNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      titleHi,
      titleEn,
      bodyHi,
      bodyEn,
      time: new Date().toISOString(),
      read: false,
      channel,
      complaintId,
      targetMobile,
    };
    setState((prev) => ({
      ...prev,
      notifications: [notif, ...prev.notifications],
    }));
    showToast(
      state.language === 'hi' ? titleHi : titleEn,
      state.language === 'hi' ? bodyHi : bodyEn,
      channel
    );
  };

  const setLanguage = (language: Language) => {
    setState((prev) => ({ ...prev, language }));
  };

  const toggleDarkMode = () => {
    setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const setAppMode = (appMode: AppMode) => {
    setState((prev) => ({ ...prev, appMode }));
  };

  const setOfficerRole = (officerRole: OfficerRole | null) => {
    setState((prev) => ({ ...prev, officerRole }));
  };

  const setActiveStaffId = (activeStaffId: string) => {
    setState((prev) => ({ ...prev, activeStaffId }));
  };

  const findCitizenByMobile = (mobile: string) => {
    const cleaned = mobile.replace(/\D/g, '');
    return state.citizens.find((c) => c.mobile === cleaned);
  };

  const loginCitizen = (mobile: string): { ok: boolean; error?: string } => {
    const cleaned = mobile.replace(/\D/g, '');
    const found = state.citizens.find((c) => c.mobile === cleaned);
    if (!found) {
      return { ok: false, error: TRANSLATIONS[state.language].errCitizenNotFound };
    }
    setState((prev) => ({
      ...prev,
      citizen: {
        isAuthenticated: true,
        mobile: found.mobile,
        name: found.name,
        ward: found.ward,
      },
    }));
    pushNotification(
      'लॉगिन सफल (डेमो SMS)',
      'Login verified (Simulated SMS)',
      `मऊगंज नगर पालिका सेवा में स्वागत है, ${found.name}।`,
      `Welcome back to Maugang Nagar Palika Seva, ${found.name}.`,
      'SMS',
      undefined,
      found.mobile
    );
    return { ok: true };
  };

  const registerCitizen = (mobile: string, name: string, ward: number) => {
    const cleaned = mobile.replace(/\D/g, '');
    const cleanName = name.trim() || DEFAULT_CITIZEN_NAME;
    setState((prev) => {
      const exists = prev.citizens.some((c) => c.mobile === cleaned);
      const nextCitizens = exists
        ? prev.citizens.map((c) =>
            c.mobile === cleaned ? { ...c, name: cleanName, ward } : c
          )
        : [
            ...prev.citizens,
            {
              mobile: cleaned,
              name: cleanName,
              ward,
              registeredAt: new Date().toISOString(),
            },
          ];
      return {
        ...prev,
        citizens: nextCitizens,
        citizen: {
          isAuthenticated: true,
          mobile: cleaned,
          name: cleanName,
          ward,
        },
      };
    });
    pushNotification(
      'पंजीकरण सफल (डेमो SMS)',
      'Registration Complete (Simulated SMS)',
      `मऊगंज नगर पालिका सेवा में आपका स्वागत है, ${cleanName}।`,
      `Welcome to Maugang Nagar Palika Seva, ${cleanName}.`,
      'SMS',
      undefined,
      cleaned
    );
  };

  const completeOnboarding = (mobile: string, name: string, ward: number) => {
    registerCitizen(mobile, name, ward);
  };

  const signOutCitizen = () => {
    setState((prev) => ({
      ...prev,
      citizen: {
        ...prev.citizen,
        isAuthenticated: false,
      },
    }));
  };

  const updateCitizenWard = (ward: number) => {
    setState((prev) => ({
      ...prev,
      citizen: { ...prev.citizen, ward },
      citizens: prev.citizens.map((c) =>
        c.mobile === prev.citizen.mobile ? { ...c, ward } : c
      ),
    }));
  };

  const loginEmployee: AppContextValue['loginEmployee'] = (identifier, pin) => {
    const cleanId = identifier.trim().toUpperCase();
    const cleanMobile = identifier.replace(/\D/g, '');
    const cleanPin = pin.trim();
    const matched = state.employees.find(
      (e) =>
        (e.empCode.toUpperCase() === cleanId || (cleanMobile.length >= 10 && e.mobile === cleanMobile)) &&
        e.pin === cleanPin
    );
    if (!matched) {
      return { ok: false, error: TRANSLATIONS[state.language].errInvalidEmpCredentials };
    }
    if (!matched.active) {
      return { ok: false, error: TRANSLATIONS[state.language].errEmpInactive };
    }
    setState((prev) => ({
      ...prev,
      loggedInEmployeeId: matched.id,
      officerRole: matched.role,
      activeStaffId: matched.role === 'field_staff' ? matched.id : prev.activeStaffId,
    }));
    showToast(
      state.language === 'hi' ? 'अधिकारी लॉगिन सफल' : 'Employee Login Successful',
      `${state.language === 'hi' ? matched.nameHi : matched.nameEn} (${matched.empCode})`,
      'Info'
    );
    return { ok: true, employee: matched };
  };

  const logoutEmployee = () => {
    setState((prev) => ({
      ...prev,
      loggedInEmployeeId: null,
      officerRole: null,
    }));
  };

  const createComplaint: AppContextValue['createComplaint'] = (input) => {
    const nextNum =
      state.complaints.reduce((max, c) => {
        const match = c.id.match(/(\d+)$/);
        const n = match ? parseInt(match[1], 10) : 0;
        return Math.max(max, n);
      }, 0) + 1;
    const id = `MUG-2026-${String(nextNum).padStart(4, '0')}`;
    const now = new Date().toISOString();
    const newComplaint: Complaint = {
      id,
      mobile: state.citizen.mobile,
      name: state.citizen.name,
      ward: input.ward,
      category: input.category,
      landmark: input.landmark.trim(),
      lat: input.lat,
      lng: input.lng,
      description: input.description?.trim() || undefined,
      beforePhoto: input.beforePhoto,
      createdAt: now,
      status: 'Registered',
      history: [
        {
          time: now,
          status: 'Registered',
          note:
            state.language === 'hi'
              ? 'नागरिक द्वारा ऐप के माध्यम से शिकायत दर्ज की गई।'
              : 'Complaint registered via citizen portal.',
          by: state.citizen.name,
        },
      ],
    };
    setState((prev) => ({
      ...prev,
      complaints: [newComplaint, ...prev.complaints],
    }));
    pushNotification(
      `शिकायत ${id} दर्ज हुई`,
      `Complaint ${id} Registered`,
      `आपकी शिकायत वार्ड ${input.ward} हेतु सफलतापूर्वक दर्ज की गई है।`,
      `Your grievance for Ward ${input.ward} has been logged.`,
      'SMS',
      id,
      state.citizen.mobile
    );
    return newComplaint;
  };

  const assignComplaint = (
    complaintId: string,
    staffId: string,
    note?: string,
    assignedBy?: string
  ) => {
    const targetComplaint = state.complaints.find((c) => c.id === complaintId);
    const staff = state.employees.find((s) => s.id === staffId && s.role === 'field_staff' && s.active);
    if (!targetComplaint || !staff) return;
    // Enforce strict department scoping: only field staff of the complaint's department can be assigned
    if (staff.department !== targetComplaint.category) {
      showToast(
        state.language === 'hi'
          ? 'केवल इसी विभाग के फील्ड स्टाफ को कार्य सौंपा जा सकता है।'
          : 'Only field staff from the matching department can be assigned.',
        undefined,
        'Info'
      );
      return;
    }
    const staffLabel = staff.nameHi;
    const actor =
      assignedBy ||
      (state.loggedInEmployeeId
        ? state.employees.find((e) => e.id === state.loggedInEmployeeId)?.nameHi
        : undefined) ||
      'विभाग अधिकारी';
    const now = new Date().toISOString();
    setState((prev) => ({
      ...prev,
      complaints: prev.complaints.map((c) => {
        if (c.id !== complaintId) return c;
        const isReassign = Boolean(c.assignedTo);
        const historyNote =
          note && note.trim()
            ? `${staffLabel} को सौंपी गई: ${note.trim()}`
            : isReassign
            ? `${staffLabel} को पुनः सौंपी गई।`
            : `${staffLabel} को निराकरण हेतु सौंपी गई।`;
        return {
          ...c,
          assignedTo: staffId,
          status: c.status === 'Registered' || c.status === 'Reopened' ? 'Assigned' : c.status,
          history: [
            ...c.history,
            {
              time: now,
              status: 'Assigned',
              note: historyNote,
              by: actor,
            },
          ],
        };
      }),
    }));
    pushNotification(
      `शिकायत ${complaintId} सौंपी गई`,
      `Complaint ${complaintId} Assigned`,
      `${actor} द्वारा फील्ड स्टाफ ${staffLabel} को कार्य सौंपा गया।`,
      `Assigned to field staff ${staff.nameEn}.`,
      'Push',
      complaintId,
      targetComplaint.mobile
    );
  };

  const addOfficerDirective = (complaintId: string, note: string, byLabel: string) => {
    if (!note.trim()) return;
    const now = new Date().toISOString();
    setState((prev) => ({
      ...prev,
      complaints: prev.complaints.map((c) => {
        if (c.id !== complaintId) return c;
        return {
          ...c,
          history: [
            ...c.history,
            {
              time: now,
              status: c.status,
              note: note.trim(),
              by: byLabel,
            },
          ],
        };
      }),
    }));
    showToast(TRANSLATIONS[state.language].directiveSavedToast, complaintId, 'Info');
  };

  const startComplaintWork = (complaintId: string, staffName: string) => {
    const targetComplaint = state.complaints.find((c) => c.id === complaintId);
    const now = new Date().toISOString();
    setState((prev) => ({
      ...prev,
      complaints: prev.complaints.map((c) => {
        if (c.id !== complaintId) return c;
        return {
          ...c,
          status: 'In progress',
          history: [
            ...c.history,
            {
              time: now,
              status: 'In progress',
              note: 'फील्ड टीम स्थल पर पहुँच गई है और कार्य प्रारंभ कर दिया गया है।',
              by: staffName,
            },
          ],
        };
      }),
    }));
    pushNotification(
      `कार्य प्रारंभ: ${complaintId}`,
      `Work Started: ${complaintId}`,
      `${staffName} द्वारा मौके पर कार्य प्रारंभ किया गया।`,
      `Field work started by ${staffName}.`,
      'Push',
      complaintId,
      targetComplaint?.mobile
    );
  };

  const resolveComplaint = (
    complaintId: string,
    afterPhoto: string,
    remark: string,
    staffName: string
  ) => {
    const targetComplaint = state.complaints.find((c) => c.id === complaintId);
    const now = new Date().toISOString();
    setState((prev) => ({
      ...prev,
      complaints: prev.complaints.map((c) => {
        if (c.id !== complaintId) return c;
        return {
          ...c,
          status: 'Resolved',
          afterPhoto,
          history: [
            ...c.history,
            {
              time: now,
              status: 'Resolved',
              note: remark.trim(),
              by: staffName,
            },
          ],
        };
      }),
    }));
    pushNotification(
      `शिकायत ${complaintId} निराकृत हुई`,
      `Complaint ${complaintId} Resolved`,
      'निराकरण फोटो अपलोड हो गया है। कृपया नागरिक ऐप में रेटिंग दें।',
      'Resolution photo uploaded. Citizen can now rate or reopen.',
      'SMS',
      complaintId,
      targetComplaint?.mobile
    );
  };

  const rateComplaint = (complaintId: string, rating: number, comment?: string) => {
    const now = new Date().toISOString();
    setState((prev) => ({
      ...prev,
      complaints: prev.complaints.map((c) => {
        if (c.id !== complaintId || c.mobile !== prev.citizen.mobile) return c;
        return {
          ...c,
          status: 'Closed',
          rating,
          ratingComment: comment?.trim() || undefined,
          history: [
            ...c.history,
            {
              time: now,
              status: 'Closed',
              note: comment?.trim()
                ? `नागरिक ने ${rating} स्टार रेटिंग दी: ${comment.trim()}`
                : `नागरिक ने ${rating} स्टार रेटिंग देकर शिकायत बंद की।`,
              by: prev.citizen.name,
            },
          ],
        };
      }),
    }));
    pushNotification(
      `प्रतिक्रिया प्राप्त (${complaintId})`,
      `Feedback Recorded (${complaintId})`,
      `आपकी ${rating}★ रेटिंग दर्ज हो गई है। शिकायत बंद कर दी गई है।`,
      `Your ${rating}★ rating was saved and the complaint is now closed.`,
      'Push',
      complaintId,
      state.citizen.mobile
    );
  };

  const reopenComplaint = (complaintId: string, reason: string) => {
    const now = new Date().toISOString();
    setState((prev) => ({
      ...prev,
      complaints: prev.complaints.map((c) => {
        if (c.id !== complaintId || c.mobile !== prev.citizen.mobile) return c;
        return {
          ...c,
          status: 'Reopened',
          rating: undefined,
          history: [
            ...c.history,
            {
              time: now,
              status: 'Reopened',
              note: `नागरिक द्वारा पुनः खोली गई: ${reason.trim()}`,
              by: prev.citizen.name,
            },
          ],
        };
      }),
    }));
    pushNotification(
      `शिकायत ${complaintId} पुनः खोली गई`,
      `Complaint ${complaintId} Reopened`,
      'संबंधित विभाग अधिकारी को पुनः जांच हेतु सूचित कर दिया गया है।',
      'Concerned department officer has been alerted for re-inspection.',
      'SMS',
      complaintId,
      state.citizen.mobile
    );
  };

  const payTaxBill: AppContextValue['payTaxBill'] = (propertyId, taxType, method) => {
    const acct = state.taxAccounts.find(
      (a) => a.propertyId.toUpperCase() === propertyId.trim().toUpperCase()
    );
    if (!acct) return null;
    const amount = taxType === 'property' ? acct.propertyTaxDue : acct.waterTaxDue;
    if (amount <= 0) return null;
    const now = new Date().toISOString();
    const receiptNo = `MNP-REC-2026-${String(1000 + state.payments.length + 1)}`;
    const payment: Payment = {
      id: `pay-${Date.now()}`,
      receiptNo,
      propertyId: acct.propertyId,
      taxType,
      amount,
      method,
      paidAt: now,
      payerName: state.language === 'hi' ? acct.ownerNameHi : acct.ownerNameEn,
    };
    setState((prev) => ({
      ...prev,
      payments: [payment, ...prev.payments],
      taxAccounts: prev.taxAccounts.map((a) => {
        if (a.propertyId !== acct.propertyId) return a;
        return {
          ...a,
          propertyTaxDue: taxType === 'property' ? 0 : a.propertyTaxDue,
          waterTaxDue: taxType === 'water' ? 0 : a.waterTaxDue,
          lastPaidDate: now.slice(0, 10),
        };
      }),
    }));
    pushNotification(
      `भुगतान रसीद ${receiptNo}`,
      `Payment Receipt ${receiptNo}`,
      `₹${amount} का ${taxType === 'property' ? 'संपत्ति कर' : 'जल कर'} भुगतान (${method}) सफल।`,
      `₹${amount} ${taxType} tax payment via ${method} completed (Simulated).`,
      'SMS'
    );
    return payment;
  };

  const addLostAndFound: AppContextValue['addLostAndFound'] = (report) => {
    const newItem: LostAndFoundReport = {
      ...report,
      id: `lf-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      lostAndFound: [newItem, ...prev.lostAndFound],
    }));
    pushNotification(
      'खोया-पाया रिपोर्ट दर्ज',
      'Lost & Found Report Logged',
      'श्री देवतालाब शिव मंदिर सहायता केंद्र में आपकी सूचना दर्ज हो गई है।',
      'Your report has been logged with the Devtalab Shiv Mandir pilgrim helpdesk.',
      'Push'
    );
  };

  // --- Admin Management & Real-Time Feed Updaters ---
  const addEmployee: AppContextValue['addEmployee'] = (emp) => {
    const newEmp: Employee = {
      ...emp,
      id: `emp-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      employees: [newEmp, ...prev.employees],
    }));
    showToast(
      state.language === 'hi' ? 'नया कर्मचारी जोड़ा गया' : 'Employee Added',
      `${emp.empCode} · ${state.language === 'hi' ? emp.nameHi : emp.nameEn}`,
      'Info'
    );
  };

  const updateEmployee: AppContextValue['updateEmployee'] = (id, patch) => {
    setState((prev) => ({
      ...prev,
      employees: prev.employees.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
    showToast(
      state.language === 'hi' ? 'कर्मचारी विवरण अपडेट हुआ' : 'Employee Updated',
      undefined,
      'Info'
    );
  };

  const deleteEmployee = (id: string) => {
    setState((prev) => ({
      ...prev,
      employees: prev.employees.filter((e) => e.id !== id),
    }));
    showToast(
      state.language === 'hi' ? 'कर्मचारी हटाया गया' : 'Employee Removed',
      undefined,
      'Info'
    );
  };

  const addNotice: AppContextValue['addNotice'] = (notice, broadcastPush = true) => {
    const newNotice: Notice = {
      ...notice,
      id: `nt-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      notices: [newNotice, ...prev.notices],
    }));
    if (broadcastPush) {
      pushNotification(
        notice.titleHi,
        notice.titleEn,
        notice.bodyHi,
        notice.bodyEn,
        'Push'
      );
    } else {
      showToast(
        state.language === 'hi' ? 'नई सूचना प्रकाशित हुई' : 'Notice Published',
        notice.refNo,
        'Info'
      );
    }
  };

  const updateNotice: AppContextValue['updateNotice'] = (id, patch) => {
    setState((prev) => ({
      ...prev,
      notices: prev.notices.map((n) => (n.id === id ? { ...n, ...patch } : n)),
    }));
    showToast(TRANSLATIONS[state.language].liveFeedUpdatedToast, undefined, 'Info');
  };

  const deleteNotice = (id: string) => {
    setState((prev) => ({
      ...prev,
      notices: prev.notices.filter((n) => n.id !== id),
    }));
    showToast(
      state.language === 'hi' ? 'सूचना हटाई गई' : 'Notice Deleted',
      undefined,
      'Info'
    );
  };

  const updateTempleFeed: AppContextValue['updateTempleFeed'] = (patch) => {
    setState((prev) => ({
      ...prev,
      templeFeed: {
        ...prev.templeFeed,
        ...patch,
        updatedAt: new Date().toISOString(),
      },
    }));
    showToast(TRANSLATIONS[state.language].liveFeedUpdatedToast, undefined, 'Info');
  };

  const updateGarbageRoute: AppContextValue['updateGarbageRoute'] = (id, patch) => {
    setState((prev) => ({
      ...prev,
      garbageRoutes: prev.garbageRoutes.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    }));
    showToast(TRANSLATIONS[state.language].liveFeedUpdatedToast, undefined, 'Info');
  };

  const addContact: AppContextValue['addContact'] = (contact) => {
    const newContact: Contact = { ...contact, id: `ct-${Date.now()}` };
    setState((prev) => ({ ...prev, contacts: [newContact, ...prev.contacts] }));
    showToast(TRANSLATIONS[state.language].liveFeedUpdatedToast, undefined, 'Info');
  };

  const updateContact: AppContextValue['updateContact'] = (id, patch) => {
    setState((prev) => ({
      ...prev,
      contacts: prev.contacts.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
    showToast(TRANSLATIONS[state.language].liveFeedUpdatedToast, undefined, 'Info');
  };

  const deleteContact = (id: string) => {
    setState((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((c) => c.id !== id),
    }));
    showToast(TRANSLATIONS[state.language].liveFeedUpdatedToast, undefined, 'Info');
  };

  const updateWardDirectoryEntry: AppContextValue['updateWardDirectoryEntry'] = (ward, patch) => {
    setState((prev) => ({
      ...prev,
      wardDirectory: prev.wardDirectory.map((w) => (w.ward === ward ? { ...w, ...patch } : w)),
    }));
    showToast(TRANSLATIONS[state.language].liveFeedUpdatedToast, undefined, 'Info');
  };

  const updateHelpline: AppContextValue['updateHelpline'] = (id, patch) => {
    setState((prev) => ({
      ...prev,
      helplines: prev.helplines.map((h) => (h.id === id ? { ...h, ...patch } : h)),
    }));
    showToast(TRANSLATIONS[state.language].liveFeedUpdatedToast, undefined, 'Info');
  };

  const markAllNotificationsRead = () => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
    }));
  };

  const markNotificationRead = (id: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  };

  const resetDemoData = () => {
    const fresh = buildInitialState();
    fresh.language = state.language;
    fresh.darkMode = state.darkMode;
    fresh.citizen.isAuthenticated = true;
    setState(fresh);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    } catch {
      // ignore
    }
    showToast(TRANSLATIONS[state.language].resetDoneToast, undefined, 'Info');
  };

  const loggedInEmployee = useMemo(
    () => state.employees.find((e) => e.id === state.loggedInEmployeeId) || null,
    [state.employees, state.loggedInEmployeeId]
  );

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      t: TRANSLATIONS[state.language],
      toast,
      loggedInEmployee,
      dismissToast: () => setToast(null),
      showToast,
      setLanguage,
      toggleDarkMode,
      setAppMode,
      setOfficerRole,
      setActiveStaffId,
      findCitizenByMobile,
      loginCitizen,
      registerCitizen,
      completeOnboarding,
      signOutCitizen,
      updateCitizenWard,
      loginEmployee,
      logoutEmployee,
      createComplaint,
      assignComplaint,
      addOfficerDirective,
      startComplaintWork,
      resolveComplaint,
      rateComplaint,
      reopenComplaint,
      payTaxBill,
      addLostAndFound,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      addNotice,
      updateNotice,
      deleteNotice,
      updateTempleFeed,
      updateGarbageRoute,
      addContact,
      updateContact,
      deleteContact,
      updateWardDirectoryEntry,
      updateHelpline,
      markAllNotificationsRead,
      markNotificationRead,
      resetDemoData,
    }),
    [state, toast, loggedInEmployee]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
