import React from 'react';
import {
  Building2,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Droplets,
  FileText,
  HardHat,
  HelpCircle,
  Info,
  Landmark,
  Newspaper,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Trophy,
  Truck,
} from 'lucide-react';
import { UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { CitizenScreen, ComplaintCategoryId } from '../../types';
import { E_NAGARPALIKA_PORTAL_URL } from '../../constants';
import { PROBLEM_CATEGORIES } from '../../constants/problemCategories';

interface ServicesHubProps {
  onNavigate: (screen: CitizenScreen) => void;
  onOpenReportCategory?: (category: ComplaintCategoryId) => void;
}

export const ServicesHub: React.FC<ServicesHubProps> = ({ onNavigate, onOpenReportCategory }) => {
  const { language, t } = useApp();

  const problemItems = PROBLEM_CATEGORIES.map((prob) => ({
    onClick: () => {
      if (onOpenReportCategory) {
        onOpenReportCategory(prob.id);
      } else {
        onNavigate('report');
      }
    },
    title: language === 'hi' ? prob.labelHi : prob.labelEn,
    subtitle: `${language === 'hi' ? prob.descHi : prob.descEn} • ${language === 'hi' ? prob.deptHi : prob.deptEn}`,
    icon: prob.icon,
    iconBg: prob.iconBg,
  }));

  const items: {
    screen?: CitizenScreen;
    onClick?: () => void;
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ className?: string }>;
    iconBg?: string;
  }[] = [
      ...problemItems,
      {
        screen: 'complaints',
        title: t.trackComplaintsTitle,
        subtitle: t.serviceTrackSub,
        icon: ClipboardList,
      },
      {
        title: t.billsTitle,
        subtitle: t.serviceBillsSub,
        icon: CreditCard,
        onClick: () => {
          window.location.href = E_NAGARPALIKA_PORTAL_URL;
        },
      },
      {
        screen: 'garbage',
        title: t.garbageTitle,
        subtitle: t.serviceGarbageSub,
        icon: Truck,
      },
      {
        screen: 'tanker_booking',
        title: t.tankerBookingTitle,
        subtitle: t.tankerBookingSub,
        icon: Droplets,
      },
      {
        screen: 'jcb_booking',
        title: t.jcbBookingTitle,
        subtitle: t.jcbBookingSub,
        icon: HardHat,
      },
      {
        screen: 'temple',
        title: t.templeTitle,
        subtitle: t.serviceTempleSub,
        icon: Landmark,
      },
      {
        screen: 'helplines',
        title: t.helplinesTitle,
        subtitle: t.serviceHelplinesSub,
        icon: PhoneCall,
      },
      {
        screen: 'cityinfo',
        title: t.serviceCityInfo,
        subtitle: t.serviceCityInfoSub,
        icon: Building2,
      },
      {
        screen: 'achievements',
        title: t.achievementsTitle,
        subtitle: t.achievementsSub,
        icon: Trophy,
      },
      {
        screen: 'news',
        title: t.newsTitle,
        subtitle: t.newsSub,
        icon: Newspaper,
      },
      {
        screen: 'about_app',
        title: t.aboutAppTitle,
        subtitle: t.aboutAppSub,
        icon: Smartphone,
      },
    ];

  const infoItems: {
    screen: CitizenScreen;
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
      { screen: 'about', title: t.aboutTitle, subtitle: t.aboutSub, icon: Info },
      { screen: 'faq', title: t.faqTitle, subtitle: t.faqSub, icon: HelpCircle },
      { screen: 'terms', title: t.termsTitle, subtitle: t.termsSub, icon: FileText },
      { screen: 'privacy', title: t.privacyTitle, subtitle: t.privacySub, icon: ShieldCheck },
    ];

  return (
    <div className="p-4 space-y-4">
      {/* Municipal Services & Tools */}
      <section className="space-y-2">
        <h2 className="px-1 text-xs font-bold uppercase tracking-wide text-[var(--mnp-text-muted)]">
          {language === 'hi' ? 'नगर पालिका सेवाएं व सुविधाएं' : 'Municipal Services & Facilities'}
        </h2>
        <div className="space-y-2.5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  } else if (item.screen) {
                    onNavigate(item.screen);
                  }
                }}
                className={`${UI.cardInteractive} w-full min-h-[66px] px-4 py-3 flex items-center justify-between gap-3.5 text-left`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span
                    className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 ${item.iconBg || 'bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)]'}`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[14px] font-bold text-[var(--mnp-text)] leading-snug">
                      {item.title}
                    </div>
                    <div className="text-xs text-[var(--mnp-text-muted)] mt-0.5 leading-snug truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--mnp-text-muted)] shrink-0" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Information & Legal */}
      <section className="space-y-2">
        <h2 className="px-1 text-xs font-bold uppercase tracking-wide text-[var(--mnp-text-muted)]">
          {t.infoAndLegalSection}
        </h2>
        <div className={`${UI.card} divide-y divide-[var(--mnp-border)] overflow-hidden`}>
          {infoItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.screen}
                type="button"
                onClick={() => onNavigate(item.screen)}
                className="w-full min-h-[56px] px-4 py-2.5 flex items-center justify-between gap-3 text-left hover:bg-[var(--mnp-surface-muted)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--mnp-primary)]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-9 h-9 rounded-[10px] bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[var(--mnp-text)] leading-snug">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-[var(--mnp-text-muted)] truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--mnp-text-muted)] shrink-0" />
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
