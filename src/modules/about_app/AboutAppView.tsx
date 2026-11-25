import React from 'react';
import {
  Building2,
  ChevronRight,
  ExternalLink,
  FileText,
  HelpCircle,
  Info,
  Mail,
  MapPin,
  Phone,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react';
import { UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';

interface AboutAppViewProps {
  onBack: () => void;
  onOpenAppIssues: () => void;
  onOpenFaq?: () => void;
  onOpenTerms?: () => void;
  onOpenPrivacy?: () => void;
}

export const AboutAppView: React.FC<AboutAppViewProps> = ({
  onBack,
  onOpenAppIssues,
  onOpenFaq,
  onOpenTerms,
  onOpenPrivacy,
}) => {
  const { language, t } = useApp();

  return (
    <div className="p-3.5 space-y-4 max-w-lg mx-auto">
      {/* App Header Banner */}
      <div className={`${UI.card} p-5 text-center space-y-3 shadow-md relative overflow-hidden`}>
        <div className="w-16 h-16 mx-auto rounded-[16px] bg-gradient-to-tr from-[#2196F3] to-[#1565C0] text-white flex items-center justify-center shadow-md">
          <Building2 className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-[var(--mnp-text)]">
            {language === 'hi' ? 'मऊगंज नगर पालिका सेवा' : 'Mauganj Nagar Palika Seva'}
          </h2>
          <p className="text-xs text-[var(--mnp-text-muted)] mt-0.5">
            {language === 'hi'
              ? 'आधिकारिक नागरिक एवं नगर सेवाएं पोर्टल'
              : 'Official Citizen & Municipal Services Portal'}
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] text-xs font-bold border border-[var(--mnp-primary)]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>संस्करण: v2.1.0 (Production Release)</span>
          </div>
        </div>

        <p className="text-xs text-[var(--mnp-text-secondary)] leading-relaxed pt-1">
          {language === 'hi'
            ? 'कार्यालय नगर पालिका परिषद मऊगंज, जिला मऊगंज (मध्य प्रदेश) द्वारा नागरिकों एवं देवतलाब व माँ अष्टभुजा धाम के श्रद्धालुओं की सुविधा हेतु समर्पित डिजिटल ई-गवर्नेंस पहल।'
            : 'A dedicated digital e-governance initiative by the Office of Mauganj Nagar Palika Parishad, District Mauganj, MP, serving citizens and Devtalab & Maa Ashtabhuja pilgrims.'}
        </p>
      </div>

      {/* Direct App Issue Reporting Card */}
      <div className="rounded-[16px] p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md flex items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-yellow-300">
            <Wrench className="w-4 h-4" />
            <span>{language === 'hi' ? 'ऐप में समस्या आ रही है?' : 'Experiencing App Issues?'}</span>
          </div>
          <p className="text-xs text-indigo-100 leading-snug">
            {language === 'hi'
              ? 'बग, क्रैश या लॉगिन दिक्कत की सीधे Admin से शिकायत दर्ज करें'
              : 'Report bugs, crashes or login problems directly to the Admin'}
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenAppIssues}
          className="px-3.5 py-2 rounded-[10px] bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs shrink-0 shadow-sm transition-transform active:scale-95"
        >
          {language === 'hi' ? 'शिकायत करें' : 'Report Issue'}
        </button>
      </div>

      {/* IT Administration & Nodal Cell */}
      <div className={`${UI.card} p-4 space-y-3`}>
        <div className="flex items-center gap-2 pb-2 border-b border-[var(--mnp-border)]">
          <ShieldCheck className="w-4 h-4 text-[var(--mnp-primary)]" />
          <h3 className="text-sm font-bold text-[var(--mnp-text)]">
            {language === 'hi' ? 'IT प्रशासन एवं नोडल सेल' : 'IT Administration & Nodal Cell'}
          </h3>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-[var(--mnp-text-muted)]">प्रशासनिक व्यवस्थापक (Admin):</span>
            <span className="font-bold text-[var(--mnp-text)]">संजय कुमार दुबे (EMP-ADM-01)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--mnp-text-muted)]">विभाग:</span>
            <span className="font-semibold text-[var(--mnp-text)]">
              ई-गवर्नेंस एवं IT शाखा, नगर पालिका मऊगंज
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--mnp-text-muted)]">कार्यालय पता:</span>
            <span className="font-medium text-[var(--mnp-text)] text-right">
              एलआईसी कार्यालय के पास, चाक रोड, मऊगंज (म.प्र.) - 486331
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--mnp-text-muted)]">हेल्पलाइन:</span>
            <span className="font-bold text-[var(--mnp-primary)]">07663-232044 / 1800-000-0101</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--mnp-text-muted)]">आधिकारिक ईमेल:</span>
            <span className="font-mono text-[var(--mnp-primary)]">it.nagarpalika-mauganj@mp.gov.in</span>
          </div>
        </div>
      </div>

      {/* Technical & Civic Specifications */}
      <div className={`${UI.card} p-4 space-y-3`}>
        <div className="flex items-center gap-2 pb-2 border-b border-[var(--mnp-border)]">
          <Server className="w-4 h-4 text-[var(--mnp-primary)]" />
          <h3 className="text-sm font-bold text-[var(--mnp-text)]">
            {language === 'hi' ? 'तकनीकी एवं सुरक्षा विशेषताएं' : 'Technical & Civic Features'}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-[10px] bg-[var(--mnp-surface-muted)] border border-[var(--mnp-border)] space-y-1">
            <div className="font-bold text-[var(--mnp-primary)]">Progressive Web App</div>
            <div className="text-[11px] text-[var(--mnp-text-muted)]">
              ऑफ़लाइन सपोर्ट व मोबाइल होम स्क्रीन इंस्टॉलेशन
            </div>
          </div>
          <div className="p-2.5 rounded-[10px] bg-[var(--mnp-surface-muted)] border border-[var(--mnp-border)] space-y-1">
            <div className="font-bold text-[var(--mnp-primary)]">GPS Geo-Verification</div>
            <div className="text-[11px] text-[var(--mnp-text-muted)]">
              समस्या स्थल की 100% सटीक जीपीएस लोकेशन कैप्चर
            </div>
          </div>
          <div className="p-2.5 rounded-[10px] bg-[var(--mnp-surface-muted)] border border-[var(--mnp-border)] space-y-1">
            <div className="font-bold text-[var(--mnp-primary)]">लोक सेवा गारंटी SLA</div>
            <div className="text-[11px] text-[var(--mnp-text-muted)]">
              विभागीय अधिकारियों के लिए 12 से 72 घंटे की समय-सीमा
            </div>
          </div>
          <div className="p-2.5 rounded-[10px] bg-[var(--mnp-surface-muted)] border border-[var(--mnp-border)] space-y-1">
            <div className="font-bold text-[var(--mnp-primary)]">MP e-Nagarpalika</div>
            <div className="text-[11px] text-[var(--mnp-text-muted)]">
              मध्य प्रदेश शासन के आधिकारिक कर पोर्टल से जुड़ाव
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Links */}
      <div className={`${UI.card} divide-y divide-[var(--mnp-border)] overflow-hidden text-xs`}>
        {onOpenFaq && (
          <button
            type="button"
            onClick={onOpenFaq}
            className="w-full p-3 flex items-center justify-between text-left hover:bg-[var(--mnp-surface-muted)] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4 text-[var(--mnp-primary)]" />
              <span className="font-bold text-[var(--mnp-text)]">{t.faqTitle}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[var(--mnp-text-muted)]" />
          </button>
        )}
        {onOpenTerms && (
          <button
            type="button"
            onClick={onOpenTerms}
            className="w-full p-3 flex items-center justify-between text-left hover:bg-[var(--mnp-surface-muted)] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-[var(--mnp-primary)]" />
              <span className="font-bold text-[var(--mnp-text)]">{t.termsTitle}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[var(--mnp-text-muted)]" />
          </button>
        )}
        {onOpenPrivacy && (
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="w-full p-3 flex items-center justify-between text-left hover:bg-[var(--mnp-surface-muted)] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[var(--mnp-primary)]" />
              <span className="font-bold text-[var(--mnp-text)]">{t.privacyTitle}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[var(--mnp-text-muted)]" />
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onBack}
        className={`${UI.btnOutline} w-full min-h-[44px] text-xs`}
      >
        {language === 'hi' ? 'सेवाएं पृष्ठ पर लौटें' : 'Back to Services'}
      </button>
    </div>
  );
};
