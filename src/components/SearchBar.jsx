import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import GlassCard from './GlassCard';
import HamburgerSymbol from './HamburgerSymbol';
import SearchSymbol from './SearchSymbol';

const SearchBar = ({style}) => (
  <GlassCard style={[styles.glassCard, style]}>
    <View style={styles.container}>
      <TouchableOpacity>
        <HamburgerSymbol style={styles.hamburgerSymbol}/>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#888"
      />
      <TouchableOpacity>
        <SearchSymbol style={styles.searchSymbol}/>
      </TouchableOpacity>
    </View>
  </GlassCard>
);

const styles = StyleSheet.create({
  glassCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '250',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 6,
    paddingBottom: 6,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: '#6E6E6E',
    marginHorizontal: 8,
  },
  hamburgerSymbol: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  searchSymbol: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default SearchBar;
