import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const CameraSettingsSymbol = ({size}) => {
    const dynamicStyle = {
        cameraSettingsSymbol: {
            width: size,
            height: size,
        },
    };
const cameraSettingsIcon = require('../images/camera-settings-icon.png');
  return (
      <View style={[styles.cameraSettingsSymbol, dynamicStyle.cameraSettingsSymbol]}>
        <Image source={cameraSettingsIcon} style={styles.cameraSettingsSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  cameraSettingsSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraSettingsSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default CameraSettingsSymbol;