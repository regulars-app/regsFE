import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const UpSymbol = ({ style, size }) => {
  const upIcon = require('../images/up-icon.png');
  const dynamicStyles = {
      upSymbol: {
      width: size,
      height: size,
    }, 
  };
  return (
    <View style={[styles.upSymbol, style, dynamicStyles.upSymbol]}>
      <Image source={upIcon} style={styles.upSymbolImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  upSymbol: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  upSymbolImage: {
    width:'80%',
    height: '80%',
  },
});

export default UpSymbol;