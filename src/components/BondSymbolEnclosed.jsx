import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import BondSymbol from './BondSymbol';

const BondSymbolEnclosed = ({style, size}) => {
    const dynamicStyle = {
        bondSymbolEnclosed: {
            width: size,
            height: size,
        },
    };
  return (
    <TouchableOpacity style={[styles.bondSymbolEnclosed, dynamicStyle.bondSymbolEnclosed, style]}>
        <BondSymbol size={'60%'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bondSymbolEnclosed: {
    borderRadius: 50,
    alignItems: 'center',   
    justifyContent: 'center',
  },
});
export default BondSymbolEnclosed;