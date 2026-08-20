import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, SafeAreaView,
  ScrollView, Image, Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '@/lib/store';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

const QUESTIONS = [
  {
    id: 'hairType',
    title: 'What is your\nhair type?',
    options: [
      { label: 'Straight', image: 'https://images.unsplash.com/photo-1598555192131-0428d087c0eb?w=600&q=80', emoji: '〜' },
      { label: 'Wavy',     image: 'https://images.unsplash.com/photo-1580226330058-2921c5b8e907?w=600&q=80', emoji: '≈' },
      { label: 'Curly',    image: 'https://images.unsplash.com/photo-1582218080072-4660eb00fcb4?w=600&q=80', emoji: '○' },
      { label: 'Coily',    image: 'https://images.unsplash.com/photo-1615165487779-1ce505b00c3c?w=600&q=80', emoji: '◎' },
    ],
  },
  {
    id: 'hairLength',
    title: 'How long is\nyour hair?',
    options: [
      { label: 'Short',  image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?w=600&q=80', emoji: '▪' },
      { label: 'Medium', image: 'https://images.unsplash.com/photo-1588691535490-252f5dcb3947?w=600&q=80', emoji: '▬' },
      { label: 'Long',   image: 'https://images.unsplash.com/photo-1615165487779-1ce505b00c3c?w=600&q=80', emoji: '▐' },
    ],
  },
  {
    id: 'maintenance',
    title: 'Your preferred\nmaintenance level?',
    options: [
      { label: 'Low',    image: 'https://images.unsplash.com/photo-1531123414708-f5b24479904d?w=600&q=80', emoji: '·' },
      { label: 'Medium', image: 'https://images.unsplash.com/photo-1588691535490-252f5dcb3947?w=600&q=80', emoji: '··' },
      { label: 'High',   image: 'https://images.unsplash.com/photo-1615165487779-1ce505b00c3c?w=600&q=80', emoji: '···' },
    ],
  },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const userProfile = useAppStore((s) => s.userProfile);
  const setProfileAnswer = useAppStore((s) => s.setProfileAnswer);

  const q = QUESTIONS[step];
  const progress = (step / QUESTIONS.length) * 100;

  const handleSelect = (label: string) => {
    setProfileAnswer(q.id, label);
    setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1);
      } else {
        setIsFinishing(true);
        setTimeout(() => router.replace('/(tabs)'), 1800);
      }
    }, 380);
  };

  if (isFinishing) {
    return (
      <View style={styles.successScreen}>
        <LinearGradient colors={['#09090B', '#1a0a1e', '#09090B']} style={StyleSheet.absoluteFill} />
        <Text style={styles.successEmoji}>👑</Text>
        <Text style={styles.successTitle}>Your Crowna{'\n'}profile is ready.</Text>
        <Text style={styles.successSub}>Building your personalized style recommendations...</Text>
        <View style={styles.successDots}>
          {[0,1,2].map(i => <View key={i} style={[styles.dot, { opacity: 0.4 + i * 0.3 }]} />)}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      {/* Step counter */}
      <View style={styles.stepRow}>
        <Text style={styles.stepText}>{step + 1} of {QUESTIONS.length}</Text>
        {step > 0 && (
          <TouchableOpacity onPress={() => setStep(step - 1)}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Question */}
      <Text style={styles.question}>{q.title}</Text>

      {/* Option cards */}
      <ScrollView
        contentContainerStyle={[
          styles.options,
          q.options.length === 3 && styles.optionsThree,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {q.options.map((opt) => {
          const selected = userProfile[q.id] === opt.label;
          return (
            <TouchableOpacity
              key={opt.label}
              style={[
                styles.optCard,
                q.options.length === 3 && styles.optCardWide,
                selected && styles.optCardSelected,
              ]}
              onPress={() => handleSelect(opt.label)}
              activeOpacity={0.85}
            >
              <Image source={{ uri: opt.image }} style={styles.optImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.75)']}
                style={styles.optGradient}
              />
              {selected && (
                <View style={styles.selectedRing} />
              )}
              <Text style={styles.optLabel}>{opt.label}</Text>
              {selected && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_SIZE = (width - SPACING.lg * 2 - SPACING.md) / 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  progressTrack: {
    height: 2, backgroundColor: COLORS.border, marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
  },
  progressFill: {
    height: '100%', backgroundColor: COLORS.primary, borderRadius: 1,
  },

  stepRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.xs,
  },
  stepText: { ...TYPOGRAPHY.caption, color: COLORS.textMuted },
  backText:  { ...TYPOGRAPHY.caption, color: COLORS.textSecondary },

  question: {
    ...TYPOGRAPHY.display,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },

  options: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  optionsThree: { flexDirection: 'column', flexWrap: 'nowrap' },

  optCard: {
    width: CARD_SIZE, height: CARD_SIZE * 1.25,
    borderRadius: RADIUS.lg, overflow: 'hidden',
    backgroundColor: COLORS.surface,
  },
  optCardWide: {
    width: '100%', height: 90, flexDirection: 'row',
  },
  optCardSelected: {
    borderWidth: 2, borderColor: COLORS.primary,
  },
  optImage: { width: '100%', height: '100%' },
  optGradient: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
  },

  selectedRing: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 2, borderColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    backgroundColor: 'rgba(255,107,53,0.12)',
  },
  optLabel: {
    position: 'absolute', bottom: SPACING.md, left: SPACING.md,
    ...TYPOGRAPHY.h3, color: COLORS.white,
  },
  checkmark: {
    position: 'absolute', top: SPACING.sm, right: SPACING.sm,
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center',
  },
  checkmarkText: { color: COLORS.white, fontWeight: '800', fontSize: 13 },

  // Success screen
  successScreen: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.xl },
  successEmoji:  { fontSize: 72, marginBottom: SPACING.xl },
  successTitle: {
    ...TYPOGRAPHY.display, color: COLORS.text, textAlign: 'center',
    marginBottom: SPACING.md,
  },
  successSub: {
    ...TYPOGRAPHY.bodyLarge, color: COLORS.textMuted, textAlign: 'center',
    lineHeight: 24,
  },
  successDots: {
    flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.xl,
  },
  dot: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary,
  },
});
