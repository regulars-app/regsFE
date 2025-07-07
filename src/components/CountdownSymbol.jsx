import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const CountdownSymbol = () => {
  const countdownIcon = require('../images/countdown-icon.png');
  return (
      <View style={styles.countdownSymbol}>
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
    width:15,
    height: 15,
  },
});

export default CountdownSymbol;