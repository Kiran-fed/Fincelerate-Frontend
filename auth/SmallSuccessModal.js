import { CheckCircle } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

const SmallSuccessModal = ({ title, message }) => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 600; 

  return (
    <View
      style={[
        styles.container,
        isMobile && {
          paddingHorizontal: 16,
          paddingVertical: 12,
          height: 100, width: 300, backgroundColor: '#171B1E', borderRadius: 8, 
        },
      ]}
    >
      <View style={[styles.logo, isMobile && { height: 100, width: 200 }]}>
        <Image
          source={require('../assets/images/Fincelerate_Name_Card.png')}
          style={[styles.loginLogo, isMobile && { height: 160, width: 200 }]}
          resizeMode="contain"
        />
      </View>

      <View
        style={[
          styles.successIcon,
          isMobile && { width: 60, height: 60, marginBottom: 12 },
        ]}
      >
        <CheckCircle size={isMobile ? 36 : 48} color="#10b981" />
      </View>

      <Text
        style={[
          styles.title,
          isMobile && { fontSize: 22, marginBottom: 6, textAlign: 'center' },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.message,
          isMobile && { fontSize: 24, marginBottom: 40, textAlign: 'center' },
        ]}
      >
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignSelf: 'center',
  },
  logo: {
    height: 160,
    width: 275,
  },
  loginLogo: {
    height: 280,
    width: 275,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 60,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 27,
    fontFamily: 'Poppins-600',
    color: '#bababa',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 38,
    fontFamily: 'Poppins-300',
    color: '#bababa',
    textAlign: 'center',
    marginBottom: 80,
  },
});

export default SmallSuccessModal;
