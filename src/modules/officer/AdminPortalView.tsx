import React, { useState } from 'react';
import {
  Building2,
  Check,
  ClipboardList,
  Edit3,
  Eye,
  Megaphone,
  Plus,
  Radio,
  Trash2,
  Truck,
  UserPlus,
  Users,
  Wrench,
} from 'lucide-react';
import { CATEGORIES } from '../../constants';
import { StatusBadge } from '../../components/StatusBadge';
import { UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { ComplaintCategoryId, Notice, OfficerRole } from '../../types';
import { formatDate } from '../../utils/format';
import { OfficerComplaintDetail } from './OfficerComplaintDetail';

type AdminTab = 'employees' | 'notices' | 'live_feeds' | 'city_info' | 'requests';

export const AdminPortalView: React.FC = () => {
  const {
    language,
    t,
    employees,
    loggedInEmployee,
    notices,
    templeFeed,
    garbageRoutes,
    contacts,
    wardDirectory,
    helplines,
    complaints,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    addNotice,
    deleteNotice,
    updateTempleFeed,
    updateGarbageRoute,
    addContact,
    updateContact,
    deleteContact,
    updateWardDirectoryEntry,
    updateHelpline,
  } = useApp();

  const [tab, setTab] = useState<AdminTab>('employees');
  const [viewingComplaintId, setViewingComplaintId] = useState<string | null>(null);
  const [requestFilter, setRequestFilter] = useState<'all' | 'app_issues' | 'municipal'>('all');

  // --- Employees Form State ---
  const [showAddEmp, setShowAddEmp] = useState(false);
  const [empName, setEmpName] = useState('');
  const [empCode, setEmpCode] = useState('');
  const [empMobile, setEmpMobile] = useState('');
  const [empPin, setEmpPin] = useState('1234');
  const [empRole, setEmpRole] = useState<OfficerRole>('field_staff');
  const [empDept, setEmpDept] = useState<ComplaintCategoryId | 'all'>('sanitation');
  const [empError, setEmpError] = useState('');

  // --- Notice Form State ---
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [noticeType, setNoticeType] = useState<Notice['type']>('notice');
  const [noticeRef, setNoticeRef] = useState('');
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeBody, setNoticeBody] = useState('');
  const [broadcastPush, setBroadcastPush] = useState(true);
  const [noticeError, setNoticeError] = useState('');

  // --- Live Feeds Local Drafts ---
  const [ropewayText, setRopewayText] = useState(
    language === 'hi' ? templeFeed.ropewayStatusHi : templeFeed.ropewayStatusEn
  );
  const [toiletsText, setToiletsText] = useState(
    language === 'hi' ? templeFeed.toiletsWaterNoteHi : templeFeed.toiletsWaterNoteEn
  );

  // --- City Info Sub-tab ---
  const [infoSubTab, setInfoSubTab] = useState<'contacts' | 'wards' | 'helplines'>('contacts');
  const [showAddContact, setShowAddContact] = useState(false);
  const [ctDept, setCtDept] = useState('');
  const [ctOfficer, setCtOfficer] = useState('');
  const [ctDesig, setCtDesig] = useState('');
  const [ctPhone, setCtPhone] = useState('');
  const [editingWard, setEditingWard] = useState<number | null>(null);
  const [wardCouncillor, setWardCouncillor] = useState('');
  const [wardOfficer, setWardOfficer] = useState('');
  const [wardPhone, setWardPhone] = useState('');
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [editCtOfficer, setEditCtOfficer] = useState('');
  const [editCtPhone, setEditCtPhone] = useState('');
  const [editingHelplineId, setEditingHelplineId] = useState<string | null>(null);
  const [editHlNumber, setEditHlNumber] = useState('');

  if (viewingComplaintId) {
    return (
      <OfficerComplaintDetail
        complaintId={viewingComplaintId}
        onBack={() => setViewingComplaintId(null)}
        canAssign={true}
      />
    );
  }

  const roleLabels: Record<OfficerRole, string> = {
    field_staff: t.roleFieldStaff,
    dept_officer: t.roleDeptOfficer,
    cmo: language === 'hi' ? 'सीएमओ (CMO)' : 'CMO',
    mayor: t.roleMayor,
    admin: t.roleAdmin,
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedMobile = empMobile.replace(/\D/g, '');
    const cleanCode = empCode.trim().toUpperCase();
    if (empName.trim().length < 2 || cleanCode.length < 3 || cleanedMobile.length !== 10 || empPin.length !== 4) {
      setEmpError(
        language === 'hi'
          ? 'कृपया नाम, कर्मचारी आईडी, 10 अंकों का मोबाइल और 4 अंकों का पिन भरें।'
          : 'Please enter name, employee code, 10-digit mobile, and 4-digit PIN.'
      );
      return;
    }
    if (employees.some((x) => x.empCode.toUpperCase() === cleanCode)) {
      setEmpError(
        language === 'hi' ? 'यह कर्मचारी आईडी पहले से मौजूद है।' : 'Employee code already exists.'
      );
      return;
    }
    const finalDept: ComplaintCategoryId | 'all' =
      empRole === 'dept_officer' || empRole === 'field_staff'
        ? empDept === 'all'
          ? 'sanitation'
          : empDept
        : 'all';

    addEmployee({
      empCode: cleanCode,
      nameHi: empName.trim(),
      nameEn: empName.trim(),
      mobile: cleanedMobile,
      pin: empPin,
      role: empRole,
      department: finalDept,
      wards: [1, 2, 3, 4, 5],
      active: true,
    });
    setEmpName('');
    setEmpCode('');
    setEmpMobile('');
    setEmpPin('1234');
    setEmpError('');
    setShowAddEmp(false);
  };

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (noticeTitle.trim().length < 4 || noticeBody.trim().length < 6) {
      setNoticeError(
        language === 'hi'
          ? 'कृपया सूचना का शीर्षक और विवरण दर्ज करें।'
          : 'Please enter notice title and body.'
      );
      return;
    }
    addNotice(
      {
        type: noticeType,
        refNo:
          noticeRef.trim() ||
          `MNP/2026/${String(Math.floor(100 + Math.random() * 900))}`,
        titleHi: noticeTitle.trim(),
        titleEn: noticeTitle.trim(),
        bodyHi: noticeBody.trim(),
        bodyEn: noticeBody.trim(),
        date: new Date().toISOString().slice(0, 10),
      },
      broadcastPush
    );
    setNoticeTitle('');
    setNoticeBody('');
    setNoticeRef('');
    setNoticeError('');
    setShowAddNotice(false);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ctDept.trim() || !ctOfficer.trim() || !ctPhone.trim()) return;
    addContact({
      departmentHi: ctDept.trim(),
      departmentEn: ctDept.trim(),
      officerNameHi: ctOfficer.trim(),
      officerNameEn: ctOfficer.trim(),
      designationHi: ctDesig.trim() || (language === 'hi' ? 'अधिकारी' : 'Officer'),
      designationEn: ctDesig.trim() || 'Officer',
      phone: ctPhone.trim(),
      officeHoursHi: 'सोम–शनि, प्रातः 10:00 – सायं 5:30',
      officeHoursEn: 'Mon–Sat, 10:00 AM – 5:30 PM',
    });
    setCtDept('');
    setCtOfficer('');
    setCtDesig('');
    setCtPhone('');
    setShowAddContact(false);
  };

  const tabs: {
    id: AdminTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
      { id: 'employees', label: t.adminTabEmployees, icon: Users },
      { id: 'notices', label: t.adminTabNotices, icon: Megaphone },
      { id: 'live_feeds', label: t.adminTabLiveFeeds, icon: Radio },
      { id: 'city_info', label: t.adminTabCityInfo, icon: Building2 },
      { id: 'requests', label: t.adminTabRequests, icon: ClipboardList },
    ];

  return (
    <div className="p-3.5 space-y-3.5">
      {/* Horizontal Pill Navigation */}
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

      {/* TAB 1: EMPLOYEES & ROLE MANAGEMENT */}
      {tab === 'employees' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className={UI.sectionTitle}>
              {t.adminTabEmployees} ({employees.length})
            </h2>
            <button
              type="button"
              onClick={() => setShowAddEmp((v) => !v)}
              className="min-h-[40px] px-3 rounded-[10px] bg-[var(--mnp-accent)] text-white text-xs font-bold inline-flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>{t.addEmployeeBtn}</span>
            </button>
          </div>

          {showAddEmp && (
            <form onSubmit={handleAddEmployee} className={`${UI.card} p-3.5 space-y-2.5`}>
              <h3 className="text-xs font-bold text-[var(--mnp-primary)]">{t.addEmployeeBtn}</h3>
              <input
                type="text"
                value={empName}
                onChange={(e) => setEmpName(e.target.value)}
                placeholder={language === 'hi' ? 'कर्मचारी का पूरा नाम' : 'Full name'}
                className={UI.input}
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={empCode}
                  onChange={(e) => setEmpCode(e.target.value)}
                  placeholder="EMP-FS-06"
                  className={`${UI.input} uppercase`}
                />
                <input
                  type="tel"
                  maxLength={10}
                  value={empMobile}
                  onChange={(e) => setEmpMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder={language === 'hi' ? '10 अंक मोबाइल' : '10-digit mobile'}
                  className={`${UI.input} tabular-nums`}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={empRole}
                  onChange={(e) => {
                    const nextRole = e.target.value as OfficerRole;
                    setEmpRole(nextRole);
                    if (nextRole === 'dept_officer' || nextRole === 'field_staff') {
                      if (empDept === 'all') setEmpDept('sanitation');
                    } else {
                      setEmpDept('all');
                    }
                  }}
                  className={UI.input}
                >
                  <option value="field_staff">{roleLabels.field_staff}</option>
                  <option value="dept_officer">{roleLabels.dept_officer}</option>
                  <option value="cmo">{roleLabels.cmo}</option>
                  <option value="mayor">{roleLabels.mayor}</option>
                  <option value="admin">{roleLabels.admin}</option>
                </select>
                <input
                  type="text"
                  maxLength={4}
                  value={empPin}
                  onChange={(e) => setEmpPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="PIN (1234)"
                  className={`${UI.input} tabular-nums`}
                />
              </div>
              <select
                value={empDept}
                disabled={empRole === 'cmo' || empRole === 'mayor' || empRole === 'admin'}
                onChange={(e) => setEmpDept(e.target.value as ComplaintCategoryId | 'all')}
                className={`${UI.input} disabled:opacity-60`}
              >
                {(empRole === 'cmo' || empRole === 'mayor' || empRole === 'admin') && (
                  <option value="all">
                    {language === 'hi' ? 'सभी विभाग (प्रशासन)' : 'All departments (Leadership)'}
                  </option>
                )}
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {language === 'hi' ? c.deptHi : c.deptEn}
                  </option>
                ))}
              </select>
              {empError && <p className={UI.errorText}>{empError}</p>}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddEmp(false)}
                  className={`${UI.btnOutline} text-xs`}
                >
                  {t.cancel}
                </button>
                <button type="submit" className={`${UI.btnSuccess} flex-1 text-xs`}>
                  {t.saveChangesBtn}
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2.5">
            {employees.map((emp) => {
              const isSelf = loggedInEmployee?.id === emp.id;
              const empDeptCat = CATEGORIES.find((c) => c.id === emp.department);
              const needsSpecificDept = emp.role === 'dept_officer' || emp.role === 'field_staff';
              return (
                <div key={emp.id} className={`${UI.card} p-3.5 space-y-2.5 text-xs`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 space-y-0.5">
                      <div className="text-sm font-bold text-[var(--mnp-text)] truncate">
                        {language === 'hi' ? emp.nameHi : emp.nameEn}
                      </div>
                      <div className="text-[11px] text-[var(--mnp-text-muted)] tabular-nums">
                        {emp.empCode} · +91 {emp.mobile} · PIN: {emp.pin}
                      </div>
                      <div className="inline-flex items-center gap-1 text-[10px] font-bold text-[var(--mnp-primary)]">
                        <Building2 className="w-3 h-3 shrink-0" />
                        <span>
                          {empDeptCat
                            ? language === 'hi'
                              ? empDeptCat.deptHi
                              : empDeptCat.deptEn
                            : language === 'hi'
                              ? 'सभी विभाग'
                              : 'All Departments'}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${emp.active
                          ? 'bg-[var(--mnp-success-bg)] text-[var(--mnp-success)]'
                          : 'bg-[var(--mnp-error-bg)] text-[var(--mnp-error)]'
                        }`}
                    >
                      {emp.active ? t.activeLabel : t.inactiveLabel}
                    </span>
                  </div>

                  {/* Role & Department Assignment + Actions */}
                  <div className="space-y-2 pt-2 border-t border-[var(--mnp-border)]">
                    <div className="grid grid-cols-2 gap-1.5">
                      <select
                        aria-label={t.editRoleLabel}
                        value={emp.role}
                        disabled={isSelf}
                        onChange={(e) => {
                          const nextRole = e.target.value as OfficerRole;
                          const nextDept: ComplaintCategoryId | 'all' =
                            nextRole === 'dept_officer' || nextRole === 'field_staff'
                              ? emp.department === 'all'
                                ? 'sanitation'
                                : emp.department
                              : 'all';
                          updateEmployee(emp.id, { role: nextRole, department: nextDept });
                        }}
                        className="min-h-[40px] px-2 rounded-[8px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] text-xs font-semibold text-[var(--mnp-text)] disabled:opacity-60"
                      >
                        <option value="field_staff">{roleLabels.field_staff}</option>
                        <option value="dept_officer">{roleLabels.dept_officer}</option>
                        <option value="cmo">{roleLabels.cmo}</option>
                        <option value="mayor">{roleLabels.mayor}</option>
                        <option value="admin">{roleLabels.admin}</option>
                      </select>

                      <select
                        aria-label={t.departmentLabel}
                        value={emp.department}
                        disabled={isSelf || !needsSpecificDept}
                        onChange={(e) =>
                          updateEmployee(emp.id, {
                            department: e.target.value as ComplaintCategoryId | 'all',
                          })
                        }
                        className="min-h-[40px] px-2 rounded-[8px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] text-xs font-semibold text-[var(--mnp-text)] disabled:opacity-60"
                      >
                        {!needsSpecificDept && (
                          <option value="all">
                            {language === 'hi' ? 'सभी विभाग' : 'All Depts'}
                          </option>
                        )}
                        {CATEGORIES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {language === 'hi' ? c.labelHi : c.labelEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    {!isSelf && (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => updateEmployee(emp.id, { active: !emp.active })}
                          className="min-h-[38px] px-3 rounded-[8px] border border-[var(--mnp-border-strong)] text-[11px] font-bold text-[var(--mnp-text)] hover:bg-[var(--mnp-surface-muted)]"
                        >
                          {emp.active ? t.inactiveLabel : t.activeLabel}
                        </button>
                        <button
                          type="button"
                          aria-label={t.deleteBtn}
                          onClick={() => deleteEmployee(emp.id)}
                          className="min-h-[38px] min-w-[38px] rounded-[8px] border border-[#F5B8B8] dark:border-[#7A272D] bg-[var(--mnp-error-bg)] text-[var(--mnp-error)] flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: NOTICES & TENDERS MANAGEMENT */}
      {tab === 'notices' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className={UI.sectionTitle}>
              {t.tabNotices} ({notices.length})
            </h2>
            <button
              type="button"
              onClick={() => setShowAddNotice((v) => !v)}
              className="min-h-[40px] px-3 rounded-[10px] bg-[var(--mnp-accent)] text-white text-xs font-bold inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addNoticeBtn}</span>
            </button>
          </div>

          {showAddNotice && (
            <form onSubmit={handleAddNotice} className={`${UI.card} p-3.5 space-y-2.5`}>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={noticeType}
                  onChange={(e) => setNoticeType(e.target.value as Notice['type'])}
                  className={UI.input}
                >
                  <option value="notice">{language === 'hi' ? 'सामान्य सूचना' : 'General Notice'}</option>
                  <option value="tender">{language === 'hi' ? 'निविदा (Tender)' : 'Tender'}</option>
                  <option value="navratri">{language === 'hi' ? 'नवरात्रि / मंदिर सूचना' : 'Navratri / Temple'}</option>
                </select>
                <input
                  type="text"
                  value={noticeRef}
                  onChange={(e) => setNoticeRef(e.target.value)}
                  placeholder="MNP/2026/501"
                  className={UI.input}
                />
              </div>
              <input
                type="text"
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                placeholder={language === 'hi' ? 'सूचना का शीर्षक...' : 'Notice headline...'}
                className={UI.input}
              />
              <textarea
                rows={3}
                value={noticeBody}
                onChange={(e) => setNoticeBody(e.target.value)}
                placeholder={language === 'hi' ? 'सूचना का पूरा विवरण...' : 'Full announcement details...'}
                className={UI.textarea}
              />
              <label className="flex items-center gap-2 text-xs font-semibold text-[var(--mnp-text-secondary)] cursor-pointer min-h-[36px]">
                <input
                  type="checkbox"
                  checked={broadcastPush}
                  onChange={(e) => setBroadcastPush(e.target.checked)}
                  className="w-4 h-4 accent-[#2196F3]"
                />
                <span>{t.broadcastPushLabel}</span>
              </label>
              {noticeError && <p className={UI.errorText}>{noticeError}</p>}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddNotice(false)}
                  className={`${UI.btnOutline} text-xs`}
                >
                  {t.cancel}
                </button>
                <button type="submit" className={`${UI.btnPrimary} flex-1 text-xs`}>
                  {t.addNoticeBtn}
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2.5">
            {notices.map((n) => (
              <div key={n.id} className={`${UI.card} p-3.5 space-y-1.5 text-xs`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-[var(--mnp-primary)] tabular-nums">
                    {n.refNo} · {formatDate(n.date, language)}
                  </span>
                  <button
                    type="button"
                    aria-label={t.deleteBtn}
                    onClick={() => deleteNotice(n.id)}
                    className="min-h-[36px] min-w-[36px] rounded-[8px] text-[var(--mnp-error)] hover:bg-[var(--mnp-error-bg)] flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-sm font-bold text-[var(--mnp-text)]">
                  {language === 'hi' ? n.titleHi : n.titleEn}
                </div>
                <p className="text-[var(--mnp-text-secondary)] leading-relaxed">
                  {language === 'hi' ? n.bodyHi : n.bodyEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: REAL-TIME DATA FEEDS (Temple Crowd/Parking/Ropeway + Garbage Van Live Status) */}
      {tab === 'live_feeds' && (
        <div className="space-y-4">
          {/* Maa Sharda Temple Live Feed */}
          <section className={`${UI.card} p-3.5 space-y-3`}>
            <h2 className={`${UI.sectionTitle} flex items-center gap-1.5`}>
              <Radio className="w-4 h-4 text-[var(--mnp-accent)]" />
              <span>{t.templeLiveFeedTitle}</span>
            </h2>

            {/* Crowd Level */}
            <div className="space-y-1.5">
              <p className="text-xs font-bold text-[var(--mnp-text-secondary)]">
                {t.crowdLevelTitle}
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {(['low', 'medium', 'high'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => updateTempleFeed({ crowdLevel: lvl })}
                    className={`min-h-[44px] rounded-[10px] border text-xs font-bold ${templeFeed.crowdLevel === lvl
                        ? 'bg-[var(--mnp-primary)] text-white border-[var(--mnp-primary)]'
                        : 'bg-[var(--mnp-surface-muted)] text-[var(--mnp-text-secondary)] border-[var(--mnp-border)]'
                      }`}
                  >
                    {lvl === 'low'
                      ? language === 'hi'
                        ? 'कम भीड़'
                        : 'Low'
                      : lvl === 'medium'
                        ? language === 'hi'
                          ? 'मध्यम'
                          : 'Medium'
                        : language === 'hi'
                          ? 'अधिक भीड़'
                          : 'High'}
                  </button>
                ))}
              </div>
            </div>

            {/* Parking Zones Live Capacity */}
            <div className="space-y-2 pt-2 border-t border-[var(--mnp-border)]">
              <p className="text-xs font-bold text-[var(--mnp-text-secondary)]">{t.parkingTitle}</p>
              {templeFeed.parkingZones.map((pk) => (
                <div key={pk.id} className={`${UI.surfaceMuted} p-2.5 space-y-2 text-xs`}>
                  <div className="font-bold text-[var(--mnp-text)]">
                    {language === 'hi' ? pk.nameHi : pk.nameEn}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={pk.capacity}
                      value={pk.available}
                      onChange={(e) => {
                        const val = Math.max(0, Math.min(pk.capacity, Number(e.target.value) || 0));
                        const nextStatus: 'open' | 'tight' | 'full' =
                          val === 0 ? 'full' : val < pk.capacity * 0.2 ? 'tight' : 'open';
                        updateTempleFeed({
                          parkingZones: templeFeed.parkingZones.map((z) =>
                            z.id === pk.id ? { ...z, available: val, status: nextStatus } : z
                          ),
                        });
                      }}
                      className="w-20 min-h-[40px] px-2.5 rounded-[8px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] text-xs font-bold tabular-nums"
                    />
                    <span className="text-[var(--mnp-text-muted)] tabular-nums">/ {pk.capacity}</span>
                    <select
                      value={pk.status}
                      onChange={(e) =>
                        updateTempleFeed({
                          parkingZones: templeFeed.parkingZones.map((z) =>
                            z.id === pk.id
                              ? { ...z, status: e.target.value as 'open' | 'tight' | 'full' }
                              : z
                          ),
                        })
                      }
                      className="flex-1 min-h-[40px] px-2 rounded-[8px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] text-xs font-semibold"
                    >
                      <option value="open">{language === 'hi' ? 'उपलब्ध (Open)' : 'Open'}</option>
                      <option value="tight">{language === 'hi' ? 'सीमित (Tight)' : 'Tight'}</option>
                      <option value="full">{language === 'hi' ? 'पूर्ण (Full)' : 'Full'}</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Ropeway & Water Notes */}
            <div className="space-y-2 pt-2 border-t border-[var(--mnp-border)]">
              <label className="block text-xs font-bold text-[var(--mnp-text-secondary)]">
                {t.ropewayStairsTitle}
              </label>
              <input
                type="text"
                value={ropewayText}
                onChange={(e) => setRopewayText(e.target.value)}
                className={UI.input}
              />
              <label className="block text-xs font-bold text-[var(--mnp-text-secondary)]">
                {t.toiletsWaterTitle}
              </label>
              <textarea
                rows={2}
                value={toiletsText}
                onChange={(e) => setToiletsText(e.target.value)}
                className={UI.textarea}
              />
              <button
                type="button"
                onClick={() =>
                  updateTempleFeed({
                    ropewayStatusHi: ropewayText,
                    ropewayStatusEn: ropewayText,
                    toiletsWaterNoteHi: toiletsText,
                    toiletsWaterNoteEn: toiletsText,
                  })
                }
                className={`${UI.btnPrimary} w-full text-xs`}
              >
                {t.saveChangesBtn}
              </button>
            </div>
          </section>

          {/* Garbage Van Live Route Status */}
          <section className={`${UI.card} p-3.5 space-y-2.5`}>
            <h2 className={`${UI.sectionTitle} flex items-center gap-1.5`}>
              <Truck className="w-4 h-4 text-[var(--mnp-success)]" />
              <span>{t.garbageLiveFeedTitle}</span>
            </h2>
            <div className="space-y-2">
              {garbageRoutes.map((route) => (
                <div key={route.id} className={`${UI.surfaceMuted} p-3 space-y-2 text-xs`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-[var(--mnp-text)]">{route.vehicleNo}</span>
                    <span className="text-[11px] font-bold text-[var(--mnp-primary)] tabular-nums">
                      {t.wardLabel}: {route.wardsCovered.join(', ')}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={route.status || 'on_route'}
                      onChange={(e) =>
                        updateGarbageRoute(route.id, {
                          status: e.target.value as 'on_route' | 'delayed' | 'completed',
                        })
                      }
                      className="min-h-[40px] px-2 rounded-[8px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] text-xs font-semibold"
                    >
                      <option value="on_route">
                        {language === 'hi' ? 'मार्ग पर सक्रिय' : 'On Route'}
                      </option>
                      <option value="delayed">
                        {language === 'hi' ? 'विलंबित (Delayed)' : 'Delayed'}
                      </option>
                      <option value="completed">
                        {language === 'hi' ? 'संग्रहण पूर्ण' : 'Completed'}
                      </option>
                    </select>
                    <input
                      type="text"
                      value={language === 'hi' ? route.scheduleHi : route.scheduleEn}
                      onChange={(e) =>
                        updateGarbageRoute(route.id, {
                          scheduleHi: e.target.value,
                          scheduleEn: e.target.value,
                        })
                      }
                      className="min-h-[40px] px-2.5 rounded-[8px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB 4: CITY INFORMATION (Contacts, Ward Directory, Helplines) */}
      {tab === 'city_info' && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-1 p-1 rounded-[10px] bg-[var(--mnp-surface)] border border-[var(--mnp-border)]">
            {(['contacts', 'wards', 'helplines'] as const).map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setInfoSubTab(sub)}
                className={`min-h-[38px] rounded-[8px] text-[11px] font-bold ${infoSubTab === sub
                    ? 'bg-[var(--mnp-primary)] text-white'
                    : 'text-[var(--mnp-text-secondary)]'
                  }`}
              >
                {sub === 'contacts'
                  ? t.tabContacts
                  : sub === 'wards'
                    ? t.tabWards
                    : t.tileHelplines}
              </button>
            ))}
          </div>

          {/* Municipal Contacts */}
          {infoSubTab === 'contacts' && (
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setShowAddContact((v) => !v)}
                className={`${UI.btnAccent} w-full text-xs flex items-center justify-center gap-1.5`}
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'hi' ? 'नया विभाग संपर्क जोड़ें' : 'Add Department Contact'}</span>
              </button>

              {showAddContact && (
                <form onSubmit={handleAddContact} className={`${UI.card} p-3.5 space-y-2`}>
                  <input
                    type="text"
                    value={ctDept}
                    onChange={(e) => setCtDept(e.target.value)}
                    placeholder={language === 'hi' ? 'विभाग का नाम' : 'Department name'}
                    className={UI.input}
                  />
                  <input
                    type="text"
                    value={ctOfficer}
                    onChange={(e) => setCtOfficer(e.target.value)}
                    placeholder={language === 'hi' ? 'अधिकारी का नाम' : 'Officer name'}
                    className={UI.input}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={ctDesig}
                      onChange={(e) => setCtDesig(e.target.value)}
                      placeholder={language === 'hi' ? 'पदनाम' : 'Designation'}
                      className={UI.input}
                    />
                    <input
                      type="text"
                      value={ctPhone}
                      onChange={(e) => setCtPhone(e.target.value)}
                      placeholder="07674-000399"
                      className={UI.input}
                    />
                  </div>
                  <button type="submit" className={`${UI.btnSuccess} w-full text-xs`}>
                    {t.saveChangesBtn}
                  </button>
                </form>
              )}

              {contacts.map((ct) => {
                const isEdit = editingContactId === ct.id;
                return (
                  <div key={ct.id} className={`${UI.card} p-3.5 space-y-2 text-xs`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-bold text-[var(--mnp-text)]">
                          {language === 'hi' ? ct.departmentHi : ct.departmentEn}
                        </div>
                        <div className="text-[var(--mnp-text-secondary)]">
                          {language === 'hi' ? ct.officerNameHi : ct.officerNameEn} · {ct.phone}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingContactId(isEdit ? null : ct.id);
                            setEditCtOfficer(language === 'hi' ? ct.officerNameHi : ct.officerNameEn);
                            setEditCtPhone(ct.phone);
                          }}
                          className="min-h-[36px] min-w-[36px] rounded-[8px] hover:bg-[var(--mnp-surface-muted)] flex items-center justify-center text-[var(--mnp-primary)]"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteContact(ct.id)}
                          className="min-h-[36px] min-w-[36px] rounded-[8px] hover:bg-[var(--mnp-error-bg)] flex items-center justify-center text-[var(--mnp-error)]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {isEdit && (
                      <div className="pt-2 border-t border-[var(--mnp-border)] space-y-2">
                        <input
                          type="text"
                          value={editCtOfficer}
                          onChange={(e) => setEditCtOfficer(e.target.value)}
                          className={UI.input}
                        />
                        <input
                          type="text"
                          value={editCtPhone}
                          onChange={(e) => setEditCtPhone(e.target.value)}
                          className={UI.input}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            updateContact(ct.id, {
                              officerNameHi: editCtOfficer,
                              officerNameEn: editCtOfficer,
                              phone: editCtPhone,
                            });
                            setEditingContactId(null);
                          }}
                          className={`${UI.btnSuccess} w-full text-xs`}
                        >
                          {t.saveChangesBtn}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Ward Directory Editor */}
          {infoSubTab === 'wards' && (
            <div className="space-y-2">
              {wardDirectory.map((w) => {
                const isEdit = editingWard === w.ward;
                return (
                  <div key={w.ward} className={`${UI.card} p-3.5 space-y-2 text-xs`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-bold text-[var(--mnp-primary)]">
                          {t.wardLabel} {w.ward} — {language === 'hi' ? w.areaHi : w.areaEn}
                        </div>
                        <div className="text-[var(--mnp-text-secondary)]">
                          {language === 'hi' ? w.councillorHi : w.councillorEn} · {w.phone}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingWard(isEdit ? null : w.ward);
                          setWardCouncillor(language === 'hi' ? w.councillorHi : w.councillorEn);
                          setWardOfficer(language === 'hi' ? w.wardOfficerHi : w.wardOfficerEn);
                          setWardPhone(w.phone);
                        }}
                        className="min-h-[36px] min-w-[36px] rounded-[8px] hover:bg-[var(--mnp-surface-muted)] flex items-center justify-center text-[var(--mnp-primary)]"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>

                    {isEdit && (
                      <div className="pt-2 border-t border-[var(--mnp-border)] space-y-2">
                        <input
                          type="text"
                          value={wardCouncillor}
                          onChange={(e) => setWardCouncillor(e.target.value)}
                          placeholder={t.councillorLabel}
                          className={UI.input}
                        />
                        <input
                          type="text"
                          value={wardOfficer}
                          onChange={(e) => setWardOfficer(e.target.value)}
                          placeholder={t.wardOfficerLabel}
                          className={UI.input}
                        />
                        <input
                          type="text"
                          value={wardPhone}
                          onChange={(e) => setWardPhone(e.target.value)}
                          placeholder="Phone"
                          className={UI.input}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            updateWardDirectoryEntry(w.ward, {
                              councillorHi: wardCouncillor,
                              councillorEn: wardCouncillor,
                              wardOfficerHi: wardOfficer,
                              wardOfficerEn: wardOfficer,
                              phone: wardPhone,
                            });
                            setEditingWard(null);
                          }}
                          className={`${UI.btnSuccess} w-full text-xs`}
                        >
                          {t.saveChangesBtn}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Emergency Helplines Editor */}
          {infoSubTab === 'helplines' && (
            <div className="space-y-2">
              {helplines.map((hl) => {
                const isEdit = editingHelplineId === hl.id;
                return (
                  <div key={hl.id} className={`${UI.card} p-3.5 space-y-2 text-xs`}>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-sm font-bold text-[var(--mnp-text)]">
                          {language === 'hi' ? hl.titleHi : hl.titleEn}
                        </div>
                        <div className="font-bold text-[var(--mnp-primary)] tabular-nums">
                          {hl.sampleNumber}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingHelplineId(isEdit ? null : hl.id);
                          setEditHlNumber(hl.sampleNumber);
                        }}
                        className="min-h-[36px] min-w-[36px] rounded-[8px] hover:bg-[var(--mnp-surface-muted)] flex items-center justify-center text-[var(--mnp-primary)]"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                    {isEdit && (
                      <div className="flex gap-2 pt-1">
                        <input
                          type="text"
                          value={editHlNumber}
                          onChange={(e) => setEditHlNumber(e.target.value)}
                          className={`${UI.input} flex-1 tabular-nums`}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            updateHelpline(hl.id, { sampleNumber: editHlNumber.trim() });
                            setEditingHelplineId(null);
                          }}
                          className="min-h-[48px] px-3 rounded-[10px] bg-[var(--mnp-success)] text-white flex items-center justify-center"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: ALL CITIZEN REQUESTS */}
      {tab === 'requests' && (() => {
        const appIssuesCount = complaints.filter((c) => c.category === 'app_issue').length;
        const filteredComplaints = complaints.filter((c) => {
          if (requestFilter === 'app_issues') return c.category === 'app_issue';
          if (requestFilter === 'municipal') return c.category !== 'app_issue';
          return true;
        });

        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className={UI.sectionTitle}>
                {t.allRequestsTab} ({complaints.length})
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-[10px] bg-[var(--mnp-surface-muted)] border border-[var(--mnp-border)]">
              <button
                type="button"
                onClick={() => setRequestFilter('all')}
                className={`px-3 py-1.5 rounded-[8px] text-xs font-bold transition-colors ${requestFilter === 'all'
                    ? 'bg-[var(--mnp-primary)] text-white shadow-xs'
                    : 'text-[var(--mnp-text-muted)] hover:text-[var(--mnp-text)]'
                  }`}
              >
                {language === 'hi' ? 'सभी अनुरोध' : 'All Requests'} ({complaints.length})
              </button>
              <button
                type="button"
                onClick={() => setRequestFilter('app_issues')}
                className={`px-3 py-1.5 rounded-[8px] text-xs font-bold transition-colors flex items-center gap-1.5 ${requestFilter === 'app_issues'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30'
                  }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'ऐप समस्याएं' : 'App Issues'}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 font-mono">
                  {appIssuesCount}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setRequestFilter('municipal')}
                className={`px-3 py-1.5 rounded-[8px] text-xs font-bold transition-colors ${requestFilter === 'municipal'
                    ? 'bg-[var(--mnp-primary)] text-white shadow-xs'
                    : 'text-[var(--mnp-text-muted)] hover:text-[var(--mnp-text)]'
                  }`}
              >
                {language === 'hi' ? 'नागरिक समस्याएं' : 'Municipal Grievances'} (
                {complaints.length - appIssuesCount})
              </button>
            </div>

            {filteredComplaints.length === 0 ? (
              <div className={`${UI.card} p-6 text-center text-xs text-[var(--mnp-text-muted)] space-y-1`}>
                <p className="font-bold">
                  {language === 'hi' ? 'कोई शिकायत नहीं मिली' : 'No requests found'}
                </p>
                <p>
                  {requestFilter === 'app_issues'
                    ? language === 'hi'
                      ? 'वर्तमान में कोई ऐप संबंधित शिकायत लंबित नहीं है।'
                      : 'No app related issues currently pending.'
                    : ''}
                </p>
              </div>
            ) : (
              filteredComplaints.map((c) => {
                const cat = CATEGORIES.find((x) => x.id === c.category);
                const isAppIssue = c.category === 'app_issue';

                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setViewingComplaintId(c.id)}
                    className={`${UI.cardInteractive} w-full p-3.5 text-left space-y-2 ${isAppIssue ? 'border-l-4 border-l-purple-600' : ''
                      }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[var(--mnp-primary)] tabular-nums">
                          {c.id}
                        </span>
                        {isAppIssue ? (
                          <span className="inline-flex items-center gap-1 bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            <Wrench className="w-3 h-3" />
                            <span>{language === 'hi' ? 'सीधे Admin को' : 'Direct to Admin'}</span>
                          </span>
                        ) : (
                          <span className="text-xs text-[var(--mnp-text-muted)]">
                            {t.wardLabel} {c.ward}
                          </span>
                        )}
                      </div>
                      <StatusBadge status={c.status} />
                    </div>

                    <div className="text-sm font-bold text-[var(--mnp-text)]">
                      {cat ? (language === 'hi' ? cat.labelHi : cat.labelEn) : c.category}
                    </div>

                    <div className="flex items-center justify-between text-xs text-[var(--mnp-text-muted)]">
                      <span className="truncate">
                        {c.name} · {c.landmark}
                      </span>
                      <span className="text-[var(--mnp-primary)] font-bold inline-flex items-center gap-1 shrink-0 ml-2">
                        <Eye className="w-3.5 h-3.5" />
                        {t.viewRequestBtn}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        );
      })()}
    </div>
  );
};
