import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Landmark,
  LogIn,
  MapPin,
  Phone,
  RefreshCw,
  ShieldCheck,
  User,
  UserPlus,
} from 'lucide-react';
import { DEMO_OTP, WARDS } from '../../constants';
import {
  DEFAULT_CITIZEN_MOBILE,
  DEFAULT_CITIZEN_NAME,
  DEFAULT_CITIZEN_WARD,
} from '../../data/seedData';
import { UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';

// REAL INTEGRATION NOTE: Connect mobile OTP dispatch & verification to a DLT-approved
// Indian SMS Gateway (NIC SMS / MSG91 / C-DAC) with backend rate-limiting and token session.

interface OnboardingViewProps {
  initialTab?: 'login' | 'register';
  onBack?: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  initialTab = 'login',
  onBack,
}) => {
  const {
    language,
    setLanguage,
    t,
    citizens,
    findCitizenByMobile,
    loginCitizen,
    registerCitizen,
    setAppMode,
    showToast,
  } = useApp();

  const [authTab, setAuthTab] = useState<'login' | 'register'>(initialTab);
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [mobile, setMobile] = useState(initialTab === 'login' ? DEFAULT_CITIZEN_MOBILE : '');
  const [name, setName] = useState('');
  const [ward, setWard] = useState<number>(DEFAULT_CITIZEN_WARD);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    setAuthTab(initialTab);
    setStep('form');
    setError('');
    setOtp('');
    setMobile(initialTab === 'login' ? DEFAULT_CITIZEN_MOBILE : '');
  }, [initialTab]);

  useEffect(() => {
    if (step !== 'otp' || timer <= 0) return;
    const id = window.setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [step, timer]);

  const switchAuthTab = (tab: 'login' | 'register') => {
    setAuthTab(tab);
    setStep('form');
    setError('');
    setOtp('');
    if (tab === 'login') {
      setMobile(DEFAULT_CITIZEN_MOBILE);
    } else {
      setMobile('');
      setName('');
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = mobile.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      setError(t.errInvalidMobile);
      return;
    }

    if (authTab === 'login') {
      const existing = findCitizenByMobile(cleaned);
      if (!existing) {
        setError(t.errCitizenNotFound);
        return;
      }
      setName(existing.name);
      setWard(existing.ward);
    } else {
      if (findCitizenByMobile(cleaned)) {
        setError(t.errCitizenAlreadyExists);
        return;
      }
      if (name.trim().length < 2) {
        setError(t.errInvalidName);
        return;
      }
    }

    setError('');
    setMobile(cleaned);
    setStep('otp');
    setTimer(30);
    setOtp('');
    showToast(
      language === 'hi' ? 'डेमो SMS OTP: 1234' : 'Simulated SMS OTP: 1234',
      `${t.otpSentTo} +91 ${cleaned}`,
      'SMS'
    );
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(30);
    setError('');
    showToast(
      language === 'hi' ? 'OTP पुनः भेजा गया: 1234' : 'OTP Resent: 1234',
      `${t.otpSentTo} +91 ${mobile}`,
      'SMS'
    );
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim() !== DEMO_OTP) {
      setError(t.errInvalidOtp);
      return;
    }
    setError('');
    if (authTab === 'login') {
      const res = loginCitizen(mobile);
      if (!res.ok && res.error) {
        setError(res.error);
      }
    } else {
      registerCitizen(mobile, name.trim(), ward);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto phone-scroll bg-[var(--mnp-surface)] flex flex-col">
      {/* Minimal Top Bar with Back & Language Switch */}
      <div className="px-4 pt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label={t.back}
              className="min-h-[44px] min-w-[40px] -ml-2 flex items-center justify-center rounded-full text-[var(--mnp-primary)] hover:bg-[var(--mnp-primary-soft)] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)]"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <span className="text-xs font-bold text-[var(--mnp-primary)] tracking-tight truncate">
            {t.appName}
          </span>
        </div>
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
            English
          </button>
        </div>
      </div>

      {/* Clean Airy Center Content */}
      <div className="px-5 pt-5 pb-6 flex-1 flex flex-col justify-between gap-6">
        <div className="space-y-5">
          {/* Clean Emblem + Centered Title */}
          <div className="text-center space-y-2.5">
            <div className="w-16 h-16 mx-auto rounded-full bg-[var(--mnp-primary-soft)] flex items-center justify-center shadow-xs">
              <Landmark className="w-8 h-8 text-[var(--mnp-primary)]" />
            </div>
            <div className="space-y-1">
              <h1 className="text-[21px] font-bold text-[var(--mnp-text)] leading-tight">
                {step === 'otp'
                  ? t.otpTitle
                  : authTab === 'login'
                  ? t.citizenLoginTitle
                  : t.citizenRegisterTitle}
              </h1>
              <p className="text-xs text-[var(--mnp-text-muted)] max-w-[280px] mx-auto leading-relaxed">
                {step === 'otp'
                  ? `${t.otpSentTo} +91 ${mobile}`
                  : authTab === 'login'
                  ? t.citizenLoginHint
                  : t.citizenRegisterHint}
              </p>
            </div>
          </div>

          {/* Login / Sign Up Segmented Pill */}
          {step === 'form' && (
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-[12px] bg-[var(--mnp-surface-muted)]">
              <button
                type="button"
                onClick={() => switchAuthTab('login')}
                className={`min-h-[42px] rounded-[10px] text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  authTab === 'login'
                    ? 'bg-[var(--mnp-primary)] text-white shadow-sm'
                    : 'text-[var(--mnp-text-secondary)] hover:text-[var(--mnp-text)]'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t.citizenLoginTab}</span>
              </button>
              <button
                type="button"
                onClick={() => switchAuthTab('register')}
                className={`min-h-[42px] rounded-[10px] text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  authTab === 'register'
                    ? 'bg-[var(--mnp-primary)] text-white shadow-sm'
                    : 'text-[var(--mnp-text-secondary)] hover:text-[var(--mnp-text)]'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{t.citizenRegisterTab}</span>
              </button>
            </div>
          )}

          {step === 'form' ? (
            <form onSubmit={handleSendOtp} className="space-y-3.5">
              {/* Mobile Input */}
              <div className="flex items-center rounded-[12px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-input-bg)] shadow-xs overflow-hidden focus-within:bg-[var(--mnp-surface)] focus-within:border-[var(--mnp-primary)] focus-within:ring-2 focus-within:ring-[var(--mnp-primary)]/20">
                <span className="pl-3.5 pr-2.5 text-sm font-bold text-[var(--mnp-primary)] flex items-center gap-1.5 shrink-0">
                  <Phone className="w-4 h-4" />
                  <span className="text-[var(--mnp-text-secondary)]">+91</span>
                </span>
                <input
                  id="onboard-mobile"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value.replace(/\D/g, ''));
                    setError('');
                  }}
                  placeholder={t.mobilePlaceholder}
                  aria-label={t.mobilePlaceholder}
                  className="flex-1 min-h-[50px] pr-3.5 text-sm bg-transparent text-[var(--mnp-text)] placeholder:text-[var(--mnp-text-muted)] outline-none tabular-nums"
                />
              </div>

              {authTab === 'register' && (
                <>
                  <div className="relative">
                    <User className="w-4 h-4 text-[var(--mnp-primary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="onboard-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError('');
                      }}
                      placeholder={t.namePlaceholder}
                      aria-label={t.yourName}
                      className={`${UI.input} pl-10 min-h-[50px] shadow-xs`}
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[var(--mnp-primary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      id="onboard-ward"
                      value={ward}
                      onChange={(e) => setWard(Number(e.target.value))}
                      aria-label={t.selectWard}
                      className={`${UI.input} pl-10 min-h-[50px] shadow-xs`}
                    >
                      {WARDS.map((w) => (
                        <option key={w.id} value={w.id}>
                          {language === 'hi' ? w.nameHi : w.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {error && (
                <p className={UI.errorText} role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className={`${UI.btnPrimary} w-full min-h-[50px] flex items-center justify-center gap-2`}
              >
                <span>{t.sendOtp}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {authTab === 'login' && (
                <div className="pt-2 space-y-2">
                  <p className="text-[11px] font-semibold text-[var(--mnp-text-muted)] text-center">
                    {t.quickDemoCitizens}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {citizens.slice(0, 3).map((c) => (
                      <button
                        key={c.mobile}
                        type="button"
                        onClick={() => loginCitizen(c.mobile)}
                        className="min-h-[36px] px-3 rounded-full border border-[var(--mnp-border)] bg-[var(--mnp-bg)] hover:border-[var(--mnp-primary)] text-[11px] font-semibold text-[var(--mnp-text-secondary)] transition-colors"
                      >
                        {c.name.split(' ')[0]} · <span className="tabular-nums">{c.mobile}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="rounded-[12px] bg-[var(--mnp-primary-soft)] px-4 py-2.5 text-center">
                <p className="text-xs font-bold text-[var(--mnp-primary)]">{t.otpDemoHint}</p>
              </div>

              <input
                id="onboard-otp"
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="1234"
                aria-label="OTP"
                autoFocus
                className={`${UI.input} min-h-[54px] text-center text-xl font-bold tracking-[0.5em] tabular-nums shadow-xs`}
              />

              {error && (
                <p className={UI.errorText} role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className={`${UI.btnPrimary} w-full min-h-[50px] flex items-center justify-center gap-2`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.verifyOtp}</span>
              </button>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setStep('form');
                    setError('');
                  }}
                  className="min-h-[44px] px-2 text-xs font-bold text-[var(--mnp-text-secondary)] hover:text-[var(--mnp-primary)]"
                >
                  {t.changeNumber}
                </button>

                <button
                  type="button"
                  disabled={timer > 0}
                  onClick={handleResend}
                  className={`min-h-[44px] px-3 rounded-[10px] text-xs font-bold flex items-center gap-1.5 tabular-nums ${
                    timer > 0
                      ? 'text-[var(--mnp-text-muted)] cursor-not-allowed'
                      : 'text-[var(--mnp-primary)] hover:bg-[var(--mnp-primary-soft)]'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{timer > 0 ? `${t.resendIn} ${timer}s` : t.resendOtp}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Clean Bottom Portal Links */}
        <div className="space-y-2.5 pt-2 border-t border-[var(--mnp-border)]">
          <button
            type="button"
            onClick={() => setAppMode('officer')}
            className="w-full min-h-[48px] px-4 rounded-[12px] bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] text-xs font-bold flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{t.switchToEmployeeLogin}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const res = loginCitizen(DEFAULT_CITIZEN_MOBILE);
              if (!res.ok) {
                registerCitizen(DEFAULT_CITIZEN_MOBILE, DEFAULT_CITIZEN_NAME, DEFAULT_CITIZEN_WARD);
              }
            }}
            className="w-full min-h-[40px] text-xs font-semibold text-[var(--mnp-text-muted)] hover:text-[var(--mnp-primary)] transition-colors"
          >
            {t.skipDemoLogin}
          </button>
        </div>
      </div>
    </div>
  );
};
