// ============================================================
// CROWNA — Dark Editorial Design System
// Theme: Deep space backgrounds. Images that pop. Electric coral.
// ============================================================

export const COLORS = {
  // — Backgrounds
  background:     '#09090B',    // Near-black canvas
  surface:        '#111115',    // Card & panel background
  surfaceAlt:     '#1D1D23',    // Inputs, elevated panels
  surfaceHigh:    '#28282F',    // Highest elevation

  // — Text
  text:           '#F4F4F5',    // Primary white text
  textSecondary:  '#A1A1AA',    // Subdued labels
  textMuted:      '#52525B',    // Placeholders, disabled

  // — Brand accent: electric coral/orange
  primary:        '#FF6B35',    // Core brand accent
  primaryGlow:    'rgba(255, 107, 53, 0.18)',
  primaryLight:   'rgba(255, 107, 53, 0.12)',

  // — Semantic
  success:        '#22D3A5',    // Mint green — completions
  gold:           '#F5C842',    // Gold — match scores
  goldLight:      'rgba(245, 200, 66, 0.12)',

  // — Borders (very subtle on dark)
  border:         'rgba(255, 255, 255, 0.07)',
  borderBright:   'rgba(255, 255, 255, 0.14)',

  // — Overlays
  overlay:        'rgba(0, 0, 0, 0.55)',
  overlayHeavy:   'rgba(0, 0, 0, 0.75)',

  // — Constant white/black
  white:          '#FFFFFF',
  black:          '#000000',
};

export const SPACING = {
  xs:   4,
  sm:   8,
  md:   16,
  lg:   24,
  xl:   32,
  xxl:  48,
};

export const RADIUS = {
  sm:    6,
  md:    12,
  lg:    18,
  xl:    28,
  xxl:   40,
  round: 9999,
};

export const TYPOGRAPHY = {
  display: {
    fontSize: 40,
    fontWeight: '800' as const,
    color: COLORS.text,
    letterSpacing: -1,
    lineHeight: 44,
  },
  h1: {
    fontSize: 30,
    fontWeight: '700' as const,
    color: COLORS.text,
    letterSpacing: -0.6,
    lineHeight: 36,
  },
  h2: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: COLORS.text,
    letterSpacing: -0.4,
  },
  h3: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: COLORS.text,
    letterSpacing: -0.2,
  },
  bodyLarge: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 25,
    fontWeight: '400' as const,
  },
  body: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 21,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '500' as const,
    letterSpacing: 0.2,
  },
  label: {
    fontSize: 11,
    fontWeight: '700' as const,
    color: COLORS.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
};

// Glows look great on dark — use sparingly on primary UI elements
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 6,
  },
  glow: {
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
  },
};
