import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import GlassCard from './GlassCard';
import AcceptFriendItem from './AcceptFriendItem';
import { acceptFriendRequest, declineFriendRequest, getIncomingFriendRequests } from '../Services/friends';

const IncommingFriendRequestView = ({height, requests, style, scrollEnabled = true}) => {
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [loading, setLoading] = useState({});

    // Load incoming friend requests on component mount
    useEffect(() => {
        loadIncomingFriendRequests();
    }, []);

    const loadIncomingFriendRequests = async () => {
        try {
            const requestIDs = await getIncomingFriendRequests();
            // Here you would typically fetch the full user data for each request ID
            // For now, we'll use the mock data structure
            setIncomingRequests(requests || []);
        } catch (error) {
            console.error('Error loading incoming friend requests:', error);
        }
    };

    const handleAcceptRequest = async (requestIndex) => {
        const request = incomingRequests[requestIndex];
        setLoading(prev => ({ ...prev, [requestIndex]: true }));

        try {
            // In a real implementation, you'd use the actual user ID from the request
            // For now, we'll use a mock ID
            const result = await acceptFriendRequest(request.id || 'mock-user-id');
            
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
            // In a real implementation, you'd use the actual user ID from the request
            // For now, we'll use a mock ID
            const result = await declineFriendRequest(request.id || 'mock-user-id');
            
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

    const dynamicStyles = {
        glassCard: {
            height: height,
        },
    };

    return (
        <GlassCard style={[styles.glassCard, dynamicStyles.glassCard, style]}>
            <View style={styles.container}>
                <Text style={styles.title}>Incoming Friend Requests</Text>
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
                            onAccept={() => handleAcceptRequest(index)}
                            onDecline={() => handleDeclineRequest(index)}
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
        minWidth: '90%',
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

export default IncommingFriendRequestView;