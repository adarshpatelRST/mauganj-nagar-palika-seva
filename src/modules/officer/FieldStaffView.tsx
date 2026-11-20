import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  ExternalLink,
  MapPin,
  Play,
} from 'lucide-react';
import { CATEGORIES, getSlaInfo, WARDS } from '../../constants';
import { PhotoPicker } from '../../components/PhotoPicker';
import { StatusBadge } from '../../components/StatusBadge';
import { ICON_CIRCLE_THEMES, UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { formatDateTime, formatDurationMs, getMapsPinUrl } from '../../utils/format';

export const FieldStaffView: React.FC = () => {
  const {
    complaints,
    loggedInEmployee,
    language,
    t,
    startComplaintWork,
    resolveComplaint,
  } = useApp();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [afterPhoto, setAfterPhoto] = useState<string | undefined>(undefined);
  const [remark, setRemark] = useState('');
  const [photoError, setPhotoError] = useState('');
  const [remarkError, setRemarkError] = useState('');

  useEffect(() => {
    setSelectedId(null);
    setAfterPhoto(undefined);
    setRemark('');
    setPhotoError('');
    setRemarkError('');
  }, [loggedInEmployee?.id]);

  const effectiveStaffId =
    loggedInEmployee && loggedInEmployee.role === 'field_staff' ? loggedInEmployee.id : '';

  const staffDept = CATEGORIES.find((c) => c.id === loggedInEmployee?.department);

  const staffDisplayName = loggedInEmployee
    ? language === 'hi'
      ? loggedInEmployee.nameHi
      : loggedInEmployee.nameEn
    : language === 'hi'
    ? 'फील्ड स्टाफ'
    : 'Field Staff';

  // Strict assignee scoping: field staff only see complaints assigned directly to them
  const myTasks = useMemo(() => {
    if (!effectiveStaffId) return [];
    const now = Date.now();
    return complaints
      .filter((c) => c.assignedTo === effectiveStaffId && c.status !== 'Closed')
      .map((c) => ({
        complaint: c,
        sla: getSlaInfo(c.createdAt, c.category, c.status, now),
      }))
      .sort((a, b) => {
        const aDone = a.complaint.status === 'Resolved' ? 1 : 0;
        const bDone = b.complaint.status === 'Resolved' ? 1 : 0;
        if (aDone !== bDone) return aDone - bDone;
        return a.sla.remainingMs - b.sla.remainingMs;
      });
  }, [complaints, effectiveStaffId]);

  const selectedComplaint =
    selectedId && effectiveStaffId
      ? complaints.find((c) => c.id === selectedId && c.assignedTo === effectiveStaffId) || null
      : null;

  if (!loggedInEmployee || loggedInEmployee.role !== 'field_staff') {
    return null;
  }

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    let hasErr = false;
    if (!afterPhoto) {
      setPhotoError(t.errAfterPhotoRequired);
      hasErr = true;
    } else {
      setPhotoError('');
    }
    if (remark.trim().length < 5) {
      setRemarkError(t.errRemarkRequired);
      hasErr = true;
    } else {
      setRemarkError('');
    }
    if (hasErr) return;

    resolveComplaint(selectedComplaint.id, afterPhoto!, remark, staffDisplayName);
    setAfterPhoto(undefined);
    setRemark('');
    setSelectedId(null);
  };

  if (selectedComplaint) {
    const cat = CATEGORIES.find((c) => c.id === selectedComplaint.category);
    const wardObj = WARDS.find((w) => w.id === selectedComplaint.ward);
    const sla = getSlaInfo(
      selectedComplaint.createdAt,
      selectedComplaint.category,
      selectedComplaint.status
    );
    const canStart =
      selectedComplaint.status === 'Assigned' || selectedComplaint.status === 'Reopened';
    const canResolve =
      selectedComplaint.status === 'In progress' ||
      selectedComplaint.status === 'Assigned' ||
      selectedComplaint.status === 'Reopened';

    return (
      <div className="p-3.5 space-y-3.5">
        <button
          type="button"
          onClick={() => {
            setSelectedId(null);
            setPhotoError('');
            setRemarkError('');
          }}
          className="min-h-[40px] px-1 text-xs font-bold text-[var(--mnp-primary)]"
        >
          ← {t.myTasksTab}
        </button>

        {/* Task Header Card */}
        <div className={`${UI.card} p-4 space-y-2.5`}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-sm font-bold text-[var(--mnp-primary)] tabular-nums">
                {selectedComplaint.id}
              </div>
              <div className="text-sm font-bold text-[var(--mnp-text)] mt-0.5">
                {cat ? (language === 'hi' ? cat.labelHi : cat.labelEn) : selectedComplaint.category}
              </div>
            </div>
            <StatusBadge status={selectedComplaint.status} />
          </div>

          <p className={UI.secondaryText}>
            {wardObj
              ? language === 'hi'
                ? wardObj.nameHi
                : wardObj.nameEn
              : `${t.wardLabel} ${selectedComplaint.ward}`}
          </p>
          <p className="text-xs text-[var(--mnp-text)] flex items-start gap-1.5">
            <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--mnp-primary)]" />
            <span>{selectedComplaint.landmark}</span>
          </p>
          {selectedComplaint.description && (
            <p className="text-xs text-[var(--mnp-text-secondary)] bg-[var(--mnp-surface-muted)] p-3 rounded-[10px]">
              {selectedComplaint.description}
            </p>
          )}

          {selectedComplaint.status !== 'Resolved' && (
            <div
              className={`rounded-[10px] px-3 py-2 text-xs font-bold flex items-center justify-between border ${
                sla.isOverdue
                  ? 'bg-[var(--mnp-error-bg)] text-[var(--mnp-error)] border-[#F5B8B8] dark:border-[#7A272D]'
                  : 'bg-[var(--mnp-info-bg)] text-[var(--mnp-info)] border-[#B9D6F7] dark:border-[#244B7A]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                {sla.isOverdue ? (
                  <AlertTriangle className="w-4 h-4" />
                ) : (
                  <Clock className="w-4 h-4" />
                )}
                {sla.isOverdue ? t.overdueBy : t.timeRemaining}
              </span>
              <span className="tabular-nums">{formatDurationMs(sla.remainingMs, language)}</span>
            </div>
          )}

          {selectedComplaint.beforePhoto && (
            <div className="space-y-1 pt-1">
              <p className={UI.mutedText}>{t.beforePhotoLabel}</p>
              <img
                src={selectedComplaint.beforePhoto}
                alt={t.beforePhotoLabel}
                referrerPolicy="no-referrer"
                className="w-full h-40 object-cover rounded-[10px] border border-[var(--mnp-border)]"
              />
            </div>
          )}

          {selectedComplaint.lat !== undefined && selectedComplaint.lng !== undefined && (
            <a
              href={getMapsPinUrl(selectedComplaint.lat, selectedComplaint.lng)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${UI.btnOutline} w-full text-xs text-[var(--mnp-primary)] flex items-center justify-center gap-1.5`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t.openInMaps}</span>
            </a>
          )}

          {canStart && (
            <button
              type="button"
              onClick={() => startComplaintWork(selectedComplaint.id, staffDisplayName)}
              className={`${UI.btnPrimary} w-full flex items-center justify-center gap-2`}
            >
              <Play className="w-4 h-4" />
              <span>{t.startWorkBtn}</span>
            </button>
          )}
        </div>

        {/* Mark Resolved Form */}
        {canResolve && (
          <form
            onSubmit={handleResolveSubmit}
            className="rounded-[12px] border border-[#A7DFBA] dark:border-[#1E5C38] bg-[var(--mnp-surface)] shadow-[var(--mnp-shadow-card)] p-4 space-y-3.5"
          >
            <h3 className={`${UI.sectionTitle} flex items-center gap-1.5`}>
              <CheckCircle2 className="w-4 h-4 text-[var(--mnp-success)]" />
              <span>{t.markResolvedTitle}</span>
            </h3>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[var(--mnp-text-secondary)]">
                {t.afterPhotoRequiredLabel} *
              </label>
              <PhotoPicker
                value={afterPhoto}
                onChange={(val) => {
                  setAfterPhoto(val);
                  if (val) setPhotoError('');
                }}
                mode="after"
                error={photoError}
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="resolve-remark"
                className="block text-xs font-bold text-[var(--mnp-text-secondary)]"
              >
                {t.resolutionRemarkLabel} *
              </label>
              <textarea
                id="resolve-remark"
                rows={3}
                value={remark}
                onChange={(e) => {
                  setRemark(e.target.value);
                  setRemarkError('');
                }}
                placeholder={t.resolutionRemarkPlaceholder}
                className={UI.textarea}
              />
              {remarkError && (
                <p className={UI.errorText} role="alert">
                  {remarkError}
                </p>
              )}
            </div>

            <button type="submit" className={`${UI.btnSuccess} w-full`}>
              {t.markResolvedBtn}
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="p-3.5 space-y-3.5">
      {/* Logged-in Field Staff Identity & Department Card */}
      <div className={`${UI.card} p-3.5 space-y-2`}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-bold text-[var(--mnp-primary)] tabular-nums">
              {loggedInEmployee.empCode}
            </p>
            <p className="text-sm font-bold text-[var(--mnp-text)] truncate">{staffDisplayName}</p>
            {staffDept && (
              <p className="text-[11px] font-semibold text-[var(--mnp-text-secondary)] flex items-center gap-1 mt-0.5 truncate">
                <Building2 className="w-3.5 h-3.5 text-[var(--mnp-primary)] shrink-0" />
                <span className="truncate">
                  {language === 'hi' ? staffDept.deptHi : staffDept.deptEn}
                </span>
              </p>
            )}
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[var(--mnp-primary-soft)] text-[var(--mnp-primary)] text-xs font-bold tabular-nums shrink-0">
            {myTasks.length} {t.myTasksTab}
          </span>
        </div>
        <p className="text-[11px] text-[var(--mnp-text-muted)] leading-snug">
          {t.staffScopeNote}
        </p>
      </div>

      {myTasks.length === 0 ? (
        <div className={UI.emptyState}>
          <p className="text-sm font-bold text-[var(--mnp-text)]">{t.noAssignedTasks}</p>
          <p className={UI.mutedText}>{t.noAssignedTasksHint}</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {myTasks.map(({ complaint, sla }) => {
            const cat = CATEGORIES.find((c) => c.id === complaint.category);
            return (
              <button
                key={complaint.id}
                type="button"
                onClick={() => {
                  setSelectedId(complaint.id);
                  setAfterPhoto(undefined);
                  setRemark('');
                  setPhotoError('');
                  setRemarkError('');
                }}
                className={`w-full rounded-[12px] border p-3 text-left space-y-2 transition-colors shadow-[var(--mnp-shadow-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] ${
                  sla.isOverdue
                    ? 'border-[#F5B8B8] dark:border-[#7A272D] bg-[var(--mnp-error-bg)]'
                    : 'border-[var(--mnp-border)] bg-[var(--mnp-surface)] hover:border-[var(--mnp-primary)]'
                }`}
              >
                <div className="flex items-start gap-3">
                  {complaint.beforePhoto ? (
                    <img
                      src={complaint.beforePhoto}
                      alt={complaint.id}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-[8px] object-cover shrink-0 bg-[var(--mnp-surface-muted)]"
                    />
                  ) : (
                    <span
                      className={`w-12 h-12 rounded-[8px] flex items-center justify-center shrink-0 ${ICON_CIRCLE_THEMES.blue}`}
                    >
                      <ClipboardList className="w-5 h-5" />
                    </span>
                  )}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-[var(--mnp-primary)] tabular-nums truncate">
                        {complaint.id} · {t.wardLabel} {complaint.ward}
                      </span>
                      <StatusBadge status={complaint.status} />
                    </div>
                    <div className="text-sm font-bold text-[var(--mnp-text)] truncate">
                      {cat ? (language === 'hi' ? cat.labelHi : cat.labelEn) : complaint.category}
                    </div>
                    <p className="text-xs text-[var(--mnp-text-muted)] truncate">
                      {complaint.landmark}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--mnp-border)] text-xs">
                  {complaint.status === 'Resolved' ? (
                    <span className="text-[var(--mnp-success)] font-bold">
                      {formatDateTime(
                        complaint.history[complaint.history.length - 1].time,
                        language
                      )}
                    </span>
                  ) : (
                    <span
                      className={`font-bold flex items-center gap-1 tabular-nums ${
                        sla.isOverdue ? 'text-[var(--mnp-error)]' : 'text-[var(--mnp-text-secondary)]'
                      }`}
                    >
                      {sla.isOverdue ? (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                      {sla.isOverdue ? t.overdueBy : t.timeRemaining}{' '}
                      {formatDurationMs(sla.remainingMs, language)}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-[var(--mnp-text-muted)]" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
