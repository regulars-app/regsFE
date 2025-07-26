import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image} from 'react-native';
import BackButton from '../components/BackButton';
import MainButton from '../components/MainButton';
import SearchBar from '../components/SearchBar';

const NewMeetupChoosePlace = () => {

    const mapImage = require('../images/map.png');

    return (
        <View style={styles.container}>
        <Image source={mapImage} style={styles.mapImage} />
        <View style={styles.header}>
          <BackButton size={30} style={styles.backButton} />
          <SearchBar style={styles.searchBar} />
        </View>
        <View style={styles.bodyContent}>

        </View>
        <View style={styles.footer}>
            <MainButton text="Confirm" color="green" type="confirm" style={styles.confirmButton} />    
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF6F0',
        height: '100%',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 100,
        paddingBottom: 140,
      },
      header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 100,
        alignItems: 'center',
      },
      searchBar: {
        position: 'absolute',
        bottom: 0, 
      },
      footer: {
        position: 'absolute',
        width: '100%',
        height: 140,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
      },
      mapImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: 'cover',
      },
      bodyContent: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
      },
      calendar: {
        height: 380,
      },
      timeRangeContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        marginTop: 20,
      },
      clashView: {
        marginTop: 20,
      },
      backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
      },
      profilePic: {
        position: 'absolute',
        top: 20,
        right: 20,
      },
      meetupName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#6E6E6E',
        position: 'absolute',
        bottom: 10,
      },
      confirmButton: {
        position: 'absolute',
        right: 20,
      },
  });
  
  export default NewMeetupChoosePlace;