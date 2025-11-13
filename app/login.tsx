import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

import * as Linking from "expo-linking";
import Header from "@/components/Header";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import { COLORS, SPACING } from "@/constants/theme";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      router.replace("/home");
    } catch (error) {
      if (error.code === "auth/invalid-email") alert("Invalid email");
      else if (error.code === "auth/user-not-found") alert("User not found");
      else if (error.code === "auth/wrong-password") alert("Wrong password");
      else alert("Login failed: " + error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      alert("Please enter your email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent!");
      setShowReset(false);
      setResetEmail("");
    } catch (error) {
      if (error.code === "auth/user-not-found")
        alert("No user found with this email");
      else if (error.code === "auth/invalid-email") alert("Invalid email");
      else alert("Error: " + error.message);
    }
  };

  const handleCreateProfile = () => {
    router.push("/register");
  };

  // const handleForgotPasswordPress = () => {
  //   router.push('/forgot-password');
  // };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Image
              source={require("../assets/images/swu-bot.png")}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>

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
                autoComplete="current-password"
              />

              <View style={styles.buttonContainer}>
                <Button
                  title="Login"
                  onPress={handleLogin}
                  variant="primary"
                  size="large"
                />
              </View>

              <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={handleCreateProfile}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotPasswordText}>
                  Create new profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={() => setShowReset(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
              <Modal visible={showReset} transparent animationType="fade">
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={styles.modalOverlay}
                >
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContainer}>
                      <Text style={styles.modalTitle}>Reset Password</Text>

                      <TextInput
                        style={styles.resetInput}
                        placeholder="Enter your email..."
                        placeholderTextColor={COLORS.textLight}
                        value={resetEmail}
                        onChangeText={setResetEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                      />

                      <View style={styles.modalButtons}>
                        <Button
                          title="Send"
                          onPress={handleResetPassword}
                          variant="primary"
                          size="large"
                        />
                        <Button
                          title="Cancel"
                          onPress={() => setShowReset(false)}
                          variant="secondary"
                          size="large"
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
              </Modal>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACING.xxl,
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
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: SPACING.xl,
  },
  form: {
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: SPACING.xs,
  },
  buttonContainer: {
    width: "100%",
    marginTop: SPACING.md,
  },
  forgotPasswordContainer: {
    alignItems: "center",
    marginTop: SPACING.lg,
  },
  forgotPasswordText: {
    fontSize: 17,
    fontWeight: "500",
    color: COLORS.primary,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#00000085",
  },

  modalContainer: {
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  modalTitle: {
    fontSize: 27,
    fontWeight: "400",
    textAlign: "center",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },

  resetInput: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.backgroundSecondary,
    marginBottom: SPACING.md,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.sm,
    marginTop: SPACING.md,
    marginBottom: SPACING.xxl,
  },
});
