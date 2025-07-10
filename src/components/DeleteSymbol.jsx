import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const DeleteSymbol = ({size, style}) => {
  const deleteIcon = require('../images/delete-icon.png');
  const dynamicStyle = {
    deleteSymbolImage: {
      width: size,
      height: size,
    },
  };
  return (
      <View style={[styles.deleteSymbol, dynamicStyle.deleteSymbol, style]}>
        <Image source={deleteIcon} style={dynamicStyle.deleteSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  deleteSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  deleteSymbolImage: {
    width:'70%',
    height: '70%',
  },
});

export default DeleteSymbol;