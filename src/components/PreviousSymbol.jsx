import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const PreviousSymbol = ({ style, size }) => {
  const previousIcon = require('../images/previous-icon.png');
  const dynamicStyles = {
    previousSymbol: {
      height: size,
      width: size/2,
    },
  };
  return (
    <View style={[styles.previousSymbol, style, dynamicStyles.previousSymbol]}>
        <Image source={previousIcon} style={styles.previousSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  previousSymbol: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  previousSymbolImage: {
    width:'80%',
    height: '80%',
  },
});

export default PreviousSymbol;