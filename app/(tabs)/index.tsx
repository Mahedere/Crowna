import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Sparkles, Droplets, ChevronRight, CheckCircle2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useAppStore } from '@/lib/store';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const schedule = useAppStore((state) => state.schedule);
  const completeCurrentStyle = useAppStore((state) => state.completeCurrentStyle);

  const current = schedule.find(s => s.type === 'CURRENT');
  const next    = schedule.find(s => s.type === 'NEXT');
  const upcoming = schedule.find(s => s.type === 'UPCOMING');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning, Sarah</Text>
            <View style={styles.crownRow}>
              <Text style={styles.appName}>Crowna</Text>
              <Text style={styles.crownEmoji}>👑</Text>
            </View>
          </View>
          {/* Avatar placeholder */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>S</Text>
          </View>
        </View>

        {/* ── Current Style — hero card ── */}
        {current && (
          <View style={styles.section}>
            <View style={styles.labelRow}>
              <View style={styles.dot} />
              <Text style={styles.label}>WEARING NOW</Text>
            </View>
            <TouchableOpacity style={styles.heroCard} activeOpacity={0.95}>
              <Image source={{ uri: current.style.image }} style={styles.heroImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.88)']}
                style={styles.heroGradient}
              />
              <View style={styles.heroContent}>
                <View style={styles.heroTopRow}>
                  <View style={styles.livePill}>
                    <View style={styles.liveDot} />
                    <Text style={styles.livePillText}>Active</Text>
                  </View>
                </View>
                <Text style={styles.heroName}>{current.style.name}</Text>
                <Text style={styles.heroSub}>{current.style.category}  ·  {current.style.duration}</Text>
                <View style={styles.heroFooter}>
                  <Text style={styles.heroDate}>Started {current.startDate}  ·  Until {current.endDate}</Text>
                  <TouchableOpacity style={styles.completeBtn} onPress={completeCurrentStyle}>
                    <CheckCircle2 color={COLORS.success} size={16} />
                    <Text style={styles.completeBtnText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* ── Next Recommendation ── */}
        {next && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Next Style</Text>
              <TouchableOpacity onPress={() => router.push('/options-modal')} style={styles.seeMoreBtn}>
                <Text style={styles.seeMoreText}>10 options</Text>
                <ChevronRight color={COLORS.primary} size={15} />
              </TouchableOpacity>
            </View>

            {/* Match intelligence card */}
            <View style={styles.matchCard}>
              <Sparkles color={COLORS.gold} size={14} />
              <Text style={styles.matchText}>
                <Text style={styles.matchScore}>{next.style.matchScore ?? '94%'} match</Text>
                {'  '}—{'  '}
                {next.style.whyItMatches ?? 'Matches your maintenance level and preferred protective styles.'}
              </Text>
            </View>

            {/* Style card */}
            <TouchableOpacity style={styles.nextCard} activeOpacity={0.9}>
              <Image source={{ uri: next.style.image }} style={styles.nextImage} />
              <View style={styles.nextInfo}>
                <Text style={styles.nextName}>{next.style.name}</Text>
                <Text style={styles.nextMeta}>{next.style.category}</Text>
                <Text style={styles.nextDates}>{next.startDate} → {next.endDate}</Text>
                <View style={styles.nextTags}>
                  <View style={styles.tag}><Text style={styles.tagText}>{next.style.duration}</Text></View>
                  <View style={styles.tag}><Text style={styles.tagText}>{next.style.maintenance} maintenance</Text></View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.alternativesBtn} onPress={() => router.push('/options-modal')}>
              <Text style={styles.alternativesBtnText}>Explore alternatives</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── Coming Up ── */}
        {upcoming && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Coming Up</Text>
            <TouchableOpacity style={styles.upcomingRow} activeOpacity={0.8}>
              <Image source={{ uri: upcoming.style.image }} style={styles.upcomingThumb} />
              <View style={styles.upcomingInfo}>
                <Text style={styles.upcomingName}>{upcoming.style.name}</Text>
                <Text style={styles.upcomingDates}>{upcoming.startDate} → {upcoming.endDate}</Text>
              </View>
              <ChevronRight color={COLORS.textMuted} size={20} />
            </TouchableOpacity>
          </View>
        )}

        {/* ── Hair Care — future section ── */}
        <View style={[styles.section, { marginBottom: SPACING.xxl + 24 }]}>
          <Text style={styles.sectionTitle}>Hair Care</Text>
          <View style={styles.careRow}>
            <View style={styles.careCard}>
              <Droplets color={COLORS.primary} size={22} />
              <Text style={styles.careCardTitle}>Wash Day</Text>
              <Text style={styles.careCardSub}>Coming soon</Text>
            </View>
            <View style={styles.careCard}>
              <Sparkles color={COLORS.gold} size={22} />
              <Text style={styles.careCardTitle}>Deep Condition</Text>
              <Text style={styles.careCardSub}>Coming soon</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll:    { paddingBottom: SPACING.xxl },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  greeting: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginBottom: 2 },
  crownRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  appName:  { ...TYPOGRAPHY.h1, color: COLORS.text },
  crownEmoji: { fontSize: 24 },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.primaryGlow,
    borderWidth: 1.5, borderColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { ...TYPOGRAPHY.h3, color: COLORS.primary },

  // Section
  section: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.xl },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.sm },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.success },
  label: { ...TYPOGRAPHY.label, color: COLORS.textMuted },

  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: SPACING.md,
  },
  sectionTitle: { ...TYPOGRAPHY.h2 },
  seeMoreBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  seeMoreText: { ...TYPOGRAPHY.caption, color: COLORS.primary, fontWeight: '700' },

  // Hero Card
  heroCard: {
    height: 460, borderRadius: RADIUS.xl, overflow: 'hidden', backgroundColor: COLORS.surface,
    ...SHADOWS.md,
  },
  heroImage:    { width: '100%', height: '100%' },
  heroGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '65%' },
  heroContent:  { position: 'absolute', bottom: 0, left: 0, right: 0, padding: SPACING.lg },
  heroTopRow:   { marginBottom: SPACING.sm },
  livePill: {
    flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start',
    backgroundColor: 'rgba(34, 211, 165, 0.15)', borderRadius: RADIUS.round,
    paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: 'rgba(34,211,165,0.3)',
  },
  liveDot:      { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.success },
  livePillText: { ...TYPOGRAPHY.caption, color: COLORS.success, fontWeight: '700' },
  heroName:     { ...TYPOGRAPHY.display, color: COLORS.white, marginBottom: 4 },
  heroSub:      { ...TYPOGRAPHY.body, color: 'rgba(255,255,255,0.65)', marginBottom: SPACING.md },
  heroFooter:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heroDate:     { ...TYPOGRAPHY.caption, color: 'rgba(255,255,255,0.5)' },
  completeBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(34,211,165,0.15)', paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: RADIUS.round, borderWidth: 1, borderColor: 'rgba(34,211,165,0.3)',
  },
  completeBtnText: { ...TYPOGRAPHY.caption, color: COLORS.success, fontWeight: '700' },

  // Match intelligence
  matchCard: {
    flexDirection: 'row', gap: SPACING.sm, alignItems: 'flex-start',
    backgroundColor: COLORS.goldLight,
    borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.md,
    borderWidth: 1, borderColor: 'rgba(245,200,66,0.2)',
  },
  matchText:  { ...TYPOGRAPHY.body, flex: 1, lineHeight: 20 },
  matchScore: { color: COLORS.gold, fontWeight: '700', fontSize: 14 },

  // Next Style card
  nextCard: {
    flexDirection: 'row', backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg, overflow: 'hidden',
    borderWidth: 1, borderColor: COLORS.border, ...SHADOWS.sm,
  },
  nextImage: { width: 110, height: 130 },
  nextInfo:  { flex: 1, padding: SPACING.md, justifyContent: 'center' },
  nextName:  { ...TYPOGRAPHY.h3, marginBottom: 3 },
  nextMeta:  { ...TYPOGRAPHY.caption, color: COLORS.primary, fontWeight: '700', marginBottom: 4 },
  nextDates: { ...TYPOGRAPHY.caption, color: COLORS.textMuted, marginBottom: SPACING.sm },
  nextTags:  { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs },
  tag: {
    backgroundColor: COLORS.surfaceAlt, borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm, paddingVertical: 3,
  },
  tagText: { ...TYPOGRAPHY.caption, color: COLORS.textSecondary },

  // Alternatives button
  alternativesBtn: {
    marginTop: SPACING.md, borderRadius: RADIUS.lg,
    borderWidth: 1, borderColor: COLORS.border,
    paddingVertical: SPACING.md, alignItems: 'center',
  },
  alternativesBtnText: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, fontWeight: '600' },

  // Upcoming
  upcomingRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.surface, borderRadius: RADIUS.lg,
    padding: SPACING.sm, gap: SPACING.md,
    borderWidth: 1, borderColor: COLORS.border,
  },
  upcomingThumb:  { width: 58, height: 58, borderRadius: RADIUS.md },
  upcomingInfo:   { flex: 1 },
  upcomingName:   { ...TYPOGRAPHY.h3, fontSize: 15, marginBottom: 3 },
  upcomingDates:  { ...TYPOGRAPHY.caption },

  // Hair Care
  careRow: { flexDirection: 'row', gap: SPACING.md },
  careCard: {
    flex: 1, backgroundColor: COLORS.surface, borderRadius: RADIUS.lg,
    padding: SPACING.md, borderWidth: 1, borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  careCardTitle: { ...TYPOGRAPHY.h3, fontSize: 15 },
  careCardSub:   { ...TYPOGRAPHY.caption, color: COLORS.primary },
});
