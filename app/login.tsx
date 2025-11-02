import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

import * as Linking from 'expo-linking';
import Header from '@/components/Header';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import { COLORS, SPACING } from '@/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      router.replace('/swubot'); // sau pagina principală după login
    } catch (error) {
      if (error.code === 'auth/invalid-email') alert('Invalid email');
      else if (error.code === 'auth/user-not-found') alert('User not found');
      else if (error.code === 'auth/wrong-password') alert('Wrong password');
      else alert('Login failed: ' + error.message);
    }
  };

  const handleForgotPasswordPress = () => {
    Linking.openURL('https://botdelete.paperform.co/');
  };

  const handleCreateProfile = () => {
    router.push('/register');
  };

  // const handleForgotPasswordPress = () => {
  //   router.push('/forgot-password');
  // };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>

          <View style={styles.form}>
            <FormInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <FormInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="current-password"
            />

            <View style={styles.buttonContainer}>
              <Button
                title="Login"
                onPress={handleLogin}
                variant="primary"
                size="large"
              />
            </View>

            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={handleCreateProfile}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPasswordText}>Create new profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPasswordPress}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACING.xxl,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: SPACING.xl,
  },
  form: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: SPACING.md,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  forgotPasswordText: {
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.primary,
  },
});
