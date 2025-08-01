import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import SearchBar from '../components/SearchBar';
import PlacesView from '../components/PlacesView';

const PlacesPopup = ({onClose}) => {

    const places = [
        { name: 'Pani\'s house',
          myPlace: true,
          group: 'group1',
         },
        { name: 'Pani\'s house',
          myPlace: true,
          group: 'group1',
         },
        { name: 'Pani\'s house',
          myPlace: false,
          group: 'group2',
         },
        { name: 'Pani\'s house',
          myPlace: false,
          group: 'group1',
         },
        { name: 'Pani\'s house',
          myPlace: true,
          group: null,
         },
        { name: 'Pani\'s house',
          myPlace: false,
          group: 'group1',
         },
        { name: 'Pani\'s house',
          myPlace: false,
          group: 'group1',
         },
        { name: 'Pani\'s house',
          myPlace: true,
          group: null,
         },
        { name: 'Pani\'s house',
          myPlace: false,
          group: 'group1',
         },
      ];

    return (
        <View style={styles.container}>
            <SearchBar style={styles.searchBar} />
            <PlacesView places={places} style={styles.placesView} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    searchBar: {
        marginBottom: 30,
    },
    placesView: {
        minWidth: '100%',
        maxHeight: 620,
        marginBottom: 20,
    },
});

export default PlacesPopup; 