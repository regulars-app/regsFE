import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const MoreSymbol = ({size, style}) => {
  const moreIcon = require('../images/more-icon.png');
  const dynamicStyle = {
    moreSymbolImage: {
      width: size,
      height: size,
    },
  };
  return (
    <View style={[styles.moreSymbol, style]}>
      <Image source={moreIcon} style={[dynamicStyle.moreSymbolImage]} />
    </View>
  );
};

const styles = StyleSheet.create({
    moreSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MoreSymbol;