import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const WelcomeAboardModal = ({ onContinue }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require('../assets/images/Fincelerate_Name_Card.png')}
          style={styles.loginLogo}
          resizeMode="contain"
        />
      </View>
      
      <Text style={styles.title}>Welcome Aboard!</Text>
      <Image
          source={require('../assets/images/icon.png')}
          style={styles.welcomeLogo}
          resizeMode="contain"
        />
      <Text style={styles.subtitle}>
        Remember to complete your profile later.
      </Text>
      
      {/* <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width:350,
  },
  logo: {
    height: 160, 
    width: 275,
    // marginBottom: 32,
  },
  loginLogo: {
    height: 280, 
    width: 275,
  },
  title: {
    fontSize: 38,
    fontFamily: 'Poppins-300',
    color: '#bababa',
    marginBottom: 16,
  },
  welcomeLogo:{
    height: 120, 
    width: 120,
  },
  subtitle: {
    fontSize: 27,
    fontFamily: 'Poppins-600',
    color: '#bababa',
    textAlign: 'center',
    margin: 24,
    // lineHeight: 24,
  },
  // continueButton: {
  //   backgroundColor: '#10b981',
  //   borderRadius: 8,
  //   paddingVertical: 12,
  //   paddingHorizontal: 32,
  //   alignItems: 'center',
  //   width: '100%',
  //   maxWidth: 200,
  // },
  // continueButtonText: {
  //   color: 'white',
  //   fontSize: 18,
  //   fontFamily: 'Poppins-600',
  // },
});

export default WelcomeAboardModal;