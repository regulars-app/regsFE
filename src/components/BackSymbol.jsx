import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const BackSymbol = () => {
  const backIcon = require('../images/back-icon.png');
  return (
      <View style={styles.backSymbol}>
        <Image source={backIcon} style={styles.backSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  backSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  backSymbolImage: {
    width:'60%',
    height: '60%',
  },
});

export default BackSymbol;