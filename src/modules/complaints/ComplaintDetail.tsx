import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Lock,
  MapPin,
  RotateCcw,
  Shield,
  Star,
  UserCheck,
} from 'lucide-react';
import { CATEGORIES, getSlaInfo, WARDS } from '../../constants';
import { StatusBadge } from '../../components/StatusBadge';
import { UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { formatDateTime, formatDurationMs, getMapsPinUrl } from '../../utils/format';

interface ComplaintDetailProps {
  complaintId: string;
  onBack: () => void;
}

export const ComplaintDetail: React.FC<ComplaintDetailProps> = ({ complaintId, onBack }) => {
  const { complaints, citizen, employees, language, t, rateComplaint, reopenComplaint } = useApp();
  const complaint = complaints.find((c) => c.id === complaintId && c.mobile === citizen.mobile);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showReopen, setShowReopen] = useState(false);
  const [reopenReason, setReopenReason] = useState('');
  const [formError, setFormError] = useState('');

  if (!complaint) {
    return (
      <div className="p-4">
        <div className={`${UI.card} p-5 text-center space-y-3`}>
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-[var(--mnp-text)]">
            {language === 'hi' ? 'गोपनीयता सुरक्षा: पहुंच प्रतिबंधित' : 'Privacy Protection: Access Restricted'}
          </h2>
          <p className="text-xs text-[var(--mnp-text-muted)] max-w-sm mx-auto">
            {language === 'hi'
              ? `शिकायत संख्या (${complaintId}) आपके पंजीकृत मोबाइल नंबर (+91 ${citizen.mobile}) से दर्ज नहीं है। नागरिक सुरक्षा नीति के तहत आप केवल अपने द्वारा दर्ज शिकायतें ही देख व ट्रैक कर सकते हैं।`
              : `Complaint (${complaintId}) was not filed by your registered mobile (+91 ${citizen.mobile}). For citizen privacy and data protection, you can only view complaints registered by your account.`}
          </p>
          <div className="pt-2">
            <button type="button" onClick={onBack} className={UI.btnPrimary}>
              {t.back}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const cat = CATEGORIES.find((c) => c.id === complaint.category);
  const wardObj = WARDS.find((w) => w.id === complaint.ward);
  const staff = employees.find((s) => s.id === complaint.assignedTo);
  const sla = getSlaInfo(complaint.createdAt, complaint.category, complaint.status);

  const handleSubmitRating = () => {
    if (rating < 1) {
      setFormError(t.errSelectRating);
      return;
    }
    setFormError('');
    rateComplaint(complaint.id, rating, comment);
  };

  const handleConfirmReopen = () => {
    if (reopenReason.trim().length < 5) {
      setFormError(t.errEnterReopenReason);
      return;
    }
    setFormError('');
    reopenComplaint(complaint.id, reopenReason);
    setShowReopen(false);
    setReopenReason('');
  };

  return (
    <div className="p-3.5 space-y-3.5">
      {/* Header Summary Card */}
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

        <div className="space-y-1">
          <p className="text-sm font-bold text-[var(--mnp-text)]">
            {cat ? (language === 'hi' ? cat.labelHi : cat.labelEn) : complaint.category}
          </p>
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

        {/* Officer & SLA Details */}
        <div className="grid grid-cols-1 gap-2 pt-2.5 border-t border-[var(--mnp-border)] text-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[var(--mnp-text-muted)] flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" />
              {t.assignedOfficerLabel}
            </span>
            <span className="font-bold text-[var(--mnp-text)] text-right">
              {staff
                ? language === 'hi'
                  ? staff.nameHi
                  : staff.nameEn
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
              className={`rounded-[10px] px-3 py-2 font-bold flex items-center justify-between gap-2 border ${sla.isOverdue
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
                {sla.isOverdue ? t.overdueFlag : t.withinSlaFlag}
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

      {/* Citizen Rating or Reopen Box */}
      {complaint.status === 'Resolved' && (
        <div className="rounded-[12px] border border-[#A7DFBA] dark:border-[#1E5C38] bg-[var(--mnp-success-bg)] p-4 space-y-3 shadow-[var(--mnp-shadow-card)]">
          <div>
            <h3 className="text-sm font-bold text-[var(--mnp-text)]">{t.feedbackPromptTitle}</h3>
            <p className="text-xs text-[var(--mnp-text-secondary)] mt-0.5">
              {t.feedbackPromptBody}
            </p>
          </div>

          {!showReopen ? (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[var(--mnp-text-secondary)]">
                  {t.rateExperience}
                </span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        setRating(star);
                        setFormError('');
                      }}
                      aria-label={`${star} star`}
                      className="min-h-[48px] min-w-[48px] rounded-[10px] border border-[var(--mnp-border)] bg-[var(--mnp-surface)] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)]"
                    >
                      <Star
                        className={`w-6 h-6 ${star <= rating
                            ? 'fill-[#F59E0B] text-[#D97706]'
                            : 'text-slate-300 dark:text-slate-600'
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.feedbackCommentPlaceholder}
                className={UI.textarea}
              />

              {formError && (
                <p className={UI.errorText} role="alert">
                  {formError}
                </p>
              )}

              <button
                type="button"
                onClick={handleSubmitRating}
                className={`${UI.btnSuccess} w-full`}
              >
                {t.submitRatingBtn}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowReopen(true);
                  setFormError('');
                }}
                className={`${UI.btnDangerOutline} w-full text-xs flex items-center justify-center gap-1.5`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.reopenComplaintBtn}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <textarea
                rows={3}
                value={reopenReason}
                onChange={(e) => {
                  setReopenReason(e.target.value);
                  setFormError('');
                }}
                placeholder={t.reopenReasonPlaceholder}
                className={UI.textarea}
              />
              {formError && (
                <p className={UI.errorText} role="alert">
                  {formError}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowReopen(false);
                    setFormError('');
                  }}
                  className={UI.btnOutline}
                >
                  {t.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReopen}
                  className="flex-1 min-h-[48px] rounded-[10px] bg-[var(--mnp-error)] text-white text-xs font-bold"
                >
                  {t.confirmReopenBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Existing Citizen Rating */}
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
                  className={`w-4 h-4 ${s <= (complaint.rating || 0)
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
