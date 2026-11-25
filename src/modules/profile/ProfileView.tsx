import React, { useState } from 'react';
import {
  ChevronRight,
  ClipboardList,
  FileText,
  Globe,
  HelpCircle,
  Info,
  LogOut,
  MapPin,
  Moon,
  Phone,
  RotateCcw,
  ShieldCheck,
  Sun,
  User,
} from 'lucide-react';
import { WARDS } from '../../constants';
import { PWAInstallButton } from '../../components/PWAInstallButton';
import { UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { CitizenScreen } from '../../types';

interface ProfileViewProps {
  onOpenMyComplaints: () => void;
  onNavigate: (screen: CitizenScreen) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onOpenMyComplaints,
  onNavigate,
}) => {
  const {
    citizen,
    complaints,
    language,
    setLanguage,
    darkMode,
    toggleDarkMode,
    updateCitizenWard,
    resetDemoData,
    signOutCitizen,
    t,
  } = useApp();

  const [showResetModal, setShowResetModal] = useState(false);
  const myCount = complaints.filter((c) => c.mobile === citizen.mobile).length;

  return (
    <div className="p-4 space-y-4">
      {/* Clean Avatar & Identity Fields */}
      <div className={`${UI.card} p-4 space-y-3`}>
        <div className="flex items-center gap-3.5 pb-2 border-b border-[var(--mnp-border)]">
          <div className="w-14 h-14 rounded-full bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] flex items-center justify-center shrink-0">
            <User className="w-7 h-7" />
          </div>
          <div className="min-w-0">
            <h2 className="text-[16px] font-bold text-[var(--mnp-text)] truncate">
              {citizen.name}
            </h2>
            <p className="text-xs text-[var(--mnp-text-muted)] flex items-center gap-1 mt-0.5 tabular-nums">
              <Phone className="w-3.5 h-3.5 text-[var(--mnp-primary)]" />
              <span>+91 {citizen.mobile}</span>
            </p>
          </div>
        </div>

        {/* Ward Selector */}
        <div className="space-y-1.5">
          <label
            htmlFor="profile-ward"
            className="block text-xs font-bold text-[var(--mnp-text-secondary)]"
          >
            {t.selectWard}
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[var(--mnp-primary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="profile-ward"
              value={citizen.ward}
              onChange={(e) => updateCitizenWard(Number(e.target.value))}
              className={`${UI.input} pl-10`}
            >
              {WARDS.map((w) => (
                <option key={w.id} value={w.id}>
                  {language === 'hi' ? w.nameHi : w.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Clean Floating Action & Preference Rows */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={onOpenMyComplaints}
          className={`${UI.cardInteractive} w-full min-h-[60px] px-4 flex items-center justify-between gap-3 text-left`}
        >
          <span className="flex items-center gap-3 text-sm font-bold text-[var(--mnp-text)]">
            <span className="w-9 h-9 rounded-[10px] bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] flex items-center justify-center shrink-0">
              <ClipboardList className="w-4 h-4" />
            </span>
            <span>{t.myComplaintsLink}</span>
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-[var(--mnp-primary)] tabular-nums">
            <span>{myCount}</span>
            <ChevronRight className="w-4 h-4 text-[var(--mnp-text-muted)]" />
          </span>
        </button>

        {/* Language Toggle */}
        <div className={`${UI.card} min-h-[60px] px-4 py-2 flex items-center justify-between gap-3`}>
          <span className="flex items-center gap-3 text-sm font-bold text-[var(--mnp-text)]">
            <span className="w-9 h-9 rounded-[10px] bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4" />
            </span>
            <span>{t.languageLabel}</span>
          </span>
          <div className="inline-flex rounded-full bg-[var(--mnp-surface-muted)] p-0.5 border border-[var(--mnp-border)]">
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`min-h-[34px] px-3 rounded-full text-xs font-bold transition-colors ${
                language === 'hi'
                  ? 'bg-[var(--mnp-primary)] text-white'
                  : 'text-[var(--mnp-text-secondary)]'
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`min-h-[34px] px-3 rounded-full text-xs font-bold transition-colors ${
                language === 'en'
                  ? 'bg-[var(--mnp-primary)] text-white'
                  : 'text-[var(--mnp-text-secondary)]'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <button
          type="button"
          onClick={toggleDarkMode}
          className={`${UI.cardInteractive} w-full min-h-[60px] px-4 flex items-center justify-between gap-3 text-left`}
        >
          <span className="flex items-center gap-3 text-sm font-bold text-[var(--mnp-text)]">
            <span className="w-9 h-9 rounded-[10px] bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] flex items-center justify-center shrink-0">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </span>
            <span>{darkMode ? t.lightModeLabel : t.darkModeLabel}</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[var(--mnp-primary-soft)] text-[11px] font-bold text-[var(--mnp-primary)]">
            {darkMode ? 'ON' : 'OFF'}
          </span>
        </button>
      </div>

      {/* Information & Legal Section (About Us, FAQs, Terms of Use, Privacy Policy) */}
      <section className="space-y-2">
        <h3 className="px-1 text-xs font-bold text-[var(--mnp-text-muted)] uppercase tracking-wide">
          {t.infoAndLegalSection}
        </h3>
        <div className={`${UI.card} divide-y divide-[var(--mnp-border)] overflow-hidden`}>
          {(
            [
              { screen: 'about' as const, label: t.aboutTitle, sub: t.aboutSub, icon: Info },
              { screen: 'faq' as const, label: t.faqTitle, sub: t.faqSub, icon: HelpCircle },
              { screen: 'terms' as const, label: t.termsTitle, sub: t.termsSub, icon: FileText },
              {
                screen: 'privacy' as const,
                label: t.privacyTitle,
                sub: t.privacySub,
                icon: ShieldCheck,
              },
            ] as const
          ).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.screen}
                type="button"
                onClick={() => onNavigate(item.screen)}
                className="w-full min-h-[56px] px-4 py-2.5 flex items-center justify-between gap-3 text-left hover:bg-[var(--mnp-surface-muted)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--mnp-primary)]"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span className="w-9 h-9 rounded-[10px] bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-[var(--mnp-text)] leading-snug">
                      {item.label}
                    </span>
                    <span className="block text-[11px] text-[var(--mnp-text-muted)] truncate">
                      {item.sub}
                    </span>
                  </span>
                </span>
                <ChevronRight className="w-4 h-4 text-[var(--mnp-text-muted)] shrink-0" />
              </button>
            );
          })}
        </div>
      </section>

      {/* PWA Install Prompt Button */}
      <PWAInstallButton />

      {/* Reset Demo Data & Sign Out */}
      <div className="space-y-2.5 pt-1">
        <button
          type="button"
          onClick={() => setShowResetModal(true)}
          className={`${UI.btnDangerOutline} w-full flex items-center justify-center gap-2`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.resetDemoData}</span>
        </button>

        <button
          type="button"
          onClick={signOutCitizen}
          className={`${UI.btnOutline} w-full text-xs flex items-center justify-center gap-2`}
        >
          <LogOut className="w-4 h-4" />
          <span>{t.signOutDemo}</span>
        </button>
      </div>

      <p className="text-center text-[11px] text-[var(--mnp-text-muted)] pt-1">
        {t.appVersionNote}
      </p>

      {/* Clean Confirmation Dialog */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-xs rounded-[18px] bg-[var(--mnp-surface)] border border-[var(--mnp-border)] shadow-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-[var(--mnp-text)]">{t.resetConfirmTitle}</h3>
            <p className="text-xs text-[var(--mnp-text-secondary)] leading-relaxed">
              {t.resetConfirmBody}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className={`${UI.btnOutline} flex-1 text-xs`}
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetDemoData();
                  setShowResetModal(false);
                }}
                className="flex-1 min-h-[48px] rounded-[12px] bg-[var(--mnp-error)] text-white text-xs font-bold"
              >
                {t.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
