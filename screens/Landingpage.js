
import {
  ArrowDown,
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Lightbulb,
  Menu,
  PiggyBank,
  Search,
  ShoppingCart,
  User,
  X
} from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AuthModal from '../auth/AuthModal';
import BookAppointmentModal from '../components/BookAppointmentModal.js';
import Footer from './Footer.js'

const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track auth state
  const [userName, setUserName] = useState('Anchal Tiwari'); // User name when authenticated

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

  // Movement Animation
  const translateX = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    const startAnimation = () => {
      translateX.setValue(width);
      Animated.timing(translateX, {
        toValue: -width,
        duration: 12000,
        useNativeDriver: true,
      }).start(() => startAnimation());
    };

    startAnimation();
  }, [translateX]);

  // Market Insights State
  const [currentIndex, setCurrentIndex] = useState(0);

  // Watch Learn Invest Cards State
  const [cardIndex, setCardIndex] = useState(0);
  const scrollRef = useRef(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Market Insights Data
  const insights = [
    {
      title: "Understanding Mutual Funds in Today's Economy",
      description: "Lorem ipsum dolor sit amet, consectetur sadip scing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At",
      learnMore: "Learn More",
      image: require('../assets/images/icon.png')
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
      image: require('../assets/images/react-logo.png')
    },
    {
      id: 3,
      image: require('../assets/images/icon.png')
    },
    {
      id: 4,
      image: require('../assets/images/react-logo.png')
    },
    {
      id: 5,
      image: require('../assets/images/icon.png')
    }
  ];
  
  // Card Navigation Logic Functions with proper centering
  const handleCardPrevious = () => {
    setCardIndex(cardIndex === 0 ? watchLearnCards.length - 1 : cardIndex - 1);
  };

  const handleCardNext = () => {
    setCardIndex(cardIndex === watchLearnCards.length - 1 ? 0 : cardIndex + 1);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        <View style={[styles.headerborder, isMobile && styles.headerborderMobile, isTablet && styles.headerborderTablet]}>
          <View style={[styles.header, isMobile && styles.headerMobile, isTablet && styles.headerTablet]}>
            {/* Mobile Header */}
            {isMobile ? (
              <View style={styles.mobileHeader}>
                <Image
                  source={require('../assets/images/Fincelerate_Logo.png')}
                  style={styles.navlogoMobile}
                  resizeMode="contain"
                />
                <TouchableOpacity 
                  style={styles.menuButton}
                  onPress={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? (
                    <X color="white" size={24} />
                  ) : (
                    <Menu color="white" size={24} />
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              /* Desktop/Tablet Navbar */
              <>
                <View style={[styles.headerCenter, isTablet && styles.headerCenterTablet]}>
                  <TouchableOpacity style={styles.navItem}>
                    <Image
                      source={require('../assets/images/Fincelerate_Logo.png')}
                      style={[styles.navlogo, isTablet && styles.navlogoTablet]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.navItem}>
                    <Text style={[styles.navText, isTablet && styles.navTextTablet]}>Mutual Funds</Text>
                    <ChevronDown color="white" size={isTablet ? 18 : 20} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.navItem}>
                    <Text style={[styles.navText, isTablet && styles.navTextTablet]}>Educate Yourself</Text>
                    <ChevronDown color="white" size={isTablet ? 18 : 20} />
                  </TouchableOpacity>
                </View>
                
                <View style={[styles.headerRight, isTablet && styles.headerRightTablet]}>
                  {isAuthenticated ? (
                    <View style={[styles.iconBorder, isTablet && styles.iconBorderTablet]}>
                      <TouchableOpacity style={[styles.icons, isTablet && styles.iconsTablet]}>
                        <Search size={isTablet ? 22 : 25} color='#fff' />
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.iconSpacing, isTablet && styles.iconSpacingTablet]}>
                        <ShoppingCart size={isTablet ? 22 : 25} color="#fff" />
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.iconUser, isTablet && styles.iconUserTablet]}>
                        <User size={isTablet ? 22 : 25} color="#fff" />
                        <Text style={[styles.signinText, isTablet && styles.signinTextTablet]}>{userName}</Text>
                        <ChevronDown color="white" size={isTablet ? 18 : 20} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity 
                      style={[styles.signInButton, isTablet && styles.signInButtonTablet]}
                      onPress={() => setShowAuthModal(true)}
                    >
                      <User color="white" size={isTablet ? 18 : 20} />
                      <Text style={[styles.signInText, isTablet && styles.signInTextTablet]}>Sign In</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            )}
          </View>
        </View>

        {/* Hero Content */}
        <View style={[styles.heroContentBorder, isMobile && styles.heroContentBorderMobile, isTablet && styles.heroContentBorderTablet]}>
          <View style={[styles.heroContent, isMobile && styles.heroContentMobile, isTablet && styles.heroContentTablet]}>
            <Text style={[styles.heroTitle, isMobile && styles.heroTitleMobile, isTablet && styles.heroTitleTablet]}>
              <Text style={styles.heroTitleAccent}>Invest
              <Text style={styles.heroTitleWhite}> with </Text>
              Purpose</Text>
            </Text>
            
            <TouchableOpacity style={[styles.getStartedButton, isMobile && styles.getStartedButtonMobile, isTablet && styles.getStartedButtonTablet]}>
              <Text style={[styles.getStartedText, isMobile && styles.getStartedTextMobile, isTablet && styles.getStartedTextTablet]}>Get Started
              <ArrowRight size={isMobile ? 18 : isTablet ? 22 : 25} style={styles.arrowIcon} /> </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Section */}
        <View style={[styles.searchContainer, isMobile && styles.searchContainerMobile, isTablet && styles.searchContainerTablet]}>
          <View style={[styles.searchInputContainer, isMobile && styles.searchInputContainerMobile, isTablet && styles.searchInputContainerTablet]}>
            <TextInput
              style={[styles.searchInput, isMobile && styles.searchInputMobile, isTablet && styles.searchInputTablet]}
              placeholder="Search topics like 'How to start investing' or 'Mutual Funds'..."
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.searchButton}>
              <Search color="white" size={isMobile ? 20 : 24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Curved Divider */}
        <View style={styles.curvedDividerContainer}>
          <TouchableOpacity style={[styles.scrollDownButton, isMobile && styles.scrollDownButtonMobile]}>
            <ArrowDown color="#81FFC0" size={isMobile ? 28 : 36} />
          </TouchableOpacity>
        </View>

      </View>
      
      {/* Process Section */}
      <View style={[styles.processSection, isMobile && styles.processSectionMobile, isTablet && styles.processSectionTablet]}>
        <Text style={[styles.processSectionTitle, isMobile && styles.processSectionTitleMobile, isTablet && styles.processSectionTitleTablet]}>The Fincelerate Way</Text>
        <Text style={[styles.processSectionSubtitle, isMobile && styles.processSectionSubtitleMobile, isTablet && styles.processSectionSubtitleTablet]}>
          From Discovery to Growth, We,ve Got You Covered.
        </Text>
        
        <View style={[styles.processSteps, isMobile && styles.processStepsMobile]}>
          {/* Step 1 - Discover */}
          <View style={[styles.processStep, isMobile && styles.processStepMobile]}>
            <View style={styles.processStepLeft}>
              <View style={[styles.stepNumber, isMobile && styles.stepNumberMobile]}>
                <Text style={[styles.stepNumberText, isMobile && styles.stepNumberTextMobile]}>1</Text>
              </View>
              <View style={[styles.stepConnector, isMobile && styles.stepConnectorMobile]} />
            </View>
            <View style={[styles.processStepContent, isMobile && styles.processStepContentMobile]}>
              <Text style={[styles.stepTitle, isMobile && styles.stepTitleMobile, isTablet && styles.stepTitleTablet]}>Discover</Text>
              <Text style={[styles.stepDescription, isMobile && styles.stepDescriptionMobile, isTablet && styles.stepDescriptionTablet]}>
                Explore tailored opportunities and resources that guide your journey.
              </Text>
            </View>
          </View>

          {/* Step 2 - Understand */}
          <View style={[styles.processStep, isMobile && styles.processStepMobile]}>
            <View style={styles.processStepLeft}>
              <View style={[styles.stepNumber, isMobile && styles.stepNumberMobile]}>
                <Text style={[styles.stepNumberText, isMobile && styles.stepNumberTextMobile]}>2</Text>
              </View>
              <View style={[styles.stepConnector, isMobile && styles.stepConnectorMobile]} />
            </View>
            <View style={[styles.processStepContent, isMobile && styles.processStepContentMobile]}>
              <Text style={[styles.stepTitle, isMobile && styles.stepTitleMobile, isTablet && styles.stepTitleTablet]}>Understand</Text>
              <Text style={[styles.stepDescription, isMobile && styles.stepDescriptionMobile, isTablet && styles.stepDescriptionTablet]}>
                Learn the fundamentals and gain insights to invest confidently.
              </Text>
            </View>
          </View>

          {/* Step 3 - Grow */}
          <View style={[styles.processStep, isMobile && styles.processStepMobile]}>
            <View style={styles.processStepLeft}>
              <View style={[styles.stepNumber, isMobile && styles.stepNumberMobile]}>
                <Text style={[styles.stepNumberText, isMobile && styles.stepNumberTextMobile]}>3</Text>
              </View>
            </View>
            <View style={[styles.processStepContent, isMobile && styles.processStepContentMobile]}>
              <Text style={[styles.stepTitle, isMobile && styles.stepTitleMobile, isTablet && styles.stepTitleTablet]}>Grow</Text>
              <Text style={[styles.stepDescription, isMobile && styles.stepDescriptionMobile, isTablet && styles.stepDescriptionTablet]}>
                Take action and watch your investments grow toward your goals.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Moving Text Section */}
      <View style={styles.movementcontainer}>
        <Animated.View style={[styles.movingcontainer, { transform: [{ translateX }] }]}>
          <Text style={[styles.movementtext, isMobile && styles.movementtextMobile, isTablet && styles.movementtextTablet]}>Smart Investments for your bright future</Text>
          <Image
            source={require('../assets/images/Fincelerate_Logo.png')}
            style={[styles.movementlogo, isMobile && styles.movementlogoMobile]}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      {/* Market Insights Section */}
      <View style={[styles.marketInsightConatier, isMobile && styles.marketInsightConatierMobile]}>
        <View style={[styles.marketInsightsSection, isMobile && styles.marketInsightsSectionMobile, isTablet && styles.marketInsightsSectionTablet]}>
          {/* Header */}
          <View style={[styles.marketInsightsHeader, isMobile && styles.marketInsightsHeaderMobile]}>
            <Text style={[styles.marketInsightsTitle, isMobile && styles.marketInsightsTitleMobile, isTablet && styles.marketInsightsTitleTablet]}>Explore Our Hub of Market Insights</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={[styles.viewAllText, isMobile && styles.viewAllTextMobile, isTablet && styles.viewAllTextTablet]}>View All</Text>
              <ArrowRight color="#5A32DA" size={isMobile ? 16 : 20} />
            </TouchableOpacity>
          </View>

          {/* Content Area */}
          <View style={[styles.marketInsightsContent, isMobile && styles.marketInsightsContentMobile, isTablet && styles.marketInsightsContentTablet]}>
            {/* Left Content */}
            <View style={[styles.leftContent, isMobile && styles.leftContentMobile]}>
              <Text style={[styles.insightTitle, isMobile && styles.insightTitleMobile, isTablet && styles.insightTitleTablet]}>{insights[currentIndex].title}</Text>
              <Text style={[styles.insightDescription, isMobile && styles.insightDescriptionMobile, isTablet && styles.insightDescriptionTablet]}>{insights[currentIndex].description}</Text>
              
              <TouchableOpacity style={[styles.learnMoreButton, isMobile && styles.learnMoreButtonMobile]}>
                <Text style={[styles.learnMoreText, isMobile && styles.learnMoreTextMobile, isTablet && styles.learnMoreTextTablet]}>{insights[currentIndex].learnMore}</Text>
                <ArrowRight color="#5A32DA" size={isMobile ? 14 : 18} />
              </TouchableOpacity>

              {/* Navigation Controls */}
              <View style={[styles.navigationContainer, isMobile && styles.navigationContainerMobile, isTablet && styles.navigationContainerTablet]}>
                {/* Dash Indicators */}
                <View style={styles.dashContainer}>
                  {insights.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.dash,
                        isMobile && styles.dashMobile,
                        index === currentIndex ? styles.activeDash : styles.inactiveDash
                      ]}
                    />
                  ))}
                </View>
                
                {/* Arrow Controls */}
                <View style={styles.arrowContainer}>
                  <TouchableOpacity style={[styles.arrowButton, isMobile && styles.arrowButtonMobile]} onPress={handlePrevious}>
                    <ChevronLeft color="#666" size={isMobile ? 18 : 24} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.arrowButton, isMobile && styles.arrowButtonMobile]} onPress={handleNext}>
                    <ChevronRight color="#666" size={isMobile ? 18 : 24} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Right Content - Image */}
            <View style={[styles.rightContent, isMobile && styles.rightContentMobile]}>
              <View style={[styles.imageContainer, isMobile && styles.imageContainerMobile]}>
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

      {/* Appointment Section */}
      <View style={[styles.appointmentContainer, isMobile && styles.appointmentContainerMobile, isTablet && styles.appointmentContainerTablet]}>
        <Text style={[styles.appointmentText, isMobile && styles.appointmentTextMobile, isTablet && styles.appointmentTextTablet]}>Your Financial Goals,</Text>
        <Text style={[styles.appointmentText, isMobile && styles.appointmentTextMobile, isTablet && styles.appointmentTextTablet]}>One Conversaion Away.</Text>
        <Text style={[styles.appointmentTextColor, isMobile && styles.appointmentTextColorMobile, isTablet && styles.appointmentTextColorTablet]}>Connect 
          <Text style={styles.appointmentTextWhite}> with an </Text>
          Investment Expert </Text>
          <TouchableOpacity 
          style={[styles.appointmentbtncontainer, isMobile && styles.appointmentbtncontainerMobile, isTablet && styles.appointmentbtncontainerTablet]}
          onPress={() => setShowBookingModal(true)}
        >
          <Calendar color="white" size={isMobile ? 24 : 32} />
          <Text style={[styles.appointmentbtn, isMobile && styles.appointmentbtnMobile, isTablet && styles.appointmentbtnTablet]}>Book An Appointment</Text>
        </TouchableOpacity>
      </View>

      {/* Watch Learn Invest Section */}
      <View style={[styles.watchLearnSection, isMobile && styles.watchLearnSectionMobile, isTablet && styles.watchLearnSectionTablet]}>
        <Text style={[styles.watchLearnTitle, isMobile && styles.watchLearnTitleMobile, isTablet && styles.watchLearnTitleTablet]}>Watch. Learn. Invest.</Text>
        
        <View style={[styles.cardArrowBorder, isMobile && styles.cardArrowBorderMobile]}>
          <View style={styles.cardArrowContainer}>
            <TouchableOpacity style={[styles.cardArrowButton, isMobile && styles.cardArrowButtonMobile]} onPress={handleCardPrevious}>
              <ChevronLeft color="#666" size={isMobile ? 18 : 24} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cardArrowButton, isMobile && styles.cardArrowButtonMobile]} onPress={handleCardNext}>
              <ChevronRight color="#666" size={isMobile ? 18 : 24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Cards Container with proper centering */}
        <View style={[styles.cardsContainerBorder, isMobile && styles.cardsContainerBorderMobile]}>
          <View style={[styles.cardsContainer, isMobile && styles.cardsContainerMobile]}>
            <View style={styles.cardsWrapper}>
              {watchLearnCards.map((card, index) => {
                // Calculate position relative to active card
                let position = index - cardIndex;
                
                // Handle wrapping for infinite loop
                if (position < -2) position += watchLearnCards.length;
                if (position > 2) position -= watchLearnCards.length;
                
                const cardWidth = isMobile ? width * 0.8 : isTablet ? width * 0.6 : 660;
                const translateX = position * (cardWidth + (isMobile ? 20 : 40));
                
                return (
                  <View 
                    key={card.id}
                    style={[
                      styles.card,
                      isMobile && styles.cardMobile,
                      isTablet && styles.cardTablet,
                      {
                        transform: [{ translateX }],
                        width: cardWidth,
                      }
                    ]}
                  >
                    <Image 
                      source={card.image}
                      style={styles.cardImage}
                      resizeMode="contain"
                    />
                  </View>
                );
              })}
            </View>
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
                  isMobile && styles.cardDashMobile,
                  index === cardIndex ? styles.activeCardDash : styles.inactiveCardDash
                ]}
              />
            ))}
          </View>
        </View>
        
        <TouchableOpacity style={[styles.exploreMoreButton, isMobile && styles.exploreMoreButtonMobile, isTablet && styles.exploreMoreButtonTablet]}>
          <Text style={[styles.exploreMoreText, isMobile && styles.exploreMoreTextMobile, isTablet && styles.exploreMoreTextTablet]}>Explore More</Text>
        </TouchableOpacity>
      </View>
      
      <Footer />
      {/* Mobile Menu Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuOpen && isMobile}
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.fullScreenMenu}>
                <SafeAreaView style={styles.menuContent}>
                  <View style={styles.menuHeader}>
                    <Image
                      source={require('../assets/images/Fincelerate_Logo.png')}
                      style={styles.menuLogo}
                      resizeMode="contain"
                    />
                    <TouchableOpacity 
                      style={styles.closeButton}
                      onPress={closeMenu}
                    >
                      <X color="white" size={28} />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.menuItems}>
                    <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                      <LayoutDashboard color="white" size={24} />
                      <Text style={styles.menuItemText}>Dashboard</Text>
                      <ChevronRight color="white" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                      <PiggyBank color="white" size={24} />
                      <Text style={styles.menuItemText}>Mutual Funds</Text>
                      <ChevronRight color="white" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                      <Lightbulb color="white" size={24} />
                      <Text style={styles.menuItemText}>Educate Yourself</Text>
                      <ChevronRight color="white" size={20} />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.menuFooter}>
                    {isAuthenticated ? (
                      <View style={styles.menuActions}>
                        <TouchableOpacity style={styles.menuActionButton}>
                          <Search size={24} color='#fff' />
                          <Text style={styles.menuActionText}>Search</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuActionButton}>
                          <ShoppingCart size={24} color="#fff" />
                          <Text style={styles.menuActionText}>Cart</Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                    <TouchableOpacity 
                      style={styles.menuSignInButton} 
                      onPress={() => {
                        closeMenu();
                        if (!isAuthenticated) {
                          setShowAuthModal(true);
                        }
                      }}
                    >
                      <User size={24} color={isAuthenticated ? "#000" : "#fff"} />
                      <Text style={[styles.menuSignInText, isAuthenticated && styles.menuSignInTextAuth]}>
                        {isAuthenticated ? userName : 'Sign In'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </SafeAreaView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          visible={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
      {showBookingModal && (
        <BookAppointmentModal 
          visible={showBookingModal}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    paddingBottom: 60,
    backgroundColor: 'black',
    paddingTop: 30,
  },
  
  // Header Styles
  headerborder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerborderMobile: {
    paddingHorizontal: 16,
  },
  headerborderTablet: {
    paddingHorizontal: 20,
  },
  header: {
    display: 'flex',
    width: '80%',
    backgroundColor: '#0F0F0F',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  headerMobile: {
    width: '95%',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  headerTablet: {
    width: '90%',
    paddingVertical: 10,
  },
  
  // Mobile Header
  mobileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  menuButton: {
    padding: 8,
  },
  navlogoMobile: {
    width: 40,
    height: 40,
  },
  
  // Desktop/Tablet Header
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
  },
  headerCenterTablet: {
    gap: 30,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat-500',
    marginRight: 5,
  },
  navTextTablet: {
    fontSize: 16,
  },
  navlogo: {
    width: 60,
    height: 60,
  },
  navlogoTablet: {
    width: 50,
    height: 50,
  },
  
  headerRight: {
    alignItems: 'flex-end',
  },
  headerRightTablet: {
    alignItems: 'center',
  },
  
  // Sign In Button (when not authenticated)
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  signInButtonTablet: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  signInText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-500',
  },
  signInTextTablet: {
    fontSize: 14,
  },
  
  // Authenticated User Icons
  iconBorder: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconBorderTablet: {
    gap: 12,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: '#151515',
  },
  iconsTablet: {
    height: 42,
    width: 42,
  },
  iconSpacing: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#2D3439',
  },
  iconSpacingTablet: {
    height: 42,
    width: 42,
  },
  iconUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconUserTablet: {
    gap: 6,
  },
  signinText: {
    color: '#fff',
    fontFamily: 'Poppins-500',
    fontSize: 16,
  },
  signinTextTablet: {
    fontSize: 14,
  },

  // Hero Content
  heroContentBorder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroContentBorderMobile: {
    paddingHorizontal: 16,
  },
  heroContentBorderTablet: {
    paddingHorizontal: 24,
  },
  heroContent: {
    width: '75%',
    // alignItems: 'center',
  },
  heroContentMobile: {
    width: '95%',
  },
  heroContentTablet: {
    width: '85%',
  },
  heroTitle: {
    fontSize: 70,
    fontFamily: 'Montserrat-900',
    paddingTop: 40,
    paddingBottom: 20,
    // textAlign: 'center',
  },
  heroTitleMobile: {
    fontSize: 32,
    paddingTop: 20,
    paddingBottom: 16,
  },
  heroTitleTablet: {
    fontSize: 48,
    paddingTop: 30,
  },
  heroTitleAccent: {
    color: '#81FFC1',
  },
  heroTitleWhite: {
    color: 'white',
  },
  getStartedButton: {
    padding: 14,
    borderRadius: 30,
  },
  getStartedButtonMobile: {
    padding: 10,
  },
  getStartedButtonTablet: {
    padding: 12,
  },
  getStartedText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    borderWidth: 1,
    borderColor: '#81FFC1',
    fontSize: 20,
    fontFamily: 'Poppins-500',
    gap: 6,
    width: 180,
    padding: 10,
    borderRadius: 40,
    textAlign: 'center',
  },
  getStartedTextMobile: {
    fontSize: 16,
    width: 140,
    padding: 8,
  },
  getStartedTextTablet: {
    fontSize: 18,
    width: 160,
  },
  arrowIcon: {
    color: "#81FFC1" 
  },

  // Search Section
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 140,
  },
  searchContainerMobile: {
    marginTop: 60,
    paddingHorizontal: 16,
  },
  searchContainerTablet: {
    marginTop: 100,
  },
  searchInputContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 4,
    alignItems: 'center',
    width: 700,
    borderWidth: 1,
    borderColor: 'white',
  },
  searchInputContainerMobile: {
    width: '100%',
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  searchInputContainerTablet: {
    width: 500,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-400',
    fontSize: 18,
    color: 'white',
    paddingVertical: 16,
  },
  searchInputMobile: {
    fontSize: 14,
    paddingVertical: 12,
  },
  searchInputTablet: {
    fontSize: 16,
  },
  searchButton: {
    padding: 8,
  },

  // Curved Divider
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
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  scrollDownButtonMobile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  // Process Section
  processSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 80,
    alignItems: 'center',
  },
  processSectionMobile: {
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  processSectionTablet: {
    paddingVertical: 60,
  },
  processSectionTitle: {
    fontSize: 48,
    fontFamily: 'Montserrat-500',
    color: '#4B4B4B',
    textAlign: 'center',
    marginBottom: 16,
  },
  processSectionTitleMobile: {
    fontSize: 24,
  },
  processSectionTitleTablet: {
    fontSize: 36,
  },
  processSectionSubtitle: {
    fontSize: 38,
    fontFamily: 'Poppins-500',
    color: '#797979',
    textAlign: 'center',
    marginBottom: 60,
  },
  processSectionSubtitleMobile: {
    fontSize: 16,
    marginBottom: 40,
  },
  processSectionSubtitleTablet: {
    fontSize: 24,
    marginBottom: 50,
  },
  processSteps: {
    maxWidth: 800,
  },
  processStepsMobile: {
    maxWidth: '100%',
  },
  processStep: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  processStepMobile: {
    marginBottom: 20,
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
  stepNumberMobile: {
    width: 60,
    height: 60,
    borderWidth: 3,
    marginBottom: 15,
  },
  stepNumberText: {
    color: '#4b4b4b',
    fontFamily: 'Poppins-700',
    fontSize: 56,
  },
  stepNumberTextMobile: {
    fontSize: 32,
  },
  stepConnector: {
    width: 3,
    height: 80,
    backgroundColor: '#0A0A0A40',
  },
  stepConnectorMobile: {
    height: 40,
  },
  processStepContent: {
    flex: 1,
    padding: 20,
  },
  processStepContentMobile: {
    padding: 10,
  },
  stepTitle: {
    color: '#4b4b4b',
    fontFamily: 'Poppins-700',
    fontSize: 56,
    marginTop: -14,
  },
  stepTitleMobile: {
    fontSize: 24,
    marginTop: -8,
  },
  stepTitleTablet: {
    fontSize: 36,
  },
  stepDescription: {
    color: '#4b4b4b',
    fontFamily: 'Poppins-400',
    fontSize: 24,
  },
  stepDescriptionMobile: {
    fontSize: 14,
    lineHeight: 20,
  },
  stepDescriptionTablet: {
    fontSize: 18,
  },

  // Movement Section
  movementcontainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    // paddingVertical: 20,
  },
  movingcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 60,
  },
  movementtext: {
    flex: 1,
    fontSize: 90,
    fontFamily: 'Poppins-300',
    color: "#BABABA"
  },
  movementtextMobile: {
    fontSize: 32,
  },
  movementtextTablet: {
    fontSize: 60,
  },
  movementlogo: {
    height: 60,
    width: 60,
    opacity: 0.24,
  },
  movementlogoMobile: {
    height: 40,
    width: 40,
  },

  // Market Insights Styles
  marketInsightConatier: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  marketInsightConatierMobile: {
    paddingHorizontal: 0,
  },
  marketInsightsSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    width: '80%',
  },
  marketInsightsSectionMobile: {
    width: '95%',
    paddingVertical: 40,
    paddingHorizontal: 16,

  },
  marketInsightsSectionTablet: {
    width: '90%',
    paddingVertical: 50,
  },
  marketInsightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  marketInsightsHeaderMobile: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    marginBottom: 30,
  },
  marketInsightsTitle: {
    fontSize: 48,
    fontFamily: 'Montserrat-900',
    color: '#282930',
    flex: 1,
  },
  marketInsightsTitleMobile: {
    fontSize: 24,
    textAlign: 'center',
    flex: 'none',
  },
  marketInsightsTitleTablet: {
    fontSize: 36,
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
    textDecorationLine: 'underline',
  },
  viewAllTextMobile: {
    fontSize: 14,
  },
  viewAllTextTablet: {
    fontSize: 16,
  },
  marketInsightsContent: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 40,
    paddingLeft: 60,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    gap: 40,
  },
  marketInsightsContentMobile: {
    flexDirection: 'column',
    padding: 20,
    gap: 20,
    height:'auto',
  },
  marketInsightsContentTablet: {
    padding: 30,
    gap: 30,
  },
  leftContent: {
    flex: 1,
  },
  leftContentMobile: {
    width: '100%',
  },
  insightTitle: {
    fontSize: 38,
    fontFamily: 'Poppins-500',
    color: '#242424',
    marginBottom: 20,
    lineHeight: 36,
  },
  insightTitleMobile: {
    fontSize: 20,
    lineHeight: 26,
    textAlign: 'center',
  },
  insightTitleTablet: {
    fontSize: 28,
    lineHeight: 32,
  },
  insightDescription: {
    fontSize: 24,
    fontFamily: 'Poppins-300',
    color: '#1a1a1a',
    lineHeight: 32,
    marginBottom: 30,
  },
  insightDescriptionMobile: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  insightDescriptionTablet: {
    fontSize: 18,
    lineHeight: 26,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 80,
    // justifyContent: 'center',
  },
  learnMoreButtonMobile: {
    marginBottom: 120,
  },
  learnMoreText: {
    fontSize: 18,
    color: '#5A32DA',
    fontFamily: 'Poppins-800',
    marginRight: 5,
    textDecorationLine: 'underline',
  },
  learnMoreTextMobile: {
    fontSize: 14,
  },
  learnMoreTextTablet: {
    fontSize: 16,
  },
  navigationContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    margin: 20,
  },
  navigationContainerMobile: {
    marginTop: 220,
  },
  navigationContainerTablet:{
    marginTop:120,
    marginLeft:120,
    },
  dashContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  dash: {
    height: 4,
    borderRadius: 2,
    width: 80,
  },
  dashMobile: {
    width: 40,
    height: 3,
  },
  activeDash: {
    backgroundColor: '#5A32DA',
  },
  inactiveDash: {
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
  },
  arrowButtonMobile: {
    width: 40,
    height: 40,
  },
  rightContent: {
    flex: 1,
    alignItems: 'center',
  },
  rightContentMobile: {
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    maxWidth: 500,
    height: 400,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  imageContainerMobile: {
    height: 200,
    maxWidth: 300,
    // marginBottom:-10,
    marginTop:-110,

  },

  chartImage: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },

  // Appointment Section
  appointmentContainer: {
    backgroundColor: '#141414',
    padding: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appointmentContainerMobile: {
    padding: 30,
  },
  appointmentContainerTablet: {
    padding: 45,
  },
  appointmentText: {
    color: 'white',
    fontSize: 34,
    fontFamily: 'Poppins-300',
    lineHeight: 1.5,
    textAlign: 'center',
    margin:20,
  },
  appointmentTextMobile: {
    fontSize: 20,
    marginLeft:0,
    marginRight:0,
    lineHeight:0,
  },
  appointmentTextTablet: {
    fontSize: 28,
  },
  appointmentTextColor: {
    fontSize: 47,
    fontFamily: 'Montserrat-700',
    color: '#81FFC1',
    fontWeight: '900',
    marginTop: 20,
    textAlign: 'center',
  },
  appointmentTextColorMobile: {
    fontSize: 24,
    marginTop: 15,
  },
  appointmentTextColorTablet: {
    fontSize: 36,
  },
  appointmentTextWhite: {
    color: 'white'
  },
  appointmentbtn: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Poppins-700',
  },
  appointmentbtnMobile: {
    fontSize: 16,
  },
  appointmentbtnTablet: {
    fontSize: 20,
  },
  appointmentbtncontainer: {
    backgroundColor: '#060505',
    textAlign: 'center',
    width: 400,
    borderColor: '#81FFC1',
    borderWidth: 1,
    borderRadius: 40,
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    paddingLeft: 40,
    marginTop: 30,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  appointmentbtncontainerMobile: {
    width: 280,
    padding: 12,
    paddingLeft: 30,
    gap: 8,
  },
  appointmentbtncontainerTablet: {
    width: 340,
    padding: 14,
    paddingLeft: 35,
  },

  // Watch Learn Invest Section
  watchLearnSection: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 60,
    alignItems: 'center',
  },
  watchLearnSectionMobile: {
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  watchLearnSectionTablet: {
    paddingVertical: 50,
  },
  watchLearnTitle: {
    fontSize: 90,
    fontFamily: 'Poppins-900',
    color: '#535353',
    textAlign: 'center',
  },
  watchLearnTitleMobile: {
    fontSize: 32,
  },
  watchLearnTitleTablet: {
    fontSize: 60,
  },
  cardArrowBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 200,
    width: '100%',
    marginBottom: 20,
  },
  cardArrowBorderMobile: {
    marginRight: 0,
    marginBottom: 20,
    justifyContent: 'center',
  },
  cardArrowContainer: {
    flexDirection: 'row',
    gap: 10,
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
  cardArrowButtonMobile: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  cardsContainerBorder: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsContainerBorderMobile: {
    width: '100%',
  },
  cardsContainer: {
    width: '90%',
    overflow: 'hidden',
    height: 500,
    position: 'relative',
  },
  cardsContainerMobile: {
    width: '100%',
    height: 300,
  },
  cardsWrapper: {
    position: 'absolute',
    left: '50%',
    top: 0,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    height: 500,
    backgroundColor: '#4a4a4a',
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardMobile: {
    height: 300,
    borderRadius: 12,
  },
  cardTablet: {
    height: 400,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  watchLearnHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 80,
  },
  cardDashMobile: {
    width: 40,
    height: 4,
        borderRadius: 2,
  },
  activeCardDash: {
    backgroundColor: '#7C3AED',  
  },
  inactiveCardDash: {
    backgroundColor: '#ddd',
  },
  exploreMoreButton: {
    backgroundColor: '#5A32DA',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    margin: 40,
  },
  exploreMoreButtonMobile: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    margin: 30,
  },
  exploreMoreButtonTablet: {
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  exploreMoreText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Montserrat-900',
  },
  exploreMoreTextMobile: {
    fontSize: 14,
  },
  exploreMoreTextTablet: {
    fontSize: 16,
  },

  // Mobile Menu Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  fullScreenMenu: {
    flex: 1,
    backgroundColor: 'rgba(18, 21, 30, 0.98)',
  },
  menuContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuLogo: {
    width: 45,
    height: 45,
  },
  closeButton: {
    padding: 8,
  },
  menuItems: {
    flex: 1,
    paddingTop: 40,
    gap: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    gap: 16,
  },
  menuItemText: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat-500',
  },
  menuFooter: {
    paddingBottom: 40,
    gap: 20,
  },
  menuActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    gap: 20,
  },
  menuActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    gap: 10,
  },
  menuActionText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-500',
  },
  menuSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#72FFBA',
    borderRadius: 12,
    gap: 12,
  },
  menuSignInText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Montserrat-600',
  },
  menuSignInTextAuth: {
    color: '#000',
  },
});