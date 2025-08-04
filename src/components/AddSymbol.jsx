import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const AddSymbol = ({style, size}) => {
  const addIcon = require('../images/add-icon.png');
  const dynamicStyles = {
    addSymbol: {
      width: size,
      height: size,
    },
  };
  return (
      <View style={[styles.addSymbol, dynamicStyles.addSymbol, style]}>
        <Image source={addIcon} style={styles.addSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  addSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addSymbolImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});

export default AddSymbol;