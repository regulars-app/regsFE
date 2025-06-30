import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import GlassCard from '../components/GlassCard';

const mapImage = require('../images/map.png');

const HomeScreen = () => (
  <ImageBackground source={mapImage} style={styles.bg} resizeMode="cover">
    <View style={styles.centered}>
      <GlassCard>
        <Text style={styles.text}>test of the glass card</Text>
        <Text style={styles.text}>test of the glass card</Text>
        <Text style={styles.text}>test of the glass card</Text>
        <Text style={styles.text}>test of the glass card</Text>
        <Text style={styles.text}>test of the glass card</Text>
      </GlassCard>
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default HomeScreen;