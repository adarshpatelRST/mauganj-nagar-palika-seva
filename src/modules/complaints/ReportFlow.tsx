import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Clock,
  Lock,
  MapPin,
  Mic,
  Navigation,
  RotateCw,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { CATEGORIES, WARDS } from '../../constants';
import { PROBLEM_CATEGORIES } from '../../constants/problemCategories';
import { PhotoPicker } from '../../components/PhotoPicker';
import { ICON_CIRCLE_THEMES, UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { Complaint, ComplaintCategoryId } from '../../types';
import { haversineKm } from '../../utils/format';
import { reverseGeocode, GeocodeResult } from '../../utils/geocode';

interface ReportFlowProps {
  onSuccessViewComplaint: (id: string) => void;
  onCancel: () => void;
  initialCategory?: ComplaintCategoryId;
}

export const ReportFlow: React.FC<ReportFlowProps> = ({
  onSuccessViewComplaint,
  onCancel,
  initialCategory,
}) => {
  const { citizen, language, t, createComplaint, showToast } = useApp();
  const [beforePhoto, setBeforePhoto] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<ComplaintCategoryId | ''>(initialCategory || '');
  const [isChangingCategory, setIsChangingCategory] = useState(!initialCategory);
  const [ward, setWard] = useState<number>(citizen.ward || 4);
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);
  const [autoAddress, setAutoAddress] = useState<string>('');
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'loading' | 'live' | 'error'>('idle');
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState<Complaint | null>(null);
  const [geocodeResult, setGeocodeResult] = useState<GeocodeResult | null>(null);
  const [isResolvingAddress, setIsResolvingAddress] = useState(false);
  const [accuracy, setAccuracy] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
      setIsChangingCategory(false);
    }
  }, [initialCategory]);

  const selectedCategoryObj = CATEGORIES.find((c) => c.id === category);
  const selectedProblemConfig = PROBLEM_CATEGORIES.find((c) => c.id === category);
  const selectedWardObj = WARDS.find((w) => w.id === ward);

  const detectGps = () => {
    setGpsStatus('loading');
    setGpsError(null);
    setError('');
    setIsResolvingAddress(true);

    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const detectedLat = Number(pos.coords.latitude.toFixed(5));
          const detectedLng = Number(pos.coords.longitude.toFixed(5));
          setLat(detectedLat);
          setLng(detectedLng);
          if (pos.coords.accuracy) {
            setAccuracy(Math.round(pos.coords.accuracy));
          }
          setGpsStatus('live');

          try {
            const geo = await reverseGeocode(detectedLat, detectedLng, language);
            setGeocodeResult(geo);
            setWard(geo.nearestWardId);
            // Only set the captured physical address - no extra ward or test labels
            setAutoAddress(geo.fullAddress);
          } catch {
            const fallbackWard = WARDS.find((w) => w.id === (citizen.ward || 4)) || WARDS[0];
            setWard(fallbackWard.id);
            setAutoAddress(`GPS: ${detectedLat}° N, ${detectedLng}° E`);
          } finally {
            setIsResolvingAddress(false);
          }
        },
        (err) => {
          setGpsStatus('error');
          setIsResolvingAddress(false);
          setLat(undefined);
          setLng(undefined);
          setAutoAddress('');
          setGeocodeResult(null);
          let msg =
            language === 'hi'
              ? 'GPS लोकेशन प्राप्त नहीं हो सकी। कृपया डिवाइस में GPS/स्थान सेवा चालू करें।'
              : 'GPS location could not be fetched. Please turn on device location services.';
          if (err.code === 1) {
            msg =
              language === 'hi'
                ? 'लोकेशन अनुमति अस्वीकृत है। शिकायत दर्ज करने के लिए ब्राउज़र सेटिंग्स में लोकेशन की अनुमति दें।'
                : 'Location permission denied. Please allow location access in your browser settings to report an issue.';
          }
          setGpsError(msg);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setGpsStatus('error');
      setIsResolvingAddress(false);
      setLat(undefined);
      setLng(undefined);
      setAutoAddress('');
      setGeocodeResult(null);
      setGpsError(
        language === 'hi'
          ? 'आपके डिवाइस/ब्राउज़र में GPS की सुविधा उपलब्ध नहीं है।'
          : 'Geolocation is not supported by your browser.'
      );
    }
  };

  useEffect(() => {
    detectGps();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!category) {
      setError(
        language === 'hi' ? 'कृपया शिकायत की श्रेणी चुनें।' : 'Please select a complaint category.'
      );
      return;
    }

    if (!lat || !lng || gpsStatus !== 'live') {
      setError(
        language === 'hi'
          ? 'बिना GPS लोकेशन के शिकायत दर्ज नहीं की जा सकती। कृपया GPS चालू करें।'
          : 'GPS location is mandatory. You cannot submit a complaint without live GPS.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const created = createComplaint({
        category,
        ward,
        landmark: autoAddress,
        lat,
        lng,
        description: description.trim() || undefined,
        beforePhoto,
      });
      setSubmittedComplaint(created);
    } catch {
      setError(
        language === 'hi'
          ? 'शिकायत दर्ज करने में त्रुटि हुई। कृपया पुनः प्रयास करें।'
          : 'Failed to create complaint. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
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
              {catObj ? (language === 'hi' ? catObj.labelHi : catObj.labelEn) : ''}
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

  const hasGps = gpsStatus === 'live' && lat !== undefined && lng !== undefined;

  return (
    <div className="p-3.5 space-y-4 max-w-lg mx-auto">
      {/* Form Introduction Header */}
      <div className={`${UI.card} p-4 space-y-1.5 border-l-4 border-l-[var(--mnp-primary)]`}>
        <h2 className="text-base font-bold text-[var(--mnp-text)]">
          {language === 'hi' ? 'नागरिक शिकायत पंजीकरण' : 'Civic Grievance Registration'}
        </h2>
        <p className="text-xs text-[var(--mnp-text-muted)] leading-relaxed">
          {language === 'hi'
            ? 'समस्या की जानकारी भरें। बिना GPS लोकेशन के शिकायत दर्ज नहीं की जा सकती।'
            : 'Fill in the issue details below. GPS location is mandatory to register a complaint.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Section 1: Photo Evidence (Restricted to Live Camera Only) */}
        <div className={`${UI.card} p-4 space-y-2.5`}>
          <label className="block text-xs font-bold text-[var(--mnp-text)]">
            {language === 'hi' ? 'मौके की लाइव फोटो (लाइव कैमरा)' : 'Live Spot Photograph (Live Camera)'} ({t.optional})
          </label>
          <PhotoPicker
            value={beforePhoto}
            onChange={setBeforePhoto}
            mode="before"
            cameraOnly={true}
          />
        </div>

        {/* Section 2: Problem Category Selection (No Dropdown - Visual Icon Cards) */}
        <div className={`${UI.card} p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--mnp-text)]">
              <Tag className="w-4 h-4 text-[var(--mnp-primary)]" />
              <span>
                {language === 'hi' ? 'समस्या की श्रेणी *' : 'Civic Problem Category *'}
              </span>
            </label>
            {category && (
              <button
                type="button"
                onClick={() => setIsChangingCategory(!isChangingCategory)}
                className="text-xs font-bold text-[var(--mnp-primary)] hover:underline"
              >
                {isChangingCategory
                  ? language === 'hi'
                    ? 'रद्द करें'
                    : 'Cancel'
                  : language === 'hi'
                    ? 'समस्या बदलें'
                    : 'Change Problem'}
              </button>
            )}
          </div>

          {/* Prominent Pre-selected Problem Card (NO dropdown) */}
          {selectedProblemConfig && !isChangingCategory && (
            <div className="rounded-[14px] p-3.5 bg-gradient-to-r from-[var(--mnp-surface)] to-[var(--mnp-surface-muted)] border-2 border-[var(--mnp-primary)]/40 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 shadow-xs ${selectedProblemConfig.iconBg}`}
                >
                  {React.createElement(selectedProblemConfig.icon, { className: 'w-6 h-6' })}
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-extrabold text-[var(--mnp-text)] truncate">
                    {language === 'hi' ? selectedProblemConfig.labelHi : selectedProblemConfig.labelEn}
                  </h3>
                  <p className="text-[11px] text-[var(--mnp-text-muted)] truncate mt-0.5">
                    {language === 'hi' ? selectedProblemConfig.deptHi : selectedProblemConfig.deptEn}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] text-xs font-bold shrink-0 tabular-nums">
                {selectedProblemConfig.slaHours}h SLA
              </span>
            </div>
          )}

          {/* Interactive Problem Icon Cards (Shown when selecting or changing problem) */}
          {(!category || isChangingCategory) && (
            <div className="space-y-2 pt-1">
              <p className="text-xs font-semibold text-[var(--mnp-text-muted)]">
                {language === 'hi'
                  ? 'अपनी समस्या के आइकन पर टैप करें:'
                  : 'Tap on your problem category icon below:'}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {PROBLEM_CATEGORIES.map((item) => {
                  const Icon = item.icon;
                  const isSelected = category === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setCategory(item.id);
                        setIsChangingCategory(false);
                        setError('');
                      }}
                      className={`min-h-[86px] p-2 rounded-[12px] border text-center flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 ${isSelected
                          ? 'border-[var(--mnp-primary)] bg-[var(--mnp-primary-soft)] ring-2 ring-[var(--mnp-primary)]'
                          : 'border-[var(--mnp-border)] bg-[var(--mnp-surface)] hover:border-[var(--mnp-primary)]'
                        }`}
                    >
                      <span
                        className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${item.iconBg}`}
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="text-[10.5px] font-bold text-[var(--mnp-text)] leading-tight line-clamp-2">
                        {language === 'hi' ? item.shortLabelHi : item.shortLabelEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Mandatory GPS Location & Locked Address (No edit option) */}
        <div className={`${UI.card} p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--mnp-text)]">
              <MapPin className="w-4 h-4 text-[var(--mnp-primary)]" />
              <span>
                {language === 'hi'
                  ? 'समस्या स्थल की GPS लोकेशन *'
                  : 'Incident GPS Location *'}
              </span>
            </label>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--mnp-text-muted)] bg-[var(--mnp-surface-muted)] px-2 py-0.5 rounded-full border border-[var(--mnp-border)]">
              <Lock className="w-3 h-3 text-[var(--mnp-primary)]" />
              <span>{language === 'hi' ? 'अपरिवर्तनीय' : 'Non-editable'}</span>
            </span>
          </div>

          {/* GPS Loading State */}
          {gpsStatus === 'loading' && (
            <div className="rounded-[12px] border border-blue-200 dark:border-blue-900 bg-blue-50/70 dark:bg-blue-950/30 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 animate-spin">
                <RotateCw className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-blue-900 dark:text-blue-200">
                  {language === 'hi' ? 'GPS लोकेशन प्राप्त की जा रही है...' : 'Capturing live GPS location...'}
                </p>
                <p className="text-[11px] text-blue-700 dark:text-blue-400">
                  {language === 'hi' ? 'कृपया थोड़ा इंतज़ार करें' : 'Please wait a moment'}
                </p>
              </div>
            </div>
          )}

          {/* GPS Success State: Read-Only Address Card */}
          {hasGps && (
            <div className="rounded-[12px] border border-[#A7DFBA] dark:border-[#1E5C38] bg-[var(--mnp-success-bg)] p-3.5 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--mnp-success)]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{language === 'hi' ? 'सत्यापित GPS लोकेशन सक्रिय' : 'Live GPS Verified'}</span>
                </div>
                <button
                  type="button"
                  onClick={detectGps}
                  className="text-[11px] font-bold text-[var(--mnp-primary)] hover:underline flex items-center gap-1"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>{language === 'hi' ? 'पुनः जांचें' : 'Refresh'}</span>
                </button>
              </div>

              {/* Locked Auto-Address Display */}
              <div className="space-y-2.5 bg-white/80 dark:bg-black/30 p-3 rounded-[10px] border border-[#A7DFBA]/70 text-xs">
                {/* 1. Captured Physical Address */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-[var(--mnp-text-muted)] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>
                      {language === 'hi'
                        ? 'GPS द्वारा प्राप्त पता (Captured Address):'
                        : 'Captured GPS Address:'}
                    </span>
                  </div>

                  {isResolvingAddress ? (
                    <div className="flex items-center gap-2 py-1 text-xs text-blue-700 dark:text-blue-300 font-medium animate-pulse">
                      <RotateCw className="w-3.5 h-3.5 animate-spin shrink-0" />
                      <span>
                        {language === 'hi'
                          ? 'GPS निर्देशांक से सड़क/इलाका खोजा जा रहा है...'
                          : 'Resolving street & locality from GPS...'}
                      </span>
                    </div>
                  ) : (
                    <div className="font-bold text-[var(--mnp-text)] text-sm leading-snug break-words">
                      {geocodeResult?.fullAddress || autoAddress || `${lat.toFixed(5)}°, ${lng.toFixed(5)}°`}
                    </div>
                  )}
                </div>

                {/* 2. Coordinates & Precision */}
                <div className="pt-2 border-t border-[var(--mnp-border)] flex items-center justify-between text-[11px] text-[var(--mnp-text-muted)] flex-wrap gap-1">
                  <span className="font-mono tabular-nums">
                    Lat: {lat.toFixed(5)}° N, Lng: {lng.toFixed(5)}° E
                  </span>
                  {accuracy !== undefined && (
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
                      ±{accuracy}m {language === 'hi' ? 'सटीकता' : 'accuracy'}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-[var(--mnp-text-muted)] flex items-center gap-1">
                <Lock className="w-3 h-3 shrink-0 text-emerald-600" />
                <span>
                  {language === 'hi'
                    ? 'स्थान का पता GPS द्वारा स्वतः निर्धारित है एवं इसे बदला नहीं जा सकता।'
                    : 'Address is automatically captured from GPS and cannot be edited.'}
                </span>
              </p>
            </div>
          )}

          {/* GPS Error / Missing State: Mandatory Warning */}
          {gpsStatus === 'error' && (
            <div className="rounded-[12px] border border-red-200 dark:border-red-900 bg-red-50/70 dark:bg-red-950/30 p-3.5 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{language === 'hi' ? 'GPS लोकेशन अनिवार्य है' : 'GPS Location Required'}</span>
              </div>
              <p className="text-red-800 dark:text-red-300 leading-relaxed text-[11px]">
                {gpsError ||
                  (language === 'hi'
                    ? 'बिना GPS लोकेशन के शिकायत दर्ज नहीं की जा सकती। कृपया लोकेशन चालू कर पुनः प्रयास करें।'
                    : 'Complaints cannot be submitted without live GPS location. Please enable location.')}
              </p>
              <button
                type="button"
                onClick={detectGps}
                className="w-full min-h-[42px] px-3 rounded-[8px] bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>{language === 'hi' ? 'GPS लोकेशन प्राप्त करें' : 'Acquire GPS Location'}</span>
              </button>
            </div>
          )}

          {gpsStatus === 'idle' && (
            <button
              type="button"
              onClick={detectGps}
              className="w-full min-h-[44px] px-3 rounded-[10px] border border-[var(--mnp-primary)] text-[var(--mnp-primary)] bg-[var(--mnp-primary-soft)] text-xs font-bold flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>{t.detectGpsBtn}</span>
            </button>
          )}
        </div>

        {/* Section 4: Problem Description */}
        <div className={`${UI.card} p-4 space-y-3`}>
          <div className="space-y-1">
            <label
              htmlFor="complaint-desc"
              className="block text-xs font-bold text-[var(--mnp-text)]"
            >
              {t.descriptionLabel} ({t.optional})
            </label>
            <p className={UI.mutedText}>
              {language === 'hi'
                ? 'समस्या के बारे में संक्षिप्त विवरण लिखें'
                : 'Provide any additional details or description'}
            </p>
          </div>
          <textarea
            id="complaint-desc"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.descriptionPlaceholder}
            className={UI.textarea}
          />
          <button
            type="button"
            onClick={() => showToast(t.voiceNoteBtn, t.voicePlaceholderToast, 'Info')}
            className={`${UI.btnOutline} w-full text-xs flex items-center justify-center gap-2`}
          >
            <Mic className="w-4 h-4 text-[var(--mnp-primary)]" />
            <span>{t.voiceNoteBtn}</span>
          </button>
        </div>

        {/* Error message */}
        {error && (
          <p className={UI.errorText} role="alert">
            {error}
          </p>
        )}

        {/* Form Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            type="submit"
            disabled={!hasGps || !category || isSubmitting}
            className={`w-full min-h-[48px] rounded-[12px] font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${!hasGps || !category || isSubmitting
              ? 'bg-gray-300 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed shadow-none'
              : `${UI.btnAccent} active:scale-[0.99]`
              }`}
          >
            {isSubmitting ? (
              <RotateCw className="w-4 h-4 animate-spin" />
            ) : !hasGps ? (
              <>
                <Lock className="w-4 h-4" />
                <span>
                  {language === 'hi'
                    ? 'GPS के बिना शिकायत दर्ज नहीं हो सकती'
                    : 'GPS Required to Submit'}
                </span>
              </>
            ) : !category ? (
              <span>
                {language === 'hi' ? 'कृपया श्रेणी का चयन करें' : 'Select Category to Submit'}
              </span>
            ) : (
              <span>{t.submitComplaintBtn}</span>
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className={`${UI.btnOutline} w-full min-h-[44px] text-xs`}
          >
            {t.cancel}
          </button>
        </div>
      </form>
    </div>
  );
};
