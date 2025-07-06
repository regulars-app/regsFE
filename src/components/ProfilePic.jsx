import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const groupPic = require('../images/profilePic.png'); // Use your image

const ProfilePic = ({ footer, style, size = 80 }) => { 
  const dynamicStyles = {
    outer: {
      width: size,
      height: size,
    },
    footerText: {
      fontSize: Math.round(size * 0.2), 
    }
 };

return (
  <View style={[styles.container, style]}>
    <View style={[styles.outer, dynamicStyles.outer]}>
      <Image
        source={groupPic}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
    {footer ? (
      <View style={styles.footer}>
        <Text style={[styles.footerText, dynamicStyles.footerText]}>{footer}</Text>
      </View>
    ) : null}
  </View>
);

};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  outer: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 2,
    alignSelf: 'center',
    margin: 0,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    objectFit: 'cover'
  },
  footer: {
    marginTop: -7,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  footerText: {
    fontWeight: '500',
    color: '#6E6E6E',
  },
});

export default ProfilePic;
