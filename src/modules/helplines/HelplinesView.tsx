import React from 'react';
import {
  AlertCircle,
  Ambulance,
  Building,
  Flame,
  Phone,
  Shield,
  Users,
  Zap,
} from 'lucide-react';
import { UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { HelplineItem } from '../../types';

const CATEGORY_ICON: Record<
  HelplineItem['category'],
  React.ComponentType<{ className?: string }>
> = {
  fire: Flame,
  ambulance: Ambulance,
  police: Shield,
  municipal: Building,
  women: Users,
  electricity: Zap,
};

export const HelplinesView: React.FC = () => {
  const { helplines, language, t, showToast } = useApp();

  return (
    <div className="p-4 space-y-3">
      <div className="rounded-[12px] bg-[var(--mnp-warning-bg)] px-3.5 py-2.5 flex items-start gap-2 text-xs text-[var(--mnp-warning)]">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <p className="font-medium leading-relaxed">{t.helplinesDisclaimer}</p>
      </div>

      <div className="space-y-2.5">
        {helplines.map((hl) => {
          const Icon = CATEGORY_ICON[hl.category];
          const title = language === 'hi' ? hl.titleHi : hl.titleEn;
          const subtitle = language === 'hi' ? hl.subtitleHi : hl.subtitleEn;

          return (
            <div
              key={hl.id}
              className={`${UI.card} min-h-[70px] px-4 py-3 flex items-center justify-between gap-3`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="w-10 h-10 rounded-[12px] bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-[14px] font-bold text-[var(--mnp-text)] leading-snug">
                    {title}
                  </div>
                  <div className="text-xs text-[var(--mnp-text-muted)] truncate mt-0.5">
                    {subtitle}
                  </div>
                  <div className="text-xs font-semibold text-[var(--mnp-primary)] mt-0.5 tabular-nums">
                    {hl.sampleNumber} · {t.sampleTag}
                  </div>
                </div>
              </div>

              <a
                href={`tel:${hl.sampleNumber.replace(/[^0-9+]/g, '')}`}
                aria-label={`${t.tapToCall} ${title}`}
                onClick={() =>
                  showToast(title, `${t.simulatedCallNotice} ${hl.sampleNumber}`, 'Info')
                }
                className="w-12 h-12 rounded-full bg-[#E8F5E9] dark:bg-[#0F2D1C] text-[#2E7D32] dark:text-[#4ADE80] hover:opacity-90 flex items-center justify-center shrink-0 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D32]"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
