import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';

const SetPasswordModal = ({ onPasswordSet, onBack, isReset = false }) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [constraints, setConstraints] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false
  });

  const { width } = useWindowDimensions();
  const isMobile = width <= 600;

  const validateConstraints = (password) => {
    const newConstraints = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    setConstraints(newConstraints);
    return Object.values(newConstraints).every(Boolean);
  };

  const handlePasswordChange = (password) => {
    setFormData(prev => ({ ...prev, password }));
    validateConstraints(password);
  };

  const handleSubmit = () => {
    if (!validateConstraints(formData.password)) return;
    if (formData.password !== formData.confirmPassword) return;
    onPasswordSet();
  };

  const getConstraintColor = (isValid) => {
    if (formData.password === '') return '#ffffff';
    return isValid ? '#10b981' : '#ef4444';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.backButton, isMobile && {marginTop: 16}]} onPress={onBack}>
        <ArrowLeft size={16} color="#bababa" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={[styles.title, isMobile && { fontSize: 28 }]}>
          Set Password
        </Text>
      </View>

      <View style={[styles.form, isMobile && { width: '100%', paddingHorizontal: 16 }]}>
        <View style={styles.inputContainer}>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={[styles.input, isMobile && { width: '100%', height: 50 }]}
              placeholder={isReset ? "Enter New Password" : "Enter Password"}
              value={formData.password}
              onChangeText={handlePasswordChange}
              secureTextEntry={!showPassword}
              placeholderTextColor="#8c8c8c"
            />
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 
                <EyeOff size={20} color="#646464" /> : 
                <Eye size={20} color="#646464" />
              }
            </TouchableOpacity>
          </View>

          <View style={styles.constraintsContainer}>
            <Text style={[styles.constraintsTitle, isMobile && { fontSize: 13 }]}>The Password must:</Text>
            
            {[
              { key: 'length', text: 'be at least 8 characters' },
              { key: 'uppercase', text: 'contain at least one uppercase' },
              { key: 'lowercase', text: 'contain at least one lowercase' },
              { key: 'number', text: 'contain at least one number' },
              { key: 'symbol', text: 'have at least one symbol (# $ & %)' },
            ].map(item => (
              <View style={styles.constraintRow} key={item.key}>
                <View style={[
                  styles.constraintDot, 
                  { backgroundColor: getConstraintColor(constraints[item.key]) }
                ]} />
                <Text style={[
                  styles.constraintText, 
                  { color: getConstraintColor(constraints[item.key]) },
                  isMobile && { fontSize: 11 }
                ]}>
                  {item.text}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={[styles.input, isMobile && { width: '100%', height: 50 }]}
              placeholder={isReset ? "Confirm New Password" : "Confirm Password"}
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#8c8c8c"
            />
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? 
                <EyeOff size={20} color="#8c8c8c" /> : 
                <Eye size={20} color="#8c8c8c" />
              }
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={[
            styles.setPasswordButton,
            isMobile && { width: '100%', height: 50 },
            (!Object.values(constraints).every(Boolean) || formData.password !== formData.confirmPassword) && styles.disabledButton
          ]} 
          onPress={handleSubmit}
          disabled={!Object.values(constraints).every(Boolean) || formData.password !== formData.confirmPassword}
        >
          <Text style={[styles.setPasswordButtonText, isMobile && { fontSize: 15 }]}>
            Set Password
          </Text>
        </TouchableOpacity>
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
    fontSize: 42,
    fontFamily: 'Poppins-500',
    color: '#ffffff',
  },
  form: {
    gap: 16,
    width: 448,
  },
  inputContainer: {
    marginBottom: 12,
  },
  passwordInputContainer: {
    position: 'relative',
  },
  input: {
    height: 57,
    width: 448,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingRight: 50,
    fontSize: 16,
    color: '#646464',
    fontFamily: 'Poppins-500',
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 18,
  },
  constraintsContainer: {
    marginTop: 12,
    paddingLeft: 8,
  },
  constraintsTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-500',
    color: '#ffffff',
    marginBottom: 8,
  },
  constraintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  constraintDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  constraintText: {
    fontSize: 12,
    fontFamily: 'Poppins-500',
  },
  setPasswordButton: {
    height: 57,
    width: 448,
    backgroundColor: '#FFA000',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  setPasswordButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-500',
    color: '#000000',
  },
});

export default SetPasswordModal;
