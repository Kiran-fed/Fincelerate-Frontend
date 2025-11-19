import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import { ArrowRight, SquareArrowUpRight as ArrowUpRightFromSquare, ChevronDown, ChevronRight, Facebook, Instagram, LayoutDashboard, Lightbulb, Linkedin, Mail, Phone, PiggyBank, PilcrowRight, ShoppingCart, Twitter, Youtube, Menu, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Footer from './Footer';

const { width } = Dimensions.get('window');

const sections = [
  {
    id: 0,
    title: 'High Growth Horizons',
    description: 'Focused on capital appreciation across dynamic sectors and global opportunities.',
    categories: [
      {
        title: 'Growth Focus',
        description: 'Funds targeted to drive long-term capital appreciation.',
        icon: require('../assets/images/CuratedBasket/Growth_Focus.png'), 
        funds: [
          {
            name: 'ICICI Balanced Advantage Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'SBI Conservative Hybrid Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'ICICI Long Term Equity Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          }
        ]
      },
      {
        title: 'Sector Themes',
        description: 'Target high-growth sectors through thematic mutual funds.',
        icon: require('../assets/images/CuratedBasket/Sector_Themes.png'), 
        funds: [
          {
            name: 'ICICI Balanced Advantage Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'SBI Conservative Hybrid Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'ICICI Long Term Equity Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          }
        ]
      },
      {
        title: 'Global Exposure',
        description: 'Diversify globally by investing in international equity funds and offshore opportunities.',
        icon: require('../assets/images/CuratedBasket/Global_Exposure.png'), 
        funds: [
          {
            name: 'ICICI Balanced Advantage Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'SBI Conservative Hybrid Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'ICICI Long Term Equity Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          }
        ]
      }
    ]
  },
  {
    id: 1,
    title: 'Wealth Stability Suite',
    description: 'Curated for steady performance, low volatility, and long-term capital preservation.',
    categories: [
      {
        title: 'Stability Focus',
        description: 'Balanced and hybrid funds focused on reducing volatility while ensuring steady returns.',
        icon: require('../assets/images/CuratedBasket/Stability_Focus.png'),
        funds: [
          {
            name: 'ICICI Balanced Advantage Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'SBI Conservative Hybrid Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'ICICI Long Term Equity Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          }
        ]
      },
      {
        title: 'Index Simplicity',
        description: 'Invest passively through top-performing index funds tracking Nifty, Sensex, and other benchmarks.',
        icon: require('../assets/images/CuratedBasket/Index_Simplicity.png'),
        funds: [
          {
            name: 'ICICI Balanced Advantage Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'SBI Conservative Hybrid Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'ICICI Long Term Equity Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          }
        ]
      },
      {
        title: 'Wealth Preservation',
        description: 'Funds ideal for capital safety and short-term goals.',
        icon: require('../assets/images/CuratedBasket/Wealth_Preservation.png'),
        funds: [
          {
            name: 'ICICI Balanced Advantage Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'SBI Conservative Hybrid Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'ICICI Long Term Equity Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Start Smart Packs',
    description: 'Ideal for starting your investment journey with simplicity and confidence.',
    categories: [
      {
        title: '₹100 SIPs',
        description: 'Start building wealth with SIPs as low as ₹100 per month.',
        icon: require('../assets/images/CuratedBasket/SIPs.png'),
        funds: [
          {
            name: 'ICICI Balanced Advantage Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'SBI Conservative Hybrid Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'ICICI Long Term Equity Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          }
        ]
      },
      {
        title: 'Beginner friendly',
        description: 'Simple funds for first time mutual fund investors.',
        icon: require('../assets/images/CuratedBasket/Beginner_friendly.png'),
        funds: [
          {
            name: 'ICICI Balanced Advantage Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'SBI Conservative Hybrid Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'ICICI Long Term Equity Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          }
        ]
      },
      {
        title: '⁠Dividend/Income seekers',
        description: 'Generate regular income via IDCW or dividend-oriented fund strategies.',
        icon: require('../assets/images/CuratedBasket/Dividend_Seekers.png'),
        funds: [
          {
            name: 'ICICI Balanced Advantage Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'SBI Conservative Hybrid Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'ICICI Long Term Equity Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Strategic Core Portfolios',
    description: 'Diversified, disciplined and tax-efficient investments forming the foundation of any strong portfolio.',
    categories: [
      {
        title: 'Large cap leaders',
        description: "Invest in India's most reliable and time-tested large-cap companies.",
        icon: require('../assets/images/CuratedBasket/Large_Cap.png'),
        funds: [
          {
            name: 'ICICI Balanced Advantage Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'SBI Conservative Hybrid Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'ICICI Long Term Equity Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          }
        ]
      },
      {
        title: 'Tax Saving',
        description: 'Save taxes under 80C while growing wealth through top-rated ELSS funds.',
        icon: require('../assets/images/CuratedBasket/Tax_Saving.png'),
        funds: [
          {
            name: 'ICICI Balanced Advantage Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'SBI Conservative Hybrid Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'ICICI Long Term Equity Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          }
        ]
      },
      {
        title: 'Smart diversifiers',
        description: 'Multi-asset allocation funds balancing equity, debt, and gold for resilience across cycles.',
        icon: require('../assets/images/CuratedBasket/Smart_Diversifiers.png'),
        funds: [
          {
            name: 'ICICI Balanced Advantage Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'SBI Conservative Hybrid Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'ICICI Long Term Equity Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Life Goal Planners',
    description: 'Purpose-built portfolios for major life milestones like retirement and your child\'s education.',
    categories: [
      {
        title: 'Retirement planning funds',
        description: 'Funds structured to build your retirement corpus.',
        icon: require('../assets/images/CuratedBasket/Retirement_Funds.png'),
        funds: [
          {
            name: 'ICICI Balanced Advantage Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'SBI Conservative Hybrid Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'ICICI Long Term Equity Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          }
        ]
      },
      {
        title: 'Child education planning',
        description: 'Funds targeted to drive long-term capital appreciation.',
        icon: require('../assets/images/CuratedBasket/Child_Education.png'),
        funds: [
          {
            name: 'ICICI Balanced Advantage Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'SBI Conservative Hybrid Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          },
          {
            name: 'ICICI Long Term Equity Fund (G)',
            type: 'Option | Growth',
            nav: '₹143.55',
            navDate: 'As of May 2nd 2025',
            return: '46.28%',
            returnPeriod: 'Per Annum',
            returnType: '5Y return'
          }
        ]
      }
    ]
  }
];

const Headings = [
  'High Growth Horizons',
  'Wealth Stability Suite',
  'Start Smart Packs',
  'Strategic Core Portfolios',
  'Life Goal Planners',
];

export default function HomeScreen() {
  const [activeSection, setActiveSection] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [screenData, setScreenData] = useState(Dimensions.get('window'));
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollViewRef = useRef(null);
  const sectionRefs = useRef([]);

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

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    
    // Make header sticky when scrolled past initial position
    setIsSticky(scrollY > (isMobile ? 100 : 150));

    // Find which section is currently in view
    const scrollPosition = scrollY + (isMobile ? -400 : isTablet ? 620 : -620);
    
    for (let i = sections.length - 1; i >= 0; i--) {
      if (sectionRefs.current[i] && scrollPosition >= sectionRefs.current[i].offsetTop) {
        setActiveSection(i);
        break;
      }
    }
  };

  const scrollToSection = (sectionIndex) => {
    setActiveSection(sectionIndex);
    setMenuOpen(false);
    if (sectionRefs.current[sectionIndex] && scrollViewRef.current) {
      // Fixed scroll offset to properly show section headers
      const yOffset = sectionRefs.current[sectionIndex].offsetTop - (isMobile ? -450 : -700);
      scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
    }
  };

  const setSectionRef = (index, ref) => {
    sectionRefs.current[index] = ref;
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        <ImageBackground
          source={require('../assets/images/CuratedBasket/CuratedBG.jpg')} 
          style={[styles.background, isMobile && styles.backgroundMobile, isTablet && styles.backgroundTablet]}
          resizeMode="cover"
        >
          {/* Top Navbar */}
          <View style={[styles.navbarBorder, isMobile && styles.navbarBorderMobile, isTablet && styles.navbarBorderTablet]}>
            <View style={[styles.navbar, isMobile && styles.navbarMobile, isTablet && styles.navbarTablet]}>
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
                  <View style={[styles.navItems, isTablet && styles.navItemsTablet]}>
                    <Image
                      source={require('../assets/images/Fincelerate_Logo.png')}
                      style={[styles.navlogo, isTablet && styles.navlogoTablet]}
                      resizeMode="contain"
                    />
                    <TouchableOpacity style={styles.navItem}>
                      <LayoutDashboard color="white" size={isTablet ? 18 : 20} />
                      <Text style={[styles.navText, isTablet && styles.navTextTablet]}>Dashboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                      <PiggyBank color="white" size={isTablet ? 18 : 20} />
                      <Text style={[styles.navText, isTablet && styles.navTextTablet]}>Explore & Invest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                      <Lightbulb color="white" size={isTablet ? 18 : 20} />
                      <Text style={[styles.navText, isTablet && styles.navTextTablet]}>Educate Yourself</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.iconBorder, isTablet && styles.iconBorderTablet]}>
                    <TouchableOpacity style={[styles.icons, isTablet && styles.iconsTablet]}>
                      <Feather name="search" size={isTablet ? 22 : 25} color='#fff' />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconSpacing, isTablet && styles.iconSpacingTablet]}>
                      <Ionicons name="cart-outline" size={isTablet ? 22 : 25} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconUser, isTablet && styles.iconUserTablet]}>
                      <FontAwesome name="user-circle-o" size={isTablet ? 22 : 25} color="#fff" />
                      <Text style={[styles.signinText, isTablet && styles.signinTextTablet]}>Sign In</Text>
                      <ChevronDown color="white" size={isTablet ? 18 : 20} />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>

          {/* Hero Text Section */}
          <View style={[styles.hero, isMobile && styles.heroMobile, isTablet && styles.heroTablet]}>
            <Text style={[styles.heroTitle, isMobile && styles.heroTitleMobile, isTablet && styles.heroTitleTablet]}>
              Explore Fund Baskets Tailored To Your Goals
            </Text>
            <Text style={[styles.heroSubtitle, isMobile && styles.heroSubtitleMobile, isTablet && styles.heroSubtitleTablet]}>
              Curated collections to simplify investing. From ₹100 SIPs to global leaders, start where you are. Invest where you are.
            </Text>
          </View>
        </ImageBackground>

        {/* Section Navigation - Horizontal scroll for mobile */}
        <View style={[
          styles.options,
          isMobile && styles.optionsMobile,
          isTablet && styles.optionsTablet,
          isSticky && styles.optionsSticky
        ]}>
          {isMobile ? (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.mobileOptionsScrollView}
              contentContainerStyle={styles.mobileOptionsContent}
            >
              {Headings.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => scrollToSection(index)}
                  style={[
                    styles.optionButtonMobileHorizontal,
                    activeSection === index && styles.optionButtonActive
                  ]}
                >
                  <Text style={[
                    styles.optionTextMobileHorizontal,
                    activeSection === index && styles.optionTextActive
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            Headings.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => scrollToSection(index)}
                style={[
                  styles.optionButton,
                  activeSection === index && styles.optionButtonActive
                ]}
              >
                <Text style={[
                  styles.optionText,
                  isTablet && styles.optionTextTablet,
                  activeSection === index && styles.optionTextActive
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <View style={[styles.fundcontainer, isMobile && styles.fundcontainerMobile]}>
          {/* Sections Content */}
          {sections.map((section, sectionIndex) => {
              const backgroundColor = sectionIndex % 2 === 0 ? '#24273E' : '#12151E';
              return (
            <View 
              key={section.id} 
              style={[styles.sectionContainer, isMobile && styles.sectionContainerMobile, isTablet && styles.sectionContainerTablet, { backgroundColor } ]}
              ref={(ref) => setSectionRef(sectionIndex, ref)}
            >
              {/* Section Header */}
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile, isTablet && styles.sectionTitleTablet]}>
                  {section.title}
                </Text>
                <Text style={[styles.sectionDescription, isMobile && styles.sectionDescriptionMobile, isTablet && styles.sectionDescriptionTablet]}>
                  {section.description}
                </Text>
              </View>
              
              {/* Categories */}
              <View style={[styles.categoryCard, isMobile && styles.categoryCardMobile, isTablet && styles.categoryCardTablet]}>
                {section.categories.map((category, categoryIndex) => (
                  <View key={categoryIndex} style={[styles.categoryContainer, isMobile && styles.categoryContainerMobile, isTablet && styles.categoryContainerTablet]}>
                    {/* Category Header */}
                    <View style={[styles.categoryHeader, isMobile && styles.categoryHeaderMobile]}>
                      <View style={[styles.categoryTitleContainer, isMobile && styles.categoryTitleContainerMobile]}>
                        <Text style={[styles.categoryTitle, isMobile && styles.categoryTitleMobile, isTablet && styles.categoryTitleTablet]}>
                          {category.title}
                        </Text>
                        <Text style={[styles.categoryDescription, isMobile && styles.categoryDescriptionMobile, isTablet && styles.categoryDescriptionTablet]}>
                          {category.description}
                        </Text>
                      </View>
                      <View style={[styles.categoryIcon, isMobile && styles.categoryIconMobile, isTablet && styles.categoryIconTablet]}>
                        <Image
                          source={category.icon}
                          style={[styles.categoryIconImage, isMobile && styles.categoryIconImageMobile, isTablet && styles.categoryIconImageTablet]}
                          resizeMode="contain"
                        />
                      </View>
                    </View>

                    {/* Fund Cards */}
                    <View style={styles.fundsGrid}>
                      {category.funds.map((fund, fundIndex) => (
                        <View key={fundIndex} style={[styles.fundCard, isMobile && styles.fundCardMobile, isTablet && styles.fundCardTablet]}>
                          <View style={[styles.fundCardHeader, isMobile && styles.fundCardHeaderMobile]}>
                            <Text style={[styles.fundName, isMobile && styles.fundNameMobile, isTablet && styles.fundNameTablet]}>
                              {fund.name}
                            </Text>
                            <Text style={[styles.fundType, isMobile && styles.fundTypeMobile]}>
                              {fund.type}
                            </Text>
                          </View>
                          
                          <View style={[styles.fundCardMetrics, isMobile && styles.fundCardMetricsMobile]}>
                            <View style={[styles.metricItemLeft, isMobile && styles.metricItemLeftMobile]}>
                              <Text style={[styles.metricLabel, isMobile && styles.metricLabelMobile, isTablet && styles.metricLabelTablet]}>
                                NAV
                              </Text>
                              <Text style={[styles.metricValue, isMobile && styles.metricValueMobile]}>
                                {fund.nav}
                              </Text>
                              <Text style={[styles.metricDate, isMobile && styles.metricDateMobile]}>
                                {fund.navDate}
                              </Text>
                            </View>
                            
                            <View style={[styles.metricItemRight, isMobile && styles.metricItemRightMobile]}>
                              <Text style={[styles.metricLabel, isMobile && styles.metricLabelMobile, isTablet && styles.metricLabelTablet]}>
                                {fund.returnType}
                              </Text>
                              <Text style={[styles.metricValue, styles.returnValue, isMobile && styles.metricValueMobile]}>
                                {fund.return}
                              </Text>
                              <Text style={[styles.metricDate, isMobile && styles.metricDateMobile]}>
                                {fund.returnPeriod}
                              </Text>
                            </View>
                          </View>
                          
                          <TouchableOpacity style={[styles.investButton, isMobile && styles.investButtonMobile]}>
                            <Ionicons name="cart-outline" size={isMobile ? 18 : 25} color="#72FFBA" />
                          </TouchableOpacity>                       
                        </View>
                      ))}
                    </View>

                    {/* View More Button */}
                    <TouchableOpacity style={[styles.viewMoreButton, isMobile && styles.viewMoreButtonMobile]}>
                      <Text style={[styles.viewMoreText, isMobile && styles.viewMoreTextMobile]}>View More</Text>
                      <ChevronRight color="white" size={isMobile ? 18 : 24} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )})}
        </View>
        
        <ImageBackground
          source={require('../assets/images/CuratedBasket/CuratedBG.jpg')} 
          style={[styles.footerBackground, isMobile && styles.footerBackgroundMobile, isTablet && styles.footerBackgroundTablet]}
          resizeMode="cover"
        >
          <View style={[styles.investMoreLeft, isMobile && styles.investMoreLeftMobile, isTablet && styles.investMoreLeftTablet]}>
            <Image 
              source={require('../assets/images/CuratedBasket/FooterImage.png')}
              resizeMode="contain"
              style={styles.footerImage}
            />
          </View>
          <View style={[styles.investMoreRight, isMobile && styles.investMoreRightMobile, isTablet && styles.investMoreRightTablet]}>
            <Text style={[styles.investHeader, isMobile && styles.investHeaderMobile, isTablet && styles.investHeaderTablet]}>
              Build Your Own Investment Portfolio
            </Text>
            <Text style={[styles.investContent, isMobile && styles.investContentMobile, isTablet && styles.investContentTablet]}>
              Discover from 2000+ mutual funds. Compare, evaluate and build a strategy that fits your investment goals.
            </Text>
            <TouchableOpacity style={[styles.findMoreButton, isMobile && styles.findMoreButtonMobile, isTablet && styles.findMoreButtonTablet]}>
              <Text style={[styles.findMoreText, isMobile && styles.findMoreTextMobile, isTablet && styles.findMoreTextTablet]}>
                Find More to Invest
              </Text>
              <ArrowRight size={isMobile ? 18 : isTablet ? 22 : 28} color='#263238'/>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <Footer/>

      </ScrollView>

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
                      <Text style={styles.menuItemText}>Explore & Invest</Text>
                      <ChevronRight color="white" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                      <Lightbulb color="white" size={24} />
                      <Text style={styles.menuItemText}>Educate Yourself</Text>
                      <ChevronRight color="white" size={20} />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.menuFooter}>
                    <View style={styles.menuActions}>
                      <TouchableOpacity style={styles.menuActionButton}>
                        <Feather name="search" size={24} color='#fff' />
                        <Text style={styles.menuActionText}>Search</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.menuActionButton}>
                        <Ionicons name="cart-outline" size={24} color="#fff" />
                        <Text style={styles.menuActionText}>Cart</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.menuSignInButton} onPress={closeMenu}>
                      <FontAwesome name="user-circle-o" size={24} color="#fff" />
                      <Text style={styles.menuSignInText}>Sign In</Text>
                    </TouchableOpacity>
                  </View>
                </SafeAreaView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // Base Styles
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  background: {
    height: 650,
    width: '100%'
  },
  backgroundMobile: {
    height: 420,
  },
  backgroundTablet: {
    height: 500,
  },

  // Navbar Styles
  navbarBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    backgroundColor: 'rgba(14,15, 34, 0.36)'
  },
  navbarBorderMobile: {
    height: 80,
  },
  navbarBorderTablet: {
    height: 110,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    width: '95%'
  },
  navbarMobile: {
    padding: 8,
  },
  navbarTablet: {
    padding: 12,
  },
  navlogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  navlogoMobile: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  navlogoTablet: {
    width: 50,
    height: 50,
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 50,
    width: '50%'
  },
  navItemsTablet: {
    gap: 30,
    width: '60%',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-500',
  },
  navTextTablet: {
    fontSize: 16,
  },
  iconBorder: {
    flexDirection: 'row',
    gap: 16,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconBorderTablet: {
    gap: 12,
    width: '25%',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 58,
    width: 58,
    borderRadius: 10,
    backgroundColor: '#151515',
  },
  iconsTablet: {
    height: 50,
    width: 50,
  },
  iconSpacing: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 58,
    width: 58,
    borderRadius: 25,
    backgroundColor: '#2D3439',
  },
  iconSpacingTablet: {
    height: 50,
    width: 50,
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
    fontSize: 18,
  },
  signinTextTablet: {
    fontSize: 14,
  },

  // Mobile Menu Styles
  mobileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  menuButton: {
    padding: 8,
  },
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

  // Hero Styles
  hero: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 500,
    paddingHorizontal: 20,
  },
  heroMobile: {
    height: 320,
  },
  heroTablet: {
    height: 380,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 48,
    fontFamily: 'Montserrat-900',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heroTitleMobile: {
    fontSize: 26,
  },
  heroTitleTablet: {
    fontSize: 36,
  },
  heroSubtitle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Poppins-400',
    marginTop: 12,
    textAlign: 'center',
    maxWidth: 800,
  },
  heroSubtitleMobile: {
    fontSize: 15,
    lineHeight: 22,
  },
  heroSubtitleTablet: {
    fontSize: 18,
  },

  // Options Styles
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#12151E',
    height: 150,
    paddingHorizontal: 20,
  },
  optionsMobile: {
    height: 80,
    paddingHorizontal: 0,
  },
  optionsTablet: {
    height: 120,
  },
  optionsSticky: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  mobileOptionsScrollView: {
    flex: 1,
  },
  mobileOptionsContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  optionButton: {
    padding: 12,
    borderRadius: 12,
  },
  optionButtonMobileHorizontal: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    minWidth: 120,
  },
  optionButtonActive: {
    backgroundColor: 'rgba(114, 255, 186, 0.2)',
  },
  optionText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-600',
    textAlign: 'center',
  },
  optionTextMobileHorizontal: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat-600',
    textAlign: 'center',
  },
  optionTextTablet: {
    fontSize: 18,
  },
  optionTextActive: {
    color: '#72FFBA',
    fontFamily: 'Montserrat-700',
  },

  // Fund Container Styles
  fundcontainer: {
    // padding: 20,
    backgroundColor: '#24273E',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fundcontainerMobile: {
    // padding: 16,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 20,
    width: '100%',
  },
  sectionContainerMobile: {
    paddingHorizontal: 10,
    paddingTop: 60,
    width: '100%',
  },
  sectionContainerTablet: {
    paddingTop: 75,
  },
  sectionHeader: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 48,
    fontFamily: 'Montserrat-800',
    color: '#fff',
    marginBottom: 16,
  },
  sectionTitleMobile: {
    fontSize: 24,
    textAlign: 'center',
  },
  sectionTitleTablet: {
    fontSize: 36,
  },
  sectionDescription: {
    marginBottom: 20,
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Montserrat-400',
  },
  sectionDescriptionMobile: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionDescriptionTablet: {
    fontSize: 20,
  },

  // Category Styles - FIXED FOR RESPONSIVE DESIGN
  categoryCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 60,
    borderRadius: 20,
  },
  categoryCardMobile: {
    flexDirection: 'column',
    gap: 25,
    alignItems: 'center',
  },
  categoryCardTablet: {
    flexDirection: 'column', // Changed to column for tablet to show 1 card
    gap: 40,
    alignItems: 'center',
  },
  categoryContainer: {
    marginBottom: 50,
    padding: 40,
    width: '45%',
    minHeight: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    // categoryContainerDesktop: {
    //   width: '48%',
    // },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
    borderRadius: 30,
    backgroundColor: '#1D1F34',
  },
  categoryContainerMobile: {
    padding: 20,
    width: '95%', // 1 card for mobile
    marginBottom: 25,
    minHeight: 'auto',
  },
  categoryContainerTablet: {
    padding: 30,
    width: '95%', // 1 card for tablet (changed from 45% to 95%)
  },
  categoryHeader: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  categoryHeaderMobile: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  categoryTitleContainer: {
    flex: 1,
  },
  categoryTitleContainerMobile: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 28,
    fontFamily: 'Montserrat-600',
    color: 'white',
    marginBottom: 12,
  },
  categoryTitleMobile: {
    fontSize: 18,
  },
  categoryTitleTablet: {
    fontSize: 24,
  },
  categoryDescription: {
    fontSize: 16,
    fontFamily: 'Poppins-400',
    color: '#B8B8B8',
    lineHeight: 24,
  },
  categoryDescriptionMobile: {
    fontSize: 12,
    lineHeight: 18,
  },
  categoryDescriptionTablet: {
    fontSize: 14,
  },
  categoryIcon: {
    height: 80,
    width: 80,
    backgroundColor: '#24273E',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIconMobile: {
    height: 60,
    width: 60,
  },
  categoryIconTablet: {
    height: 70,
    width: 70,
  },
  categoryIconImage: {
    width: 50,
    height: 40,
  },
  categoryIconImageMobile: {
    width: 35,
    height: 28,
  },
  categoryIconImageTablet: {
    width: 45,
    height: 36,
  },

  // Fund Card Styles
  fundsGrid: {
    gap: 16,
    marginBottom: 30,
  },
  fundCard: {
    backgroundColor: '#24273E',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  fundCardMobile: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fundCardTablet: {
    padding: 18,
  },
  fundCardHeader: {
    flex: 2,
    paddingRight: 16,
  },
  fundCardHeaderMobile: {
    flex: 2,
    paddingRight: 12,
  },
  fundName: {
    fontSize: 16,
    fontFamily: 'Montserrat-600',
    textDecorationLine: 'underline',
    color: 'white',
    marginBottom: 6,
    lineHeight: 22,
  },
  fundNameMobile: {
    fontSize: 12,
    lineHeight: 16,
  },
  fundNameTablet: {
    fontSize: 14,
  },
  fundType: {
    fontSize: 11,
    fontFamily: 'Poppins-400',
    color: '#14FFF6',
  },
  fundTypeMobile: {
    fontSize: 9,
  },
  fundCardMetrics: {
    flexDirection: 'row',
    flex: 3,
    alignItems: 'center',
  },
  fundCardMetricsMobile: {
    flex: 3,
  },
  metricItemLeft: {
    flex: 1,
    paddingRight: 16,
  },
  metricItemLeftMobile: {
    flex: 1,
    paddingRight: 12,
  },
  metricItemRight: {
    flex: 1,
    borderLeftColor: '#FFE9A02B',
    borderLeftWidth: 0.5,
    paddingLeft: 16,
  },
  metricItemRightMobile: {
    flex: 1,
    borderLeftColor: '#FFE9A02B',
    borderLeftWidth: 0.5,
    paddingLeft: 12,
  },
  metricLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-500',
    color: '#E8EAED',
    marginBottom: 4,
  },
  metricLabelMobile: {
    fontSize: 10,
  },
  metricLabelTablet: {
    fontSize: 11,
  },
  metricValue: {
    fontSize: 14,
    fontFamily: 'Poppins-700',
    color: '#12DE00',
    marginBottom: 2,
  },
  metricValueMobile: {
    fontSize: 12,
  },
  metricDate: {
    fontSize: 10,
    fontFamily: 'Poppins-300',
    color: '#B8B8B8',
  },
  metricDateMobile: {
    fontSize: 8,
  },
  returnValue: {},
  investButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#72FFBA',
    borderWidth: 1,
    backgroundColor: '#272E33',
    marginLeft: 12,
  },
  investButtonMobile: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 8,
  },
  viewMoreButton: {
    borderWidth: 1,
    borderColor: '#CDC4FD',
    borderRadius: 25,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191B1E',
    gap: 8,
  },
  viewMoreButtonMobile: {
    paddingVertical: 12,
  },
  viewMoreText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat-600',
  },
  viewMoreTextMobile: {
    fontSize: 14,
  },

  // Footer Background Styles
  footerBackground: {
    height: 600,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerBackgroundMobile: {
    height: 'auto',
    flexDirection: 'column',
    paddingVertical: 40,
  },
  footerBackgroundTablet: {
    height: 500,
  },
  investMoreLeft: {
    height: 580,
    width: '45%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  investMoreLeftMobile: {
    height: 200,
    width: '90%',
    marginBottom: 30,
  },
  investMoreLeftTablet: {
    height: 400,
  },
  footerImage: {
    width: '100%',
    height: '100%'
  },
  investMoreRight: {
    height: 580,
    width: '55%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  investMoreRightMobile: {
    height: 'auto',
    width: '90%',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  investMoreRightTablet: {
    height: 400,
    width: '55%',
  },
  investHeader: {
    fontFamily: 'Montserrat-900',
    fontSize: 42,
    lineHeight: 50,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  investHeaderMobile: {
    fontSize: 22,
    lineHeight: 28,
  },
  investHeaderTablet: {
    fontSize: 32,
    lineHeight: 40,
  },
  investContent: {
    fontFamily: 'Poppins-400',
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 26,
  },
  investContentMobile: {
    fontSize: 14,
    marginBottom: 30,
    lineHeight: 20,
  },
  investContentTablet: {
    fontSize: 16,
    lineHeight: 24,
  },
  findMoreButton: {
    height: 80,
    paddingHorizontal: 40,
    borderRadius: 15,
    backgroundColor: '#CDC4FD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  findMoreButtonMobile: {
    height: 55,
    paddingHorizontal: 25,
    gap: 10,
  },
  findMoreButtonTablet: {
    height: 70,
    paddingHorizontal: 35,
  },
  findMoreText: {
    fontFamily: 'Montserrat-700',
    fontSize: 20,
    color: '#263238'
  },
  findMoreTextMobile: {
    fontSize: 14,
  },
  findMoreTextTablet: {
    fontSize: 17,
  },

});


