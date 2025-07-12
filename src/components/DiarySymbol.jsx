import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const DiarySymbol = ({size}) => {
    const dynamicStyle = {
        diarySymbol: {
            width: size,
            height: size,
        },
    };
  const diaryIcon = require('../images/diary-icon.png');
  return (
      <View style={[styles.diarySymbol, dynamicStyle.diarySymbol]}>
        <Image source={diaryIcon} style={styles.diarySymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  diarySymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diarySymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default DiarySymbol;