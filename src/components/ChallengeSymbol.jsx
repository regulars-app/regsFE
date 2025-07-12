import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const ChallengeSymbol = ({size}) => {
    const dynamicStyle = {
        challengeSymbol: {
            width: size,
            height: size,
        },
    };
  const challengeIcon = require('../images/challenge-icon.png');
  return (
      <View style={[styles.challengeSymbol, dynamicStyle.challengeSymbol]}>
        <Image source={challengeIcon} style={styles.challengeSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  challengeSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default ChallengeSymbol;