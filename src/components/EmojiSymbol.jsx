import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const EmojiSymbol = ({style, size}) => {
    const dynamicStyle = {
        emojiSymbol: {
            width: size,
            height: size,
        },
    };
  const emojiIcon = require('../images/emoji-icon.png');
  return (
      <View style={[styles.emojiSymbol, style]}>
        <Image source={emojiIcon} style={[styles.emojiSymbolImage, {width: size, height: size}]} />
      </View>

  );
};

const styles = StyleSheet.create({
  emojiSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiSymbolImage: {
    width:'70%',
    height: '70%',
  },
});

export default EmojiSymbol;