
import { Feather, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, CalendarDays, ChevronDown, ChevronRight, Lightbulb, Menu, NotebookTextIcon, Phone, PiggyBank, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { MdPictureAsPdf } from "react-icons/md";
import Footer from './Footer';


const { width } = Dimensions.get('window');

const equityCategories = [
    'Multi Cap Fund',
    'Large Cap Fund',
    'Large & Mid Cap Fund',
    'Mid Cap Fund',
    'Small Cap Fund',
    'ELSS',
    'Dividend Yield Fund',
    'Sectoral/Thematic',
    'Contra Fund',
    'Focused Fund',
    'Value Fund',
    'Flexi Cap Fund',
];

const hybridCategories = [
  'Aggressive Hybrid Fund',
  'Conservative Hybrid Fund',
  'Arbitrage Fund',
  'Equity Savings',
  'Dynamic Asset Allocation or Balanced Advantage',
  'Multi Asset Allocation',
];

const debtCategories = [
    'Low Duration Fund',
    'Short Duration Fund',
    'Medium Duration Fund',
    'Medium to Long Duration Fund',
    'Long Duration Fund',
    'Dynamic Bond Fund',
    'Gilt Fund',
    'Gilt Fund with 10 Year Constant Duration',
    'Corporate Bond Fund',
    'Credit Risk Fund',
    'Floater Fund',
    'Banking and PSU Fund',
    'Fixed Maturity Plans - Debt',
    'Interval Plans',
    'Ultra Short Duration Fund',
    'Liquid Fund',
    'Money Market Fund',
    'Overnight Fund',
    'Target Maturity Fund',
];

const solutionOrientedCategories = [
  "Childrens Fund",
    'Retirement Fund',
    'Investment cum Insurance',

];

const fundsOfFundsCategories = [
  'Domestic - Equity',
  'Income Plus Arbitrage',
  'Domestic - Hybrid',
  'Domestic - Gold',
  'Domestic - Silver',
  'Domestic - Debt',
  'Domestic - Gold and Silver',
];

const nfoCategories = [
  'Axis Mutual Fund',
  'Bandhan Mutual Fund',
  'Baroda BNP Paribas Mutual Fund',
  'Edelweiss Mutual Fund',
  'Flexi Cap',
  'HDFC Mutual Fund',
  'Kotak Mutual Fund',
  'LIC Mutual Fund',
  'Mid Cap Fund',
  'Multi Cap Fund',
  'Value Fund',
];

export default function ExploreFunds() {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));
  const [menuOpen, setMenuOpen] = useState(false);
  const [mainTab, setMainTab] = useState('ALL_FUNDS');
  const [categoryTab, setCategoryTab] = useState('Equity');
  const [selectedItem, setSelectedItem] = useState('ELSS');

  useEffect(() => {
    const onChange = (result) => {
      setScreenData(result.window);
    };
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    if (mainTab === 'ALL_FUNDS') {
      if (categoryTab === 'Equity') {
        setSelectedItem('Multi Cap Fund');
      } else if (categoryTab === 'Hybrid') {
        setSelectedItem('Aggressive Hybrid Fund');
      } else if (categoryTab === 'Debt') {
        setSelectedItem('Low Duration Fund');
      } else if (categoryTab === 'Solution Oriented') {
        setSelectedItem('Childrens Fund');
      } else if (categoryTab === 'Funds of Funds') {
        setSelectedItem('Domestic - Equity');
      }
    } else if (mainTab === 'NFO') {
      setSelectedItem('Axis Mutual Fund');
    }
  }, [mainTab, categoryTab]);
  
const isMobile = screenData.width < 600;
const isTablet = screenData.width >= 600 && screenData.width < 1024;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const getCategoriesForTab = () => {
    switch (categoryTab) {
      case 'Equity':
        return equityCategories;
      case 'Hybrid':
        return hybridCategories;
      case 'Debt':
        return debtCategories;
      case 'Solution Oriented':
        return solutionOrientedCategories;
      case 'Funds of Funds':
        return fundsOfFundsCategories;
      default:
        return equityCategories;
    }
  };

  const renderCategoryTabs = () => {
    if (mainTab !== 'ALL_FUNDS') return null;

    const tabs = ['Equity', 'Hybrid', 'Debt', 'Solution Oriented', 'Funds of Funds'];

    return (
      <View style={[styles.categoryTabsContainer, isMobile && styles.categoryTabsContainerMobile, isTablet && styles.categoryTabsContainerTablet]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryTabsScroll}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.categoryTab,
                categoryTab === tab && styles.categoryTabActive,
                isMobile && styles.categoryTabMobile,
                isTablet && styles.categoryTabTablet,
              ]}
              onPress={() => setCategoryTab(tab)}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  categoryTab === tab && styles.categoryTabTextActive,
                  isMobile && styles.categoryTabTextMobile,
                  isTablet && styles.categoryTabTextTablet,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderItemsList = () => {
    const categories = mainTab === 'NFO' ? nfoCategories : getCategoriesForTab();

    return (
      <View style={[styles.itemsListContainer, isMobile && styles.itemsListContainerMobile]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.itemsListTitle, isMobile && styles.itemsListTitleMobile]}>
            {mainTab === 'NFO' ? 'NFO' : categoryTab === 'Equity' ? 'ETF or Index' : categoryTab}
          </Text>
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.itemListItem,
                selectedItem === item && styles.itemListItemActive,
                isMobile && styles.itemListItemMobile,
              ]}
              onPress={() => setSelectedItem(item)}
            >
              <Text
                style={[
                  styles.itemListItemText,
                  selectedItem === item && styles.itemListItemTextActive,
                  isMobile && styles.itemListItemMobile,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderContentArea = () => {
    return (
      <View style={[styles.contentArea, isMobile && styles.contentAreaMobile]}>
        <View style={styles.contentPlaceholder}>
          <Text style={[styles.contentText, isMobile && styles.contentTextMobile]}>
            {selectedItem} Content Appears Here

          </Text>
        </View>
      </View>
    );
  };

const renderContentAreaNFO = () => (
    <View style={[styles.contentArea, isMobile && styles.contentAreaMobile]}>
      {/* Title + Buttons */}
      <View style={styles.schemaTopBorder}>
        <View style={styles.schemaLeftBorder}>
          <View style={[styles.schemaLogo, isMobile && { width: 50, height: 50 }]}>
            {/* Logo placeholder */}
          </View>
          <View style={styles.schemeHeader}>
            <Text style={[styles.schemeTitle, isMobile && { fontSize: 22, lineHeight: 28 }]}>
              Axis Nifty 500 Momentum Index Fund(G)
            </Text>
            <Text style={[styles.schemeTagText, isMobile && { fontSize: 16 }]}>
              New Fund Offer
            </Text>
          </View>
        </View>

        <View style={[styles.schemeTags, isMobile && { flexDirection: 'column', gap: 10, alignItems: 'flex-start' }]}>
          <TouchableOpacity style={[styles.schemeButton, isMobile && { paddingHorizontal: 12 }]}>
            <Phone color="#ffffff" size={isMobile ? 18 : 20} />
            <Text style={[styles.schemeButtonText, isMobile && { fontSize: 14 }]}>
              Book An Appointment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.schemeButtonSecondary, isMobile && { paddingHorizontal: 16 }]}>
            <Text style={[styles.schemeButtonSecondaryText, isMobile && { fontSize: 14 }]}>
              Invest
            </Text>
            <ArrowRight color="#73FFBA" size={isMobile ? 20 : 24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* NFO Period */}
      <View style={[styles.nfoCard, isMobile && { flexDirection: 'column', alignItems: 'flex-start', gap: 8 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CalendarDays color="#14FFF6" size={isMobile ? 22 : 28} />
          <Text style={[styles.nfoCardTitle, isMobile && { fontSize: 18 }]}> NFO Period : </Text>
        </View>
        <Text style={[styles.nfoCardTitleDate, isMobile && { fontSize: 18 }]}>
          12th June 2024 to 26th June 2024
        </Text>
      </View>

      {/* Objective */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isMobile && { fontSize: 22 }]}>Objective of Scheme</Text>
        <Text style={[styles.sectionText, isMobile && { fontSize: 16, lineHeight: 24 }]}>
          To provide returns before expenses that correspond to the Nifty500 Momentum 50 TRI
          subject to tracking errors. There is no assurance that the investment objective of the
          scheme will be achieved.
        </Text>
      </View>

      {/* Scheme Details */}
      <View style={styles.detailsBox}>
        <Text style={[styles.detailsHeading, isMobile && { fontSize: 20 }]}>
          <NotebookTextIcon color="#14FFF6" size={isMobile ? 22 : 26} /> Scheme Details
        </Text>
        <Text style={[styles.detailsLine, isMobile && { fontSize: 16 }]}>
          <Text style={styles.detailsLabel}>Type: </Text>Open Ended &nbsp;|&nbsp;
          <Text style={styles.detailsLabel}>Category: </Text>Other Scheme – Other ETFs
        </Text>
        <View style={styles.divider} />
        <Text style={[styles.detailsSubHeading, isMobile && { fontSize: 18 }]}>Minimum Subscription Amount</Text>
        <Text style={[styles.greenText, isMobile && { fontSize: 17 }]}>
          <Text style={styles.greenTextcolor}>Rs. 1000/</Text> - and in multiples of Re. 1/- thereafter
        </Text>
        <View style={styles.divider} />
        <Text style={[styles.detailsSubHeading, isMobile && { fontSize: 18 }]}>Exit Load</Text>
        <Text style={[styles.detailsBullet, isMobile && { fontSize: 16 }]}>
          1) If redeemed within <Text style={styles.blueText}>15 days</Text>: <Text style={styles.blueText}>0.25%</Text>
        </Text>
        <Text style={[styles.detailsBullet, isMobile && { fontSize: 16 }]}>
          2) If redeemed after <Text style={styles.blueText}>15 days</Text>: <Text style={styles.blueText}>Nil</Text>
        </Text>
      </View>

      {/* Helpful Resources */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isMobile && { fontSize: 22 }]}>Helpful Resources</Text>
            <Text style={[styles.videoText, isMobile && { fontSize: 16 }]}>Watch a video here to learn more about this scheme</Text>
        <View style={[styles.resourceWrapper, isMobile && styles.resourceWrapperMobile, isTablet && styles.resourceWrapperTablet ]}>
          <View style={styles.videoCard}>
            <View style={[styles.videoImage, isMobile ? { width: '100%', height: 200 } : { width: 400, height: 300 }]}>
              <Image
                source={require('../assets/images/Fincelerate_Logo.png')}
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
              />
            </View>
          </View>

          <View style={[styles.resourceLinks, isMobile && { gap: 16 }]}>
            {['Key Information Memorandum', 'Scheme Information Document', 'Statement of Additional Information'].map((doc) => (
              <TouchableOpacity key={doc} style={styles.resourceLinkItem}>
                <MdPictureAsPdf color="#E6E6E6" size={isMobile ? 26 : 30} />
                <Text style={[styles.resourceLinkText, isMobile && { fontSize: 18 }]}>{doc}</Text>
                <ArrowRight color="#FFE489" size={isMobile ? 26 : 30} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
       <ImageBackground
          source={require('../assets/images/CuratedBasket/CuratedBG.jpg')}
          style={[styles.background, { height: isMobile ? 500 : isTablet ? 600 : 670 }]}
          resizeMode="cover"
        >
          <View style={[styles.navbarBorder, isMobile && styles.navbarBorderMobile, isTablet && styles.navbarBorderTablet]}>
            <View style={[styles.navbar, isMobile && styles.navbarMobile, isTablet && styles.navbarTablet]}>
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
                <>
                  <View style={[styles.navItems, isTablet && styles.navItemsTablet]}>
                    <Image
                      source={require('../assets/images/Fincelerate_Logo.png')}
                      style={[styles.navlogo, isTablet && styles.navlogoTablet]}
                      resizeMode="contain"
                    />
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
                      <Feather name="search" size={isTablet ? 22 : 25} color="#fff" />
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

          <View style={[styles.hero, isMobile && styles.heroMobile, isTablet && styles.heroTablet]}>
            <Text style={[styles.heroTitle, isMobile && styles.heroTitleMobile, isTablet && styles.heroTitleTablet]}>
              Explore Funds
            </Text>
            <Text style={[styles.heroSubtitle, isMobile && styles.heroSubtitleMobile, isTablet && styles.heroSubtitleTablet]}>
              Browse investment options designed to align with your goals. <br/>
              Discover funds across categories and make informed decisions with ease. <br/>
              With SIP or Lumpsum Calculator for tailored investments options.
            </Text>
          </View>


          <View style={[styles.mainTabsContainer, isMobile && styles.mainTabsContainerMobile, isTablet && styles.mainTabsContainerTablet]}>
            <TouchableOpacity
              style={[styles.mainTab, mainTab === 'ALL_FUNDS' && styles.mainTabActive ]}
              onPress={() => setMainTab('ALL_FUNDS')}
            >
              <Text style={[styles.mainTabText, mainTab === 'ALL_FUNDS' && styles.mainTabTextActive, isMobile && { fontSize: 18 }, isTablet && { fontSize: 28 }]}>
                All Funds
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mainTab, mainTab === 'NFO' && styles.mainTabActive]}
              onPress={() => setMainTab('NFO')}
            >
              <Text style={[styles.mainTabText, mainTab === 'NFO' && styles.mainTabTextActive, isMobile && { fontSize: 18 }, isTablet && { fontSize: 28 }]}>
                NFO
              </Text>
            </TouchableOpacity>
          </View>

          {renderCategoryTabs()}

        </ImageBackground>

        <LinearGradient colors={['#1A1D34', '#15191C']} style={styles.contentWrapper}>
          {renderItemsList()}
          {mainTab === 'ALL_FUNDS' ? renderContentArea() : renderContentAreaNFO()}
        </LinearGradient>

        <Footer />
      </ScrollView>

      
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
                    <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
                      <X color="white" size={28} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.menuItems}>
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
                        <Feather name="search" size={24} color="#fff" />
                        <Text style={styles.menuActionText}>Search</Text>
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
  schemaTopBorder:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  schemaLeftBorder: {
     display: 'flex',
    flexDirection: 'row',
    gap:20,
    flexWrap: 'wrap',
  },
  schemaLogo:{
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#4A4A4A6B',
  },
  schemeHeader: {
    marginBottom: 20,
    flexDirection: 'column',
    gap: 10,
    flexWrap: 'wrap',
  },
  schemeTitle: {
    color: '#E6E6E6',
    fontSize: 28,
    fontFamily: 'Poppins-800',
  },
  schemeTags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
 
  schemeTagText: {
    color: '#E6E6E6',
    fontSize: 18,
    fontFamily: 'Poppins-400',
  },
  schemeButton: {
    borderColor: '#B996FF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  schemeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-600',
  },
  schemeButtonSecondary: {
    borderColor: '#72FFBA',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
     display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  schemeButtonSecondaryText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-600',
  },

  nfoCard: {
    marginTop: 10,
    // padding: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  nfoCardTitle: {
    color: '#14FFF6',
    fontSize: 24,
    fontFamily: 'Poppins-500',
  },
nfoCardTitleDate: {
    color: '#14FFF6',
       fontSize: 24,
    fontFamily: 'Poppins-800',
},
  section: {
    marginTop: 35,
  },
  sectionTitle: {
    color: '#E6E6E6',
    fontSize: 28,
    fontFamily: 'Poppins-600',
    marginBottom: 14,
  },
  sectionText: {
    color: '#E6E6E6',
    fontSize: 18,
    fontFamily: 'Poppins-300',
    lineHeight: 22,
  },

  detailsBox: {
    marginTop: 20,
    backgroundColor: '#101222',
    padding: 20,
    borderRadius: 12,
    gap: 10,
  },
  detailsHeading: {
    color: '#E6E6E6',
    fontSize: 23,
    fontFamily: 'Poppins-600',
    marginBottom: 10,
  },
  detailsLine: {
    color: '#E6E6E6',
    fontSize: 20,
    fontFamily: 'Poppins-400',
  },
  detailsLabel: {
    // color: '#aaa',
    fontFamily: 'Poppins-500',
  },
  detailsSubHeading: {
    color: '#E6E6E6',
    fontSize: 24,
    fontFamily: 'Poppins-300',
    marginTop: 4,
  },
  greenText: {
    color: '#E6E6E6',
    fontSize: 20,
    fontFamily: 'Poppins-800',
  },
  greenTextcolor:{
    color: '#00FF3B',
  },
  blueText: {
    color: '#14FFF6',
    fontSize: 20,
    fontFamily: 'Poppins-700',
  },
  detailsBullet: {
    color: '#E6E6E6',
     fontSize: 20,
    fontFamily: 'Poppins-300',
    marginTop: 6,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#72727270',
    marginVertical: 10,
  },
resourceWrapper: {
    flexDirection: 'row',
    gap: 60,
    marginTop: 20,
    alignItems: 'flex-start',
     flexWrap: 'wrap', 
  },
  resourceWrapperMobile: {
    flexDirection: 'column',
    gap: 32,
  },
   resourceWrapperTablet: {
    flexDirection: 'column',
    gap: 32,
  },
   
  videoCard: {
    overflow: 'hidden',
    gap: 40,
    width: '45%',
  },
videoImage: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1E223D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    fontFamily: 'Poppins-600',
    fontSize: 18,
    color: '#14FFF6',
  },
  resourceLinks: {
    flex: 1,
    justifyContent: 'space-between',
     flexWrap: 'wrap', 
     width:'45%',
  },
  resourceLinkItem: {
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
        //  flexWrap: 'wrap', 
  },
  resourceLinkText: {
    color: '#FFE489',
    fontSize: 24,
    fontFamily: 'Poppins-400',
    textDecorationLine: 'underline',
        //  flexWrap: 'wrap', 

  },


  
  container: {
    flex: 1,
    // backgroundColor: '#0A0B1E',
  },
  scrollView: {
    flex: 1,
  },
  background: {
    width: '100%',
    flexDirection: 'column',
    // alignItems: 'center', 
    justifyContent: 'space-between',
  },
  navbarBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    backgroundColor: 'rgba(14,15, 34, 0.36)',
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
    width: '95%',
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
    width: '50%',
  },
  navItemsTablet: {
    gap: 20,
    width: '60%',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Montserrat-600',
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
    fontSize: 18,
    fontFamily: 'Poppins-500',
  },
  signinTextTablet: {
    fontSize: 14,
  },
  mobileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  menuButton: {
    padding: 8,
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    paddingHorizontal: 20,
  },
  heroMobile: {
    marginTop: 10,
  },
  heroTablet: {
    marginTop: 35,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 48,
    fontFamily: 'Montserrat-900',
    textAlign: 'center',
    marginBottom: 10,
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
    fontFamily: 'Poppins-500',
    marginTop: 20,
    textAlign: 'center',
    // maxWidth: 800,
  },
  heroSubtitleMobile: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },
  heroSubtitleTablet: {
    fontSize: 18,
  },
  mainTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    gap: 300,    
  },
  mainTabsContainerMobile: {
    paddingVertical: 20,
    gap: 50,
  },
  mainTabsContainerTablet: {
    gap: 100,
  },  
  mainTab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 2,
  },
  mainTabMobile: {
    paddingVertical: 5,
    fontSize: 16,
    paddingHorizontal: 25,
  },
  mainTabActive: {
    borderBottomWidth: 5,
    borderBottomColor: '#FFE489',
  },
  mainTabText: {
    color: '#ffffff',
    fontSize: 38,
    fontFamily: 'Montserrat-500',
  },
  mainTabTextActive: {
    color: '#FFE489',
    fontFamily: 'Montserrat-700',
  },
  categoryTabsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: '#03030538',
    height: 104,
  },
  categoryTabsContainerMobile: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  categoryTabsContainerTablet: {
       paddingVertical: 10,
    paddingHorizontal: 20,
  },
  categoryTabsScroll: {
    // gap: 15,
    paddingHorizontal: 10,
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  categoryTabMobile: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  categoryTabTablet: {
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  categoryTabActive: {
    backgroundColor: '#5E17EB',
  },
  categoryTabText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Montserrat-400',
  },
  categoryTabTextMobile: {
    fontSize: 12,
  },
  categoryTabTextTablet: {
    fontSize: 16,
  },
  categoryTabTextActive: {
    color: '#fff',
    fontFamily: 'Montserrat-700',
  },
  contentWrapper: {
   flexDirection: 'row',
    paddingHorizontal: 40,
    paddingVertical: 40,
    gap: 30,
    minHeight: 800,
  },
  contentWrapperMobile: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 20,
  },
  itemsListContainer: {
    width: '25%',
    height: 1287,
    backgroundColor: '#12151E',
    borderRadius: 12,
    padding: 20,
    maxHeight: 600,
  },
  itemsListContainerMobile: {
    width: '100%',
    maxHeight: 300,
    padding: 15,

  },
  itemsListTitle: {
    color: '#0FFFF6',
    fontSize: 18,
    fontFamily: 'Montserrat-700',
    marginBottom: 20,
    paddingVertical: 1,
    paddingHorizontal: 6,
    textDecorationLine: 'underline',
    borderLeftWidth: 2,
    borderLeftColor: '#0FFFF6',
  },
  itemsListTitleMobile: {
    fontSize: 16,
    marginBottom: 15,
  },
  itemListItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  itemListItemMobile: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  itemListItemActive: {
    backgroundColor: '#0ffff71c',
    borderLeftWidth: 3,
    borderLeftColor: '#0FFFF6',
  },
  itemListItemText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Montserrat-400',
  },
  itemListItemTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  contentArea: {
    flex: 1,
    // backgroundColor: '#151629',
    borderRadius: 12,
    padding: 40,

  },
  contentAreaMobile: {
    width: '100%',
    minHeight: 400,
    padding: 20,
  },
  contentPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  contentTextMobile: {
    fontSize: 18,
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
    fontWeight: '600',
  },
});
