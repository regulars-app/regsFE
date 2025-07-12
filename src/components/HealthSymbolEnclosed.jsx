import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import HealthSymbol from './HealthSymbol';

const HealthSymbolEnclosed = ({style, size, healthScore, showScore}) => {
    const dynamicStyle = {
        healthSymbolEnclosed: {
            width: size,
            height: size,
        },
    };
  return (
    <View style={[styles.healthSymbolEnclosedContainer, style]}>
      <View style={[styles.healthSymbolEnclosed, dynamicStyle.healthSymbolEnclosed]}>
          <HealthSymbol size={'60%'} />
      </View>
      {showScore && <Text style={styles.healthScoreText}>{healthScore}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  healthSymbolEnclosedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
    healthSymbolEnclosed: {
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
  healthScoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6E6E6E',
  },
});
export default HealthSymbolEnclosed;