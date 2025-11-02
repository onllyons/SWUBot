import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { COLORS, SPACING, BORDER_RADIUS } from '@/constants/theme';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/login');
  };

  const handleBack = () => {
    router.back();
  };

if (!user) {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>You are not logged in.</Text>
      <TouchableOpacity onPress={() => router.replace('/login')} style={styles.backButton}>
        <Text style={styles.backText}>Go to Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
        
    </View>
  );
}


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../assets/images/default-avatar.jpg')}
          style={styles.avatar}
          resizeMode="cover"
        />

        <Text style={styles.title}>Welcome 👋</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.uid}>User ID: {user.uid}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
  },
  uid: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  logoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
  },
  logoutText: {
    color: COLORS.background,
    fontWeight: '600',
    fontSize: 16,
  },
  backButton: {
    
  },
  backText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
  },
  loadingText: {
    color: COLORS.textLight,
    marginTop: 12,
    marginBottom: 12,
    fontSize: 24,
  },
});
