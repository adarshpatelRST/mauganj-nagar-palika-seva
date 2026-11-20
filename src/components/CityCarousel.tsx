import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Landmark } from 'lucide-react';
import maugangCivicImg from '../assets/images/maugang_civic_square_1795170881913.jpg';
import devtalabMandirImg from '../assets/images/maugang_devtalab_mandir_1795170883566.jpg';
import bahutiWaterfallImg from '../assets/images/maugang_bahuti_waterfall_1795170890628.jpg';
import cleanAvenueImg from '../assets/images/maugang_clean_avenue_1795170900307.jpg';
import { useApp } from '../store/AppContext';

interface CitySlide {
  id: string;
  image: string;
  kickerHi: string;
  kickerEn: string;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  altEn: string;
}

const CITY_SLIDES: CitySlide[] = [
  {
    id: 'civic-square',
    image: maugangCivicImg,
    kickerHi: 'जिला मऊगंज · मध्य प्रदेश',
    kickerEn: 'District Maugang · Madhya Pradesh',
    titleHi: 'मऊगंज नगर पालिका परिसर',
    titleEn: 'Maugang Municipal Civic Center',
    subtitleHi: '15 वार्डों में पारदर्शी एवं त्वरित डिजिटल नागरिक सेवाएं',
    subtitleEn: 'Transparent digital civic services across all 15 wards',
    altEn: 'Maugang Municipal Civic Center and town square at golden hour',
  },
  {
    id: 'devtalab-mandir',
    image: devtalabMandirImg,
    kickerHi: 'पावन विरासत · देवतालाब',
    kickerEn: 'Sacred Heritage · Devtalab',
    titleHi: 'श्री देवतालाब शिव मंदिर',
    titleEn: 'Devtalab Shiv Mandir',
    subtitleHi: 'विंध्य अंचल की ऐतिहासिक आस्था एवं दर्शन सुविधा केंद्र',
    subtitleEn: 'Historic sandstone Shiva temple & pilgrim facilitation',
    altEn: 'Devtalab Shiv Mandir carved sandstone temple reflected in the temple pond',
  },
  {
    id: 'bahuti-waterfall',
    image: bahutiWaterfallImg,
    kickerHi: 'प्राकृतिक गौरव · पर्यटन',
    kickerEn: 'Natural Pride · Tourism',
    titleHi: 'बहुती जलप्रपात, मऊगंज',
    titleEn: 'Bahuti Waterfall, Maugang',
    subtitleHi: 'मध्य प्रदेश का सबसे ऊँचा जलप्रपात व विंध्य घाटी सौंदर्य',
    subtitleEn: "Madhya Pradesh's tallest waterfall in the Vindhya plateau",
    altEn: 'Panoramic view of Bahuti Waterfall cascading into a lush green gorge near Maugang',
  },
  {
    id: 'clean-maugang',
    image: cleanAvenueImg,
    kickerHi: 'स्वच्छ सर्वेक्षण · स्मार्ट नगर',
    kickerEn: 'Swachh Maugang · Green Town',
    titleHi: 'स्वच्छ एवं हरित मऊगंज',
    titleEn: 'Clean & Green Maugang',
    subtitleHi: 'नियमित कचरा संग्रहण, स्वच्छ मार्ग व हरित नागरिक उद्यान',
    subtitleEn: 'Daily waste collection, clean avenues, and green public parks',
    altEn: 'Clean tree-lined avenue and public garden park in Maugang',
  },
];

export const CityCarousel: React.FC = () => {
  const { language, t } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failedSlides, setFailedSlides] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);

  const total = CITY_SLIDES.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total]
  );

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [paused, total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartX.current;
    const endX = e.changedTouches[0]?.clientX ?? null;
    if (startX !== null && endX !== null) {
      const delta = startX - endX;
      if (Math.abs(delta) > 40) {
        if (delta > 0) goNext();
        else goPrev();
      }
    }
    touchStartX.current = null;
    setPaused(false);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t.frontCarouselAria}
      className="relative rounded-[20px] overflow-hidden bg-[#102033] shadow-[var(--mnp-shadow-card)] select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sliding Track */}
      <div
        className="flex transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {CITY_SLIDES.map((slide) => {
          const isFailed = failedSlides[slide.id];
          return (
            <div
              key={slide.id}
              className="w-full shrink-0 relative aspect-[16/10] bg-gradient-to-br from-[#1565C0] via-[#0D47A1] to-[#0A2540]"
            >
              {!isFailed ? (
                <img
                  src={slide.image}
                  alt={slide.altEn}
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setFailedSlides((prev) => ({ ...prev, [slide.id]: true }))
                  }
                  className="w-full h-full object-cover block"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-white/80">
                  <Landmark className="w-10 h-10" />
                  <span className="text-xs font-semibold">
                    {language === 'hi' ? slide.titleHi : slide.titleEn}
                  </span>
                </div>
              )}

              {/* Measured Dark Contrast Scrim */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none"
              />

              {/* Caption Content */}
              <div className="absolute inset-x-0 bottom-0 px-4 pb-8 pt-6 text-white">
                <p className="text-[11px] font-semibold text-white/80 tracking-wide">
                  {language === 'hi' ? slide.kickerHi : slide.kickerEn}
                </p>
                <h2 className="text-[17px] font-bold leading-snug mt-0.5 text-white [text-wrap:balance]">
                  {language === 'hi' ? slide.titleHi : slide.titleEn}
                </h2>
                <p className="text-xs text-white/85 mt-0.5 line-clamp-1">
                  {language === 'hi' ? slide.subtitleHi : slide.subtitleEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Previous & Next Controls */}
      <button
        type="button"
        onClick={goPrev}
        aria-label={t.previous}
        className="absolute left-1.5 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
      >
        <span className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xs flex items-center justify-center transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </span>
      </button>

      <button
        type="button"
        onClick={goNext}
        aria-label={t.next}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
      >
        <span className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xs flex items-center justify-center transition-colors">
          <ChevronRight className="w-4 h-4" />
        </span>
      </button>

      {/* Bottom Bar: Slide Indicators + Tabular Counter */}
      <div className="absolute inset-x-4 bottom-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5" role="tablist" aria-label={t.frontCarouselAria}>
          {CITY_SLIDES.map((slide, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`${idx + 1} / ${total}`}
                onClick={() => goTo(idx)}
                className="py-1.5 px-0.5 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-200 ${
                    active ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <span className="text-[11px] font-semibold text-white/85 tabular-nums">
          {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
};
