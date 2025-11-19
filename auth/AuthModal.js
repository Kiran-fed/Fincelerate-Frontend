import { X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import CreateAccountModal from './CreateAccountModal.js';
import ForgotPasswordModal from './ForgotPasswordModal.js';
import LoginForm from './LoginForm.js';
import OTPVerification from './OTPVerification.js';
import SetPasswordModal from './SetPasswordModal.js';
import SmallSuccessModal from './SmallSuccessModal.js';
import SuccessModal from './SuccessModal.js';
import WelcomeAboardModal from './WelcomeAboardModal.js';

import { useWindowDimensions } from 'react-native';


const AuthModal = ({ visible, onClose }) => {

const { width } = useWindowDimensions();
const isMobile = width < 1024;

const isMobileResp = width < 600;


  const [currentStep, setCurrentStep] = useState('login');
  const [loginType, setLoginType] = useState('phone');
  const [userData, setUserData] = useState({ 
    firstName: '',
    lastName: '',
    phone: '', 
    email: '', 
    password: '' 
  });
  const [stepHistory, setStepHistory] = useState(['login']);
  const [fromResetFlow, setFromResetFlow] = useState(false);

  const handleLogin = (data, type) => {
    setUserData(data);
    setLoginType(type);
    setStepHistory(prev => [...prev, 'otp']);
    setCurrentStep('otp');
  };

  const handleCreateAccount = (data) => {
    setUserData(data);
    setStepHistory(prev => [...prev, 'create-otp']);
    setCurrentStep('create-otp');
  };

  const handleOTPSuccess = () => {
    if (currentStep === 'create-otp') {
      setStepHistory(prev => [...prev, 'otp-success']);
      setCurrentStep('otp-success');
      setTimeout(() => {
        setStepHistory(prev => [...prev, 'set-password']);
        setCurrentStep('set-password');
      }, 2000);
    } else if (currentStep === 'forgot-otp') {
      setStepHistory(prev => [...prev, 'otp-success']);
      setCurrentStep('otp-success');
      setTimeout(() => {
        setStepHistory(prev => [...prev, 'reset-password']);
        setCurrentStep('reset-password');
      }, 2000);
    } else {
      setStepHistory(prev => [...prev, 'success']);
      setCurrentStep('success');
    }
  };

  const handlePasswordSet = () => {
    setStepHistory(prev => [...prev, 'password-success']);
    setFromResetFlow(false); // Normal set-password flow
    setCurrentStep('password-success');
    setTimeout(() => {
      // if (currentStep === 'password-success') {
        setStepHistory(prev => [...prev, 'welcome-aboard']);
        setCurrentStep('welcome-aboard');
      // }
    }, 2000);
  };

  const handlePasswordReset = () => {
    setStepHistory(prev => [...prev, 'password-success']);
    setFromResetFlow(true); // Normal set-password flow
    setCurrentStep('password-success');
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleBack = () => {
    if (stepHistory.length > 1) {
      const newHistory = [...stepHistory];
      newHistory.pop(); // Remove current step
      let previousStep = newHistory[newHistory.length - 1];
      
      // Skip OTP success modal when going back from set password or reset password
      if ((currentStep === 'set-password' || currentStep === 'reset-password') && previousStep === 'otp-success') {
        newHistory.pop(); // Remove otp-success from history
        previousStep = newHistory[newHistory.length - 1];
      }
      
      setStepHistory(newHistory);
      setCurrentStep(previousStep);
    }
  };

  const handleForgotPassword = (contact) => {
    setUserData(prev => ({ ...prev, phone: contact }));
    setStepHistory(prev => [...prev, 'forgot-otp']);
    setCurrentStep('forgot-otp');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'login':
        return (
          <View style={styles.contentContainerLogin}>
           <View
              style={[
                  styles.formContainerLogin,
                  isMobile && { width: '100%', paddingHorizontal: 24 },
                  ]}
            >
              <LoginForm
                onLogin={handleLogin}
                onForgotPassword={() => {
                  setStepHistory(prev => [...prev, 'forgot-password']);
                  setCurrentStep('forgot-password');
                }}
                onCreateAccount={() => {
                  setStepHistory(prev => [...prev, 'create-account']);
                  setCurrentStep('create-account');
                }}
              />
            </View>
               <View
                  style={[
                      styles.imageContainerLogin,
                      isMobile && { display: 'none' }, // 👈 hide only on mobile/tab
                      ]}
               >
              <Image
                source={require('../assets/images/icon.png')}
                style={styles.imageLogin}
                resizeMode="contain"
              />              
            </View>
          </View>
        );

      case 'create-account':
        return (
          <View style={styles.contentContainerLogin}>
            <View
              style={[
                  styles.formContainerLogin,
                  isMobile && { width: '100%', paddingHorizontal: 24 },
                  ]}
            >
              <CreateAccountModal 
                onBack={handleBack}
                onCreateAccount={handleCreateAccount}
              />

            </View>
            <View
                  style={[
                      styles.imageContainerLogin,
                      isMobile && { display: 'none' }, // 👈 hide only on mobile/tab
                      ]}
               >
              <Image
                source={require('../assets/images/icon.png')}
                style={styles.imageLogin}
                resizeMode="contain"
              />              
            </View>
          </View>
        );

      case 'create-otp':
      case 'forgot-otp':
        return (
          <View style={styles.contentContainerOtp}>
            <View
                  style={[
                      styles.imageContainerOtp,
                      isMobile && { display: 'none' }, // 👈 hide only on mobile/tab
                      ]}
               >
              <Image
                source={require('../assets/images/icon.png')}
                style={styles.imageOtp}
                resizeMode="contain"
              />      
            </View>
            <View
              style={[
                  styles.formContainerOtp,
                  isMobile && { width: '100%', paddingHorizontal: 24 },
                  ]}
            >
              <OTPVerification
                loginType="phone"
                userContact={userData.phone}
                onSuccess={handleOTPSuccess}
                onBack={handleBack}
                isCreateAccount={currentStep === 'create-otp'}
                isForgotPassword={currentStep === 'forgot-otp'}
              />
            </View>
          </View>
        );

      case 'otp':
        return (
          <View style={styles.contentContainerOtp}>
            <View
                  style={[
                      styles.imageContainerOtp,
                      isMobile && { display: 'none' }, // 👈 hide only on mobile/tab
                      ]}
            >
              <Image
                source={require('../assets/images/icon.png')}
                style={styles.imageOtp}
                resizeMode="contain"
              />      
            </View>
           <View
              style={[
                  styles.formContainerOtp,
                  isMobile && { width: '100%', paddingHorizontal: 24 },
                  ]}
            >
              <OTPVerification
                loginType={loginType}
                userContact={loginType === 'phone' ? userData.phone : userData.email}
                onSuccess={handleOTPSuccess}
                onBack={handleBack}
              />
            </View>
          </View>
        );

      case 'otp-success':
        return (
          <View style={styles.smallModalContainer}>
            <SmallSuccessModal 
              title="Code Verified!"
              message="OTP verification successful"
            />
          </View>
        );

      case 'set-password':
      case 'reset-password':
        return (
          <View style={styles.contentContainerLogin}>
            <View
              style={[
                  styles.formContainerLogin,
                  isMobile && { width: '100%', paddingHorizontal: 24 },
                  ]}
            >
            
              <SetPasswordModal 
                onPasswordSet={currentStep === 'set-password' ? handlePasswordSet : handlePasswordReset}
                onBack={handleBack}
                isReset={currentStep === 'reset-password'}
              />
            </View>
            
               <View
                  style={[
                      styles.imageContainerLogin,
                      isMobile && { display: 'none' }, // 👈 hide only on mobile/tab
                      ]}
               >
              <Image
                source={require('../assets/images/icon.png')}
                style={styles.imageLogin}
                resizeMode="contain"
              />              
            </View>
          </View>
        );

      case 'password-success':
        return (
          <View style={styles.smallModalContainer}>
            <SmallSuccessModal 
        title={fromResetFlow ? 'Your password has been RESET!' : 'Your password has been set!'}
            />
          </View>
        );

      case 'welcome-aboard':
        return (
          <View style={styles.contentContainerSuccess}>
               <View
                  style={[
                      styles.imageContainerSuccess,
                      isMobile && { display: 'none' }, // 👈 hide only on mobile/tab
                      ]}
               >
              <Image
                source={require('../assets/images/icon.png')}
                style={styles.imageSuccess}
                resizeMode="contain"
              />      
            </View>
            <View style={styles.formContainerSuccess}>
              <WelcomeAboardModal 
              // onContinue={onClose} 
              />
            </View>
          </View>
        );

      case 'success':
        return (
          <View style={styles.contentContainerSuccess}>
              <View
                  style={[
                      styles.imageContainerSuccess,
                      isMobile && { display: 'none' }, // 👈 hide only on mobile/tab
                      ]}
               >
              <Image
                source={require('../assets/images/icon.png')}
                style={styles.imageSuccess}
                resizeMode="contain"
              />      
            </View>
            <View style={styles.formContainerSuccess}>
              <SuccessModal 
              // onContinue={onClose}
              />
            </View>
          </View>
        );

      case 'forgot-password':
        return (
          <View style={styles.contentContainerOtp}>
            <View
                  style={[
                      styles.imageContainerOtp,
                      isMobile && { display: 'none' }, // 👈 hide only on mobile/tab
                      ]}
               >
              <Image
                source={require('../assets/images/icon.png')}
                style={styles.imageOtp}
                resizeMode="contain"
              />      
            </View>
            <View style={styles.formContainerOtp}>
              <ForgotPasswordModal 
                onBack={handleBack}
                onSendCode={handleForgotPassword}
              />
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[
          styles.modalContainer, isMobileResp && {     width: '100%', height: 660,},
          (currentStep === 'otp-success' || currentStep === 'password-success') && styles.smallModal
        ]}>
          {!(currentStep === 'otp-success' || currentStep === 'password-success') && (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <X size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
          
          {renderCurrentStep()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#171B1E',
    borderRadius: 16,
    width: '85%',
    height: 810,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
    position: 'relative',
  },
  smallModal: {
    width: '24%',
    height: 400,
  },
  smallModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  contentContainerLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
  },
  formContainerLogin: {
    flex: 1,
    padding: 48,
    height: 703, 
    width: 383,
  },
  imageContainerLogin: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    height: 616,
    width: 543,
  },
  imageLogin: {
    height: '50%',
    width: '50%'
  },
  imagepssd:{
    height:200,width:200,
    marginTop:-300,
  },
  contentContainerOtp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
  },
  formContainerOtp: {
    flex: 1,
    padding: 48,
    height: 664, 
    width: 403,
  },
  imageContainerOtp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    height: 740,
    width: 720,
  },
  imageOtp: {
    height: '50%',
    width: '50%'
  },
  contentContainerSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
  },
  formContainerSuccess: {
    flex: 1,
    height: 378, 
    width: 454,
  },
  imageContainerSuccess: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    height: 740,
    width: 720,
  },
  imageSuccess: {
    height: '50%',
    width: '50%'
  },
});

export default AuthModal;