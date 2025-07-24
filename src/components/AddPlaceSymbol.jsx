import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const AddPlaceSymbol = ({size, style}) => {
  const addPlaceIcon = require('../images/add-place-icon.png');
  const dynamicStyle = {
    addPlaceSymbolImage: {
      width: size,
      height: size,
    },
  };
  return (
    <View style={[styles.addPlaceSymbol, style]}>
      <Image source={addPlaceIcon} style={[dynamicStyle.addPlaceSymbolImage]} />
    </View>
  );
};

const styles = StyleSheet.create({
  addPlaceSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddPlaceSymbol;