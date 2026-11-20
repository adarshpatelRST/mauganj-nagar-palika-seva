import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  MessageSquarePlus,
  Phone,
  Star,
  User,
  UserCheck,
} from 'lucide-react';
import { CATEGORIES, getEscalationLevel, getSlaInfo, WARDS } from '../../constants';
import { EscalationBadge, StatusBadge } from '../../components/StatusBadge';
import { UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { formatDateTime, formatDurationMs, getMapsPinUrl } from '../../utils/format';

interface OfficerComplaintDetailProps {
  complaintId: string;
  onBack: () => void;
  canAssign?: boolean;
  actorLabel?: string;
}

export const OfficerComplaintDetail: React.FC<OfficerComplaintDetailProps> = ({
  complaintId,
  onBack,
  canAssign = true,
  actorLabel,
}) => {
  const {
    complaints,
    employees,
    loggedInEmployee,
    language,
    t,
    assignComplaint,
    addOfficerDirective,
    showToast,
  } = useApp();

  const rawComplaint = complaints.find((c) => c.id === complaintId);
  const isBlockedDeptOfficer =
    loggedInEmployee?.role === 'dept_officer' &&
    loggedInEmployee.department !== 'all' &&
    rawComplaint &&
    rawComplaint.category !== loggedInEmployee.department;

  const complaint = isBlockedDeptOfficer ? undefined : rawComplaint;
  const fieldStaffList = complaint
    ? employees.filter(
        (e) => e.role === 'field_staff' && e.active && e.department === complaint.category
      )
    : [];

  const [showAssign, setShowAssign] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<string>(
    (complaint?.assignedTo && fieldStaffList.some((s) => s.id === complaint.assignedTo)
      ? complaint.assignedTo
      : fieldStaffList[0]?.id) || ''
  );
  const [assignNote, setAssignNote] = useState('');
  const [directive, setDirective] = useState('');

  if (!complaint) {
    return (
      <div className="p-4">
        <div className={UI.emptyState}>
          <p className="text-sm font-bold text-[var(--mnp-text)]">{t.noComplaintsFound}</p>
          <button type="button" onClick={onBack} className={UI.btnPrimary}>
            {t.back}
          </button>
        </div>
      </div>
    );
  }

  const cat = CATEGORIES.find((c) => c.id === complaint.category);
  const wardObj = WARDS.find((w) => w.id === complaint.ward);
  const assignedEmp = employees.find((e) => e.id === complaint.assignedTo);
  const sla = getSlaInfo(complaint.createdAt, complaint.category, complaint.status);
  const escalation = getEscalationLevel(complaint.createdAt, complaint.category, complaint.status);
  const isAssignable = canAssign && complaint.status !== 'Closed' && complaint.status !== 'Resolved';

  const resolvedActor =
    actorLabel ||
    (loggedInEmployee
      ? `${language === 'hi' ? loggedInEmployee.nameHi : loggedInEmployee.nameEn} (${loggedInEmployee.empCode})`
      : language === 'hi'
      ? 'नगर अधिकारी'
      : 'Municipal Officer');

  const handleSaveAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaff) return;
    assignComplaint(complaint.id, selectedStaff, assignNote, resolvedActor);
    setShowAssign(false);
    setAssignNote('');
  };

  const handleAddDirective = (e: React.FormEvent) => {
    e.preventDefault();
    if (directive.trim().length < 3) return;
    addOfficerDirective(complaint.id, directive, resolvedActor);
    setDirective('');
  };

  return (
    <div className="p-3.5 space-y-3.5">
      <button
        type="button"
        onClick={onBack}
        className="min-h-[40px] px-1 text-xs font-bold text-[var(--mnp-primary)] inline-flex items-center gap-1.5"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.back}</span>
      </button>

      {/* Main Request Summary */}
      <div className={`${UI.card} p-4 space-y-3`}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className={UI.mutedText}>{t.complaintIdLabel}</p>
            <h2 className="text-base font-bold text-[var(--mnp-primary)] tabular-nums">
              {complaint.id}
            </h2>
          </div>
          <StatusBadge status={complaint.status} />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <EscalationBadge level={escalation} />
          <span className="text-[11px] font-semibold text-[var(--mnp-text-muted)] tabular-nums">
            {formatDateTime(complaint.createdAt, language)}
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="text-sm font-bold text-[var(--mnp-text)]">
              {cat ? (language === 'hi' ? cat.labelHi : cat.labelEn) : complaint.category}
            </p>
            {cat && (
              <span className="px-2 py-0.5 rounded-full bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] text-[10px] font-bold">
                {language === 'hi' ? cat.deptHi : cat.deptEn}
              </span>
            )}
          </div>
          <p className={UI.secondaryText}>
            {wardObj
              ? language === 'hi'
                ? wardObj.nameHi
                : wardObj.nameEn
              : `${t.wardLabel} ${complaint.ward}`}
          </p>
          <p className="text-xs text-[var(--mnp-text)] flex items-start gap-1.5 pt-0.5">
            <MapPin className="w-3.5 h-3.5 text-[var(--mnp-primary)] mt-0.5 shrink-0" />
            <span>{complaint.landmark}</span>
          </p>
          {complaint.description && (
            <p className="text-xs text-[var(--mnp-text-secondary)] bg-[var(--mnp-surface-muted)] p-3 rounded-[10px] mt-2 leading-relaxed">
              {complaint.description}
            </p>
          )}
        </div>

        {/* Complainant Contact Box */}
        <div className={`${UI.surfaceMuted} p-3 space-y-1.5 text-xs`}>
          <p className="text-[11px] font-bold text-[var(--mnp-text-muted)]">
            {t.citizenDetailsTitle}
          </p>
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-[var(--mnp-text)] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[var(--mnp-primary)]" />
              <span>{complaint.name}</span>
            </span>
            <a
              href={`tel:${complaint.mobile}`}
              onClick={() =>
                showToast(complaint.name, `${t.simulatedCallNotice} +91 ${complaint.mobile}`, 'Info')
              }
              className="px-2.5 py-1 rounded-full bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] font-bold inline-flex items-center gap-1 tabular-nums"
            >
              <Phone className="w-3 h-3" />
              <span>+91 {complaint.mobile}</span>
            </a>
          </div>
        </div>

        {/* SLA & Assigned Staff */}
        <div className="space-y-2 pt-2 border-t border-[var(--mnp-border)] text-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[var(--mnp-text-muted)] flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" />
              {t.assignedOfficerLabel}
            </span>
            <span className="font-bold text-[var(--mnp-text)] text-right">
              {assignedEmp
                ? `${language === 'hi' ? assignedEmp.nameHi : assignedEmp.nameEn} (${assignedEmp.empCode})`
                : t.unassignedLabel}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-[var(--mnp-text-muted)] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {t.slaDueLabel} ({sla.slaHours} {t.hoursShort})
            </span>
            <span className="font-bold text-[var(--mnp-text)] tabular-nums text-right">
              {formatDateTime(sla.dueDate.toISOString(), language)}
            </span>
          </div>

          {complaint.status !== 'Resolved' && complaint.status !== 'Closed' && (
            <div
              className={`rounded-[10px] px-3 py-2 font-bold flex items-center justify-between gap-2 border ${
                sla.isOverdue
                  ? 'bg-[var(--mnp-error-bg)] text-[var(--mnp-error)] border-[#F5B8B8] dark:border-[#7A272D]'
                  : 'bg-[var(--mnp-success-bg)] text-[var(--mnp-success)] border-[#A7DFBA] dark:border-[#1E5C38]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                {sla.isOverdue ? (
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                )}
                {sla.isOverdue ? t.overdueBy : t.withinSlaFlag}
              </span>
              <span className="tabular-nums">{formatDurationMs(sla.remainingMs, language)}</span>
            </div>
          )}

          {complaint.lat !== undefined && complaint.lng !== undefined && (
            <a
              href={getMapsPinUrl(complaint.lat, complaint.lng)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${UI.btnOutline} w-full text-xs text-[var(--mnp-primary)] flex items-center justify-center gap-1.5`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t.openInMaps}</span>
            </a>
          )}
        </div>

        {/* Inline Assign / Reassign Staff (strictly same-department field staff) */}
        {isAssignable && (
          <div className="pt-2 border-t border-[var(--mnp-border)]">
            {!showAssign ? (
              <button
                type="button"
                onClick={() => {
                  const defaultId = fieldStaffList.some((s) => s.id === complaint.assignedTo)
                    ? complaint.assignedTo!
                    : fieldStaffList[0]?.id || '';
                  setSelectedStaff(defaultId);
                  setShowAssign(true);
                }}
                className={`${UI.btnPrimary} w-full text-xs`}
              >
                {complaint.assignedTo ? t.reassignOfficer : t.assignOfficer}
              </button>
            ) : (
              <form onSubmit={handleSaveAssign} className="space-y-2.5">
                {fieldStaffList.length === 0 ? (
                  <p className={UI.errorText}>{t.noDeptFieldStaff}</p>
                ) : (
                  <>
                    <select
                      value={selectedStaff}
                      onChange={(e) => setSelectedStaff(e.target.value)}
                      className={UI.input}
                    >
                      {fieldStaffList.map((s) => (
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
                    onClick={() => setShowAssign(false)}
                    className={`${UI.btnOutline} text-xs`}
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedStaff || fieldStaffList.length === 0}
                    className={`${UI.btnSuccess} flex-1 text-xs disabled:opacity-50`}
                  >
                    {t.saveAssignmentBtn}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Before and After Photos */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className={`${UI.card} overflow-hidden`}>
          <div className="px-3 py-1.5 text-[11px] font-bold text-[var(--mnp-text-secondary)] border-b border-[var(--mnp-border)] bg-[var(--mnp-surface-muted)]">
            {t.beforePhotoLabel}
          </div>
          {complaint.beforePhoto ? (
            <img
              src={complaint.beforePhoto}
              alt={t.beforePhotoLabel}
              referrerPolicy="no-referrer"
              className="w-full h-32 object-cover"
            />
          ) : (
            <div className="h-32 flex items-center justify-center p-2 text-center text-xs text-[var(--mnp-text-muted)]">
              {t.noPhotoAttached}
            </div>
          )}
        </div>

        <div className={`${UI.card} overflow-hidden`}>
          <div className="px-3 py-1.5 text-[11px] font-bold text-[var(--mnp-text-secondary)] border-b border-[var(--mnp-border)] bg-[var(--mnp-surface-muted)]">
            {t.afterPhotoLabel}
          </div>
          {complaint.afterPhoto ? (
            <img
              src={complaint.afterPhoto}
              alt={t.afterPhotoLabel}
              referrerPolicy="no-referrer"
              className="w-full h-32 object-cover"
            />
          ) : (
            <div className="h-32 flex items-center justify-center p-2 text-center text-xs text-[var(--mnp-text-muted)]">
              {t.noPhotoAttached}
            </div>
          )}
        </div>
      </div>

      {/* Officer Directive / Inspection Remark */}
      <form onSubmit={handleAddDirective} className={`${UI.card} p-3.5 space-y-2.5`}>
        <label
          htmlFor="officer-directive"
          className="text-xs font-bold text-[var(--mnp-text)] flex items-center gap-1.5"
        >
          <MessageSquarePlus className="w-4 h-4 text-[var(--mnp-primary)]" />
          <span>{t.officerDirectiveLabel}</span>
        </label>
        <textarea
          id="officer-directive"
          rows={2}
          value={directive}
          onChange={(e) => setDirective(e.target.value)}
          placeholder={t.officerDirectivePlaceholder}
          className={UI.textarea}
        />
        <button
          type="submit"
          disabled={directive.trim().length < 3}
          className={`${UI.btnAccent} w-full text-xs disabled:opacity-50`}
        >
          {t.addDirectiveBtn}
        </button>
      </form>

      {/* Citizen Rating if present */}
      {complaint.rating !== undefined && (
        <div className={`${UI.card} p-3.5 space-y-1`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--mnp-text-secondary)]">
              {t.citizenRatingLabel}
            </span>
            <div className="flex items-center gap-0.5 tabular-nums">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${
                    s <= (complaint.rating || 0)
                      ? 'fill-[#F59E0B] text-[#D97706]'
                      : 'text-slate-300 dark:text-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
          {complaint.ratingComment && (
            <p className="text-xs text-[var(--mnp-text-secondary)]">{complaint.ratingComment}</p>
          )}
        </div>
      )}

      {/* Status Timeline */}
      <div className={`${UI.card} p-4 space-y-3`}>
        <h3 className={UI.sectionTitle}>{t.timelineTitle}</h3>
        <ol className="space-y-3.5 relative border-l-2 border-[var(--mnp-border)] ml-2 pl-4">
          {complaint.history.map((item, idx) => (
            <li key={idx} className="relative space-y-1">
              <span className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-[var(--mnp-primary)] ring-2 ring-[var(--mnp-surface)]" />
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[var(--mnp-text)]">
                  {t.statusLabels[item.status]}
                </span>
                <span className="text-[11px] text-[var(--mnp-text-muted)] tabular-nums">
                  {formatDateTime(item.time, language)}
                </span>
              </div>
              <p className="text-xs text-[var(--mnp-text-secondary)] leading-snug">{item.note}</p>
              <p className="text-[11px] text-[var(--mnp-text-muted)]">{item.by}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
