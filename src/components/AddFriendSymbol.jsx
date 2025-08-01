import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const AddFriendSymbol = ({size}) => {
  const addFriendIcon = require('../images/add-friend-icon.png');
  const dynamicStyles = {
    addFriendSymbol: {
      width: size,
      height: size,
    },
  }
  return (
      <View style={[styles.addFriendSymbol, dynamicStyles.addFriendSymbol]}>
        <Image source={addFriendIcon} style={styles.addFriendSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  addFriendSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addFriendSymbolImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});

export default AddFriendSymbol;