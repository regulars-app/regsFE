import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const SendSymbol = ({style, size}) => {
   
  const sendIcon = require('../images/send-icon.png');
  const dynamicStyle = {
    sendSymbol: {
      width: size,
      height: size,
    },
  };
  return (
      <View style={[styles.sendSymbol, dynamicStyle.sendSymbol, style]}>
        <Image source={sendIcon} style={styles.sendSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  sendSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendSymbolImage: {
    width:'100%',
    height: '100%',
  },
});

export default SendSymbol;