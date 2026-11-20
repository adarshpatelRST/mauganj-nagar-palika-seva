import React, { useRef, useState } from 'react';
import { Camera, Image as ImageIcon, Trash2 } from 'lucide-react';
import { SAMPLE_PHOTOS } from '../constants';
import { ICON_CIRCLE_THEMES, UI } from '../theme/tokens';
import { useApp } from '../store/AppContext';
import { resizeImageFile } from '../utils/format';

interface PhotoPickerProps {
  value?: string;
  onChange: (photoUrl?: string) => void;
  mode: 'before' | 'after';
  error?: string;
}

export const PhotoPicker: React.FC<PhotoPickerProps> = ({ value, onChange, mode, error }) => {
  const { t, language } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const dataUrl = await resizeImageFile(file);
      onChange(dataUrl);
    } catch {
      // Fallback gracefully if image decode fails
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const sampleOptions =
    mode === 'before'
      ? [
          { src: SAMPLE_PHOTOS.pothole, label: t.samplePotholeLabel },
          { src: SAMPLE_PHOTOS.garbage, label: t.sampleGarbageLabel },
        ]
      : [
          {
            src: SAMPLE_PHOTOS.repairedRoad,
            label: language === 'hi' ? 'मरम्मत की गई सड़क (नमूना)' : 'Repaired road (Sample)',
          },
          {
            src: SAMPLE_PHOTOS.cleanStreet,
            label: language === 'hi' ? 'साफ़ की गई सड़क (नमूना)' : 'Cleaned street (Sample)',
          },
        ];

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFile}
        className="hidden"
      />

      {value ? (
        <div className={`${UI.card} overflow-hidden`}>
          <img
            src={value}
            alt={mode === 'before' ? t.beforePhotoLabel : t.afterPhotoLabel}
            referrerPolicy="no-referrer"
            className="w-full h-44 object-cover"
          />
          <div className="p-2 flex items-center justify-between gap-2 bg-[var(--mnp-surface)] border-t border-[var(--mnp-border)]">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="min-h-[44px] px-3 rounded-[8px] text-xs font-bold text-[var(--mnp-primary)] hover:bg-[var(--mnp-primary-soft)] flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)]"
            >
              <Camera className="w-4 h-4" />
              <span>{t.uploadPhotoBtn}</span>
            </button>
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="min-h-[44px] px-3 rounded-[8px] text-xs font-bold text-[var(--mnp-error)] hover:bg-[var(--mnp-error-bg)] flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-error)]"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t.removePhoto}</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={loading}
          onClick={() => inputRef.current?.click()}
          className={`w-full min-h-[124px] rounded-[12px] border-2 border-dashed flex flex-col items-center justify-center gap-2.5 p-4 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] ${
            error
              ? 'border-[var(--mnp-error)] bg-[var(--mnp-error-bg)]'
              : 'border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] hover:border-[var(--mnp-primary)]'
          }`}
        >
          <span
            className={`w-12 h-12 rounded-full flex items-center justify-center ${ICON_CIRCLE_THEMES.blue}`}
          >
            <Camera className="w-6 h-6" />
          </span>
          <span className="text-sm font-bold text-[var(--mnp-text)]">
            {loading ? '...' : t.uploadPhotoBtn}
          </span>
        </button>
      )}

      <div>
        <p className="text-xs font-semibold text-[var(--mnp-text-muted)] mb-2">
          {t.useSamplePhoto}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {sampleOptions.map((opt) => {
            const active = value === opt.src;
            return (
              <button
                key={opt.src}
                type="button"
                onClick={() => onChange(opt.src)}
                className={`min-h-[52px] p-1.5 rounded-[10px] border text-left flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] ${
                  active
                    ? 'border-[var(--mnp-primary)] bg-[var(--mnp-primary-soft)] ring-1 ring-[var(--mnp-primary)]'
                    : 'border-[var(--mnp-border)] bg-[var(--mnp-surface)] hover:border-[var(--mnp-primary)]'
                }`}
              >
                <img
                  src={opt.src}
                  alt={opt.label}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-[8px] object-cover shrink-0 bg-[var(--mnp-surface-muted)]"
                />
                <span className="text-xs font-semibold text-[var(--mnp-text)] leading-tight line-clamp-2">
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <p className={`${UI.errorText} flex items-center gap-1`} role="alert">
          <ImageIcon className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
