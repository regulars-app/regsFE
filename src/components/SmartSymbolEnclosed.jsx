import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import SmartSymbol from './SmartSymbol';

const SmartSymbolEnclosed = ({style, size}) => {
    const dynamicStyle = {
        smartSymbolEnclosed: {
            width: size,
            height: size,
        },
    };
  return (
    <TouchableOpacity style={[styles.smartSymbolEnclosed, dynamicStyle.smartSymbolEnclosed, style]}>
        <SmartSymbol size={'60%'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
export default SmartSymbolEnclosed;