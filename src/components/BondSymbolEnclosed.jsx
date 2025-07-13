import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import BondSymbol from './BondSymbol';

const BondSymbolEnclosed = ({style, size, bondScore, showScore}) => {
    const dynamicStyle = {
        bondSymbolEnclosed: {
            width: size,
            height: size,
        },
    };
  return (
    <View style={[styles.bondSymbolEnclosed, dynamicStyle.bondSymbolEnclosed, style]}>
        <BondSymbol size={'60%'} />
        {showScore && <Text style={styles.bondScoreText}>{bondScore}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  bondSymbolEnclosed: {
    borderRadius: 50,
    alignItems: 'center',   
    justifyContent: 'center',
  },
  bondScoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6E6E6E',
  },
});
export default BondSymbolEnclosed;