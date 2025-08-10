import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import MembersView from '../components/MembersView';
import GlassCardButton from '../components/GlassCardButton';

const MyGroupsPopup = ({onClose}) => {

    const groups = [
        { name: 'Group 1' },
        { name: 'Group 2' },
        { name: 'Group 3' },
        { name: 'Group 4' },
        { name: 'Group 5' },
      ];

    return (
        <View style={styles.container}>
            <MembersView height={350} style={styles.myGroupsView} members={groups} title="My Groups"/>
            <GlassCardButton style={styles.createGroupButton} type="addFriend" text="Create Group" onPress={() => {}}/>
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
    myGroupsView: {
        minWidth: '95%',
    },
    createGroupButton: {
        width: '40%',
        marginBottom: 30,
        alignSelf: 'flex-end',
    },
});

export default MyGroupsPopup; 