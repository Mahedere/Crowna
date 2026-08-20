import React, { useState } from 'react';
import {
  StyleSheet, SafeAreaView, ScrollView, View, Text,
  TextInput, TouchableOpacity, FlatList, Image, Dimensions,
} from 'react-native';
import { Search, PlayCircle, Clock } from 'lucide-react-native';
import { MOCK_HAIRSTYLES, HairstyleData } from '@/lib/mockHairstyles';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_W = (width - SPACING.lg * 2 - SPACING.md) / 2;

const CATEGORIES = ['All', 'Braids', 'Natural', 'Locs', 'Protective'];

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.chip, active && styles.chipActive]} onPress={onPress} activeOpacity={0.8}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function GridCard({ item }: { item: HairstyleData }) {
  return (
    <TouchableOpacity style={[styles.card, { width: CARD_W }]} activeOpacity={0.88}>
      <Image source={{ uri: item.image }} style={styles.cardImg} />
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.82)']} style={styles.cardGrad} />
      {item.hasTutorial && (
        <View style={styles.tutBadge}>
          <PlayCircle color={COLORS.white} size={11} />
          <Text style={styles.tutText}>Tutorial</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.cardMeta}>
          <Clock color="rgba(255,255,255,0.55)" size={11} />
          <Text style={styles.cardMetaText}>{item.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function DiscoverScreen() {
  const [cat, setCat]    = useState('All');
  const [q,   setQ]      = useState('');

  const data = MOCK_HAIRSTYLES.filter(
    (s) => (cat === 'All' || s.category === cat) && s.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <View style={styles.searchBar}>
          <Search color={COLORS.textMuted} size={16} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search hairstyles..."
            placeholderTextColor={COLORS.textMuted}
            value={q} onChangeText={setQ}
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
        style={styles.chipsRow}
      >
        {CATEGORIES.map((c) => <Chip key={c} label={c} active={cat === c} onPress={() => setCat(c)} />)}
      </ScrollView>

      {/* Grid */}
      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <GridCard item={item} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>✨</Text>
            <Text style={styles.emptyTitle}>No styles found</Text>
            <Text style={styles.emptySub}>Try a different filter</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  header: {
    paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  title: { ...TYPOGRAPHY.h1, marginBottom: SPACING.md },
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.surfaceAlt, borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm + 2,
    gap: SPACING.sm, borderWidth: 1, borderColor: COLORS.border,
  },
  searchInput: { flex: 1, ...TYPOGRAPHY.body, color: COLORS.text, padding: 0 },

  chipsRow: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  chips: {
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, gap: SPACING.sm,
  },
  chip: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm - 1,
    borderRadius: RADIUS.round, borderWidth: 1, borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  chipActive:     { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText:       { ...TYPOGRAPHY.caption, color: COLORS.textSecondary, fontWeight: '600' },
  chipTextActive: { color: COLORS.white },

  grid: { padding: SPACING.lg, paddingBottom: 100 },
  row:  { justifyContent: 'space-between', marginBottom: SPACING.md },

  card: {
    height: 230, borderRadius: RADIUS.lg, overflow: 'hidden',
    backgroundColor: COLORS.surface, ...SHADOWS.md,
  },
  cardImg:  { width: '100%', height: '100%' },
  cardGrad: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%' },
  tutBadge: {
    position: 'absolute', top: SPACING.sm, left: SPACING.sm,
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,107,53,0.8)', paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: RADIUS.round,
  },
  tutText:     { ...TYPOGRAPHY.caption, color: COLORS.white, fontWeight: '700' },
  cardContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: SPACING.md },
  cardName: {
    ...TYPOGRAPHY.h3, fontSize: 15, color: COLORS.white, marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4,
  },
  cardMeta:     { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardMetaText: { ...TYPOGRAPHY.caption, color: 'rgba(255,255,255,0.6)' },

  empty:      { alignItems: 'center', paddingVertical: SPACING.xxl * 2 },
  emptyEmoji: { fontSize: 40, marginBottom: SPACING.md },
  emptyTitle: { ...TYPOGRAPHY.h3 },
  emptySub:   { ...TYPOGRAPHY.body },
});
