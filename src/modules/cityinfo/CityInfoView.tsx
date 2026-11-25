import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  FileCheck,
  FileText,
  Phone,
  Search,
  Users,
} from 'lucide-react';
import { SEED_CERTIFICATES } from '../../data/seedData';
import { UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { CertificateApplication } from '../../types';
import { formatDate } from '../../utils/format';

export const CityInfoView: React.FC = () => {
  const { notices, contacts, wardDirectory, language, t, showToast } = useApp();
  const [tab, setTab] = useState<'contacts' | 'wards' | 'notices' | 'certs'>('contacts');
  const [appId, setAppId] = useState('MGJ-BC-2026-101');
  const [certResult, setCertResult] = useState<CertificateApplication | null>(null);
  const [certError, setCertError] = useState('');

  const handleCheckStatus = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = appId.trim().toUpperCase();
    if (!cleaned) {
      setCertError(t.errAppIdRequired);
      setCertResult(null);
      return;
    }
    const found = SEED_CERTIFICATES.find(
      (c) => c.applicationId.toUpperCase() === cleaned
    );
    if (!found) {
      setCertError(t.errAppIdNotFound);
      setCertResult(null);
      return;
    }
    setCertError('');
    setCertResult(found);
  };

  const tabs: {
    id: 'contacts' | 'wards' | 'notices' | 'certs';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
      { id: 'contacts', label: t.tabContacts, icon: Building2 },
      { id: 'wards', label: t.tabWards, icon: Users },
      { id: 'notices', label: t.tabNotices, icon: FileText },
      { id: 'certs', label: t.tabCertificates, icon: FileCheck },
    ];

  return (
    <div className="p-3.5 space-y-3.5">
      {/* Choice Chips Sub-tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {tabs.map((item) => {
          const Icon = item.icon;
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`${active ? UI.chipActive : UI.chipInactive} inline-flex items-center gap-1.5`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Department Contacts */}
      {tab === 'contacts' && (
        <div className="space-y-2.5">
          {contacts.map((c) => (
            <div key={c.id} className={`${UI.card} p-3.5 space-y-2.5`}>
              <div>
                <h3 className="text-sm font-bold text-[var(--mnp-text)] leading-snug">
                  {language === 'hi' ? c.departmentHi : c.departmentEn}
                </h3>
                <p className={`${UI.secondaryText} mt-0.5`}>
                  {language === 'hi' ? c.officerNameHi : c.officerNameEn} ·{' '}
                  {language === 'hi' ? c.designationHi : c.designationEn}
                </p>
                <p className="text-[11px] text-[var(--mnp-text-muted)] mt-0.5">
                  {language === 'hi' ? c.officeHoursHi : c.officeHoursEn}
                </p>
              </div>
              <a
                href={`tel:${c.phone}`}
                onClick={() =>
                  showToast(
                    language === 'hi' ? c.departmentHi : c.departmentEn,
                    `${t.simulatedCallNotice} ${c.phone}`,
                    'Info'
                  )
                }
                className="min-h-[44px] px-3.5 rounded-[10px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-primary-soft)] text-xs font-bold text-[var(--mnp-primary)] inline-flex items-center gap-1.5 tabular-nums"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{c.phone}</span>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Ward-wise Councillors & Officers */}
      {tab === 'wards' && (
        <div className="space-y-2.5">
          {wardDirectory.map((w) => (
            <div key={w.ward} className={`${UI.card} p-3.5 space-y-1.5 text-xs`}>
              <div className="text-sm font-bold text-[var(--mnp-primary)]">
                {t.wardLabel} {w.ward} — {language === 'hi' ? w.areaHi : w.areaEn}
              </div>
              <div className="flex justify-between gap-2 pt-1">
                <span className="text-[var(--mnp-text-muted)]">{t.councillorLabel}:</span>
                <span className="font-bold text-[var(--mnp-text)] text-right">
                  {language === 'hi' ? w.councillorHi : w.councillorEn}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[var(--mnp-text-muted)]">{t.wardOfficerLabel}:</span>
                <span className="font-bold text-[var(--mnp-text)] text-right">
                  {language === 'hi' ? w.wardOfficerHi : w.wardOfficerEn}
                </span>
              </div>
              <div className="pt-1.5">
                <a
                  href={`tel:${w.phone}`}
                  onClick={() =>
                    showToast(
                      `${t.wardLabel} ${w.ward}`,
                      `${t.simulatedCallNotice} ${w.phone}`,
                      'Info'
                    )
                  }
                  className="text-xs font-bold text-[var(--mnp-primary)] inline-flex items-center gap-1 tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{w.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Notices & Tenders */}
      {tab === 'notices' && (
        <div className="space-y-2.5">
          {notices.map((n) => (
            <article key={n.id} className={`${UI.card} p-3.5 space-y-1.5`}>
              <div className="flex items-center justify-between gap-2 text-[11px] text-[var(--mnp-text-muted)] tabular-nums">
                <span className="font-bold text-[var(--mnp-primary)]">{n.refNo}</span>
                <span>{formatDate(n.date, language)}</span>
              </div>
              <h3 className="text-sm font-bold text-[var(--mnp-text)] leading-snug">
                {language === 'hi' ? n.titleHi : n.titleEn}
              </h3>
              <p className="text-xs text-[var(--mnp-text-secondary)] leading-relaxed">
                {language === 'hi' ? n.bodyHi : n.bodyEn}
              </p>
            </article>
          ))}
        </div>
      )}

      {/* Tab 4: Certificates & Building Permission */}
      {tab === 'certs' && (
        <div className="space-y-3.5">
          <div className={`${UI.card} p-3.5 space-y-2 text-xs leading-relaxed`}>
            <h3 className="text-sm font-bold text-[var(--mnp-text)]">{t.certInfoTitle}</h3>
            <p className="text-[var(--mnp-text-secondary)]">{t.certBirthDeathInfo}</p>
            <p className="text-[var(--mnp-text-secondary)]">{t.certBuildingInfo}</p>
          </div>

          <form onSubmit={handleCheckStatus} className={`${UI.card} p-4 space-y-3`}>
            <label
              htmlFor="cert-app-id"
              className="block text-sm font-bold text-[var(--mnp-text)]"
            >
              {t.checkStatusTitle}
            </label>
            <div className="flex gap-2">
              <input
                id="cert-app-id"
                type="text"
                value={appId}
                onChange={(e) => {
                  setAppId(e.target.value);
                  setCertError('');
                }}
                placeholder={t.appIdPlaceholder}
                className={`${UI.input} flex-1 uppercase`}
              />
              <button
                type="submit"
                className={`${UI.btnPrimary} text-xs flex items-center gap-1.5 whitespace-nowrap shrink-0`}
              >
                <Search className="w-4 h-4" />
                <span>{t.checkStatusBtn}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {SEED_CERTIFICATES.map((sc) => (
                <button
                  key={sc.applicationId}
                  type="button"
                  onClick={() => {
                    setAppId(sc.applicationId);
                    setCertResult(sc);
                    setCertError('');
                  }}
                  className="px-3 py-1 rounded-full border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface-muted)] text-[11px] font-bold text-[var(--mnp-primary)] tabular-nums"
                >
                  {sc.applicationId}
                </button>
              ))}
            </div>

            {certError && (
              <p className={UI.errorText} role="alert">
                {certError}
              </p>
            )}
          </form>

          {certResult && (
            <div className="rounded-[12px] border border-[#A7DFBA] dark:border-[#1E5C38] bg-[var(--mnp-success-bg)] p-4 space-y-2 text-xs shadow-[var(--mnp-shadow-card)]">
              <div className="flex items-center gap-2 text-[var(--mnp-success)] font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{language === 'hi' ? certResult.statusHi : certResult.statusEn}</span>
              </div>
              <div className="space-y-1 text-[var(--mnp-text-secondary)]">
                <p>
                  <strong className="text-[var(--mnp-text)]">ID:</strong>{' '}
                  <span className="tabular-nums">{certResult.applicationId}</span>
                </p>
                <p>
                  {language === 'hi' ? certResult.applicantHi : certResult.applicantEn} ·{' '}
                  {t.wardLabel} {certResult.ward}
                </p>
                <p>{language === 'hi' ? certResult.remarksHi : certResult.remarksEn}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
