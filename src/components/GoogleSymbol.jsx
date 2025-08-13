import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const GoogleSymbol = ({style, size}) => {
  const googleIcon = require('../images/google-icon.png');
  const dynamicStyles = {
    googleSymbol: {
      width: size,
      height: size,
    },
  };
  return (
      <View style={[styles.googleSymbol, dynamicStyles.googleSymbol, style]}>
        <Image source={googleIcon} style={styles.googleSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  googleSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleSymbolImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});

export default GoogleSymbol;