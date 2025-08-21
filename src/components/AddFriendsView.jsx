import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import GlassCard from './GlassCard';
import AddFriendItem from './AddFriendItem';
import { requestFriend, getOutgoingFriendRequests, getAllUsers } from '../Services/friends';

const AddFriendsView = ({height, potentialFriends, style, type="request", onToggleFriend, selectedMembers = []}) => {
    const [allUsers, setAllUsers] = useState([]);
    const [requestedFriends, setRequestedFriends] = useState({});
    const [addedFriends, setAddedFriends] = useState({});
    const [loading, setLoading] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Load all users and existing outgoing friend requests on component mount
    useEffect(() => {
        loadUsersAndRequests();
    }, []);

    const loadUsersAndRequests = async () => {
        try {
            setIsLoading(true);
            
            // Load all users (excluding current user)
            const users = await getAllUsers();
            setAllUsers(users);
            
            // Load existing outgoing friend requests
            const outgoingRequests = await getOutgoingFriendRequests();
            const requestsMap = {};
            
            outgoingRequests.forEach(request => {
                const userIndex = users.findIndex(user => user.id === request.id);
                if (userIndex !== -1) {
                    requestsMap[userIndex] = true;
                }
            });
            
            setRequestedFriends(requestsMap);
        } catch (error) {
            console.error('Error loading users and requests:', error);
            Alert.alert('Error', 'Failed to load users');
        } finally {
            setIsLoading(false);
        }
    };

    // Update addedFriends state when selectedMembers changes
    useEffect(() => {
        // Only run this effect if we have the required props for group creation
        if (onToggleFriend && selectedMembers) {
            const newAddedFriends = {};
            allUsers.forEach((user, index) => {
                newAddedFriends[index] = selectedMembers.some(member => member.id === user.id);
            });
            setAddedFriends(newAddedFriends);
        }
    }, [selectedMembers, allUsers, onToggleFriend]);

    const handleToggleRequest = async (index) => {
        const user = allUsers[index];
        const isCurrentlyRequested = requestedFriends[index] || false;
        
        if (isCurrentlyRequested) {
            // If already requested, we could implement a cancel request feature
            Alert.alert('Friend Request', 'Friend request already sent');
            return;
        }

        setLoading(prev => ({ ...prev, [index]: true }));

        try {
            const result = await requestFriend(user.id);
            
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
        const user = allUsers[index];
        const isCurrentlyAdded = addedFriends[index] || false;
        
        if (onToggleFriend) {
            onToggleFriend(user, !isCurrentlyAdded);
            setAddedFriends(prev => ({
                ...prev,
                [index]: !isCurrentlyAdded
            }));
        }
    };

    if (isLoading) {
        return (
            <GlassCard style={[styles.glassCard, { height: height }, style]}>
                <View style={styles.container}>
                    <Text style={styles.title}>Loading users...</Text>
                </View>
            </GlassCard>
        );
    }

    const dynamicStyles = {
        glassCard: {
            height: height,
        },
    };

    return (
        <GlassCard style={[styles.glassCard, dynamicStyles.glassCard, style]}>
            <View style={styles.container}>
                <Text style={styles.title}>Add Friends</Text>
                <ScrollView 
                    style={styles.scrollView} 
                    contentContainerStyle={styles.scrollViewContent} 
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                    bounces={false}
                >
                    {allUsers.map((user, index) => (
                        <AddFriendItem 
                            key={index} 
                            name={user.name}
                            imageURL={user.imageURL}
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
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6E6E6E',
        marginTop: 20,
        marginBottom: 20,
    },
    scrollView: {
        width: '100%',
        flex: 1,
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingBottom: 20,
    },
});

export default AddFriendsView;