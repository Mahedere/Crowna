import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { COLORS, RADIUS, TYPOGRAPHY } from '@/constants/theme';

interface MatchBadgeProps {
  score: string;
}

export function MatchBadge({ score }: MatchBadgeProps) {
  return (
    <View style={styles.badge}>
      <Sparkles color={COLORS.primary} size={14} />
      <Text style={styles.text}>{score} Match</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.round,
    gap: 4,
  },
  text: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
});
