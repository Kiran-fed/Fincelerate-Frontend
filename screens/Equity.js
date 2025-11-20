
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Lightbulb,
  Menu,
  PiggyBank,
  X,
} from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { PieChartPro } from 'react-native-gifted-charts';

import Footer from './Footer';

export default function Equity() {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollViewRef = useRef(null);
  const sectionRefs = useRef([]);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const onChange = (result) => {
      setScreenData(result.window);
    };
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  const isMobile = screenData.width < 600;
  const isTablet = screenData.width >= 600 && screenData.width < 1024;

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // Make header sticky when scrolled past initial position
    setIsSticky(scrollY > (isMobile ? 100 : 150));

    // Find which section is currently in view
    const scrollPosition = scrollY + (isMobile ? -400 : isTablet ? 620 : -620);

    for (let i = sectionRefs.length - 1; i >= 0; i--) {
      if (
        sectionRefs.current[i] &&
        scrollPosition >= sectionRefs.current[i].offsetTop
      ) {
        setActiveSection(i);
        break;
      }
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const ReturnsTable = () => {
    const [activeTab, setActiveTab] = useState('Lumpsum');

    const tableData = [
      {
        time: '1 Week',
        absolute: '10227.10',
        annual: '0.68%',
        avg: '0.68%',
        bench: '0.68%',
      },
      {
        time: '1 Month',
        absolute: '10227.10',
        annual: '0.68%',
        avg: '0.65%',
        bench: '0.68%',
      },
      {
        time: '3 Month',
        absolute: '10227.10',
        annual: '0.68%',
        avg: '0.68%',
        bench: '0.68%',
      },
      {
        time: '6 Month',
        absolute: '10227.10',
        annual: '0.65%',
        avg: '0.68%',
        bench: '0.68%',
      },
      {
        time: '1 Year',
        absolute: '10227.10',
        annual: '0.68%',
        avg: '0.68%',
        bench: '0.68%',
      },
      {
        time: 'YTD',
        absolute: '10227.10',
        annual: '0.68%',
        avg: '0.68%',
        bench: '0.68%',
      },
      {
        time: '3 Years',
        absolute: '10227.10',
        annual: '0.65%',
        avg: '0.65%',
        bench: '0.65%',
      },
      {
        time: '5 Years',
        absolute: '10227.10',
        annual: '0.68%',
        avg: '0.68%',
        bench: '0.68%',
      },
      {
        time: '10 Years',
        absolute: '10227.10',
        annual: '0.68%',
        avg: '0.68%',
        bench: '0.68%',
      },
      {
        time: 'Since inception',
        absolute: '10227.10',
        annual: '0.68%',
        avg: '0.68%',
        bench: '0.68%',
      },
    ];

    return (
      <View style={styles.Returnswrapper}>
        {/* TITLE */}
        <Text
          style={[
            styles.Returnstitle,
            isMobile && styles.ReturnstitleMobile,
            isTablet && styles.ReturnstitleTablet,
          ]}
        >
          Returns
        </Text>
        <Text
          style={[
            styles.ReturnssubTitle,
            isMobile && styles.ReturnssubTitleMobile,
            isTablet && styles.ReturnssubTitleTablet,
          ]}
        >
          Track Your Investment Growth with Real-Time Returns.
        </Text>

        {/* TOGGLE */}
        <View
          style={[
            styles.ReturnstoggleWrapper,
            isMobile && styles.ReturnstoggleWrapperMobile,
          ]}
        >
          <TouchableOpacity
            onPress={() => setActiveTab('Lumpsum')}
            style={[
              styles.toggleBtn,
              isMobile && styles.toggleBtnMobile,
              isTablet && styles.toggleBtnTablet,
              activeTab === 'Lumpsum' && styles.activeBtn,
            ]}
          >
            <Text
              style={[
                styles.toggleText,
                isMobile && styles.toggleTextMobile,
                isTablet && styles.toggleTextTablet,
                activeTab === 'Lumpsum' && styles.activeText,
              ]}
            >
              Lumpsum
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('SIP')}
            style={[
              styles.toggleBtn,
              isMobile && styles.toggleBtnMobile,
              isTablet && styles.toggleBtnTablet,
              activeTab === 'SIP' && styles.activeBtn,
            ]}
          >
            <Text
              style={[
                styles.toggleText,
                isMobile && styles.toggleTextMobile,
                isTablet && styles.toggleTextTablet,
                activeTab === 'SIP' && styles.activeText,
              ]}
            >
              SIP
            </Text>
          </TouchableOpacity>
        </View>

        {/* HORIZONTAL SCROLL ONLY */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={[
              styles.ReturnsTable,
              isMobile && styles.ReturnTableMobile,
              isTablet && styles.ReturnTableTablet,
            ]}
          >
            {/* HEADER */}
            <View style={styles.headerRow}>
              <Text
                style={[
                  styles.headerCell,
                  styles.col,
                  isMobile && styles.colMobile,
                    isTablet && styles.colTablet,
                  isMobile && styles.headerCellMobile,
                  isTablet && styles.headerCellTablet,
                ]}
              >
                Time
              </Text>
              <Text
                style={[
                  styles.headerCell,
                  styles.col,
                  isMobile && styles.headerCellMobile,
                  isTablet && styles.headerCellTablet,
                  isMobile && styles.colMobile,
                    isTablet && styles.colTablet,
                ]}
              >
                Absolute Returns
              </Text>
              <Text
                style={[
                  styles.headerCell,
                  styles.col,
                  isMobile && styles.headerCellMobile, styles.colMobile,
                  isTablet && styles.headerCellTablet,
                  isMobile && styles.colMobile,
                  isTablet && styles.colTablet,
                ]}
              >
                Annualized Returns
              </Text>
              <Text
                style={[
                  styles.headerCell,
                  styles.col,
                  isMobile && styles.headerCellMobile,
                  isTablet && styles.headerCellTablet,
                  isMobile && styles.colMobile,
                  isTablet && styles.colTablet,
                ]}
              >
                Category Average
              </Text>
              <Text
                style={[
                  styles.headerCell,
                  styles.col,
                  isMobile && styles.headerCellMobile,
                  isTablet && styles.headerCellTablet,
                  isMobile && styles.colMobile,
                  isTablet && styles.colTablet,
                ]}
              >
                Benchmark
              </Text>
            </View>

            {/* ROWS */}
            {tableData.map((row, index) => (
              <View
                key={index}
                style={[styles.row, index % 2 === 0 && styles.altRow]}
              >
                <Text
                  style={[
                    styles.cell,
                    styles.col,
                    isMobile && styles.cellMobile,
                    isTablet && styles.cellTablet,
                    isMobile && styles.colMobile,
                    isTablet && styles.colTablet,
                  ]}
                >
                  {row.time}
                </Text>
                <Text
                  style={[
                    styles.cell,
                    styles.col,
                    isMobile && styles.colMobile,
                    isTablet && styles.colTablet,
                    isMobile && styles.cellMobile,
                    isTablet && styles.cellTablet,
                  ]}
                >
                  {row.absolute}
                </Text>
                <Text
                  style={[
                    styles.cellGreen,
                    styles.col,
                    isMobile && styles.colMobile,
                    isTablet && styles.colTablet,
                    isMobile && styles.cellMobile,
                    isTablet && styles.cellTablet,
                  ]}
                >
                  {row.annual}
                </Text>
                <Text
                  style={[
                    styles.cellGreen,
                    styles.col,
                    isMobile && styles.colMobile,
                    isTablet && styles.colTablet,
                    isMobile && styles.cellMobile,
                    isTablet && styles.cellTablet,
                  ]}
                >
                  {row.avg}
                </Text>
                <Text
                  style={[
                    styles.cellGreen,
                    styles.col,
                    isMobile && styles.colMobile,
                    isTablet && styles.colTablet,
                    isMobile && styles.cellMobile,
                    isTablet && styles.cellTablet,
                  ]}
                >
                  {row.bench}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  const PortfolioSection = () => {
    const [tab, setTab] = useState('EquityHoldings');

    const assetClassData = [
      {
        title: 'Equity',
        color: '#62c6ff',
        percent: 80,
        desc: 'Aims for long-term growth by investing in stocks. Expect higher returns, but with greater ups and downs along the way.',
      },
      {
        title: 'Debt',
        color: '#ffd86a',
        percent: 18.2,
        desc: 'Seeks steady, reliable returns through bonds and similar assets. Lower risk compared to equities, ideal for stability.',
      },
      {
        title: 'Cash and Cash Equivalent',
        color: '#ff8359',
        percent: 1.8,
        desc: 'Keeps your investment liquid and stable—great for short-term needs or quick access to your money.',
      },
    ];

    const pieData = [
      { value: 80, color: '#68CCF1' },
      { value: 18.2, color: '#FEE388' },
      { value: 1.8, color: '#FF713D' },
    ];

    const sectorData = [
      { name: 'Banks', percent: 80 },
      { name: 'Automobiles', percent: 70 },
      { name: 'Information Technology', percent: 60 },
      { name: 'Power', percent: 50 },
      { name: 'Pharmaceuticals', percent: 40 },
    ];

    const holdings = [
      {
        stock: 'ABSL AMC Limited',
        sector: 'Chemical',
        percent: '0.65%',
      },
      {
        stock: 'Axis Asset Management Co. Ltd.',
        sector: 'Information Technology',
        percent: '0.65%',
      },
      {
        stock: 'Baroda BNP Paribas AMC',
        sector: 'Banking',
        percent: '0.65%',
      },
      {
        stock: 'Bharti Airtel Ltd',
        sector: 'Telecom',
        percent: '-0.65%',
      },
      {
        stock: 'HDFC Bank Ltd',
        sector: 'Banking',
        percent: '0.65%',
      },
      {
        stock: 'Hundustan Unilever Ltd',
        sector: 'Consumer Goods',
        percent: '0.65%',
      },
      {
        stock: 'Infosys Ltd',
        sector: 'Information Technology',
        percent: '0.65%',
      },
      {
        stock: 'Larsen & Turbo Ltd',
        sector: 'Infrastucture',
        percent: '0.65%',
      },
      {
        stock: 'Maruti Suzuki India Ltd',
        sector: 'Automobile',
        percent: '-0.85%',
      },
      {
        stock: 'Reliance Industries Ltd',
        sector: 'Energy',
        percent: '0.65%',
      },
      {
        stock: 'Maruti Suzuki India Ltd',
        sector: 'Automobile',
        percent: '0.65%',
      },
    ];

    return (
      <View style={styles.portfolioContainer}>
        <Text
          style={[
            styles.portfolioHeading,
            isMobile && styles.portfolioHeadingMobile,
            isTablet && styles.portfolioHeadingTablet,
          ]}
        >
          Portfolio
        </Text>
        <Text
          style={[
            styles.portfolioSubHeading,
            isMobile && styles.portfolioSubHeadingMobile,
            isTablet && styles.portfolioSubHeadingTablet,
          ]}
        >
          Track Your Investment Growth with Real-Time Returns.
        </Text>

        {/* Tabs */}
        <View
          style={[
            styles.tabsContainer,
            isMobile && styles.tabsContainerMobile,
            isTablet && styles.tabsContainerTablet,
          ]}
        >
          {['Asset Class', 'Sectors', 'Equity Holdings'].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setTab(item.replace(' ', ''))}
              style={[
                styles.tab,
                isMobile && styles.tabMobile,
                isTablet && styles.tabTablet,
                tab === item.replace(' ', '') && styles.activeTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  isMobile && styles.tabTextMobile,
                  isTablet && styles.tabTextTablet,
                  tab === item.replace(' ', '') && styles.activeTabText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ASSET CLASS TAB */}
        {tab === 'AssetClass' && (
          <View style={styles.portfolioSection}>
            <View
              style={[
                styles.assetRow,
                isMobile && styles.assetRowMobile,
                isTablet && styles.assetRowTablet,
              ]}
            >
              {/* LEFT */}
              <View
                style={[
                  styles.assetLeft,
                  isMobile && styles.assetLeftMobile,
                  isTablet && styles.assetLeftTablet,
                ]}
              >
                {assetClassData.map((item, index) => (
                  <View key={index} style={styles.assetBox}>
                    {/* TITLE + % ROW */}
                    <View style={styles.topRow}>
                      <Text
                        style={[
                          styles.assetTitle,
                          isMobile && styles.assetTitleMobile,
                          isTablet && styles.assetTitleTablet,
                        ]}
                      >
                        {item.title}
                      </Text>

                      <View style={styles.rowCenter}>
                        <View
                          style={[
                            styles.colorBox,
                            isMobile && styles.colorBoxMobile,
                            isTablet && styles.colorBoxTablet,
                            { backgroundColor: item.color },
                          ]}
                        />
                        <Text
                          style={[
                            styles.assetPercent,
                            isMobile && styles.assetPercentMobile,
                            isTablet && styles.assetPercentTablet,
                          ]}
                        >
                          {item.percent}%
                        </Text>
                      </View>
                    </View>

                    {/* DESCRIPTION */}
                    <Text
                      style={[
                        styles.assetDesc,
                        isMobile && styles.assetDescMobile,
                        isTablet && styles.assetDescTablet,
                      ]}
                    >
                      {item.desc}
                    </Text>

                    {/* DIVIDER */}
                    {index !== assetClassData.length - 1 && (
                      <View
                        style={[
                          styles.divider,
                          isMobile && styles.dividerMobile,
                        ]}
                      />
                    )}
                  </View>
                ))}
              </View>

              {/* RIGHT */}
              {(
                isMobile || isTablet || !isMobile
                ) && (
                <View
                  style={[
                    styles.pieContainer,
                    isTablet && styles.pieContainerTablet,
                    isMobile && styles.pieContainerMobile,
                  ]}
                >
                  <PieChartPro
                    donut
                    showText
                    radius={isMobile ? 140 : isTablet ? 160 : 240}
                    innerRadius={isMobile ? 70 : isTablet ? 80 : 120}
                    textSize={isMobile ? 10 : isTablet ? 12 : 16}
                    textColor="#fff"
                    data={pieData}
                    strokeWidth={10}
                    strokeColor="#0B0B0C"
                    centerLabelComponent={() => (
                      <View style={{ alignItems: 'center' }}>
                        <Text
                          style={[
                            styles.piePercent,
                            isTablet && styles.piePercentTablet,
                            isMobile && styles.piePercentMobile,
                          ]}
                        >
                          80%
                        </Text>
                        <Text
                          style={[
                            styles.pieTitle,
                            isTablet && styles.pieTitleTablet,
                            isMobile && styles.pieTitleMobile,
                          ]}
                        >
                          Equity
                        </Text>
                      </View>
                    )}
                  />
                </View>
              )}
            </View>
          </View>
        )}

        {/* SECTORS */}
        {tab === 'Sectors' && (
          <View style={styles.sectionContainer}>
            <Text
              style={[
                styles.description,
                isMobile && styles.descriptionMobile,
                isTablet && styles.descriptionTablet,
              ]}
            >
              Use these insights to understand where your money is working and
              spot new opportunities for diversification.
            </Text>

            {sectorData.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.sectorRow,
                  isMobile && styles.sectorRowMobile,
                  isTablet && styles.sectorRowTablet,
                ]}
              >
                <View
                  style={[
                    styles.sectorLabelRow,
                    isMobile && styles.sectorLabelRowMobile,
                    isTablet && styles.sectorLabelRowTablet,
                  ]}
                >
                  <View style={styles.topHighlightWrapper}>
                    <LinearGradient
                      colors={['#E5C586', '#FFBE41']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.topHighlightGradient}
                    />
                  </View>

                  <Text
                    style={[
                      styles.sectorLabel,
                      isMobile && styles.sectorLabelMobile,
                      isTablet && styles.sectorLabelTablet,
                    ]}
                  >
                    {item.name}
                  </Text>
                </View>
                <View
                  style={[
                    styles.progressTrack,
                    isMobile && styles.progressTrackMobile,
                    isTablet && styles.progressTrackTablet,
                  ]}
                >
                  <LinearGradient
                    colors={['#E5C586', '#E0A128']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.progressFill,
                      isMobile && styles.progressFillMobile,
                      isTablet && styles.progressFillTablet,
                      { width: `${item.percent}%` },
                    ]}
                  />
                </View>

                <Text
                  style={[
                    styles.sectorPercent,
                    isMobile && styles.sectorPercentMobile,
                    isTablet && styles.sectorPercentTablet,
                  ]}
                >
                  {item.percent}%
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* EQUITY HOLDINGS TAB */}
        {tab === 'EquityHoldings' && (
          <View style={styles.sectionContainer}>
            <Text
              style={[
                styles.equityDescription,
                isMobile && styles.equityDescriptionMobile,
                isTablet && styles.equityDescriptionTablet,
              ]}
            >
              Discover how your investments are distributed across{' '}
              <Text style={{ color: '#0FFFF6' }}>
                369 equity holdings — keep scrolling for deeper insights.
              </Text>
            </Text>

            {/* HORIZONTAL SCROLL */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={[
                  styles.equityTable,
                  
                  isMobile && styles.equityTableMobile,
                  isTablet && styles.equityTableTablet,
                ]}
              >
                {/* HEADER */}
                <View style={styles.equityheaderRow}>
                  <Text
                    style={[
                      styles.equityheaderCell,
                      styles.equitycol,
                      isMobile && styles.equitycolMobile,
                      isTablet && styles.equitycolTablet,
                      isMobile && styles.equityheaderCellMobile,
                      isTablet && styles.equityheaderCellTablet,
                    ]}
                  >
                    Stock Name
                  </Text>
                  <Text
                    style={[
                      styles.equityheaderCell,
                      styles.equitycol,
                       isMobile && styles.equitycolMobile,
                      isTablet && styles.equitycolTablet,
                      isMobile && styles.equityheaderCellMobile,
                      isTablet && styles.equityheaderCellTablet,
                    ]}
                  >
                    Sectors
                  </Text>
                  <Text
                    style={[
                      styles.equityheaderCellpercent,
                      styles.equitycolpercent,
                      isMobile && styles.equitycolpercentMobile,
                      isTablet && styles.equitycolpercentTablet,
                      isMobile && styles.equityheaderCellMobile,
                      isTablet && styles.equityheaderCellTablet,
                    ]}
                  >
                    Percentage Holding
                  </Text>
                </View>

                {/* BODY (VERTICAL SCROLL) */}
                <ScrollView
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={false}
                  style={[
                    { maxHeight: 800 },
                    isMobile && { maxHeight: 400 },
                    isTablet && { maxHeight: 600 },
                  ]}
                >
                  {holdings.map((row, i) => (
                    <View
                      key={i}
                      style={[
                        styles.equityrow,
                        i % 2 === 0 && styles.equityaltRow,
                      ]}
                    >
                      <Text
                        style={[
                          styles.equitycell,
                          styles.equitycol,
                          isMobile && styles.equitycellMobile,
                          isTablet && styles.equitycellTablet,
                          isMobile && styles.equitycolMobile,
                          isTablet && styles.equitycolTablet,
                        ]}
                      >
                        {row.stock}
                      </Text>
                      <Text
                        style={[
                          styles.equitycell,
                          styles.equitycol,
                          isMobile && styles.equitycellMobile,
                          isTablet && styles.equitycellTablet,
                          isMobile && styles.equitycolMobile,
                          isTablet && styles.equitycolTablet,
                        ]}
                      >
                        {row.sector}
                      </Text>
                      <Text
                        style={[
                          styles.equitycellpercent,
                          styles.equitycolpercent,
                          isMobile && styles.equitycellMobile,
                          isTablet && styles.equitycellTablet,
                          isMobile && styles.equitycolpercentMobile,
                          isTablet && styles.equitycolpercentTablet, 
                          row.percent.startsWith('-')
                            ? { color: '#FF6769' }
                            : { color: '#73FFBA' },
                        ]}
                      >
                        {row.percent}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </ScrollView>

            <Text
              style={[
                styles.scrollHint,
                isMobile && styles.scrollHintMobile,
                isTablet && styles.scrollHintTablet,
              ]}
            >
              {' '}
              <ArrowDown
                color="#0FFFF6"
                size={isMobile ? 20 : isTablet ? 25 : 30}
              />{' '}
              Scroll Down To View More Holdings
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {/* Top Navbar */}
        <View
          style={[
            styles.navbarBorder,
            isMobile && styles.navbarBorderMobile,
            isTablet && styles.navbarBorderTablet,
          ]}
        >
          <View
            style={[
              styles.navbar,
              isMobile &&    styles.navbarMobile,
              isTablet && styles.navbarTablet,
            ]}
          >
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
              <>
                <View
                  style={[
                    styles.navItems,
                    isTablet && styles.navItemsTablet,
                  ]}
                >
                  <Image
                    source={require('../assets/images/Fincelerate_Logo.png')}
                    style={[
                      styles.navlogo,
                      isTablet && styles.navlogoTablet,
                    ]}
                    resizeMode="contain"
                  />
                  <TouchableOpacity style={styles.navItem}>
                    <LayoutDashboard
                      color="white"
                      size={isTablet ? 16 : 20}
                    />
                    <Text
                      style={[
                        styles.navText,
                        isTablet && styles.navTextTablet,
                      ]}
                    >
                      Dashboard
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.navItem}>
                    <PiggyBank color="white" size={isTablet ? 16 : 20} />
                    <Text
                      style={[
                        styles.navText,
                        isTablet && styles.navTextTablet,
                      ]}
                    >
                      Explore & Invest
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.navItem}>
                    <Lightbulb color="white" size={isTablet ? 16 : 20} />
                    <Text
                      style={[
                        styles.navText,
                        isTablet && styles.navTextTablet,
                      ]}
                    >
                      Educate Yourself
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.iconBorder,
                    isTablet && styles.iconBorderTablet,
                  ]}
                >
                  <TouchableOpacity
                    style={[styles.icons, isTablet && styles.iconsTablet]}
                  >
                    <Feather
                      name="search"
                      size={isTablet ? 22 : 25}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.iconSpacing,
                      isTablet && styles.iconSpacingTablet,
                    ]}
                  >
                    <Ionicons
                      name="cart-outline"
                      size={isTablet ? 22 : 25}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.iconUser,
                      isTablet && styles.iconUserTablet,
                    ]}
                  >
                    <FontAwesome
                      name="user-circle-o"
                      size={isTablet ? 22 : 25}
                      color="#fff"
                    />
                    <Text
                      style={[
                        styles.signinText,
                        isTablet && styles.signinTextTablet,
                      ]}
                    >
                      Sign In
                    </Text>
                    <ChevronDown color="white" size={isTablet ? 18 : 20} />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>

        <View
          style={[
            styles.axisBorder,
            isMobile && styles.axisBorderMobile,
            isTablet && styles.axisBorderTablet,
          ]}
        >
          <View
            style={[
              styles.axisCard,
              isMobile && styles.axisCardMobile,
              isTablet && styles.axisCardTablet,
            ]}
          >
            <View
              style={[
                styles.axisCardLeft,
                isMobile && styles.axisCardLeftMobile,
                isTablet && styles.axisCardLeftTablet,
              ]}
            >
              <Image
                source={require('../assets/images/Fincelerate_Logo.png')}
                style={[
                  styles.axisLogo,
                  isMobile && styles.axisLogoMobile,
                  isTablet && styles.axisLogoTablet,
                ]}
              />

              <View style={styles.axisCardHeading}>
                <Text
                  style={[
                    styles.axisCardTitle,
                    isMobile && styles.axisCardTitleMobile,
                    isTablet && styles.axisCardTitleTablet,
                  ]}
                >
                  {' '}
                  Axis Nifty 500 Momentum{' '}
                </Text>
                <Text
                  style={[
                    styles.axisCardSubTitle,
                    isMobile && styles.axisCardSubTitleMobile,
                    isTablet && styles.axisCardSubTitleTablet,
                  ]}
                >
                  {' '}
                  Category: ELSS{' '}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.axisCardRight,
                isMobile && styles.axisCardRightMobile,
                isTablet && styles.axisCardRightTablet,
              ]}
            >
              <View
                style={[
                  styles.axisCardNav,
                  isMobile && styles.axisCardNavMobile,
                  isTablet && styles.axisCardNavTablet,
                ]}
              >
                <View style={styles.axisCardNavLeft}>
                  <Text
                    style={[
                      styles.axisCardNav1,
                      isMobile && styles.axisCardNav1Mobile,
                      isTablet && styles.axisCardNav1Tablet,
                    ]}
                  >
                    {' '}
                    NAV{' '}
                  </Text>
                  <Text
                    style={[
                      styles.axisCardNav2,
                      isMobile && styles.axisCardNav2Mobile,
                      isTablet && styles.axisCardNav2Tablet,
                    ]}
                  >
                    {' '}
                    as of Nov 29, 2023{' '}
                  </Text>
                  <Text
                    style={[
                      styles.axisCardNav3,
                      isMobile && styles.axisCardNav3Mobile,
                      isTablet && styles.axisCardNav3Tablet,
                    ]}
                  >
                    {' '}
                    <ArrowUp
                      color="#2CFF1A"
                      size={isMobile ? 12 : isTablet ? 14 : 16}
                    />{' '}
                    0.56%{' '}
                  </Text>
                  <Text
                    style={[
                      styles.axisCardNav4,
                      isMobile && styles.axisCardNav4Mobile,
                      isTablet && styles.axisCardNav4Tablet,
                    ]}
                  >
                    {' '}
                    (1-D Change){' '}
                  </Text>
                </View>
                <View style={styles.axisCardNavRight}>
                  <Text
                    style={[
                      styles.axisCardNav5,
                      isMobile && styles.axisCardNav5Mobile,
                      isTablet && styles.axisCardNav5Tablet,
                    ]}
                  >
                    {' '}
                    ₹143.88{' '}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.axisCardReturns,
                  isMobile && styles.axisCardReturnsMobile,
                  isTablet && styles.axisCardReturnsTablet,
                ]}
              >
                <View style={styles.axisCardReturnsLeft}>
                  <Text
                    style={[
                      styles.axisCardNavReturns1,
                      isMobile && styles.axisCardNavReturns1Mobile,
                      isTablet && styles.axisCardNavReturns1Tablet,
                    ]}
                  >
                    {' '}
                    Returns{' '}
                  </Text>
                  <Text
                    style={[
                      styles.axisCardNavReturns2,
                      isMobile && styles.axisCardNavReturns2Mobile,
                      isTablet && styles.axisCardNavReturns2Tablet,
                    ]}
                  >
                    {' '}
                    Per Annum{' '}
                  </Text>
                  <Text
                    style={[
                      styles.axisCardNavReturns3,
                      isMobile && styles.axisCardNavReturns3Mobile,
                      isTablet && styles.axisCardNavReturns3Tablet,
                    ]}
                  >
                    {' '}
                    since inception{' '}
                  </Text>
                  <Text
                    style={[
                      styles.axisCardNavReturns4,
                      isMobile && styles.axisCardNavReturns4Mobile,
                      isTablet && styles.axisCardNavReturns4Tablet,
                    ]}
                  >
                    {' '}
                    01/03/1994{' '}
                  </Text>
                </View>
                <View style={styles.axisCardNavRight}>
                  <Text
                    style={[
                      styles.axisCardNavReturns5,
                      isMobile && styles.axisCardNavReturns5Mobile,
                      isTablet && styles.axisCardNavReturns5Tablet,
                    ]}
                  >
                    {' '}
                    26.55%{' '}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <ReturnsTable />

        <PortfolioSection />

        <Footer />
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
                      source={require('../assets/images/icon.png')}
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
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={closeMenu}
                    >
                      <LayoutDashboard color="white" size={24} />
                      <Text style={styles.menuItemText}>Dashboard</Text>
                      <ChevronRight color="white" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={closeMenu}
                    >
                      <PiggyBank color="white" size={24} />
                      <Text style={styles.menuItemText}>
                        Explore & Invest
                      </Text>
                      <ChevronRight color="white" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={closeMenu}
                    >
                      <Lightbulb color="white" size={24} />
                      <Text style={styles.menuItemText}>
                        Educate Yourself
                      </Text>
                      <ChevronRight color="white" size={20} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.menuFooter}>
                    <View style={styles.menuActions}>
                      <TouchableOpacity style={styles.menuActionButton}>
                        <Feather name="search" size={24} color="#fff" />
                        <Text style={styles.menuActionText}>Search</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.menuActionButton}>
                        <Ionicons
                          name="cart-outline"
                          size={24}
                          color="#fff"
                        />
                        <Text style={styles.menuActionText}>Cart</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.menuSignInButton}
                      onPress={closeMenu}
                    >
                      <FontAwesome
                        name="user-circle-o"
                        size={24}
                        color="#fff"
                      />
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
    backgroundColor: '#0D0E0F',
    flexDirection: 'column',
    width: '100%',
  },
  scrollView: {
    flex: 1,
  },

  // Axis Card Styles
  axisBorder: {
    minHeight: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  axisBorderMobile: {
    minHeight: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  axisBorderTablet: {
    minHeight: 150,
    paddingVertical: 15,
  },

  axisCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '92%',
    gap: 20,
    paddingTop: 60,
  },
  axisCardMobile: {
    flexDirection: 'column',
    width: '100%',
    gap: 15,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  axisCardTablet: {
    gap: 15,
    paddingTop: 40,
    flexDirection: 'column',
  },

  axisLogo: {
    height: 122,
    width: 122,
    borderRadius: 50,
  },
  axisLogoMobile: {
    height: 60,
    width: 60,
  },
  axisLogoTablet: {
    height: 80,
    width: 80,
  },

  axisCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    minWidth: 300,
    gap: 15,
  },
  axisCardLeftMobile: {
    minWidth: 'auto',
    width: '100%',
    gap: 10,
  },
  axisCardLeftTablet: {
    minWidth: 'auto',
    width: '100%',
    gap: 12,
  },

  axisCardHeading: {
    flexWrap: 'wrap',
    flex: 1,
  },

  axisCardTitle: {
    fontFamily: 'Poppins-500',
    fontSize: 40,
    color: '#ffffff',
  },
  axisCardTitleMobile: {
    fontSize: 18,
  },
  axisCardTitleTablet: {
    fontSize: 26,
  },

  axisCardSubTitle: {
    fontFamily: 'Poppins-500',
    fontSize: 24,
    color: '#0FFFF6',
  },
  axisCardSubTitleMobile: {
    fontSize: 14,
  },
  axisCardSubTitleTablet: {
    fontSize: 18,
  },

  axisCardRight: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexShrink: 1,
    gap: 12,
    minWidth: 800,
  },
  axisCardRightMobile: {
    flexDirection: 'column',
    minWidth: 'auto',
    width: '100%',
    gap: 10,
  },
  axisCardRightTablet: {
    minWidth: 'auto',
    width: '100%',
    flexDirection: 'column',
    gap: 10,
  },

  axisCardNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '45%',
    backgroundColor: '#171515',
    padding: 10,
    borderRadius: 8,
  },
  axisCardNavMobile: {
    width: '100%',
    padding: 12,
  },
  axisCardNavTablet: {
    width: '100%',
    padding: 15,
  },

  axisCardReturns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '45%',
    padding: 10,
    backgroundColor: '#171515',
    borderRadius: 8,
  },
  axisCardReturnsMobile: {
    width: '100%',
    padding: 12,
  },
  axisCardReturnsTablet: {
    width: '100%',
    padding: 15,
  },

  axisCardNav1: {
    fontFamily: 'Poppins-500',
    fontSize: 24,
    color: '#ffffff',
  },
  axisCardNav1Mobile: {
    fontSize: 16,
  },
  axisCardNav1Tablet: {
    fontSize: 20,
  },

  axisCardNav2: {
    fontFamily: 'Poppins-500',
    fontSize: 12,
    color: '#73FFBA',
  },
  axisCardNav2Mobile: {
    fontSize: 10,
  },
  axisCardNav2Tablet: {
    fontSize: 11,
  },

  axisCardNav3: {
    fontFamily: 'Poppins-300',
    fontSize: 18,
    color: '#2CFF1A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  axisCardNav3Mobile: {
    fontSize: 14,
    marginTop: 5,
  },
  axisCardNav3Tablet: {
    fontSize: 16,
    marginTop: 8,
  },

  axisCardNav4: {
    fontFamily: 'Poppins-300',
    fontSize: 16,
    color: '#ffffff',
  },
  axisCardNav4Mobile: {
    fontSize: 12,
  },
  axisCardNav4Tablet: {
    fontSize: 14,
  },

  axisCardNav5: {
    fontFamily: 'Poppins-700',
    fontSize: 32,
    color: '#73FFBA',
  },
  axisCardNav5Mobile: {
    fontSize: 22,
  },
  axisCardNav5Tablet: {
    fontSize: 28,
  },

  axisCardNavReturns1: {
    fontFamily: 'Poppins-500',
    fontSize: 24,
    color: '#ffffff',
  },
  axisCardNavReturns1Mobile: {
    fontSize: 16,
  },
  axisCardNavReturns1Tablet: {
    fontSize: 20,
  },

  axisCardNavReturns2: {
    fontFamily: 'Poppins-500',
    fontSize: 12,
    color: '#73FFBA',
  },
  axisCardNavReturns2Mobile: {
    fontSize: 10,
  },
  axisCardNavReturns2Tablet: {
    fontSize: 11,
  },

  axisCardNavReturns3: {
    fontFamily: 'Poppins-500',
    fontSize: 16,
    color: '#ffffff',
    marginTop: 10,
  },
  axisCardNavReturns3Mobile: {
    fontSize: 12,
    marginTop: 5,
  },
  axisCardNavReturns3Tablet: {
    fontSize: 14,
    marginTop: 8,
  },

  axisCardNavReturns4: {
    fontFamily: 'Poppins-500',
    fontSize: 16,
    color: '#ffffff',
  },
  axisCardNavReturns4Mobile: {
    fontSize: 12,
  },
  axisCardNavReturns4Tablet: {
    fontSize: 14,
  },

  axisCardNavReturns5: {
    fontFamily: 'Poppins-700',
    fontSize: 32,
    color: '#73FFBA',
  },
  axisCardNavReturns5Mobile: {
    fontSize: 22,
  },
  axisCardNavReturns5Tablet: {
    fontSize: 28,
  },

  axisCardNavLeft: {
    flex: 1,
  },
  axisCardNavRight: {
    alignItems: 'flex-end',
  },
  axisCardReturnsLeft: {
    flex: 1,
  },

  // Returns Table Styles
  Returnswrapper: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  Returnstitle: {
    color: '#fff',
    fontSize: 48,
    fontFamily: 'Poppins-700',
    textAlign: 'center',
  },
  ReturnstitleMobile: {
    fontSize: 28,
  },
  ReturnstitleTablet: {
    fontSize: 36,
  },

  ReturnssubTitle: {
    color: '#FFE489',
    textAlign: 'center',
    fontFamily: 'Poppins-400',
    fontSize: 24,
    marginBottom: 40,
    marginTop: 12,
  },
  ReturnssubTitleMobile: {
    fontSize: 14,
    marginBottom: 20,
    marginTop: 8,
    paddingHorizontal: 10,
  },
  ReturnssubTitleTablet: {
    fontSize: 18,
    marginBottom: 30,
  },

  ReturnstoggleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 20,
    marginBottom: 60,
  },
  ReturnstoggleWrapperMobile: {
    gap: 10,
    marginTop: 10,
    marginBottom: 30,
  },

  toggleBtn: {
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 50,
  },
  toggleBtnMobile: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  toggleBtnTablet: {
    paddingVertical: 14,
    paddingHorizontal: 28,
  },

  activeBtn: {
    backgroundColor: '#5E17EB',
  },

  toggleText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Montserrat-400',
  },
  toggleTextMobile: {
    fontSize: 14,
  },
  toggleTextTablet: {
    fontSize: 18,
  },

  activeText: {
    fontWeight: '700',
    fontFamily: 'Montserrat-800',
  },

  ReturnsTable: {
    backgroundColor: '#0d0d0d',
  },
  ReturnTableMobile: {
    minWidth: 700,
  },
  ReturnTableTablet: {
    minWidth: 900,
  },

  headerRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#222',
  },

  row: {
    flexDirection: 'row',
  },

  altRow: {
    backgroundColor: '#111',
  },

  headerCell: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Poppins-500',
    textAlign: 'center',
  },
  headerCellMobile: {
    fontSize: 16,
  },
  headerCellTablet: {
    fontSize: 18,
  },

  cell: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-700',
  },
  cellMobile: {
    fontSize: 14,
  },
  cellTablet: {
    fontSize: 16,
  },

  cellGreen: {
    color: '#73FFBA',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-700',
  },

  col: {
    flex: 1,
    minHeight: 50,
    minWidth: 350,
    paddingVertical: 30,
    borderWidth: 1,
    borderColor: '#cccccc17',
  },
  colMobile: {
     minHeight: 50,
    minWidth: 100,
  },
    colTablet: {
    minHeight: 50,
    minWidth: 200,
  },
  // Portfolio Section Styles
  portfolioContainer: {
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: '#0d0d0d',
  },

  portfolioHeading: {
    color: '#F8F8F8',
    fontSize: 48,
    fontFamily: 'Poppins-600',
    textAlign: 'center',
  },
  portfolioHeadingMobile: {
    fontSize: 28,
  },
  portfolioHeadingTablet: {
    fontSize: 36,
  },

  portfolioSubHeading: {
    color: '#FFE489',
    textAlign: 'center',
    marginTop: 6,
    fontSize: 24,
    fontFamily: 'Poppins-400',
  },
  portfolioSubHeadingMobile: {
    fontSize: 14,
    paddingHorizontal: 10,
  },
  portfolioSubHeadingTablet: {
    fontSize: 18,
  },

  tabsContainer: {
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    flexWrap: 'wrap',
  },
  tabsContainerMobile: {
    marginTop: 30,
    gap: 10,
    paddingHorizontal: 10,
  },
  tabsContainerTablet: {
    marginTop: 50,
    gap: 15,
  },

  tab: {
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 40,
    backgroundColor: '#1c1c1c',
  },
  tabMobile: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tabTablet: {
    paddingVertical: 18,
    paddingHorizontal: 24,
  },

  activeTab: {
    backgroundColor: '#5E17EB',
  },

  tabText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Montserrat-500',
  },
  tabTextMobile: {
    fontSize: 12,
  },
  tabTextTablet: {
    fontSize: 16,
  },

  activeTabText: {
    fontFamily: 'Montserrat-800',
  },

  portfolioSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  // Asset Class Styles
  assetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '90%',
    marginTop: 100,
    gap:10,
    // flexWrap: 'wrap',
  },
  assetRowMobile: {
    flexDirection: 'column',
    width: '100%',
    marginTop: 30,
  },
  assetRowTablet: {
    flexDirection: 'column',
    width: '95%',
    marginTop: 50,
  },

  assetLeft: {
    width: '50%',
  },
  assetLeftMobile: {
    width: '100%',
  },
  assetLeftTablet: {
    width: '100%',
  },

  assetBox: {
    marginBottom: 25,
    
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  assetTitle: {
    color: '#E8EAED',
    fontSize: 34,
    fontFamily: 'Poppins-500',
  },
  assetTitleMobile: {
    fontSize: 18,
  },
  assetTitleTablet: {
    fontSize: 24,
  },

  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  colorBox: {
    width: 33,
    height: 33,
    borderRadius: 4,
  },
  colorBoxMobile: {
    width: 20,
    height: 20,
  },
  colorBoxTablet: {
    width: 26,
    height: 26,
  },

  assetPercent: {
    fontSize: 34,
    fontFamily: 'Montserrat-800',
    color: '#E8EAED',
    marginLeft: 10,
  },
  assetPercentMobile: {
    fontSize: 18,
    marginLeft: 6,
  },
  assetPercentTablet: {
    fontSize: 24,
    marginLeft: 8,
  },

  assetDesc: {
    color: '#E8EAED',
    marginTop: 20,
    fontSize: 24,
    fontFamily: 'Poppins-400',
  },
  assetDescMobile: {
    fontSize: 12,
    marginTop: 10,
  },
  assetDescTablet: {
    fontSize: 16,
    marginTop: 15,
  },

  divider: {
    height: 1,
    backgroundColor: '#272727A8',
    marginTop: 20,
    marginBottom: 20,
  },
  dividerMobile: {
    marginTop: 15,
    marginBottom: 15,
  },

  pieContainer: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieContainerTablet: {
    width: '100%',
    marginTop: 30,
  },
pieContainerMobile: {
    width: '100%',
    marginTop: 30,
  },
  piePercent: {
    fontSize: 48,
    fontFamily: 'Poppins-700',
    color: '#E8EAED',
  },
  piePercentTablet: {
    fontSize: 32,
  },

  piePercentMobile: {
    fontSize: 26,
  },

  pieTitle: {
    fontSize: 48,
    fontFamily: 'Poppins-300',
    color: '#E8EAED',
  },
  pieTitleTablet: {
    fontSize: 32,
  },
 pieTitleMobile: {
    fontSize: 32,
  },
  // Sector Styles
  sectionContainer: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 30,
  },

  description: {
    color: '#E6E6E6',
    textAlign: 'center',
    margin: 80,
    fontSize: 24,
    fontFamily: 'Poppins-500',
  },
  descriptionMobile: {
    fontSize: 12,
    margin: 20,
  },
  descriptionTablet: {
    fontSize: 16,
    margin: 40,
  },

  sectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  sectorRowMobile: {
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  sectorRowTablet: {
    marginBottom: 25,
  },

  sectorLabelRow: {
    width: 350,
  },
  sectorLabelRowMobile: {
    width: 110,
    marginBottom: 5,
  },
  sectorLabelRowTablet: {
    width: 200,
  },

  sectorLabel: {
    color: '#E6E6E6',
    fontSize: 24,
    fontFamily: 'Poppins-400',
  },
  sectorLabelMobile: {
    fontSize: 12,
  },
  sectorLabelTablet: {
    fontSize: 16,
  },

  topHighlightWrapper: {
    width: '60%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },

  topHighlightGradient: {
    height: 8,
    width: '100%',
    top: -7,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },

  progressTrack: {
    flex: 1,
    height: 30,
    backgroundColor: '#202020ff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressTrackMobile: {
    height: 20,
  },
  progressTrackTablet: {
    height: 25,
  },

  progressFill: {
    height: 30,
    borderRadius: 20,
  },
  progressFillMobile: {
    height: 20,
  },
  progressFillTablet: {
    height: 25,
  },

  sectorPercent: {
    color: '#FFE489',
    marginLeft: 10,
    width: 200,
    textAlign: 'right',
    fontSize: 48,
    fontFamily: 'Montserrat-700',
  },
  sectorPercentMobile: {
    fontSize: 16,
    width: 60,
    marginLeft: 5,
  },
  sectorPercentTablet: {
    fontSize: 28,
    width: 120,
  },

  // Equity Holdings Styles
  equityDescription: {
    fontFamily: 'Poppins-500',
    fontSize: 18,
    color: '#e8e8e8',
    opacity: 0.67,
    marginBottom: 30,
    marginTop: 80,
  },
  equityDescriptionMobile: {
    fontSize: 12,
    marginBottom: 20,
    marginTop: 30,
  },
  equityDescriptionTablet: {
    fontSize: 14,
    marginBottom: 25,
    marginTop: 50,
  },

  equityTable: {
    backgroundColor: '#131313',
    width: '100%',
  },
  equityTableMobile: {
    minWidth: 700,
  },
  equityTableTablet: {
    minWidth: 900,
  },

  equityheaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#222',
  },

  equityrow: {
    flexDirection: 'row',
  },

  equityaltRow: {
    backgroundColor: '#191919',
  },

  equityheaderCell: {
    color: '#ffffff',
    fontSize: 28,
    fontFamily: 'Poppins-500',
  },
  equityheaderCellMobile: {
    fontSize: 14,
  },
  equityheaderCellTablet: {
    fontSize: 20,
  },

  equityheaderCellpercent: {
    color: '#ffffff',
    fontSize: 28,
    fontFamily: 'Poppins-500',
    textAlign: 'center',
  },

  equitycell: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Poppins-700',
    height: 120,
  },
  equitycellMobile: {
    fontSize: 12,
    height: 80,
  },
  equitycellTablet: {
    fontSize: 16,
    height: 100,
  },

  equitycellpercent: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Poppins-700',
    textAlign: 'center',
  },

  equitycol: {
    flex: 1,
    minHeight: 50,
    minWidth: 350,
    paddingVertical: 40,
    borderWidth: 1,
    borderColor: '#cccccc17',
    paddingLeft: 100,
  },
  equitycolMobile: {
    minHeight: 30,
    minWidth: 100,
    paddingVertical: 32,
    paddingLeft: 20,
  },
  equitycolTablet: {
    minHeight: 40,
    minWidth: 200,
    paddingVertical: 40,
    paddingLeft: 40,
  },
  equitycolpercent: {
    flex: 1,
    minHeight: 50,
    minWidth: 350,
    paddingVertical: 40,
    borderWidth: 1,
    borderColor: '#cccccc17',
  },
  equitycolpercentMobile: {
    minHeight: 30,
    minWidth: 100,
    paddingVertical: 32,
    paddingLeft: 20,
  },
  equitycolpercentTablet: {
    minHeight: 40,
    minWidth: 200,
    paddingVertical: 40,
    paddingLeft: 40,
  },
  scrollHint: {
    marginTop: 20,
    fontFamily: 'Poppins-500',
    color: '#E8EAEDCF',
    fontSize: 24,
    alignSelf: 'center',
  },
  scrollHintMobile: {
    fontSize: 12,
    marginTop: 15,
  },
  scrollHintTablet: {
    fontSize: 16,
    marginTop: 18,
  },

  // Navbar Styles
  navbarBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    backgroundColor: '#09090EF2',
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
    padding: 10,
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
    width: '60%',
  },
  navItemsTablet: {
    gap: 10,
    width: '60%',
  },

  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  navText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-500',
    flexWrap: 'wrap',
  },
  navTextTablet: {
    fontSize: 16,
    flexWrap: 'wrap',
    maxWidth: 90,
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
    width: '30%',
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
    height: 30,
    width: 30,
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
    height: 30,
    width: 30,
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
});
