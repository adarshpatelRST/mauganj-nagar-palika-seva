import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useApp } from '../store/AppContext';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const { t } = useApp();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="bg-amber-600 text-white px-3 py-2 text-xs font-medium flex items-center gap-2"
    >
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>{t.offlineBanner}</span>
    </div>
  );
};
