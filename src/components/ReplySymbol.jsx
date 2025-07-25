import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const ReplySymbol = ({size, style}) => {
  const replyIcon = require('../images/reply-icon.png');
  const dynamicStyles = {
    replySymbol: {
      width: size,
      height: size,
    },
  }
  return (
      <View style={[styles.replySymbol, dynamicStyles.replySymbol, style]}>
        <Image source={replyIcon} style={styles.replySymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  replySymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
    replySymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default ReplySymbol;