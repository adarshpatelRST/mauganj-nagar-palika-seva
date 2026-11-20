import React from 'react';
import {
  AlertTriangle,
  Banknote,
  BedDouble,
  Building2,
  Bus,
  Camera,
  Car,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Droplets,
  Fuel,
  GraduationCap,
  Grid2X2,
  Hospital,
  Landmark,
  LogIn,
  MapPin,
  Megaphone,
  PhoneCall,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Toilet,
  Truck,
  UserPlus,
} from 'lucide-react';
import { CATEGORIES, getSlaInfo, WARDS } from '../../constants';
import { CityCarousel } from '../../components/CityCarousel';
import { StatusBadge } from '../../components/StatusBadge';
import { ICON_CIRCLE_THEMES, UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { CitizenScreen, PlaceTypeId } from '../../types';
import { formatDate } from '../../utils/format';

interface HomeViewProps {
  onNavigate: (screen: CitizenScreen) => void;
  onOpenComplaint: (id: string) => void;
  onOpenNearbyCategory: (category: PlaceTypeId) => void;
  onOpenAuth: (tab: 'login' | 'register') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenComplaint,
  onOpenNearbyCategory,
  onOpenAuth,
}) => {
  const { citizen, complaints, notices, language, setAppMode, t } = useApp();

  const wardObj = WARDS.find((w) => w.id === citizen.ward);
  const myActiveComplaints = citizen.isAuthenticated
    ? complaints.filter((c) => c.mobile === citizen.mobile && c.status !== 'Closed').slice(0, 3)
    : [];

  const serviceTiles: {
    id: string;
    label: string;
    screen: CitizenScreen;
    icon: React.ComponentType<{ className?: string }>;
    iconTint: string;
  }[] = [
    {
      id: 'report',
      label: language === 'hi' ? 'शिकायत दर्ज' : 'Report Issue',
      screen: 'report',
      icon: Camera,
      iconTint: ICON_CIRCLE_THEMES.red,
    },
    {
      id: 'track',
      label: t.tileTrackComplaint,
      screen: 'complaints',
      icon: ClipboardList,
      iconTint: ICON_CIRCLE_THEMES.blue,
    },
    {
      id: 'tax',
      label: t.tilePayTax,
      screen: 'bills',
      icon: CreditCard,
      iconTint: ICON_CIRCLE_THEMES.indigo,
    },
    {
      id: 'van',
      label: t.tileGarbageVan,
      screen: 'garbage',
      icon: Truck,
      iconTint: ICON_CIRCLE_THEMES.green,
    },
    {
      id: 'temple',
      label: t.tileTempleInfo,
      screen: 'temple',
      icon: Landmark,
      iconTint: ICON_CIRCLE_THEMES.saffron,
    },
    {
      id: 'help',
      label: t.tileHelplines,
      screen: 'helplines',
      icon: PhoneCall,
      iconTint: ICON_CIRCLE_THEMES.red,
    },
    {
      id: 'city',
      label: language === 'hi' ? 'अपना क्षेत्र' : 'Ward & City',
      screen: 'cityinfo',
      icon: Building2,
      iconTint: ICON_CIRCLE_THEMES.teal,
    },
    {
      id: 'notices',
      label: language === 'hi' ? 'सूचना पट्ट' : 'Notices',
      screen: 'cityinfo',
      icon: Megaphone,
      iconTint: ICON_CIRCLE_THEMES.amber,
    },
    {
      id: 'all',
      label: language === 'hi' ? 'सभी सेवाएं' : 'All Services',
      screen: 'services',
      icon: Grid2X2,
      iconTint: ICON_CIRCLE_THEMES.slate,
    },
  ];

  const nearMeTiles: {
    id: PlaceTypeId;
    labelHi: string;
    labelEn: string;
    icon: React.ComponentType<{ className?: string }>;
    tileBg: string;
  }[] = [
    {
      id: 'hospital',
      labelHi: 'अस्पताल',
      labelEn: 'Hospital',
      icon: Hospital,
      tileBg: 'bg-[#FFEBEE] text-[#D32F2F] dark:bg-[#3A1518] dark:text-[#F87171]',
    },
    {
      id: 'blood_bank',
      labelHi: 'ब्लड बैंक',
      labelEn: 'Blood Bank',
      icon: Droplets,
      tileBg: 'bg-[#FCE4EC] text-[#C2185B] dark:bg-[#3A1424] dark:text-[#F472B6]',
    },
    {
      id: 'police',
      labelHi: 'थाना',
      labelEn: 'Police',
      icon: Shield,
      tileBg: 'bg-[#E3F2FD] text-[#1565C0] dark:bg-[#132A42] dark:text-[#64B5F6]',
    },
    {
      id: 'parking',
      labelHi: 'पार्किंग',
      labelEn: 'Parking',
      icon: Car,
      tileBg: 'bg-[#E8EAF6] text-[#3949AB] dark:bg-[#1E2242] dark:text-[#818CF8]',
    },
    {
      id: 'bus_taxi',
      labelHi: 'बस स्टैंड',
      labelEn: 'Bus Stand',
      icon: Bus,
      tileBg: 'bg-[#FFF3E0] text-[#E65100] dark:bg-[#351D0E] dark:text-[#FB923C]',
    },
    {
      id: 'school',
      labelHi: 'विद्यालय',
      labelEn: 'School',
      icon: GraduationCap,
      tileBg: 'bg-[#EDE9FE] text-[#6D28D9] dark:bg-[#231942] dark:text-[#A78BFA]',
    },
    {
      id: 'market',
      labelHi: 'बाज़ार',
      labelEn: 'Market',
      icon: ShoppingBag,
      tileBg: 'bg-[#E8F5E9] text-[#2E7D32] dark:bg-[#0F2D1C] dark:text-[#4ADE80]',
    },
    {
      id: 'hotel',
      labelHi: 'होटल',
      labelEn: 'Hotel',
      icon: BedDouble,
      tileBg: 'bg-[#E0F2F1] text-[#00796B] dark:bg-[#0E2F2D] dark:text-[#26A69A]',
    },
    {
      id: 'public_toilet',
      labelHi: 'शौचालय',
      labelEn: 'Toilet',
      icon: Toilet,
      tileBg: 'bg-[#E0F7FA] text-[#00838F] dark:bg-[#0E2C33] dark:text-[#22D3EE]',
    },
    {
      id: 'bank_atm',
      labelHi: 'बैंक / ATM',
      labelEn: 'Bank/ATM',
      icon: Banknote,
      tileBg: 'bg-[#F3E5F5] text-[#7B1FA2] dark:bg-[#2D1838] dark:text-[#C084FC]',
    },
    {
      id: 'petrol_pump',
      labelHi: 'पेट्रोल पंप',
      labelEn: 'Petrol',
      icon: Fuel,
      tileBg: 'bg-[#FFF8E1] text-[#F57F17] dark:bg-[#33270B] dark:text-[#FBBF24]',
    },
    {
      id: 'dharamshala',
      labelHi: 'धर्मशाला',
      labelEn: 'Dharamshala',
      icon: Landmark,
      tileBg: 'bg-[#FBE9E7] text-[#D84315] dark:bg-[#381B14] dark:text-[#FB923C]',
    },
  ];

  return (
    <div className="p-4 space-y-5">
      {/* Compact Greeting Strip (only when signed in) */}
      {citizen.isAuthenticated && (
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-bold text-[var(--mnp-text)] truncate">
              {t.greetingCitizen}, {citizen.name}
            </p>
            <p className="text-xs text-[var(--mnp-text-muted)] flex items-center gap-1 mt-0.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-[var(--mnp-primary)] shrink-0" />
              <span className="truncate">
                {wardObj
                  ? language === 'hi'
                    ? wardObj.nameHi
                    : wardObj.nameEn
                  : `${t.wardLabel} ${citizen.ward}`}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('report')}
            className="min-h-[40px] px-3.5 rounded-full bg-[var(--mnp-primary)] hover:bg-[var(--mnp-primary-hover)] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shrink-0 whitespace-nowrap"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'शिकायत करें' : 'Report'}</span>
          </button>
        </div>
      )}

      {/* 1. Maugang City Images Carousel */}
      <CityCarousel />

      {/* 2. All Services for Maugang (Signature Azure 3x3 Services Panel) */}
      <section aria-labelledby="home-services-title" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2
            id="home-services-title"
            className="text-[17px] font-bold text-[var(--mnp-primary)] tracking-tight"
          >
            {language === 'hi' ? 'मऊगंज नगर सेवाएं' : 'Maugang City Services'}
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('services')}
            className="min-h-[36px] px-1 text-xs font-bold text-[var(--mnp-primary)] whitespace-nowrap"
          >
            {t.viewAll}
          </button>
        </div>

        <div className="rounded-[24px] bg-[#2196F3] dark:bg-[#1565C0] p-3.5 shadow-md">
          <div className="grid grid-cols-3 gap-2.5">
            {serviceTiles.map((tile) => {
              const Icon = tile.icon;
              return (
                <button
                  key={tile.id}
                  type="button"
                  onClick={() => onNavigate(tile.screen)}
                  className="min-h-[96px] rounded-[14px] bg-white dark:bg-[#16202C] p-2.5 shadow-sm flex flex-col items-center justify-center gap-2 text-center active:scale-[0.97] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span
                    className={`w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0 ${tile.iconTint}`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-bold text-[var(--mnp-text)] leading-tight line-clamp-2">
                    {tile.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clean "Near Me" 4-Column Category Grid */}
      <section aria-labelledby="home-nearme-title" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2
            id="home-nearme-title"
            className="text-[16px] font-bold text-[var(--mnp-primary)] tracking-tight"
          >
            {language === 'hi' ? 'नजदीकी सुविधाएं' : 'Near Me'}
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('nearby')}
            className="min-h-[36px] px-1 text-xs font-bold text-[var(--mnp-primary)]"
          >
            {t.viewAll}
          </button>
        </div>

        <div className={`${UI.card} p-3`}>
          <div className="grid grid-cols-4 gap-2.5">
            {nearMeTiles.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onOpenNearbyCategory(item.id)}
                  className="min-h-[74px] rounded-[12px] flex flex-col items-center justify-center gap-1.5 p-1 hover:bg-[var(--mnp-surface-muted)] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)]"
                >
                  <span
                    className={`w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0 ${item.tileBg}`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-[10.5px] font-semibold text-[var(--mnp-text)] leading-tight text-center truncate w-full">
                    {language === 'hi' ? item.labelHi : item.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Citizen Account: Register & Login (shown to visitors) OR My Active Complaints (when signed in) */}
      {!citizen.isAuthenticated ? (
        <section aria-labelledby="front-auth-heading" className={`${UI.card} p-5 space-y-4`}>
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-[12px] bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div className="min-w-0 space-y-1">
              <h2
                id="front-auth-heading"
                className="text-[15px] font-bold text-[var(--mnp-text)] leading-snug"
              >
                {t.frontAuthTitle}
              </h2>
              <p className="text-xs text-[var(--mnp-text-muted)] leading-relaxed">
                {t.frontAuthSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => onOpenAuth('register')}
              className={`${UI.btnPrimary} flex items-center justify-center gap-1.5 whitespace-nowrap`}
            >
              <UserPlus className="w-4 h-4 shrink-0" />
              <span>{t.frontRegisterBtn}</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenAuth('login')}
              className={`${UI.btnOutline} border-[var(--mnp-primary)] text-[var(--mnp-primary)] hover:bg-[var(--mnp-primary-soft)] flex items-center justify-center gap-1.5 whitespace-nowrap`}
            >
              <LogIn className="w-4 h-4 shrink-0" />
              <span>{t.frontLoginBtn}</span>
            </button>
          </div>

          <div className="pt-3 border-t border-[var(--mnp-border)]">
            <button
              type="button"
              onClick={() => setAppMode('officer')}
              className="w-full min-h-[44px] px-3 rounded-[10px] bg-[var(--mnp-surface-muted)] hover:bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] text-xs font-bold flex items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)]"
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{t.switchToEmployeeLogin}</span>
            </button>
          </div>
        </section>
      ) : (
        <section aria-labelledby="active-complaints-heading" className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 id="active-complaints-heading" className={UI.sectionTitle}>
              {t.myActiveComplaints}
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('complaints')}
              className="min-h-[36px] px-1 text-xs font-bold text-[var(--mnp-primary)]"
            >
              {t.viewAll}
            </button>
          </div>

          {myActiveComplaints.length === 0 ? (
            <div className={UI.emptyState}>
              <p className="text-sm font-bold text-[var(--mnp-text)]">{t.noActiveComplaints}</p>
              <p className={UI.mutedText}>{t.noActiveComplaintsAction}</p>
              <button
                type="button"
                onClick={() => onNavigate('report')}
                className={`${UI.btnPrimary} mt-1`}
              >
                {t.reportProblemCta}
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {myActiveComplaints.map((c) => {
                const cat = CATEGORIES.find((x) => x.id === c.category);
                const sla = getSlaInfo(c.createdAt, c.category, c.status);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onOpenComplaint(c.id)}
                    className={`${UI.cardInteractive} w-full p-3.5 text-left space-y-2.5`}
                  >
                    <div className="flex items-start gap-3">
                      {c.beforePhoto ? (
                        <img
                          src={c.beforePhoto}
                          alt={c.id}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-[10px] object-cover shrink-0 bg-[var(--mnp-surface-muted)]"
                        />
                      ) : (
                        <div
                          className={`w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0 ${ICON_CIRCLE_THEMES.blue}`}
                        >
                          <ClipboardList className="w-5 h-5" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <p className="text-sm font-bold text-[var(--mnp-text)] leading-snug truncate">
                          {cat ? (language === 'hi' ? cat.labelHi : cat.labelEn) : c.category}
                        </p>
                        <p className="text-xs text-[var(--mnp-text-muted)] truncate">
                          {c.landmark} · {t.wardLabel} {c.ward}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[var(--mnp-text-muted)] shrink-0 mt-1" />
                    </div>

                    <div className="pt-2 border-t border-[var(--mnp-border)] flex items-center justify-between gap-2">
                      <StatusBadge status={c.status} />
                      <div className="flex items-center gap-2 text-[11px] tabular-nums">
                        {sla.isOverdue && (
                          <span className="text-[var(--mnp-error)] font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {t.overdueFlag}
                          </span>
                        )}
                        <span className="text-[var(--mnp-text-muted)] font-semibold">{c.id}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Clean Notice Board */}
      <section aria-labelledby="notice-board-heading" className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 id="notice-board-heading" className={UI.sectionTitle}>
            {t.noticeBoard}
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('cityinfo')}
            className="min-h-[36px] px-1 text-xs font-bold text-[var(--mnp-primary)]"
          >
            {t.viewAll}
          </button>
        </div>

        <div className="space-y-2">
          {notices.slice(0, 3).map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => onNavigate(n.type === 'navratri' ? 'temple' : 'cityinfo')}
              className={`${UI.cardInteractive} w-full min-h-[60px] px-3.5 py-3 text-left flex items-center justify-between gap-2.5`}
            >
              <span
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${ICON_CIRCLE_THEMES.blue}`}
              >
                <Megaphone className="w-4 h-4" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--mnp-text)] leading-snug line-clamp-2">
                  {language === 'hi' ? n.titleHi : n.titleEn}
                </p>
                <p className="text-[11px] text-[var(--mnp-text-muted)] mt-0.5 tabular-nums">
                  {formatDate(n.date, language)}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--mnp-text-muted)] shrink-0" />
            </button>
          ))}
        </div>
      </section>
      {/* Clean Quick Links: About Us, FAQs, Terms of Use, Privacy Policy */}
      <section aria-label={t.infoAndLegalSection} className="pt-1 pb-2">
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { screen: 'about' as const, label: t.aboutTitle },
              { screen: 'faq' as const, label: t.faqTitle },
              { screen: 'terms' as const, label: t.termsTitle },
              { screen: 'privacy' as const, label: t.privacyTitle },
            ] as const
          ).map((link) => (
            <button
              key={link.screen}
              type="button"
              onClick={() => onNavigate(link.screen)}
              className={`${UI.cardInteractive} min-h-[48px] px-3 py-2 text-xs font-bold text-[var(--mnp-primary)] text-center truncate`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
