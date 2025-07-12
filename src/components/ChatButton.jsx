import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import ChatSymbol from './ChatSymbol';

const ChatButton = ({style, size}) => {
    const dynamicStyle = {
        chatButton: {
            width: size,
            height: size,
        },
    };
  return (
    <TouchableOpacity style={[styles.chatButton, dynamicStyle.chatButton, style]}>
        <ChatSymbol size={'70%'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatButton: {
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
export default ChatButton;