import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const GlassCard = ({ children, style }) => (
  <View style={[styles.wrapper, style]}>
    <BlurView
      style={StyleSheet.absoluteFill}
      blurType="light"
      blurAmount={24} // Increased blur
      reducedTransparencyFallbackColor="white"
    />
    <View style={styles.whiteOverlay} />
    <View style={styles.content}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      },
      android: {
        elevation: 0.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
      },
    }),
  },
  whiteOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.28)', // Lower opacity for more glass
  },
  content: {
    position: 'relative',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GlassCard;