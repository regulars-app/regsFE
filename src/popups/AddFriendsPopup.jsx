import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import SearchBar from '../components/SearchBar';
import IncommingFriendRequestView from '../components/IncommingFriendRequestView';
import AddFriendsView from '../components/AddFriendsView';

const AddFriendsPopup = ({onClose}) => {

    const requests = [
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

    const potentialFriends = [
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
            <IncommingFriendRequestView height={250} requests={requests} style={styles.incommingFriendRequestView}/>
            <AddFriendsView height={400} potentialFriends={potentialFriends} style={styles.addFriendsView}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        alignItems: 'center',
        gap: 20,
    },
    searchBar: {
        marginTop: 20,
    },
    incommingFriendRequestView: {
        marginTop: 20,
        minWidth: '95%',
    },
    addFriendsView: {
        marginTop: 20,
        marginBottom: 30,
        minWidth: '95%',
    },
});

export default AddFriendsPopup; 