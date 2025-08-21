import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import GlassCard from './GlassCard';
import AddFriendItem from './AddFriendItem';
import { requestFriend, getOutgoingFriendRequests } from '../Services/friends';

const AddFriendsView = ({height, potentialFriends, style, type="request", onToggleFriend, selectedMembers = []}) => {
    const [requestedFriends, setRequestedFriends] = useState({});
    const [addedFriends, setAddedFriends] = useState({});
    const [loading, setLoading] = useState({});

    // Load existing outgoing friend requests on component mount
    useEffect(() => {
        loadOutgoingFriendRequests();
    }, []);

    // Update addedFriends state when selectedMembers changes
    useEffect(() => {
        // Only run this effect if we have the required props for group creation
        if (onToggleFriend && selectedMembers) {
            const newAddedFriends = {};
            potentialFriends.forEach((friend, index) => {
                newAddedFriends[index] = selectedMembers.some(member => member.id === friend.id);
            });
            setAddedFriends(newAddedFriends);
        }
    }, [selectedMembers, potentialFriends, onToggleFriend]);

    const loadOutgoingFriendRequests = async () => {
        try {
            const outgoingRequests = await getOutgoingFriendRequests();
            const requestsMap = {};
            outgoingRequests.forEach(friendID => {
                const friendIndex = potentialFriends.findIndex(friend => friend.id === friendID);
                if (friendIndex !== -1) {
                    requestsMap[friendIndex] = true;
                }
            });
            setRequestedFriends(requestsMap);
        } catch (error) {
            console.error('Error loading outgoing friend requests:', error);
        }
    };

    const handleToggleRequest = async (index) => {
        const friend = potentialFriends[index];
        const isCurrentlyRequested = requestedFriends[index] || false;
        
        if (isCurrentlyRequested) {
            // If already requested, we could implement a cancel request feature
            Alert.alert('Friend Request', 'Friend request already sent');
            return;
        }

        setLoading(prev => ({ ...prev, [index]: true }));

        try {
            const result = await requestFriend(friend.id);
            
            if (result.success) {
                setRequestedFriends(prev => ({
                    ...prev,
                    [index]: true
                }));
                Alert.alert('Success', 'Friend request sent successfully!');
            } else {
                Alert.alert('Error', result.error || 'Failed to send friend request');
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
            Alert.alert('Error', 'Failed to send friend request');
        } finally {
            setLoading(prev => ({ ...prev, [index]: false }));
        }
    };

    const handleToggleAdd = (index) => {
        const friend = potentialFriends[index];
        const isCurrentlyAdded = addedFriends[index] || false;
        
        // Toggle the local state
        setAddedFriends(prev => ({
            ...prev,
            [index]: !isCurrentlyAdded
        }));
        
        // Notify parent component
        if (onToggleFriend) {
            onToggleFriend(friend, !isCurrentlyAdded);
        }
    };

    const dynamicStyles = {
        glassCard: {
            height: height,
        },
    };
    return (
        <GlassCard style={[style, styles.glassCard, dynamicStyles.glassCard]}>
            <View style={styles.container}>
                <Text style={styles.title}>Add Friends View</Text>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} nestedScrollEnabled={true}>
                    {potentialFriends.map((friend, index) => (
                        <AddFriendItem 
                            key={index} 
                            name={friend.name} 
                            requested={requestedFriends[index] || false}
                            added={addedFriends[index] || false}
                            onToggle={() => handleToggleRequest(index)}
                            onToggleAdd={() => handleToggleAdd(index)}
                            type={type}
                            loading={loading[index] || false}
                        />
                    ))}
                </ScrollView>
            </View>
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    glassCard: {
        width: '90%',
    },
    container: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingTop: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6E6E6E',
    },
    scrollView: {
        width: '100%',
        marginTop: 10,
    },
    scrollViewContent: {
        width: '100%',
    },
});

export default AddFriendsView;