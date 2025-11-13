import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { COLORS, SPACING } from '@/constants/theme';

export default function Header() {
  const router = useRouter();

  const handleBackPress = () => {
    try {
      if (router.canGoBack?.()) {
        router.back();
      } else {
        router.push('/home');
      }
    } catch {
      router.push('/home');
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackPress}
      >
        <ArrowLeft color={COLORS.primary} size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACING.md,
    // paddingVertical: SPACING.md,
    paddingTop: Platform.OS === 'ios' ? SPACING.xxl + SPACING.xs : SPACING.md,
    backgroundColor: COLORS.background,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
