import React, { useState } from 'react';
import {
  Building2,
  ChevronDown,
  ChevronUp,
  FileText,
  HelpCircle,
  Info,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';

export type InfoPageType = 'about' | 'faq' | 'terms' | 'privacy';

interface InfoPagesViewProps {
  page: InfoPageType;
}

export const InfoPagesView: React.FC<InfoPagesViewProps> = ({ page }) => {
  const { t } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (page === 'about') {
    return (
      <div className="p-4 space-y-4">
        <div className={`${UI.card} p-5 space-y-4`}>
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-full bg-[var(--mnp-primary)] text-white flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </span>
            <h2 className="text-[18px] font-bold text-[var(--mnp-primary)] tracking-tight">
              {t.aboutTitle}
            </h2>
          </div>

          <p className="text-[13.5px] text-[var(--mnp-text)] leading-relaxed">{t.aboutIntro}</p>

          {/* Key Civic Highlights */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {t.aboutHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-[12px] bg-[var(--mnp-surface-muted)] border border-[var(--mnp-border)] p-3 text-center space-y-0.5"
              >
                <div className="text-sm font-bold text-[var(--mnp-primary)]">{item.value}</div>
                <div className="text-[11px] font-semibold text-[var(--mnp-text-muted)]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className="pt-2 border-t border-[var(--mnp-border)] space-y-1.5">
            <h3 className="text-sm font-bold text-[var(--mnp-text)] flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[var(--mnp-primary)]" />
              <span>{t.aboutMissionTitle}</span>
            </h3>
            <p className="text-xs text-[var(--mnp-text-secondary)] leading-relaxed">
              {t.aboutMissionBody}
            </p>
          </div>

          {/* Office Contact */}
          <div className="rounded-[12px] bg-[var(--mnp-primary-soft)] p-3.5 space-y-1">
            <h3 className="text-xs font-bold text-[var(--mnp-primary)] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{t.aboutContactTitle}</span>
            </h3>
            <p className="text-xs text-[var(--mnp-text-secondary)] leading-relaxed">
              {t.aboutContactBody}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'faq') {
    return (
      <div className="p-4 space-y-3.5">
        <div className={`${UI.card} p-5 space-y-4`}>
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-full bg-[var(--mnp-primary)] text-white flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-[18px] font-bold text-[var(--mnp-primary)] tracking-tight leading-tight">
                {t.faqTitle}
              </h2>
              <p className="text-xs text-[var(--mnp-text-muted)] mt-0.5">{t.faqSub}</p>
            </div>
          </div>

          <div className="divide-y divide-[var(--mnp-border)] border-t border-[var(--mnp-border)]">
            {t.faqItems.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-1">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full min-h-[48px] py-2.5 flex items-center justify-between gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] rounded-[8px]"
                  >
                    <span className="text-[13.5px] font-bold text-[var(--mnp-text)] leading-snug">
                      {item.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[var(--mnp-primary)] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[var(--mnp-text-muted)] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="pb-3 pr-2 text-xs text-[var(--mnp-text-secondary)] leading-relaxed">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (page === 'terms') {
    return (
      <div className="p-4 space-y-4">
        <div className={`${UI.card} p-5 space-y-4`}>
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-full bg-[var(--mnp-primary)] text-white flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-[18px] font-bold text-[var(--mnp-primary)] tracking-tight leading-tight">
                {t.termsTitle}
              </h2>
              <p className="text-[11px] font-semibold text-[var(--mnp-text-muted)] mt-0.5">
                {t.termsUpdatedLabel}
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-1 border-t border-[var(--mnp-border)]">
            {t.termsSections.map((sec) => (
              <section key={sec.heading} className="space-y-1">
                <h3 className="text-[13.5px] font-bold text-[var(--mnp-text)]">{sec.heading}</h3>
                <p className="text-xs text-[var(--mnp-text-secondary)] leading-relaxed">
                  {sec.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className={`${UI.card} p-5 space-y-4`}>
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-full bg-[var(--mnp-primary)] text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-[18px] font-bold text-[var(--mnp-primary)] tracking-tight leading-tight">
              {t.privacyTitle}
            </h2>
            <p className="text-[11px] font-semibold text-[var(--mnp-text-muted)] mt-0.5">
              {t.privacyUpdatedLabel}
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-1 border-t border-[var(--mnp-border)]">
          {t.privacySections.map((sec) => (
            <section key={sec.heading} className="space-y-1">
              <h3 className="text-[13.5px] font-bold text-[var(--mnp-text)]">{sec.heading}</h3>
              <p className="text-xs text-[var(--mnp-text-secondary)] leading-relaxed">
                {sec.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
