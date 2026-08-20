import React from 'react';
import {
  StyleSheet, FlatList, TouchableOpacity, SafeAreaView,
  View, Text, Image,
} from 'react-native';
import { router } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import { useAppStore } from '@/lib/store';
import { MOCK_HAIRSTYLES, HairstyleData } from '@/lib/mockHairstyles';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS } from '@/constants/theme';

const ALTERNATIVES: HairstyleData[] = MOCK_HAIRSTYLES.map((style, i) => ({
  ...style,
  matchScore: `${98 - i * 3}%`,
}));

export default function OptionsModal() {
  const replaceNextStyle = useAppStore((s) => s.replaceNextStyle);

  const handleSelect = (item: HairstyleData) => {
    replaceNextStyle(item);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>More styles for you</Text>
        <Text style={styles.subtitle}>Not feeling this one? We picked these based on your profile.</Text>
      </View>

      <FlatList
        data={ALTERNATIVES}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)} activeOpacity={0.8}>
            <Image source={{ uri: item.image }} style={styles.thumb} />
            <View style={styles.info}>
              <View style={styles.matchRow}>
                <Sparkles color={COLORS.gold} size={13} />
                <Text style={styles.match}>{item.matchScore} match</Text>
              </View>
              <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.reason} numberOfLines={2}>{item.whyItMatches ?? 'Great fit for your hair profile.'}</Text>
            </View>
            <View style={styles.pickBtn}>
              <Text style={styles.pickText}>Pick</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    padding: SPACING.lg, paddingTop: SPACING.xl,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  title:    { ...TYPOGRAPHY.h2, marginBottom: SPACING.xs },
  subtitle: { ...TYPOGRAPHY.body },

  list: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: 60 },

  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.surface, borderRadius: RADIUS.lg,
    padding: SPACING.sm, gap: SPACING.md,
    borderWidth: 1, borderColor: COLORS.border, ...SHADOWS.sm,
  },
  thumb:    { width: 70, height: 70, borderRadius: RADIUS.md, backgroundColor: COLORS.surfaceAlt },
  info:     { flex: 1 },
  matchRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 4 },
  match:    { ...TYPOGRAPHY.caption, color: COLORS.gold, fontWeight: '700' },
  name:     { ...TYPOGRAPHY.h3, fontSize: 15, marginBottom: 4 },
  reason:   { ...TYPOGRAPHY.caption, color: COLORS.textMuted, lineHeight: 17 },

  pickBtn: {
    backgroundColor: COLORS.primaryLight, borderRadius: RADIUS.round,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderWidth: 1, borderColor: 'rgba(255,107,53,0.3)',
  },
  pickText: { ...TYPOGRAPHY.caption, color: COLORS.primary, fontWeight: '700' },
});
