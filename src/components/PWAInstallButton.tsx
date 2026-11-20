import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { UI } from '../theme/tokens';
import { useApp } from '../store/AppContext';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { t } = useApp();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) return null;

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={
          compact
            ? 'inline-flex items-center justify-center gap-1.5 rounded-[10px] bg-[var(--mnp-primary)] hover:bg-[var(--mnp-primary-hover)] text-white font-bold px-3 py-1.5 text-xs min-h-[38px] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)]'
            : `${UI.btnPrimary} w-full inline-flex items-center justify-center gap-2`
        }
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>{t.installApp}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className={
            compact
              ? 'inline-flex items-center justify-center gap-1.5 rounded-[10px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] text-[var(--mnp-text)] font-bold px-3 py-1.5 text-xs min-h-[38px] whitespace-nowrap shrink-0'
              : `${UI.btnOutline} w-full inline-flex items-center justify-center gap-2`
          }
        >
          <Download className="w-4 h-4 shrink-0" />
          <span>{t.installIOS}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-sm rounded-[16px] bg-[var(--mnp-surface)] border border-[var(--mnp-border)] p-5 shadow-xl">
              <h3 className="text-base font-bold text-[var(--mnp-text)]">{t.iosGuideTitle}</h3>
              <p className="mt-2 text-sm text-[var(--mnp-text-secondary)] leading-relaxed">
                {t.iosGuideStep1}
                <br />
                {t.iosGuideStep2}
              </p>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className={`${UI.btnPrimary} mt-4 w-full`}
              >
                {t.close}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
