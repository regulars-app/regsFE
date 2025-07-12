import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import DiarySymbol from './DiarySymbol';

const DiarySymbolEnclosed = ({style, size, diaryScore, showScore}) => {
    const dynamicStyle = {
        diarySymbolEnclosed: {
            width: size,
            height: size,
        },
    };
  return (
    <View style={[styles.diarySymbolEnclosedContainer, style]}>
    <View style={[styles.diarySymbolEnclosed, dynamicStyle.diarySymbolEnclosed]}>
        <DiarySymbol size={'60%'} />
    </View>
    {showScore && <Text style={styles.diaryScoreText}>{diaryScore}</Text>}
  </View>
  );
};

const styles = StyleSheet.create({
  diarySymbolEnclosedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
    diarySymbolEnclosed: {
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
  diaryScoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6E6E6E',
  },
});
export default DiarySymbolEnclosed;