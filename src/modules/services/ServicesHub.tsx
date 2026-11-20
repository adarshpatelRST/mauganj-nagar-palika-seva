import React from 'react';
import {
  Building2,
  ChevronRight,
  ClipboardList,
  CreditCard,
  FileText,
  HelpCircle,
  Info,
  Landmark,
  PhoneCall,
  PlusCircle,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { CitizenScreen } from '../../types';

interface ServicesHubProps {
  onNavigate: (screen: CitizenScreen) => void;
}

export const ServicesHub: React.FC<ServicesHubProps> = ({ onNavigate }) => {
  const { t } = useApp();

  const items: {
    screen: CitizenScreen;
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      screen: 'report',
      title: t.reportProblemCta,
      subtitle: t.reportProblemSub,
      icon: PlusCircle,
    },
    {
      screen: 'complaints',
      title: t.trackComplaintsTitle,
      subtitle: t.serviceTrackSub,
      icon: ClipboardList,
    },
    {
      screen: 'bills',
      title: t.billsTitle,
      subtitle: t.serviceBillsSub,
      icon: CreditCard,
    },
    {
      screen: 'garbage',
      title: t.garbageTitle,
      subtitle: t.serviceGarbageSub,
      icon: Truck,
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
      <div className="space-y-2.5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.screen}
              type="button"
              onClick={() => onNavigate(item.screen)}
              className={`${UI.cardInteractive} w-full min-h-[66px] px-4 py-3 flex items-center justify-between gap-3.5 text-left`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="w-10 h-10 rounded-[12px] bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] flex items-center justify-center shrink-0">
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
