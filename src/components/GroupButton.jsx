import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import GroupSymbol from './GroupSymbol';

const GroupButton = ({style, size, onPress}) => {
    const dynamicStyle = {
        groupButton: {
            width: size,
            height: size,
        },
    };
  return (
    <TouchableOpacity style={[styles.groupButton, dynamicStyle.groupButton, style]} onPress={onPress}>
        <GroupSymbol size={'60%'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  groupButton: {
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
export default GroupButton;