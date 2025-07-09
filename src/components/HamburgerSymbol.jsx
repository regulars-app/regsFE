import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const HamburgerSymbol = () => {
  const hamburgerIcon = require('../images/hamburger-icon.png');
  return (
    <View style={styles.hamburgerSymbol}>
      <Image source={hamburgerIcon} style={styles.hamburgerSymbolImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  hamburgerSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hamburgerSymbolImage: {
    width: 20,
    height: 15,
  },
});

export default HamburgerSymbol;