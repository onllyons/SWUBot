import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'large' | 'small';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'large'
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        size === 'large' ? styles.largeButton : styles.smallButton,
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text
        style={[
          styles.buttonText,
          variant === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText,
          size === 'large' ? styles.largeButtonText : styles.smallButtonText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.xl,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: SPACING.xl,
    minWidth: 160,
  },
  smallButton: {
    paddingVertical: 12,
    paddingHorizontal: SPACING.lg,
    minWidth: 120,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  buttonText: {
    textAlign: 'center',
  },
  largeButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  smallButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
  primaryButtonText: {
    color: COLORS.background,
  },
  secondaryButtonText: {
    color: COLORS.text,
  },
});
