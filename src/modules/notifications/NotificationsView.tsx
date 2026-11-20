import React from 'react';
import { Bell, CheckCheck, MessageSquare } from 'lucide-react';
import { ICON_CIRCLE_THEMES, UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { formatDateTime } from '../../utils/format';

interface NotificationsViewProps {
  onOpenComplaint: (id: string) => void;
  onReportNew: () => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  onOpenComplaint,
  onReportNew,
}) => {
  const {
    notifications,
    complaints,
    citizen,
    language,
    t,
    markAllNotificationsRead,
    markNotificationRead,
  } = useApp();

  const myComplaintIds = new Set(
    complaints.filter((c) => c.mobile === citizen.mobile).map((c) => c.id)
  );
  const visibleNotifications = notifications.filter((n) => {
    if (n.targetMobile) return n.targetMobile === citizen.mobile;
    if (n.complaintId) return myComplaintIds.has(n.complaintId);
    return true;
  });

  const hasUnread = visibleNotifications.some((n) => !n.read);

  return (
    <div className="p-3.5 space-y-3.5">
      <div className="flex items-center justify-between gap-2">
        <p className={UI.mutedText}>{t.simulatedSmsPushNote}</p>
        {hasUnread && (
          <button
            type="button"
            onClick={markAllNotificationsRead}
            className="min-h-[40px] px-2.5 rounded-full text-xs font-bold text-[var(--mnp-primary)] hover:bg-[var(--mnp-primary-soft)] flex items-center gap-1 whitespace-nowrap shrink-0"
          >
            <CheckCheck className="w-4 h-4" />
            <span>{t.markAllRead}</span>
          </button>
        )}
      </div>

      {visibleNotifications.length === 0 ? (
        <div className={UI.emptyState}>
          <p className="text-sm font-bold text-[var(--mnp-text)]">{t.noNotifications}</p>
          <p className={UI.mutedText}>{t.noNotificationsHint}</p>
          <button type="button" onClick={onReportNew} className={UI.btnAccent}>
            {t.reportProblemCta}
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {visibleNotifications.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => {
                markNotificationRead(n.id);
                if (n.complaintId) onOpenComplaint(n.complaintId);
              }}
              className={`w-full rounded-[12px] border p-3.5 text-left transition-colors shadow-[var(--mnp-shadow-card)] flex items-start gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] ${
                n.read
                  ? 'border-[var(--mnp-border)] bg-[var(--mnp-surface)]'
                  : 'border-[var(--mnp-primary)] bg-[var(--mnp-primary-soft)]'
              }`}
            >
              <span
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  n.channel === 'SMS' ? ICON_CIRCLE_THEMES.saffron : ICON_CIRCLE_THEMES.blue
                }`}
              >
                {n.channel === 'SMS' ? (
                  <MessageSquare className="w-4 h-4" />
                ) : (
                  <Bell className="w-4 h-4" />
                )}
              </span>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2 text-[11px] text-[var(--mnp-text-muted)]">
                  <span className="font-bold text-[var(--mnp-primary)]">
                    {n.channel} · {t.sampleTag}
                  </span>
                  <span className="tabular-nums">{formatDateTime(n.time, language)}</span>
                </div>
                <div className="text-sm font-bold text-[var(--mnp-text)] leading-snug">
                  {language === 'hi' ? n.titleHi : n.titleEn}
                </div>
                <p className="text-xs text-[var(--mnp-text-secondary)] leading-snug">
                  {language === 'hi' ? n.bodyHi : n.bodyEn}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
