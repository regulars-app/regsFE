import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
import GlassCard from './GlassCard';
import NextSymbol from './NextSymbol';
import PreviousSymbol from './PreviousSymbol';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const YEAR_RANGE = 20; // years before and after current year

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month, year) {
  return new Date(year, month, 1).getDay();
}

const Calendar = ({style, dayCellWidth = `${100 / 7}%`}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);
  const [pickerMode, setPickerMode] = useState(null); // 'month' | 'year' | null
  const [monthPickerHeight, setMonthPickerHeight] = useState(null);
  const [yearPickerHeight, setYearPickerHeight] = useState(null);
  const [monthItemHeight, setMonthItemHeight] = useState(40);
  const [yearItemHeight, setYearItemHeight] = useState(40);

  // Refs for scroll views
  const monthScrollRef = useRef(null);
  const yearScrollRef = useRef(null);

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleSelectDate = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  // Build days grid
  const daysArray = [];
  for (let i = 0; i < firstDay; i++) {  
    daysArray.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d);
  }

  // Build year options
  const thisYear = today.getFullYear();
  const years = [];
  for (let y = thisYear - YEAR_RANGE; y <= thisYear + YEAR_RANGE; y++) {
    years.push(y);    
  }

  // Month/year picker handlers
  const handleMonthPill = () => setPickerMode('month');
  const handleYearPill = () => setPickerMode('year');
  const handleSelectMonth = (i) => {
    setCurrentMonth(i);
    setPickerMode(null);
  };
  const handleSelectYear = (y) => {
    setCurrentYear(y);
    setPickerMode(null);
  };
  const handleCancelPicker = () => setPickerMode(null);

  // Scroll to center current month/year when picker opens
  useEffect(() => {
    // Separate adjustments for month and year pickers (tweak as needed)
    const visualAdjustMonth = 28;
    const visualAdjustYear = 80;
    if (pickerMode === 'month' && monthScrollRef.current && monthPickerHeight && monthItemHeight) {
      const offset = Math.max(0, currentMonth * monthItemHeight - (monthPickerHeight / 2) + (monthItemHeight / 2) + visualAdjustMonth);
      setTimeout(() => {
        monthScrollRef.current.scrollTo({ y: offset, animated: true });
      }, 100);
    } else if (pickerMode === 'year' && yearScrollRef.current && yearPickerHeight && yearItemHeight) {
      const thisYear = today.getFullYear();
      const startYear = thisYear - YEAR_RANGE;
      const index = currentYear - startYear;
      const offset = Math.max(0, index * yearItemHeight - (yearPickerHeight / 2) + (yearItemHeight / 2) + visualAdjustYear);
      setTimeout(() => {
        yearScrollRef.current.scrollTo({ y: offset, animated: true });
      }, 100);
    }
  }, [pickerMode, currentMonth, currentYear, monthPickerHeight, yearPickerHeight, monthItemHeight, yearItemHeight]);

  // Reset picker heights when pickerMode changes
  useEffect(() => {
    if (pickerMode === 'month') setMonthPickerHeight(null);
    if (pickerMode === 'year') setYearPickerHeight(null);
  }, [pickerMode]);

  const dynamicStyles = {
    dayCell: {
      width: dayCellWidth,
    },
  };

  return (
    <GlassCard style={[styles.glassCard, style]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.pillRow}>
            <TouchableOpacity onPress={handleMonthPill} style={styles.pillBtn} activeOpacity={0.7}>
              <Text style={styles.pillText}>{MONTHS[currentMonth]}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleYearPill} style={styles.pillBtn} activeOpacity={0.7}>
              <Text style={styles.pillText}>{currentYear}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerArrows}>
            <TouchableOpacity onPress={handlePrevMonth} style={styles.arrowBtn}>
              <PreviousSymbol size={35} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextMonth} style={styles.arrowBtn}>
              <NextSymbol size={35} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Days of week */}
        {pickerMode === null && (
          <View style={styles.daysRow}>
            {DAYS.map((day) => (
              <Text key={day} style={styles.dayName}>{day}</Text>
            ))}
          </View>
        )}
        {/* Main content: calendar grid or picker */}
        {pickerMode === null && (
          <View style={styles.daysGrid}>
            {daysArray.map((day, idx) => {
              if (day === null) {
                return <View key={idx} style={[styles.dayCell, dynamicStyles.dayCell]} />;
              }
              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();
              const isSelected =
                selectedDate &&
                day === selectedDate.getDate() &&
                currentMonth === selectedDate.getMonth() &&
                currentYear === selectedDate.getFullYear();
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.dayCell, dynamicStyles.dayCell, isSelected && styles.selectedDayCell]}
                  onPress={() => handleSelectDate(day)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.dayNumber,
                      isToday && styles.todayNumber,
                      isSelected && styles.selectedDayNumber,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        {pickerMode === 'month' && (
          <View style={[styles.pickerOverlay]}>
            <Text style={styles.pickerTitle}>Select Month</Text>
            <View
              style={styles.pickerListWrap}
              onLayout={e => setMonthPickerHeight(e.nativeEvent.layout.height)}
            >
              <ScrollView
                ref={monthScrollRef}
                style={styles.pickerList}
                contentContainerStyle={{alignItems: 'center'}}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
              >
                {MONTHS.map((m, i) => {
                  const isSelected = currentMonth === i;
                  const isCurrent = i === today.getMonth() && currentYear === today.getFullYear();
                  return (
                    <TouchableOpacity
                      key={m}
                      onPress={() => handleSelectMonth(i)}
                      style={[
                        styles.pickerOption,
                        isSelected && styles.pickerOptionSelected,
                        { height: 40, justifyContent: 'center' },
                      ]}
                      {...(i === 0 ? { onLayout: e => setMonthItemHeight(e.nativeEvent.layout.height) } : {})}
                    >
                      <Text style={[
                        styles.pickerOptionText,
                        isSelected && styles.pickerOptionTextSelected,
                        isCurrent && styles.pickerOptionTextCurrent,
                      ]}>
                        {m}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <TouchableOpacity onPress={handleCancelPicker} style={styles.pickerCancelBtn}>
              <Text style={styles.pickerCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
        {pickerMode === 'year' && (
          <View style={styles.pickerOverlay}>
            <Text style={styles.pickerTitle}>Select Year</Text>
            <View
              style={styles.pickerListWrap}
              onLayout={e => setYearPickerHeight(e.nativeEvent.layout.height)}
            >
              <ScrollView
                ref={yearScrollRef}
                style={styles.pickerList}
                contentContainerStyle={{alignItems: 'center'}}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
              >
                {years.map((y, idx) => {
                  const isSelected = currentYear === y;
                  const isCurrent = y === today.getFullYear();
                  return (
                    <TouchableOpacity
                      key={y}
                      onPress={() => handleSelectYear(y)}
                      style={[
                        styles.pickerOption,
                        isSelected && styles.pickerOptionSelected,
                        { height: 40, justifyContent: 'center' },
                      ]}
                      {...(idx === 0 ? { onLayout: e => setYearItemHeight(e.nativeEvent.layout.height) } : {})}
                    >
                      <Text style={[
                        styles.pickerOptionText,
                        isSelected && styles.pickerOptionTextSelected,
                        isCurrent && styles.pickerOptionTextCurrent,
                      ]}>
                        {y}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <TouchableOpacity onPress={handleCancelPicker} style={styles.pickerCancelBtn}>
              <Text style={styles.pickerCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  glassCard: {
    width: '90%',
    height: 400,
    borderRadius: 20,
    padding: 0,
  },
  container: {
    width: '100%',
    height: '100%',
    padding: 16,
    backgroundColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 4,
  },
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pillBtn: {
    backgroundColor: 'rgba(25, 118, 210, 0.10)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginHorizontal: 2,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  headerArrows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  arrowBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    marginTop: 2,
  },
  dayName: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    color: '#888',
    fontSize: 15,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 2,
  },
  dayCell: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  dayNumber: {
    fontSize: 20,
    color: '#222',
    fontWeight: '400',
  },
  todayNumber: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  selectedDayCell: {
    backgroundColor: 'rgba(25, 118, 210, 0.12)',
    borderRadius: 100,
  },
  selectedDayNumber: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  pickerOverlay: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    flex: 1,
    gap: 15,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  pickerListWrap: {
    width: '100%',
    maxHeight: 180,
    marginBottom: 10,
  },
  pickerList: {
    width: '100%',
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    paddingVertical: 6,
  },
  pickerOption: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 2,
    alignItems: 'center',
  },
  pickerOptionSelected: {
    backgroundColor: 'rgba(25, 118, 210, 0.12)',
  },
  pickerOptionText: {
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
  },
  pickerOptionTextSelected: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  pickerOptionTextCurrent: {
    color: '#1976D2',
  },
  pickerCancelBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F9C7C5',
   
  },
  pickerCancelText: {
    color: '#6E6E6E',
    fontSize: 16,
  },
});

export default Calendar;
