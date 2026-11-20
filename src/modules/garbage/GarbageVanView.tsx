import React, { useEffect, useMemo, useState } from 'react';
import { Clock, Truck, User } from 'lucide-react';
import { WARDS } from '../../constants';
import { MaugangMap } from '../../components/MaugangMap';
import { UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';

// REAL INTEGRATION NOTE: Connect live vehicle telemetry to Swachh Bharat / AIS-140 GPS fleet API
// for real-time garbage collection van latitude/longitude and geofenced ETA alerts.

export const GarbageVanView: React.FC = () => {
  const { citizen, garbageRoutes, language, t } = useApp();
  const [selectedWard, setSelectedWard] = useState<number>(citizen.ward || 4);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setProgress((prev) => (prev + 0.04) % 1);
    }, 600);
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
    const vanLabel = language === 'hi' ? 'कचरा वाहन' : 'Garbage Van';
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
      lat: a.lat + (b.lat - a.lat) * frac,
      lng: a.lng + (b.lng - a.lng) * frac,
      label: vanLabel,
    };
  }, [activeRoute, progress, language]);

  const wardStop = activeRoute.stops.find((s) => s.ward === selectedWard) || activeRoute.stops[0];
  const dynamicEtaMin = Math.max(2, Math.round(wardStop.etaOffsetMin * (1 - progress * 0.65)));

  return (
    <div className="p-3.5 space-y-3.5">
      {/* Ward Selector Card */}
      <div className={`${UI.card} p-3.5 space-y-1.5`}>
        <label
          htmlFor="van-ward-select"
          className="block text-xs font-bold text-[var(--mnp-text-secondary)]"
        >
          {t.selectYourWard}
        </label>
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

      {/* Live ETA Banner */}
      <div className="rounded-[12px] border border-[#A7DFBA] dark:border-[#1E5C38] bg-[var(--mnp-success-bg)] p-3.5 shadow-[var(--mnp-shadow-card)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-full bg-[var(--mnp-success)] text-white flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-[var(--mnp-success)]">
              {t.estimatedArrival} ({t.wardLabel} {selectedWard})
            </p>
            <p className="text-xs text-[var(--mnp-text-secondary)] truncate">
              {activeRoute.vehicleNo} ·{' '}
              {activeRoute.status === 'delayed'
                ? language === 'hi'
                  ? 'विलंबित (Delayed)'
                  : 'Delayed'
                : activeRoute.status === 'completed'
                ? language === 'hi'
                  ? 'संग्रहण पूर्ण'
                  : 'Route completed'
                : t.vanMovingStatus}
            </p>
          </div>
        </div>
        <div className="text-right shrink-0 tabular-nums">
          <div className="text-xl font-bold text-[var(--mnp-success)]">
            {dynamicEtaMin} {t.minutesShort}
          </div>
        </div>
      </div>

      {/* Live Route Map */}
      <div className="space-y-1.5">
        <h2 className="text-xs font-bold text-[var(--mnp-text-secondary)]">{t.liveVanMapTitle}</h2>
        <MaugangMap
          lang={language}
          routePoints={activeRoute.stops.map((s) => ({
            lat: s.lat,
            lng: s.lng,
            label: `${t.wardLabel} ${s.ward}`,
          }))}
          movingMarker={movingPos}
          heightClass="h-56"
        />
      </div>

      {/* Route List */}
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
