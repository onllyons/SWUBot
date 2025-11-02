import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, BORDER_RADIUS } from '@/constants/theme';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  size?: 'large' | 'small';
}

export default function GradientButton({
  title,
  onPress,
  size = 'large',
}: GradientButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, size === 'large' && styles.largeButton, size === 'small' && styles.smallButton]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, size === 'large' && styles.largeGradient, size === 'small' && styles.smallGradient]}
      >
        <Text style={[styles.text, size === 'large' && styles.largeText, size === 'small' && styles.smallText]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
    borderRadius: BORDER_RADIUS.xl,
  },
  largeButton: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  smallButton: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.xl,
  },
  largeGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minWidth: 160,
  },
  smallGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    minWidth: 110,
  },
  text: {
    color: COLORS.background,
    fontWeight: '600',
  },
  largeText: {
    fontSize: 17,
  },
  smallText: {
    fontSize: 15,
  },
});
