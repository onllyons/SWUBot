import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { ArrowLeft, LogIn, Flag, User } from 'lucide-react-native';
import { WebView } from 'react-native-webview';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import * as Linking from 'expo-linking';
import { COLORS, SPACING } from '@/constants/theme';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function SWUBotScreen() {
  const router = useRouter();
  const [showReport, setShowReport] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleBackPress = () => router.back();
  const handleLoginPress = () => router.push('/login');
  const handleReportPress = () => setShowReport(true);
  const handleCancel = () => setShowReport(false);

  const handleSend = () => {
    const subject = encodeURIComponent('SWUBot Report');
    const body = encodeURIComponent(message);
    const email = 'social@standwithus.com';
    const url = `mailto:${email}?subject=${subject}&body=${body}`;
    Linking.openURL(url);
    setShowReport(false);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={handleBackPress}>
          <ArrowLeft color={COLORS.primary} size={24} />
        </TouchableOpacity>

        {/* dacă e logat, afișăm emailul, altfel butonul login */}
        {user ? (
          <View style={styles.userInfo}>
            <User color={COLORS.primary} size={20} />
            <Text style={styles.userText}>
              {user.email.length > 20 ? user.email.slice(0, 20) + '...' : user.email}
            </Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
            <LogIn color={COLORS.primary} size={20} />
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.iconButton} onPress={handleReportPress}>
          <Flag color={COLORS.primary} size={24} />
        </TouchableOpacity>
      </View>

      {/* webview */}
      <View style={styles.webviewContainer}>
        <WebView
          incognito={true}
          key={user ? user.uid : 'logged-out'}
          source={{ uri: 'https://chatbase.co/chatbot-iframe/7MCQ5NGEaFRzsodSq-G6n' }}
          style={styles.webview}
        />
      </View>

      {/* report modal */}
      <Modal visible={showReport} transparent animationType="fade">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Report an Issue.</Text>
              <TextInput
                style={styles.textarea}
                placeholder="Describe the issue..."
                placeholderTextColor={COLORS.textLight}
                value={message}
                onChangeText={setMessage}
                multiline
                textAlignVertical="top"
              />
              <View style={styles.modalButtons}>
                <Button title="Send" onPress={handleSend} variant="primary" size="large" />
                <Button title="Cancel" onPress={handleCancel} variant="secondary" size="large" />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    // paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingTop: Platform.OS === 'ios' ? SPACING.sm + SPACING.sm + + SPACING.xs + SPACING.xs : SPACING.md,
  },
  iconButton: {
    width: 44, height: 44,
    alignItems: 'center', justifyContent: 'center',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
  },
  loginText: { fontSize: 16, fontWeight: '600', color: COLORS.primary },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: SPACING.md,
  },
  userText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.primary,
  },
  webviewContainer: { flex: 1 },
  webview: { flex: 1 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000085',
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 27,
    fontWeight: '400',
    textAlign: 'center',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  textarea: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.backgroundSecondary,
    marginBottom: SPACING.md,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm,
    marginTop: SPACING.md,
    marginBottom: SPACING.xxl,
  },
});
