import React, { useEffect, useMemo, useState } from 'react';
import {
  Building2,
  List,
  Map as MapIcon,
  MapPin,
  Navigation,
  Phone,
} from 'lucide-react';
import { MAUGANJ_CENTER, PLACE_TYPES, WARDS } from '../../constants';
import { MauganjMap } from '../../components/MauganjMap';
import { SEED_PLACES } from '../../data/seedData';
import { UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { PlaceTypeId } from '../../types';
import { getMapsDirectionsUrl, haversineKm } from '../../utils/format';

// REAL INTEGRATION NOTE: Connect Nearby places to Google Places API / MapMyIndia Nearby API
// and user's live navigator.geolocation coordinates for exact driving distances.

interface NearbyViewProps {
  initialCategory?: PlaceTypeId;
}

export const NearbyView: React.FC<NearbyViewProps> = ({ initialCategory = 'hospital' }) => {
  const { citizen, language, t, showToast } = useApp();
  const [selectedType, setSelectedType] = useState<PlaceTypeId>(initialCategory);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedType(initialCategory);
    setSelectedPlaceId(null);
  }, [initialCategory]);

  const userOrigin = useMemo(() => {
    const wardObj = WARDS.find((w) => w.id === citizen.ward);
    return wardObj ? { lat: wardObj.lat, lng: wardObj.lng } : MAUGANJ_CENTER;
  }, [citizen.ward]);

  const placesWithDistance = useMemo(() => {
    return SEED_PLACES.filter((p) => p.type === selectedType)
      .map((p) => ({
        ...p,
        distanceKm: haversineKm(userOrigin.lat, userOrigin.lng, p.lat, p.lng),
      }))
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [selectedType, userOrigin]);

  const activePlace = useMemo(() => {
    if (selectedPlaceId) {
      const found = placesWithDistance.find((p) => p.id === selectedPlaceId);
      if (found) return found;
    }
    return placesWithDistance[0] || null;
  }, [placesWithDistance, selectedPlaceId]);

  const activeTypeObj = PLACE_TYPES.find((pt) => pt.id === selectedType);

  return (
    <div className="p-4 space-y-3.5">
      {/* Header + List/Map Toggle */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-[15px] font-bold text-[var(--mnp-text)]">
            {activeTypeObj
              ? language === 'hi'
                ? activeTypeObj.labelHi
                : activeTypeObj.labelEn
              : t.nearbyTitle}
          </h2>
          <p className="text-xs text-[var(--mnp-text-muted)] tabular-nums">
            {placesWithDistance.length} {t.placesFound}
          </p>
        </div>

        <div className="inline-flex rounded-full bg-[var(--mnp-surface)] border border-[var(--mnp-border)] p-0.5 shadow-xs">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`min-h-[36px] px-3 rounded-full text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-colors ${viewMode === 'list'
                ? 'bg-[var(--mnp-teal)] text-white'
                : 'text-[var(--mnp-text-secondary)]'
              }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>{t.listView}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('map')}
            className={`min-h-[36px] px-3 rounded-full text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-colors ${viewMode === 'map'
                ? 'bg-[var(--mnp-teal)] text-white'
                : 'text-[var(--mnp-text-secondary)]'
              }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>{t.mapView}</span>
          </button>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {PLACE_TYPES.map((pt) => {
          const active = pt.id === selectedType;
          return (
            <button
              key={pt.id}
              type="button"
              onClick={() => {
                setSelectedType(pt.id);
                setSelectedPlaceId(null);
              }}
              className={
                active
                  ? 'min-h-[36px] px-3.5 rounded-full bg-[var(--mnp-teal)] text-white border border-[var(--mnp-teal)] text-xs font-bold whitespace-nowrap shrink-0 transition-colors'
                  : UI.chipInactive
              }
            >
              {language === 'hi' ? pt.labelHi : pt.labelEn}
            </button>
          );
        })}
      </div>

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="space-y-3">
          <MauganjMap
            lang={language}
            pins={placesWithDistance.map((p) => ({
              id: p.id,
              label: language === 'hi' ? p.nameHi : p.name,
              lat: p.lat,
              lng: p.lng,
              selected: activePlace?.id === p.id,
            }))}
            onSelectPin={(id) => setSelectedPlaceId(id)}
            heightClass="h-64"
          />

          {activePlace && (
            <div className={`${UI.card} p-4 space-y-3`}>
              <div className="flex items-start gap-3">
                <span className="w-11 h-11 rounded-full bg-[var(--mnp-teal)] text-white flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-[var(--mnp-text)]">
                    {language === 'hi' ? activePlace.nameHi : activePlace.name}
                  </h3>
                  <p className="text-xs text-[var(--mnp-text-muted)] mt-0.5 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#D32F2F]" />
                    <span>{language === 'hi' ? activePlace.addressHi : activePlace.address}</span>
                  </p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[var(--mnp-border)] flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[var(--mnp-text-secondary)] tabular-nums">
                  {activePlace.distanceKm.toFixed(1)} {t.kmAway}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${activePlace.phone}`}
                    onClick={() =>
                      showToast(
                        language === 'hi' ? activePlace.nameHi : activePlace.name,
                        `${t.simulatedCallNotice} ${activePlace.phone}`,
                        'Info'
                      )
                    }
                    className="min-h-[40px] px-3.5 rounded-full border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] text-xs font-bold text-[var(--mnp-text)] flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>{t.callPlace}</span>
                  </a>
                  <a
                    href={getMapsDirectionsUrl(activePlace.lat, activePlace.lng)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${UI.btnTeal} flex items-center gap-1.5`}
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{t.getDirections}</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* List View — Clean Teal Floating Cards */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {placesWithDistance.length === 0 ? (
            <div className={UI.emptyState}>
              <p className="text-sm font-bold text-[var(--mnp-text)]">{t.noPlacesInCategory}</p>
              <button
                type="button"
                onClick={() => setSelectedType('hospital')}
                className={UI.btnTeal}
              >
                {t.clearFilter}
              </button>
            </div>
          ) : (
            placesWithDistance.map((p) => (
              <div key={p.id} className={`${UI.card} p-4 space-y-3`}>
                <div className="flex items-start gap-3">
                  <span className="w-11 h-11 rounded-full bg-[var(--mnp-teal)] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Building2 className="w-5 h-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-bold text-[var(--mnp-text)] leading-snug">
                      {language === 'hi' ? p.nameHi : p.name}
                    </h3>
                    <p className="text-xs text-[var(--mnp-text-muted)] mt-1 flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#D32F2F]" />
                      <span>{language === 'hi' ? p.addressHi : p.address}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-[var(--mnp-border)] flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[var(--mnp-text-secondary)] tabular-nums">
                    {p.distanceKm.toFixed(1)} {t.kmAway}
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${p.phone}`}
                      onClick={() =>
                        showToast(
                          language === 'hi' ? p.nameHi : p.name,
                          `${t.simulatedCallNotice} ${p.phone}`,
                          'Info'
                        )
                      }
                      aria-label={t.callPlace}
                      className="min-h-[40px] min-w-[40px] px-3 rounded-full border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] hover:bg-[var(--mnp-surface-muted)] text-xs font-bold text-[var(--mnp-text)] flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#2E7D32]" />
                      <span>{t.callPlace}</span>
                    </a>
                    <a
                      href={getMapsDirectionsUrl(p.lat, p.lng)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${UI.btnTeal} flex items-center justify-center gap-1.5`}
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{t.getDirections}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
