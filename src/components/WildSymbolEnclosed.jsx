import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import WildSymbol from './WildSymbol';

const WildSymbolEnclosed = ({style, size, wildScore, showScore}) => {
    const dynamicStyle = {
        wildSymbolEnclosed: {
            width: size,
            height: size,
        },
    };
  return (
    <View style={[styles.wildSymbolEnclosedContainer, style]}>
    <View style={[styles.wildSymbolEnclosed, dynamicStyle.wildSymbolEnclosed]}>
        <WildSymbol size={'60%'} />
    </View>
    {showScore && <Text style={styles.wildScoreText}>{wildScore}</Text>}
  </View>
  );
};

const styles = StyleSheet.create({
  wildSymbolEnclosedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
    wildSymbolEnclosed: {
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
  wildScoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6E6E6E',
  },
});
export default WildSymbolEnclosed;