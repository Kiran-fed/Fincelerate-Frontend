import { ArrowLeft } from 'lucide-react-native';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';

const OTPVerification = ({
  loginType,
  userContact,
  onSuccess,
  onBack,
  isCreateAccount = false,
  isForgotPassword = false,
}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);
  const { width } = useWindowDimensions();
  const isMobile = width < 786;

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== '') && index === 3) {
      setTimeout(() => handleVerify(newOtp), 1000);
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (otpToVerify = otp) => {
    const otpString = otpToVerify.join('');
    if (otpString.length !== 4) {
      setError('Please enter the complete 4-digit code');
      return;
    }
    setTimeout(() => onSuccess(), 1000);
  };

  const handleResend = () => {
    setOtp(['', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
  };

  return (
    <View style={[styles.container, isMobile && { paddingHorizontal: 16}]}>
      <TouchableOpacity
        style={[styles.backButton, isMobile && { marginLeft: 0, marginBottom: 16,  }]}
        onPress={onBack}
      >
        <ArrowLeft size={isMobile ? 14 : 16} color="#bababa" />
        <Text style={[styles.backText, isMobile && { fontSize: 14 }]}>Back</Text>
      </TouchableOpacity>

      <View style={[styles.header, isMobile && { marginBottom: 24 }]}>
        <Image
          source={require('../assets/images/Fincelerate_Logo.png')}
          style={[styles.loginLogo, isMobile && { width: 48, height: 48, marginBottom: 12 }]}
          resizeMode="contain"
        />

        {!isCreateAccount && !isForgotPassword && (
          <Text style={[styles.deviceTitle, isMobile && { fontSize: 18 }]}>
            Is this a New Device?
          </Text>
        )}

        <Text
          style={[
            styles.title,
            isMobile && { fontSize: 22, width: '90%', textAlign: 'center', lineHeight: 26 },
          ]}
        >
          {isCreateAccount && loginType === 'phone' && 'Verify your number to continue'}
          {isCreateAccount && loginType === 'email' && 'Verify your email to continue'}
          {isForgotPassword && 'Verify your reset password code here'}
          {!isCreateAccount &&
            !isForgotPassword &&
            loginType === 'phone' &&
            'Verify your number to continue'}
          {!isCreateAccount &&
            !isForgotPassword &&
            loginType === 'email' &&
            'Verify your email to continue'}
        </Text>

        <Text
          style={[
            styles.contactLabel,
            isMobile && { fontSize: 16, textAlign: 'center', lineHeight: 22 },
          ]}
        >
          We sent a code to{' '}
          <Text
            style={[
              styles.contactValue,
              isMobile && { fontSize: 20 },
            ]}
          >
            {loginType === 'phone' ? `+91 ${userContact}` : userContact}
          </Text>
        </Text>

        <TouchableOpacity
          onPress={onBack}
          style={[
            styles.editNumber,
            isMobile && { flexDirection: 'column', marginTop: 8, gap: 2 },
          ]}
        >
          <Text style={[styles.wrongText, isMobile && { fontSize: 14 }]}>
            Entered the wrong number?
          </Text>
          <Text style={[styles.editText, isMobile && { fontSize: 14 }]}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.otpContainer}>
        <Text style={[styles.otpLabel, isMobile && { fontSize: 20 }]}>
          Enter the 4 digit Code
        </Text>

        <View
          style={[
            styles.otpInputContainer,
            isMobile && { gap: 8, justifyContent: 'center' },
          ]}
        >
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                digit && styles.otpInputFilled,
                error && styles.otpInputError,
                isMobile && {
                  width: 60,
                  height: 65,
                  fontSize: 28,
                  borderRadius: 12,
                },
              ]}
              value={digit}
              onChangeText={(value) => handleInputChange(index, value)}
              onKeyPress={(e) => handleKeyPress(index, e)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {error ? (
          <Text style={[styles.errorText, isMobile && { fontSize: 12 }]}>{error}</Text>
        ) : null}

        <View
          style={[
            styles.resendContainer,
            isMobile && { marginTop: 8, gap: 4 },
          ]}
        >
          <Text style={[styles.resendText, isMobile && { fontSize: 14 }]}>
            Didn't get the code?
          </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={[styles.resendLink, isMobile && { fontSize: 14 }]}>
              Click to Resend
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: {
    height: 664,
    maxWidth: 500,
    alignSelf: 'center',
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
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
  loginLogo: {
    width: 58,
    height: 58,
  },
  deviceTitle: {
    fontSize: 22.5,
    fontFamily: 'Poppins-700',
    color: '#ffffff',
    marginBottom: 8,
  },
  title: {
    fontSize: 38,
    fontFamily: 'Poppins-300',
    color: '#bababa',
    marginBottom: 8,
    width: '80%',
    textAlign: 'center',
  },
  contactLabel: {
    fontSize: 20,
    fontFamily: 'Poppins-500',
    color: '#ffffff',
  },
  contactValue: {
    fontSize: 27,
    fontFamily: 'Poppins-800',
    color: '#f9f9f9',
  },
  editNumber: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    gap: 5,
    marginBottom: -8,
  },
  wrongText: {
    fontSize: 18,
    fontFamily: 'Poppins-500',
    color: '#ffffff',
  },
  editText: {
    fontSize: 18,
    fontFamily: 'Poppins-500',
    color: '#ffa000',
    textDecorationLine: 'underline',
  },
  otpContainer: {
    alignItems: 'center',
  },
  otpLabel: {
    fontSize: 27,
    fontFamily: 'Poppins-400',
    color: '#bababa',
    marginBottom: 12,
  },
  otpInputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  otpInput: {
    width: 84,
    height: 90,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 16,
    textAlign: 'center',
    fontSize: 38,
    fontFamily: 'Poppins-700',
    color: '#5e17eb',
    backgroundColor: '#030921',
  },
  otpInputFilled: {
    backgroundColor: 'white',
  },
  otpInputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginBottom: 16,
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: 18,
    color: '#bababa',
    fontFamily: 'Poppins-500',
    marginBottom: 20,
  },
  resendLink: {
    fontSize: 18,
    color: '#ffa000',
    fontFamily: 'Poppins-500',
    textDecorationLine: 'underline',
  },
});

export default OTPVerification;
