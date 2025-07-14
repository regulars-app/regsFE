import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const NextSymbol = ({ style, size }) => {
  const nextIcon = require('../images/next-icon.png');
  const dynamicStyles = {
    nextSymbol: {
      width: size,
      height: size,
    }, 
  };
  return (
    <View style={[styles.nextSymbol, style, dynamicStyles.nextSymbol]}>
      <Image source={nextIcon} style={styles.nextSymbolImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  nextSymbol: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextSymbolImage: {
    width:'80%',
    height: '80%',
  },
});

export default NextSymbol;