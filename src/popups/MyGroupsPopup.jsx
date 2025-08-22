import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import MembersView from '../components/MembersView';
import GlassCardButton from '../components/GlassCardButton';
import { getCurrentUserGroups } from '../Services/groups';

const MyGroupsPopup = ({onClose}) => {
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load groups on component mount
    useEffect(() => {
        loadGroups();
    }, []);

    const loadGroups = async () => {
        try {
            setIsLoading(true);
            const userGroups = await getCurrentUserGroups();
            setGroups(userGroups);
        } catch (error) {
            console.error('Error loading groups:', error);
            Alert.alert('Error', 'Failed to load groups');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading groups...</Text>
            </View>
        );
    }

    if (groups.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.noGroupsText}>No groups yet</Text>
                <Text style={styles.noGroupsSubtext}>Create your first group to get started!</Text>
                <GlassCardButton 
                    style={styles.createGroupButton} 
                    type="addFriend" 
                    text="Create Group" 
                    onPress={() => {}}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MembersView 
                height={350} 
                style={styles.myGroupsView} 
                members={groups} 
                title="My Groups"
            />
            <GlassCardButton 
                style={styles.createGroupButton} 
                type="addFriend" 
                text="Create Group" 
                onPress={() => {}}
            />
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
    loadingText: {
        fontSize: 20,
        color: '#555',
    },
    noGroupsText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    noGroupsSubtext: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default MyGroupsPopup; 