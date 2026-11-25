import React from 'react';
import {
  AlertTriangle,
  Banknote,
  BedDouble,
  Building2,
  Bus,
  Camera,
  Car,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Droplets,
  Fuel,
  GraduationCap,
  Grid2X2,
  HardHat,
  Hospital,
  Landmark,
  MapPin,
  Megaphone,
  Newspaper,
  PhoneCall,
  Shield,
  ShoppingBag,
  Smartphone,
  Toilet,
  Trophy,
  Truck,
  Wrench,
} from 'lucide-react';
import { CATEGORIES, E_NAGARPALIKA_PORTAL_URL, getSlaInfo, WARDS } from '../../constants';
import { StatusBadge } from '../../components/StatusBadge';
import { ICON_CIRCLE_THEMES, UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { CitizenScreen, ComplaintCategoryId, PlaceTypeId } from '../../types';
import { formatDate } from '../../utils/format';
import { SEED_ACHIEVEMENTS } from '../../data/seedData';
import { PROBLEM_CATEGORIES } from '../../constants/problemCategories';

interface HomeViewProps {
  onNavigate: (screen: CitizenScreen) => void;
  onOpenComplaint: (id: string) => void;
  onOpenNearbyCategory: (category: PlaceTypeId) => void;
  onOpenReportCategory?: (category: ComplaintCategoryId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenComplaint,
  onOpenNearbyCategory,
  onOpenReportCategory,
}) => {
  const { citizen, complaints, notices, language, t } = useApp();

  const wardObj = WARDS.find((w) => w.id === citizen.ward);
  const myActiveComplaints = complaints
    .filter((c) => c.mobile === citizen.mobile && c.status !== 'Closed')
    .slice(0, 3);

  const problemTiles = PROBLEM_CATEGORIES.map((prob) => ({
    id: `problem_${prob.id}`,
    label: language === 'hi' ? prob.shortLabelHi : prob.shortLabelEn,
    onClick: () => {
      if (onOpenReportCategory) {
        onOpenReportCategory(prob.id);
      } else {
        onNavigate('report');
      }
    },
    icon: prob.icon,
    iconTint: prob.iconBg,
  }));

  const serviceTiles: {
    id: string;
    label: string;
    screen?: CitizenScreen;
    onClick?: () => void;
    icon: React.ComponentType<{ className?: string }>;
    iconTint: string;
  }[] = [
      ...problemTiles,
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
        onClick: () => {
          window.location.href = E_NAGARPALIKA_PORTAL_URL;
        },
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
        id: 'tanker_booking',
        label: language === 'hi' ? 'पानी टैंकर' : 'Water Tanker',
        screen: 'tanker_booking',
        icon: Droplets,
        iconTint: ICON_CIRCLE_THEMES.blue,
      },
      {
        id: 'jcb_booking',
        label: language === 'hi' ? 'जेसीबी बुकिंग' : 'JCB Booking',
        screen: 'jcb_booking',
        icon: HardHat,
        iconTint: ICON_CIRCLE_THEMES.amber,
      },
      {
        id: 'temple',
        label: t.tileTempleInfo,
        screen: 'temple',
        icon: Landmark,
        iconTint: ICON_CIRCLE_THEMES.saffron,
      },
      {
        id: 'achievements',
        label: language === 'hi' ? 'नगर पालिका द्वारा किये गए कार्य' : 'Municipal Works',
        screen: 'achievements',
        icon: Trophy,
        iconTint: ICON_CIRCLE_THEMES.amber,
      },
      {
        id: 'news',
        label: language === 'hi' ? 'नगर समाचार अपडेट' : 'News Updates',
        screen: 'news',
        icon: Newspaper,
        iconTint: ICON_CIRCLE_THEMES.blue,
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
        id: 'about_app',
        label: language === 'hi' ? 'ऐप परिचय' : 'About App',
        screen: 'about_app',
        icon: Smartphone,
        iconTint: ICON_CIRCLE_THEMES.green,
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
      {/* Clean Minimal Citizen Greeting Row */}
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

      {/* Signature Azure Rounded Services Panel (3x3 White Floating Cards) */}
      <section aria-labelledby="home-services-title" className="space-y-3">
        <h2
          id="home-services-title"
          className="text-center text-[18px] font-bold text-[var(--mnp-primary)] tracking-tight"
        >
          {language === 'hi' ? 'मऊगंज नगर सेवाएं' : 'Mauganj Services'}
        </h2>

        <div className="rounded-[24px] bg-[#2196F3] dark:bg-[#1565C0] p-3.5 shadow-md">
          <div className="grid grid-cols-3 gap-2.5">
            {serviceTiles.map((tile) => {
              const Icon = tile.icon;
              return (
                <button
                  key={tile.id}
                  type="button"
                  onClick={() => {
                    if (tile.onClick) {
                      tile.onClick();
                    } else if (tile.screen) {
                      onNavigate(tile.screen);
                    }
                  }}
                  className="min-h-[96px] rounded-[14px] bg-white dark:bg-[#16202C] p-2.5 shadow-sm flex flex-col items-center justify-center gap-1.5 text-center active:scale-[0.97] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span
                    className={`w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0 shadow-xs ${tile.iconTint}`}
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

      {/* Clean My Active Complaints Preview */}
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

      {/* Top 3 Municipal Achievements Section */}
      <section aria-labelledby="home-achievements-title" className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-600" />
            <h2 id="home-achievements-title" className={UI.sectionTitle}>
              {t.achievementsTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('achievements')}
            className="min-h-[36px] px-1 text-xs font-bold text-[var(--mnp-primary)] flex items-center gap-0.5 hover:underline"
          >
            <span>{t.viewAll}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {SEED_ACHIEVEMENTS.slice(0, 3).map((ach) => {
            const displayPhoto = ach.photoAfter || ach.photo || ach.photoBefore;
            return (
              <button
                key={ach.id}
                type="button"
                onClick={() => onNavigate('achievements')}
                className={`${UI.cardInteractive} w-full p-3 text-left space-y-2 hover:border-[var(--mnp-primary)]/50 transition-all`}
              >
                <div className="flex items-start gap-3">
                  {displayPhoto ? (
                    <img
                      src={displayPhoto}
                      alt={language === 'hi' ? ach.titleHi : ach.titleEn}
                      className="w-14 h-14 rounded-[10px] object-cover shrink-0 bg-zinc-800"
                    />
                  ) : (
                    <div
                      className={`w-14 h-14 rounded-[10px] flex items-center justify-center shrink-0 ${ICON_CIRCLE_THEMES.amber}`}
                    >
                      <Trophy className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <span className="text-[10.5px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{language === 'hi' ? ach.statusBadgeHi : ach.statusBadgeEn}</span>
                      </span>

                      <span className="text-[10px] text-[var(--mnp-text-muted)] font-medium">
                        {ach.completionDate}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-[var(--mnp-text)] leading-snug line-clamp-2">
                      {language === 'hi' ? ach.titleHi : ach.titleEn}
                    </h3>
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--mnp-border)] flex items-center justify-between text-[11px] gap-2">
                  {ach.keyMetric && (
                    <span className="font-extrabold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800/40">
                      {ach.keyMetric.value}
                    </span>
                  )}
                  {ach.budget && (
                    <span className="text-[var(--mnp-text-muted)] font-medium">
                      {language === 'hi' ? 'लागत:' : 'Budget:'} {ach.budget}
                    </span>
                  )}
                  <span className="text-[var(--mnp-primary)] font-bold text-[11px] ml-auto flex items-center gap-0.5">
                    <span>{language === 'hi' ? 'विवरण' : 'Details'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

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
