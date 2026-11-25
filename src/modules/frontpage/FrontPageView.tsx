import React, { useEffect, useRef, useState } from 'react';
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Droplets,
  HardHat,
  Landmark,
  LogIn,
  MapPin,
  Moon,
  Newspaper,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Sun,
  Trophy,
  Truck,
  UserPlus,
  Wrench,
} from 'lucide-react';
import shardaTempleImg from '../../assets/images/maihar_sharda_temple_1795168401598.jpg';
import ghantagharImg from '../../assets/images/maihar_ghantaghar_town_1795168386525.jpg';
import cleanStreetImg from '../../assets/images/maihar_clean_street_1795168386862.jpg';
import heritageGardenImg from '../../assets/images/maihar_heritage_garden_1795168386059.jpg';
import { ICON_CIRCLE_THEMES, UI } from '../../theme/tokens';
import { E_NAGARPALIKA_PORTAL_URL } from '../../constants';
import { useApp } from '../../store/AppContext';
import { PROBLEM_CATEGORIES } from '../../constants/problemCategories';

export type FrontPublicScreen =
  | 'garbage'
  | 'temple'
  | 'helplines'
  | 'nearby'
  | 'cityinfo'
  | 'about'
  | 'faq'
  | 'terms'
  | 'privacy'
  | 'achievements'
  | 'news';

interface FrontPageViewProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenPublicScreen: (screen: FrontPublicScreen) => void;
  onRequireLogin: () => void;
}

const SLIDE_IMAGES = [shardaTempleImg, ghantagharImg, cleanStreetImg, heritageGardenImg];

export const FrontPageView: React.FC<FrontPageViewProps> = ({
  onOpenLogin,
  onOpenRegister,
  onOpenPublicScreen,
  onRequireLogin,
}) => {
  const { language, setLanguage, darkMode, toggleDarkMode, setAppMode, t } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);
  const [failedSlides, setFailedSlides] = useState<Record<number, boolean>>({});
  const touchStartX = useRef<number | null>(null);

  const slideCount = SLIDE_IMAGES.length;

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideCount);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [slideCount]);

  const goPrev = () => setActiveSlide((prev) => (prev - 1 + slideCount) % slideCount);
  const goNext = () => setActiveSlide((prev) => (prev + 1) % slideCount);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    if (delta > 40) goPrev();
    else if (delta < -40) goNext();
    touchStartX.current = null;
  };

  const problemServices = PROBLEM_CATEGORIES.map((prob) => ({
    id: `problem_${prob.id}`,
    label: language === 'hi' ? prob.shortLabelHi : prob.shortLabelEn,
    icon: prob.icon,
    iconTint: prob.iconBg,
    onClick: onRequireLogin,
  }));

  const cityServices: {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    iconTint: string;
    onClick: () => void;
  }[] = [
    ...problemServices,
    {
      id: 'track',
      label: t.tileTrackComplaint,
      icon: ClipboardList,
      iconTint: ICON_CIRCLE_THEMES.blue,
      onClick: onRequireLogin,
    },
    {
      id: 'tax',
      label: t.tilePayTax,
      icon: CreditCard,
      iconTint: ICON_CIRCLE_THEMES.indigo,
      onClick: () => {
        window.location.href = E_NAGARPALIKA_PORTAL_URL;
      },
    },
    {
      id: 'garbage',
      label: t.tileGarbageVan,
      icon: Truck,
      iconTint: ICON_CIRCLE_THEMES.green,
      onClick: () => onOpenPublicScreen('garbage'),
    },
    {
      id: 'tanker_booking',
      label: language === 'hi' ? 'पानी टैंकर' : 'Water Tanker',
      icon: Droplets,
      iconTint: ICON_CIRCLE_THEMES.blue,
      onClick: onRequireLogin,
    },
    {
      id: 'jcb_booking',
      label: language === 'hi' ? 'जेसीबी बुकिंग' : 'JCB Booking',
      icon: HardHat,
      iconTint: ICON_CIRCLE_THEMES.amber,
      onClick: onRequireLogin,
    },
    {
      id: 'temple',
      label: t.tileTempleInfo,
      icon: Landmark,
      iconTint: ICON_CIRCLE_THEMES.saffron,
      onClick: () => onOpenPublicScreen('temple'),
    },
    {
      id: 'achievements',
      label: language === 'hi' ? 'नगर पालिका द्वारा किये गए कार्य' : 'Municipal Works',
      icon: Trophy,
      iconTint: ICON_CIRCLE_THEMES.amber,
      onClick: () => onOpenPublicScreen('achievements'),
    },
    {
      id: 'news',
      label: language === 'hi' ? 'नगर समाचार अपडेट' : 'City News Updates',
      icon: Newspaper,
      iconTint: ICON_CIRCLE_THEMES.blue,
      onClick: () => onOpenPublicScreen('news'),
    },
    {
      id: 'helplines',
      label: t.tileHelplines,
      icon: PhoneCall,
      iconTint: ICON_CIRCLE_THEMES.red,
      onClick: () => onOpenPublicScreen('helplines'),
    },
    {
      id: 'nearby',
      label: t.tileNearby,
      icon: MapPin,
      iconTint: ICON_CIRCLE_THEMES.teal,
      onClick: () => onOpenPublicScreen('nearby'),
    },
    {
      id: 'cityinfo',
      label: language === 'hi' ? 'अपना क्षेत्र' : 'Ward & City',
      icon: Building2,
      iconTint: ICON_CIRCLE_THEMES.teal,
      onClick: () => onOpenPublicScreen('cityinfo'),
    },
    {
      id: 'about_app',
      label: language === 'hi' ? 'ऐप परिचय' : 'About App',
      icon: Smartphone,
      iconTint: ICON_CIRCLE_THEMES.green,
      onClick: () => onOpenPublicScreen('about'),
    },
  ];

  const currentMeta = t.frontCarouselSlides[activeSlide] || t.frontCarouselSlides[0];

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[var(--mnp-bg)]">
      {/* Clean Azure Top Bar */}
      <header className="bg-[#2196F3] dark:bg-[#1565C0] text-white px-3.5 h-[56px] flex items-center justify-between gap-2 shrink-0 shadow-[var(--mnp-shadow-header)] z-20">
        <div className="flex items-center gap-2 min-w-0">
          <div
            aria-hidden="true"
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"
          >
            <Landmark className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-[15.5px] font-bold tracking-tight truncate">{t.appName}</h1>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            aria-label={t.languageLabel}
            className="min-h-[38px] px-2.5 rounded-full bg-white/20 text-xs font-bold hover:bg-white/30 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {language === 'hi' ? 'EN' : 'हिन्दी'}
          </button>
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label={darkMode ? t.lightModeLabel : t.darkModeLabel}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-white/15 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Scrollable Front Page Body */}
      <main className="flex-1 overflow-y-auto phone-scroll p-4 space-y-5">
        {/* 1. City Photo Carousel */}
        <section aria-label={t.frontCityTagline} className="space-y-2.5">
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full aspect-[16/10] rounded-[18px] overflow-hidden shadow-md bg-[#1565C0] select-none"
          >
            {SLIDE_IMAGES.map((src, idx) => {
              const isActive = idx === activeSlide;
              const slideText = t.frontCarouselSlides[idx] || currentMeta;
              const isFailed = Boolean(failedSlides[idx]);

              return (
                <div
                  key={idx}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {isFailed ? (
                    <div className="w-full h-full bg-gradient-to-br from-[#1976D2] to-[#0D47A1] flex flex-col items-center justify-center text-white/90 gap-2 p-4 text-center">
                      <Landmark className="w-10 h-10" />
                      <span className="text-sm font-bold">{slideText.title}</span>
                    </div>
                  ) : (
                    <img
                      src={src}
                      alt={slideText.title}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedSlides((prev) => ({
                          ...prev,
                          [idx]: true,
                        }))
                      }
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              );
            })}

            {/* Measured Contrast Scrim + Caption */}
            <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 pt-10 pb-3.5">
              <h2 className="text-[15px] font-bold text-white leading-snug">
                {currentMeta.title}
              </h2>
              <p className="text-[11.5px] text-white/90 leading-snug mt-0.5 line-clamp-2">
                {currentMeta.subtitle}
              </p>
            </div>

            {/* Carousel Prev / Next Controls */}
            <button
              type="button"
              onClick={goPrev}
              aria-label={t.previous}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 min-h-[40px] min-w-[40px] rounded-full bg-black/35 hover:bg-black/55 text-white flex items-center justify-center backdrop-blur-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={t.next}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 min-h-[40px] min-w-[40px] rounded-full bg-black/35 hover:bg-black/55 text-white flex items-center justify-center backdrop-blur-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Carousel Pagination Indicators + Quiet City Tagline */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-semibold text-[var(--mnp-text-muted)]">
              {t.frontCityTagline}
            </span>
            <div className="flex items-center gap-1.5" role="tablist" aria-label="City photos">
              {SLIDE_IMAGES.map((_, idx) => {
                const isActive = idx === activeSlide;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Slide ${idx + 1}`}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2 rounded-full transition-all ${
                      isActive
                        ? 'w-5 bg-[var(--mnp-primary)]'
                        : 'w-2 bg-[var(--mnp-border-strong)] hover:bg-[var(--mnp-primary)]/50'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* 2. All City Services Showcase */}
        <section aria-labelledby="front-services-heading" className="space-y-2.5">
          <div className="text-center space-y-0.5 px-1">
            <h2
              id="front-services-heading"
              className="text-[18px] font-bold text-[var(--mnp-primary)] tracking-tight"
            >
              {t.frontServicesTitle}
            </h2>
            <p className="text-xs text-[var(--mnp-text-muted)]">{t.frontServicesSub}</p>
          </div>

          <div className="rounded-[22px] bg-[#2196F3] dark:bg-[#1565C0] p-3.5 shadow-md">
            <div className="grid grid-cols-3 gap-2.5">
              {cityServices.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={service.onClick}
                    className="min-h-[94px] rounded-[14px] bg-white dark:bg-[#16202C] p-2.5 shadow-sm flex flex-col items-center justify-center gap-2 text-center active:scale-[0.97] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span
                      className={`w-10 h-10 rounded-[11px] flex items-center justify-center shrink-0 ${service.iconTint}`}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-bold text-[var(--mnp-text)] leading-tight line-clamp-2">
                      {service.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Citizen Login & Register Section (Below City Services) */}
        <section aria-labelledby="front-auth-heading" className={`${UI.card} p-4 space-y-3.5`}>
          <div className="text-center space-y-1">
            <h2
              id="front-auth-heading"
              className="text-[16px] font-bold text-[var(--mnp-text)] leading-snug"
            >
              {t.frontAuthTitle}
            </h2>
            <p className="text-xs text-[var(--mnp-text-muted)] leading-relaxed">
              {t.frontAuthSub}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={onOpenLogin}
              className={`${UI.btnPrimary} min-h-[48px] flex items-center justify-center gap-1.5 whitespace-nowrap`}
            >
              <LogIn className="w-4 h-4 shrink-0" />
              <span>{t.frontLoginCta}</span>
            </button>
            <button
              type="button"
              onClick={onOpenRegister}
              className="min-h-[48px] px-4 rounded-[12px] border-[1.5px] border-[var(--mnp-primary)] bg-[var(--mnp-surface)] text-[var(--mnp-primary)] hover:bg-[var(--mnp-primary-soft)] font-bold text-sm transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)]"
            >
              <UserPlus className="w-4 h-4 shrink-0" />
              <span>{t.frontRegisterCta}</span>
            </button>
          </div>

          <div className="pt-2 border-t border-[var(--mnp-border)]">
            <button
              type="button"
              onClick={() => setAppMode('officer')}
              className="w-full min-h-[44px] rounded-[10px] text-xs font-bold text-[var(--mnp-primary)] hover:bg-[var(--mnp-primary-soft)] flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{t.switchToEmployeeLogin}</span>
            </button>
          </div>
        </section>

        {/* Quiet Unboxed Footer Links (About · FAQs · Terms · Privacy) */}
        <footer className="pb-2 pt-0.5 text-center space-y-1.5">
          <nav
            aria-label={t.infoAndLegalSection}
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-semibold text-[var(--mnp-text-secondary)]"
          >
            <button
              type="button"
              onClick={() => onOpenPublicScreen('achievements')}
              className="min-h-[36px] px-1 hover:text-[var(--mnp-primary)] hover:underline"
            >
              {t.achievementsTitle}
            </button>
            <span aria-hidden="true" className="text-[var(--mnp-text-muted)]">
              ·
            </span>
            <button
              type="button"
              onClick={() => onOpenPublicScreen('news')}
              className="min-h-[36px] px-1 hover:text-[var(--mnp-primary)] hover:underline"
            >
              {t.newsTitle}
            </button>
            <span aria-hidden="true" className="text-[var(--mnp-text-muted)]">
              ·
            </span>
            <button
              type="button"
              onClick={() => onOpenPublicScreen('about')}
              className="min-h-[36px] px-1 hover:text-[var(--mnp-primary)] hover:underline"
            >
              {t.aboutTitle}
            </button>
            <span aria-hidden="true" className="text-[var(--mnp-text-muted)]">
              ·
            </span>
            <button
              type="button"
              onClick={() => onOpenPublicScreen('faq')}
              className="min-h-[36px] px-1 hover:text-[var(--mnp-primary)] hover:underline"
            >
              {t.faqTitle}
            </button>
            <span aria-hidden="true" className="text-[var(--mnp-text-muted)]">
              ·
            </span>
            <button
              type="button"
              onClick={() => onOpenPublicScreen('terms')}
              className="min-h-[36px] px-1 hover:text-[var(--mnp-primary)] hover:underline"
            >
              {t.termsTitle}
            </button>
            <span aria-hidden="true" className="text-[var(--mnp-text-muted)]">
              ·
            </span>
            <button
              type="button"
              onClick={() => onOpenPublicScreen('privacy')}
              className="min-h-[36px] px-1 hover:text-[var(--mnp-primary)] hover:underline"
            >
              {t.privacyTitle}
            </button>
          </nav>
          <p className="text-[11px] text-[var(--mnp-text-muted)]">{t.appVersionNote}</p>
        </footer>
      </main>
    </div>
  );
};
