import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const ConfirmSymbol = ({size, style}) => {
  const confirmIcon = require('../images/confirm-icon.png');
  const dynamicStyle = {
    confirmSymbolImage: {
      width: size,
      height: size,
    },
  };
  return (
    <View style={[styles.confirmSymbol, style]}>
      <Image source={confirmIcon} style={[dynamicStyle.confirmSymbolImage]} />
    </View>
  );
};

const styles = StyleSheet.create({
  confirmSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ConfirmSymbol;