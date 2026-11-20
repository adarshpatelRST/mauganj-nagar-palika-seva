import React, { useEffect, useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { NotificationToast } from './components/NotificationToast';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PhoneShell } from './components/PhoneShell';
import { TopBar } from './components/TopBar';
import { BillsView } from './modules/bills/BillsView';
import { CityInfoView } from './modules/cityinfo/CityInfoView';
import { ComplaintDetail } from './modules/complaints/ComplaintDetail';
import { ComplaintList } from './modules/complaints/ComplaintList';
import { ReportFlow } from './modules/complaints/ReportFlow';
import { GarbageVanView } from './modules/garbage/GarbageVanView';
import { HelplinesView } from './modules/helplines/HelplinesView';
import { HomeView } from './modules/home/HomeView';
import { InfoPagesView } from './modules/info/InfoPagesView';
import { NearbyView } from './modules/nearby/NearbyView';
import { NotificationsView } from './modules/notifications/NotificationsView';
import { OfficerApp } from './modules/officer/OfficerApp';
import { OnboardingView } from './modules/onboarding/OnboardingView';
import { ProfileView } from './modules/profile/ProfileView';
import { ServicesHub } from './modules/services/ServicesHub';
import { TempleView } from './modules/temple/TempleView';
import { AppProvider, useApp } from './store/AppContext';
import { CitizenScreen, CitizenTab, PlaceTypeId } from './types';

const TAB_SCREENS: CitizenTab[] = ['home', 'report', 'services', 'nearby', 'profile'];

const PROTECTED_SCREENS: CitizenScreen[] = [
  'report',
  'complaints',
  'complaint_detail',
  'notifications',
];

const CitizenShell: React.FC = () => {
  const { citizen, t } = useApp();
  const [screen, setScreen] = useState<CitizenScreen>('home');
  const [previousScreen, setPreviousScreen] = useState<CitizenScreen>('home');
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);
  const [nearbyCategory, setNearbyCategory] = useState<PlaceTypeId>('hospital');
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [pendingScreen, setPendingScreen] = useState<CitizenScreen | null>(null);
  const [authContextNotice, setAuthContextNotice] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (citizen.isAuthenticated) {
      if (pendingScreen) {
        setScreen(pendingScreen);
        setPendingScreen(null);
      } else if (screen === 'auth') {
        setScreen('home');
      }
      setAuthContextNotice(undefined);
    } else {
      setScreen('home');
      setPreviousScreen('home');
      setSelectedComplaintId(null);
      setPendingScreen(null);
      setAuthContextNotice(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citizen.mobile, citizen.isAuthenticated]);

  const openAuth = (tab: 'login' | 'register', targetAfterAuth?: CitizenScreen) => {
    setAuthTab(tab);
    setPendingScreen(targetAfterAuth ?? null);
    setAuthContextNotice(targetAfterAuth ? t.guestAuthRequiredNote : undefined);
    setPreviousScreen(screen === 'auth' ? 'home' : screen);
    setScreen('auth');
  };

  const navigate = (target: CitizenScreen) => {
    if (!citizen.isAuthenticated && PROTECTED_SCREENS.includes(target)) {
      openAuth('login', target);
      return;
    }
    setPreviousScreen(screen);
    setScreen(target);
  };

  const openNearbyCategory = (category: PlaceTypeId) => {
    setNearbyCategory(category);
    setPreviousScreen(screen);
    setScreen('nearby');
  };

  const openComplaint = (id: string) => {
    if (!citizen.isAuthenticated) {
      openAuth('login', 'complaints');
      return;
    }
    setSelectedComplaintId(id);
    setPreviousScreen(screen);
    setScreen('complaint_detail');
  };

  if (screen === 'auth' && !citizen.isAuthenticated) {
    return (
      <OnboardingView
        initialTab={authTab}
        contextNotice={authContextNotice}
        onBack={() => {
          setPendingScreen(null);
          setAuthContextNotice(undefined);
          setScreen(previousScreen === 'auth' ? 'home' : previousScreen);
        }}
      />
    );
  }

  const activeTab: CitizenTab = TAB_SCREENS.includes(screen as CitizenTab)
    ? (screen as CitizenTab)
    : screen === 'complaints' || screen === 'complaint_detail' || screen === 'notifications'
    ? 'home'
    : screen === 'about' || screen === 'faq' || screen === 'terms' || screen === 'privacy'
    ? previousScreen === 'home'
      ? 'home'
      : previousScreen === 'services'
      ? 'services'
      : 'profile'
    : 'services';

  const isRootTab = TAB_SCREENS.includes(screen as CitizenTab);

  const screenTitleMap: Record<CitizenScreen, string> = {
    home: t.appName,
    report: t.reportStepTitle,
    services: t.servicesHubTitle,
    nearby: t.nearbyTitle,
    profile: t.profileTitle,
    complaints: t.trackComplaintsTitle,
    complaint_detail: t.complaintDetailTitle,
    helplines: t.helplinesTitle,
    bills: t.billsTitle,
    garbage: t.garbageTitle,
    temple: t.templeTitle,
    cityinfo: t.cityInfoTitle,
    notifications: t.notificationsTitle,
    about: t.aboutTitle,
    faq: t.faqTitle,
    terms: t.termsTitle,
    privacy: t.privacyTitle,
    auth: t.citizenLoginTitle,
  };

  const handleBack = () => {
    if (screen === 'complaint_detail') {
      setScreen(previousScreen === 'complaint_detail' ? 'complaints' : previousScreen);
      return;
    }
    if (screen === 'about' || screen === 'faq' || screen === 'terms' || screen === 'privacy') {
      setScreen(
        previousScreen === 'home'
          ? 'home'
          : previousScreen === 'services'
          ? 'services'
          : 'profile'
      );
      return;
    }
    if (
      screen === 'helplines' ||
      screen === 'bills' ||
      screen === 'garbage' ||
      screen === 'temple' ||
      screen === 'cityinfo'
    ) {
      setScreen(previousScreen === 'home' ? 'home' : 'services');
      return;
    }
    setScreen('home');
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <TopBar
        title={screenTitleMap[screen]}
        onBack={!isRootTab ? handleBack : undefined}
        onOpenNotifications={
          citizen.isAuthenticated && screen !== 'notifications'
            ? () => navigate('notifications')
            : undefined
        }
      />

      <main className="flex-1 overflow-y-auto phone-scroll bg-[var(--mnp-bg)]">
        {screen === 'home' && (
          <HomeView
            onNavigate={navigate}
            onOpenComplaint={openComplaint}
            onOpenNearbyCategory={openNearbyCategory}
            onOpenAuth={(tab) => openAuth(tab)}
          />
        )}
        {screen === 'report' && (
          <ReportFlow
            onSuccessViewComplaint={(id) => openComplaint(id)}
            onCancel={() => navigate('home')}
          />
        )}
        {screen === 'services' && <ServicesHub onNavigate={navigate} />}
        {screen === 'nearby' && <NearbyView initialCategory={nearbyCategory} />}
        {screen === 'profile' && (
          <ProfileView
            onOpenMyComplaints={() => navigate('complaints')}
            onNavigate={navigate}
            onOpenAuth={(tab) => openAuth(tab)}
          />
        )}
        {screen === 'complaints' && (
          <ComplaintList
            onSelectComplaint={openComplaint}
            onReportNew={() => navigate('report')}
          />
        )}
        {screen === 'complaint_detail' && selectedComplaintId && (
          <ComplaintDetail complaintId={selectedComplaintId} onBack={handleBack} />
        )}
        {screen === 'helplines' && <HelplinesView />}
        {screen === 'bills' && <BillsView />}
        {screen === 'garbage' && <GarbageVanView />}
        {screen === 'temple' && <TempleView />}
        {screen === 'cityinfo' && <CityInfoView />}
        {screen === 'notifications' && (
          <NotificationsView
            onOpenComplaint={openComplaint}
            onReportNew={() => navigate('report')}
          />
        )}
        {(screen === 'about' ||
          screen === 'faq' ||
          screen === 'terms' ||
          screen === 'privacy') && <InfoPagesView page={screen} />}
      </main>

      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (!citizen.isAuthenticated && PROTECTED_SCREENS.includes(tab)) {
            openAuth('login', tab);
            return;
          }
          setPreviousScreen(screen);
          setScreen(tab);
        }}
      />
    </div>
  );
};

const MainApp: React.FC = () => {
  const { appMode } = useApp();

  return (
    <PhoneShell>
      <OfflineIndicator />
      <NotificationToast />
      {appMode === 'citizen' ? <CitizenShell /> : <OfficerApp />}
    </PhoneShell>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
