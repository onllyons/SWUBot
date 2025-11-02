import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { CheckSquare, Square } from 'lucide-react-native';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

import Header from '@/components/Header';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants/theme';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
      router.replace('/swubot'); // sau orice ecran după sign up
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') alert('Email already in use');
      else if (error.code === 'auth/invalid-email') alert('Invalid email');
      else if (error.code === 'auth/weak-password') alert('Weak password');
      else alert('Sign up failed: ' + error.message);
    }
  };

  const handleSignInPress = () => {
    router.push('/login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

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
              autoComplete="new-password"
            />

            <FormInput
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="new-password"
            />

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setKeepSignedIn(!keepSignedIn)}
              activeOpacity={0.7}
            >
              {keepSignedIn ? (
                <CheckSquare color={COLORS.primary} size={20} />
              ) : (
                <Square color={COLORS.textLight} size={20} />
              )}
              <Text style={styles.checkboxLabel}>Keep me signed in</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <Button
                title="Sign Up"
                onPress={handleSignUp}
                variant="primary"
                size="large"
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleSignInPress} activeOpacity={0.7}>
              <Text style={styles.footerLink}>Sign In</Text>
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
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
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
    marginBottom: SPACING.lg,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    marginTop: SPACING.xs,
  },
  checkboxLabel: {
    fontSize: 14,
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  buttonContainer: {
    width: '100%',
    marginTop: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 17,
    color: COLORS.textLight,
  },
  footerLink: {
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.primary,
  },
});
