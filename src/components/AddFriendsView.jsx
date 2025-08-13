import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GlassCard from './GlassCard';
import AddFriendItem from './AddFriendItem';

const AddFriendsView = ({height, potentialFriends, style, type="request", onToggleFriend, selectedMembers = []}) => {
    const [requestedFriends, setRequestedFriends] = useState({});
    const [addedFriends, setAddedFriends] = useState({});

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

    const handleToggleRequest = (index) => {
        setRequestedFriends(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
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