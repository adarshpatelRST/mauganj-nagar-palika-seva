import React, { useState } from 'react';
import {
  Calendar,
  Car,
  Clock,
  Droplets,
  Footprints,
  Megaphone,
  Search,
  Users,
} from 'lucide-react';
import { SEED_FESTIVAL_EVENTS } from '../../data/seedData';
import { ICON_CIRCLE_THEMES, UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';

export const TempleView: React.FC = () => {
  const { language, t, lostAndFound, addLostAndFound, notices, citizen, templeFeed } = useApp();
  const [lfType, setLfType] = useState<'lost' | 'found'>('lost');
  const [itemDesc, setItemDesc] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState(citizen.mobile);
  const [lfError, setLfError] = useState('');
  const [lfSuccess, setLfSuccess] = useState(false);

  const crowdSample = templeFeed.crowdLevel;

  const navratriNotices = notices.filter((n) => n.type === 'navratri');

  const handleSubmitLostFound = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = phone.replace(/\D/g, '');
    if (itemDesc.trim().length < 4 || location.trim().length < 3 || cleanedPhone.length !== 10) {
      setLfError(t.errLostFoundFields);
      setLfSuccess(false);
      return;
    }
    setLfError('');
    addLostAndFound({
      type: lfType,
      itemHi: itemDesc.trim(),
      location: location.trim(),
      contactName: citizen.name,
      contactPhone: cleanedPhone,
    });
    setItemDesc('');
    setLocation('');
    setLfSuccess(true);
  };

  const crowdStyles = {
    low: 'bg-[var(--mnp-success-bg)] text-[var(--mnp-success)] border-[#A7DFBA] dark:border-[#1E5C38]',
    medium:
      'bg-[var(--mnp-warning-bg)] text-[var(--mnp-warning)] border-[#FCD34D] dark:border-[#6B4A14]',
    high: 'bg-[var(--mnp-error-bg)] text-[var(--mnp-error)] border-[#F5B8B8] dark:border-[#7A272D]',
  };

  const crowdLabels = {
    low: t.crowdLow,
    medium: t.crowdMedium,
    high: t.crowdHigh,
  };

  return (
    <div className="p-3.5 space-y-4">
      {/* Pilgrim Banner Card */}
      <div className={`${UI.card} p-3.5 flex items-start gap-3`}>
        <span
          className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${ICON_CIRCLE_THEMES.saffron}`}
        >
          <Calendar className="w-5 h-5" />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-bold text-[var(--mnp-text)] leading-snug">
            {t.templeTitle}
          </h2>
          <p className={`${UI.mutedText} mt-0.5`}>{t.templeSubtitle}</p>
        </div>
      </div>

      {/* Crowd Level Indicator (Live from Admin Feed) */}
      <section className={`${UI.card} p-3.5 space-y-2.5`}>
        <div className="flex items-center justify-between gap-2">
          <h3 className={`${UI.sectionTitle} flex items-center gap-1.5`}>
            <Users className="w-4 h-4 text-[var(--mnp-primary)]" />
            <span>{t.crowdLevelTitle}</span>
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] text-[10px] font-bold">
            {language === 'hi' ? 'लाइव फ़ीड' : 'LIVE FEED'}
          </span>
        </div>
        <div className={`rounded-[10px] border p-3 text-xs font-bold ${crowdStyles[crowdSample]}`}>
          {crowdLabels[crowdSample]}
        </div>
      </section>

      {/* Darshan & Aarti Timings */}
      <section className={`${UI.card} p-3.5 space-y-2`}>
        <h3 className={`${UI.sectionTitle} flex items-center gap-1.5`}>
          <Clock className="w-4 h-4 text-[var(--mnp-primary)]" />
          <span>{t.darshanTimingsTitle}</span>
        </h3>
        <div className="divide-y divide-[var(--mnp-border)] text-xs tabular-nums">
          {templeFeed.darshanTimings.map((row) => (
            <div key={row.id} className="py-2 flex items-center justify-between gap-2">
              <span className="text-[var(--mnp-text-secondary)]">
                {language === 'hi' ? row.labelHi : row.labelEn}
              </span>
              <span className="font-bold text-[var(--mnp-text)] whitespace-nowrap">{row.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Ropeway & Stairs */}
      <section className={`${UI.card} p-3.5 space-y-2.5`}>
        <h3 className={`${UI.sectionTitle} flex items-center gap-1.5`}>
          <Footprints className="w-4 h-4 text-[var(--mnp-primary)]" />
          <span>{t.ropewayStairsTitle}</span>
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className={`${UI.surfaceMuted} p-2.5 space-y-1`}>
            <div className="font-bold text-[var(--mnp-text)]">
              {language === 'hi' ? 'प्रवेश व ई-रिक्शा सेवा' : 'Main Gate & Shuttle'}
            </div>
            <p className="text-[var(--mnp-text-secondary)]">
              {language === 'hi' ? templeFeed.ropewayStatusHi : templeFeed.ropewayStatusEn}
            </p>
          </div>
          <div className={`${UI.surfaceMuted} p-2.5 space-y-1`}>
            <div className="font-bold text-[var(--mnp-text)]">
              {language === 'hi' ? 'परिक्रमा व बहुती प्रपात' : 'Parikrama & Bahuti'}
            </div>
            <p className="text-[var(--mnp-text-secondary)]">
              {language === 'hi' ? templeFeed.stairsNoteHi : templeFeed.stairsNoteEn}
            </p>
          </div>
        </div>
      </section>

      {/* Parking & Toilets/Water */}
      <section className={`${UI.card} p-3.5 space-y-2`}>
        <h3 className={`${UI.sectionTitle} flex items-center gap-1.5`}>
          <Car className="w-4 h-4 text-[var(--mnp-primary)]" />
          <span>{t.parkingTitle}</span>
        </h3>
        <div className="divide-y divide-[var(--mnp-border)] text-xs tabular-nums">
          {templeFeed.parkingZones.map((pk) => (
            <div key={pk.id} className="flex items-center justify-between gap-2 py-2">
              <span className="text-[var(--mnp-text-secondary)]">
                {language === 'hi' ? pk.nameHi : pk.nameEn}
              </span>
              <span
                className={`font-bold whitespace-nowrap ${
                  pk.status === 'full'
                    ? 'text-[var(--mnp-error)]'
                    : pk.status === 'tight'
                    ? 'text-[var(--mnp-warning)]'
                    : 'text-[var(--mnp-success)]'
                }`}
              >
                {pk.available} / {pk.capacity}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className={`${UI.card} p-3.5 space-y-1.5 text-xs`}>
        <h3 className={`${UI.sectionTitle} flex items-center gap-1.5`}>
          <Droplets className="w-4 h-4 text-[var(--mnp-primary)]" />
          <span>{t.toiletsWaterTitle}</span>
        </h3>
        <p className="text-[var(--mnp-text-secondary)] leading-relaxed">
          {language === 'hi' ? templeFeed.toiletsWaterNoteHi : templeFeed.toiletsWaterNoteEn}
        </p>
      </section>

      {/* Festival Calendar & Navratri Notices */}
      <section className="space-y-2.5">
        <h3 className={`${UI.sectionTitle} flex items-center gap-1.5`}>
          <Calendar className="w-4 h-4 text-[var(--mnp-primary)]" />
          <span>{t.festivalCalendarTitle}</span>
        </h3>

        {navratriNotices.map((n) => (
          <div
            key={n.id}
            className="rounded-[12px] border border-[#FDBA74] dark:border-[#7C3A16] bg-[var(--mnp-accent-soft)] p-3.5 space-y-1 text-xs"
          >
            <div className="font-bold text-[var(--mnp-accent)] flex items-center gap-1.5">
              <Megaphone className="w-3.5 h-3.5 shrink-0" />
              <span>{language === 'hi' ? n.titleHi : n.titleEn}</span>
            </div>
            <p className="text-[var(--mnp-text-secondary)] leading-relaxed">
              {language === 'hi' ? n.bodyHi : n.bodyEn}
            </p>
          </div>
        ))}

        <div className="space-y-2">
          {SEED_FESTIVAL_EVENTS.map((ev) => (
            <div key={ev.id} className={`${UI.card} p-3.5 space-y-1 text-xs`}>
              <div className="text-[11px] font-bold text-[var(--mnp-primary)]">
                {language === 'hi' ? ev.dateHi : ev.dateEn}
              </div>
              <div className="text-sm font-bold text-[var(--mnp-text)]">
                {language === 'hi' ? ev.titleHi : ev.titleEn}
              </div>
              <p className="text-[var(--mnp-text-muted)] leading-snug">
                {language === 'hi' ? ev.detailsHi : ev.detailsEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Lost & Found Form */}
      <section className={`${UI.card} p-4 space-y-3`}>
        <h3 className={`${UI.sectionTitle} flex items-center gap-1.5`}>
          <Search className="w-4 h-4 text-[var(--mnp-primary)]" />
          <span>{t.lostFoundTitle}</span>
        </h3>

        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => setLfType('lost')}
            className={`min-h-[44px] rounded-[10px] border text-xs font-bold ${
              lfType === 'lost'
                ? 'bg-[var(--mnp-primary)] text-white border-[var(--mnp-primary)]'
                : 'bg-[var(--mnp-surface-muted)] text-[var(--mnp-text-secondary)] border-[var(--mnp-border)]'
            }`}
          >
            {t.lostItemTab}
          </button>
          <button
            type="button"
            onClick={() => setLfType('found')}
            className={`min-h-[44px] rounded-[10px] border text-xs font-bold ${
              lfType === 'found'
                ? 'bg-[var(--mnp-primary)] text-white border-[var(--mnp-primary)]'
                : 'bg-[var(--mnp-surface-muted)] text-[var(--mnp-text-secondary)] border-[var(--mnp-border)]'
            }`}
          >
            {t.foundItemTab}
          </button>
        </div>

        <form onSubmit={handleSubmitLostFound} className="space-y-2.5">
          <input
            type="text"
            value={itemDesc}
            onChange={(e) => {
              setItemDesc(e.target.value);
              setLfError('');
            }}
            placeholder={t.itemDescPlaceholder}
            className={UI.input}
          />
          <input
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setLfError('');
            }}
            placeholder={t.locationSeenPlaceholder}
            className={UI.input}
          />
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, ''));
              setLfError('');
            }}
            placeholder={t.contactPhonePlaceholder}
            className={`${UI.input} tabular-nums`}
          />
          {lfError && (
            <p className={UI.errorText} role="alert">
              {lfError}
            </p>
          )}
          {lfSuccess && (
            <p className="text-xs font-bold text-[var(--mnp-success)]">{t.lostFoundSubmitted}</p>
          )}
          <button type="submit" className={`${UI.btnAccent} w-full text-xs`}>
            {t.submitLostFoundBtn}
          </button>
        </form>

        <div className="pt-2 border-t border-[var(--mnp-border)] space-y-2">
          <p className="text-xs font-bold text-[var(--mnp-text-secondary)]">{t.recentLostFound}</p>
          {lostAndFound.slice(0, 4).map((lf) => (
            <div key={lf.id} className={`${UI.surfaceMuted} p-2.5 text-xs space-y-0.5`}>
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-[var(--mnp-primary)]">
                  {lf.type === 'lost' ? t.lostItemTab : t.foundItemTab}
                </span>
                <span className="text-[11px] text-[var(--mnp-text-muted)] tabular-nums">
                  {lf.contactPhone}
                </span>
              </div>
              <p className="text-[var(--mnp-text)] font-semibold">{lf.itemHi}</p>
              <p className="text-[var(--mnp-text-muted)]">{lf.location}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
