import React, { cloneElement, useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import { ChevronDown, Search, ArrowRight, ArrowDown, User, ChevronLeft, ChevronRight, Calendar, Instagram, Twitter, Youtube, Facebook, Linkedin, Mail, Phone, } from 'lucide-react-native';

// import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');
export default function LandingPage() {

  //Movement Animation
  const translateX = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    const startAnimation = () => {
      translateX.setValue(width);
      Animated.timing(translateX, {
        toValue: -width, // move out to the left
        duration: 12000,
        useNativeDriver: true,
      }).start(() => startAnimation()); // loop
    };

    startAnimation();
  }, [translateX]);

  // Market Insights State
  const [currentIndex, setCurrentIndex] = useState(0);

  // Watch Learn Invest Cards State
const [cardIndex, setCardIndex] = useState(0);
const scrollRef = useRef(null);

  // Market Insights Data
  const insights = [
    {
      title: "Understanding Mutual Funds in Today's Economy",
      description: "Lorem ipsum dolor sit amet, consectetur sadip scing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At",
      learnMore: "Learn More",
      image: require('../assets/images/icon.png') // Add your first chart image

    },
    {
      title: "Investment Strategies for Modern Markets", 
      description: "Lorem ipsum dolor sit amet, consectetur sadip scing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At",
      learnMore: "Learn More",
      image: require('../assets/images/react-logo.png')
    },
    {
      title: "Economic Indicators and Market Trends",
      description: "Lorem ipsum dolor sit amet, consectetur sadip scing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At", 
      learnMore: "Learn More",
      image: require('../assets/images/icon.png') 
    },
    {
      title: "Risk Assessment and Portfolio Management",
      description: "Lorem ipsum dolor sit amet, consectetur sadip scing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At",
      learnMore: "Learn More",
      image: require('../assets/images/react-logo.png')
    },
    {
      title: "Future of Financial Technology",
      description: "Lorem ipsum dolor sit amet, consectetur sadip scing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At",
      learnMore: "Learn More",
      image: require('../assets/images/icon.png') 
    }
  ];

  // Navigation Logic Functions
  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? insights.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === insights.length - 1 ? 0 : currentIndex + 1);
  };

// Watch Learn Invest Cards Data
const watchLearnCards = [
  {
    id: 1,
    image: require('../assets/images/icon.png')
  },
  {
    id: 2,
    image: require('../assets/images/icon.png')
  },
  {
    id: 3,
    image: require('../assets/images/icon.png')
  },
  {
    id: 4,
    image: require('../assets/images/icon.png')
  },
  {
    id: 5,
    image: require('../assets/images/icon.png')
  }
];
  
  // Card Navigation Logic Functions
  const handleCardPrevious = () => {
    setCardIndex(cardIndex === 0 ? watchLearnCards.length - 1 : cardIndex - 1);
  };

  const handleCardNext = () => {
    setCardIndex(cardIndex === watchLearnCards.length - 1 ? 0 : cardIndex + 1);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        {/* <Image/> */}
        <View style={styles.headerborder}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
          <View style={styles.headerCenter}>
            <TouchableOpacity style={styles.navItem}>
            <Image
              source={require('../assets/images/Fincelerate_Logo.png')}
              style={styles.navlogo}
              resizeMode="contain"
            />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Text style={styles.navText}>Mutual Funds</Text>
              <ChevronDown color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Text style={styles.navText}>Educate Yourself</Text>
              <ChevronDown color="white" size={20} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.signInButton}>
              <User color="white" size={20} />
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
        </View>
        

        {/* Hero Content */}
        <View style={styles.heroContentBorder}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            <Text style={styles.heroTitleAccent}>Invest
            <Text style={styles.heroTitleWhite}> with </Text>
            Purpose</Text>
          </Text>
          
          <TouchableOpacity style={styles.getStartedButton}>
            <Text style={styles.getStartedText}>Get Started
            <ArrowRight size={25} style={styles.arrowIcon} /> </Text>
          </TouchableOpacity>
          </View>
        </View>

        {/* Search Section */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search topics like 'How to start investing' or 'Mutual Funds'..."
              // placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.searchButton}>
              <Search color="white" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Curved Divider */}
        <View style={styles.curvedDividerContainer}>
          
          <TouchableOpacity style={styles.scrollDownButton}>
            <ArrowDown color="#81FFC0" size={36} />
          </TouchableOpacity>
        </View>

      </View>
      
      {/* Process Section */}
      <View style={styles.processSection}>
        <Text style={styles.processSectionTitle}>The Fincelerate Way</Text>
        <Text style={styles.processSectionSubtitle}>
          From Discovery to Growth, We've Got You Covered.
        </Text>
        
        <View style={styles.processSteps}>
          {/* Step 1 - Discover */}
          <View style={styles.processStep}>
            <View style={styles.processStepLeft}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepConnector} />
            </View>
            {/*  */}
            <View style={styles.processStepContent}>
              <Text style={styles.stepTitle}>Discover</Text>
              <Text style={styles.stepDescription}>
                Explore tailored opportunities and resources that guide your journey.
              </Text>
            </View>
          </View>

          {/* Step 2 - Understand (Active) */}
          <View style={styles.processStep}>
            <View style={styles.processStepLeft}>
              <View style={[styles.stepNumber]}>
                <Text style={[styles.stepNumberText]}>2</Text>
              </View>
              <View style={styles.stepConnector} />
            </View>
            
            <View style={[styles.processStepContent]}>
              <Text style={[styles.stepTitle]}>Understand</Text>
              <Text style={[styles.stepDescription]}>
                Learn the fundamentals and gain insights to invest confidently.
              </Text>
            </View>
          </View>

          {/* Step 3 - Grow */}
          <View style={styles.processStep}>
            <View style={styles.processStepLeft}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
            </View>
            
            <View style={styles.processStepContent}>
              <Text style={styles.stepTitle}>Grow</Text>
              <Text style={styles.stepDescription}>
                Take action and watch your investments grow toward your goals.
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.movementcontainer}>
      <Animated.View style={[styles.movingcontainer, { transform: [{ translateX }] }]}>
        <Text style={styles.movementtext}>Smart Investments for your bright future</Text>
        <Image
          source={require('../assets/images/Fincelerate_Logo.png')}
          style={styles.movementlogo}
          resizeMode="contain"
        />
        {/* <Text style={styles.movementtext}>Smart Investments for your bright future</Text>
        <Image
          source={require('../assets/images/Fincelerate_Logo.png')}
          style={styles.movementlogo}
          resizeMode="contain"
        /> */}
      </Animated.View>
    </View>

    {/* Market Insights Section */}
    <View style={styles.marketInsightConatier}>
    <View style={styles.marketInsightsSection}>
        {/* Header */}
        <View style={styles.marketInsightsHeader}>
          <Text style={styles.marketInsightsTitle}>Explore Our Hub of Market Insights</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <ArrowRight color="#5A32DA" size={20} />
          </TouchableOpacity>
        </View>

        {/* Content Area */}
        <View style={styles.marketInsightsContent}>
          {/* Left Content */}
          <View style={styles.leftContent}>
            <Text style={styles.insightTitle}>{insights[currentIndex].title}</Text>
            <Text style={styles.insightDescription}>{insights[currentIndex].description}</Text>
            
            <TouchableOpacity style={styles.learnMoreButton}>
              <Text style={styles.learnMoreText}>{insights[currentIndex].learnMore}</Text>
              <ArrowRight color="#5A32DA" size={18} />
            </TouchableOpacity>

            {/* Navigation Controls */}
            <View style={styles.navigationContainer}>
              {/* Dash Indicators */}
              <View style={styles.dashContainer}>
                {insights.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dash,
                      index === currentIndex ? styles.activeDash : styles.inactiveDash
                    ]}
                  />
                ))}
              </View>
              
              {/* Arrow Controls */}
              <View style={styles.arrowContainer}>
                <TouchableOpacity style={styles.arrowButton} onPress={handlePrevious}>
                  <ChevronLeft color="#666" size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowButton} onPress={handleNext}>
                  <ChevronRight color="#666" size={24} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Right Content - Empty Image Placeholder */}
          <View style={styles.rightContent}>
            <View style={styles.imageContainer}>
              <Image 
                source={insights[currentIndex].image}
                style={styles.chartImage}
                resizeMode="contain"
              />
              
            </View>
          </View>
        </View>
    </View>
    </View>

    <View style={styles.appointmentContainer}>
      <Text style={styles.appointmentText}>Your Financial Goals,</Text>
      <Text style={styles.appointmentText}>One Conversaion Away.</Text>
      <Text style={styles.appointmentTextColor}>Connect 
        <Text style={styles.appointmentTextWhite}> with an </Text>
        Investment Expert </Text>
        <TouchableOpacity style={styles.appointmentbtncontainer}>
            <Calendar color="white" size={32} />
            <Text style={styles.appointmentbtn}>Book An Appointment</Text>
        </TouchableOpacity>
    </View>

     {/* Watch Learn Invest Section */}
     <View style={styles.watchLearnSection}>
      
        <Text style={styles.watchLearnTitle}>Watch. Learn. Invest.</Text>
        
        <View style={styles.cardArrowBorder}>
        <View style={styles.cardArrowContainer}>
            <TouchableOpacity style={styles.cardArrowButton} onPress={handleCardPrevious}>
              <ChevronLeft color="#666" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardArrowButton} onPress={handleCardNext}>
              <ChevronRight color="#666" size={24} />
            </TouchableOpacity>
        </View>
        </View>

        {/* Cards Container */}
        <View style={styles.cardsContainerBorder}>
        <View style={styles.cardsContainer}>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsScrollContainer}
            scrollEnabled={false}
          >
            {watchLearnCards.map((card, index) => {
              const translateX = (index - cardIndex) * (width * 0.06);
              return (
                <View 
                  key={card.id}
                  style={[
                    styles.card,
                    {
                      transform: [{ translateX }]
                    }
                  ]}
                >
                  <Image 
                source={watchLearnCards[currentIndex].image}
                style={styles.chartImage}
                resizeMode="contain"
              />
                </View>
              );
            })}
          </ScrollView>
          </View>
        </View>


          {/* Navigation Controls */}
        <View style={styles.watchLearnHeader}>
          <View style={styles.cardDashContainer}>
            {watchLearnCards.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.cardDash,
                  index === cardIndex ? styles.activeCardDash : styles.inactiveCardDash
                ]}
              />
            ))}
          </View>
        </View>
        
        <TouchableOpacity style={styles.exploreMoreButton}>
          <Text style={styles.exploreMoreText}>Explore More</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Section */}
      <View style={styles.footerSection}>
       <View style={styles.footerContent}>
          {/* Left Side - Logo and Tagline */}
          <View style={styles.footerLeft}>
            <View style={styles.footerLogo}>
            <Image
              source={require('../assets/images/Fincelerate_pvt_ltd.png')}
              style={styles.copyrightlogo}
              // resizeMode="cover"
            />              
            </View>
            
            <Text style={styles.footerTagline}>Your journey, our guidance.</Text>
            <Text style={styles.footerInvestText}>
              <Text style={styles.footerInvestAccent}>Invest
              <Text style={styles.footerInvestNormal}> with </Text>
             confidence.
             </Text></Text>
            
            
            {/* Social Media Icons */}
            <View style={styles.socialMediaContainer}>
              <TouchableOpacity style={styles.socialIcon}>
                <Instagram color="white" size={32} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <Twitter color="white" size={32} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <Linkedin color="white" size={32} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <Youtube color="white" size={32} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <Facebook color="white" size={32} />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Right Side - Links */}
          <View style={styles.footerRight}>
            <View style={styles.footerColumn}>
              <Text style={styles.footerColumnTitle}>Quick Links</Text>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={styles.footerLinkText}>Link 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={styles.footerLinkText}>Link 2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={styles.footerLinkText}>Link 3</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={styles.footerLinkText}>Link 4</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.footerColumn}>
              <Text style={styles.footerColumnTitle}>Why Fincelerate?</Text>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={styles.footerLinkText}>About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={styles.footerLinkText}>Meet Our Team</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={styles.footerLinkText}>Link 3</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={styles.footerLinkText}>Link 4</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.footerColumn}>
              <Text style={styles.footerColumnTitle}>Legal</Text>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={styles.footerLinkText}>Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLink}>
                <Text style={styles.footerLinkText}>Terms of Service</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> 
        
        {/* Contact Info */}
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Phone color="white" size={16} />
            <Text style={styles.contactText}>+91-9611248691</Text>
          </View>
          <View style={styles.contactItem}>
            <Mail color="white" size={16} />
            <Text style={styles.contactText}>mailid@gmail.com</Text>
          </View>
        </View>
        
        {/* Copyright */}
        <View style={styles.copyrightContainer}>
          <Text style={styles.copyrightText}>© 2025 Fincelerate Pvt Ltd.</Text>
        </View>
      </View>
      
      {/* Disclaimer Section */}
      <View style={styles.disclaimerSection}>
        <Text style={styles.disclaimerTitle}>
          Mutual Fund distributor with AMFI Registration number ARN-302467
        </Text>
        
        <Text style={styles.disclaimerSubtitle}>
          Fincelerate Private Limited CIN number: U66301KA2023PTC175585
        </Text>
        
        <Text style={styles.disclaimerAddress}>
          Registered Office: <Text style={styles.disclaimerAddressLink}>259, 14th Main, 27th Cross, Banashankari 2nd stage, Bengaluru, Karnataka 560070</Text>
        </Text>
        
        <Text style={styles.disclaimerText}>
          Disclaimer: Mutual fund investments are subject to market risks. Please read all scheme related documents carefully before investing.
        </Text>
        
        <Text style={styles.disclaimerText}>
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
  heroSection: {
    // minHeight: height * 0.8,
    paddingBottom: 60,
    backgroundColor:'black',
    paddingTop:30,
  },
  headerborder:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  header: {
    display: 'flex',
    width:'80%',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#0F0F0F',
    borderRadius:50,
    // height: '30%',
  },
  headerLeft: {
    borderColor:'black',
    borderWidth:1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-between',
    // flex: 1,
    // width: '100%',
  },

  headerCenter: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 8,
   
  },
  navText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Montserrat-500',
    marginRight: 5,
  },
  navlogo: {
    width:60,
    height:60,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight:30,
    borderRadius: 20,
  },
  signInText: {
    color: 'white',
    fontSize: 18,
    fontFamily:'Poppins-500',
    marginLeft: 8,
  },
  heroContentBorder: {
    // alignItems: 'center',
    paddingHorizontal: 20,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    
  },
  heroContent: {
    width:'75%'
  },
  heroTitle: {
    fontSize: 70,
    fontFamily: 'Montserrat-900',
    paddingTop: 40,
    paddingBottom:20,
  },
  heroTitleAccent: {
    color: '#81FFC1',
  },
  heroTitleWhite: {
    color: 'white',
  },
  getStartedButton: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: 'transparent',
   
    // paddingHorizontal: 16,
    // paddingVertical: 8,
    borderRadius: 30,
    // width:'10%',
    padding:14,
  },
  getStartedText: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    color: 'white',
    borderWidth: 1,
    borderColor: '#81FFC1',
    fontSize: 20,
    fontFamily: 'Poppins-500',
    marginRight: 5,
    gap:6,
    width:180,
    padding:10,
    borderRadius:40,
  },
  arrowIcon: {
    color:"#81FFC1" 
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginTop:140,
   
  },
  searchInputContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 4,
    alignItems: 'center',
    width:700,
    borderWidth:1,
    borderColor:'white',
  },
  searchInput: {
    flex: 1,
    fontFamily:'Poppins-400',
    fontSize:18,
    color: 'white',
    
    paddingVertical: 16,
  },
  searchButton: {
    // padding: 12,
    // marginLeft: 10,
  },
  curvedDividerContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  
  scrollDownButton: {
    backgroundColor: '#1f1f1f',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: -25,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  processSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 80,
    alignItems: 'center',
  },
  processSectionTitle: {
    fontSize: 48,
    fontFamily:'Montserrat-500',
    color: '#4B4B4B',
    textAlign: 'center',
    marginBottom: 16,
  },
  processSectionSubtitle: {
    fontSize: 38,
    fontFamily:'Poppins-500',
    color: '#797979',
    textAlign: 'center',
    marginBottom: 60,
    // maxWidth: 600,
  },
  processSteps: {
    maxWidth: 800,
    // width: '100%',
  },
  processStep: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  processStepLeft: {
    alignItems: 'center',
    marginRight: 30,
  },
  stepNumber: {
    width: 96,
    height: 96,
    borderRadius: 50,
    backgroundColor: 'white',  
    borderWidth: 5,
    borderColor: '#5E17EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  // stepNumberActive: {
  //   borderColor: '#2196F3',
  //   backgroundColor: '#2196F3',
  // },
  stepNumberText: {
    color:'#4b4b4b',
    fontFamily:'Poppins-700',
    fontSize:56,
  },
  
  stepConnector: {
    width: 3,
    height: 80,
    backgroundColor: '#0A0A0A40',
  },
  processStepContent: {
    // flex: 1,
    // backgroundColor: 'white',
    padding: 20,
   
  },

  stepTitle: {
    color:'#4b4b4b',
    fontFamily:'Poppins-700',
    fontSize:56,
    marginTop: -14,

  },
 
  stepDescription: {
    color:'#4b4b4b',
    fontFamily:'Poppins-400',
    fontSize:24,
    // lineHeight: 14,
  },

  movementcontainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',

  },

  movingcontainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    gap:60,
    // width:'85%',
  },

  movementtext: {
    flex: 1,
    fontSize:90,
    fontFamily:'Poppins-300',
    color:"#BABABA"
  },

  movementlogo: {
    height: 60,
    width: 60,
    opacity: '0.24',
  },

   // Market Insights Styles
   marketInsightConatier: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#ffffff',
   },

   marketInsightsSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    width:'80%',
  },
  marketInsightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  marketInsightsTitle: {
    fontSize: 48,
    fontFamily: 'Montserrat-900',
    color: '#282930',
    flex: 1,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 18,
    color: '#5A32DA',
    fontFamily: 'Poppins-800',
    marginRight: 5,
    // fontFamily:
    textDecorationLine: 'underline',
  },
  marketInsightsContent: {
    // flexDirection: width > 768 ? 'row' : 'column',
    alignItems: 'center',
    // justifyContent:'center',
    flexDirection: 'row',
    padding:40,
    paddingLeft:60,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    gap: 40,
  },
  leftContent: {
    flex: 1,
    // paddingRight: width > 768 ? 0 : 0,
    // width:700,
  },
  insightTitle: {
    fontSize: 38,
    fontFamily: 'Poppins-500',
    color: '#242424',
    marginBottom: 20,
    lineHeight: 36,
  },
  insightDescription: {
    fontSize: 24,
    fontFamily:'Poppins-300',
    color: '#1a1a1a',
    lineHeight: 32,
    marginBottom: 30,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 80,
  },
  learnMoreText: {
    fontSize: 18,
    color: '#5A32DA',
    fontFamily: 'Poppins-800',
    marginRight: 5,
    textDecorationLine: 'underline',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    // justifyContent: 'center',
    gap:20,
  },
  dashContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'center',
    gap: 8,
  },
  dash: {
    height: 4,
    borderRadius: 2,
  },
  activeDash: {
    width: 80,
    backgroundColor: '#5A32DA',
  },
  inactiveDash: {
    width: 80,
    backgroundColor: '#ccc',
  },
  arrowContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  arrowButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    // borderColor: '#000000',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2,
  },
  rightContent: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    maxWidth: 500,
    height: 400,
    // backgroundColor: '#e9ecef',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    // borderColor: '#dee2e6',
    // borderStyle: 'dashed',
  },
  chartImage: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  imagePlaceholder: {
    position: 'absolute',
    fontSize: 18,
    color: '#6c757d',
    fontWeight: '500',
  },

  appointmentContainer: {
    backgroundColor: '#141414',
    padding: 60,
    alignItems:'center',
    justifyContent: 'center',
  },

  appointmentText: {
    color:'white',
    fontSize:34,
    fontFamily:'Poppins-300',
    lineHeight:'1.5',
  },
  appointmentTextColor: {
    fontSize: 47,
    fontFamilyt:'Montserrat-700',
    color: '#81FFC1',
    fontWeight:900,
    marginTop: 20
  },
  appointmentTextWhite:{
    color: 'white'
  },
  appointmentbtn: {
    color:'white',
    fontSize: 24,
    fontFamily:'Poppins-700',
    // textAlign: 'center'
  },
  appointmentbtncontainer: {
    backgroundColor: '#060505',
    textAlign: 'center',
    width:400,
    borderColor:'#81FFC1',
    borderWidth:1,
    borderRadius:40,
    flexDirection:'row',
    gap:10,
    padding:16,
    paddingLeft:40,
    marginTop:30,
  },

  // Watch Learn Invest Section Styles
  watchLearnSection: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 60,
    alignItems: 'center',
  },
  watchLearnTitle: {
    fontSize: 90,
    fontFamily: 'Poppins-900',
    color: '#535353',
    textAlign: 'center',
    // marginBottom: 20,
  },
  watchLearnHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
    marginTop: 40,
  },
  cardDashContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardDash: {
    height: 5,
    borderRadius: 2,
  },
  activeCardDash: {
    width: 80,
    backgroundColor: '#7C3AED',
  },
  inactiveCardDash: {
    width: 80,
    backgroundColor: '#ddd',
  },
  cardArrowContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  cardArrowBorder: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
   marginRight:40,
   marginBottom:20,
    width:'100%'
  },
  cardArrowButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  cardsContainerBorder: {
    flexDirection:'row',
    width:'100%',
    alignItems:'center',
    justifyContent: 'center',
  },
  cardsContainer: {
    width:'90%',
    overflow: 'hidden',
    height:500,

  },
  
  card: {
    width:660,
    height: 500,
    backgroundColor: '#4a4a4a',
    borderRadius: 16,
    overflow: 'hidden',
  
  },

  
  exploreMoreButton: {
    backgroundColor: '#5A32DA',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    margin:40,
  },
  exploreMoreText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Montserrat-900',
  },
  
  // Footer Section Styles
  footerSection: {
    backgroundColor: '#171313',

  },
  footerContent: {
    flexDirection: width > 768 ? 'row' : 'column',
    justifyContent: 'space-between',
    width:'90%',
    margin:60,

    // marginBottom: 40,
  },
  footerLeft: {
    flex: 3,
    // marginBottom: width > 768 ? 0 : 40,
  },
  copyrightlogo: {
    width: 400,
    height: 140,
    marginLeft:-60,
    marginBottom:-40,
    // borderRadius: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginRight: 10,
    tintColor: 'rgba(255, 255, 255, 1)',
  },

  footerTagline: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Montserrat-400',
    marginBottom: 8,
  },
  footerInvestText: {
    fontSize: 24,
    fontFamily: 'Montserrat-600',
    fontWeight: '600',
    marginBottom: 30,
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
  socialIcon: {
    width: 60,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerRight: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-around',
  },
  footerColumn: {
    flex: 1,
    marginHorizontal: 10,
  },
  footerColumnTitle: {
    color: '#BABABA',
    fontSize: 18,
    fontFamily: 'Montserrat-500',
    fontWeight: '600',
    marginBottom: 20,
    textDecorationLine:'underline'
  },
  footerLink: {
    marginBottom: 12,
  },
  footerLinkText: {
    color: '#bababa',
    fontSize: 16,
    fontFamily: 'Montserrat-500',
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    // marginBottom: 30,
    paddingVertical: 20,
    borderTopWidth: 1,
    width:'100%',
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Montserrat-400',
  },
  copyrightContainer: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    width:'100%',
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  copyrightText: {
    color: '#ffffff',
    fontSize: 18,
    margin:20,
    fontFamily: 'Montserrat-400',
  },
  
  // Disclaimer Section Styles
  disclaimerSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    // width:'100%', 
  },
  disclaimerTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-500',
    color: '#646464',
    textAlign: 'center',
    marginBottom: 12,
  },
  disclaimerSubtitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-500',
    fontWeight: '500',
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 12,
  },
  disclaimerAddress: {
    fontSize: 18,
    fontFamily: 'Montserrat-500',
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 20,
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
    // maxWidth: 800,
  },
});
