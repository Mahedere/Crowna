import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, SafeAreaView,
  ScrollView, Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '@/lib/store';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS } from '@/constants/theme';
import { ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const QUESTIONS = [
  {
    id: 'hairType',
    title: 'What is your hair type?',
    subtitle: 'This helps us find styles that work naturally with your texture.',
    options: [
      { label: 'Straight (Type 1)', emoji: '〜' },
      { label: 'Wavy (Type 2)',     emoji: '≈' },
      { label: 'Curly (Type 3)',    emoji: '○' },
      { label: 'Coily (Type 4)',    emoji: '◎' },
    ],
  },
  {
    id: 'hairLength',
    title: 'How long is your hair?',
    subtitle: 'Length determines which styles are possible for you right now.',
    options: [
      { label: 'Short (Ear to chin)', emoji: '✂' },
      { label: 'Medium (Shoulder)', emoji: '📏' },
      { label: 'Long (Mid-back +)', emoji: '🌊' },
    ],
  },
  {
    id: 'maintenance',
    title: 'What is your preferred maintenance level?',
    subtitle: 'How much time do you want to spend on your hair daily?',
    options: [
      { label: 'Low (Wash & Go)', emoji: '⏱' },
      { label: 'Medium (Some styling)', emoji: '✨' },
      { label: 'High (Intricate styles)', emoji: '👑' },
    ],
  },
  {
    id: 'hairGoal',
    title: 'What is your main hair goal?',
    subtitle: 'We will tailor recommendations to help you reach it.',
    options: [
      { label: 'Growth & Length Retention', emoji: '🌱' },
      { label: 'Moisture & Hydration', emoji: '💧' },
      { label: 'Definition & Volume', emoji: '🌟' },
      { label: 'Protection (Low Manipulation)', emoji: '🛡' },
    ],
  },
  {
    id: 'porosity',
    title: 'Do you know your hair porosity?',
    subtitle: 'This affects how your hair absorbs and retains moisture.',
    options: [
      { label: 'Low (Products sit on top)', emoji: '🌧' },
      { label: 'Normal (Easy to manage)', emoji: '⚖' },
      { label: 'High (Absorbs quickly, dries fast)', emoji: '🏜' },
      { label: 'I am not sure', emoji: '🤔' },
    ],
  },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState(-1); // -1 is Intro, 0-N are questions, N+1 is Signup, N+2 is finishing
  const userProfile = useAppStore((s) => s.userProfile);
  const setProfileAnswer = useAppStore((s) => s.setProfileAnswer);

  const handleSelect = (questionId: string, label: string) => {
    setProfileAnswer(questionId, label);
    setTimeout(() => {
      setStep(step + 1);
    }, 250);
  };

  const handleFinish = () => {
    setStep(QUESTIONS.length + 2); // Finishing state
    setTimeout(() => router.replace('/(tabs)'), 2000);
  };

  // 1. INTRO SCREEN
  if (step === -1) {
    return (
      <View style={styles.introScreen}>
        <LinearGradient colors={[COLORS.background, '#1a0a1e', COLORS.background]} style={StyleSheet.absoluteFill} />
        <SafeAreaView style={styles.introSafe}>
          <View style={styles.introContent}>
            <Text style={styles.introEmoji}>👑</Text>
            <Text style={styles.introTitle}>Welcome to Crowna</Text>
            <Text style={styles.introSubtitle}>Your hair, your crown.</Text>
            <Text style={styles.introBody}>
              Let's get to know your hair so we can build a personalized styling plan just for you.
            </Text>
          </View>
          <TouchableOpacity style={styles.introBtn} onPress={() => setStep(0)} activeOpacity={0.8}>
            <LinearGradient
              colors={[COLORS.primary, '#FF8C42']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.introBtnGradient}
            >
              <Text style={styles.introBtnText}>Begin Profile</Text>
              <ChevronRight color={COLORS.white} size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }

  // 3. SIGNUP / TRIAL SCREEN (After questions)
  if (step === QUESTIONS.length) {
    return (
      <View style={styles.introScreen}>
        <LinearGradient colors={[COLORS.background, '#2a1a0e', COLORS.background]} style={StyleSheet.absoluteFill} />
        <SafeAreaView style={styles.introSafe}>
          <View style={styles.introContent}>
            <Text style={styles.introEmoji}>✨</Text>
            <Text style={styles.introTitle}>Profile Complete</Text>
            <Text style={styles.introSubtitle}>Unlock your personalized recommendations.</Text>
            <Text style={styles.introBody}>
              Create a free account to save your profile, track your hair journey, and get smart reminders.
            </Text>

            <TouchableOpacity style={[styles.introBtn, { width: '100%', marginTop: SPACING.xl }]} onPress={handleFinish} activeOpacity={0.8}>
              <LinearGradient
                colors={[COLORS.primary, '#FF8C42']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.introBtnGradient}
              >
                <Text style={styles.introBtnText}>Sign Up for Free</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.skipBtn} onPress={handleFinish}>
              <Text style={styles.skipBtnText}>Continue as Guest (Limited Features)</Text>
            </TouchableOpacity>

          </View>
        </SafeAreaView>
      </View>
    );
  }

  // 4. SUCCESS / FINISHING SCREEN
  if (step === QUESTIONS.length + 2) {
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

  // 2. QUESTIONS SCREEN
  const q = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      {/* Step counter */}
      <View style={styles.stepRow}>
        <Text style={styles.stepText}>Step {step + 1} of {QUESTIONS.length}</Text>
        {step > 0 ? (
          <TouchableOpacity onPress={() => setStep(step - 1)}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setStep(-1)}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Question */}
        <View style={styles.qHeader}>
          <Text style={styles.question}>{q.title}</Text>
          <Text style={styles.qSubtitle}>{q.subtitle}</Text>
        </View>

        {/* Option list (Text-based, no images) */}
        <View style={styles.optionsList}>
          {q.options.map((opt) => {
            const selected = userProfile[q.id] === opt.label;
            return (
              <TouchableOpacity
                key={opt.label}
                style={[
                  styles.optRow,
                  selected && styles.optRowSelected,
                ]}
                onPress={() => handleSelect(q.id, opt.label)}
                activeOpacity={0.7}
              >
                <View style={styles.optRowLeft}>
                  <Text style={styles.optEmoji}>{opt.emoji}</Text>
                  <Text style={[styles.optLabel, selected && styles.optLabelSelected]}>{opt.label}</Text>
                </View>
                <View style={[styles.radio, selected && styles.radioSelected]}>
                  {selected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  // Intro Screen
  introScreen: { flex: 1, backgroundColor: COLORS.background },
  introSafe: { flex: 1, justifyContent: 'space-between', padding: SPACING.xl },
  introContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  introEmoji: { fontSize: 80, marginBottom: SPACING.lg },
  introTitle: { ...TYPOGRAPHY.display, color: COLORS.white, textAlign: 'center', marginBottom: SPACING.xs },
  introSubtitle: { ...TYPOGRAPHY.h2, color: COLORS.primary, textAlign: 'center', marginBottom: SPACING.xl },
  introBody: { ...TYPOGRAPHY.bodyLarge, color: COLORS.textSecondary, textAlign: 'center', paddingHorizontal: SPACING.md },
  
  introBtn: { borderRadius: RADIUS.lg, overflow: 'hidden', marginBottom: SPACING.lg },
  introBtnGradient: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: SPACING.md + 4, gap: SPACING.sm 
  },
  introBtnText: { ...TYPOGRAPHY.bodyLarge, color: COLORS.white, fontWeight: '700' },
  
  skipBtn: { paddingVertical: SPACING.md, alignItems: 'center' },
  skipBtnText: { ...TYPOGRAPHY.body, color: COLORS.textMuted, textDecorationLine: 'underline' },

  // Progress
  progressTrack: {
    height: 3, backgroundColor: 'rgba(255,255,255,0.05)', marginHorizontal: SPACING.lg,
    marginTop: SPACING.md, borderRadius: 2,
  },
  progressFill: {
    height: '100%', backgroundColor: COLORS.primary, borderRadius: 2,
  },

  // Header
  stepRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.xs,
  },
  stepText: { ...TYPOGRAPHY.caption, color: COLORS.primary, fontWeight: '700', letterSpacing: 1 },
  backText:  { ...TYPOGRAPHY.caption, color: COLORS.textSecondary },

  scrollContent: { paddingBottom: SPACING.xxl },

  qHeader: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.xl },
  question: { ...TYPOGRAPHY.display, color: COLORS.white, marginBottom: SPACING.sm, lineHeight: 44 },
  qSubtitle: { ...TYPOGRAPHY.bodyLarge, color: COLORS.textSecondary },

  // Text Options
  optionsList: { paddingHorizontal: SPACING.lg, gap: SPACING.md },
  optRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1, borderColor: COLORS.border,
  },
  optRowSelected: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(255,107,53,0.05)',
  },
  optRowLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  optEmoji: { fontSize: 24 },
  optLabel: { ...TYPOGRAPHY.h3, color: COLORS.white, fontSize: 16 },
  optLabelSelected: { color: COLORS.primary },
  
  radio: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: COLORS.textMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  radioSelected: { borderColor: COLORS.primary },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary },

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
