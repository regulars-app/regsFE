import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const SmartSymbol = ({size}) => {
    const dynamicStyle = {
        smartSymbol: {
            width: size,
            height: size,
        },
    };
  const smartIcon = require('../images/smart-icon.png');
  return (
      <View style={[styles.smartSymbol, dynamicStyle.smartSymbol]}>
        <Image source={smartIcon} style={styles.smartSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  smartSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smartSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default SmartSymbol;