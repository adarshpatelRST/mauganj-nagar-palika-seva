import React, { useMemo, useState } from 'react';
import {
  BellRing,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  Droplets,
  ExternalLink,
  Flame,
  Info,
  Landmark,
  Megaphone,
  Newspaper,
  Radio,
  Share2,
  Sparkles,
  Truck,
  X,
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { SEED_NEWS } from '../../data/seedData';
import { NewsItem } from '../../types';
import { UI } from '../../theme/tokens';

type NewsCategoryFilter = 'all' | 'announcement' | 'sanitation' | 'water' | 'temple' | 'civic';

export const NewsView: React.FC = () => {
  const { language, t, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<NewsCategoryFilter>('all');
  const [activeModalItem, setActiveModalItem] = useState<NewsItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isHi = language === 'hi';

  // Dynamic today string
  const todayFormatted = useMemo(() => {
    const today = new Date();
    return today.toLocaleDateString(isHi ? 'hi-IN' : 'en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [isHi]);

  const filterOptions: { id: NewsCategoryFilter; label: string }[] = [
    { id: 'all', label: t.newsFilterAll },
    { id: 'sanitation', label: isHi ? 'स्वच्छता' : 'Sanitation' },
    { id: 'water', label: isHi ? 'जल प्रदाय' : 'Water Supply' },
    { id: 'temple', label: isHi ? 'मंदिर व दर्शन' : 'Temple & Darshan' },
    { id: 'announcement', label: isHi ? 'घोषणाएं' : 'Announcements' },
    { id: 'civic', label: isHi ? 'लोक निर्माण' : 'Civic Works' },
  ];

  const filteredNews = selectedCategory === 'all'
    ? SEED_NEWS
    : SEED_NEWS.filter((item) => item.category === selectedCategory);

  const breakingNews = SEED_NEWS.find((item) => item.isBreaking);

  const handleShare = async (item: NewsItem) => {
    const title = isHi ? item.titleHi : item.titleEn;
    const summary = isHi ? item.summaryHi : item.summaryEn;
    const dept = isHi ? item.sourceDeptHi : item.sourceDeptEn;
    const shareText = `🏛️ *मऊगंज नगर पालिका समाचार अपडेट*\n📰 *${title}*\n\n${summary}\n\n📍 स्रोत: ${dept}\n📲 मऊगंज नगर पालिका सेवा ऐप`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedId(item.id);
      showToast(
        isHi ? 'समाचार कॉपी किया गया' : 'News Copied',
        isHi ? 'व्हाट्सएप या संदेश पर साझा करें' : 'Ready to share via messaging',
        'Info'
      );
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      showToast('Share', title, 'Info');
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Live Bulletin Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          {/* Live indicator badge */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/90 text-white text-[11px] font-bold tracking-wide shadow-xs border border-red-400/40">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>{t.newsTodayLive}</span>
            </span>

            <span className="text-[11px] text-sky-100 flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-xs font-medium">
              <Calendar className="w-3 h-3 text-sky-300" />
              <span>{todayFormatted}</span>
            </span>
          </div>

          <h1 className="text-lg font-bold leading-tight">
            {t.newsTitle}
          </h1>
          <p className="text-xs text-sky-100 leading-relaxed">
            {t.newsSub}
          </p>
        </div>

        <Newspaper className="w-36 h-36 absolute -right-6 -bottom-8 text-white/10 pointer-events-none" />
      </div>

      {/* Breaking / Featured News Card */}
      {breakingNews && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setActiveModalItem(breakingNews)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setActiveModalItem(breakingNews);
            }
          }}
          className="bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-400 dark:border-amber-700 rounded-xl p-3.5 shadow-xs space-y-2 relative cursor-pointer hover:shadow-md transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[11px] tracking-wide shadow-xs">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{t.newsBreakingBadge}</span>
            </span>

            <span className="text-[11px] font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{isHi ? breakingNews.timeHi : breakingNews.timeEn}</span>
            </span>
          </div>

          <h2 className="text-sm font-bold text-amber-950 dark:text-amber-100 leading-snug">
            {isHi ? breakingNews.titleHi : breakingNews.titleEn}
          </h2>

          <p className="text-xs text-amber-900/80 dark:text-amber-200/90 leading-relaxed line-clamp-2">
            {isHi ? breakingNews.summaryHi : breakingNews.summaryEn}
          </p>

          <div className="flex items-center justify-between pt-1 border-t border-amber-200 dark:border-amber-800/60 text-[11px]">
            <span className="text-amber-800 dark:text-amber-400 font-medium">
              {isHi ? breakingNews.sourceDeptHi : breakingNews.sourceDeptEn}
            </span>
            <span className="text-amber-700 dark:text-amber-300 font-bold flex items-center gap-0.5">
              <span>{isHi ? 'विस्तार से पढ़ें' : 'Read details'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      )}

      {/* Category Filter Chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setSelectedCategory(opt.id)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all ${selectedCategory === opt.id
                ? 'bg-[var(--mnp-primary)] text-white shadow-xs font-semibold'
                : 'bg-[var(--mnp-card-bg)] text-[var(--mnp-text)] border border-[var(--mnp-border)] hover:bg-[var(--mnp-hover)]'
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="space-y-3">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            className="bg-[var(--mnp-card-bg)] rounded-xl border border-[var(--mnp-border)] shadow-xs overflow-hidden hover:border-[var(--mnp-primary)]/40 transition-all flex flex-col"
          >
            {/* Optional Banner Photo */}
            {item.photo && (
              <div
                className="h-36 w-full bg-zinc-900 overflow-hidden relative cursor-pointer"
                onClick={() => setActiveModalItem(item)}
              >
                <img
                  src={item.photo}
                  alt={isHi ? item.titleHi : item.titleEn}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 text-white text-[10px] font-semibold bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs">
                  {isHi ? item.categoryLabelHi : item.categoryLabelEn}
                </div>
              </div>
            )}

            <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                {/* Meta Row: Dept & Time */}
                <div className="flex items-center justify-between text-[11px] text-muted flex-wrap gap-1">
                  <span className="font-semibold text-[var(--mnp-primary)] px-2 py-0.5 rounded-md bg-[var(--mnp-primary)]/10">
                    {isHi ? item.categoryLabelHi : item.categoryLabelEn}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{isHi ? item.timeHi : item.timeEn}</span>
                  </span>
                </div>

                {/* Headline */}
                <h3
                  onClick={() => setActiveModalItem(item)}
                  className="text-sm font-bold text-[var(--mnp-text)] leading-snug cursor-pointer hover:text-[var(--mnp-primary)]"
                >
                  {isHi ? item.titleHi : item.titleEn}
                </h3>

                {/* Summary */}
                <p className="text-xs text-muted leading-relaxed line-clamp-2">
                  {isHi ? item.summaryHi : item.summaryEn}
                </p>
              </div>

              {/* Action Buttons: Read Full & Share */}
              <div className="flex items-center justify-between pt-2 border-t border-[var(--mnp-border)] text-xs">
                <span className="text-[11px] text-muted truncate max-w-[180px]">
                  {isHi ? item.sourceDeptHi : item.sourceDeptEn}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleShare(item)}
                    className="p-1.5 rounded-lg border border-[var(--mnp-border)] text-muted hover:text-[var(--mnp-text)] hover:bg-[var(--mnp-hover)] transition-colors"
                    title={isHi ? 'साझा करें' : 'Share'}
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModalItem(item)}
                    className="px-2.5 py-1 rounded-lg bg-[var(--mnp-primary)] text-white font-semibold text-[11px] hover:opacity-90 transition-opacity flex items-center gap-1 shadow-xs"
                  >
                    <span>{isHi ? 'पूरा पढ़ें' : 'Read'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Full News Article Modal */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="w-full sm:max-w-lg bg-[var(--mnp-card-bg)] rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl border border-[var(--mnp-border)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-3.5 border-b border-[var(--mnp-border)] flex items-center justify-between bg-[var(--mnp-bg)]">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[var(--mnp-primary)] text-white">
                  <Newspaper className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-[var(--mnp-text)]">
                  {isHi ? activeModalItem.categoryLabelHi : activeModalItem.categoryLabelEn}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="p-1 rounded-full text-muted hover:text-[var(--mnp-text)] hover:bg-[var(--mnp-hover)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scroll */}
            <div className="p-4 overflow-y-auto space-y-3.5">
              {activeModalItem.photo && (
                <div className="h-48 w-full rounded-xl overflow-hidden bg-zinc-900 shadow-xs">
                  <img
                    src={activeModalItem.photo}
                    alt={isHi ? activeModalItem.titleHi : activeModalItem.titleEn}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-muted">
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                    <span>{isHi ? activeModalItem.timeHi : activeModalItem.timeEn}</span>
                  </span>
                  <span>{todayFormatted}</span>
                </div>

                <h2 className="text-base font-bold text-[var(--mnp-text)] leading-snug">
                  {isHi ? activeModalItem.titleHi : activeModalItem.titleEn}
                </h2>
              </div>

              {/* Highlight summary box */}
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 leading-relaxed font-medium">
                {isHi ? activeModalItem.summaryHi : activeModalItem.summaryEn}
              </div>

              {/* Full body */}
              <div className="text-xs text-[var(--mnp-text)] leading-relaxed space-y-2 whitespace-pre-line">
                {isHi ? activeModalItem.contentHi : activeModalItem.contentEn}
              </div>

              {/* Official source department signoff */}
              <div className="pt-3 border-t border-[var(--mnp-border)] text-xs text-muted flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wide font-semibold">
                    {isHi ? 'जारीकर्ता विभाग' : 'Issuing Department'}
                  </div>
                  <div className="font-bold text-[var(--mnp-text)] text-[11px]">
                    {isHi ? activeModalItem.sourceDeptHi : activeModalItem.sourceDeptEn}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleShare(activeModalItem)}
                  className="px-3 py-1.5 rounded-lg bg-[var(--mnp-bg)] border border-[var(--mnp-border)] text-[var(--mnp-text)] font-semibold text-xs flex items-center gap-1.5 hover:bg-[var(--mnp-hover)]"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isHi ? 'शेयर करें' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
