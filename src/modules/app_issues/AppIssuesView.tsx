import React, { useState } from 'react';
import {
  AlertTriangle,
  Bug,
  CheckCircle2,
  Cpu,
  HelpCircle,
  KeyRound,
  MapPin,
  MessageSquare,
  Radio,
  ShieldCheck,
  Smartphone,
  Wrench,
} from 'lucide-react';
import { PhotoPicker } from '../../components/PhotoPicker';
import { ICON_CIRCLE_THEMES, UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { Complaint } from '../../types';

interface AppIssuesViewProps {
  onSuccessViewComplaint: (id: string) => void;
  onCancel: () => void;
}

const ISSUE_TYPES = [
  {
    id: 'bug',
    labelHi: 'बग या तकनीकी खराबी (Bug / Glitch)',
    labelEn: 'Bug or Glitch',
    icon: Bug,
  },
  {
    id: 'crash',
    labelHi: 'ऐप क्रैश या हैंग होना (App Crash / Freeze)',
    labelEn: 'App Crash / Freeze',
    icon: AlertTriangle,
  },
  {
    id: 'login_otp',
    labelHi: 'लॉगिन अथवा OTP समस्या (Login / OTP Issue)',
    labelEn: 'Login or OTP Issue',
    icon: KeyRound,
  },
  {
    id: 'gps_map',
    labelHi: 'GPS अथवा लोकेशन समस्या (GPS / Location Issue)',
    labelEn: 'GPS / Location Issue',
    icon: MapPin,
  },
  {
    id: 'broken_feature',
    labelHi: 'कोई बटन/सुविधा काम नहीं कर रही (Broken Feature)',
    labelEn: 'Broken Button or Feature',
    icon: Wrench,
  },
  {
    id: 'feedback',
    labelHi: 'सुझाव अथवा सामान्य प्रतिक्रिया (Suggestion / Feedback)',
    labelEn: 'Suggestion or Feedback',
    icon: MessageSquare,
  },
];

export const AppIssuesView: React.FC<AppIssuesViewProps> = ({
  onSuccessViewComplaint,
  onCancel,
}) => {
  const { citizen, language, t, createComplaint } = useApp();
  const [issueType, setIssueType] = useState('bug');
  const [description, setDescription] = useState('');
  const [screenshot, setScreenshot] = useState<string | undefined>(undefined);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState<Complaint | null>(null);

  // Auto-detect browser and environment diagnostics
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const platform = typeof navigator !== 'undefined' ? navigator.platform : 'Web';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError(
        language === 'hi'
          ? 'कृपया समस्या का विवरण दर्ज करें।'
          : 'Please provide a description of the issue.'
      );
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      const selectedTypeObj = ISSUE_TYPES.find((x) => x.id === issueType);
      const typeLabel = selectedTypeObj
        ? language === 'hi'
          ? selectedTypeObj.labelHi
          : selectedTypeObj.labelEn
        : issueType;

      const fullDescription = `[प्रकार: ${typeLabel}]\n\n${description.trim()}\n\n---\n[तकनीकी विवरण / Diagnostics]:\nApp Version: v2.1.0\nPlatform: ${platform}\nOnline Status: ${isOnline ? 'Online' : 'Offline'}\nUser Agent: ${userAgent.slice(0, 80)}...`;

      const created = createComplaint({
        category: 'app_issue',
        ward: citizen.ward || 4,
        landmark: 'मैहर सेवा मोबाइल ऐप (IT Admin Cell)',
        lat: 24.2655,
        lng: 80.7585,
        description: fullDescription,
        beforePhoto: screenshot,
      });

      setSubmittedComplaint(created);
    } catch {
      setError(
        language === 'hi'
          ? 'शिकायत दर्ज करने में समस्या आई। पुनः प्रयास करें।'
          : 'Failed to report app issue. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedComplaint) {
    return (
      <div className="p-4 flex flex-col items-center text-center space-y-4 max-w-lg mx-auto">
        <div className={`${UI.card} w-full p-5 space-y-4 flex flex-col items-center shadow-md`}>
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center ${ICON_CIRCLE_THEMES.green}`}
          >
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-[var(--mnp-text)]">
            {language === 'hi'
              ? 'ऐप संबंधित शिकायत सीधे Admin को प्रेषित!'
              : 'App Issue Routed Directly to Admin!'}
          </h2>

          <div className="rounded-[12px] bg-[var(--mnp-surface-muted)] border border-[var(--mnp-border)] w-full p-4 space-y-2 text-left text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--mnp-border)]">
              <span className="text-[var(--mnp-text-muted)] font-medium">शिकायत क्रमांक:</span>
              <span className="font-bold text-sm text-[var(--mnp-primary)] tabular-nums">
                {submittedComplaint.id}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--mnp-text-muted)] font-medium">प्रभारी अधिकारी:</span>
              <span className="font-bold text-[var(--mnp-text)]">
                संजय कुमार दुबे (नगर पालिका IT Admin)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--mnp-text-muted)] font-medium">शाखा:</span>
              <span className="font-semibold text-[var(--mnp-text)]">
                IT एवं ई-गवर्नेंस प्रशासन
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--mnp-text-muted)] font-medium">समाधान समय सीमा:</span>
              <span className="font-bold text-[var(--mnp-success)]">24 घंटे (उच्च प्राथमिकता)</span>
            </div>
          </div>

          <p className="text-xs text-[var(--mnp-text-secondary)] leading-relaxed">
            {language === 'hi'
              ? 'आपकी तकनीकी शिकायत सीधे व्यवस्थापक (Admin) के डैशबोर्ड पर पहुँच गई है। शीघ्र ही इसका निवारण किया जाएगा।'
              : 'Your technical report has been forwarded directly to the Municipal Administrator dashboard for urgent resolution.'}
          </p>

          <div className="w-full space-y-2 pt-2">
            <button
              type="button"
              onClick={() => onSuccessViewComplaint(submittedComplaint.id)}
              className={`${UI.btnPrimary} w-full`}
            >
              {t.viewComplaintBtn}
            </button>
            <button type="button" onClick={onCancel} className={`${UI.btnOutline} w-full`}>
              {language === 'hi' ? 'सेवाएं पृष्ठ पर लौटें' : 'Back to Services'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3.5 space-y-4 max-w-lg mx-auto">
      {/* Official Admin Routing Card */}
      <div className="rounded-[16px] p-4 bg-gradient-to-r from-indigo-600 to-blue-700 text-white shadow-md space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-indigo-200" />
            <h2 className="text-sm font-bold">
              {language === 'hi' ? 'ऐप संबंधित सीधी शिकायत' : 'App Related Direct Complaint'}
            </h2>
          </div>
          <span className="inline-flex items-center gap-1 bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-yellow-300" />
            <span>{language === 'hi' ? 'सीधे Admin को' : 'Direct to Admin'}</span>
          </span>
        </div>
        <p className="text-xs text-indigo-100 leading-relaxed">
          {language === 'hi'
            ? 'मैहर नगर पालिका सेवा ऐप के उपयोग में आ रही तकनीकी दिक्कतों, बग अथवा सुझाव की सीधी शिकायत दर्ज करें। यह सीधे नगर पालिका IT व्यवस्थापक (Admin) को प्रेषित होगी।'
            : 'Report technical bugs, login glitches, crashes or feedback directly to the Municipal IT Administrator for prompt resolution.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Section 1: Issue Type Selection */}
        <div className={`${UI.card} p-4 space-y-2.5`}>
          <label
            htmlFor="app-issue-type"
            className="block text-xs font-bold text-[var(--mnp-text)]"
          >
            {language === 'hi' ? 'समस्या का प्रकार चुनें *' : 'Select Issue Type *'}
          </label>
          <select
            id="app-issue-type"
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            className={`${UI.input} text-sm font-medium`}
          >
            {ISSUE_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {language === 'hi' ? type.labelHi : type.labelEn}
              </option>
            ))}
          </select>
        </div>

        {/* Section 2: Detailed Description */}
        <div className={`${UI.card} p-4 space-y-2`}>
          <label
            htmlFor="app-issue-desc"
            className="block text-xs font-bold text-[var(--mnp-text)]"
          >
            {language === 'hi' ? 'समस्या का पूरा विवरण लिखें *' : 'Problem Description *'}
          </label>
          <p className={UI.mutedText}>
            {language === 'hi'
              ? 'विस्तार से बताएं कि क्या समस्या आई (उदा. किस बटन पर क्लिक किया, क्या त्रुटि संदेश दिखा)'
              : 'Describe what happened, error message, or steps to reproduce'}
          </p>
          <textarea
            id="app-issue-desc"
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setError('');
            }}
            placeholder={
              language === 'hi'
                ? 'उदा. लॉगिन के बाद OTP सत्यापित नहीं हुआ, अथवा कचरा वाहन का मैप नहीं खुल रहा...'
                : 'E.g., Map stopped loading after clicking garbage van, or login button was unresponsive...'
            }
            className={UI.textarea}
            required
          />
        </div>

        {/* Section 3: Screenshot Attachment */}
        <div className={`${UI.card} p-4 space-y-2`}>
          <label className="block text-xs font-bold text-[var(--mnp-text)]">
            {language === 'hi'
              ? 'स्क्रीनशॉट अथवा फोटो संलग्न करें (वैकल्पिक)'
              : 'Attach Screenshot (Optional)'}
          </label>
          <p className={UI.mutedText}>
            {language === 'hi'
              ? 'त्रुटि का स्क्रीनशॉट जोड़ने से व्यवस्थापक को समस्या जल्द सुलझाने में मदद मिलती है'
              : 'Attaching a screenshot helps the IT admin diagnose the problem faster'}
          </p>
          <PhotoPicker value={screenshot} onChange={setScreenshot} mode="app" />
        </div>

        {/* Section 4: Auto-detected Diagnostics info (read-only) */}
        <div className="rounded-[12px] p-3 bg-[var(--mnp-surface-muted)] border border-[var(--mnp-border)] text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-[var(--mnp-text-muted)] font-bold text-[11px]">
            <Cpu className="w-3.5 h-3.5 text-[var(--mnp-primary)]" />
            <span>
              {language === 'hi'
                ? 'स्वतः संलग्न तकनीकी विवरण (Diagnostics):'
                : 'Auto-included System Diagnostics:'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[var(--mnp-text-secondary)] font-mono">
            <div>ऐप संस्करण: v2.1.0 (PWA)</div>
            <div>स्थिति: {isOnline ? 'Online' : 'Offline'}</div>
            <div className="col-span-2 truncate">प्लेटफॉर्म: {platform}</div>
          </div>
        </div>

        {error && (
          <p className={UI.errorText} role="alert">
            {error}
          </p>
        )}

        {/* Submit Actions */}
        <div className="space-y-2 pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${UI.btnPrimary} w-full min-h-[48px] font-bold text-sm flex items-center justify-center gap-2 shadow-md`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>
              {isSubmitting
                ? 'भेजा जा रहा है...'
                : language === 'hi'
                ? 'शिकायत Admin को भेजें'
                : 'Submit Complaint to Admin'}
            </span>
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
