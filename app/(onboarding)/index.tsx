import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useAppStore } from '@/lib/store';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const QUESTIONS = [
  {
    id: 'hairType',
    title: "What's your hair type?",
    subtitle: "Select the pattern that best matches your natural hair.",
    options: [
      { label: 'Straight', image: 'https://images.unsplash.com/photo-1598555192131-0428d087c0eb?w=500&q=80' },
      { label: 'Wavy', image: 'https://images.unsplash.com/photo-1580226330058-2921c5b8e907?w=500&q=80' },
      { label: 'Curly', image: 'https://images.unsplash.com/photo-1582218080072-4660eb00fcb4?w=500&q=80' },
      { label: 'Coily', image: 'https://images.unsplash.com/photo-1615165487779-1ce505b00c3c?w=500&q=80' },
    ],
  },
  {
    id: 'hairLength',
    title: "How long is your hair?",
    subtitle: "This helps us recommend styles that work for your length.",
    options: [
      { label: 'Short', image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?w=500&q=80' },
      { label: 'Medium', image: 'https://images.unsplash.com/photo-1588691535490-252f5dcb3947?w=500&q=80' },
      { label: 'Long', image: 'https://images.unsplash.com/photo-1610427845600-e228be5e3656?w=500&q=80' },
    ],
  }
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  
  const userProfile = useAppStore((state) => state.userProfile);
  const setProfileAnswer = useAppStore((state) => state.setProfileAnswer);

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep) / QUESTIONS.length) * 100;

  const handleSelect = (option: string) => {
    setProfileAnswer(currentQuestion.id, option);
    
    setTimeout(() => {
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsFinishing(true);
        setTimeout(() => {
          router.replace('/(tabs)');
        }, 1500); // Show success screen briefly
      }
    }, 400);
  };

  if (isFinishing) {
    return (
      <View style={styles.successContainer}>
        <LinearGradient colors={[COLORS.background, COLORS.primaryLight]} style={StyleSheet.absoluteFill} />
        <Text style={styles.successEmoji}>👑</Text>
        <Text style={styles.successTitle}>Your Crowna profile is ready</Text>
        <Text style={styles.successSubtitle}>Preparing your personalized hairstyle recommendations...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{currentQuestion.title}</Text>
        <Text style={styles.subtitle}>{currentQuestion.subtitle}</Text>
        
        <View style={styles.optionsGrid}>
          {currentQuestion.options.map((option) => {
            const isSelected = userProfile[currentQuestion.id] === option.label;
            return (
              <TouchableOpacity
                key={option.label}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected
                ]}
                onPress={() => handleSelect(option.label)}
                activeOpacity={0.9}
              >
                <Image source={{ uri: option.image }} style={styles.optionImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={styles.imageOverlay}
                />
                {isSelected && (
                  <View style={styles.selectedOverlay}>
                    <View style={styles.checkCircle} />
                  </View>
                )}
                <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
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
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  progressContainer: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.round,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.round,
  },
  content: {
    padding: SPACING.xl,
    paddingBottom: SPACING.xxl * 2,
  },
  title: {
    ...TYPOGRAPHY.h1,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.textMuted,
    marginBottom: SPACING.xxl,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  optionCard: {
    width: (width - SPACING.xl * 2 - SPACING.md) / 2, // 2 columns
    height: 200,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.border,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  optionCardSelected: {
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  optionImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFill as any,
    backgroundColor: 'rgba(224, 122, 95, 0.2)', // Primary color with opacity
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  optionLabel: {
    position: 'absolute',
    bottom: SPACING.md,
    left: SPACING.md,
    right: SPACING.md,
    ...TYPOGRAPHY.h3,
    color: COLORS.surface,
    textAlign: 'center',
  },
  optionLabelSelected: {
    color: COLORS.surface,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  successEmoji: {
    fontSize: 64,
    marginBottom: SPACING.lg,
  },
  successTitle: {
    ...TYPOGRAPHY.h1,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  successSubtitle: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});
