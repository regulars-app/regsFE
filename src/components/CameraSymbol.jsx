import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const CameraSymbol = ({size}) => {
    const dynamicStyle = {
        cameraSymbol: {
            width: size,
            height: size,
        },
    };
  const cameraIcon = require('../images/camera-icon.png');
  return (
      <View style={[styles.cameraSymbol, dynamicStyle.cameraSymbol]}>
        <Image source={cameraIcon} style={styles.cameraSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  cameraSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default CameraSymbol;