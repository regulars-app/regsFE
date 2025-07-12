import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const MeetupSymbol = ({size}) => {
    const dynamicStyle = {
        meetupSymbol: {
            width: size,
            height: size,
        },
    };
  const meetupIcon = require('../images/meetup-icon.png');
  return (
      <View style={[styles.meetupSymbol, dynamicStyle.meetupSymbol]}>
        <Image source={meetupIcon} style={styles.meetupSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  meetupSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  meetupSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default MeetupSymbol;