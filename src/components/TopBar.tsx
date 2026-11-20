import React from 'react';
import { ArrowLeft, Bell, Landmark } from 'lucide-react';
import { useApp } from '../store/AppContext';

interface TopBarProps {
  title: string;
  onBack?: () => void;
  onOpenNotifications?: () => void;
  rightAction?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  onBack,
  onOpenNotifications,
  rightAction,
}) => {
  const { language, setLanguage, notifications, complaints, citizen, t } = useApp();
  const myComplaintIds = new Set(
    complaints.filter((c) => c.mobile === citizen.mobile).map((c) => c.id)
  );
  const unreadCount = notifications.filter((n) => {
    if (n.read) return false;
    if (n.targetMobile) return n.targetMobile === citizen.mobile;
    if (n.complaintId) return myComplaintIds.has(n.complaintId);
    return true;
  }).length;

  return (
    <header className="bg-[#2196F3] dark:bg-[#1565C0] text-white px-3 h-[56px] flex items-center justify-between gap-2 shrink-0 shadow-[var(--mnp-shadow-header)] z-20">
      <div className="flex items-center gap-2 min-w-0">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label={t.back}
            className="min-h-[48px] min-w-[44px] -ml-1.5 flex items-center justify-center rounded-full hover:bg-white/15 active:bg-white/25 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div
            aria-hidden="true"
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"
          >
            <Landmark className="w-4 h-4 text-white" />
          </div>
        )}
        <h1 className="text-[16px] font-bold tracking-tight truncate">{title}</h1>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {rightAction}
        <button
          type="button"
          onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
          className="min-h-[38px] px-2.5 rounded-full bg-white/20 text-xs font-bold hover:bg-white/30 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={t.languageLabel}
        >
          {language === 'hi' ? 'EN' : 'हिन्दी'}
        </button>
        {onOpenNotifications && (
          <button
            type="button"
            onClick={onOpenNotifications}
            aria-label={t.notificationsTitle}
            className="relative min-h-[48px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-white/15 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-1.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#D32F2F] text-white border border-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
};
