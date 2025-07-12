import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const ChatSymbol = ({size}) => {
    const dynamicStyle = {
        chatSymbol: {
            width: size,
            height: size,
        },
    };
  const chatIcon = require('../images/chat-icon.png');
  return (
      <View style={[styles.chatSymbol, dynamicStyle.chatSymbol]}>
        <Image source={chatIcon} style={styles.chatSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  chatSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default ChatSymbol;