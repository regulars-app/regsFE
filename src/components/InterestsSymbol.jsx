import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const InterestsSymbol = ({size}) => {
  const interestsIcon = require('../images/interests-icon.png');
  const dynamicStyles = {
    interestsSymbol: {
      width: size,
      height: size,
    },
  }
  return (
      <View style={[styles.interestsSymbol, dynamicStyles.interestsSymbol]}>
        <Image source={interestsIcon} style={styles.interestsSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  interestsSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
    interestsSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default InterestsSymbol;