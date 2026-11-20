import React, { useState } from 'react';
import {
  Check,
  CheckCircle2,
  Droplets,
  HelpCircle,
  Lamp,
  MapPin,
  Mic,
  Navigation,
  PawPrint,
  Route as RouteIcon,
  Trash2,
  Waves,
} from 'lucide-react';
import { CATEGORIES, WARDS } from '../../constants';
import { PhotoPicker } from '../../components/PhotoPicker';
import { ICON_CIRCLE_THEMES, UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { Complaint, ComplaintCategoryId } from '../../types';

// REAL INTEGRATION NOTE: GPS auto-reverse-geocoding will use Google Maps Geocoding / MapMyIndia API
// and voice note will integrate MediaRecorder API + cloud storage in production.

interface ReportFlowProps {
  onSuccessViewComplaint: (id: string) => void;
  onCancel: () => void;
}

const CATEGORY_VISUALS: Record<
  ComplaintCategoryId,
  { icon: React.ComponentType<{ className?: string }>; circle: string }
> = {
  water: { icon: Droplets, circle: ICON_CIRCLE_THEMES.blue },
  streetlight: { icon: Lamp, circle: ICON_CIRCLE_THEMES.amber },
  sanitation: { icon: Trash2, circle: ICON_CIRCLE_THEMES.green },
  roads: { icon: RouteIcon, circle: ICON_CIRCLE_THEMES.slate },
  drainage: { icon: Waves, circle: ICON_CIRCLE_THEMES.teal },
  cattle: { icon: PawPrint, circle: ICON_CIRCLE_THEMES.saffron },
  other: { icon: HelpCircle, circle: ICON_CIRCLE_THEMES.indigo },
};

export const ReportFlow: React.FC<ReportFlowProps> = ({ onSuccessViewComplaint, onCancel }) => {
  const { citizen, language, t, createComplaint, showToast } = useApp();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [beforePhoto, setBeforePhoto] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<ComplaintCategoryId | null>(null);
  const [ward, setWard] = useState<number>(citizen.ward || 4);
  const [landmark, setLandmark] = useState('');
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'loading' | 'live' | 'simulated'>('idle');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submittedComplaint, setSubmittedComplaint] = useState<Complaint | null>(null);

  const stepLabels = [t.step1Photo, t.step2Category, t.step3Location, t.step4Details];

  const handleDetectGps = () => {
    setGpsStatus('loading');
    const selectedWard = WARDS.find((w) => w.id === ward) || WARDS[3];

    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(Number(pos.coords.latitude.toFixed(5)));
          setLng(Number(pos.coords.longitude.toFixed(5)));
          setGpsStatus('live');
        },
        () => {
          setLat(selectedWard.lat);
          setLng(selectedWard.lng);
          setGpsStatus('simulated');
        },
        { timeout: 3500 }
      );
    } else {
      setLat(selectedWard.lat);
      setLng(selectedWard.lng);
      setGpsStatus('simulated');
    }
  };

  const handleNext = () => {
    setError('');
    if (step === 2 && !category) {
      setError(t.errSelectCategory);
      return;
    }
    if (step === 3) {
      if (!ward) {
        setError(t.errSelectWard);
        return;
      }
      if (landmark.trim().length < 3) {
        setError(t.errEnterLandmark);
        return;
      }
    }
    setStep((prev) => (prev < 4 ? ((prev + 1) as 1 | 2 | 3 | 4) : prev));
  };

  const handleSubmit = () => {
    if (!category) {
      setStep(2);
      setError(t.errSelectCategory);
      return;
    }
    if (landmark.trim().length < 3) {
      setStep(3);
      setError(t.errEnterLandmark);
      return;
    }
    const wardObj = WARDS.find((w) => w.id === ward);
    const created = createComplaint({
      category,
      ward,
      landmark,
      lat: lat ?? wardObj?.lat,
      lng: lng ?? wardObj?.lng,
      description,
      beforePhoto,
    });
    setSubmittedComplaint(created);
  };

  if (submittedComplaint) {
    const catObj = CATEGORIES.find((c) => c.id === submittedComplaint.category);
    return (
      <div className="p-4 flex flex-col items-center text-center space-y-4">
        <div className={`${UI.card} w-full p-5 space-y-4 flex flex-col items-center`}>
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center ${ICON_CIRCLE_THEMES.green}`}
          >
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-[var(--mnp-text)]">{t.complaintSuccessTitle}</h2>
          <div className={`${UI.surfaceMuted} w-full p-3.5 space-y-1`}>
            <p className={UI.mutedText}>{t.complaintIdLabel}</p>
            <p className="text-xl font-bold text-[var(--mnp-primary)] tabular-nums">
              {submittedComplaint.id}
            </p>
            <p className={UI.secondaryText}>
              {catObj ? (language === 'hi' ? catObj.labelHi : catObj.labelEn) : ''} · {t.wardLabel}{' '}
              {submittedComplaint.ward}
            </p>
          </div>
          <p className="text-sm text-[var(--mnp-text-secondary)] leading-relaxed">
            {t.complaintSuccessBody}
          </p>
          <div className="w-full space-y-2 pt-1">
            <button
              type="button"
              onClick={() => onSuccessViewComplaint(submittedComplaint.id)}
              className={`${UI.btnPrimary} w-full`}
            >
              {t.viewComplaintBtn}
            </button>
            <button type="button" onClick={onCancel} className={`${UI.btnOutline} w-full`}>
              {t.navHome}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedCategoryObj = CATEGORIES.find((c) => c.id === category);
  const selectedWardObj = WARDS.find((w) => w.id === ward);

  return (
    <div className="p-3.5 space-y-4">
      {/* Material Numbered 4-Step Civic Stepper */}
      <div className={`${UI.card} p-3.5 space-y-2.5`}>
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((n, idx) => {
            const done = n < step;
            const current = n === step;
            return (
              <React.Fragment key={n}>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold tabular-nums shrink-0 transition-colors ${
                    done
                      ? 'bg-[var(--mnp-success)] text-white'
                      : current
                      ? 'bg-[var(--mnp-primary)] text-white ring-4 ring-[var(--mnp-primary-soft)]'
                      : 'bg-[var(--mnp-surface-muted)] text-[var(--mnp-text-muted)] border border-[var(--mnp-border)]'
                  }`}
                >
                  {done ? <Check className="w-3.5 h-3.5" /> : n}
                </div>
                {idx < 3 && (
                  <div
                    className={`flex-1 h-[2px] mx-1.5 rounded-full ${
                      n < step ? 'bg-[var(--mnp-success)]' : 'bg-[var(--mnp-border)]'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[var(--mnp-primary)]">{stepLabels[step - 1]}</span>
          <span className="font-semibold text-[var(--mnp-text-muted)] tabular-nums">
            {step} / 4
          </span>
        </div>
      </div>

      {/* Step 1: Photo */}
      {step === 1 && (
        <div className={`${UI.card} p-4 space-y-3`}>
          <div>
            <h2 className="text-base font-bold text-[var(--mnp-text)]">{t.takeOrUploadPhoto}</h2>
            <p className={`${UI.mutedText} mt-1`}>{t.photoOptionalHint}</p>
          </div>
          <PhotoPicker value={beforePhoto} onChange={setBeforePhoto} mode="before" />
        </div>
      )}

      {/* Step 2: Category Grid with Colored Circular Icons */}
      {step === 2 && (
        <div className="space-y-3">
          <h2 className={UI.sectionTitle}>{t.selectCategoryPrompt}</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {CATEGORIES.map((cat) => {
              const vis = CATEGORY_VISUALS[cat.id];
              const Icon = vis.icon;
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setCategory(cat.id);
                    setError('');
                  }}
                  className={`min-h-[100px] p-3 rounded-[12px] border text-left flex flex-col justify-between transition-colors shadow-[var(--mnp-shadow-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] ${
                    active
                      ? 'border-[var(--mnp-primary)] bg-[var(--mnp-primary-soft)] ring-2 ring-[var(--mnp-primary)]'
                      : 'border-[var(--mnp-border)] bg-[var(--mnp-surface)] hover:border-[var(--mnp-primary)]'
                  }`}
                >
                  <span
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${vis.circle}`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <div className="mt-2">
                    <div className="text-xs font-bold text-[var(--mnp-text)] leading-snug">
                      {language === 'hi' ? cat.labelHi : cat.labelEn}
                    </div>
                    <div className="text-[11px] font-semibold text-[var(--mnp-text-muted)] tabular-nums mt-0.5">
                      SLA: {cat.slaHours} {t.hoursShort}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: GPS Location, Ward & Landmark */}
      {step === 3 && (
        <div className={`${UI.card} p-4 space-y-4`}>
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleDetectGps}
              disabled={gpsStatus === 'loading'}
              className="w-full min-h-[48px] px-4 rounded-[10px] border-2 border-[var(--mnp-primary)] text-[var(--mnp-primary)] bg-[var(--mnp-primary-soft)] text-sm font-bold flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)]"
            >
              <Navigation className="w-4 h-4" />
              <span>{gpsStatus === 'loading' ? '...' : t.detectGpsBtn}</span>
            </button>

            {lat !== undefined && lng !== undefined && (
              <div className="rounded-[10px] border border-[#A7DFBA] dark:border-[#1E5C38] bg-[var(--mnp-success-bg)] p-2.5 text-xs text-[var(--mnp-success)] space-y-0.5">
                <div className="font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {t.gpsDetected}:{' '}
                    <span className="tabular-nums">
                      {lat}, {lng}
                    </span>
                  </span>
                </div>
                {gpsStatus === 'simulated' && (
                  <p className="text-[11px] opacity-90">{t.gpsSimulatedNote}</p>
                )}
              </div>
            )}

            <p className={UI.mutedText}>{t.gpsFallbackNote}</p>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="report-ward"
              className="block text-xs font-bold text-[var(--mnp-text-secondary)]"
            >
              {t.selectWard} *
            </label>
            <select
              id="report-ward"
              value={ward}
              onChange={(e) => setWard(Number(e.target.value))}
              className={UI.input}
            >
              {WARDS.map((w) => (
                <option key={w.id} value={w.id}>
                  {language === 'hi' ? w.nameHi : w.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="report-landmark"
              className="block text-xs font-bold text-[var(--mnp-text-secondary)]"
            >
              {t.landmarkLabel} *
            </label>
            <input
              id="report-landmark"
              type="text"
              value={landmark}
              onChange={(e) => {
                setLandmark(e.target.value);
                setError('');
              }}
              placeholder={t.landmarkPlaceholder}
              className={UI.input}
            />
          </div>
        </div>
      )}

      {/* Step 4: Optional Description, Voice Placeholder & Summary */}
      {step === 4 && (
        <div className="space-y-3.5">
          <div className={`${UI.card} p-4 space-y-3`}>
            <div className="space-y-1.5">
              <label
                htmlFor="report-desc"
                className="block text-xs font-bold text-[var(--mnp-text-secondary)]"
              >
                {t.descriptionLabel} ({t.optional})
              </label>
              <textarea
                id="report-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.descriptionPlaceholder}
                className={UI.textarea}
              />
            </div>

            <button
              type="button"
              onClick={() => showToast(t.voiceNoteBtn, t.voicePlaceholderToast, 'Info')}
              className={`${UI.btnOutline} w-full text-xs flex items-center justify-center gap-2`}
            >
              <Mic className="w-4 h-4 text-[var(--mnp-primary)]" />
              <span>{t.voiceNoteBtn}</span>
            </button>
          </div>

          <div className={`${UI.card} p-4 space-y-2 text-xs`}>
            <h3 className="text-sm font-bold text-[var(--mnp-text)]">{t.reviewBeforeSubmit}</h3>
            <div className="flex justify-between gap-2">
              <span className="text-[var(--mnp-text-muted)]">{t.filterCategory}:</span>
              <span className="font-bold text-[var(--mnp-text)] text-right">
                {selectedCategoryObj
                  ? language === 'hi'
                    ? selectedCategoryObj.labelHi
                    : selectedCategoryObj.labelEn
                  : '-'}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[var(--mnp-text-muted)]">{t.slaTarget}</span>
              <span className="font-bold text-[var(--mnp-primary)] tabular-nums">
                {selectedCategoryObj?.slaHours} {t.hoursShort}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[var(--mnp-text-muted)]">{t.wardLabel}:</span>
              <span className="font-bold text-[var(--mnp-text)] text-right">
                {selectedWardObj
                  ? language === 'hi'
                    ? selectedWardObj.nameHi
                    : selectedWardObj.nameEn
                  : ward}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[var(--mnp-text-muted)]">{t.landmarkLabel}:</span>
              <span className="font-bold text-[var(--mnp-text)] text-right">{landmark}</span>
            </div>
            {beforePhoto && (
              <img
                src={beforePhoto}
                alt={t.beforePhotoLabel}
                referrerPolicy="no-referrer"
                className="w-full h-28 object-cover rounded-[8px] mt-2 border border-[var(--mnp-border)]"
              />
            )}
          </div>
        </div>
      )}

      {error && (
        <p className={UI.errorText} role="alert">
          {error}
        </p>
      )}

      {/* Step Footer Navigation */}
      <div className="flex items-center gap-2 pt-1">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => {
              setError('');
              setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
            }}
            className={UI.btnOutline}
          >
            {t.previous}
          </button>
        ) : (
          <button type="button" onClick={onCancel} className={UI.btnOutline}>
            {t.cancel}
          </button>
        )}

        {step < 4 ? (
          <button type="button" onClick={handleNext} className={`${UI.btnPrimary} flex-1`}>
            {t.next}
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} className={`${UI.btnAccent} flex-1`}>
            {t.submitComplaintBtn}
          </button>
        )}
      </div>
    </div>
  );
};
