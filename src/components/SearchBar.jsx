import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = () => (
  <View style={styles.container}>
    <Ionicons name="menu" size={22} color="#888" style={styles.icon} />
    <TextInput
      style={styles.input}
      placeholder="Search"
      placeholderTextColor="#888"
    />
    <Ionicons name="search" size={22} color="#888" style={styles.icon} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginVertical: 8,
  },
  icon: {
    marginHorizontal: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    marginHorizontal: 8,
  },
});

export default SearchBar;
