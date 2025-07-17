import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const VideoSymbol = ({size}) => {
    const dynamicStyle = {
        videoSymbol: {
            width: size,
            height: size,
        },
    };
  const videoIcon = require('../images/video-icon.png');
  return (
      <View style={[styles.videoSymbol, dynamicStyle.videoSymbol]}>
        <Image source={videoIcon} style={styles.videoSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  videoSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default VideoSymbol;