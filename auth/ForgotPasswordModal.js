import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

const ForgotPasswordModal = ({ onBack, onSendCode }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const { width } = useWindowDimensions();
  const isMobile = width <= 600;

  const validatePhone = (phone) => phone.length >= 10 && /^\d+$/.test(phone);

  const handleSubmit = () => {
    if (!phone) {
      setError('Phone number is required');
      return;
    }
    if (!validatePhone(phone)) {
      setError('Please enter a valid phone number (minimum 10 digits)');
      return;
    }
    setError('');
    onSendCode(phone);
  };

  return (
    <View style={[styles.container, isMobile && { paddingHorizontal: 16 }]}>
      {/* Back Button */}
      <TouchableOpacity
        style={[styles.backButton, isMobile && { marginLeft: -30, marginBottom: 16 }]}
        onPress={onBack}
      >
        <ArrowLeft size={16} color="#bababa" />
        <Text style={[styles.backText, isMobile && { fontSize: 14 }]}>Back</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={[styles.header, isMobile && { marginBottom: 24 }]}>
        <View style={[styles.logo, isMobile && { marginBottom: 12 }]}>
          <Image
            source={require('../assets/images/Fincelerate_Logo.png')}
            style={[styles.loginLogo, isMobile && { width: 42, height: 42 }]}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.title, isMobile && { fontSize: 20 }]}>Forgot Password?</Text>
        <Text style={[styles.subtitle, isMobile && { fontSize: 14, lineHeight: 20 }]}>
          Enter your phone number to receive a verification code
        </Text>
      </View>

      {/* Form */}
      <View style={[styles.form, isMobile && { width: '100%', gap: 12 }]}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              error && styles.inputError,
              isMobile && { height: 45, fontSize: 14, width: '100%' },
            ]}
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={(text) => {
              setPhone(text.replace(/\D/g, ''));
              setError('');
            }}
            keyboardType="numeric"
            placeholderTextColor="#8c8c8c"
          />
          {error ? <Text style={[styles.errorText, isMobile && { fontSize: 11 }]}>{error}</Text> : null}
        </View>

        <TouchableOpacity
          style={[styles.sendCodeButton, isMobile && { width: '100%', height: 45 }]}
          onPress={handleSubmit}
        >
          <Text style={[styles.sendCodeButtonText, isMobile && { fontSize: 14 }]}>Send Code</Text>
        </TouchableOpacity>

        <View style={[styles.backToLoginContainer, isMobile && { flexDirection: 'column', gap: 4 }]}>
          <Text style={[styles.backToLoginText, isMobile && { fontSize: 13 }]}>
            Remember your password?
          </Text>
          <TouchableOpacity onPress={onBack}>
            <Text style={[styles.backToLoginLink, isMobile && { fontSize: 13 }]}>
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
    marginLeft: -40,
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
  logo: {
    alignItems: 'center',
  },
  loginLogo: {
    width: 48,
    height: 48,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-600',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-400',
    color: '#bababa',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  form: {
    gap: 16,
    width: 324,
  },
  inputContainer: {
    marginBottom: 12,
  },
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
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  sendCodeButton: {
    height: 43,
    width: 324,
    backgroundColor: '#FFA000',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  sendCodeButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-500',
  },
  backToLoginContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backToLoginText: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'Poppins-500',
  },
  backToLoginLink: {
    fontSize: 14,
    color: '#ffa000',
    fontFamily: 'Poppins-600',
    textDecorationLine: 'underline',
  },
});

export default ForgotPasswordModal;
