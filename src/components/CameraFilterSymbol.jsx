import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const CameraFilterSymbol = ({size}) => {
    const dynamicStyle = {
        cameraFilterSymbol: {
            width: size,
            height: size,
        },
    };
  const cameraFilterIcon = require('../images/camera-filter-icon.png');
  return (
      <View style={[styles.cameraFilterSymbol, dynamicStyle.cameraFilterSymbol]}>
        <Image source={cameraFilterIcon} style={styles.cameraFilterSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  cameraFilterSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraFilterSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default CameraFilterSymbol;