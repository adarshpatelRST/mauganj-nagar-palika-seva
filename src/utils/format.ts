import { Language } from '../types';

export function formatDateTime(iso: string, lang: Language): string {
  try {
    return new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function formatDate(iso: string, lang: Language): string {
  try {
    return new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function formatDurationMs(ms: number, lang: Language): string {
  const absMs = Math.abs(ms);
  const totalMinutes = Math.max(1, Math.round(absMs / (60 * 1000)));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const mins = totalMinutes % 60;

  if (lang === 'hi') {
    if (days > 0) return `${days} दिन ${hours} घंटे`;
    if (hours > 0) return `${hours} घंटे ${mins} मिनट`;
    return `${mins} मिनट`;
  }
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// REAL INTEGRATION NOTE: External Google Maps / MapMyIndia deep link for turn-by-turn directions
export function getMapsDirectionsUrl(lat: number, lng: number, label?: string): string {
  const dest = `${lat.toFixed(5)},${lng.toFixed(5)}`;
  const query = label ? `&destination_place_id=${encodeURIComponent(label)}` : '';
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}${query ? '' : ''}`;
}

export function getMapsPinUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat.toFixed(5)},${lng.toFixed(5)}`;
}

// Resize uploaded image to max 800px wide JPEG data URL so it fits cleanly inside localStorage
export function resizeImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read_failed'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('decode_failed'));
      img.onload = () => {
        const maxDim = 760;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.72));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
