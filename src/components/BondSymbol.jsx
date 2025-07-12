import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const BondSymbol = ({size}) => {
    const dynamicStyle = {
        bondSymbol: {
            width: size,
            height: size,
        },
    };
  const bondIcon = require('../images/bond-icon.png');
  return (
      <View style={[styles.bondSymbol, dynamicStyle.bondSymbol]}>
        <Image source={bondIcon} style={styles.bondSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  bondSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bondSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default BondSymbol;