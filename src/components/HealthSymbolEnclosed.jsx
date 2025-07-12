import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import HealthSymbol from './HealthSymbol';

const HealthSymbolEnclosed = ({style, size}) => {
    const dynamicStyle = {
        healthSymbolEnclosed: {
            width: size,
            height: size,
        },
    };
  return (
    <TouchableOpacity style={[styles.healthSymbolEnclosed, dynamicStyle.healthSymbolEnclosed, style]}>
        <HealthSymbol size={'60%'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
export default HealthSymbolEnclosed;