import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const CalendarSymbol = ({size}) => {
  const calendarIcon = require('../images/calendar-icon.png');
  const dynamicStyles = {
    calendarSymbol: {
      width: size,
      height: size,
    },
  }
  return (
      <View style={[styles.calendarSymbol, dynamicStyles.calendarSymbol]}>
        <Image source={calendarIcon} style={styles.calendarSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  calendarSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
    calendarSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default CalendarSymbol;