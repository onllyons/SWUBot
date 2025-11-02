import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import { COLORS, SPACING } from '@/constants/theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSend = () => {
  };

  const handleBackToSignIn = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you instructions to reset your password
          </Text>

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

            <View style={styles.buttonContainer}>
              <Button
                title="Send"
                onPress={handleSend}
                variant="primary"
                size="large"
              />
            </View>

            <TouchableOpacity
              style={styles.backToSignInContainer}
              onPress={handleBackToSignIn}
              activeOpacity={0.7}
            >
              <Text style={styles.backToSignInText}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
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
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    justifyContent: 'center',
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
    lineHeight: 24,
  },
  form: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  backToSignInContainer: {
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  backToSignInText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
