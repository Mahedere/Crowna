export const COLORS = {
  background: '#FAFAFA',
  surface: '#FFFFFF',
  text: '#1A1A1A',
  textMuted: '#888888',
  primary: '#E07A5F', // A soft, warm terracotta/peach
  primaryLight: '#F4F1DE',
  border: '#F0F0F0',
  success: '#81B29A',
  accent: '#F2CC8F',
  overlay: 'rgba(0, 0, 0, 0.4)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 30,
  round: 9999,
};

export const TYPOGRAPHY = {
  h1: { fontSize: 32, fontWeight: '700' as const, color: COLORS.text, letterSpacing: -0.5 },
  h2: { fontSize: 24, fontWeight: '700' as const, color: COLORS.text, letterSpacing: -0.5 },
  h3: { fontSize: 20, fontWeight: '600' as const, color: COLORS.text },
  bodyLarge: { fontSize: 16, color: COLORS.text, lineHeight: 24 },
  body: { fontSize: 14, color: COLORS.text, lineHeight: 20 },
  caption: { fontSize: 12, color: COLORS.textMuted, fontWeight: '500' as const },
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
};
