import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ChevronRight,
  ClipboardList,
  Lock,
  PlusCircle,
  Search,
} from 'lucide-react';
import { CATEGORIES, getSlaInfo } from '../../constants';
import { StatusBadge } from '../../components/StatusBadge';
import { ICON_CIRCLE_THEMES, UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { ComplaintStatus } from '../../types';
import { formatDateTime } from '../../utils/format';

interface ComplaintListProps {
  onSelectComplaint: (id: string) => void;
  onReportNew: () => void;
}

export const ComplaintList: React.FC<ComplaintListProps> = ({
  onSelectComplaint,
  onReportNew,
}) => {
  const { complaints, citizen, language, t } = useApp();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | 'all'>('all');

  // Strict privacy: citizens only see complaints submitted under their own mobile number
  const myComplaints = useMemo(
    () => complaints.filter((c) => c.mobile === citizen.mobile),
    [complaints, citizen.mobile]
  );

  const filtered = useMemo(() => {
    return myComplaints.filter((c) => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const matchId = c.id.toLowerCase().includes(q);
        const matchLandmark = c.landmark.toLowerCase().includes(q);
        if (!matchId && !matchLandmark) return false;
      }
      return true;
    });
  }, [myComplaints, statusFilter, query]);

  const statusTabs: (ComplaintStatus | 'all')[] = [
    'all',
    'Registered',
    'Assigned',
    'In progress',
    'Resolved',
    'Closed',
    'Reopened',
  ];

  return (
    <div className="p-4 space-y-3.5">
      {/* Privacy Banner - Only User's Own Complaints */}
      <div className="rounded-[12px] bg-[var(--mnp-primary-soft)] border border-[var(--mnp-primary)]/20 p-2.5 flex items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-full bg-[var(--mnp-primary)] text-white flex items-center justify-center shrink-0">
            <Lock className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-[var(--mnp-text)] truncate">
              {language === 'hi'
                ? `सुरक्षित ट्रैकिंग: +91 ${citizen.mobile}`
                : `Private Tracking: +91 ${citizen.mobile}`}
            </p>
            <p className="text-[11px] text-[var(--mnp-text-muted)] truncate">
              {t.myComplaintsOnlyNote}
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[var(--mnp-surface)] text-[var(--mnp-primary)] border border-[var(--mnp-primary)]/30 text-xs font-bold tabular-nums shrink-0 shadow-xs">
          {myComplaints.length}
        </span>
      </div>

      {/* Clean Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[var(--mnp-primary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchByIdPlaceholder}
          className={`${UI.input} pl-10 bg-[var(--mnp-surface)] shadow-xs`}
        />
      </div>

      {/* Clean Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {statusTabs.map((st) => {
          const active = statusFilter === st;
          return (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={active ? UI.chipActive : UI.chipInactive}
            >
              {st === 'all' ? t.all : t.statusLabels[st]}
            </button>
          );
        })}
      </div>

      {/* Clean Floating Complaint Cards */}
      {filtered.length === 0 ? (
        <div className={UI.emptyState}>
          <p className="text-sm font-bold text-[var(--mnp-text)]">{t.noComplaintsFound}</p>
          <p className={UI.mutedText}>{t.noComplaintsHint}</p>
          <div className="flex justify-center gap-2 pt-1">
            {(query || statusFilter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setStatusFilter('all');
                }}
                className={UI.btnOutline}
              >
                {t.clearFilter}
              </button>
            )}
            <button
              type="button"
              onClick={onReportNew}
              className={`${UI.btnPrimary} flex items-center gap-1.5`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.reportProblemCta}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => {
            const cat = CATEGORIES.find((x) => x.id === c.category);
            const sla = getSlaInfo(c.createdAt, c.category, c.status);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelectComplaint(c.id)}
                className={`${UI.cardInteractive} w-full p-4 text-left space-y-3`}
              >
                <div className="flex items-start gap-3">
                  {c.beforePhoto ? (
                    <img
                      src={c.beforePhoto}
                      alt={c.id}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-[12px] object-cover shrink-0 bg-[var(--mnp-surface-muted)]"
                    />
                  ) : (
                    <div
                      className={`w-14 h-14 rounded-[12px] flex items-center justify-center shrink-0 ${ICON_CIRCLE_THEMES.blue}`}
                    >
                      <ClipboardList className="w-6 h-6" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-[var(--mnp-text)] leading-snug truncate">
                        {cat ? (language === 'hi' ? cat.labelHi : cat.labelEn) : c.category}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[var(--mnp-text-muted)] shrink-0" />
                    </div>
                    <p className="text-xs text-[var(--mnp-text-secondary)] truncate">
                      {c.landmark} · {t.wardLabel} {c.ward}
                    </p>
                    {c.description && (
                      <p className="text-xs text-[var(--mnp-text-muted)] line-clamp-1">
                        {c.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-[var(--mnp-border)] gap-2">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={c.status} />
                    {sla.isOverdue && (
                      <span className="text-[11px] text-[var(--mnp-error)] font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {t.overdueFlag}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[var(--mnp-text-muted)] tabular-nums shrink-0">
                    {c.id} · {formatDateTime(c.createdAt, language).split(',')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
