import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const TextSymbol = ({size}) => {
    const dynamicStyle = {
        textSymbol: {
            width: size,
            height: size,
        },
    };
  const textIcon = require('../images/text-icon.png');
  return (
      <View style={[styles.textSymbol, dynamicStyle.textSymbol]}>
        <Image source={textIcon} style={styles.textSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  textSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default TextSymbol;