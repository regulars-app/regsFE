import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import SmartSymbol from './SmartSymbol';

const SmartSymbolEnclosed = ({style, size, smartScore, showScore}) => {
    const dynamicStyle = {
        smartSymbolEnclosed: {
            width: size,
            height: size,
        },
    };
  return (
    <View style={[styles.smartSymbolEnclosedContainer, style]}>
    <View style={[styles.smartSymbolEnclosed, dynamicStyle.smartSymbolEnclosed]}>
        <SmartSymbol size={'60%'} />
    </View>
    {showScore && <Text style={styles.smartScoreText}>{smartScore}</Text>}
  </View>
  );
};

const styles = StyleSheet.create({
  smartSymbolEnclosedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
    smartSymbolEnclosed: {
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',   
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  smartScoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6E6E6E',
  },
});
export default SmartSymbolEnclosed;