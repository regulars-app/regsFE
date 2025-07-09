import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import AddSymbol from './AddSymbol';

const AddButton = ({style, size}) => {
    const dynamicStyle = {
        addButton: {
            width: size,
            height: size,
        },
    };
  return (
    <TouchableOpacity style={[styles.addButton, dynamicStyle.addButton, style]}>
      <AddSymbol />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
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
export default AddButton;