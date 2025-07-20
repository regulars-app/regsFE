import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const CountdownSymbol = ({size}) => {
  const countdownIcon = require('../images/countdown-icon.png');
  const dynamicStyles = {
    countdownSymbol: {
      width: size,
      height: size,
    }
  }
  return (
      <View style={[styles.countdownSymbol, dynamicStyles.countdownSymbol]}>
        <Image source={countdownIcon} style={styles.countdownSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  countdownSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default CountdownSymbol;