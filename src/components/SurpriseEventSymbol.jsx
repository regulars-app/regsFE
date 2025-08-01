import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const SurpriseEventSymbol = ({size}) => {
    const dynamicStyle = {
        surpriseEventSymbol: {
            width: size,
            height: size,
        },
    };
  const surpriseEventIcon = require('../images/surprise-event-icon.png');
  return (
      <View style={[styles.surpriseEventSymbol, dynamicStyle.surpriseEventSymbol]}>
        <Image source={surpriseEventIcon} style={styles.surpriseEventSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  surpriseEventSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  surpriseEventSymbolImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default SurpriseEventSymbol;