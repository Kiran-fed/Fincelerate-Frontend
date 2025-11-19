import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react-native';
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

const CreateAccountModal = ({ onBack, onCreateAccount }) => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 600;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [errors, setErrors] = useState({});

  // --- WEB GOOGLE LOGIN HANDLER ---
  const webGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const { email, given_name, family_name } = res.data;
        setFormData((prev) => ({
          ...prev,
          email,
          firstName: given_name || '',
          lastName: family_name || '',
        }));
        setIsGoogleUser(true);
      } catch (err) {
        console.error('Web Google Login Error:', err);
      }
    },
    onError: (err) => console.error('Web Google Sign-In Failed:', err),
  });

  // --- MOBILE GOOGLE LOGIN HANDLER ---
  const handleGoogleSignIn = async () => {
    try {
      if (Platform.OS === 'web') {
        webGoogleLogin();
        return;
      }
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { email, givenName, familyName } = userInfo.user;
      setFormData((prev) => ({
        ...prev,
        email,
        firstName: givenName || '',
        lastName: familyName || '',
      }));
      setIsGoogleUser(true);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const handleStartOver = async () => {
    setIsGoogleUser(false);
    setFormData({ firstName: '', lastName: '', phone: '', email: '' });
    try {
      if (Platform.OS !== 'web') {
        await GoogleSignin.signOut();
      }
    } catch (err) {
      console.log('Error signing out:', err);
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onCreateAccount(formData);
    }
  };

  return (
    <View style={[styles.container, isMobile && { paddingHorizontal: 16, width: '100%' }]}>
      {/* BACK BUTTON */}
      
      <TouchableOpacity style={[styles.backButton, isMobile && { marginBottom: 16, marginTop: 6 }]} onPress={onBack}>
        <ArrowLeft size={16} color="#bababa" />
        <Text style={[styles.backText, isMobile && { fontSize: 14 }]}>Back</Text>
      </TouchableOpacity>

      {/* HEADER SECTION */}
      <View style={[styles.header, isMobile && { marginBottom: 24 }]}>
        {isGoogleUser ? (
          <>
            <View style={[styles.emailInfoContainer, isMobile && { marginBottom: 12 }]}>
              <Text style={[styles.emailText, isMobile && { fontSize: 14 }]}>
                <Text style={styles.boldText}>{formData.email}</Text> is linked to the Fincelerate Account
              </Text>

              <View style={styles.startOverRow}>
                <Text style={[styles.subText, isMobile && { fontSize: 13 }]}>Linked a wrong account? </Text>
                <TouchableOpacity onPress={handleStartOver}>
                  <Text style={[styles.startOverText, isMobile && { fontSize: 13 }]}>Start Over ↻</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={[styles.title, isMobile && { fontSize: 22 }]}>
              Verify Mobile Number to Continue
            </Text>
          </>
        ) : (
          <Text style={[styles.title, isMobile && { fontSize: 26 }]}>Create an account</Text>
        )}
      </View>

      {/* FORM FIELDS */}
      <View style={[styles.form, isMobile && { width: '100%', gap: 12 }]}>
        <View style={[styles.nameRow, isMobile && { flexDirection: 'column', gap: 12 }]}>
          <View style={styles.nameInputContainer}>
            <TextInput
              style={[
                styles.nameInput,
                errors.firstName && styles.inputError,
                isMobile && { height: 50, fontSize: 14 },
              ]}
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(text) => setFormData({ ...formData, firstName: text })}
              placeholderTextColor="#8c8c8c"
            />
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
          </View>

          <View style={styles.nameInputContainer}>
            <TextInput
              style={[
                styles.nameInput,
                errors.lastName && styles.inputError,
                isMobile && { height: 50, fontSize: 14 },
              ]}
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(text) => setFormData({ ...formData, lastName: text })}
              placeholderTextColor="#8c8c8c"
            />
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
          </View>
        </View>

        {/* PHONE FIELD */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              errors.phone && styles.inputError,
              isMobile && { height: 50, fontSize: 14 },
            ]}
            placeholder="Enter your phone number"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text.replace(/\D/g, '') })}
            keyboardType="numeric"
            placeholderTextColor="#8c8c8c"
          />
          {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
        </View>

        {/* SUBMIT */}
        <TouchableOpacity
          style={[styles.sendCodeButton, isMobile && { height: 50 }]}
          onPress={handleSubmit}
        >
          <Text style={[styles.sendCodeButtonText, isMobile && { fontSize: 15 }]}>Send Code</Text>
        </TouchableOpacity>

        {/* TERMS */}
        <View style={[styles.termsContainer, isMobile && { marginBottom: 12 }]}>
          <Text style={[styles.termsText, isMobile && { fontSize: 12 }]}>
            By Signing up, you agree to our{' '}
            <Text style={styles.linkText}>privacy policy</Text> and{' '}
            <Text style={styles.linkText}>terms of service</Text>
          </Text>
        </View>

        {/* GOOGLE SIGN-IN */}
        {!isGoogleUser && (
          <TouchableOpacity
            style={[styles.googleButton, isMobile && { height: 50, gap: 12 }]}
            onPress={handleGoogleSignIn}
          >
            <Image
              source={require('../assets/images/Signin/Google-Icon.png')}
              style={[styles.googleLogo, isMobile && { height: 16, width: 16 }]}
              resizeMode="contain"
            />
            <Text style={[styles.googleButtonText, isMobile && { fontSize: 14 }]}>
              Sign in with Google
            </Text>
          </TouchableOpacity>
        )}

        {/* LOGIN LINK */}
        <View style={styles.signupContainer}>
          <Text style={[styles.signupText, isMobile && { fontSize: 14 }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={onBack}>
            <Text style={[styles.signupLink, isMobile && { fontSize: 14 }]}>Login here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// --- BASE STYLES ---
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  backText: {
    marginLeft: 4,
    color: '#bababa',
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Poppins-500',
    color: '#ffffff',
    textAlign: 'center',
  },
  emailInfoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  emailText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-400',
    textAlign: 'center',
  },
  boldText: {
    fontFamily: 'Poppins-600',
  },
  startOverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  subText: {
    color: '#bababa',
    fontSize: 14,
    fontFamily: 'Poppins-400',
  },
  startOverText: {
    color: '#ffa000',
    fontSize: 14,
    fontFamily: 'Poppins-500',
    textDecorationLine: 'underline',
  },
  form: {
    gap: 16,
    width: 447,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  nameInputContainer: {
    flex: 1,
  },
  nameInput: {
    height: 57,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#8c8c8c',
    fontFamily: 'Poppins-500',
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    height: 57,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#8c8c8c',
    fontFamily: 'Poppins-500',
  },
  inputError: {
    borderColor: '#ef4444',
    borderWidth: 1,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  sendCodeButton: {
    height: 57,
    backgroundColor: '#FFA000',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendCodeButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-500',
  },
  termsContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  termsText: {
    fontSize: 13,
    color: '#ffffff',
    fontFamily: 'Poppins-400',
    textAlign: 'center',
  },
  linkText: {
    color: '#ffa000',
    textDecorationLine: 'underline',
  },
  googleButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    height: 57,
    gap: 20,
  },
  googleLogo: {
    height: 18,
    width: 18,
  },
  googleButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-500',
  },
  signupContainer: {
    alignItems: 'center',
  },
  signupText: {
    margin: 8,
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Poppins-500',
  },
  signupLink: {
    fontSize: 16,
    color: '#ffa000',
    fontFamily: 'Poppins-600',
    textDecorationLine: 'underline',
  },
});

export default CreateAccountModal;
