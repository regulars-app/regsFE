import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const SearchSymbol = () => {
  const searchIcon = require('../images/search-icon.png');
  return (
    <View style={styles.searchSymbol}>
      <Image source={searchIcon} style={styles.searchSymbolImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSymbolImage: {
    width: 20,
    height: 20,
  },
});

export default SearchSymbol;