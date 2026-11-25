import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  HardHat,
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
  Wrench,
} from 'lucide-react';
import { WARDS } from '../../constants';
import { ICON_CIRCLE_THEMES, UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { JcbBooking } from '../../types';
import { formatDateTime } from '../../utils/format';
import { reverseGeocode } from '../../utils/geocode';

interface JcbBookingViewProps {
  onBack?: () => void;
}

export const JcbBookingView: React.FC<JcbBookingViewProps> = ({ onBack }) => {
  const { citizen, jcbBookings, language, t, bookJcb, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'new' | 'my_bookings'>('new');
  const [machineryType, setMachineryType] = useState<
    'backhoe_loader' | 'mini_excavator' | 'tipper_dumper'
  >('backhoe_loader');
  const [shift, setShift] = useState<'morning' | 'afternoon' | 'fullday'>('morning');
  const [bookingDate, setBookingDate] = useState<string>(
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [workType, setWorkType] = useState<string>(
    language === 'hi' ? 'मलबा व कचरा निष्कासन' : 'Debris / Malba Clearance'
  );
  const [durationHours, setDurationHours] = useState<number>(2);
  const [remarks, setRemarks] = useState('');
  const [ward, setWard] = useState<number>(citizen.ward || 4);

  // GPS State
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);
  const [worksiteAddress, setWorksiteAddress] = useState<string>('');
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'loading' | 'live' | 'error'>('idle');
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [isResolvingAddress, setIsResolvingAddress] = useState(false);
  const [accuracy, setAccuracy] = useState<number | undefined>(undefined);

  const [formError, setFormError] = useState('');
  const [submittedBooking, setSubmittedBooking] = useState<JcbBooking | null>(null);

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
            setWorksiteAddress(geo.fullAddress);
          } catch {
            const fallbackWard = WARDS.find((w) => w.id === (citizen.ward || 4)) || WARDS[0];
            setWard(fallbackWard.id);
            setWorksiteAddress(`GPS: ${detectedLat}° N, ${detectedLng}° E`);
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
                ? 'लोकेशन अनुमति अस्वीकृत है। कार्यस्थल की सटीक लोकेशन हेतु कृपया अनुमति दें।'
                : 'Location permission denied. Please allow location access for machinery dispatch.';
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

  const myBookings = jcbBookings.filter(
    (b) => b.citizenMobile === citizen.mobile
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!worksiteAddress || !lat || !lng) {
      setFormError(
        language === 'hi'
          ? 'जेसीबी मशीनरी भेजने हेतु कार्यस्थल की GPS लोकेशन आवश्यक है।'
          : 'Worksite GPS location is required to book municipal machinery.'
      );
      return;
    }

    if (!bookingDate) {
      setFormError(
        language === 'hi' ? 'कृपया कार्य की तारीख चुनें।' : 'Please select a date for the work.'
      );
      return;
    }

    const booking = bookJcb({
      citizenMobile: citizen.mobile,
      citizenName: citizen.name,
      ward,
      worksiteAddress,
      lat,
      lng,
      bookingDate,
      shift,
      machineryType,
      workType,
      durationHours,
      remarks: remarks.trim() || undefined,
    });

    setSubmittedBooking(booking);
  };

  const machineryNameMap = {
    backhoe_loader: language === 'hi' ? 'जेसीबी (JCB 3DX बैको लोडर)' : 'JCB 3DX Backhoe Loader',
    mini_excavator: language === 'hi' ? 'मिनी एक्सकेवेटर (संकीर्ण गली हेतु)' : 'Mini Excavator (Narrow Lane)',
    tipper_dumper: language === 'hi' ? 'डंपर / टिपर (मलबा परिवहन)' : 'Tipper / Dumper Truck',
  };

  if (submittedBooking) {
    return (
      <div className="p-4 space-y-4">
        <div className={`${UI.card} p-5 text-center space-y-3.5 border-amber-500/30`}>
          <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-bold">
              {language === 'hi' ? '✓ जेसीबी सेवा अनुरोध स्वीकृत' : '✓ Machinery Request Approved'}
            </span>
            <h2 className="text-lg font-bold text-[var(--mnp-text)]">
              {language === 'hi' ? 'अनुरोध सफलतापूर्वक दर्ज हुआ' : 'Request Placed Successfully'}
            </h2>
            <p className="text-xs text-[var(--mnp-text-muted)]">
              {language === 'hi' ? 'बुकिंग संदर्भ संख्या: ' : 'Booking Reference ID: '}
              <strong className="text-[var(--mnp-primary)] font-mono text-sm">
                {submittedBooking.id}
              </strong>
            </p>
          </div>

          <div className="rounded-[12px] bg-[var(--mnp-surface-muted)] p-3 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[var(--mnp-text-muted)]">
                {language === 'hi' ? 'मशीनरी:' : 'Machinery:'}
              </span>
              <span className="font-bold text-[var(--mnp-text)]">
                {machineryNameMap[submittedBooking.machineryType]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--mnp-text-muted)]">
                {language === 'hi' ? 'कार्य का प्रकार:' : 'Work Nature:'}
              </span>
              <span className="font-bold text-[var(--mnp-text)]">{submittedBooking.workType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--mnp-text-muted)]">
                {language === 'hi' ? 'तारीख व शिफ्ट:' : 'Date & Shift:'}
              </span>
              <span className="font-bold text-[var(--mnp-text)]">
                {submittedBooking.bookingDate} ({submittedBooking.shift}) · {submittedBooking.durationHours}{' '}
                {language === 'hi' ? 'घंटे' : 'hrs'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--mnp-text-muted)]">
                {language === 'hi' ? 'ऑपरेटर:' : 'Operator:'}
              </span>
              <span className="font-bold text-amber-700 dark:text-amber-400">
                {submittedBooking.operatorName || 'राजेंद्र सिंह (JCB ऑपरेटर)'} ({submittedBooking.operatorPhone || '9826033445'})
              </span>
            </div>
            <div className="pt-1 border-t border-[var(--mnp-border)]">
              <span className="text-[var(--mnp-text-muted)] block text-[11px]">
                {language === 'hi' ? 'कार्यस्थल (GPS):' : 'Worksite Location (GPS):'}
              </span>
              <span className="font-semibold text-[var(--mnp-text)] text-[11px]">
                {submittedBooking.worksiteAddress}
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
              {language === 'hi' ? 'नयी जेसीबी बुक करें' : 'Book Another Machine'}
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
          <span>{language === 'hi' ? 'नया मशीनरी अनुरोध' : 'New Request'}</span>
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
          <div className="rounded-[14px] bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-md space-y-1">
            <div className="flex items-center gap-2">
              <HardHat className="w-5 h-5 text-amber-200" />
              <h2 className="text-base font-bold">
                {language === 'hi'
                  ? 'नगर पालिका जेसीबी एवं भारी मशीनरी सेवा'
                  : 'Municipal JCB & Machinery Service'}
              </h2>
            </div>
            <p className="text-xs text-amber-100">
              {language === 'hi'
                ? 'मलबा निष्कासन, नाली सफाई, समतलीकरण व खुदाई हेतु नगरपालिका जेसीबी मंगाएं'
                : 'Book municipal JCB earthmovers for debris clearing, drain excavation & land leveling'}
            </p>
          </div>

          {/* Section 1: Worksite GPS Location (Mandatory) */}
          <div className={`${UI.card} p-4 space-y-3`}>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--mnp-text)]">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>
                  {language === 'hi' ? 'कार्यस्थल लोकेशन (GPS द्वारा स्वतः)' : 'Worksite GPS Location'} *
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
              <div className="p-3 rounded-[10px] bg-amber-50 dark:bg-amber-950/40 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <RotateCw className="w-4 h-4 animate-spin shrink-0" />
                <span>
                  {language === 'hi'
                    ? 'कार्यस्थल की लाइव GPS लोकेशन प्राप्त की जा रही है...'
                    : 'Fetching worksite GPS location & address...'}
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

            {worksiteAddress && (
              <div className="rounded-[10px] border border-amber-300 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/30 p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'सत्यापित कार्यस्थल GPS' : 'Verified Worksite Location'}</span>
                  </span>
                  {accuracy && (
                    <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono">
                      ±{accuracy}m सटीकता
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold text-[var(--mnp-text)] leading-relaxed">
                  {worksiteAddress}
                </p>

                {lat && lng && (
                  <p className="text-[11px] text-[var(--mnp-text-muted)] font-mono">
                    निर्देशांक: {lat}° N, {lng}° E · वार्ड {ward}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Section 2: Machinery Selection */}
          <div className={`${UI.card} p-4 space-y-2.5`}>
            <label className="block text-xs font-bold text-[var(--mnp-text)]">
              {language === 'hi' ? 'आवश्यक मशीनरी का प्रकार चुनें *' : 'Select Machinery Type *'}
            </label>

            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  {
                    type: 'backhoe_loader' as const,
                    titleHi: 'जेसीबी 3DX',
                    titleEn: 'JCB 3DX',
                    subHi: 'मानक बैको लोडर',
                    subEn: 'Standard',
                  },
                  {
                    type: 'mini_excavator' as const,
                    titleHi: 'मिनी एक्सकेवेटर',
                    titleEn: 'Mini Excavator',
                    subHi: 'संकीर्ण गलियों हेतु',
                    subEn: 'Narrow Lanes',
                  },
                  {
                    type: 'tipper_dumper' as const,
                    titleHi: 'डंपर / टिपर',
                    titleEn: 'Tipper Truck',
                    subHi: 'मलबा परिवहन',
                    subEn: 'Haulage',
                  },
                ] as const
              ).map((item) => {
                const isSelected = machineryType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setMachineryType(item.type)}
                    className={`min-h-[82px] p-2 rounded-[12px] border text-center flex flex-col items-center justify-center gap-1 transition-all ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 ring-2 ring-amber-600 text-amber-900 dark:text-amber-200 font-bold'
                        : 'border-[var(--mnp-border)] bg-[var(--mnp-surface)] text-[var(--mnp-text)] hover:border-amber-500'
                    }`}
                  >
                    <span className="text-xs font-extrabold">{item.titleHi}</span>
                    <span className="text-[10px] text-[var(--mnp-text-muted)] leading-tight">
                      {language === 'hi' ? item.subHi : item.subEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Date, Shift & Nature of Work */}
          <div className={`${UI.card} p-4 space-y-3`}>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[var(--mnp-text)]">
                  {language === 'hi' ? 'कार्य की तारीख *' : 'Work Date *'}
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className={UI.input}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[var(--mnp-text)]">
                  {language === 'hi' ? 'शिफ्ट चुनें *' : 'Work Shift *'}
                </label>
                <select
                  value={shift}
                  onChange={(e) => setShift(e.target.value as any)}
                  className={UI.input}
                >
                  <option value="morning">
                    {language === 'hi' ? 'सुबह (08:00 – 12:00)' : 'Morning (8-12 PM)'}
                  </option>
                  <option value="afternoon">
                    {language === 'hi' ? 'दोपहर (01:00 – 05:00)' : 'Afternoon (1-5 PM)'}
                  </option>
                  <option value="fullday">
                    {language === 'hi' ? 'पूरा दिन (08:00 – 05:00)' : 'Full Day'}
                  </option>
                </select>
              </div>
            </div>

            {/* Nature of Work & Duration */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[var(--mnp-text)]">
                  {language === 'hi' ? 'कार्य का प्रकार *' : 'Nature of Work *'}
                </label>
                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  className={UI.input}
                >
                  <option value="मलबा व कचरा निष्कासन">
                    {language === 'hi' ? 'मलबा व कचरा निष्कासन' : 'Debris Removal'}
                  </option>
                  <option value="भूमि / प्लाट समतलीकरण">
                    {language === 'hi' ? 'भूमि / प्लाट समतलीकरण' : 'Land Leveling'}
                  </option>
                  <option value="नाली / गड्ढा खुदाई कार्य">
                    {language === 'hi' ? 'नाली / गड्ढा खुदाई कार्य' : 'Drain / Trench Digging'}
                  </option>
                  <option value="आपदा / सुरक्षा ध्वस्तीकरण कार्य">
                    {language === 'hi' ? 'आपदा / सुरक्षा ध्वस्तीकरण' : 'Emergency Demolition'}
                  </option>
                  <option value="अन्य कार्य">
                    {language === 'hi' ? 'अन्य नागरिक निर्माण कार्य' : 'Other Work'}
                  </option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[var(--mnp-text)]">
                  {language === 'hi' ? 'अनुमानित अवधि *' : 'Estimated Duration *'}
                </label>
                <select
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  className={UI.input}
                >
                  <option value={1}>{language === 'hi' ? '1 घंटा' : '1 Hour'}</option>
                  <option value={2}>{language === 'hi' ? '2 घंटे' : '2 Hours'}</option>
                  <option value={4}>{language === 'hi' ? '4 घंटे (आधा दिन)' : '4 Hours (Half Day)'}</option>
                  <option value={8}>{language === 'hi' ? '8 घंटे (पूरा दिन)' : '8 Hours (Full Day)'}</option>
                </select>
              </div>
            </div>

            {/* Remarks */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[var(--mnp-text)]">
                {language === 'hi' ? 'कार्यस्थल विवरण व निर्देश' : 'Worksite instructions'}
              </label>
              <textarea
                rows={2}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder={
                  language === 'hi'
                    ? 'उदा. सड़क किनारे पड़ा मलबा हटाना है, चौड़ी गली है...'
                    : 'e.g. Clearance of debris dumped near boundary wall...'
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!worksiteAddress || isResolvingAddress}
            className={`${UI.btnPrimary} w-full py-3.5 text-sm bg-amber-600 hover:bg-amber-700 flex items-center justify-center gap-2`}
          >
            <HardHat className="w-4 h-4" />
            <span>
              {language === 'hi'
                ? `जेसीबी सेवा अनुरोध दर्ज करें (${durationHours} घंटे)`
                : `Confirm JCB Machinery Request (${durationHours} hrs)`}
            </span>
          </button>
        </form>
      ) : (
        /* My JCB Bookings Tab */
        <div className="space-y-3">
          {myBookings.length === 0 ? (
            <div className={UI.emptyState}>
              <HardHat className="w-10 h-10 text-[var(--mnp-text-muted)] mx-auto mb-2 opacity-50" />
              <p className="text-sm font-bold text-[var(--mnp-text)]">
                {language === 'hi' ? 'कोई जेसीबी बुकिंग नहीं है' : 'No Active Machinery Bookings'}
              </p>
              <p className={UI.mutedText}>
                {language === 'hi'
                  ? 'आपने अभी तक जेसीबी अथवा मशीनरी हेतु कोई अनुरोध दर्ज नहीं किया है।'
                  : 'You have not registered any machinery requests yet.'}
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('new')}
                className={`${UI.btnPrimary} mt-2 flex items-center gap-1.5`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>{language === 'hi' ? 'नयी जेसीबी बुक करें' : 'Book JCB Machinery'}</span>
              </button>
            </div>
          ) : (
            myBookings.map((b) => (
              <div key={b.id} className={`${UI.card} p-4 space-y-2.5`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400">
                      {b.id}
                    </span>
                    <h3 className="text-sm font-bold text-[var(--mnp-text)]">
                      {machineryNameMap[b.machineryType]}
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-bold">
                    {b.status}
                  </span>
                </div>

                <div className="text-xs text-[var(--mnp-text-secondary)] space-y-1">
                  <p className="font-semibold text-[var(--mnp-text)]">
                    {b.workType} · {b.durationHours} {language === 'hi' ? 'घंटे' : 'hrs'}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>
                      {b.bookingDate} ({b.shift})
                    </span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{b.worksiteAddress}</span>
                  </p>
                  {b.operatorName && (
                    <p className="flex items-center gap-1.5 pt-1 text-[var(--mnp-text)] font-semibold">
                      <User className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>
                        {b.operatorName} ({b.operatorPhone})
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
