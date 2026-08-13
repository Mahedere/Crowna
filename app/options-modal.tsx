import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { CheckCircle2 } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppStore, Hairstyle } from '@/lib/store';

// 10 Alternative options as requested by user
const ALTERNATIVES: Hairstyle[] = [
  { id: 'alt1', name: 'Natural Twist-out', category: 'Natural', matchScore: '98%', duration: '3-7 days', difficulty: 'Easy', hasTutorial: true },
  { id: 'alt2', name: 'Bantu Knots', category: 'Natural', matchScore: '95%', duration: '3-5 days', difficulty: 'Moderate', hasTutorial: true },
  { id: 'alt3', name: 'Mini Twists', category: 'Twists', matchScore: '92%', duration: '2-3 weeks', difficulty: 'Advanced', hasTutorial: true },
  { id: 'alt4', name: 'Flat Twists', category: 'Twists', matchScore: '89%', duration: '1-2 weeks', difficulty: 'Moderate', hasTutorial: true },
  { id: 'alt5', name: 'Wash and Go', category: 'Natural', matchScore: '85%', duration: '3-5 days', difficulty: 'Easy', hasTutorial: true },
  { id: 'alt6', name: 'High Puff', category: 'Natural', matchScore: '82%', duration: '1-3 days', difficulty: 'Easy', hasTutorial: true },
  { id: 'alt7', name: 'Halo Braid', category: 'Braids', matchScore: '78%', duration: '4-7 days', difficulty: 'Advanced', hasTutorial: true },
  { id: 'alt8', name: 'Space Buns', category: 'Natural', matchScore: '75%', duration: '2-4 days', difficulty: 'Easy', hasTutorial: true },
  { id: 'alt9', name: 'Cornrows to the back', category: 'Braids', matchScore: '72%', duration: '1-2 weeks', difficulty: 'Moderate', hasTutorial: false },
  { id: 'alt10', name: 'Faux Locs', category: 'Locs', matchScore: '70%', duration: '4-6 weeks', difficulty: 'Advanced', hasTutorial: false },
];

export default function OptionsModal() {
  const replaceNextStyle = useAppStore((state) => state.replaceNextStyle);

  const handleSelect = (item: Hairstyle) => {
    replaceNextStyle(item);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alternative Options</Text>
        <Text style={styles.subtitle}>Select a replacement for this schedule slot</Text>
      </View>

      <FlatList
        data={ALTERNATIVES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.optionCard} onPress={() => handleSelect(item)}>
            <View style={styles.optionInfo}>
              <View style={styles.rankContainer}>
                <Text style={styles.rankText}>#{index + 1}</Text>
              </View>
              <View>
                <Text style={styles.styleName}>{item.name}</Text>
                <Text style={styles.metaText}>{item.matchScore} Match • {item.duration}</Text>
              </View>
            </View>
            <View style={styles.selectButton}>
              <Text style={styles.selectText}>Select</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  optionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rankContainer: {
    backgroundColor: '#f5f5f5',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  styleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
  selectButton: {
    backgroundColor: '#e6f4fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  selectText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
