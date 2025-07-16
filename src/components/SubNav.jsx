import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SubNav = ({ tabs, onTabPress, initialActiveIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const handleTabPress = (index, path) => {
    setActiveIndex(index);
    if (onTabPress) {
      onTabPress(path, index);
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tabContainer}
          onPress={() => handleTabPress(index, tab.path)}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.tabText,
            activeIndex === index && styles.activeTabText
          ]}>
            {tab.title}
          </Text>
          <View style={[
            styles.underline,
            activeIndex === index && styles.activeUnderline
          ]} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: '80%',
    gap:20,
  },
  tabContainer: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6E6E6E',
    marginBottom: 8,
  },
  activeTabText: {
    fontWeight: '600',
    color: '#333',
  },
  underline: {
    height: 2,
    width: 60,
    backgroundColor: '#6E6E6E',
  },
  activeUnderline: {
    backgroundColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default SubNav;