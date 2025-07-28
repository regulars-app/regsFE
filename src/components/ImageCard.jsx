import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const ImageCard = ({ imageURL, footer, width, height, aspectRatio, style }) => {

  const dynamicStyles = {
    outer: {
      width: width,
      height: height ? height : 'auto',
      aspectRatio: aspectRatio ? aspectRatio : 'auto',
    },
 };
  
  return(
  <View style={[styles.container, dynamicStyles.outer, style]}>
    <Image source={{ uri: imageURL }} style={styles.image} />
    {footer && (
      <View style={styles.footerContainer}>
        <Text style={styles.footerText} ellipsizeMode='tail' numberOfLines={1}>{footer}</Text>
      </View>
    )}
  </View>
)};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    margin: 10,
    alignSelf: 'center',
    overflow: 'visible',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
  footerContainer: {
    maxWidth: '60%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
    paddingHorizontal: 20,
  },
  footerText: {
    color: '#6E6E6E',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 10,
  },
}); 

export default ImageCard;