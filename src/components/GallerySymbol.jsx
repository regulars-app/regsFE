import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const GallerySymbol = ({size}) => {
    const dynamicStyle = {
        gallerySymbol: {
            width: size,
            height: size,
        },
    };
  const galleryIcon = require('../images/gallery-icon.png');
  return (
      <View style={[styles.gallerySymbol, dynamicStyle.gallerySymbol]}>
        <Image source={galleryIcon} style={styles.gallerySymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  gallerySymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gallerySymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default GallerySymbol;