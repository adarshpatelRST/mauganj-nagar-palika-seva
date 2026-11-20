import React from 'react';
import { Bell, MessageSquare, X } from 'lucide-react';
import { ICON_CIRCLE_THEMES } from '../theme/tokens';
import { useApp } from '../store/AppContext';

export const NotificationToast: React.FC = () => {
  const { toast, dismissToast } = useApp();
  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute top-[64px] left-3 right-3 z-50 rounded-[12px] border border-[var(--mnp-primary)] bg-[var(--mnp-surface)] shadow-lg p-3 flex items-start gap-2.5"
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          toast.channel === 'SMS' ? ICON_CIRCLE_THEMES.saffron : ICON_CIRCLE_THEMES.blue
        }`}
      >
        {toast.channel === 'SMS' ? (
          <MessageSquare className="w-4 h-4" />
        ) : (
          <Bell className="w-4 h-4" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--mnp-primary)]">
          {toast.channel && toast.channel !== 'Info' && <span>[{toast.channel}]</span>}
          <span className="truncate">{toast.title}</span>
        </div>
        {toast.body && (
          <p className="mt-0.5 text-xs text-[var(--mnp-text-secondary)] leading-snug">
            {toast.body}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={dismissToast}
        aria-label="Dismiss"
        className="min-h-[36px] min-w-[36px] -mr-1 -mt-1 flex items-center justify-center rounded-full text-[var(--mnp-text-muted)] hover:bg-[var(--mnp-surface-muted)] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)]"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
