import React from 'react';
import { Moon, ShieldCheck, Sun, User } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { PWAInstallButton } from './PWAInstallButton';

interface PhoneShellProps {
  children: React.ReactNode;
}

export const PhoneShell: React.FC<PhoneShellProps> = ({ children }) => {
  const { appMode, setAppMode, language, setLanguage, darkMode, toggleDarkMode, t } = useApp();

  return (
    <div className="min-h-screen w-full bg-[#EEF3F9] dark:bg-[#090F17] flex flex-col items-center md:py-5 md:px-4">
      {/* Desktop Switcher Bar above the 390px phone frame */}
      <div className="hidden md:flex w-full max-w-[420px] items-center justify-between gap-2 mb-3">
        <div
          role="tablist"
          aria-label="App Mode"
          className="inline-flex rounded-full bg-[var(--mnp-surface)] border border-[var(--mnp-border)] p-1 shadow-[var(--mnp-shadow-card)]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={appMode === 'citizen'}
            onClick={() => setAppMode('citizen')}
            className={`min-h-[36px] px-3.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] ${
              appMode === 'citizen'
                ? 'bg-[var(--mnp-primary)] text-white shadow-xs'
                : 'text-[var(--mnp-text-secondary)] hover:text-[var(--mnp-text)]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{t.citizenApp}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={appMode === 'officer'}
            onClick={() => setAppMode('officer')}
            className={`min-h-[36px] px-3.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] ${
              appMode === 'officer'
                ? 'bg-[var(--mnp-primary)] text-white shadow-xs'
                : 'text-[var(--mnp-text-secondary)] hover:text-[var(--mnp-text)]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.officerApp}</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="min-h-[36px] px-3 rounded-full bg-[var(--mnp-surface)] border border-[var(--mnp-border)] text-xs font-bold text-[var(--mnp-text)] hover:border-[var(--mnp-primary)] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)]"
          >
            {language === 'hi' ? 'EN' : 'हिन्दी'}
          </button>
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label={darkMode ? t.lightModeLabel : t.darkModeLabel}
            className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full bg-[var(--mnp-surface)] border border-[var(--mnp-border)] text-[var(--mnp-text)] hover:border-[var(--mnp-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)]"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <PWAInstallButton compact />
        </div>
      </div>

      {/* Phone frame on desktop (390px viewport), full-width native screen on mobile */}
      <div className="w-full md:w-[398px] md:rounded-[34px] md:p-[4px] md:bg-[#1E293B] md:dark:bg-[#263547] md:shadow-2xl md:border md:border-slate-500/30 flex-1 md:flex-none flex flex-col">
        <div className="relative w-full md:w-[390px] h-[100dvh] md:h-[800px] md:max-h-[calc(100vh-88px)] bg-[var(--mnp-bg)] md:rounded-[30px] overflow-hidden flex flex-col">
          {/* Thin saffron-white-green civic tricolor strip */}
          <div className="w-full flex h-[3px] shrink-0" aria-hidden="true">
            <div className="flex-1 bg-[#FF9933]" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-[#138808]" />
          </div>

          {/* Mobile-only compact demo banner + Citizen / Officer switch */}
          <div className="md:hidden flex items-center justify-between px-3 py-1 bg-[#F0F7FF] dark:bg-[#102033] border-b border-[var(--mnp-border)] shrink-0">
            <span className="text-[11px] font-semibold text-[#1565C0] dark:text-[#90CAF9] truncate">
              {t.demoBanner}
            </span>
            <button
              type="button"
              onClick={() => setAppMode(appMode === 'citizen' ? 'officer' : 'citizen')}
              className="ml-2 px-2.5 py-0.5 rounded-full bg-[var(--mnp-primary)] text-white text-[11px] font-bold whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)]"
            >
              {appMode === 'citizen' ? t.officerApp : t.citizenApp}
            </button>
          </div>

          {/* Desktop subtle demo banner inside phone */}
          <div className="hidden md:block px-3 py-1 bg-[#F0F7FF] dark:bg-[#102033] border-b border-[var(--mnp-border)] text-center text-[11px] font-semibold text-[#1565C0] dark:text-[#90CAF9] shrink-0">
            {t.demoBanner}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};
