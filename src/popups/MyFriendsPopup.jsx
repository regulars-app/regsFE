import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import MyFriendsView from '../components/MyFriendsView';
import SearchBar from '../components/SearchBar';

const MyFriendsPopup = ({onClose}) => {

    const friends = [
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
            <MyFriendsView height={600} style={styles.myFriendsView} friends={friends}/>
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

export default MyFriendsPopup; 