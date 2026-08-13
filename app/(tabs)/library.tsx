import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Search, PlayCircle, Clock, Scissors } from 'lucide-react-native';

const CATEGORIES = ['All', 'Braids', 'Natural', 'Twists', 'Locs', 'Protective'];

const MOCK_LIBRARY = [
  {
    id: '1',
    name: 'Box Braids',
    category: 'Braids',
    duration: '2-4 weeks',
    difficulty: 'Moderate',
    hasTutorial: true,
  },
  {
    id: '2',
    name: 'Natural Twist-out',
    category: 'Natural',
    duration: '3-7 days',
    difficulty: 'Easy',
    hasTutorial: true,
  },
  {
    id: '3',
    name: 'Cornrows',
    category: 'Braids',
    duration: '1-2 weeks',
    difficulty: 'Advanced',
    hasTutorial: false,
  },
  {
    id: '4',
    name: 'Bantu Knots',
    category: 'Natural',
    duration: '3-5 days',
    difficulty: 'Moderate',
    hasTutorial: true,
  },
];

export default function LibraryScreen() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredLibrary = MOCK_LIBRARY.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Search color="#888" size={20} />
          <Text style={styles.searchText}>Search styles or tutorials...</Text>
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                activeCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                activeCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredLibrary}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Image</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.styleName}>{item.name}</Text>
              
              <View style={styles.metaRow}>
                <View style={styles.metaBadge}>
                  <Clock size={12} color="#666" style={{ marginRight: 4 }} />
                  <Text style={styles.metaText}>{item.duration}</Text>
                </View>
                <View style={styles.metaBadge}>
                  <Scissors size={12} color="#666" style={{ marginRight: 4 }} />
                  <Text style={styles.metaText}>{item.difficulty}</Text>
                </View>
              </View>

              {item.hasTutorial && (
                <TouchableOpacity style={styles.tutorialButton}>
                  <PlayCircle size={16} color="#007AFF" style={{ marginRight: 6 }} />
                  <Text style={styles.tutorialText}>Watch At-Home Tutorial</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 12,
  },
  searchText: {
    marginLeft: 8,
    color: '#888',
    fontSize: 16,
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoriesScroll: {
    padding: 16,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  categoryButtonActive: {
    backgroundColor: '#1a1a1a',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row',
  },
  imagePlaceholder: {
    width: 100,
    height: 120,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    color: '#888',
    fontWeight: '600',
  },
  cardInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  styleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  tutorialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f4fe',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  tutorialText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
});
