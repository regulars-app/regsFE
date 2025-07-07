import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const ConfirmedSymbol = () => {
  const confirmedIcon = require('../images/confirmed-icon.png');
  return (
      <View style={styles.confirmedSymbol}>
        <Image source={confirmedIcon} style={styles.confirmedSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  confirmedSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmedSymbolImage: {
    width:15,
    height: 15,
  },
});

export default ConfirmedSymbol;