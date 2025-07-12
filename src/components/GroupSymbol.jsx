import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const GroupSymbol = ({size}) => {
    const dynamicStyle = {
        groupSymbol: {
            width: size,
            height: size,
        },
    };
  const groupIcon = require('../images/group-icon.png');
  return (
      <View style={[styles.groupSymbol, dynamicStyle.groupSymbol]}>
        <Image source={groupIcon} style={styles.groupSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  groupSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default GroupSymbol;