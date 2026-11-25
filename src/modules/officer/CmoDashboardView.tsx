import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  ChevronRight,
  ClipboardList,
  Download,
  Eye,
  FileText,
  Filter,
  IndianRupee,
  Search,
  Star,
} from 'lucide-react';
import {
  CATEGORIES,
  CATEGORY_SLA_MAP,
  getEscalationLevel,
  getSlaInfo,
  WARDS,
} from '../../constants';
import { EscalationBadge, StatusBadge } from '../../components/StatusBadge';
import { ICON_CIRCLE_THEMES, UI } from '../../theme/tokens';
import { useApp } from '../../store/AppContext';
import { ComplaintCategoryId, ComplaintStatus } from '../../types';
import { formatDateTime, formatDurationMs } from '../../utils/format';
import { OfficerComplaintDetail } from './OfficerComplaintDetail';

interface CmoDashboardViewProps {
  role?: 'cmo' | 'mayor';
}

export const CmoDashboardView: React.FC<CmoDashboardViewProps> = ({ role = 'cmo' }) => {
  const { complaints, employees, payments, notices, language, t, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'analytics' | 'requests'>('analytics');
  const [viewingId, setViewingId] = useState<string | null>(null);

  // All Requests filter state
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<ComplaintCategoryId | 'all'>('all');
  const [wardFilter, setWardFilter] = useState<number | 'all'>('all');
  const [overdueOnly, setOverdueOnly] = useState(false);

  const stats = useMemo(() => {
    const now = Date.now();
    const total = complaints.length;
    const pendingList = complaints.filter(
      (c) => c.status !== 'Resolved' && c.status !== 'Closed'
    );
    const pending = pendingList.length;

    const overdueWithMeta = pendingList
      .map((c) => ({
        complaint: c,
        sla: getSlaInfo(c.createdAt, c.category, c.status, now),
        escalation: getEscalationLevel(c.createdAt, c.category, c.status, now),
      }))
      .filter((x) => x.sla.isOverdue)
      .sort((a, b) => a.sla.remainingMs - b.sla.remainingMs);

    const overdue = overdueWithMeta.length;

    const resolvedOrClosed = complaints.filter(
      (c) => c.status === 'Resolved' || c.status === 'Closed'
    );
    const resolvedWithinSla = resolvedOrClosed.filter((c) => {
      const resolvedEvent =
        [...c.history].reverse().find((h) => h.status === 'Resolved') ||
        c.history[c.history.length - 1];
      const elapsedHrs =
        (new Date(resolvedEvent.time).getTime() - new Date(c.createdAt).getTime()) /
        (60 * 60 * 1000);
      return elapsedHrs <= CATEGORY_SLA_MAP[c.category];
    }).length;

    const slaPct =
      resolvedOrClosed.length > 0
        ? Math.round((resolvedWithinSla / resolvedOrClosed.length) * 100)
        : 0;

    const rated = complaints.filter((c) => typeof c.rating === 'number');
    const avgRating =
      rated.length > 0
        ? (rated.reduce((sum, c) => sum + (c.rating || 0), 0) / rated.length).toFixed(1)
        : '—';

    const byCategory = CATEGORIES.map((cat) => ({
      cat,
      count: complaints.filter((c) => c.category === cat.id).length,
    }));
    const maxCatCount = Math.max(1, ...byCategory.map((b) => b.count));

    const wardRows = WARDS.map((w) => {
      const list = complaints.filter((c) => c.ward === w.id);
      const wPending = list.filter((c) => c.status !== 'Resolved' && c.status !== 'Closed');
      const wOverdue = wPending.filter(
        (c) => getSlaInfo(c.createdAt, c.category, c.status, now).isOverdue
      );
      const wResolved = list.filter((c) => c.status === 'Resolved' || c.status === 'Closed');
      return {
        ward: w.id,
        total: list.length,
        pending: wPending.length,
        overdue: wOverdue.length,
        resolved: wResolved.length,
      };
    }).filter((r) => r.total > 0);

    const taxTotal = payments.reduce((sum, p) => sum + p.amount, 0);

    return {
      total,
      pending,
      overdue,
      slaPct,
      avgRating,
      byCategory,
      maxCatCount,
      wardRows,
      top5Overdue: overdueWithMeta.slice(0, 5),
      taxTotal,
    };
  }, [complaints, payments]);

  const filteredRequests = useMemo(() => {
    const now = Date.now();
    return complaints
      .map((c) => ({
        c,
        sla: getSlaInfo(c.createdAt, c.category, c.status, now),
        escalation: getEscalationLevel(c.createdAt, c.category, c.status, now),
      }))
      .filter(({ c, sla }) => {
        if (statusFilter !== 'all' && c.status !== statusFilter) return false;
        if (categoryFilter !== 'all' && c.category !== categoryFilter) return false;
        if (wardFilter !== 'all' && c.ward !== wardFilter) return false;
        if (overdueOnly && !sla.isOverdue) return false;
        if (query.trim()) {
          const q = query.trim().toLowerCase();
          if (
            !c.id.toLowerCase().includes(q) &&
            !c.landmark.toLowerCase().includes(q) &&
            !c.name.toLowerCase().includes(q) &&
            !c.mobile.includes(q)
          ) {
            return false;
          }
        }
        return true;
      });
  }, [complaints, statusFilter, categoryFilter, wardFilter, overdueOnly, query]);

  if (viewingId) {
    return (
      <OfficerComplaintDetail
        complaintId={viewingId}
        onBack={() => setViewingId(null)}
        canAssign={true}
      />
    );
  }

  const handleExportCsv = () => {
    const headers = [
      'ID',
      'Citizen',
      'Mobile',
      'Ward',
      'Category',
      'Status',
      'Landmark',
      'CreatedAt',
      'AssignedTo',
      'Rating',
    ];
    const rows = complaints.map((c) => {
      const emp = employees.find((e) => e.id === c.assignedTo);
      return [
        c.id,
        `"${c.name.replace(/"/g, '""')}"`,
        c.mobile,
        String(c.ward),
        c.category,
        c.status,
        `"${c.landmark.replace(/"/g, '""')}"`,
        c.createdAt,
        emp ? emp.empCode : c.assignedTo || 'Unassigned',
        c.rating !== undefined ? String(c.rating) : '',
      ];
    });
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mauganj-${role}-complaints-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(t.exportCsvBtn, t.csvExportedToast, 'Info');
  };

  return (
    <div className="p-3.5 space-y-4">
      {/* Segmented Switcher: Analytics vs All Requests */}
      <div className="grid grid-cols-2 gap-1 p-1 rounded-[12px] bg-[var(--mnp-surface)] border border-[var(--mnp-border)] shadow-[var(--mnp-shadow-card)]">
        <button
          type="button"
          onClick={() => setActiveTab('analytics')}
          className={`min-h-[44px] rounded-[8px] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${activeTab === 'analytics'
              ? 'bg-[var(--mnp-primary)] text-white'
              : 'text-[var(--mnp-text-secondary)] hover:bg-[var(--mnp-surface-muted)]'
            }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>{t.analyticsTab}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('requests')}
          className={`min-h-[44px] rounded-[8px] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors tabular-nums ${activeTab === 'requests'
              ? 'bg-[var(--mnp-primary)] text-white'
              : 'text-[var(--mnp-text-secondary)] hover:bg-[var(--mnp-surface-muted)]'
            }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>
            {t.allRequestsTab} ({complaints.length})
          </span>
        </button>
      </div>

      {activeTab === 'analytics' ? (
        <>
          {/* Top KPI Cards */}
          <div className="grid grid-cols-3 gap-2 tabular-nums">
            <div className={`${UI.card} p-3`}>
              <div className="text-[11px] font-bold text-[var(--mnp-text-muted)]">{t.kpiTotal}</div>
              <div className="text-xl font-bold text-[var(--mnp-primary)] mt-0.5">{stats.total}</div>
            </div>

            <div className={`${UI.card} p-3`}>
              <div className="text-[11px] font-bold text-[var(--mnp-text-muted)]">
                {t.kpiPending}
              </div>
              <div className="text-xl font-bold text-[var(--mnp-warning)] mt-0.5">
                {stats.pending}
              </div>
            </div>

            <div className="rounded-[12px] border border-[#F5B8B8] dark:border-[#7A272D] bg-[var(--mnp-error-bg)] p-3 shadow-[var(--mnp-shadow-card)]">
              <div className="text-[11px] font-bold text-[var(--mnp-error)]">{t.kpiOverdue}</div>
              <div className="text-xl font-bold text-[var(--mnp-error)] mt-0.5">
                {stats.overdue}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 tabular-nums">
            <div className={`${UI.card} p-3`}>
              <div className="text-[11px] font-bold text-[var(--mnp-text-muted)]">{t.kpiSlaPct}</div>
              <div className="text-xl font-bold text-[var(--mnp-success)] mt-0.5">
                {stats.slaPct}%
              </div>
            </div>

            <div className={`${UI.card} p-3`}>
              <div className="text-[11px] font-bold text-[var(--mnp-text-muted)]">
                {t.kpiAvgRating}
              </div>
              <div className="text-xl font-bold text-[var(--mnp-text)] mt-0.5 flex items-center gap-1">
                <span>{stats.avgRating}</span>
                <Star className="w-4 h-4 fill-[#F59E0B] text-[#D97706]" />
              </div>
            </div>
          </div>

          {/* Export CSV Button */}
          <button
            type="button"
            onClick={handleExportCsv}
            className={`${UI.btnPrimary} w-full text-xs flex items-center justify-center gap-2`}
          >
            <Download className="w-4 h-4" />
            <span>{t.exportCsvBtn}</span>
          </button>

          {/* Bar Chart by Category */}
          <section className={`${UI.card} p-4 space-y-3`}>
            <h2 className={UI.sectionTitle}>{t.chartByCategory}</h2>
            <div className="space-y-2.5">
              {stats.byCategory.map(({ cat, count }) => {
                const pct = Math.round((count / stats.maxCatCount) * 100);
                return (
                  <div key={cat.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[var(--mnp-text-secondary)]">
                        {language === 'hi' ? cat.labelHi : cat.labelEn}
                      </span>
                      <span className="font-bold text-[var(--mnp-text)] tabular-nums">{count}</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-[var(--mnp-surface-muted)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--mnp-primary)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Top 5 Most Overdue Complaints (Clickable to View Request) */}
          <section className="space-y-2">
            <h2 className={`${UI.sectionTitle} flex items-center gap-1.5`}>
              <AlertTriangle className="w-4 h-4 text-[var(--mnp-error)]" />
              <span>{t.topOverdueTitle}</span>
            </h2>
            {stats.top5Overdue.length === 0 ? (
              <div className="rounded-[12px] border border-[#A7DFBA] dark:border-[#1E5C38] bg-[var(--mnp-success-bg)] p-3 text-xs font-bold text-[var(--mnp-success)]">
                {language === 'hi'
                  ? 'वर्तमान में कोई अतिदेय शिकायत नहीं है।'
                  : 'No overdue complaints at this time.'}
              </div>
            ) : (
              <div className="space-y-2">
                {stats.top5Overdue.map(({ complaint, sla, escalation }) => {
                  const cat = CATEGORIES.find((x) => x.id === complaint.category);
                  return (
                    <button
                      key={complaint.id}
                      type="button"
                      onClick={() => setViewingId(complaint.id)}
                      className="w-full text-left rounded-[12px] border border-[#F5B8B8] dark:border-[#7A272D] bg-[var(--mnp-surface)] hover:border-[var(--mnp-primary)] p-3.5 shadow-[var(--mnp-shadow-card)] space-y-1.5 text-xs transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-[var(--mnp-primary)] tabular-nums">
                          {complaint.id} · {t.wardLabel} {complaint.ward}
                        </span>
                        <StatusBadge status={complaint.status} />
                      </div>
                      <div className="font-bold text-[var(--mnp-text)]">
                        {cat ? (language === 'hi' ? cat.labelHi : cat.labelEn) : complaint.category}{' '}
                        — {complaint.landmark}
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                        <EscalationBadge level={escalation} />
                        <span className="font-bold text-[var(--mnp-error)] tabular-nums flex items-center gap-1">
                          <span>
                            {t.overdueBy} {formatDurationMs(sla.remainingMs, language)}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {/* Ward-wise Summary Table */}
          <section className={`${UI.card} overflow-hidden`}>
            <div className="px-3.5 py-2.5 border-b border-[var(--mnp-border)]">
              <h2 className={UI.sectionTitle}>{t.wardWiseTable}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs tabular-nums">
                <thead className="bg-[var(--mnp-surface-muted)] text-[var(--mnp-text-secondary)]">
                  <tr>
                    <th className="py-2.5 px-3 text-left font-bold">{t.colWard}</th>
                    <th className="py-2.5 px-2 text-right font-bold">{t.colTotal}</th>
                    <th className="py-2.5 px-2 text-right font-bold">{t.colPending}</th>
                    <th className="py-2.5 px-2 text-right font-bold">{t.colOverdue}</th>
                    <th className="py-2.5 px-3 text-right font-bold">{t.colResolved}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--mnp-border)]">
                  {stats.wardRows.map((row) => (
                    <tr key={row.ward}>
                      <td className="py-2.5 px-3 font-bold text-[var(--mnp-text)]">
                        {t.wardLabel} {row.ward}
                      </td>
                      <td className="py-2.5 px-2 text-right text-[var(--mnp-text)]">{row.total}</td>
                      <td className="py-2.5 px-2 text-right text-[var(--mnp-warning)] font-bold">
                        {row.pending}
                      </td>
                      <td className="py-2.5 px-2 text-right text-[var(--mnp-error)] font-bold">
                        {row.overdue}
                      </td>
                      <td className="py-2.5 px-3 text-right text-[var(--mnp-success)] font-bold">
                        {row.resolved}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Tax Payments & Notices Summary */}
          <section className={`${UI.card} p-3.5 space-y-2.5`}>
            <h2 className={UI.sectionTitle}>{t.municipalSummaryTitle}</h2>
            <div className="grid grid-cols-2 gap-2.5 tabular-nums">
              <div className={`${UI.surfaceMuted} p-3 space-y-1`}>
                <div className="flex items-center gap-1 text-xs text-[var(--mnp-text-secondary)]">
                  <IndianRupee className="w-3.5 h-3.5 text-[var(--mnp-primary)]" />
                  <span>{t.taxPaymentsCount}</span>
                </div>
                <div className="text-lg font-bold text-[var(--mnp-text)]">{payments.length}</div>
                <div className="text-xs font-bold text-[var(--mnp-success)]">
                  ₹{stats.taxTotal.toLocaleString('en-IN')}
                </div>
              </div>

              <div className={`${UI.surfaceMuted} p-3 space-y-1`}>
                <div className="flex items-center gap-1 text-xs text-[var(--mnp-text-secondary)]">
                  <FileText className="w-3.5 h-3.5 text-[var(--mnp-primary)]" />
                  <span>{t.activeNoticesCount}</span>
                </div>
                <div className="text-lg font-bold text-[var(--mnp-text)]">{notices.length}</div>
                <div className="text-xs text-[var(--mnp-text-muted)]">{t.tabNotices}</div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* ALL REQUESTS TAB (CMO & Mayor can inspect every citizen request) */
        <div className="space-y-3">
          {/* Search & Filters */}
          <div className={`${UI.card} p-3.5 space-y-2.5`}>
            <div className="relative">
              <Search className="w-4 h-4 text-[var(--mnp-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchByIdPlaceholder}
                className={`${UI.input} pl-9`}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--mnp-text)] flex items-center gap-1.5 tabular-nums">
                <Filter className="w-3.5 h-3.5 text-[var(--mnp-primary)]" />
                <span>
                  {filteredRequests.length} / {complaints.length}
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

            <div className="grid grid-cols-3 gap-1.5">
              <select
                aria-label={t.filterStatus}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ComplaintStatus | 'all')}
                className="min-h-[42px] px-2 rounded-[10px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] text-xs text-[var(--mnp-text)]"
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
                aria-label={t.filterCategory}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as ComplaintCategoryId | 'all')}
                className="min-h-[42px] px-2 rounded-[10px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] text-xs text-[var(--mnp-text)]"
              >
                <option value="all">
                  {t.filterCategory}: {t.all}
                </option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {language === 'hi' ? cat.labelHi : cat.labelEn}
                  </option>
                ))}
              </select>

              <select
                aria-label={t.filterWard}
                value={wardFilter}
                onChange={(e) =>
                  setWardFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
                }
                className="min-h-[42px] px-2 rounded-[10px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] text-xs text-[var(--mnp-text)]"
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

          {/* All Requests List */}
          {filteredRequests.length === 0 ? (
            <div className={UI.emptyState}>
              <p className="text-sm font-bold text-[var(--mnp-text)]">{t.noComplaintsFound}</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setStatusFilter('all');
                  setCategoryFilter('all');
                  setWardFilter('all');
                  setOverdueOnly(false);
                }}
                className={UI.btnPrimary}
              >
                {t.clearFilter}
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredRequests.map(({ c, sla, escalation }) => {
                const cat = CATEGORIES.find((x) => x.id === c.category);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setViewingId(c.id)}
                    className={`${UI.cardInteractive} w-full p-3 text-left space-y-2`}
                  >
                    <div className="flex items-start gap-3">
                      {c.beforePhoto ? (
                        <img
                          src={c.beforePhoto}
                          alt={c.id}
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
                            {c.id} · {t.wardLabel} {c.ward}
                          </span>
                          <StatusBadge status={c.status} />
                        </div>
                        <div className="text-sm font-bold text-[var(--mnp-text)] truncate">
                          {cat ? (language === 'hi' ? cat.labelHi : cat.labelEn) : c.category}
                        </div>
                        <p className="text-xs text-[var(--mnp-text-muted)] truncate">
                          {c.name} · {c.landmark}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[var(--mnp-border)] text-xs">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <EscalationBadge level={escalation} />
                        {sla.isOverdue && (
                          <span className="text-[11px] font-bold text-[var(--mnp-error)] tabular-nums">
                            {t.overdueFlag}
                          </span>
                        )}
                      </div>
                      <span className="text-[var(--mnp-primary)] font-bold inline-flex items-center gap-1 shrink-0">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t.viewRequestBtn}</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
