import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

const LoginForm = ({ onLogin, onForgotPassword, onCreateAccount }) => {
  const [activeTab, setActiveTab] = useState('phone');
  const [formData, setFormData] = useState({ phone: '', email: '', password: '' });
  const [errors, setErrors] = useState({ phone: '', email: '', password: '' });
  const [googleLoading, setGoogleLoading] = useState(false);

  const { width } = useWindowDimensions();
  const isMobile = width < 786;

  // ---------------- VALIDATION ----------------
  const validatePassword = (password) => {
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasAlphabet = /[a-zA-Z]/.test(password);
    const isLongEnough = password.length >= 6;
    return hasSpecialChar && hasNumber && hasAlphabet && isLongEnough;
  };

  const validatePhone = (phone) => phone.length >= 10 && /^\d+$/.test(phone);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = () => {
    const newErrors = { phone: '', email: '', password: '' };
    let hasErrors = false;

    if (activeTab === 'phone') {
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      else if (!validatePhone(formData.phone))
        newErrors.phone = 'Please enter a valid phone number (minimum 10 digits)';
    } else {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!validateEmail(formData.email))
        newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) newErrors.password = 'Password is required';
    else if (!validatePassword(formData.password)) newErrors.password = 'Enter correct password';

    if (Object.values(newErrors).some((msg) => msg)) {
      setErrors(newErrors);
      hasErrors = true;
    }

    if (!hasErrors) onLogin(formData, activeTab);
  };

  // ---------------- GOOGLE LOGIN ----------------
  const webGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setGoogleLoading(true);
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const user = res.data;
        onLogin?.({
          provider: 'google',
          profile: user,
          token: tokenResponse.access_token,
        });
      } catch (err) {
        console.error('Web Google Login Error:', err);
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: (err) => console.error('Web Google Sign-In Failed:', err),
  });

  const handleGoogleSignInMobile = async () => {
    try {
      setGoogleLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      onLogin?.({
        provider: 'google',
        profile: userInfo.user,
        token: userInfo.idToken || userInfo.accessToken,
      });
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (Platform.OS === 'web') webGoogleLogin();
    else await handleGoogleSignInMobile();
  };

  // ---------------- RENDER ----------------
  return (
    <View style={[styles.container, isMobile && { paddingHorizontal: 16 }]}>
      <View style={[styles.header, isMobile && { marginBottom: 18 }]}>
        <Image
          source={require('../assets/images/Fincelerate_Logo.png')}
          style={[styles.loginLogo, isMobile && { width: 42, height: 42 }]}
          resizeMode="contain"
        />
        <Text style={[styles.title, isMobile && { fontSize: 18 }]}>
          Welcome to Fincelerate
        </Text>
        <Text style={[styles.subtitle, isMobile && { fontSize: 14 }]}>
          Login and pick up where you left off
        </Text>
      </View>

      <View
        style={[
          styles.tabContainer,
          isMobile && { width: '100%', height: 40, marginBottom: 16 },
        ]}
      >
        <TouchableOpacity
          style={[styles.tab, activeTab === 'phone' && styles.activeTab]}
          onPress={() => setActiveTab('phone')}
        >
          <Text
            style={[styles.tabText, activeTab === 'phone' && styles.activeTabText, isMobile && { fontSize: 14 }]}
          >
            Phone number
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'email' && styles.activeTab]}
          onPress={() => setActiveTab('email')}
        >
          <Text
            style={[styles.tabText, activeTab === 'email' && styles.activeTabText, isMobile && { fontSize: 14 }]}
          >
            With Email
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.form, isMobile && { width: '100%', gap: 12 }]}>
        {activeTab === 'phone' ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                errors.phone && styles.inputError,
                isMobile && { width: '100%', fontSize: 14, height: 45,},
              ]}
              placeholder="Phone Number"
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text.replace(/\D/g, ''))}
              keyboardType="numeric"
            />
            {errors.phone ? (
              <Text style={[styles.errorText, isMobile && { fontSize: 11 }]}>{errors.phone}</Text>
            ) : null}
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                errors.email && styles.inputError,
                isMobile && { width: '100%', fontSize: 14, height: 45 },
              ]}
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
            />
            {errors.email ? (
              <Text style={[styles.errorText, isMobile && { fontSize: 11 }]}>{errors.email}</Text>
            ) : null}
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              errors.password && styles.inputError,
              isMobile && { width: '100%', fontSize: 14, height: 45 },
            ]}
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            secureTextEntry
          />
          {errors.password ? (
            <Text style={[styles.errorText, isMobile && { fontSize: 11 }]}>{errors.password}</Text>
          ) : null}
        </View>

        <View
          style={[
            styles.forgotPasswordContainer,
            isMobile && { alignItems: 'center', marginTop: -10, marginBottom: 10 },
          ]}
        >
          <TouchableOpacity onPress={onForgotPassword}>
            <Text style={[styles.forgotPasswordText, isMobile && { fontSize: 13 }]}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.loginButton, isMobile && { width: '100%', height: 45 }]}
          onPress={handleSubmit}
        >
          <Text style={[styles.loginButtonText, isMobile && { fontSize: 14 }]}>Login</Text>
        </TouchableOpacity>

        <View style={[styles.line, isMobile && { marginVertical: 12 }]} />

        <TouchableOpacity
          style={[styles.googleButton, isMobile && { width: '100%', height: 45 }]}
          onPress={handleGoogleSignIn}
          disabled={googleLoading}
        >
          <Image
            source={require('../assets/images/Signin/Google-Icon.png')}
            style={[styles.googleLogo, isMobile && { height: 16, width: 16 }]}
            resizeMode="contain"
          />
          <Text style={[styles.googleButtonText, isMobile && { fontSize: 13 }]}>
            Sign in with Google
          </Text>
        </TouchableOpacity>

        <View
          style={[
            styles.signupContainer,
            isMobile && { flexDirection: 'column', marginTop: 10 },
          ]}
        >
          <Text style={[styles.signupText, isMobile && { fontSize: 13 }]}>
            New to Fincelerate?
          </Text>
          <TouchableOpacity onPress={onCreateAccount}>
            <Text style={[styles.signupLink, isMobile && { fontSize: 13 }]}>
              Create your account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// --------------- STYLES ---------------
const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 32 },
  loginLogo: { width: 48, height: 48, marginBottom: 20 },
  title: { fontSize: 20, fontFamily: 'Poppins-500', color: '#ffffff', marginBottom: 8 },
  subtitle: { fontSize: 16, fontFamily: 'Poppins-400', color: '#ffffff' },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 6,
    height: 43,
    width: 324,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    margin: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: { backgroundColor: '#332C43', elevation: 2 },
  tabText: { fontSize: 16, fontFamily: 'Poppins-600' },
  activeTabText: { color: '#ffffff' },
  form: { gap: 16, width: 324 },
  inputContainer: { marginBottom: 12 },
  input: {
    height: 43,
    width: 324,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#8c8c8c',
    fontFamily: 'Poppins-500',
  },
  inputError: { borderColor: '#ef4444' },
  errorText: { color: '#ef4444', fontSize: 12, marginTop: 4 },
  forgotPasswordContainer: { alignItems: 'flex-end', marginBottom: 8, marginTop: -14 },
  forgotPasswordText: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'Poppins-500',
    textDecorationLine: 'underline',
  },
  loginButton: {
    height: 43,
    width: 324,
    backgroundColor: '#FFA000',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: { fontSize: 14, fontFamily: 'Poppins-500' },
  line: { borderBottomWidth: 0.5, borderBottomColor: '#ffffff', marginVertical: 16 },
  googleButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  googleLogo: { height: 18, width: 18 },
  googleButtonText: { fontSize: 14, fontFamily: 'Poppins-500' },
  signupContainer: { alignItems: 'center', marginTop: 8 },
  signupText: { fontSize: 14, color: '#ffffff', fontFamily: 'Poppins-500' },
  signupLink: {
    fontSize: 14,
    color: '#ffa000',
    fontFamily: 'Poppins-600',
    textDecorationLine: 'underline',
  },
});

export default LoginForm;
