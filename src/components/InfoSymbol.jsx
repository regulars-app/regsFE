import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const InfoSymbol = () => {
  const infoIcon = require('../images/info-icon.png');
  return (
      <View style={styles.infoSymbol}>
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
    width:15,
    height: 15,
  },
});

export default InfoSymbol;