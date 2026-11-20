import React, { useState } from 'react';
import {
  BarChart3,
  Building2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Crown,
  KeyRound,
  LogIn,
  LogOut,
  Settings,
  ShieldCheck,
  User,
  Wrench,
} from 'lucide-react';
import { CATEGORIES } from '../../constants';
import { TopBar } from '../../components/TopBar';
import { UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { AdminPortalView } from './AdminPortalView';
import { CmoDashboardView } from './CmoDashboardView';
import { DeptOfficerView } from './DeptOfficerView';
import { FieldStaffView } from './FieldStaffView';

export const OfficerApp: React.FC = () => {
  const {
    officerRole,
    loggedInEmployee,
    employees,
    complaints,
    loginEmployee,
    logoutEmployee,
    setAppMode,
    language,
    t,
  } = useApp();

  const [identifier, setIdentifier] = useState('EMP-DO-WAT');
  const [pin, setPin] = useState('1234');
  const [error, setError] = useState('');
  const [showAllStaff, setShowAllStaff] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = loginEmployee(identifier, pin);
    if (!res.ok && res.error) {
      setError(res.error);
    } else {
      setError('');
    }
  };

  const handleQuickLogin = (empCode: string) => {
    setIdentifier(empCode);
    setPin('1234');
    setError('');
    loginEmployee(empCode, '1234');
  };

  const activeDeptOfficers = employees.filter((e) => e.role === 'dept_officer' && e.active);
  const activeFieldStaff = employees.filter((e) => e.role === 'field_staff' && e.active);
  const visibleFieldStaff = showAllStaff ? activeFieldStaff : activeFieldStaff.slice(0, 6);

  const leadershipAccounts = [
    {
      role: 'cmo' as const,
      title: t.roleCmo,
      subtitle: t.roleCmoSub,
      empCode: employees.find((e) => e.role === 'cmo' && e.active)?.empCode || 'EMP-CMO-01',
      icon: BarChart3,
    },
    {
      role: 'mayor' as const,
      title: t.roleMayor,
      subtitle: t.roleMayorSub,
      empCode: employees.find((e) => e.role === 'mayor' && e.active)?.empCode || 'EMP-MYR-01',
      icon: Crown,
    },
    {
      role: 'admin' as const,
      title: t.roleAdmin,
      subtitle: t.roleAdminSub,
      empCode: employees.find((e) => e.role === 'admin' && e.active)?.empCode || 'EMP-ADM-01',
      icon: Settings,
    },
  ];

  const loggedInDeptCat =
    loggedInEmployee && loggedInEmployee.department !== 'all'
      ? CATEGORIES.find((c) => c.id === loggedInEmployee.department)
      : undefined;

  const topTitle =
    officerRole === 'field_staff'
      ? t.fieldStaffTitle
      : officerRole === 'dept_officer'
      ? t.deptOfficerTitle
      : officerRole === 'cmo'
      ? t.cmoTitle
      : officerRole === 'mayor'
      ? t.mayorTitle
      : officerRole === 'admin'
      ? t.adminTitle
      : t.employeeLoginTitle;

  const isAuthenticated = Boolean(loggedInEmployee && officerRole);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <TopBar
        title={topTitle}
        rightAction={
          isAuthenticated ? (
            <button
              type="button"
              onClick={logoutEmployee}
              className="min-h-[38px] px-3 rounded-full bg-white/20 text-xs font-bold hover:bg-white/30 inline-flex items-center gap-1 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.logoutBtn}</span>
            </button>
          ) : undefined
        }
      />

      {/* Logged-in Employee Identity Strip */}
      {isAuthenticated && loggedInEmployee && (
        <div className="px-4 py-2 bg-[var(--mnp-surface)] border-b border-[var(--mnp-border)] flex items-center justify-between gap-2 text-xs shrink-0">
          <div className="min-w-0 truncate">
            <span className="font-bold text-[var(--mnp-text)]">
              {language === 'hi' ? loggedInEmployee.nameHi : loggedInEmployee.nameEn}
            </span>
            <span className="mx-1.5 text-[var(--mnp-text-muted)]">·</span>
            <span className="font-bold text-[var(--mnp-primary)] tabular-nums">
              {loggedInEmployee.empCode}
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {loggedInDeptCat && (
              <span className="px-2 py-0.5 rounded-full bg-[var(--mnp-surface-muted)] text-[var(--mnp-text-secondary)] text-[10px] font-bold truncate max-w-[120px]">
                {language === 'hi' ? loggedInDeptCat.labelHi : loggedInDeptCat.labelEn}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] text-[10px] font-bold uppercase">
              {officerRole?.replace('_', ' ')}
            </span>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto phone-scroll bg-[var(--mnp-bg)]">
        {!isAuthenticated ? (
          <div className="p-4 space-y-5">
            {/* Clean Airy Employee Login Card */}
            <form onSubmit={handleLoginSubmit} className={`${UI.card} p-5 space-y-4`}>
              <div className="text-center space-y-2">
                <div className="w-14 h-14 mx-auto rounded-full bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div className="space-y-0.5">
                  <h2 className="text-[18px] font-bold text-[var(--mnp-text)]">
                    {t.employeeLoginTitle}
                  </h2>
                  <p className={UI.mutedText}>{t.employeeLoginSubtitle}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <User className="w-4 h-4 text-[var(--mnp-primary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="emp-id-input"
                    type="text"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      setError('');
                    }}
                    placeholder={t.empIdOrMobilePlaceholder}
                    aria-label={t.empIdOrMobileLabel}
                    className={`${UI.input} pl-10 uppercase shadow-xs`}
                  />
                </div>

                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[var(--mnp-primary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="emp-pin-input"
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value.replace(/\D/g, ''));
                      setError('');
                    }}
                    placeholder={t.empPinPlaceholder}
                    aria-label={t.empPinLabel}
                    className={`${UI.input} pl-10 tracking-[0.3em] tabular-nums shadow-xs`}
                  />
                </div>
              </div>

              {error && (
                <p className={UI.errorText} role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className={`${UI.btnPrimary} w-full flex items-center justify-center gap-2`}
              >
                <LogIn className="w-4 h-4" />
                <span>{t.empLoginBtn}</span>
              </button>
            </form>

            {/* Quick Demo Login Grouped by Access Scope */}
            <div className="space-y-4">
              <div className="px-1">
                <h3 className={UI.sectionTitle}>{t.empQuickFillTitle}</h3>
                <p className={UI.mutedText}>{t.empDemoHint}</p>
              </div>

              {/* Group 1: Department Officers (Each sees only their department) */}
              <section className="space-y-2">
                <p className="px-1 text-[11px] font-bold uppercase tracking-wide text-[var(--mnp-text-muted)] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[var(--mnp-primary)]" />
                  <span>{t.deptOfficersGroupLabel}</span>
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {activeDeptOfficers.map((emp) => {
                    const cat = CATEGORIES.find((c) => c.id === emp.department);
                    const deptCount = complaints.filter((c) => c.category === emp.department).length;
                    return (
                      <button
                        key={emp.id}
                        type="button"
                        onClick={() => handleQuickLogin(emp.empCode)}
                        className={`${UI.cardInteractive} w-full px-3.5 py-2.5 flex items-center justify-between gap-2.5 text-left`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-9 h-9 rounded-[10px] bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] flex items-center justify-center shrink-0">
                            <ClipboardCheck className="w-4 h-4" />
                          </span>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[var(--mnp-text)] truncate">
                              {cat ? (language === 'hi' ? cat.deptHi : cat.deptEn) : t.roleDeptOfficer}
                            </div>
                            <p className="text-[11px] text-[var(--mnp-text-muted)] truncate">
                              {language === 'hi' ? emp.nameHi : emp.nameEn} · {deptCount}{' '}
                              {language === 'hi' ? 'शिकायतें' : 'requests'}
                            </p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[var(--mnp-primary-soft)] text-[10px] font-bold text-[var(--mnp-primary)] tabular-nums shrink-0">
                          {emp.empCode}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Group 2: Department Field Staff (Each sees only assigned tasks) */}
              <section className="space-y-2">
                <p className="px-1 text-[11px] font-bold uppercase tracking-wide text-[var(--mnp-text-muted)] flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[var(--mnp-primary)]" />
                  <span>{t.fieldStaffGroupLabel}</span>
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {visibleFieldStaff.map((emp) => {
                    const cat = CATEGORIES.find((c) => c.id === emp.department);
                    const assignedCount = complaints.filter(
                      (c) => c.assignedTo === emp.id && c.status !== 'Closed'
                    ).length;
                    return (
                      <button
                        key={emp.id}
                        type="button"
                        onClick={() => handleQuickLogin(emp.empCode)}
                        className={`${UI.cardInteractive} w-full px-3.5 py-2.5 flex items-center justify-between gap-2.5 text-left`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-9 h-9 rounded-[10px] bg-[var(--mnp-accent-soft)] text-[var(--mnp-accent)] flex items-center justify-center shrink-0">
                            <Wrench className="w-4 h-4" />
                          </span>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[var(--mnp-text)] truncate">
                              {language === 'hi' ? emp.nameHi : emp.nameEn}
                            </div>
                            <p className="text-[11px] text-[var(--mnp-text-muted)] truncate">
                              {cat ? (language === 'hi' ? cat.labelHi : cat.labelEn) : emp.department}{' '}
                              · {assignedCount} {language === 'hi' ? 'सौंपे गए' : 'assigned'}
                            </p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[var(--mnp-accent-soft)] text-[10px] font-bold text-[var(--mnp-accent)] tabular-nums shrink-0">
                          {emp.empCode}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {activeFieldStaff.length > 6 && (
                  <button
                    type="button"
                    onClick={() => setShowAllStaff((v) => !v)}
                    className="w-full min-h-[40px] rounded-[10px] border border-[var(--mnp-border)] bg-[var(--mnp-surface)] text-xs font-bold text-[var(--mnp-primary)] flex items-center justify-center gap-1"
                  >
                    {showAllStaff ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        <span>{language === 'hi' ? 'कम दिखाएं' : 'Show fewer'}</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        <span>
                          {language === 'hi'
                            ? `सभी ${activeFieldStaff.length} फील्ड स्टाफ देखें`
                            : `Show all ${activeFieldStaff.length} field staff`}
                        </span>
                      </>
                    )}
                  </button>
                )}
              </section>

              {/* Group 3: Leadership & Admin (All Departments) */}
              <section className="space-y-2">
                <p className="px-1 text-[11px] font-bold uppercase tracking-wide text-[var(--mnp-text-muted)] flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-[var(--mnp-primary)]" />
                  <span>{t.leadershipGroupLabel}</span>
                </p>
                <div className="space-y-2">
                  {leadershipAccounts.map((acct) => {
                    const Icon = acct.icon;
                    return (
                      <button
                        key={acct.role}
                        type="button"
                        onClick={() => handleQuickLogin(acct.empCode)}
                        className={`${UI.cardInteractive} w-full px-3.5 py-2.5 flex items-center justify-between gap-2.5 text-left`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-9 h-9 rounded-[10px] bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </span>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[var(--mnp-text)]">
                              {acct.title}
                            </div>
                            <p className="text-[11px] text-[var(--mnp-text-muted)] truncate">
                              {acct.subtitle}
                            </p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[var(--mnp-primary-soft)] text-[10px] font-bold text-[var(--mnp-primary)] tabular-nums shrink-0">
                          {acct.empCode}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            <button
              type="button"
              onClick={() => setAppMode('citizen')}
              className={`${UI.btnOutline} w-full text-xs`}
            >
              {t.switchToCitizenLogin}
            </button>
          </div>
        ) : officerRole === 'field_staff' ? (
          <FieldStaffView />
        ) : officerRole === 'dept_officer' ? (
          <DeptOfficerView />
        ) : officerRole === 'cmo' ? (
          <CmoDashboardView role="cmo" />
        ) : officerRole === 'mayor' ? (
          <CmoDashboardView role="mayor" />
        ) : (
          <AdminPortalView />
        )}
      </main>
    </div>
  );
};
