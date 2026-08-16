import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native';
import { router } from 'expo-router';
import { Sparkles, Droplet } from 'lucide-react-native';

import { useAppStore } from '@/lib/store';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS } from '@/constants/theme';
import { StyleCard } from '@/components/ui/StyleCard';
import { ScheduleCard } from '@/components/ui/ScheduleCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function HomeScreen() {
  const schedule = useAppStore((state) => state.schedule);
  const completeCurrentStyle = useAppStore((state) => state.completeCurrentStyle);

  const current = schedule.find(s => s.type === 'CURRENT');
  const next = schedule.find(s => s.type === 'NEXT');
  const upcoming = schedule.find(s => s.type === 'UPCOMING');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning, Sarah 👑</Text>
          <Text style={styles.tagline}>Your hair, your crown.</Text>
        </View>

        {/* CURRENT STYLE */}
        {current && (
          <View style={styles.section}>
            <SectionHeader title="Your Current Style" />
            <StyleCard 
              styleData={current.style}
              onPress={() => router.push('/history')} // Placeholder for now
              size="large"
            />
            <View style={styles.currentMeta}>
              <Text style={styles.currentDate}>Started {current.startDate}</Text>
              <Text style={styles.currentRemaining}>12 days remaining</Text>
            </View>
            <PrimaryButton 
              label="Mark Completed" 
              onPress={completeCurrentStyle} 
              variant="secondary"
              style={{ marginTop: SPACING.md }}
            />
          </View>
        )}

        {/* NEXT STYLE */}
        {next && (
          <View style={styles.section}>
            <SectionHeader title="Your Next Style" />
            <View style={styles.nextRecommendationCard}>
              <View style={styles.recommendationHeader}>
                <Sparkles color={COLORS.primary} size={20} />
                <Text style={styles.recommendationTitle}>94% match for you</Text>
              </View>
              <Text style={styles.recommendationText}>
                {next.style.whyItMatches || 'Matches your hair texture, preferred maintenance level, and lifestyle.'}
              </Text>
              
              <View style={styles.nextCardWrapper}>
                <ScheduleCard 
                  slot={next}
                  onPress={() => {}} 
                  variant="next"
                />
              </View>
              
              <View style={styles.nextActions}>
                <PrimaryButton 
                  label="View Alternatives (10)" 
                  onPress={() => router.push('/options-modal')} 
                  variant="outline"
                  style={styles.actionBtn}
                />
              </View>
            </View>
          </View>
        )}

        {/* COMING UP */}
        {upcoming && (
          <View style={styles.section}>
            <SectionHeader 
              title="Coming Up" 
              actionLabel="View Calendar" 
              onActionPress={() => {}} 
            />
            <ScheduleCard 
              slot={upcoming}
              onPress={() => {}} 
              variant="upcoming"
            />
          </View>
        )}

        {/* HAIR CARE (FUTURE READY) */}
        <View style={[styles.section, styles.lastSection]}>
          <SectionHeader title="Hair Care" />
          <View style={styles.careCard}>
            <View style={styles.careIconWrapper}>
              <Droplet color={COLORS.primary} size={24} />
            </View>
            <View style={styles.careTextContainer}>
              <Text style={styles.careTitle}>Wash Day Routine</Text>
              <Text style={styles.careSubtitle}>Coming soon to Crowna</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.xxl,
  },
  greeting: {
    ...TYPOGRAPHY.h1,
    marginBottom: SPACING.xs,
  },
  tagline: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.textMuted,
  },
  section: {
    marginBottom: SPACING.xxl,
  },
  lastSection: {
    marginBottom: SPACING.xl * 2,
  },
  currentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.xs,
  },
  currentDate: {
    ...TYPOGRAPHY.body,
    color: COLORS.textMuted,
  },
  currentRemaining: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
  nextRecommendationCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  recommendationTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
  },
  recommendationText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textMuted,
    marginBottom: SPACING.lg,
    lineHeight: 22,
  },
  nextCardWrapper: {
    marginBottom: SPACING.lg,
  },
  nextActions: {
    marginTop: SPACING.xs,
  },
  actionBtn: {
    width: '100%',
  },
  careCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    gap: SPACING.md,
  },
  careIconWrapper: {
    backgroundColor: COLORS.primaryLight,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
  },
  careTextContainer: {
    flex: 1,
  },
  careTitle: {
    ...TYPOGRAPHY.h3,
    marginBottom: 4,
  },
  careSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textMuted,
  },
});

