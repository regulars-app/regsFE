import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const AddSymbol = ({style}) => {
  const addIcon = require('../images/add-icon.png');
  return (
      <View style={[styles.addSymbol, style]}>
        <Image source={addIcon} style={styles.addSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  addSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  addSymbolImage: {
    width:'70%',
    height: '70%',
  },
});

export default AddSymbol;