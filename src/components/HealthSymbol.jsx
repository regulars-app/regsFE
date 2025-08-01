import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const HealthSymbol = ({size}) => {
    const dynamicStyle = {
        healthSymbol: {
            width: size,
            height: size,
        },
    };
  const healthIcon = require('../images/health-icon.png');
  return (
      <View style={[styles.healthSymbol, dynamicStyle.healthSymbol]}>
        <Image source={healthIcon} style={styles.healthSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  healthSymbol: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  healthSymbolImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default HealthSymbol;