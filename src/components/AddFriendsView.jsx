import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GlassCard from './GlassCard';
import AddFriendItem from './AddFriendItem';

const AddFriendsView = ({height, potentialFriends, style}) => {
    const [requestedFriends, setRequestedFriends] = useState({});

    const handleToggleRequest = (index) => {
        setRequestedFriends(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
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
                            onToggle={() => handleToggleRequest(index)}
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