import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Building2, Eye, Filter, UserCheck, Users } from 'lucide-react';
import { CATEGORIES, getEscalationLevel, getSlaInfo, WARDS } from '../../constants';
import { EscalationBadge, StatusBadge } from '../../components/StatusBadge';
import { UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { ComplaintStatus } from '../../types';
import { formatDurationMs } from '../../utils/format';
import { OfficerComplaintDetail } from './OfficerComplaintDetail';

export const DeptOfficerView: React.FC = () => {
  const { complaints, employees, loggedInEmployee, language, t, assignComplaint } = useApp();
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | 'all'>('all');
  const [wardFilter, setWardFilter] = useState<number | 'all'>('all');
  const [overdueOnly, setOverdueOnly] = useState(false);

  const officerDept = loggedInEmployee?.department;
  const deptCategory = CATEGORIES.find((c) => c.id === officerDept);

  // Strict scoping: Department Officers only see complaints belonging to their own department
  const deptComplaints = useMemo(() => {
    if (!officerDept || officerDept === 'all') return complaints;
    return complaints.filter((c) => c.category === officerDept);
  }, [complaints, officerDept]);

  // Department-owned active field staff
  const deptFieldStaff = useMemo(() => {
    return employees.filter(
      (e) =>
        e.role === 'field_staff' &&
        e.active &&
        (!officerDept || officerDept === 'all' || e.department === officerDept)
    );
  }, [employees, officerDept]);

  const [viewingId, setViewingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string>('');
  const [assignNote, setAssignNote] = useState('');

  useEffect(() => {
    setViewingId(null);
    setEditingId(null);
    setStatusFilter('all');
    setWardFilter('all');
    setOverdueOnly(false);
  }, [loggedInEmployee?.id]);

  const filtered = useMemo(() => {
    const now = Date.now();
    return deptComplaints
      .map((c) => ({
        c,
        sla: getSlaInfo(c.createdAt, c.category, c.status, now),
        escalation: getEscalationLevel(c.createdAt, c.category, c.status, now),
      }))
      .filter(({ c, sla }) => {
        if (statusFilter !== 'all' && c.status !== statusFilter) return false;
        if (wardFilter !== 'all' && c.ward !== wardFilter) return false;
        if (overdueOnly && !sla.isOverdue) return false;
        return true;
      });
  }, [deptComplaints, statusFilter, wardFilter, overdueOnly]);

  if (viewingId) {
    return (
      <OfficerComplaintDetail
        complaintId={viewingId}
        onBack={() => setViewingId(null)}
        canAssign={true}
      />
    );
  }

  const handleSaveAssign = (complaintId: string) => {
    if (!selectedStaff) return;
    const actor = loggedInEmployee
      ? `${language === 'hi' ? loggedInEmployee.nameHi : loggedInEmployee.nameEn} (${t.roleDeptOfficer})`
      : t.roleDeptOfficer;
    assignComplaint(complaintId, selectedStaff, assignNote, actor);
    setEditingId(null);
    setAssignNote('');
  };

  return (
    <div className="p-3.5 space-y-3.5">
      {/* Department Scope Header Card */}
      <div className={`${UI.card} p-3.5 space-y-2`}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-9 h-9 rounded-[10px] bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-[var(--mnp-text-muted)]">
                {t.departmentLabel}
              </p>
              <h2 className="text-sm font-bold text-[var(--mnp-text)] truncate">
                {deptCategory
                  ? language === 'hi'
                    ? deptCategory.deptHi
                    : deptCategory.deptEn
                  : language === 'hi'
                  ? 'सभी विभाग'
                  : 'All Departments'}
              </h2>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] text-[11px] font-bold inline-flex items-center gap-1 shrink-0 tabular-nums">
            <Users className="w-3.5 h-3.5" />
            <span>{deptFieldStaff.length}</span>
          </span>
        </div>
        <p className="text-[11px] text-[var(--mnp-text-muted)] leading-snug">
          {t.deptScopeNote} · {t.deptFieldStaffLabel}:{' '}
          <strong className="text-[var(--mnp-text-secondary)]">
            {deptFieldStaff.length > 0
              ? deptFieldStaff
                  .map((s) => (language === 'hi' ? s.nameHi : s.nameEn))
                  .join(', ')
              : '—'}
          </strong>
        </p>
      </div>

      {/* Filters Card */}
      <div className={`${UI.card} p-3.5 space-y-2.5`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[var(--mnp-text)] flex items-center gap-1.5 tabular-nums">
            <Filter className="w-3.5 h-3.5 text-[var(--mnp-primary)]" />
            <span>
              {filtered.length} / {deptComplaints.length}
            </span>
          </span>
          <label className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--mnp-error)] cursor-pointer min-h-[36px]">
            <input
              type="checkbox"
              checked={overdueOnly}
              onChange={(e) => setOverdueOnly(e.target.checked)}
              className="w-4 h-4 accent-[#C62828]"
            />
            <span>{t.onlyOverdue}</span>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <select
            aria-label={t.filterStatus}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ComplaintStatus | 'all')}
            className="min-h-[44px] px-2.5 rounded-[10px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] text-xs text-[var(--mnp-text)]"
          >
            <option value="all">
              {t.filterStatus}: {t.all}
            </option>
            {(
              [
                'Registered',
                'Assigned',
                'In progress',
                'Resolved',
                'Closed',
                'Reopened',
              ] as ComplaintStatus[]
            ).map((st) => (
              <option key={st} value={st}>
                {t.statusLabels[st]}
              </option>
            ))}
          </select>

          <select
            aria-label={t.filterWard}
            value={wardFilter}
            onChange={(e) =>
              setWardFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            className="min-h-[44px] px-2.5 rounded-[10px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] text-xs text-[var(--mnp-text)]"
          >
            <option value="all">
              {t.filterWard}: {t.all}
            </option>
            {WARDS.map((w) => (
              <option key={w.id} value={w.id}>
                {t.wardLabel} {w.id}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Complaint Queue */}
      {filtered.length === 0 ? (
        <div className={UI.emptyState}>
          <p className="text-sm font-bold text-[var(--mnp-text)]">{t.noComplaintsFound}</p>
          {(statusFilter !== 'all' || wardFilter !== 'all' || overdueOnly) && (
            <button
              type="button"
              onClick={() => {
                setStatusFilter('all');
                setWardFilter('all');
                setOverdueOnly(false);
              }}
              className={UI.btnPrimary}
            >
              {t.clearFilter}
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map(({ c, sla, escalation }) => {
            const cat = CATEGORIES.find((x) => x.id === c.category);
            const staff = employees.find((s) => s.id === c.assignedTo);
            const eligibleStaff = employees.filter(
              (e) => e.role === 'field_staff' && e.active && e.department === c.category
            );
            const isEditing = editingId === c.id;
            const canAssign = c.status !== 'Closed' && c.status !== 'Resolved';

            return (
              <div
                key={c.id}
                className={`rounded-[12px] border p-3.5 space-y-2.5 shadow-[var(--mnp-shadow-card)] ${
                  sla.isOverdue
                    ? 'border-[#F5B8B8] dark:border-[#7A272D] bg-[var(--mnp-error-bg)]'
                    : 'border-[var(--mnp-border)] bg-[var(--mnp-surface)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setViewingId(c.id)}
                  className="w-full text-left space-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] rounded-[8px]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-xs tabular-nums">
                      <span className="font-bold text-[var(--mnp-primary)]">{c.id}</span>
                      <span className="mx-1.5 text-[var(--mnp-text-muted)]">·</span>
                      <span className="text-[var(--mnp-text-secondary)]">
                        {t.wardLabel} {c.ward}
                      </span>
                    </div>
                    <StatusBadge status={c.status} />
                  </div>

                  <div>
                    <div className="text-sm font-bold text-[var(--mnp-text)]">
                      {cat ? (language === 'hi' ? cat.labelHi : cat.labelEn) : c.category}
                    </div>
                    <p className="text-xs text-[var(--mnp-text-muted)] mt-0.5">{c.landmark}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <EscalationBadge level={escalation} />
                    {sla.isOverdue && (
                      <span className="text-xs font-bold text-[var(--mnp-error)] flex items-center gap-1 tabular-nums">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {t.overdueBy} {formatDurationMs(sla.remainingMs, language)}
                      </span>
                    )}
                  </div>
                </button>

                <div className="pt-2 border-t border-[var(--mnp-border)] flex items-center justify-between gap-2 text-xs">
                  <span className="text-[var(--mnp-text-secondary)] flex items-center gap-1 min-w-0 truncate">
                    <UserCheck className="w-3.5 h-3.5 shrink-0 text-[var(--mnp-primary)]" />
                    <span className="truncate font-semibold">
                      {staff
                        ? language === 'hi'
                          ? staff.nameHi
                          : staff.nameEn
                        : t.unassignedLabel}
                    </span>
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setViewingId(c.id)}
                      className="min-h-[42px] px-2.5 rounded-[8px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] hover:bg-[var(--mnp-surface-muted)] text-[var(--mnp-text)] text-xs font-bold inline-flex items-center gap-1 whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5 text-[var(--mnp-primary)]" />
                      <span>{t.viewRequestBtn}</span>
                    </button>

                    {canAssign && !isEditing && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(c.id);
                          const currentEligible = eligibleStaff.some((s) => s.id === c.assignedTo)
                            ? c.assignedTo!
                            : eligibleStaff[0]?.id || '';
                          setSelectedStaff(currentEligible);
                          setAssignNote('');
                        }}
                        className="min-h-[42px] px-3 rounded-[8px] bg-[var(--mnp-primary)] hover:bg-[var(--mnp-primary-hover)] text-white text-xs font-bold whitespace-nowrap shrink-0"
                      >
                        {c.assignedTo ? t.reassignOfficer : t.assignOfficer}
                      </button>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-2.5 space-y-2 border-t border-[var(--mnp-border)]">
                    {eligibleStaff.length === 0 ? (
                      <p className={UI.errorText}>{t.noDeptFieldStaff}</p>
                    ) : (
                      <>
                        <select
                          value={selectedStaff}
                          onChange={(e) => setSelectedStaff(e.target.value)}
                          className={UI.input}
                        >
                          {eligibleStaff.map((s) => (
                            <option key={s.id} value={s.id}>
                              {language === 'hi' ? s.nameHi : s.nameEn} ({s.empCode})
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={assignNote}
                          onChange={(e) => setAssignNote(e.target.value)}
                          placeholder={t.assignNotePlaceholder}
                          className={UI.input}
                        />
                      </>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className={`${UI.btnOutline} text-xs`}
                      >
                        {t.cancel}
                      </button>
                      <button
                        type="button"
                        disabled={!selectedStaff || eligibleStaff.length === 0}
                        onClick={() => handleSaveAssign(c.id)}
                        className={`${UI.btnSuccess} flex-1 text-xs disabled:opacity-50`}
                      >
                        {t.saveAssignmentBtn}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
