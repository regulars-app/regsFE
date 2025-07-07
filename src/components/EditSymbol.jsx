import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const EditSymbol = () => {
  const editIcon = require('../images/edit-icon.png');
  return (
      <View style={styles.editSymbol}>
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
    width:15,
    height: 15,
  },
});

export default EditSymbol;