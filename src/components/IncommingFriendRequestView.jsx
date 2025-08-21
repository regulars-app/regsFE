import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import GlassCard from './GlassCard';
import AcceptFriendItem from './AcceptFriendItem';
import { acceptFriendRequest, declineFriendRequest, getIncomingFriendRequests } from '../Services/friends';

const IncomingFriendRequestView = ({height, requests, style, scrollEnabled = true}) => {
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [loading, setLoading] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Load incoming friend requests on component mount
    useEffect(() => {
        loadIncomingFriendRequests();
    }, []);

    const loadIncomingFriendRequests = async () => {
        try {
            setIsLoading(true);
            const requests = await getIncomingFriendRequests();
            setIncomingRequests(requests);
        } catch (error) {
            console.error('Error loading incoming friend requests:', error);
            Alert.alert('Error', 'Failed to load friend requests');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAcceptRequest = async (requestIndex) => {
        const request = incomingRequests[requestIndex];
        setLoading(prev => ({ ...prev, [requestIndex]: true }));

        try {
            const result = await acceptFriendRequest(request.id);
            
            if (result.success) {
                // Remove the accepted request from the list
                setIncomingRequests(prev => prev.filter((_, index) => index !== requestIndex));
                Alert.alert('Success', 'Friend request accepted!');
            } else {
                Alert.alert('Error', result.error || 'Failed to accept friend request');
            }
        } catch (error) {
            console.error('Error accepting friend request:', error);
            Alert.alert('Error', 'Failed to accept friend request');
        } finally {
            setLoading(prev => ({ ...prev, [requestIndex]: false }));
        }
    };

    const handleDeclineRequest = async (requestIndex) => {
        const request = incomingRequests[requestIndex];
        setLoading(prev => ({ ...prev, [requestIndex]: true }));

        try {
            const result = await declineFriendRequest(request.id);
            
            if (result.success) {
                // Remove the declined request from the list
                setIncomingRequests(prev => prev.filter((_, index) => index !== requestIndex));
                Alert.alert('Success', 'Friend request declined');
            } else {
                Alert.alert('Error', result.error || 'Failed to decline friend request');
            }
        } catch (error) {
            console.error('Error declining friend request:', error);
            Alert.alert('Error', 'Failed to decline friend request');
        } finally {
            setLoading(prev => ({ ...prev, [requestIndex]: false }));
        }
    };

    if (isLoading) {
        return (
            <GlassCard style={[styles.glassCard, { height: height }, style]}>
                <View style={styles.container}>
                    <Text style={styles.title}>Loading friend requests...</Text>
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
                <Text style={styles.title}>Incoming Friend Requests</Text>
                {incomingRequests.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>No incoming friend requests</Text>
                    </View>
                ) : (
                    <ScrollView 
                        style={styles.scrollView} 
                        contentContainerStyle={styles.scrollViewContent} 
                        nestedScrollEnabled={true}
                        scrollEnabled={scrollEnabled}
                        showsVerticalScrollIndicator={true}
                        bounces={false}
                    >
                        {incomingRequests.map((request, index) => (
                            <AcceptFriendItem 
                                key={index} 
                                name={request.name}
                                imageURL={request.imageURL}
                                onAccept={() => handleAcceptRequest(index)}
                                onDecline={() => handleDeclineRequest(index)}
                                loading={loading[index] || false}
                            />
                        ))}
                    </ScrollView>
                )}
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
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyStateText: {
        fontSize: 16,
        color: '#6E6E6E',
        fontStyle: 'italic',
    },
});

export default IncomingFriendRequestView;