import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, LogIn, Flag } from 'lucide-react-native';
import { WebView } from 'react-native-webview';
import { COLORS, SPACING } from '@/constants/theme';

export default function SWUBotScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const handleLoginPress = () => {
  };

  const handleReportPress = () => {
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <ArrowLeft color={COLORS.primary} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLoginPress}
          activeOpacity={0.7}
        >
          <LogIn color={COLORS.primary} size={20} />
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleReportPress}
          activeOpacity={0.7}
        >
          <Flag color={COLORS.primary} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: 'https://chatbase.co/chatbot-iframe/7MCQ5NGEaFRzsodSq-G6n' }}
          style={styles.webview}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xs,
    paddingTop: Platform.OS === 'ios' ? SPACING.xxl + SPACING.xs : SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  loginText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
