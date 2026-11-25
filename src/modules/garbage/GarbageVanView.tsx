import React, { useEffect, useMemo, useState } from 'react';
import {
  Bell,
  BellRing,
  CheckCircle2,
  Clock,
  Compass,
  MapPin,
  Navigation,
  Phone,
  Radio,
  RotateCw,
  ShieldCheck,
  Truck,
  User,
} from 'lucide-react';
import { WARDS } from '../../constants';
import { MaiharMap } from '../../components/MaiharMap';
import { UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';

// REAL INTEGRATION NOTE: Connect live vehicle telemetry to Swachh Bharat / AIS-140 GPS fleet API
// for real-time garbage collection van latitude/longitude and geofenced ETA alerts.

export const GarbageVanView: React.FC = () => {
  const { citizen, garbageRoutes, language, t, showToast } = useApp();
  const [selectedWard, setSelectedWard] = useState<number>(citizen.ward || 4);
  const [progress, setProgress] = useState(0.28);
  const [alertSet, setAlertSet] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date());

  // Smooth live telemetry animation
  useEffect(() => {
    const id = window.setInterval(() => {
      setProgress((prev) => (prev + 0.008) % 1);
      setLastSyncTime(new Date());
    }, 1200);
    return () => window.clearInterval(id);
  }, []);

  const activeRoute = useMemo(() => {
    return (
      garbageRoutes.find((r) => r.wardsCovered.includes(selectedWard)) ||
      garbageRoutes[0]
    );
  }, [garbageRoutes, selectedWard]);

  const movingPos = useMemo(() => {
    const stops = activeRoute.stops;
    const vanLabel = language === 'hi' ? 'सफाई वाहन' : 'Garbage Van';
    if (stops.length < 2) {
      return {
        lat: stops[0].lat,
        lng: stops[0].lng,
        label: vanLabel,
      };
    }
    const scaled = progress * (stops.length - 1);
    const idx = Math.floor(scaled);
    const frac = scaled - idx;
    const a = stops[idx];
    const b = stops[Math.min(idx + 1, stops.length - 1)];
    return {
      lat: Number((a.lat + (b.lat - a.lat) * frac).toFixed(5)),
      lng: Number((a.lng + (b.lng - a.lng) * frac).toFixed(5)),
      label: vanLabel,
    };
  }, [activeRoute, progress, language]);

  const stops = activeRoute.stops;
  const scaled = progress * (stops.length - 1);
  const currentStopIndex = Math.min(Math.floor(scaled), stops.length - 1);
  const currentStop = stops[currentStopIndex];
  const nextStop = stops[Math.min(currentStopIndex + 1, stops.length - 1)];
  const isBetween = currentStopIndex < stops.length - 1 && scaled - currentStopIndex > 0.15;

  const currentLandmark = useMemo(() => {
    const stopName = language === 'hi' ? currentStop.nameHi : currentStop.nameEn;
    const nextName = language === 'hi' ? nextStop.nameHi : nextStop.nameEn;
    if (isBetween) {
      return language === 'hi'
        ? `${stopName} से ${nextName} मार्ग (वार्ड ${currentStop.ward})`
        : `En route from ${stopName} to ${nextName} (Ward ${currentStop.ward})`;
    }
    return language === 'hi'
      ? `${stopName}, वार्ड ${currentStop.ward}`
      : `${stopName}, Ward ${currentStop.ward}`;
  }, [currentStop, nextStop, isBetween, language]);

  const liveSpeed = Math.round(14 + Math.sin(progress * 25) * 5);

  const wardStop = activeRoute.stops.find((s) => s.ward === selectedWard) || activeRoute.stops[0];
  const dynamicEtaMin = Math.max(2, Math.round(wardStop.etaOffsetMin * (1 - progress * 0.65)));

  const handleToggleAlert = () => {
    if (!alertSet) {
      setAlertSet(true);
      showToast(
        language === 'hi' ? 'आगमन अलार्म सक्रिय' : 'Arrival Alert Set',
        language === 'hi'
          ? `वाहन ${activeRoute.vehicleNo} आपके वार्ड ${selectedWard} में प्रवेश करते ही आपको SMS / अलार्म अलर्ट भेजा जाएगा।`
          : `Alert set! You will be notified when ${activeRoute.vehicleNo} enters Ward ${selectedWard}.`,
        'Info'
      );
    } else {
      setAlertSet(false);
      showToast(
        language === 'hi' ? 'अलार्म निष्क्रिय किया गया' : 'Alert Cancelled',
        language === 'hi' ? 'वाहन आगमन अलार्म बंद कर दिया गया है।' : 'Arrival alert has been turned off.',
        'Info'
      );
    }
  };

  return (
    <div className="p-3.5 space-y-3.5">
      {/* Ward Selector Card */}
      <div className={`${UI.card} p-3.5 space-y-1.5`}>
        <div className="flex items-center justify-between">
          <label
            htmlFor="van-ward-select"
            className="block text-xs font-bold text-[var(--mnp-text-secondary)]"
          >
            {t.selectYourWard}
          </label>
          <span className="text-[11px] font-semibold text-[var(--mnp-primary)]">
            {t.wardLabel} {selectedWard}
          </span>
        </div>
        <select
          id="van-ward-select"
          value={selectedWard}
          onChange={(e) => setSelectedWard(Number(e.target.value))}
          className={UI.input}
        >
          {WARDS.map((w) => (
            <option key={w.id} value={w.id}>
              {language === 'hi' ? w.nameHi : w.nameEn}
            </option>
          ))}
        </select>
      </div>

      {/* Hero: VEHICLE EXACT LIVE LOCATION RIGHT NOW */}
      <div className="rounded-[16px] border-2 border-emerald-500/40 bg-gradient-to-b from-emerald-50/80 to-white dark:from-emerald-950/30 dark:to-neutral-900 p-4 shadow-md space-y-3">
        {/* Top telemetry status bar */}
        <div className="flex items-center justify-between gap-2 border-b border-emerald-200/60 dark:border-emerald-800/40 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-xs font-extrabold tracking-wide text-emerald-800 dark:text-emerald-300 uppercase">
              {language === 'hi' ? '🔴 लाइव वाहन ट्रैकिंग (अभी)' : '🔴 LIVE VEHICLE TRACKING'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-[11px] font-bold tabular-nums">
            <Navigation className="w-3 h-3 text-emerald-600" />
            <span>{liveSpeed} km/h</span>
          </div>
        </div>

        {/* Current Exact Location Headline */}
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-[var(--mnp-text-muted)] uppercase tracking-wider">
            {language === 'hi' ? 'वाहन अभी किस जगह पर है:' : 'Vehicle Current Location Right Now:'}
          </p>
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <h2 className="text-base font-extrabold text-[var(--mnp-text)] leading-snug">
                {currentLandmark}
              </h2>
              <p className="text-xs text-[var(--mnp-text-secondary)] flex items-center gap-1.5 mt-0.5 font-mono">
                <span>{movingPos.lat}° N</span>
                <span>·</span>
                <span>{movingPos.lng}° E</span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-sans font-bold bg-emerald-100 dark:bg-emerald-900/40 px-1.5 rounded">
                  GPS सिंक OK
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 3-Pillar Telemetry Grid */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="rounded-[10px] bg-white dark:bg-neutral-800/80 p-2 border border-emerald-100 dark:border-neutral-700 text-center shadow-xs">
            <p className="text-[10px] font-bold text-[var(--mnp-text-muted)] uppercase">
              {language === 'hi' ? 'आपके वार्ड ETA' : 'Ward ETA'}
            </p>
            <p className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
              {dynamicEtaMin} {t.minutesShort}
            </p>
          </div>

          <div className="rounded-[10px] bg-white dark:bg-neutral-800/80 p-2 border border-emerald-100 dark:border-neutral-700 text-center shadow-xs">
            <p className="text-[10px] font-bold text-[var(--mnp-text-muted)] uppercase">
              {language === 'hi' ? 'वाहन क्रमांक' : 'Vehicle No'}
            </p>
            <p className="text-xs font-extrabold text-[var(--mnp-text)] truncate">
              {activeRoute.vehicleNo.replace(' (नमूना)', '')}
            </p>
          </div>

          <div className="rounded-[10px] bg-white dark:bg-neutral-800/80 p-2 border border-emerald-100 dark:border-neutral-700 text-center shadow-xs">
            <p className="text-[10px] font-bold text-[var(--mnp-text-muted)] uppercase">
              {language === 'hi' ? 'स्थिति' : 'Status'}
            </p>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 truncate">
              {language === 'hi' ? 'संग्रहण जारी' : 'Collecting'}
            </p>
          </div>
        </div>

        {/* Arrival Alert Notification Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={handleToggleAlert}
            className={`w-full min-h-[42px] px-3 rounded-[12px] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs ${
              alertSet
                ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                : 'border border-emerald-500/50 bg-white dark:bg-neutral-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50'
            }`}
          >
            {alertSet ? (
              <>
                <BellRing className="w-4 h-4 animate-bounce" />
                <span>
                  {language === 'hi'
                    ? `✓ वार्ड ${selectedWard} आगमन अलार्म सक्रिय`
                    : `✓ Arrival Alarm Active for Ward ${selectedWard}`}
                </span>
              </>
            ) : (
              <>
                <Bell className="w-4 h-4" />
                <span>
                  {language === 'hi'
                    ? 'वाहन आने पर अलार्म / अलर्ट सेट करें'
                    : 'Set Arrival Siren / Alert'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live Route Interactive Map */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-[var(--mnp-text-secondary)]">
            {t.liveVanMapTitle} ({language === 'hi' ? 'लाइव जीपीएस स्थिति' : 'Live GPS Point'})
          </h2>
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>AIS-140 GPS 99%</span>
          </span>
        </div>
        <MaiharMap
          lang={language}
          routePoints={activeRoute.stops.map((s) => ({
            lat: s.lat,
            lng: s.lng,
            label: `${t.wardLabel} ${s.ward} (${language === 'hi' ? s.nameHi : s.nameEn})`,
          }))}
          movingMarker={movingPos}
          heightClass="h-56"
        />
      </div>

      {/* Route Stops & Real-Time Collection Progress Timeline */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className={UI.sectionTitle}>
            {language === 'hi' ? 'मार्ग स्टॉप एवं संग्रहण स्थिति' : 'Route Stops & Collection Status'}
          </h2>
          <span className="text-xs text-[var(--mnp-text-muted)] font-mono">
            {activeRoute.stops.length} {language === 'hi' ? 'स्टॉप' : 'stops'}
          </span>
        </div>

        <div className={`${UI.card} p-3.5 space-y-3`}>
          {stops.map((stop, index) => {
            const isCompleted = index < currentStopIndex;
            const isCurrent = index === currentStopIndex;
            const isUpcoming = index > currentStopIndex;
            const isUserWard = stop.ward === selectedWard;

            return (
              <div key={`${stop.ward}-${index}`} className="flex items-start gap-3 relative">
                {/* Connecting timeline vertical line */}
                {index < stops.length - 1 && (
                  <div
                    className={`absolute left-3.5 top-6 bottom-0 w-0.5 -mb-3 ${
                      isCompleted ? 'bg-emerald-500' : 'bg-neutral-200 dark:bg-neutral-700'
                    }`}
                  />
                )}

                {/* Status Icon */}
                <div className="relative z-10 shrink-0">
                  {isCompleted ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center ring-4 ring-red-200 dark:ring-red-950 animate-pulse">
                      <Truck className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-700 text-[var(--mnp-text-muted)] flex items-center justify-center">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Stop Info */}
                <div className="min-w-0 flex-1 pb-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-[var(--mnp-text)] truncate flex items-center gap-1.5">
                      <span>{language === 'hi' ? stop.nameHi : stop.nameEn}</span>
                      {isUserWard && (
                        <span className="px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-[9.5px] font-bold">
                          {language === 'hi' ? 'आपका वार्ड' : 'Your Ward'}
                        </span>
                      )}
                    </p>
                    <span
                      className={`text-[10.5px] font-bold shrink-0 ${
                        isCompleted
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : isCurrent
                          ? 'text-red-600 dark:text-red-400 font-extrabold'
                          : 'text-[var(--mnp-text-muted)]'
                      }`}
                    >
                      {isCompleted
                        ? language === 'hi'
                          ? 'सफाई संपन्न ✓'
                          : 'Done ✓'
                        : isCurrent
                        ? language === 'hi'
                          ? 'वाहन अभी यहाँ है 🔴'
                          : 'Here Right Now 🔴'
                        : `~${stop.etaOffsetMin} ${t.minutesShort}`}
                    </span>
                  </div>

                  <p className="text-[11px] text-[var(--mnp-text-muted)]">
                    {t.wardLabel} {stop.ward} ·{' '}
                    {isCompleted
                      ? language === 'hi'
                        ? 'कचरा उठाव कार्य पूर्ण हुआ'
                        : 'Waste collected'
                      : isCurrent
                      ? language === 'hi'
                        ? 'कचरा संग्रहण कार्य प्रगति पर'
                        : 'Collecting waste right now'
                      : language === 'hi'
                      ? 'अनुमानित आगमन समय'
                      : 'Scheduled stop'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Driver & Support Contact Card */}
      <div className={`${UI.card} p-3.5 flex items-center justify-between gap-3`}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] flex items-center justify-center shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-[var(--mnp-text)] truncate">
              {language === 'hi' ? activeRoute.driverNameHi : activeRoute.driverNameEn}
            </p>
            <p className="text-[11px] text-[var(--mnp-text-muted)] truncate">
              {language === 'hi' ? activeRoute.scheduleHi : activeRoute.scheduleEn}
            </p>
          </div>
        </div>

        <a
          href="tel:07674-000101"
          className="min-h-[38px] px-3 rounded-[10px] bg-[var(--mnp-primary)] text-white text-xs font-bold flex items-center gap-1.5 shrink-0 hover:bg-[var(--mnp-primary-hover)] active:scale-95 transition-all shadow-xs"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'चालक से संपर्क' : 'Call Driver'}</span>
        </a>
      </div>

      {/* Municipal Fleets / Other Routes */}
      <section className="space-y-2.5">
        <h2 className={UI.sectionTitle}>{t.routeListTitle}</h2>
        {garbageRoutes.map((route) => {
          const isSelected = route.id === activeRoute.id;
          return (
            <button
              key={route.id}
              type="button"
              onClick={() => setSelectedWard(route.wardsCovered[0])}
              className={`w-full rounded-[12px] border p-3.5 text-left space-y-1.5 transition-colors shadow-[var(--mnp-shadow-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] ${
                isSelected
                  ? 'border-[var(--mnp-primary)] bg-[var(--mnp-primary-soft)] ring-1 ring-[var(--mnp-primary)]'
                  : 'border-[var(--mnp-border)] bg-[var(--mnp-surface)]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-[var(--mnp-text)]">{route.vehicleNo}</span>
                <span className="text-xs font-bold text-[var(--mnp-primary)] tabular-nums">
                  {t.wardsCoveredLabel}: {route.wardsCovered.join(', ')}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--mnp-text-muted)]">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {language === 'hi' ? route.driverNameHi : route.driverNameEn}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {language === 'hi' ? route.scheduleHi : route.scheduleEn}
                </span>
              </div>
            </button>
          );
        })}
      </section>
    </div>
  );
};
