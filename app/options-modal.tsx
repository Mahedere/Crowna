import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { CheckCircle2 } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppStore } from '@/lib/store';
import { MOCK_HAIRSTYLES } from '@/lib/mockHairstyles';

// 10 Alternative options as requested by user
const ALTERNATIVES: HairstyleData[] = MOCK_HAIRSTYLES.map((style, index) => ({
  ...style,
  matchScore: `${98 - index * 3}%` // Fake descending match score
}));

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
