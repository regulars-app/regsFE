import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const mapThumb = require('../images/map-thumb-placeholder.png'); // Use a placeholder image
const groupPic = require('../images/group-placeholder.png'); // Use a placeholder image

const Stack = () => (
  <View style={styles.container}>
    <Image source={mapThumb} style={styles.map} />
    <View style={styles.info}>
      <Text style={styles.link}>18:00 Thu 25th Nov</Text>
      <Text style={styles.desc}>Bowling and Mission Impossible screening</Text>
      <Text style={styles.desc}>Bring snacks and drinks for the cinema. Total cost will be £25</Text>
      <Text style={styles.desc}>Doable</Text>
      <View style={styles.avatars}>
        {[...Array(5)].map((_, i) => (
          <Image key={i} source={groupPic} style={styles.avatar} />
        ))}
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.suggestBtn}><Text>Suggest</Text></TouchableOpacity>
        <TouchableOpacity style={styles.doableBtn}><Text>Doable ✓</Text></TouchableOpacity>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7FFF7',
    borderRadius: 24,
    padding: 12,
    marginVertical: 8,
    width: 340,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  map: {
    width: '100%',
    height: 100,
    borderRadius: 16,
    marginBottom: 8,
  },
  info: {
    padding: 8,
  },
  link: {
    color: '#1E88E5',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  desc: {
    color: '#333',
    marginBottom: 2,
  },
  avatars: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  suggestBtn: {
    backgroundColor: '#FFF9C4',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginRight: 8,
  },
  doableBtn: {
    backgroundColor: '#E0F7FA',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});

export default Stack; 