import React from 'react';
import { MAUGANG_CENTER } from '../constants';
import { Language } from '../types';

// REAL INTEGRATION NOTE: Replace this lightweight offline-ready schematic SVG map
// with Google Maps JavaScript SDK, MapMyIndia (Mappls), or Leaflet + OSM tiles
// and real-time WebSocket GPS coordinates from vehicle OBD/AIS-140 trackers.

export interface MapPin {
  id: string;
  label: string;
  lat: number;
  lng: number;
  selected?: boolean;
}

interface MaugangMapProps {
  lang: Language;
  pins?: MapPin[];
  onSelectPin?: (id: string) => void;
  routePoints?: { lat: number; lng: number; label: string }[];
  movingMarker?: { lat: number; lng: number; label: string };
  heightClass?: string;
}

const MIN_LAT = 24.660;
const MAX_LAT = 24.695;
const MIN_LNG = 81.862;
const MAX_LNG = 81.903;

function project(lat: number, lng: number) {
  const x = ((lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * 340 + 10;
  const y = ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * 220 + 10;
  return {
    x: Math.max(16, Math.min(344, x)),
    y: Math.max(16, Math.min(224, y)),
  };
}

export const MaugangMap: React.FC<MaugangMapProps> = ({
  lang,
  pins = [],
  onSelectPin,
  routePoints,
  movingMarker,
  heightClass = 'h-60',
}) => {
  const centerPt = project(MAUGANG_CENTER.lat, MAUGANG_CENTER.lng);
  const devtalabPt = project(24.6685, 81.8715);
  const collectoratePt = project(24.6835, 81.8775);
  const hanumanaRoadPt = project(24.6895, 81.8965);
  const rewaRoadPt = project(24.6645, 81.8665);
  const bahutiRoadPt = project(24.6725, 81.896);
  const naigarhiRoadPt = project(24.691, 81.8815);

  const routePath =
    routePoints && routePoints.length > 1
      ? routePoints
          .map((p, i) => {
            const pt = project(p.lat, p.lng);
            return `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
          })
          .join(' ')
      : '';

  const vanPt = movingMarker ? project(movingMarker.lat, movingMarker.lng) : null;

  return (
    <div
      className={`relative w-full ${heightClass} rounded-[12px] border border-[var(--mnp-border)] shadow-[var(--mnp-shadow-card)] overflow-hidden bg-[#EAF0F6] dark:bg-[#101A26] select-none`}
    >
      <svg viewBox="0 0 360 240" className="w-full h-full" role="img" aria-label="Maugang town map">
        <defs>
          <pattern id="maugangGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path
              d="M 30 0 L 0 0 0 30"
              fill="none"
              stroke="currentColor"
              className="text-slate-300/60 dark:text-slate-800"
              strokeWidth="0.7"
            />
          </pattern>
        </defs>
        <rect width="360" height="240" fill="url(#maugangGrid)" />

        {/* Devtalab Shiv Mandir approach highlight */}
        <ellipse
          cx={devtalabPt.x}
          cy={devtalabPt.y}
          rx="44"
          ry="24"
          className="fill-[#FFF1E6] dark:fill-[#351D0E] stroke-[#E86A17]/60"
          strokeWidth="1"
        />
        <text
          x={devtalabPt.x}
          y={devtalabPt.y + 3}
          textAnchor="middle"
          className="fill-[#9A3412] dark:fill-[#FDBA74] text-[7.5px] font-bold"
        >
          {lang === 'hi' ? 'देवतालाब मंदिर मार्ग' : 'Devtalab Mandir Rd'}
        </text>

        {/* NH-135 Highway (Rewa Road to Hanumana Road) */}
        <path
          d={`M ${rewaRoadPt.x} 234 L ${centerPt.x} ${centerPt.y} L ${hanumanaRoadPt.x} 16`}
          fill="none"
          className="stroke-white dark:stroke-slate-700"
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        {/* Nai Garhi Road & Bahuti Waterfall Road cross-corridor */}
        <path
          d={`M ${naigarhiRoadPt.x} 8 L ${centerPt.x} ${centerPt.y} L ${bahutiRoadPt.x} ${bahutiRoadPt.y}`}
          fill="none"
          className="stroke-white dark:stroke-slate-700"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* NH-135 Highway center dashes */}
        <path
          d={`M ${rewaRoadPt.x} 234 L ${centerPt.x} ${centerPt.y} L ${hanumanaRoadPt.x} 16`}
          fill="none"
          className="stroke-slate-400/70 dark:stroke-slate-500"
          strokeWidth="1.2"
          strokeDasharray="5 5"
        />

        <text
          x={collectoratePt.x}
          y={collectoratePt.y - 8}
          textAnchor="middle"
          className="fill-slate-600 dark:fill-slate-400 text-[7.5px] font-semibold"
        >
          {lang === 'hi' ? 'कलेक्ट्रेट / सिविल लाइन' : 'Collectorate'}
        </text>

        <text
          x={bahutiRoadPt.x - 10}
          y={bahutiRoadPt.y - 8}
          textAnchor="end"
          className="fill-slate-600 dark:fill-slate-400 text-[7px] font-semibold"
        >
          {lang === 'hi' ? 'बहुती प्रपात मार्ग' : 'Bahuti Rd'}
        </text>

        <text
          x={centerPt.x}
          y={centerPt.y - 10}
          textAnchor="middle"
          className="fill-slate-700 dark:fill-slate-300 text-[8px] font-bold"
        >
          {lang === 'hi' ? 'छोटी बाजार / बस स्टैंड' : 'Chhoti Bazar'}
        </text>

        {routePath && (
          <>
            <path
              d={routePath}
              fill="none"
              stroke="#2196F3"
              className="dark:stroke-[#42A5F5]"
              strokeWidth="3"
              strokeDasharray="6 3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {routePoints?.map((stop, idx) => {
              const pt = project(stop.lat, stop.lng);
              return (
                <g key={idx}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5"
                    className="fill-white dark:fill-[#16202C] stroke-[#2196F3] dark:stroke-[#42A5F5]"
                    strokeWidth="2"
                  />
                  <text
                    x={pt.x}
                    y={pt.y + 14}
                    textAnchor="middle"
                    className="fill-slate-800 dark:fill-slate-200 text-[7.5px] font-semibold"
                  >
                    {stop.label}
                  </text>
                </g>
              );
            })}
          </>
        )}

        {pins.map((pin) => {
          const pt = project(pin.lat, pin.lng);
          return (
            <g key={pin.id} onClick={() => onSelectPin?.(pin.id)} className="cursor-pointer">
              <circle
                cx={pt.x}
                cy={pt.y}
                r={pin.selected ? 8 : 6}
                className={
                  pin.selected
                    ? 'fill-[#D32F2F] stroke-white'
                    : 'fill-[#009688] dark:fill-[#26A69A] stroke-white dark:stroke-[#16202C]'
                }
                strokeWidth="2"
              />
              {pin.selected && (
                <text
                  x={pt.x}
                  y={pt.y - 12}
                  textAnchor="middle"
                  className="fill-[#1976D2] dark:fill-white text-[8.5px] font-bold"
                >
                  {pin.label.slice(0, 26)}
                </text>
              )}
            </g>
          );
        })}

        {vanPt && movingMarker && (
          <g transform={`translate(${vanPt.x}, ${vanPt.y})`}>
            <circle r="11" className="fill-[#1E7E34]/20" />
            <rect
              x="-9"
              y="-6"
              width="18"
              height="12"
              rx="2.5"
              fill="#1E7E34"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            <text
              y="-10"
              textAnchor="middle"
              className="fill-[#166534] dark:fill-[#6EE7B7] text-[8px] font-bold"
            >
              {movingMarker.label}
            </text>
          </g>
        )}
      </svg>

      <div className="absolute bottom-1.5 right-2 bg-[var(--mnp-surface)]/95 px-2 py-0.5 rounded-[6px] border border-[var(--mnp-border)] text-[10px] font-semibold text-[var(--mnp-text-secondary)]">
        {lang === 'hi' ? 'मऊगंज नगर मानचित्र (नमूना)' : 'Maugang Schematic Map (Sample)'}
      </div>
    </div>
  );
};
