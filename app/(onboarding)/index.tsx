import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAppStore } from '@/lib/store';

const QUESTIONS = [
  {
    id: 'hairType',
    title: "What's your hair type?",
    options: ['Straight', 'Wavy', 'Curly', 'Coily'],
  },
  {
    id: 'hairTexture',
    title: "What's your hair texture?",
    options: ['Fine', 'Medium', 'Thick'],
  },
  {
    id: 'hairLength',
    title: "What's your hair length?",
    options: ['Short', 'Medium', 'Long', 'Very Long'],
  },
  {
    id: 'faceShape',
    title: "What's your face shape?",
    options: ['Oval', 'Round', 'Square', 'Heart', 'Oblong', 'Diamond'],
  },
  {
    id: 'maintenance',
    title: "How much maintenance do you prefer?",
    options: ['Low', 'Medium', 'High'],
  },
  {
    id: 'frequency',
    title: "How often do you change hairstyles?",
    options: ['Weekly', 'Every 2 weeks', 'Monthly', 'Every 2+ months'],
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const userProfile = useAppStore((state) => state.userProfile);
  const setProfileAnswer = useAppStore((state) => state.setProfileAnswer);

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep) / QUESTIONS.length) * 100;

  const handleSelect = (option: string) => {
    setProfileAnswer(currentQuestion.id, option);
    
    // Give a small delay for visual feedback before moving to next question
    setTimeout(() => {
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Save profile and navigate to main tabs
        console.log('Final Profile:', useAppStore.getState().userProfile);
        router.replace('/(tabs)');
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {currentStep > 0 ? (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backButton} />
        )}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.stepText}>{currentStep + 1} of {QUESTIONS.length}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{currentQuestion.title}</Text>
        
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option) => {
            const isSelected = userProfile[currentQuestion.id] === option;
            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  isSelected && styles.optionButtonSelected
                ]}
                onPress={() => handleSelect(option)}
              >
                <Text style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected
                ]}>
                  {option}
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 60,
  },
  backText: {
    fontSize: 16,
    color: '#666',
  },
  progressContainer: {
    flex: 1,
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 2,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    width: 40,
    textAlign: 'right',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 32,
    marginTop: 20,
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  optionButtonSelected: {
    borderColor: '#1a1a1a',
    backgroundColor: '#f8f8f8',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
});
