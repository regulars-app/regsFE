import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const ConfirmSymbol = () => {
  const confirmIcon = require('../images/confirm-icon.png');
  return (
    <View style={styles.confirmSymbol}>
      <Image source={confirmIcon} style={styles.confirmSymbolImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  confirmSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmSymbolImage: {
    width: 20,
    height: 20,
  },
});

export default ConfirmSymbol;