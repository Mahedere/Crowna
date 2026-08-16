import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAuth() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(onboarding)');
    }, 1000);
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=800&q=80' }}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
        style={StyleSheet.absoluteFill}
      />
      
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Crowna</Text>
            <Text style={styles.subtitle}>Your hair, your crown.</Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email address"
              placeholderTextColor={COLORS.textMuted}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor={COLORS.textMuted}
            />

            <PrimaryButton 
              label={loading ? "Loading..." : "Sign in to your account"} 
              onPress={handleAuth}
              style={styles.buttonPrimary}
              textStyle={styles.buttonPrimaryText}
            />
            
            <PrimaryButton 
              label="Create an account" 
              onPress={handleAuth}
              variant="outline"
              style={styles.buttonSecondary}
              textStyle={styles.buttonSecondaryText}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: SPACING.xl,
    paddingBottom: SPACING.xxl * 1.5,
  },
  header: {
    marginBottom: SPACING.xxl,
  },
  title: {
    ...TYPOGRAPHY.h1,
    fontSize: 48,
    color: COLORS.surface,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.surface,
    opacity: 0.9,
    fontWeight: '400',
  },
  formContainer: {
    gap: SPACING.md,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.text,
  },
  buttonPrimary: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.primary,
  },
  buttonPrimaryText: {
    color: COLORS.surface,
  },
  buttonSecondary: {
    borderColor: 'rgba(255,255,255,0.5)',
  },
  buttonSecondaryText: {
    color: COLORS.surface,
  },
});
