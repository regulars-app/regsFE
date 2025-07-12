import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import WildSymbol from './WildSymbol';

const WildSymbolEnclosed = ({style, size}) => {
    const dynamicStyle = {
        wildSymbolEnclosed: {
            width: size,
            height: size,
        },
    };
  return (
    <TouchableOpacity style={[styles.wildSymbolEnclosed, dynamicStyle.wildSymbolEnclosed, style]}>
        <WildSymbol size={'60%'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
export default WildSymbolEnclosed;