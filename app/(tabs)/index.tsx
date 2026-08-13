import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Calendar, CheckCircle, ChevronRight, X } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppStore } from '@/lib/store';

export default function PlannerScreen() {
  const schedule = useAppStore((state) => state.schedule);
  const completeCurrentStyle = useAppStore((state) => state.completeCurrentStyle);

  const current = schedule.find(s => s.type === 'CURRENT');
  const next = schedule.find(s => s.type === 'NEXT');
  const upcoming = schedule.find(s => s.type === 'UPCOMING');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* CURRENT STYLE */}
        {current && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CURRENT</Text>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.styleName}>{current.style.name}</Text>
                  <Text style={styles.dateText}>{current.startDate} - {current.endDate}</Text>
                </View>
                <TouchableOpacity style={styles.actionButton} onPress={completeCurrentStyle}>
                  <CheckCircle color="#4CAF50" size={24} />
                  <Text style={styles.actionText}>Complete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* NEXT STYLE */}
        {next && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>NEXT</Text>
            <View style={[styles.card, styles.nextCard]}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.styleName}>{next.style.name}</Text>
                  <Text style={styles.dateText}>{next.startDate} - {next.endDate}</Text>
                </View>
                <View style={styles.optionsBadge}>
                  <Text style={styles.optionsText}>10 options available</Text>
                </View>
              </View>
              
              <View style={styles.actionsRow}>
                <TouchableOpacity style={[styles.smallButton, styles.primaryButton]}>
                  <Text style={styles.primaryButtonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.smallButton, styles.secondaryButton]}
                  onPress={() => router.push('/options-modal')}
                >
                  <Text style={styles.secondaryButtonText}>View Options (10)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <X color="#666" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* UPCOMING STYLE */}
        {upcoming && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>UPCOMING</Text>
            <View style={[styles.card, styles.upcomingCard]}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.styleName}>{upcoming.style.name}</Text>
                  <Text style={styles.dateText}>{upcoming.startDate} - {upcoming.endDate}</Text>
                </View>
                <ChevronRight color="#ccc" size={24} />
              </View>
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
    letterSpacing: 1.2,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  nextCard: {
    borderColor: '#1a1a1a',
    borderWidth: 1.5,
  },
  upcomingCard: {
    opacity: 0.7,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  styleName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 4,
  },
  optionsBadge: {
    backgroundColor: '#e6f4fe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  optionsText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
    backgroundColor: 'transparent',
  },
  smallButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#1a1a1a',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
  },
  secondaryButtonText: {
    color: '#1a1a1a',
    fontWeight: '600',
    fontSize: 14,
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});

