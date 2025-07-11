import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const SendSymbol = ({style}) => {
   
  const sendIcon = require('../images/send-icon.png');
  return (
      <View style={[styles.sendSymbol, style]}>
        <Image source={sendIcon} style={styles.sendSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  sendSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '50%',
  },
  sendSymbolImage: {
    width:'100%',
    height: '100%',
  },
});

export default SendSymbol;