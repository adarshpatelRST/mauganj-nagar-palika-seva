import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Droplets,
  History,
  Lock,
  MapPin,
  Navigation,
  Phone,
  PlusCircle,
  RotateCw,
  ShieldCheck,
  Truck,
  User,
} from 'lucide-react';
import { WARDS } from '../../constants';
import { ICON_CIRCLE_THEMES, UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { WaterTankerBooking } from '../../types';
import { formatDateTime } from '../../utils/format';
import { reverseGeocode, GeocodeResult } from '../../utils/geocode';

interface WaterTankerBookingViewProps {
  onBack?: () => void;
}

export const WaterTankerBookingView: React.FC<WaterTankerBookingViewProps> = ({ onBack }) => {
  const { citizen, waterTankerBookings, language, t, bookWaterTanker, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'new' | 'my_bookings'>('new');
  const [capacity, setCapacity] = useState<3000 | 5000 | 10000>(5000);
  const [deliverySlot, setDeliverySlot] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [deliveryDate, setDeliveryDate] = useState<string>(
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [purpose, setPurpose] = useState<string>(
    language === 'hi' ? 'पेयजल संकट / सूखा राहत' : 'Drinking Water Shortage'
  );
  const [remarks, setRemarks] = useState('');
  const [ward, setWard] = useState<number>(citizen.ward || 4);

  // GPS State
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'loading' | 'live' | 'error'>('idle');
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [isResolvingAddress, setIsResolvingAddress] = useState(false);
  const [accuracy, setAccuracy] = useState<number | undefined>(undefined);

  const [formError, setFormError] = useState('');
  const [submittedBooking, setSubmittedBooking] = useState<WaterTankerBooking | null>(null);

  // Auto-detect GPS on initial render
  useEffect(() => {
    detectGps();
  }, []);

  const detectGps = () => {
    setGpsStatus('loading');
    setGpsError(null);
    setFormError('');
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
            setWard(geo.nearestWardId);
            setDeliveryAddress(geo.fullAddress);
          } catch {
            const fallbackWard = WARDS.find((w) => w.id === (citizen.ward || 4)) || WARDS[0];
            setWard(fallbackWard.id);
            setDeliveryAddress(`GPS: ${detectedLat}° N, ${detectedLng}° E`);
          } finally {
            setIsResolvingAddress(false);
          }
        },
        (err) => {
          setGpsStatus('error');
          setIsResolvingAddress(false);
          let msg =
            language === 'hi'
              ? 'GPS लोकेशन प्राप्त नहीं हो सकी। कृपया लोकेशन सेवा चालू करें।'
              : 'GPS location could not be fetched. Please enable location service.';
          if (err.code === 1) {
            msg =
              language === 'hi'
                ? 'लोकेशन अनुमति अस्वीकृत है। पानी टैंकर की सटीक डिलीवरी हेतु कृपया लोकेशन की अनुमति दें।'
                : 'Location permission denied. Please allow location access for accurate delivery.';
          }
          setGpsError(msg);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setGpsStatus('error');
      setIsResolvingAddress(false);
      setGpsError(
        language === 'hi'
          ? 'आपके ब्राउज़र में GPS सेवा समर्थित नहीं है।'
          : 'Geolocation not supported by your browser.'
      );
    }
  };

  const myBookings = waterTankerBookings.filter(
    (b) => b.citizenMobile === citizen.mobile
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!deliveryAddress || !lat || !lng) {
      setFormError(
        language === 'hi'
          ? 'पानी टैंकर भेजने हेतु GPS डिलीवरी लोकेशन प्राप्त करना आवश्यक है।'
          : 'GPS delivery location is required to book a water tanker.'
      );
      return;
    }

    if (!deliveryDate) {
      setFormError(
        language === 'hi'
          ? 'कृपया डिलीवरी की तारीख चुनें।'
          : 'Please select a delivery date.'
      );
      return;
    }

    const booking = bookWaterTanker({
      citizenMobile: citizen.mobile,
      citizenName: citizen.name,
      ward,
      deliveryAddress,
      lat,
      lng,
      deliveryDate,
      deliverySlot,
      capacityLiters: capacity,
      purpose,
      remarks: remarks.trim() || undefined,
    });

    setSubmittedBooking(booking);
  };

  if (submittedBooking) {
    return (
      <div className="p-4 space-y-4">
        <div className={`${UI.card} p-5 text-center space-y-3.5 border-emerald-500/30`}>
          <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              {language === 'hi' ? '✓ पानी टैंकर बुकिंग स्वीकृत' : '✓ Tanker Booking Confirmed'}
            </span>
            <h2 className="text-lg font-bold text-[var(--mnp-text)]">
              {language === 'hi' ? 'अनुरोध सफलतापूर्वक दर्ज हुआ' : 'Booking Request Placed'}
            </h2>
            <p className="text-xs text-[var(--mnp-text-muted)]">
              {language === 'hi'
                ? `बुकिंग संदर्भ संख्या: `
                : `Booking Reference ID: `}
              <strong className="text-[var(--mnp-primary)] font-mono text-sm">
                {submittedBooking.id}
              </strong>
            </p>
          </div>

          <div className="rounded-[12px] bg-[var(--mnp-surface-muted)] p-3 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[var(--mnp-text-muted)]">
                {language === 'hi' ? 'टैंकर क्षमता:' : 'Capacity:'}
              </span>
              <span className="font-bold text-[var(--mnp-text)]">
                {submittedBooking.capacityLiters.toLocaleString()} {language === 'hi' ? 'लीटर' : 'Litres'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--mnp-text-muted)]">
                {language === 'hi' ? 'डिलीवरी दिनांक:' : 'Delivery Date:'}
              </span>
              <span className="font-bold text-[var(--mnp-text)]">
                {submittedBooking.deliveryDate} ({submittedBooking.deliverySlot})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--mnp-text-muted)]">
                {language === 'hi' ? 'आबंटित वाहन:' : 'Vehicle:'}
              </span>
              <span className="font-bold text-emerald-700 dark:text-emerald-300">
                {submittedBooking.vehicleNo || 'MP-19-WT-0244'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--mnp-text-muted)]">
                {language === 'hi' ? 'चालक:' : 'Driver:'}
              </span>
              <span className="font-bold text-[var(--mnp-text)]">
                {submittedBooking.driverName || 'सुरेश कुमार कोल'} ({submittedBooking.driverPhone || '9826022334'})
              </span>
            </div>
            <div className="pt-1 border-t border-[var(--mnp-border)]">
              <span className="text-[var(--mnp-text-muted)] block text-[11px]">
                {language === 'hi' ? 'डिलीवरी स्थल (GPS):' : 'Delivery Location (GPS):'}
              </span>
              <span className="font-semibold text-[var(--mnp-text)] text-[11px]">
                {submittedBooking.deliveryAddress}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setSubmittedBooking(null);
                setActiveTab('my_bookings');
              }}
              className={`${UI.btnPrimary} w-full`}
            >
              {language === 'hi' ? 'मेरी बुकिंग्स देखें' : 'View My Bookings'}
            </button>
            <button
              type="button"
              onClick={() => {
                setSubmittedBooking(null);
                setActiveTab('new');
              }}
              className={`${UI.btnOutline} w-full`}
            >
              {language === 'hi' ? 'नया टैंकर बुक करें' : 'Book Another Tanker'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Tab Switcher: New Booking vs My Bookings */}
      <div className="grid grid-cols-2 p-1 bg-[var(--mnp-surface-muted)] rounded-[12px] border border-[var(--mnp-border)]">
        <button
          type="button"
          onClick={() => setActiveTab('new')}
          className={`min-h-[40px] rounded-[10px] text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'new'
              ? 'bg-white dark:bg-neutral-800 text-[var(--mnp-primary)] shadow-sm'
              : 'text-[var(--mnp-text-muted)] hover:text-[var(--mnp-text)]'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>{language === 'hi' ? 'नया टैंकर अनुरोध' : 'New Request'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('my_bookings')}
          className={`min-h-[40px] rounded-[10px] text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'my_bookings'
              ? 'bg-white dark:bg-neutral-800 text-[var(--mnp-primary)] shadow-sm'
              : 'text-[var(--mnp-text-muted)] hover:text-[var(--mnp-text)]'
          }`}
        >
          <History className="w-4 h-4" />
          <span>
            {language === 'hi' ? 'मेरी बुकिंग्स' : 'My Bookings'} ({myBookings.length})
          </span>
        </button>
      </div>

      {activeTab === 'new' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Header Info Banner */}
          <div className="rounded-[14px] bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 shadow-md space-y-1">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-cyan-200" />
              <h2 className="text-base font-bold">
                {language === 'hi' ? 'नगर पालिका पानी टैंकर सेवा' : 'Municipal Water Tanker Service'}
              </h2>
            </div>
            <p className="text-xs text-blue-100">
              {language === 'hi'
                ? 'पेयजल संकट, आयोजनों व आपात स्थिति में जीपीएस लोकेशन पर टैंकर मंगाएं'
                : 'Request emergency or event water tankers delivered directly to your GPS coordinates'}
            </p>
          </div>

          {/* Section 1: GPS Location Picker (Mandatory) */}
          <div className={`${UI.card} p-4 space-y-3`}>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--mnp-text)]">
                <MapPin className="w-4 h-4 text-[var(--mnp-primary)]" />
                <span>
                  {language === 'hi' ? 'डिलीवरी स्थान (GPS द्वारा स्वतः)' : 'Delivery Location (Auto GPS)'} *
                </span>
              </label>

              <button
                type="button"
                onClick={detectGps}
                disabled={gpsStatus === 'loading'}
                className="text-xs font-bold text-[var(--mnp-primary)] flex items-center gap-1 hover:underline"
              >
                <RotateCw
                  className={`w-3.5 h-3.5 ${gpsStatus === 'loading' ? 'animate-spin' : ''}`}
                />
                <span>{language === 'hi' ? 'GPS रिफ्रेश' : 'Refresh GPS'}</span>
              </button>
            </div>

            {gpsStatus === 'loading' && (
              <div className="p-3 rounded-[10px] bg-[var(--mnp-primary-soft)] text-xs text-[var(--mnp-primary)] flex items-center gap-2">
                <RotateCw className="w-4 h-4 animate-spin shrink-0" />
                <span>
                  {language === 'hi'
                    ? 'लाइव GPS लोकेशन व पता प्राप्त किया जा रहा है...'
                    : 'Fetching live GPS location & address...'}
                </span>
              </div>
            )}

            {gpsStatus === 'error' && (
              <div className="p-3 rounded-[10px] bg-red-50 dark:bg-red-950/30 border border-red-200 text-xs text-red-800 dark:text-red-300 space-y-2">
                <div className="flex items-start gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{gpsError}</span>
                </div>
                <button
                  type="button"
                  onClick={detectGps}
                  className="px-3 py-1.5 rounded-[8px] bg-red-600 text-white font-bold text-xs"
                >
                  {language === 'hi' ? 'पुनः प्रयास करें' : 'Retry'}
                </button>
              </div>
            )}

            {deliveryAddress && (
              <div className="rounded-[10px] border border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'सत्यापित GPS स्थान' : 'Verified GPS Location'}</span>
                  </span>
                  {accuracy && (
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">
                      ±{accuracy}m सटीकता
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold text-[var(--mnp-text)] leading-relaxed">
                  {deliveryAddress}
                </p>

                {lat && lng && (
                  <p className="text-[11px] text-[var(--mnp-text-muted)] font-mono">
                    निर्देशांक: {lat}° N, {lng}° E · वार्ड {ward}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Section 2: Tanker Capacity Selection */}
          <div className={`${UI.card} p-4 space-y-2.5`}>
            <label className="block text-xs font-bold text-[var(--mnp-text)]">
              {language === 'hi' ? 'टैंकर क्षमता चुनें *' : 'Select Tanker Capacity *'}
            </label>

            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { liters: 3000, labelHi: '3,000 ली.', labelEn: '3,000 L', tagHi: 'छोटा घरेलू', tagEn: 'Small' },
                  { liters: 5000, labelHi: '5,000 ली.', labelEn: '5,000 L', tagHi: 'मानक (लोकप्रिय)', tagEn: 'Standard' },
                  { liters: 10000, labelHi: '10,000 ली.', labelEn: '10,000 L', tagHi: 'बड़ा आयोजन', tagEn: 'Large' },
                ] as const
              ).map((item) => {
                const isSelected = capacity === item.liters;
                return (
                  <button
                    key={item.liters}
                    type="button"
                    onClick={() => setCapacity(item.liters)}
                    className={`min-h-[78px] p-2 rounded-[12px] border text-center flex flex-col items-center justify-center gap-1 transition-all ${
                      isSelected
                        ? 'border-[var(--mnp-primary)] bg-[var(--mnp-primary-soft)] ring-2 ring-[var(--mnp-primary)] text-[var(--mnp-primary)] font-bold'
                        : 'border-[var(--mnp-border)] bg-[var(--mnp-surface)] text-[var(--mnp-text)] hover:border-[var(--mnp-primary)]'
                    }`}
                  >
                    <span className="text-xs font-extrabold">{item.labelHi}</span>
                    <span className="text-[10px] text-[var(--mnp-text-muted)] leading-tight">
                      {language === 'hi' ? item.tagHi : item.tagEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Delivery Date & Slot */}
          <div className={`${UI.card} p-4 space-y-3`}>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[var(--mnp-text)]">
                  {language === 'hi' ? 'डिलीवरी तारीख *' : 'Delivery Date *'}
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className={UI.input}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[var(--mnp-text)]">
                  {language === 'hi' ? 'समय स्लॉट *' : 'Time Slot *'}
                </label>
                <select
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value as any)}
                  className={UI.input}
                >
                  <option value="morning">
                    {language === 'hi' ? 'सुबह (07:00 – 11:00)' : 'Morning (7-11 AM)'}
                  </option>
                  <option value="afternoon">
                    {language === 'hi' ? 'दोपहर (12:00 – 03:00)' : 'Afternoon (12-3 PM)'}
                  </option>
                  <option value="evening">
                    {language === 'hi' ? 'शाम (04:00 – 08:00)' : 'Evening (4-8 PM)'}
                  </option>
                </select>
              </div>
            </div>

            {/* Purpose */}
            <div className="space-y-1 pt-1">
              <label className="block text-xs font-bold text-[var(--mnp-text)]">
                {language === 'hi' ? 'टैंकर की आवश्यकता का कारण *' : 'Reason / Purpose *'}
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className={UI.input}
              >
                <option value="पेयजल संकट / सूखा राहत">
                  {language === 'hi' ? 'पेयजल संकट / सूखा राहत' : 'Drinking Water Shortage'}
                </option>
                <option value="विवाह / पारिवारिक समारोह">
                  {language === 'hi' ? 'विवाह / पारिवारिक समारोह' : 'Wedding / Family Function'}
                </option>
                <option value="धार्मिक अनुष्ठान / भागवत कथा">
                  {language === 'hi' ? 'धार्मिक अनुष्ठान / भागवत कथा' : 'Religious Function / Festival'}
                </option>
                <option value="भवन निर्माण कार्य">
                  {language === 'hi' ? 'भवन निर्माण कार्य' : 'Construction Work'}
                </option>
                <option value="अन्य">
                  {language === 'hi' ? 'अन्य नागरिक आवश्यकता' : 'Other'}
                </option>
              </select>
            </div>

            {/* Additional Remarks */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[var(--mnp-text)]">
                {language === 'hi' ? 'मकान का पता / विशेष दिशा-निर्देश' : 'House / Landmark details'}
              </label>
              <textarea
                rows={2}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder={
                  language === 'hi'
                    ? 'उदा. पीले रंग का मकान, टंकी छत पर है या आंगन में...'
                    : 'e.g. Yellow colored house, underground tank or courtyard...'
                }
                className={UI.textarea}
              />
            </div>
          </div>

          {formError && (
            <p className={UI.errorText} role="alert">
              {formError}
            </p>
          )}

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={!deliveryAddress || isResolvingAddress}
            className={`${UI.btnPrimary} w-full py-3.5 text-sm flex items-center justify-center gap-2`}
          >
            <Truck className="w-4 h-4" />
            <span>
              {language === 'hi'
                ? `पानी टैंकर बुक करें (${capacity.toLocaleString()}L)`
                : `Confirm Water Tanker (${capacity.toLocaleString()}L)`}
            </span>
          </button>
        </form>
      ) : (
        /* My Bookings Tab */
        <div className="space-y-3">
          {myBookings.length === 0 ? (
            <div className={UI.emptyState}>
              <Droplets className="w-10 h-10 text-[var(--mnp-text-muted)] mx-auto mb-2 opacity-50" />
              <p className="text-sm font-bold text-[var(--mnp-text)]">
                {language === 'hi' ? 'कोई सक्रिय टैंकर बुकिंग नहीं है' : 'No Active Tanker Bookings'}
              </p>
              <p className={UI.mutedText}>
                {language === 'hi'
                  ? 'आपने अभी तक पानी टैंकर हेतु कोई अनुरोध दर्ज नहीं किया है।'
                  : 'You have not registered any water tanker requests yet.'}
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('new')}
                className={`${UI.btnPrimary} mt-2 flex items-center gap-1.5`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>{language === 'hi' ? 'नया टैंकर बुक करें' : 'Book Water Tanker'}</span>
              </button>
            </div>
          ) : (
            myBookings.map((b) => (
              <div key={b.id} className={`${UI.card} p-4 space-y-2.5`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[var(--mnp-primary)]">
                      {b.id}
                    </span>
                    <h3 className="text-sm font-bold text-[var(--mnp-text)]">
                      {b.capacityLiters.toLocaleString()} {language === 'hi' ? 'लीटर पानी टैंकर' : 'Litre Tanker'}
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                    {b.status}
                  </span>
                </div>

                <div className="text-xs text-[var(--mnp-text-secondary)] space-y-1">
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[var(--mnp-primary)] shrink-0" />
                    <span>
                      {b.deliveryDate} ({b.deliverySlot})
                    </span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--mnp-primary)] shrink-0 mt-0.5" />
                    <span>{b.deliveryAddress}</span>
                  </p>
                  {b.driverName && (
                    <p className="flex items-center gap-1.5 pt-1 text-[var(--mnp-text)] font-semibold">
                      <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>
                        {b.driverName} ({b.driverPhone}) · {b.vehicleNo}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
