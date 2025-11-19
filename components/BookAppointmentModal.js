import { CalendarIcon, ChevronDown } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Calendar } from 'react-native-calendars';

const { width } = Dimensions.get('window');

const BookAppointmentModal = ({ visible,onClose }) => {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeZone, setSelectedTimeZone] = useState('SST');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimeSlotPicker, setShowTimeSlotPicker] = useState(false);
  const [showTimeZonePicker, setShowTimeZonePicker] = useState(false);
  const [specifications, setSpecifications] = useState('');

  useEffect(() => {
    const onChange = (result) => {
      setScreenData(result.window);
    };
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  const isMobile = screenData.width < 768;
  const isTablet = screenData.width >= 768 && screenData.width < 1024;

  // Time zones data
  const timeZones = [
    { code: 'SST', name: 'Singapore Standard Time', offset: '+08:00' },
    { code: 'IST', name: 'Indian Standard Time', offset: '+05:30' },
    { code: 'EST', name: 'Eastern Standard Time', offset: '-05:00' },
    { code: 'PST', name: 'Pacific Standard Time', offset: '-08:00' },
    { code: 'GMT', name: 'Greenwich Mean Time', offset: '+00:00' },
    { code: 'CET', name: 'Central European Time', offset: '+01:00' },
    { code: 'JST', name: 'Japan Standard Time', offset: '+09:00' },
    { code: 'AEST', name: 'Australian Eastern Standard Time', offset: '+10:00' },
    { code: 'CST', name: 'China Standard Time', offset: '+08:00' },
    { code: 'MST', name: 'Mountain Standard Time', offset: '-07:00' },
    { code: 'BST', name: 'British Summer Time', offset: '+01:00' }
  ];

  // Time slots data
  const timeSlots = [
    '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM',
    '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM',
    '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
    '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
    '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleDateSelect = (day) => {
    setSelectedDate(formatDate(day.dateString));
    setShowDatePicker(false);
  };

  const handleTimeZoneSelect = (timeZone) => {
    setSelectedTimeZone(timeZone.code);
    setShowTimeZonePicker(false);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setShowTimeSlotPicker(false);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTimeSlot) {
      console.log('Booking appointment:', {
        date: selectedDate,
        timeZone: selectedTimeZone,
        timeSlot: selectedTimeSlot,
        specifications
      });
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <ScrollView style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          <View style={[
            styles.modalContainer,
            isMobile && styles.modalContainerMobile,
            isTablet && styles.modalContainerTablet
          ]}>
            {/* Header */}
            <View style={[styles.header, isMobile && styles.headerMobile]}>
                <Text style={[styles.headerTitle, isMobile && styles.headerTitleMobile]}>
                  Book a 30-Minute Session With a Mutual Fund Expert
                </Text>
                <Text style={[styles.headerSubtitle, isMobile && styles.headerSubtitleMobile]}>
                  Get expert answers for all your investment questions.
                </Text>
              
            </View>

            {/* User Info */}
            <View style={[styles.userInfo, isMobile && styles.userInfoMobile]}>
              <View style={styles.userInfoItem}>
                <Text style={[styles.userLabel, isMobile && styles.userLabelMobile]}>Name:</Text>
                <Text style={[styles.userName, isMobile && styles.userNameMobile]}>Anchal Tiwari</Text>
              </View>
              <View style={styles.userInfoItem}>
                <Text style={[styles.userLabel, isMobile && styles.userLabelMobile]}>Mobile Number:</Text>
                <Text style={[styles.userName, isMobile && styles.userNameMobile]}>7000563789</Text>
              </View>
            </View>

            <View style={styles.content} >
              {/* Date and Time Selection Row */}
              <View style={[styles.selectionRow, isMobile && styles.selectionRowMobile]}>
                {/* Select Date Section */}
                <View style={[styles.section, isMobile && styles.sectionMobile]}>
                  <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>
                    Select Date <Text style={styles.required}>*</Text>
                  </Text>
                  <View style={styles.inputWrapper}>
                    <TouchableOpacity
                      style={[styles.inputContainer, isMobile && styles.inputContainerMobile]}
                      onPress={() => {
                        setShowDatePicker(!showDatePicker);
                        setShowTimeSlotPicker(false);
                        setShowTimeZonePicker(false);
                      }}
                    >
                      <Text style={[
                        styles.inputText,
                        isMobile && styles.inputTextMobile,
                        !selectedDate && styles.placeholderText
                      ]}>
                        {selectedDate || 'Select Date'}
                      </Text>
                      <View style={styles.verticalLine}>
                      <View style={styles.verticalLineBorder} />
                        <CalendarIcon size={32} color='#ffd89e'/>
                      </View>
                    </TouchableOpacity>

                    {showDatePicker && (
                      <View style={[styles.dropdownBoxCal, isMobile && styles.dropdownBoxMobileCal]}>
                        <Calendar
                          minDate={new Date().toISOString().split('T')[0]}
                          onDayPress={handleDateSelect}
                          markedDates={{
                            [selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : '']: {
                              selected: true,
                              selectedColor: '#14FFF6',
                            },

                          }}
                          theme={{
                            backgroundColor: '#2a2a2a',
                            calendarBackground: 'rgba(255, 228, 137, 0.01)',
                            textSectionTitleColor: '#fff',
                            selectedDayBackgroundColor: '#fff',
                            selectedDayTextColor: 'black',
                            todayTextColor: '#4CAF50',
                            dayTextColor: '#fff',
                            textDisabledColor: '#666',
                            monthTextColor: '#fff',
                            arrowColor: '#fff',

                            textDayFontFamily: 'Poppins-400',
                            textMonthFontFamily: 'Poppins-400',
                            textDayHeaderFontFamily: 'Poppins-400',
                          
                            textDayFontSize: 16,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 14,
                          

                          }}
                        />
                      </View>
                    )}
                  </View>
                </View>

                {/* Select Time Slot Section */}
                <View style={[styles.section, isMobile && styles.sectionMobile]}>
                  <View style={styles.timeSlotHeader}>
                    <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>
                      Select Time Slot <Text style={styles.required}>*</Text>
                    </Text>
                   
                  </View>

                  <View style={styles.inputWrapper}>
                    
                    <TouchableOpacity
                      style={[styles.inputContainer, isMobile && styles.inputContainerMobile]}
                      onPress={() => {
                        setShowTimeSlotPicker(!showTimeSlotPicker);
                        setShowTimeZonePicker(false);
                        setShowDatePicker(false);
                      }}
                    >
                      <Text style={[
                        styles.inputText,
                        isMobile && styles.inputTextMobile,
                        !selectedTimeSlot && styles.placeholderText
                      ]}>
                        {selectedTimeSlot || 'Select Time Slot'}
                      </Text>
                      <View style={styles.verticalLine}>
                      <View style={styles.verticalLineBorder}/>
                      <TouchableOpacity
                      style={[styles.timezoneButton, isMobile && styles.timezoneButtonMobile]}
                      onPress={() => {
                        setShowTimeZonePicker(!showTimeZonePicker);
                        setShowTimeSlotPicker(false);
                        setShowDatePicker(false);
                      }}
                    >
                      <Text style={[styles.timezoneText, isMobile && styles.timezoneTextMobile]}>
                        {selectedTimeZone}
                      </Text>
                      <ChevronDown size={isMobile ? 14 : 18} color="#FFD89E" />
                    </TouchableOpacity>
                    </View>
                    </TouchableOpacity>

                    {showTimeSlotPicker && (
                      <View style={[styles.dropdownBox, isMobile && styles.dropdownBoxMobile]}>
                        <Text style={[styles.timeSlotNote, isMobile && styles.timeSlotNoteMobile]}>
                          Pick the best time slot that works for you!
                        </Text>
                        <Text style={[styles.timeSlotSubNote, isMobile && styles.timeSlotSubNoteMobile]}>
                          Available time slots
                        </Text>
                        <ScrollView style={styles.timeSlotsContainer} nestedScrollEnabled>
                          <View style={[styles.timeSlotsGrid, isMobile && styles.timeSlotsGridMobile]}>
                            {timeSlots.map((slot, index) => (
                              <TouchableOpacity
                                key={index}
                                style={[
                                  styles.timeSlotButton,
                                  isMobile && styles.timeSlotButtonMobile,
                                  selectedTimeSlot === slot && styles.timeSlotButtonSelected
                                ]}
                                onPress={() => handleTimeSlotSelect(slot)}
                              >
                                <Text style={[
                                  styles.timeSlotText,
                                  isMobile && styles.timeSlotTextMobile,
                                  selectedTimeSlot === slot && styles.timeSlotTextSelected
                                ]}>
                                  {slot}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </ScrollView>
                      </View>
                    )}

                    {showTimeZonePicker && (
                      <View style={[styles.dropdownBox, isMobile && styles.dropdownBoxMobile]}>
                        <Text style={[styles.timezoneDropdownTitle, isMobile && styles.timezoneDropdownTitleMobile]}>
                          Use current time zone ( {selectedTimeZone} )
                        </Text>
                        <ScrollView style={styles.timezoneList} nestedScrollEnabled>
                          {timeZones.map((timezone, index) => (
                            <TouchableOpacity
                              key={index}
                              style={[
                                styles.timezoneItem,
                                isMobile && styles.timezoneItemMobile,
                                selectedTimeZone === timezone.code && styles.timezoneItemSelected
                              ]}
                              onPress={() => handleTimeZoneSelect(timezone)}
                            >
                              <Text style={[
                                styles.timezoneItemText,
                                isMobile && styles.timezoneItemTextMobile,
                                selectedTimeZone === timezone.code && styles.timezoneItemTextSelected
                              ]}>
                                {timezone.code} - {timezone.name}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {/* Specifications Section */}
              <View style={[styles.specificationsSection, isMobile && styles.specificationsSectionMobile]}>
                <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>
                  Any Specification?
                </Text>
                <TextInput
                  style={[styles.specificationsInput, isMobile && styles.specificationsInputMobile]}
                  placeholder="I would like to discuss about my child's investment & retirement."
                  placeholderTextColor="#E7E7E7B2"
                  multiline
                  numberOfLines={4}
                  value={specifications}
                  onChangeText={setSpecifications}
                />
              </View>

              {/* Terms */}
              <View style={[styles.termsSection, isMobile && styles.termsSectionMobile]}>
                <Text style={[styles.termsText, isMobile && styles.termsTextMobile]}>
                  By booking an appointment you agree to Fincelerate's{' '}
                  <Text style={[styles.termsLink, isMobile && styles.termsLinkMobile]}>Terms of Service</Text> and{' '}
                  <Text style={[styles.termsLink, isMobile && styles.termsLinkMobile]}>Privacy Policy</Text>
                </Text>
              </View>

            {/* Action Buttons */}
            <View style={[styles.actionButtons, isMobile && styles.actionButtonsMobile]}>
            <TouchableOpacity
                style={[styles.cancelButton, isMobile && styles.cancelButtonMobile]}
                onPress={onClose}
              >
                <Text style={[styles.cancelButtonText, isMobile && styles.cancelButtonTextMobile]}>
                  Cancel
                </Text>
                </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmButton, isMobile && styles.confirmButtonMobile]}
                onPress={handleConfirm}
              >
                <Text style={[styles.confirmButtonText, isMobile && styles.confirmButtonTextMobile]}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
           
              </View>

               {/* Disclaimer */}
               <View style={[styles.disclaimerSection, isMobile && styles.disclaimerSectionMobile]}>
                <Text style={[styles.disclaimerText, isMobile && styles.disclaimerTextMobile]}>
                  *Fincelerate Private Limited* is a AMFI Registered Mutual Fund Distributor with ARN - 302467
                </Text>
              </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#0D0E0F',
    borderRadius: 16,
    width: '90%',
    maxWidth: 1100,
    // maxHeight: 1200,
    padding: 20,
  },
  modalContainerMobile: {
    width: '95%',
    padding: 16,
  },
  modalContainerTablet: {
    // width: '85%',
    padding: 20,
  },
  header: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 20,
    paddingBottom:70,
    paddingTop:60,
  },
  headerMobile: {
    marginBottom: 16,
  },
  headerTitle: {
    textAlign:'center',
    color: '#FFE489',
    fontSize: 28,
    fontFamily: 'Poppins-700',
    marginBottom: 32,
    maxWidth: '85%',
  },
  headerTitleMobile: {
    fontSize: 18,
    lineHeight: 24,
  },
  headerSubtitle: {
        textAlign:'center',
    color: '#e4e4e4',
    fontSize: 24,
    fontFamily: 'Poppins-300',
  },
  headerSubtitleMobile: {
    fontSize: 14,
    marginBottom:-24,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 40,
  
  },
  userInfoMobile: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  userInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userLabel: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Poppins-300',
  },
  userLabelMobile: {
    fontSize: 14,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Poppins-700',
  },
  userNameMobile: {
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  selectionRow: {
    flexDirection: 'row',
    gap: 120,
    // marginBottom: 24,
    padding:40,
  },
  selectionRowMobile: {
    flexDirection: 'column',
    gap: 20,
  },
  section: {
    flex: 1,
  },
  sectionMobile: {
    flex: 1,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Poppins-300',
    marginBottom: 12,
  },
  sectionTitleMobile: {
    fontSize: 14,
    marginBottom: 8,
  },
  required: {
    color: '#ff4444',
  },
  inputWrapper: {
    position: 'relative',
    // borderColor:'red',borderWidth:1,
    zIndex: 1000,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#191919',
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
    height:70,
    borderColor: 'rgba(255, 228, 137, 0.2)'
},
  inputContainerMobile: {
    padding: 10,
  },
  inputText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-400',
    flex: 1,
  },
  inputTextMobile: {
    fontSize: 14,
  },
  placeholderText: {
    color: '#888',
    fontFamily:'Poppins-400',
    fontSize:18,
  },
  verticalLine:{
    flexDirection:'row',
    alignItems:'center',
  },
  verticalLineBorder: {
    width: 1,
    height: 34,
    backgroundColor: 'rgba(255, 228, 137, 0.3)', // 70% opacity
    marginRight: 20,
  },
  timeSlotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 12,
  },
  timezoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4,
    gap: 4,
    marginRight:10,
    marginLeft:-10,
  },
  timezoneButtonMobile: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  timezoneText: {
    color: '#FFD89E',
    fontSize: 18,
    fontFamily: 'Poppins-500',
  },
  timezoneTextMobile: {
    fontSize: 16,
  },
  dropdownBoxCal: {
    backgroundColor: '#2F2F2F',
    borderRadius: 4,
    // borderWidth: 1,
    // borderColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 4,
 
  },
  dropdownBoxMobileCal: {
    // gap:100,
    marginTop: 2,
    maxHeight:500,
    marginBottom:380,
  },
  dropdownBox: {
    backgroundColor: '#2F2F2F',
    borderRadius: 4,
    // borderWidth: 1,
    // borderColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 4,
 
  },
  dropdownBoxMobile: {
    // gap:100,
    marginTop: 2,
    maxHeight:300,
    marginBottom:160,
  },
  timeSlotsContainer: {
    maxHeight: 300,
  },
  timeSlotNote: {
    color: '#FFE489',
    fontSize: 14,
    fontFamily: 'Poppins-300',
    margin: 16,
  },
  timeSlotNoteMobile: {
    fontSize: 12,
  },
  timeSlotSubNote: {
    color: '#888',
    fontSize: 12,
    fontFamily: 'Poppins-400',
    // marginBottom: 16,
    marginLeft:14,
  },
  timeSlotSubNoteMobile: {
    fontSize: 10,
    marginBottom: 12,
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlotsGridMobile: {
    gap: 6,
  },
  timeSlotButton: {
    height:42,
    width:100,
    backgroundColor: '#131313',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E8EAED3B',
    margin:14,
    // marginLeft:20,
    alignItems: 'center',
    marginBottom: 4,
  },
  timeSlotButtonMobile: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    minWidth: 70,
    marginBottom: 6,
  },
  timeSlotButtonSelected: {
    backgroundColor: '#FFE489',
    
  },
  timeSlotText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-400',
  },
  timeSlotTextMobile: {
    fontSize: 12,
  },
  timeSlotTextSelected: {
    color: '#000',
  },
  timezoneList: {
    maxHeight: 300,
  },
  timezoneItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    
  },
  timezoneItemMobile: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  timezoneItemSelected: {
    // backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  timezoneItemText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-400',
  },
  timezoneItemTextMobile: {
    fontSize: 14,
  },
  timezoneItemTextSelected: {
    color: '#FFE489',
    fontFamily: 'Poppins-600',
  },
  timezoneDropdownTitle: {
    color: '#F1F1F1',
    fontSize: 16,
    fontFamily: 'Poppins-600',
    margin: 20,
  },
  timezoneDropdownTitleMobile: {
    fontSize: 12,
  },
  specificationsSection: {
    padding:40,
    marginBottom: 28,
  },
  specificationsSectionMobile: {
    marginBottom: 16,
  },
  specificationsInput: {
    backgroundColor: '#191919',
    borderRadius: 8,
    padding: 24,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-300',
    textAlignVertical: 'top',
    minHeight: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 228, 137, 0.2)',
    // borderStyle:'none'
  },
  specificationsInputMobile: {
    fontSize: 14,
    padding: 10,
    minHeight: 80,
  },
  termsSection: {
    marginBottom: 80,
  },
  termsSectionMobile: {
    marginBottom: 12,
  },
  termsText: {
    color: '#e4e4e4',
    fontSize: 16,
    fontFamily: 'Poppins-300',
    textAlign: 'center',
    // lineHeight: 20,
  },
  termsTextMobile: {
    fontSize: 12,
    lineHeight: 18,
  },
  termsLink: {
    fontSize: 16,
    fontFamily: 'Poppins-500',
    color: '#0FFFF6',
    textDecorationLine: 'underline',
  },
  termsLinkMobile: {
    fontSize: 12,

  },
  disclaimerSection: {
    margin: 60,
  },
  disclaimerSectionMobile: {
    marginBottom: 24,
  },
  disclaimerText: {
    color: 'rgba(255, 255, 255, 0.67)',
    fontSize: 16,
    fontFamily: 'Poppins-400',
    textAlign: 'center',
    lineHeight: 16,
  },
  disclaimerTextMobile: {
    fontSize: 10,
    lineHeight: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
    justifyContent:'flex-end',
    alignItems:'flex-end',
    // paddingTop: 16,
    // borderTopWidth: 1,
    // borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionButtonsMobile: {
    gap: 12,
    paddingTop: 12,
  },
  cancelButton: {
    // flex: 1,
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    // paddingVertical: 12,
    // borderRadius: 8,
    // alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cancelButtonMobile: {
    // paddingVertical: ,
  },
  cancelButtonText: {
    textDecorationLine: 'underline',
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-500',
    paddingHorizontal:10,
    paddingVertical:10,
  },
  cancelButtonTextMobile: {
    fontSize: 14,
    paddingHorizontal:4,
    paddingVertical:4,
  },
  confirmButton: {
    // flex: 1,
    backgroundColor: '#191A1C',
    paddingVertical: 22,
    paddingHorizontal:60,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonMobile: {
    paddingVertical: 14,
    paddingHorizontal:30,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-800',
  },
  confirmButtonTextMobile: {
    fontSize: 14,
  },
});

export default BookAppointmentModal;

