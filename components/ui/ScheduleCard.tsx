import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { ScheduleSlot } from '@/lib/store';
import { COLORS, RADIUS, TYPOGRAPHY, SHADOWS, SPACING } from '@/constants/theme';
import { MatchBadge } from './MatchBadge';

interface ScheduleCardProps {
  slot: ScheduleSlot;
  onPress: () => void;
  variant?: 'current' | 'next' | 'upcoming';
}

export function ScheduleCard({ slot, onPress, variant = 'upcoming' }: ScheduleCardProps) {
  const isCurrent = variant === 'current';
  const isNext = variant === 'next';

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isCurrent && styles.currentContainer,
        isNext && styles.nextContainer
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: slot.style.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.dateText}>{slot.startDate} - {slot.endDate}</Text>
          {isNext && slot.style.matchScore && (
            <MatchBadge score={slot.style.matchScore} />
          )}
        </View>

        <Text style={styles.title} numberOfLines={1}>{slot.style.name}</Text>
        
        <View style={styles.footerRow}>
          <Text style={styles.subtitle}>{slot.style.category} • {slot.style.duration}</Text>
          <ChevronRight color={COLORS.textMuted} size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
    gap: SPACING.md,
  },
  currentContainer: {
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  nextContainer: {
    backgroundColor: COLORS.background,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.border,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: SPACING.xs,
    paddingRight: SPACING.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
  },
  title: {
    ...TYPOGRAPHY.h3,
    marginBottom: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textMuted,
  },
});
