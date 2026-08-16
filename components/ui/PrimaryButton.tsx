import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, RADIUS, TYPOGRAPHY } from '@/constants/theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function PrimaryButton({ label, onPress, style, textStyle, variant = 'primary' }: PrimaryButtonProps) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary && styles.primaryBg,
        isSecondary && styles.secondaryBg,
        isOutline && styles.outlineBg,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          isPrimary && styles.primaryText,
          isSecondary && styles.secondaryText,
          isOutline && styles.outlineText,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBg: {
    backgroundColor: COLORS.text,
  },
  secondaryBg: {
    backgroundColor: COLORS.primaryLight,
  },
  outlineBg: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  text: {
    ...TYPOGRAPHY.bodyLarge,
    fontWeight: '600',
  },
  primaryText: {
    color: COLORS.surface,
  },
  secondaryText: {
    color: COLORS.primary,
  },
  outlineText: {
    color: COLORS.text,
  },
});
