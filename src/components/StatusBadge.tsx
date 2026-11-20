import React from 'react';
import { ESCALATION_BADGE_TOKENS, STATUS_BADGE_TOKENS } from '../theme/tokens';
import { ComplaintStatus, EscalationLevel } from '../types';
import { useApp } from '../store/AppContext';

export const StatusBadge: React.FC<{ status: ComplaintStatus }> = ({ status }) => {
  const { t } = useApp();
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-[11px] font-bold rounded-full border whitespace-nowrap shrink-0 ${STATUS_BADGE_TOKENS[status].className}`}
    >
      {t.statusLabels[status]}
    </span>
  );
};

export const EscalationBadge: React.FC<{ level: EscalationLevel }> = ({ level }) => {
  const { t } = useApp();
  if (level === 'none') return null;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-[11px] font-bold rounded-full border whitespace-nowrap shrink-0 ${ESCALATION_BADGE_TOKENS[level]}`}
    >
      {t.escalationLabels[level]}
    </span>
  );
};
