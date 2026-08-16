import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bookmark } from 'lucide-react-native';
import { HairstyleData } from '@/lib/mockHairstyles';
import { COLORS, RADIUS, TYPOGRAPHY, SHADOWS } from '@/constants/theme';
import { MatchBadge } from './MatchBadge';

const { width } = Dimensions.get('window');

interface StyleCardProps {
  styleData: HairstyleData;
  onPress: () => void;
  showMatch?: boolean;
  size?: 'large' | 'medium' | 'small';
}

export function StyleCard({ styleData, onPress, showMatch = false, size = 'large' }: StyleCardProps) {
  const cardHeight = size === 'large' ? 400 : size === 'medium' ? 280 : 200;
  const cardWidth = size === 'large' ? '100%' : size === 'medium' ? width * 0.7 : width * 0.45;

  return (
    <TouchableOpacity 
      style={[styles.container, { height: cardHeight, width: cardWidth }]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: styleData.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      
      <TouchableOpacity style={styles.favoriteBtn}>
        <Bookmark color={COLORS.surface} size={20} />
      </TouchableOpacity>

      <View style={styles.content}>
        {showMatch && styleData.matchScore && (
          <View style={styles.badgeContainer}>
            <MatchBadge score={styleData.matchScore} />
          </View>
        )}
        <Text style={styles.title} numberOfLines={1}>{styleData.name}</Text>
        <Text style={styles.subtitle}>{styleData.category} • {styleData.duration}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.border,
    ...SHADOWS.sm,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: RADIUS.round,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.surface,
    marginBottom: 4,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.surface,
    opacity: 0.8,
  },
});
