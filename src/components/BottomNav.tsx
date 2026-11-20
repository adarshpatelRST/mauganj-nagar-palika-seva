import React from 'react';
import { Compass, Grid2X2, Home, PlusCircle, User } from 'lucide-react';
import { CitizenTab } from '../types';
import { useApp } from '../store/AppContext';

interface BottomNavProps {
  activeTab: CitizenTab;
  onSelectTab: (tab: CitizenTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const { t } = useApp();

  const items: {
    id: CitizenTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'report', label: t.navReport, icon: PlusCircle },
    { id: 'services', label: t.navServices, icon: Grid2X2 },
    { id: 'nearby', label: t.navNearby, icon: Compass },
    { id: 'profile', label: t.navProfile, icon: User },
  ];

  return (
    <nav
      aria-label="Primary navigation"
      className="bg-[#2196F3] dark:bg-[#1565C0] shadow-[var(--mnp-shadow-nav)] grid grid-cols-5 shrink-0 z-20 px-1 py-1"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const active = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTab(item.id)}
            aria-current={active ? 'page' : undefined}
            className="min-h-[56px] flex flex-col items-center justify-center gap-1 px-0.5 rounded-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
          >
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                active
                  ? 'bg-white text-[#2196F3] dark:text-[#1565C0] shadow-xs'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
            </span>
            <span
              className={`text-[11px] leading-tight whitespace-nowrap truncate max-w-full ${
                active ? 'font-bold text-white' : 'font-medium text-white/85'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
