import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const NewMeetupSymbol = ({size, style}) => {
  const newMeetupIcon = require('../images/new-meetup-icon.png');
  const dynamicStyle = {
    newMeetupSymbol: {
      width: size,
      height: size,
    },
  };
  return (
    <View style={[styles.newMeetupSymbol, dynamicStyle.newMeetupSymbol, style]}>
      <Image source={newMeetupIcon} style={styles.newMeetupSymbolImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  newMeetupSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newMeetupSymbolImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default NewMeetupSymbol;