import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import SettingsView from '../components/SettingsView';
import SearchBar from '../components/SearchBar';

const SettingsPopup = ({onClose}) => {

    const settings = [
        { name: 'Privacy' },
        { name: 'Notifications' },
        { name: 'Language' },
        { name: 'About' },
        { name: 'Privacy' },
        { name: 'Notifications' },
        { name: 'Language' },
        { name: 'About' },
        { name: 'Privacy' },
        { name: 'Notifications' },
        { name: 'Language' },
        { name: 'About' },
        { name: 'Privacy' },
        { name: 'Notifications' },
        { name: 'Language' },
        { name: 'About' },
      ];

    return (
        <View style={styles.container}>
            <SearchBar style={styles.searchBar}/>
            <SettingsView height={600} style={styles.settingsView} settings={settings}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        gap: 20,
    },
    searchBar: {
        marginTop: 20,
    },
    settingsView: {
        marginTop: 20,
        marginBottom: 30,
        minWidth: '95%',
    },
});

export default SettingsPopup; 