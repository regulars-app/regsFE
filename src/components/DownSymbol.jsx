import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const DownSymbol = ({ style, size }) => {
  const downIcon = require('../images/down-icon.png');
  const dynamicStyles = {
    downSymbol: {
      width: size,
      height: size,
    }, 
  };
  return (
    <View style={[styles.downSymbol, style, dynamicStyles.downSymbol]}>
      <Image source={downIcon} style={styles.downSymbolImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  downSymbol: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  downSymbolImage: {
    width:'80%',
    height: '80%',
  },
});

export default DownSymbol;