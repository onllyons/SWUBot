import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import GradientButton from '@/components/GradientButton';
import { COLORS, SPACING, BORDER_RADIUS } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  const handleSWUBotPress = () => {
    router.push('/swubot');
  };

  const handleDonatePress = () => {
  };

  const handleRegisterPress = () => {
    router.push('/register');
  };

  const handleLoginPress = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.card}>
            <Image
              source={require('../assets/images/swu-bot.png')}
              style={styles.image}
              resizeMode="contain"
            />


            <Text style={styles.title}>Hi, I'm SWUBot</Text>
            <Text style={styles.subtitle}>Powered by StandWithUs</Text>

            <View style={styles.buttonsContainer}>
              <GradientButton
                title="SWUBot"
                onPress={handleSWUBotPress}
                size="large"
              />
              <GradientButton
                title="Donate"
                onPress={handleDonatePress}
                size="large"
              />

              <View style={styles.secondaryButtonsRow}>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={handleRegisterPress}
                  activeOpacity={0.7}
                >
                  <Text style={styles.secondaryButtonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={handleLoginPress}
                  activeOpacity={0.7}
                >
                  <Text style={styles.secondaryButtonText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    width: '100%',
  },
  card: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.xl,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xxl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xxl,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'stretch',
    gap: SPACING.sm,
  },
  secondaryButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.primary,
  },
});
