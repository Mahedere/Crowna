import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    // Dummy login logic for now since Supabase isn't fully configured
    // const { error } = await supabase.auth.signInWithPassword({
    //   email: email,
    //   password: password,
    // });
    
    // if (error) Alert.alert(error.message);
    // else router.replace('/(onboarding)');
    
    // Mock login success
    setTimeout(() => {
      setLoading(false);
      router.replace('/(onboarding)');
    }, 1000);
  }

  async function signUpWithEmail() {
    setLoading(true);
    // const {
    //   data: { session },
    //   error,
    // } = await supabase.auth.signUp({
    //   email: email,
    //   password: password,
    // });

    // if (error) Alert.alert(error.message);
    // else if (!session) Alert.alert('Please check your inbox for email verification!');
    
    // Mock signup success
    setTimeout(() => {
      setLoading(false);
      router.replace('/(onboarding)');
    }, 1000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Crowna</Text>
        <Text style={styles.subtitle}>Your hair, your crown.</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email"
            placeholderTextColor="#888"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#888"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonPrimary} onPress={signInWithEmail} disabled={loading}>
            <Text style={styles.buttonTextPrimary}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary} onPress={signUpWithEmail} disabled={loading}>
            <Text style={styles.buttonTextSecondary}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 48,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#1a1a1a',
  },
  buttonContainer: {
    gap: 12,
  },
  buttonPrimary: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonTextPrimary: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  buttonTextSecondary: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: '600',
  },
});
