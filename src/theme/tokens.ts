import { ComplaintStatus, EscalationLevel } from '../types';

/**
 * Mauganj Nagar Palika Seva — Clean Civic Design System Tokens
 * Light, airy azure-blue Material style with floating white cards and high legibility.
 */

export const THEME_COLORS = {
  light: {
    primary: '#2196F3',
    primaryHover: '#1976D2',
    primarySoft: '#E8F4FE',
    secondary: '#1E88E5',
    teal: '#009688',
    tealHover: '#00796B',
    tealSoft: '#E0F2F1',
    accent: '#2196F3',
    accentHover: '#1976D2',
    accentSoft: '#E8F4FE',
    background: '#F6F8FB',
    surface: '#FFFFFF',
    surfaceMuted: '#F1F5F9',
    inputBg: '#F2F8FE',
    text: '#1A2433',
    textSecondary: '#4B5B70',
    textMuted: '#6C7D93',
    border: '#E8EEF5',
    borderStrong: '#D1DFEE',
    success: '#2E7D32',
    successBg: '#E8F5E9',
    warning: '#C25E00',
    warningBg: '#FFF3E0',
    error: '#D32F2F',
    errorBg: '#FFEBEE',
    info: '#1976D2',
    infoBg: '#E3F2FD',
    tricolorSaffron: '#FF9933',
    tricolorWhite: '#FFFFFF',
    tricolorGreen: '#138808',
  },
  dark: {
    primary: '#42A5F5',
    primaryHover: '#64B5F6',
    primarySoft: '#132A42',
    secondary: '#64B5F6',
    teal: '#26A69A',
    tealHover: '#4DB6AC',
    tealSoft: '#0E2F2D',
    accent: '#42A5F5',
    accentHover: '#64B5F6',
    accentSoft: '#132A42',
    background: '#0D141D',
    surface: '#16202C',
    surfaceMuted: '#1E2B3A',
    inputBg: '#182636',
    text: '#F1F5F9',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',
    border: '#243447',
    borderStrong: '#334861',
    success: '#4ADE80',
    successBg: '#0F2D1C',
    warning: '#FBBF24',
    warningBg: '#33230A',
    error: '#F87171',
    errorBg: '#3A1518',
    info: '#64B5F6',
    infoBg: '#132A42',
    tricolorSaffron: '#FF9933',
    tricolorWhite: '#E2E8F0',
    tricolorGreen: '#22C55E',
  },
} as const;

export const TYPOGRAPHY = {
  fontFamily: '"Noto Sans Devanagari", "Noto Sans", system-ui, -apple-system, sans-serif',
  scale: {
    appTitle: { size: '17px', weight: 700, lineHeight: '1.25' },
    pageHeading: { size: '19px', weight: 700, lineHeight: '1.3' },
    sectionHeading: { size: '15px', weight: 700, lineHeight: '1.35' },
    cardTitle: { size: '14px', weight: 600, lineHeight: '1.4' },
    body: { size: '14px', weight: 400, lineHeight: '1.5' },
    caption: { size: '12px', weight: 500, lineHeight: '1.4' },
    micro: { size: '11px', weight: 600, lineHeight: '1.25' },
    button: { size: '14px', weight: 700, lineHeight: '1.2' },
  },
} as const;

export const SHAPE_SPACING = {
  radius: {
    card: '14px',
    button: '12px',
    input: '12px',
    chip: '9999px',
    badge: '9999px',
    dialog: '18px',
  },
  elevation: {
    card: '0 2px 10px rgba(15, 23, 42, 0.06)',
    header: '0 2px 8px rgba(33, 150, 243, 0.22)',
    bottomNav: '0 -2px 10px rgba(33, 150, 243, 0.18)',
    dialog: '0 12px 32px rgba(15, 23, 42, 0.2)',
  },
  sizing: {
    minTouchTarget: '48px',
    headerHeight: '56px',
    bottomNavHeight: '64px',
    listRowMinHeight: '60px',
    tileCircleSize: '44px',
    iconSm: '16px',
    iconMd: '20px',
    iconLg: '22px',
  },
} as const;

export const STATUS_BADGE_TOKENS: Record<
  ComplaintStatus,
  { hexLight: { bg: string; text: string; border: string }; className: string }
> = {
  Registered: {
    hexLight: { bg: '#E3F2FD', text: '#1565C0', border: '#BBDEFB' },
    className:
      'bg-[#E3F2FD] text-[#1565C0] border-[#BBDEFB] dark:bg-[#132A42] dark:text-[#64B5F6] dark:border-[#244B7A]',
  },
  Assigned: {
    hexLight: { bg: '#EDE9FE', text: '#5B21B6', border: '#DDD6FE' },
    className:
      'bg-[#EDE9FE] text-[#5B21B6] border-[#DDD6FE] dark:bg-[#231942] dark:text-[#C4B5FD] dark:border-[#4C368A]',
  },
  'In progress': {
    hexLight: { bg: '#FFF3E0', text: '#C25E00', border: '#FFE0B2' },
    className:
      'bg-[#FFF3E0] text-[#C25E00] border-[#FFE0B2] dark:bg-[#33230A] dark:text-[#FCD34D] dark:border-[#6B4A14]',
  },
  Resolved: {
    hexLight: { bg: '#E8F5E9', text: '#2E7D32', border: '#C8E6C9' },
    className:
      'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9] dark:bg-[#0F2D1C] dark:text-[#6EE7B7] dark:border-[#1E5C38]',
  },
  Closed: {
    hexLight: { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0' },
    className:
      'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0] dark:bg-[#1E293B] dark:text-[#CBD5E1] dark:border-[#334155]',
  },
  Reopened: {
    hexLight: { bg: '#FFEBEE', text: '#C62828', border: '#FFCDD2' },
    className:
      'bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2] dark:bg-[#3A1518] dark:text-[#FCA5A5] dark:border-[#7A272D]',
  },
};

export const ESCALATION_BADGE_TOKENS: Record<EscalationLevel, string> = {
  none: 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0] dark:bg-[#1E293B] dark:text-[#CBD5E1] dark:border-[#334155]',
  dept_head:
    'bg-[#FFF3E0] text-[#C25E00] border-[#FFE0B2] dark:bg-[#33230A] dark:text-[#FCD34D] dark:border-[#6B4A14]',
  cmo: 'bg-[#FFEDD5] text-[#C2410C] border-[#FED7AA] dark:bg-[#3B1E0D] dark:text-[#FDBA74] dark:border-[#7C3A16]',
  president:
    'bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2] dark:bg-[#3A1518] dark:text-[#FCA5A5] dark:border-[#7A272D]',
};

// Soft circular icon tints used across clean floating cards
export const ICON_CIRCLE_THEMES = {
  blue: 'bg-[#E3F2FD] text-[#1976D2] dark:bg-[#132A42] dark:text-[#64B5F6]',
  saffron: 'bg-[#FFF3E0] text-[#E65100] dark:bg-[#351D0E] dark:text-[#FB923C]',
  green: 'bg-[#E8F5E9] text-[#2E7D32] dark:bg-[#0F2D1C] dark:text-[#4ADE80]',
  red: 'bg-[#FFEBEE] text-[#D32F2F] dark:bg-[#3A1518] dark:text-[#F87171]',
  teal: 'bg-[#E0F2F1] text-[#00897B] dark:bg-[#0E2F2D] dark:text-[#26A69A]',
  indigo: 'bg-[#EDE9FE] text-[#5B21B6] dark:bg-[#231942] dark:text-[#A78BFA]',
  amber: 'bg-[#FFF8E1] text-[#D97706] dark:bg-[#33230A] dark:text-[#FBBF24]',
  slate: 'bg-[#F1F5F9] text-[#475569] dark:bg-[#1E2B3A] dark:text-[#CBD5E1]',
} as const;

// Shared component class tokens mapped to CSS custom properties
export const UI = {
  pageBg: 'bg-[var(--mnp-bg)] text-[var(--mnp-text)]',
  card: 'rounded-[14px] bg-[var(--mnp-surface)] border border-[var(--mnp-border)] shadow-[var(--mnp-shadow-card)]',
  cardInteractive:
    'rounded-[14px] bg-[var(--mnp-surface)] border border-[var(--mnp-border)] shadow-[var(--mnp-shadow-card)] hover:border-[var(--mnp-primary)]/50 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] focus-visible:ring-offset-1',
  surfaceMuted:
    'rounded-[14px] bg-[var(--mnp-surface-muted)] border border-[var(--mnp-border)]',
  btnPrimary:
    'min-h-[48px] px-4 rounded-[12px] bg-[var(--mnp-primary)] hover:bg-[var(--mnp-primary-hover)] text-white text-sm font-bold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] focus-visible:ring-offset-2',
  btnAccent:
    'min-h-[48px] px-4 rounded-[12px] bg-[var(--mnp-primary)] hover:bg-[var(--mnp-primary-hover)] text-white text-sm font-bold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] focus-visible:ring-offset-2',
  btnTeal:
    'min-h-[42px] px-4 rounded-full bg-[var(--mnp-teal)] hover:bg-[var(--mnp-teal-hover)] text-white text-xs font-bold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-teal)] focus-visible:ring-offset-1',
  btnSuccess:
    'min-h-[48px] px-4 rounded-[12px] bg-[var(--mnp-success)] hover:opacity-95 text-white text-sm font-bold transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-success)] focus-visible:ring-offset-2',
  btnOutline:
    'min-h-[48px] px-4 rounded-[12px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-surface)] hover:bg-[var(--mnp-surface-muted)] text-[var(--mnp-text)] text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] focus-visible:ring-offset-1',
  btnDangerOutline:
    'min-h-[48px] px-4 rounded-[12px] border border-[#FFCDD2] dark:border-[#7A272D] bg-[var(--mnp-error-bg)] text-[var(--mnp-error)] text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-error)]',
  input:
    'w-full min-h-[48px] px-3.5 rounded-[12px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-input-bg)] text-sm text-[var(--mnp-text)] placeholder:text-[var(--mnp-text-muted)] outline-none focus:bg-[var(--mnp-surface)] focus:border-[var(--mnp-primary)] focus:ring-2 focus:ring-[var(--mnp-primary)]/20 transition-colors',
  textarea:
    'w-full p-3.5 rounded-[12px] border border-[var(--mnp-border-strong)] bg-[var(--mnp-input-bg)] text-sm text-[var(--mnp-text)] placeholder:text-[var(--mnp-text-muted)] outline-none focus:bg-[var(--mnp-surface)] focus:border-[var(--mnp-primary)] focus:ring-2 focus:ring-[var(--mnp-primary)]/20 transition-colors',
  chipActive:
    'min-h-[38px] px-3.5 rounded-full bg-[var(--mnp-primary)] text-white border border-[var(--mnp-primary)] text-xs font-bold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] focus-visible:ring-offset-1',
  chipInactive:
    'min-h-[38px] px-3.5 rounded-full bg-[var(--mnp-surface)] text-[var(--mnp-text-secondary)] border border-[var(--mnp-border)] shadow-xs hover:border-[var(--mnp-primary)] text-xs font-semibold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mnp-primary)] focus-visible:ring-offset-1',
  sectionTitle: 'text-[15px] font-bold text-[var(--mnp-text)] tracking-tight',
  mutedText: 'text-xs text-[var(--mnp-text-muted)]',
  secondaryText: 'text-xs text-[var(--mnp-text-secondary)]',
  errorText: 'text-xs font-semibold text-[var(--mnp-error)]',
  emptyState:
    'rounded-[14px] bg-[var(--mnp-surface)] border border-[var(--mnp-border)] p-6 text-center space-y-2.5 shadow-[var(--mnp-shadow-card)]',
} as const;
