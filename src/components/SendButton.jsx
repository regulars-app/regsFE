import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import SendSymbol from './SendSymbol';

const SendButton = ({style, size}) => {
    const dynamicStyle = {
        sendButton: {
            width: size,
            height: size,
        },
    };
  return (
    <TouchableOpacity style={[styles.sendButton, dynamicStyle.sendButton, style]}>
      <SendSymbol size={size/2}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sendButton: {
    backgroundColor: '#F2FFF6',
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
export default SendButton;