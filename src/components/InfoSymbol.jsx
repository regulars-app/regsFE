import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const InfoSymbol = ({size}) => {
  const infoIcon = require('../images/info-icon.png');
  const dynamicStyles = {
    infoSymbol: {
      width: size,
      height: size,
    }
  };

  return (
      <View style={[styles.infoSymbol, dynamicStyles.infoSymbol]}>
        <Image source={infoIcon} style={styles.infoSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  infoSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default InfoSymbol;