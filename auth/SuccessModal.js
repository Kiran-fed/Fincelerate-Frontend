import { CheckCircle } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const SuccessModal = ({ onContinue }) => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.content}> */}
        <View style={styles.logo}>
        <Image
              source={require('../assets/images/Fincelerate_Name_Card.png')}
              style={styles.loginLogo}
              resizeMode="contain"
            />
        </View>
        
        <View style={styles.successIcon}>
          <CheckCircle size={64} color="#10b981" />
        </View>
        
        <Text style={styles.successTitle}>Code Verified!</Text>
        {/* <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity> */}
        {/* </View> */}
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
    // maxWidth: 400,
    alignSelf: 'center',
  },
 
  logo:{
    height:160, 
    width:275,
  },
  loginLogo:{
    height:280, 
    width:275,
    // borderWidth:1,borderColor:'red'
  },
 
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 28,
    fontFamily:'Poppins-600',
    color: '#bababa',
    marginBottom: 16,
  },
  // continueButton: {
  //   backgroundColor: '#10b981',
  //   borderRadius: 8,
  //   paddingVertical: 8,
  //   paddingHorizontal: 16,
  //   alignItems: 'center',
  //   width: '100%',
  //   maxWidth: 200,

  // },
  // continueButtonText: {
  //   color: 'white',
  //   fontSize: 18,
  //   fontFamily:'Poppins-600',
  // },
});

export default SuccessModal;