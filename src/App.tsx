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
import { FrontPageView, FrontPublicScreen } from './modules/frontpage/FrontPageView';
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
import { CitizenScreen, CitizenTab, ComplaintCategoryId, PlaceTypeId } from './types';
import { E_NAGARPALIKA_PORTAL_URL } from './constants';
import { AppIssuesView } from './modules/app_issues/AppIssuesView';
import { AboutAppView } from './modules/about_app/AboutAppView';
import { AchievementsView } from './modules/achievements/AchievementsView';
import { NewsView } from './modules/news/NewsView';
import { WaterTankerBookingView } from './modules/bookings/WaterTankerBookingView';
import { JcbBookingView } from './modules/bookings/JcbBookingView';

type GuestView = 'front' | 'login' | 'register' | FrontPublicScreen;

const TAB_SCREENS: CitizenTab[] = ['home', 'report', 'services', 'nearby', 'profile'];

const CitizenShell: React.FC = () => {
  const { citizen, t, showToast } = useApp();
  const [guestView, setGuestView] = useState<GuestView>('front');
  const [screen, setScreen] = useState<CitizenScreen>('home');
  const [previousScreen, setPreviousScreen] = useState<CitizenScreen>('home');
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);
  const [nearbyCategory, setNearbyCategory] = useState<PlaceTypeId>('hospital');
  const [reportCategory, setReportCategory] = useState<ComplaintCategoryId | undefined>(undefined);

  useEffect(() => {
    setScreen('home');
    setPreviousScreen('home');
    setSelectedComplaintId(null);
    if (!citizen.isAuthenticated) {
      setGuestView('front');
    }
  }, [citizen.mobile, citizen.isAuthenticated]);

  if (!citizen.isAuthenticated) {
    if (guestView === 'front') {
      return (
        <FrontPageView
          onOpenLogin={() => setGuestView('login')}
          onOpenRegister={() => setGuestView('register')}
          onOpenPublicScreen={(target) => setGuestView(target)}
          onRequireLogin={() => {
            showToast(t.citizenLoginTab, t.frontLoginRequiredToast, 'Info');
            setGuestView('login');
          }}
        />
      );
    }

    if (guestView === 'login' || guestView === 'register') {
      return (
        <OnboardingView
          initialTab={guestView}
          onBack={() => setGuestView('front')}
        />
      );
    }

    const guestTitleMap: Record<FrontPublicScreen, string> = {
      garbage: t.garbageTitle,
      temple: t.templeTitle,
      helplines: t.helplinesTitle,
      nearby: t.nearbyTitle,
      cityinfo: t.cityInfoTitle,
      about: t.aboutTitle,
      faq: t.faqTitle,
      terms: t.termsTitle,
      privacy: t.privacyTitle,
      achievements: t.achievementsTitle,
      news: t.newsTitle,
    };

    return (
      <div className="flex-1 flex flex-col min-h-0">
        <TopBar title={guestTitleMap[guestView]} onBack={() => setGuestView('front')} />
        <main className="flex-1 overflow-y-auto phone-scroll bg-[var(--mnp-bg)]">
          {guestView === 'garbage' && <GarbageVanView />}
          {guestView === 'temple' && <TempleView />}
          {guestView === 'helplines' && <HelplinesView />}
          {guestView === 'nearby' && <NearbyView initialCategory={nearbyCategory} />}
          {guestView === 'cityinfo' && <CityInfoView />}
          {guestView === 'achievements' && <AchievementsView />}
          {guestView === 'news' && <NewsView />}
          {(guestView === 'about' ||
            guestView === 'faq' ||
            guestView === 'terms' ||
            guestView === 'privacy') && <InfoPagesView page={guestView} />}
        </main>
      </div>
    );
  }

  const navigate = (target: CitizenScreen) => {
    if (target === 'bills') {
      window.location.href = E_NAGARPALIKA_PORTAL_URL;
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

  const openReportCategory = (category?: ComplaintCategoryId) => {
    setReportCategory(category);
    setPreviousScreen(screen);
    setScreen('report');
  };

  const openComplaint = (id: string) => {
    setSelectedComplaintId(id);
    setPreviousScreen(screen);
    setScreen('complaint_detail');
  };

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
    app_issues: t.appIssuesTitle,
    about_app: t.aboutAppTitle,
    achievements: t.achievementsTitle,
    news: t.newsTitle,
    tanker_booking: t.tankerBookingTitle,
    jcb_booking: t.jcbBookingTitle,
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
      screen === 'cityinfo' ||
      screen === 'app_issues' ||
      screen === 'about_app' ||
      screen === 'achievements' ||
      screen === 'news' ||
      screen === 'tanker_booking' ||
      screen === 'jcb_booking'
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
          screen !== 'notifications' ? () => navigate('notifications') : undefined
        }
      />

      <main className="flex-1 overflow-y-auto phone-scroll bg-[var(--mnp-bg)]">
        {screen === 'home' && (
          <HomeView
            onNavigate={navigate}
            onOpenComplaint={openComplaint}
            onOpenNearbyCategory={openNearbyCategory}
            onOpenReportCategory={openReportCategory}
          />
        )}
        {screen === 'report' && (
          <ReportFlow
            initialCategory={reportCategory}
            onSuccessViewComplaint={(id) => openComplaint(id)}
            onCancel={() => navigate('home')}
          />
        )}
        {screen === 'services' && (
          <ServicesHub
            onNavigate={navigate}
            onOpenReportCategory={openReportCategory}
          />
        )}
        {screen === 'nearby' && <NearbyView initialCategory={nearbyCategory} />}
        {screen === 'profile' && (
          <ProfileView
            onOpenMyComplaints={() => navigate('complaints')}
            onNavigate={navigate}
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
        {screen === 'app_issues' && (
          <AppIssuesView
            onCancel={() => navigate('services')}
            onSuccessViewComplaint={(id) => openComplaint(id)}
          />
        )}
        {screen === 'about_app' && (
          <AboutAppView
            onBack={() => navigate('services')}
            onOpenAppIssues={() => navigate('app_issues')}
            onOpenFaq={() => navigate('faq')}
            onOpenTerms={() => navigate('terms')}
            onOpenPrivacy={() => navigate('privacy')}
          />
        )}
        {screen === 'achievements' && <AchievementsView />}
        {screen === 'news' && <NewsView />}
        {screen === 'tanker_booking' && <WaterTankerBookingView onBack={handleBack} />}
        {screen === 'jcb_booking' && <JcbBookingView onBack={handleBack} />}
      </main>

      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
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
