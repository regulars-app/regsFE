import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import MembersView from '../components/MembersView';
import SearchBar from '../components/SearchBar';
import { getCurrentUserFriends } from '../Services/friends';

const MyFriendsPopup = ({onClose}) => {
    const [friends, setFriends] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Load friends on component mount
    useEffect(() => {
        loadFriends();
    }, []);

    // Filter friends when search query changes
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredFriends(friends);
        } else {
            const filtered = friends.filter(friend => 
                friend.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredFriends(filtered);
        }
    }, [searchQuery, friends]);

    const loadFriends = async () => {
        try {
            setIsLoading(true);
            const userFriends = await getCurrentUserFriends();
            setFriends(userFriends);
            setFilteredFriends(userFriends);
        } catch (error) {
            console.error('Error loading friends:', error);
            Alert.alert('Error', 'Failed to load friends');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading friends...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SearchBar style={styles.searchBar} onSearch={handleSearch} placeholder="Search friends..."/>
            {friends.length === 0 ? (
                <View style={styles.emptyStateContainer}>
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>No friends yet</Text>
                        <Text style={styles.emptyStateSubtext}>Add some friends to get started!</Text>
                    </View>
                </View>
            ) : (
                <MembersView 
                    height={600} 
                    style={styles.myFriendsView} 
                    members={filteredFriends} 
                    title="My Friends"
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        gap: 20,
        flex: 1,
    },
    searchBar: {
        marginTop: 20,
    },
    myFriendsView: {
        marginTop: 20,
        marginBottom: 30,
        minWidth: '95%',
    },
    loadingText: {
        fontSize: 16,
        color: '#6E6E6E',
        marginTop: 50,
    },
    emptyStateContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 400,
    },
    emptyState: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyStateText: {
        fontSize: 18,
        color: '#6E6E6E',
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#6E6E6E',
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default MyFriendsPopup; 