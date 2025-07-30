import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import SearchBar from '../components/SearchBar';
import IncommingFriendRequestView from '../components/IncommingFriendRequestView';

const AddFriendsPopup = ({onClose}) => {

    const requests = [
        { name: 'John Doe' },
        { name: 'Jane Doe' },
        { name: 'Jim Doe' },
      ];

    return (
        <View style={styles.container}>
            <SearchBar style={styles.searchBar}/>
            <IncommingFriendRequestView height={200} requests={requests} style={styles.incommingFriendRequestView}/>
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
    },
});

export default AddFriendsPopup; 