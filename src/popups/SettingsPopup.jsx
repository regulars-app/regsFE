import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import SettingsView from '../components/SettingsView';
import SearchBar from '../components/SearchBar';
import LogoutSymbol from '../components/LogoutSymbol';
import { signOut } from '../Services/auth';
import { useNavigation } from '@react-navigation/native';

const SettingsPopup = ({onClose}) => {
    const navigation = useNavigation();
    
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
            <View style={styles.header}>
                <SearchBar style={styles.searchBar}/>
                <TouchableOpacity style={styles.logoutButton} onPress={() => {
                    signOut();
                    navigation.navigate('SignIn');
                }}>
                    <LogoutSymbol size={30}/>
                </TouchableOpacity>
            </View>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    searchBar: {
    },
    logoutButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingsView: {
        marginTop: 20,
        marginBottom: 30,
        minWidth: '95%',
    },
});

export default SettingsPopup; 