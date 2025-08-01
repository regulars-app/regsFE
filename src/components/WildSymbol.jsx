import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const WildSymbol = ({size}) => {
    const dynamicStyle = {
        wildSymbol: {
            width: size,
            height: size,
        },
    };
  const wildIcon = require('../images/wild-icon.png');
  return (
      <View style={[styles.wildSymbol, dynamicStyle.wildSymbol]}>
        <Image source={wildIcon} style={styles.wildSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  wildSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wildSymbolImage: {
    width: '95%',
    height: '95%',
    resizeMode: 'contain',
  },
});

export default WildSymbol;