import { MAIHAR_CENTER, WARDS } from '../constants';
import { Language } from '../types';
import { haversineKm } from './format';

export interface GeocodeResult {
  fullAddress: string;
  streetOrArea: string;
  cityOrTown: string;
  state: string;
  postcode?: string;
  isMaiharRegion: boolean;
  distanceFromMaiharKm: number;
  nearestWardId: number;
  nearestWardNameHi: string;
  nearestWardNameEn: string;
}

/**
 * Reverse-geocodes GPS coordinates into human-readable physical address
 * with multi-tier API fallbacks (Photon -> BigDataCloud -> Nominatim -> Coordinates fallback).
 */
export async function reverseGeocode(
  lat: number,
  lng: number,
  lang: Language = 'hi'
): Promise<GeocodeResult> {
  // 1. Calculate distance from Maihar center and find closest Maihar municipal ward
  const distanceFromMaiharKm = haversineKm(lat, lng, MAIHAR_CENTER.lat, MAIHAR_CENTER.lng);
  let closestWard = WARDS[0];
  let minWardDistance = Infinity;

  for (const w of WARDS) {
    const d = haversineKm(lat, lng, w.lat, w.lng);
    if (d < minWardDistance) {
      minWardDistance = d;
      closestWard = w;
    }
  }

  const isMaiharRegion = distanceFromMaiharKm <= 25;

  let resolvedStreet = '';
  let resolvedCity = '';
  let resolvedState = '';
  let resolvedPostcode = '';
  let resolvedFullAddress = '';

  // Tier 1: Try Photon API (Free OpenStreetMap-based reverse geocoder with CORS and no auth key)
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 3500);
    const res = await fetch(
      `https://photon.komoot.io/reverse?lat=${lat}&lon=${lng}`,
      { signal: ctrl.signal }
    );
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      const p = data.features?.[0]?.properties;
      if (p) {
        const parts: string[] = [];
        const streetPart = [p.name, p.housenumber, p.street].filter(Boolean).join(' ');
        if (streetPart) parts.push(streetPart);
        if (p.district && !parts.includes(p.district)) parts.push(p.district);
        const cityPart = p.city || p.town || p.village || p.county;
        if (cityPart && !parts.includes(cityPart)) parts.push(cityPart);
        if (p.state && !parts.includes(p.state)) parts.push(p.state);
        if (p.postcode) parts.push(p.postcode);

        if (parts.length > 0) {
          resolvedStreet = streetPart || p.district || cityPart || '';
          resolvedCity = cityPart || '';
          resolvedState = p.state || '';
          resolvedPostcode = p.postcode || '';
          resolvedFullAddress = parts.join(', ');
        }
      }
    }
  } catch {
    // Continue to next fallback
  }

  // Tier 2: Try BigDataCloud Client Reverse Geocode API (Free, high-availability, CORS enabled)
  if (!resolvedFullAddress) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 3500);
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
        { signal: ctrl.signal }
      );
      clearTimeout(timer);

      if (res.ok) {
        const b = await res.json();
        const rawParts = [b.locality, b.city, b.principalSubdivision, b.countryName].filter(Boolean);
        // Deduplicate
        const unique = rawParts.filter((v, i, a) => a.indexOf(v) === i);
        if (unique.length > 0) {
          resolvedStreet = b.locality || b.city || '';
          resolvedCity = b.city || b.locality || '';
          resolvedState = b.principalSubdivision || '';
          resolvedPostcode = b.postcode || '';
          resolvedFullAddress = unique.join(', ');
        }
      }
    } catch {
      // Continue to next fallback
    }
  }

  // Tier 3: Try OpenStreetMap Nominatim reverse geocode
  if (!resolvedFullAddress) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 3500);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        {
          headers: { Accept: 'application/json' },
          signal: ctrl.signal,
        }
      );
      clearTimeout(timer);

      if (res.ok) {
        const n = await res.json();
        if (n.display_name) {
          resolvedFullAddress = n.display_name;
          resolvedStreet = n.address?.road || n.address?.suburb || n.address?.neighbourhood || '';
          resolvedCity = n.address?.city || n.address?.town || n.address?.village || '';
          resolvedState = n.address?.state || '';
          resolvedPostcode = n.address?.postcode || '';
        }
      }
    } catch {
      // Offline or network error
    }
  }

  // Tier 4: Fallback if completely offline or geocoding failed
  if (!resolvedFullAddress) {
    resolvedFullAddress =
      lang === 'hi'
        ? `GPS निर्देशांक: ${lat.toFixed(5)}° N, ${lng.toFixed(5)}° E`
        : `GPS Coordinates: ${lat.toFixed(5)}° N, ${lng.toFixed(5)}° E`;
    resolvedStreet = `GPS: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`;
    resolvedCity = isMaiharRegion ? 'Maihar' : '';
    resolvedState = isMaiharRegion ? 'Madhya Pradesh' : '';
  }

  return {
    fullAddress: resolvedFullAddress,
    streetOrArea: resolvedStreet,
    cityOrTown: resolvedCity,
    state: resolvedState,
    postcode: resolvedPostcode,
    isMaiharRegion,
    distanceFromMaiharKm,
    nearestWardId: closestWard.id,
    nearestWardNameHi: closestWard.nameHi,
    nearestWardNameEn: closestWard.nameEn,
  };
}
