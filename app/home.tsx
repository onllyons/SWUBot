import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import GradientButton from '@/components/GradientButton';
import { COLORS, SPACING, BORDER_RADIUS } from '@/constants/theme';
import * as Linking from 'expo-linking';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function HomeScreen() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleSWUBotPress = () => {
    router.push('/swubot');
  };

  const handleRegisterPress = () => {
    router.push('/register');
  };

  const handleLoginPress = () => {
    router.push('/login');
  };

  const handleDonatePress = () => {
    Linking.openURL('https://standwithus.com/donate/');
  };

  const stand_with_us = () => {
    Linking.openURL('https://linktr.ee/stand_with_us');
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);


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

            <Text style={styles.subtitle}>Powered by</Text>
            <Image
              source={require('../assets/images/standUs.png')}
              style={styles.standUs}
              resizeMode="contain"
            />

            <View style={styles.buttonsContainer}>
              <View style={styles.gap}>
                <GradientButton
                  title="SWUBot"
                  onPress={handleSWUBotPress}
                  size="large"
                />
                <GradientButton
                  title="Support our Work"
                  onPress={handleDonatePress}
                  size="large"
                />
                <GradientButton
                  title="Follow Us"
                  onPress={stand_with_us}
                  size="large"
                />
              </View>

              {!user && (
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
              )}

              <TouchableOpacity
                onPress={handleProfilePress}
                style={[{ marginTop: 20 }, styles.test]}
              >
                <Text style={styles.deleteLink}>My Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.test} onPress={() => Linking.openURL('https://botdelete.paperform.co/')}>
                <Text style={styles.linkText}>Delete Account</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.test} onPress={() => Linking.openURL('https://docs.google.com/document/d/1KGLF27e2W_CLrBDOLuns5wnyoZyWyiW0MhArbOOz0Ao/edit?usp=sharing')}>
                <Text style={styles.linkText}>Privacy Policy</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.test} onPress={() => Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSfLaKKmX7IY6anjbTe1nBS5H7WyUqeWNFQ8xhId8agmOY_mHA/formResponse')}>
                <Text style={styles.linkText}>User Data Deletion</Text>
              </TouchableOpacity>

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
    marginBottom: SPACING.xs,
  },
  standUs: {
    width: '100%',
    height: 25,
    // backgroundColor: 'red',
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    color: COLORS.text,
    fontWeight: 400,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'stretch',
  },
  gap: {
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
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.primary,
  },
  deleteLink: {
    color: COLORS.primary,
    fontWeight: '300',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 0,
  },
  test: {
    marginBottom: 4,
  },

});
