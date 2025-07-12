import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const UnconfirmedSymbol = () => {
  const unconfirmedIcon = require('../images/unconfirmed-icon.png');
  return (
      <View style={styles.unconfirmedSymbol}>
        <Image source={unconfirmedIcon} style={styles.unconfirmedSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  unconfirmedSymbol: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  unconfirmedSymbolImage: {
    width:'70%',
    height: '70%',
  },
});

export default UnconfirmedSymbol;