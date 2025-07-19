import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const CancelSymbol = ({size}) => {
  const cancelIcon = require('../images/cancel-icon.png');
  const dynamicStyles = {
    cancelSymbol: {
      width: size,
      height: size,
    },
  };
  return (
      <View style={[styles.cancelSymbol, dynamicStyles.cancelSymbol]}>
        <Image source={cancelIcon} style={styles.cancelSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  cancelSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default CancelSymbol;