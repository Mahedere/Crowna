import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, SafeAreaView,
  KeyboardAvoidingView, Platform, Image, Dimensions, TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleAuth = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(onboarding)');
    }, 900);
  };

  return (
    <View style={styles.container}>
      {/* Background image */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1531123414708-f5b24479904d?auto=format&fit=crop&w=900&q=80' }}
        style={styles.bg}
      />
      {/* Dark gradient overlay */}
      <LinearGradient
        colors={['rgba(9,9,11,0.15)', 'rgba(9,9,11,0.6)', 'rgba(9,9,11,0.97)']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          {/* Brand */}
          <View style={styles.brand}>
            <Text style={styles.brandName}>Crowna</Text>
            <Text style={styles.tagline}>Your hair, your crown. 👑</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor={COLORS.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={COLORS.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Primary CTA */}
            <TouchableOpacity style={styles.primaryBtn} onPress={handleAuth} activeOpacity={0.85}>
              <LinearGradient
                colors={[COLORS.primary, '#FF8C42']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.primaryBtnGradient}
              >
                <Text style={styles.primaryBtnText}>
                  {loading ? 'Signing in...' : 'Continue'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Secondary CTA */}
            <TouchableOpacity style={styles.secondaryBtn} onPress={handleAuth} activeOpacity={0.8}>
              <Text style={styles.secondaryBtnText}>Create an account</Text>
            </TouchableOpacity>

            <Text style={styles.legal}>
              By continuing you agree to Crowna's Terms & Privacy Policy.
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  bg:        { position: 'absolute', top: 0, left: 0, width, height, resizeMode: 'cover' },
  safe:      { flex: 1 },
  content: {
    flex: 1, justifyContent: 'flex-end',
    paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl,
  },

  brand: { marginBottom: SPACING.xxl * 1.5 },
  brandName: { ...TYPOGRAPHY.display, color: COLORS.white, fontSize: 52, marginBottom: SPACING.xs },
  tagline:   { ...TYPOGRAPHY.bodyLarge, color: 'rgba(255,255,255,0.6)' },

  form: { gap: SPACING.md },
  inputWrapper: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: RADIUS.md,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
  },
  input: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md + 2,
  },

  primaryBtn:          { borderRadius: RADIUS.md, overflow: 'hidden', marginTop: SPACING.xs },
  primaryBtnGradient:  { paddingVertical: SPACING.md + 2, alignItems: 'center' },
  primaryBtnText:      { ...TYPOGRAPHY.bodyLarge, color: COLORS.white, fontWeight: '700' },

  divider: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
  dividerText: { ...TYPOGRAPHY.caption, color: 'rgba(255,255,255,0.3)' },

  secondaryBtn: {
    borderRadius: RADIUS.md, paddingVertical: SPACING.md + 2,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
  },
  secondaryBtnText: { ...TYPOGRAPHY.bodyLarge, color: COLORS.white, fontWeight: '600' },

  legal: {
    ...TYPOGRAPHY.caption, color: 'rgba(255,255,255,0.25)',
    textAlign: 'center', lineHeight: 18,
  },
});
