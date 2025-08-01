import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import MembersView from '../components/MembersView';
import SearchBar from '../components/SearchBar';

const GroupMembersPopup = ({onClose}) => {

    const members = [
        { name: 'John Doe' },
        { name: 'Jane Doe' },
        { name: 'Jim Doe' },
        { name: 'John Doe' },
        { name: 'Jane Doe' },
        { name: 'Jim Doe' },
        { name: 'John Doe' },
        { name: 'Jane Doe' },
        { name: 'Jim Doe' },
        { name: 'John Doe' },
        { name: 'Jane Doe' },
        { name: 'Jim Doe' },
        { name: 'John Doe' },
        { name: 'Jane Doe' },
        { name: 'Jim Doe' },
        { name: 'John Doe' },
        { name: 'Jane Doe' },
        { name: 'Jim Doe' },
        { name: 'Jim Doe' },
        { name: 'John Doe' },
        { name: 'Jane Doe' },
        { name: 'Jim Doe' },
        { name: 'John Doe' },
        { name: 'Jane Doe' },
        { name: 'Jim Doe' },
        { name: 'John Doe' },
        { name: 'Jane Doe' },
        { name: 'Jim Doe' },
        { name: 'John Doe' },
        { name: 'Jane Doe' },
        { name: 'Jim Doe' },
      ];

    return (
        <View style={styles.container}>
            <SearchBar style={styles.searchBar}/>
            <MembersView height={600} style={styles.myFriendsView} members={members} title="Group Members"/>
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
    myFriendsView: {
        marginTop: 20,
        marginBottom: 30,
        minWidth: '95%',
    },
});

export default GroupMembersPopup; 