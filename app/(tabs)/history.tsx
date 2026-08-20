import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { CalendarDays, CheckCircle2 } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS } from '@/constants/theme';

const HISTORY = [
  {
    month: 'July 2026',
    styles: [
      { id: 'h1', name: 'Senegalese Twists', dates: 'Jul 1 – Jul 21', category: 'Protective', image: 'https://images.unsplash.com/photo-1518063319523-b1d5d1d64380?w=400&q=80' },
      { id: 'h2', name: 'Afro Puff',         dates: 'Jun 18 – Jun 30', category: 'Natural',    image: 'https://images.unsplash.com/photo-1576828502267-0707ceea5345?w=400&q=80' },
    ],
  },
  {
    month: 'June 2026',
    styles: [
      { id: 'h3', name: 'Box Braids', dates: 'May 27 – Jun 17', category: 'Braids', image: 'https://images.unsplash.com/photo-1615165487779-1ce505b00c3c?w=400&q=80' },
    ],
  },
];

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Style History</Text>
        <Text style={styles.subtitle}>Your hair journey over time</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {HISTORY.map((group) => (
          <View key={group.month} style={styles.group}>
            <View style={styles.monthRow}>
              <CalendarDays color={COLORS.primary} size={15} />
              <Text style={styles.month}>{group.month}</Text>
            </View>

            {group.styles.map((item) => (
              <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8}>
                <Image source={{ uri: item.image }} style={styles.thumb} />
                <View style={styles.info}>
                  <Text style={styles.catLabel}>{item.category}</Text>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.dates}>{item.dates}</Text>
                </View>
                <View style={styles.done}>
                  <CheckCircle2 color={COLORS.success} size={20} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.hint}>
          <Text style={styles.hintEmoji}>👑</Text>
          <Text style={styles.hintText}>
            Complete styles from the Home screen to grow your history.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  header: {
    paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.lg,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  title:    { ...TYPOGRAPHY.h1 },
  subtitle: { ...TYPOGRAPHY.body, marginTop: 4 },

  content: { padding: SPACING.lg, paddingBottom: 100 },

  group:    { marginBottom: SPACING.xl },
  monthRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.md },
  month:    { ...TYPOGRAPHY.h3, color: COLORS.primary, fontSize: 15 },

  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.surface, borderRadius: RADIUS.lg,
    padding: SPACING.sm, gap: SPACING.md,
    borderWidth: 1, borderColor: COLORS.border,
    marginBottom: SPACING.sm, ...SHADOWS.sm,
  },
  thumb: { width: 68, height: 68, borderRadius: RADIUS.md, backgroundColor: COLORS.surfaceAlt },
  info:  { flex: 1 },

  catLabel: { ...TYPOGRAPHY.label, color: COLORS.primary, marginBottom: 4 },
  name:     { ...TYPOGRAPHY.h3, fontSize: 16, marginBottom: 3 },
  dates:    { ...TYPOGRAPHY.caption },

  done: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(34,211,165,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },

  hint: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.lg, padding: SPACING.md,
    borderWidth: 1, borderColor: 'rgba(255,107,53,0.2)',
    marginTop: SPACING.md,
  },
  hintEmoji: { fontSize: 24 },
  hintText:  { ...TYPOGRAPHY.body, flex: 1, color: COLORS.textSecondary, lineHeight: 20 },
});
