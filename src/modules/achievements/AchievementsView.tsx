import React, { useState } from 'react';
import {
  Award,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Droplets,
  Eye,
  IndianRupee,
  Landmark,
  Layers,
  MapPin,
  Sparkles,
  SunMedium,
  TrendingUp,
  Trophy,
  Truck,
  Wrench,
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { SEED_ACHIEVEMENTS } from '../../data/seedData';
import { AchievementItem } from '../../types';
import { UI } from '../../theme/tokens';

type CategoryFilter = 'all' | 'roads' | 'sanitation' | 'water' | 'pilgrim' | 'beautification' | 'energy';

export const AchievementsView: React.FC = () => {
  const { language, t } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activePhotoTab, setActivePhotoTab] = useState<Record<string, 'before' | 'after'>>({});
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);

  const isHi = language === 'hi';

  const filterOptions: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: isHi ? 'सभी कार्य' : 'All Works' },
    { id: 'roads', label: isHi ? 'सड़क विकास' : 'Roads' },
    { id: 'sanitation', label: isHi ? 'स्वच्छता' : 'Sanitation' },
    { id: 'water', label: isHi ? 'पेयजल' : 'Water Supply' },
    { id: 'pilgrim', label: isHi ? 'तीर्थ सेवा' : 'Pilgrim Amenities' },
    { id: 'beautification', label: isHi ? 'सौंदर्यीकरण' : 'Beautification' },
    { id: 'energy', label: isHi ? 'ऊर्जा व लाइट' : 'Smart Energy' },
  ];

  const filteredAchievements = selectedCategory === 'all'
    ? SEED_ACHIEVEMENTS
    : SEED_ACHIEVEMENTS.filter((item) => item.category === selectedCategory);

  const togglePhotoTab = (id: string, tab: 'before' | 'after') => {
    setActivePhotoTab((prev) => ({ ...prev, [id]: tab }));
  };

  return (
    <div className="p-4 space-y-4">
      {/* Hero Achievement Header Banner */}
      <div className="rounded-2xl p-4 bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
              <Trophy className="w-5 h-5 text-amber-200" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full border border-white/20">
              {isHi ? 'नगर पालिका परिषद मैहर' : 'Nagar Palika Parishad Maihar'}
            </span>
          </div>
          <h1 className="text-lg font-bold leading-tight">
            {t.achievementsTitle}
          </h1>
          <p className="text-xs text-amber-100 leading-relaxed">
            {t.achievementsSub}
          </p>
        </div>

        {/* Decorative background trophy pattern */}
        <Trophy className="w-36 h-36 absolute -right-6 -bottom-8 text-white/10 pointer-events-none" />
      </div>

      {/* Key Milestones & City Metrics */}
      <div className="bg-[var(--mnp-card-bg)] rounded-xl p-3 border border-[var(--mnp-border)] shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--mnp-text)]">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>{isHi ? 'प्रमुख विकास उपलब्धियां एक नज़र में' : 'Major Development Milestones'}</span>
          </div>
          <span className="text-[10px] text-muted font-medium">2025 – 2026</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50">
            <div className="text-base font-black text-emerald-700 dark:text-emerald-300">15 वार्ड ODF++</div>
            <div className="text-[10px] text-emerald-800 dark:text-emerald-400 font-medium">
              {isHi ? 'शत-प्रतिशत डोर-टू-डोर कचरा' : '100% Segregated Waste'}
            </div>
          </div>
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50">
            <div className="text-base font-black text-blue-700 dark:text-blue-300">14.8 किमी</div>
            <div className="text-[10px] text-blue-800 dark:text-blue-400 font-medium">
              {isHi ? 'पक्की सड़क व फुटपाथ' : 'Paved Roads & Walkways'}
            </div>
          </div>
          <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/50">
            <div className="text-base font-black text-cyan-700 dark:text-cyan-300">12,500+</div>
            <div className="text-[10px] text-cyan-800 dark:text-cyan-400 font-medium">
              {isHi ? 'नल जल कनेक्शन (अमृत 2.0)' : 'Piped Water Connections'}
            </div>
          </div>
          <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50">
            <div className="text-base font-black text-amber-700 dark:text-amber-300">3,800 LED</div>
            <div className="text-[10px] text-amber-800 dark:text-amber-400 font-medium">
              {isHi ? 'स्मार्ट ऊर्जा स्ट्रीट लाइट्स' : 'Automated Smart Lighting'}
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setSelectedCategory(opt.id)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all ${
              selectedCategory === opt.id
                ? 'bg-[var(--mnp-primary)] text-white shadow-xs font-semibold'
                : 'bg-[var(--mnp-card-bg)] text-[var(--mnp-text)] border border-[var(--mnp-border)] hover:bg-[var(--mnp-hover)]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Achievement Cards List */}
      <div className="space-y-3.5">
        {filteredAchievements.map((item) => {
          const isExpanded = expandedId === item.id;
          const currentTab = activePhotoTab[item.id] || 'after';
          const hasBeforeAfter = Boolean(item.photoBefore && item.photoAfter);

          return (
            <article
              key={item.id}
              className="bg-[var(--mnp-card-bg)] rounded-xl border border-[var(--mnp-border)] shadow-xs overflow-hidden transition-all"
            >
              {/* Media Section: Before / After or Single Photo */}
              {hasBeforeAfter ? (
                <div className="relative">
                  {/* Photo Tab Selector */}
                  <div className="absolute top-2 left-2 z-10 flex gap-1 bg-black/60 backdrop-blur-md p-0.5 rounded-lg border border-white/20">
                    <button
                      type="button"
                      onClick={() => togglePhotoTab(item.id, 'before')}
                      className={`px-2 py-0.5 text-[11px] font-semibold rounded ${
                        currentTab === 'before'
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'text-zinc-300 hover:text-white'
                      }`}
                    >
                      {t.beforePhotoLabel}
                    </button>
                    <button
                      type="button"
                      onClick={() => togglePhotoTab(item.id, 'after')}
                      className={`px-2 py-0.5 text-[11px] font-semibold rounded ${
                        currentTab === 'after'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-zinc-300 hover:text-white'
                      }`}
                    >
                      {t.afterPhotoLabel}
                    </button>
                  </div>

                  {/* Photo Display */}
                  <div
                    className="h-44 w-full bg-zinc-900 overflow-hidden relative cursor-pointer group"
                    onClick={() => {
                      const img = currentTab === 'before' ? item.photoBefore : item.photoAfter;
                      if (img) setPreviewImage({ url: img, title: isHi ? item.titleHi : item.titleEn });
                    }}
                  >
                    <img
                      src={currentTab === 'before' ? item.photoBefore : item.photoAfter}
                      alt={isHi ? item.titleHi : item.titleEn}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-xs">
                      <Eye className="w-3 h-3" />
                      <span>{isHi ? 'बड़ा देखें' : 'Zoom'}</span>
                    </div>

                    <div className="absolute bottom-2 left-2 text-white text-[11px] font-semibold flex items-center gap-1">
                      {currentTab === 'before' ? (
                        <span className="bg-rose-600/90 px-1.5 py-0.5 rounded text-[10px]">
                          {isHi ? 'समस्या ग्रस्त स्थिति' : 'Previous condition'}
                        </span>
                      ) : (
                        <span className="bg-emerald-600/90 px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {isHi ? 'नगर पालिका द्वारा समाधान' : 'Resolved by Nagar Palika'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ) : item.photo ? (
                <div
                  className="h-44 w-full bg-zinc-900 overflow-hidden relative cursor-pointer group"
                  onClick={() => {
                    if (item.photo) setPreviewImage({ url: item.photo, title: isHi ? item.titleHi : item.titleEn });
                  }}
                >
                  <img
                    src={item.photo}
                    alt={isHi ? item.titleHi : item.titleEn}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-xs">
                    <Eye className="w-3 h-3" />
                    <span>{isHi ? 'बड़ा देखें' : 'Zoom'}</span>
                  </div>
                </div>
              ) : null}

              {/* Card Body */}
              <div className="p-3.5 space-y-2.5">
                {/* Badges Row */}
                <div className="flex items-center justify-between flex-wrap gap-1.5 text-[11px]">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {isHi ? item.statusBadgeHi : item.statusBadgeEn}
                  </span>

                  <span className="px-2 py-0.5 rounded-md bg-[var(--mnp-bg)] text-muted border border-[var(--mnp-border)] font-medium">
                    {isHi ? item.categoryLabelHi : item.categoryLabelEn}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-sm font-bold text-[var(--mnp-text)] leading-snug">
                  {isHi ? item.titleHi : item.titleEn}
                </h2>

                {/* Key Metrics & Budget Bar */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  {item.keyMetric && (
                    <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40">
                      <div className="text-[10px] text-amber-800 dark:text-amber-400 font-medium">
                        {isHi ? item.keyMetric.labelHi : item.keyMetric.labelEn}
                      </div>
                      <div className="font-extrabold text-amber-900 dark:text-amber-200 text-sm">
                        {item.keyMetric.value}
                      </div>
                    </div>
                  )}

                  {item.budget && (
                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
                      <div className="text-[10px] text-emerald-800 dark:text-emerald-400 font-medium flex items-center gap-0.5">
                        <IndianRupee className="w-2.5 h-2.5" />
                        <span>{isHi ? 'परियोजना लागत' : 'Project Budget'}</span>
                      </div>
                      <div className="font-extrabold text-emerald-900 dark:text-emerald-200 text-sm">
                        {item.budget}
                      </div>
                    </div>
                  )}
                </div>

                {/* Metadata Row */}
                <div className="flex items-center justify-between text-[11px] text-muted pt-0.5">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[var(--mnp-primary)]" />
                    <span>{isHi ? item.wardNameHi : item.wardNameEn}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.completionDate}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-muted leading-relaxed pt-1 border-t border-[var(--mnp-border)]">
                  {isHi ? item.descriptionHi : item.descriptionEn}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 flex flex-col justify-center items-center p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="max-w-md w-full bg-[var(--mnp-card-bg)] rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 border-b border-[var(--mnp-border)] flex items-center justify-between">
              <h3 className="text-xs font-bold text-[var(--mnp-text)] line-clamp-1">
                {previewImage.title}
              </h3>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="text-xs px-2.5 py-1 rounded-md bg-[var(--mnp-bg)] text-muted hover:text-[var(--mnp-text)] font-semibold"
              >
                {t.close}
              </button>
            </div>
            <img
              src={previewImage.url}
              alt={previewImage.title}
              className="w-full max-h-[60vh] object-contain bg-black"
            />
          </div>
        </div>
      )}
    </div>
  );
};
