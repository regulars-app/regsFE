import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const EditSymbol = ({size}) => {
  const editIcon = require('../images/edit-icon.png');
  const dynamicStyles = {
    editSymbol: {
      width: size,
      height: size,
    },
  };
  return (
      <View style={[styles.editSymbol, dynamicStyles.editSymbol]}>
        <Image source={editIcon} style={styles.editSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  editSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default EditSymbol;