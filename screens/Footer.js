
import {
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    Twitter,
    Youtube
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Footer() {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));
 
  useEffect(() => {
    const onChange = (result) => {
      setScreenData(result.window);
    };
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  const isMobile = screenData.width < 768;
  const isTablet = screenData.width >= 768 && screenData.width < 1024;
  const isDesktop = screenData.width >= 1024;






  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Footer Section */}
      <View style={styles.footerSection}>
        <View style={[styles.footerContent, isMobile && styles.footerContentMobile, isTablet && styles.footerContentTablet]}>
          {/* Left Side - Logo and Tagline */}
          <View style={[styles.footerLeft, isMobile && styles.footerLeftMobile]}>
            <View style={styles.footerLogo}>
              <Image
                source={require('../assets/images/Fincelerate_pvt_ltd.png')}
                style={[styles.copyrightlogo, isMobile && styles.copyrightlogoMobile, isTablet && styles.copyrightlogoTablet]}
              />              
            </View>
            
            <Text style={[styles.footerTagline, isMobile && styles.footerTaglineMobile, isTablet && styles.footerTaglineTablet]}>Your journey, our guidance.</Text>
            <Text style={[styles.footerInvestText, isMobile && styles.footerInvestTextMobile, isTablet && styles.footerInvestTextTablet]}>
              <Text style={styles.footerInvestAccent}>Invest</Text>
              <Text style={styles.footerInvestNormal}> with confidence.</Text>
            </Text>
            
            {/* Social Media Icons */}
            <View style={[styles.socialMediaContainer, isMobile && styles.socialMediaContainerMobile]}>
              <TouchableOpacity style={[styles.socialIcon, isMobile && styles.socialIconMobile]}>
                <Instagram color="white" size={isMobile ? 20 : 28} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialIcon, isMobile && styles.socialIconMobile]}>
                <Twitter color="white" size={isMobile ? 20 : 28} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialIcon, isMobile && styles.socialIconMobile]}>
                <Linkedin color="white" size={isMobile ? 20 : 28} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialIcon, isMobile && styles.socialIconMobile]}>
                <Youtube color="white" size={isMobile ? 20 : 28} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialIcon, isMobile && styles.socialIconMobile]}>
                <Facebook color="white" size={isMobile ? 20 : 28} />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Right Side - Links */}
          <View style={[styles.footerRight, isMobile && styles.footerRightMobile]}>
            <View style={[styles.footerColumn, isMobile && styles.footerColumnMobile]}>
              <Text style={[styles.footerColumnTitle, isMobile && styles.footerColumnTitleMobile, isTablet && styles.footerColumnTitleTablet]}>Quick Links</Text>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={[styles.footerLinkText, isMobile && styles.footerLinkTextMobile, isTablet && styles.footerLinkTextTablet]}>Link 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={[styles.footerLinkText, isMobile && styles.footerLinkTextMobile, isTablet && styles.footerLinkTextTablet]}>Link 2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={[styles.footerLinkText, isMobile && styles.footerLinkTextMobile, isTablet && styles.footerLinkTextTablet]}>Link 3</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={[styles.footerLinkText, isMobile && styles.footerLinkTextMobile, isTablet && styles.footerLinkTextTablet]}>Link 4</Text>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.footerColumn, isMobile && styles.footerColumnMobile]}>
              <Text style={[styles.footerColumnTitle, isMobile && styles.footerColumnTitleMobile, isTablet && styles.footerColumnTitleTablet]}>Why Fincelerate?</Text>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={[styles.footerLinkText, isMobile && styles.footerLinkTextMobile, isTablet && styles.footerLinkTextTablet]}>About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={[styles.footerLinkText, isMobile && styles.footerLinkTextMobile, isTablet && styles.footerLinkTextTablet]}>Meet Our Team</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={[styles.footerLinkText, isMobile && styles.footerLinkTextMobile, isTablet && styles.footerLinkTextTablet]}>Link 3</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={[styles.footerLinkText, isMobile && styles.footerLinkTextMobile, isTablet && styles.footerLinkTextTablet]}>Link 4</Text>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.footerColumn, isMobile && styles.footerColumnMobile]}>
              <Text style={[styles.footerColumnTitle, isMobile && styles.footerColumnTitleMobile, isTablet && styles.footerColumnTitleTablet]}>Legal</Text>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={[styles.footerLinkText, isMobile && styles.footerLinkTextMobile, isTablet && styles.footerLinkTextTablet]}>Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={[styles.footerLinkText, isMobile && styles.footerLinkTextMobile, isTablet && styles.footerLinkTextTablet]}>Terms of Service</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> 
        
        {/* Contact Info */}
        <View style={[styles.contactInfo, isMobile && styles.contactInfoMobile]}>
          <View style={[styles.contactItem, isMobile && styles.contactItemMobile]}>
            <Phone color="white" size={16} />
            <Text style={[styles.contactText, isMobile && styles.contactTextMobile, isTablet && styles.contactTextTablet]}>+91-9611248691</Text>
          </View>
          <View style={[styles.contactItem, isMobile && styles.contactItemMobile]}>
            <Mail color="white" size={16} />
            <Text style={[styles.contactText, isMobile && styles.contactTextMobile, isTablet && styles.contactTextTablet]}>mailid@gmail.com</Text>
          </View>
        </View>
        
        {/* Copyright */}
        <View style={styles.copyrightContainer}>
          <Text style={[styles.copyrightText, isMobile && styles.copyrightTextMobile, isTablet && styles.copyrightTextTablet]}>© 2025 Fincelerate Pvt Ltd.</Text>
        </View>
      </View>
      
      {/* Disclaimer Section */}
      <View style={[styles.disclaimerSection, isMobile && styles.disclaimerSectionMobile]}>
        <Text style={[styles.disclaimerTitle, isMobile && styles.disclaimerTitleMobile, isTablet && styles.disclaimerTitleTablet]}>
          Mutual Fund distributor with AMFI Registration number ARN-302467
        </Text>
        
        <Text style={[styles.disclaimerSubtitle, isMobile && styles.disclaimerSubtitleMobile, isTablet && styles.disclaimerSubtitleTablet]}>
          Fincelerate Private Limited CIN number: U66301KA2023PTC175585
        </Text>
        
        <Text style={[styles.disclaimerAddress, isMobile && styles.disclaimerAddressMobile, isTablet && styles.disclaimerAddressTablet]}>
          Registered Office: <Text style={styles.disclaimerAddressLink}>259, 14th Main, 27th Cross, Banashankari 2nd stage, Bengaluru, Karnataka 560070</Text>
        </Text>
        
        <Text style={[styles.disclaimerText, isMobile && styles.disclaimerTextMobile, isTablet && styles.disclaimerTextTablet]}>
          Disclaimer: Mutual fund investments are subject to market risks. Please read all scheme related documents carefully before investing.
        </Text>
        
        <Text style={[styles.disclaimerText, isMobile && styles.disclaimerTextMobile, isTablet && styles.disclaimerTextTablet]}>
          Past performance is not indicative of future returns. Please consider your specific investment requirements before choosing a fund, or designing a portfolio that suits your needs.
        </Text>
      </View>

    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // Footer Section
  footerSection: {
    backgroundColor: '#171313',
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    margin: 60,
  },
  footerContentMobile: {
    flexDirection: 'column',
    margin: 30,
    gap: 30,
  },
  footerContentTablet: {
    margin: 45,
  },
  footerLeft: {
    flex: 3,
  },
  footerLeftMobile: {
    alignItems: 'center',
  },
  copyrightlogo: {
    width: 400,
    height: 140,
    marginLeft: -60,
    marginBottom: -40,
    tintColor: 'rgba(255, 255, 255, 1)',
  },
  copyrightlogoMobile: {
    width: 200,
    height: 70,
    marginLeft: 0,
    marginBottom: -20,
  },
  copyrightlogoTablet: {
    width: 300,
    height: 105,
    marginLeft: -45,
    marginBottom: -30,
  },
  footerTagline: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Montserrat-400',
    marginBottom: 8,
  },
  footerTaglineMobile: {
    fontSize: 16,
    textAlign: 'center',
  },
  footerTaglineTablet: {
    fontSize: 20,
  },
  footerInvestText: {
    fontSize: 24,
    fontFamily: 'Montserrat-600',
    fontWeight: '600',
    marginBottom: 30,
  },
  footerInvestTextMobile: {
    fontSize: 16,
    textAlign: 'center',
  },
  footerInvestTextTablet: {
    fontSize: 20,
  },
  footerInvestAccent: {
    color: '#f39c12',
  },
  footerInvestNormal: {
    color: 'white',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  socialMediaContainerMobile: {
    justifyContent: 'center',
  },
  socialIcon: {
    width: 60,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconMobile: {
    width: 50,
    height: 35,
  },
  footerRight: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-around',
  },
  footerRightMobile: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 20,
  },
  footerColumn: {
    flex: 1,
    marginHorizontal: 10,
  },
  footerColumnMobile: {
    width: '45%',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  footerColumnTitle: {
    color: '#BABABA',
    fontSize: 18,
    fontFamily: 'Montserrat-500',
    fontWeight: '600',
    marginBottom: 20,
    textDecorationLine: 'underline'
  },
  footerColumnTitleMobile: {
    fontSize: 14,
    textAlign: 'center',
  },
  footerColumnTitleTablet: {
    fontSize: 16,
  },
  footerLink: {
    marginBottom: 12,
  },
  footerLinkText: {
    color: '#bababa',
    fontSize: 16,
    fontFamily: 'Montserrat-500',
  },
  footerLinkTextMobile: {
    fontSize: 12,
    textAlign: 'center',
  },
  footerLinkTextTablet: {
    fontSize: 14,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    paddingVertical: 20,
    borderTopWidth: 1,
    width: '100%',
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  contactInfoMobile: {
    flexDirection: 'column',
    gap: 15,
    alignItems: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactItemMobile: {
    justifyContent: 'center',
  },
  contactText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Montserrat-400',
  },
  contactTextMobile: {
    fontSize: 14,
  },
  contactTextTablet: {
    fontSize: 16,
  },
  copyrightContainer: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    width: '100%',
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  copyrightText: {
    color: '#ffffff',
    fontSize: 18,
    margin: 20,
    fontFamily: 'Montserrat-400',
  },
  copyrightTextMobile: {
    fontSize: 14,
  },
  copyrightTextTablet: {
    fontSize: 16,
  },

  // Disclaimer Section
  disclaimerSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  disclaimerSectionMobile: {
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  disclaimerTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-500',
    color: '#646464',
    textAlign: 'center',
    marginBottom: 12,
  },
  disclaimerTitleMobile: {
    fontSize: 12,
  },
  disclaimerTitleTablet: {
    fontSize: 16,
  },
  disclaimerSubtitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-500',
    fontWeight: '500',
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 12,
  },
  disclaimerSubtitleMobile: {
    fontSize: 12,
  },
  disclaimerSubtitleTablet: {
    fontSize: 16,
  },
  disclaimerAddress: {
    fontSize: 18,
    fontFamily: 'Montserrat-500',
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 20,
  },
  disclaimerAddressMobile: {
    fontSize: 12,
  },
  disclaimerAddressTablet: {
    fontSize: 16,
  },
  disclaimerAddressLink: {
    textDecorationLine: 'underline',
    color: '#34495e',
  },
  disclaimerText: {
    fontSize: 18,
    fontFamily: 'Montserrat-500',
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 8,
  },
  disclaimerTextMobile: {
    fontSize: 12,
    lineHeight: 16,
  },
  disclaimerTextTablet: {
    fontSize: 16,
  },

});