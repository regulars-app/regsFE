import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const DoubleTickSymbol = () => {
  const doubleTickIcon = require('../images/doubletick-icon.png');
  return (
      <View style={styles.doubleTickSymbol}>
        <Image source={doubleTickIcon} style={styles.doubleTickSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  doubleTickSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  doubleTickSymbolImage: {
    width:'60%',
    height: '60%',
  },
});

export default DoubleTickSymbol;