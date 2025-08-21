import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import ProfilePic from './ProfilePic';
import ConfirmSymbol from './ConfirmSymbol';

const AcceptFriendItem = ({style, name, imageURL, onAccept, onDecline, loading = false}) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <ProfilePic size={40} style={styles.profilePic} imageURL={imageURL || 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.rightContainer}>
                <TouchableOpacity 
                    style={styles.acceptFriendButton} 
                    onPress={onAccept}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#6E6E6E" />
                    ) : (
                        <>
                            <Text style={styles.buttonText}>Accept</Text>
                            <ConfirmSymbol size={18}/>
                        </>
                    )}
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.rejectFriendButton}
                    onPress={onDecline}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#6E6E6E" />
                    ) : (
                        <Text style={styles.buttonText}>Reject</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    profilePic: {
        marginRight: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: '#6E6E6E',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    acceptFriendButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        minWidth: 80,
        justifyContent: 'center',
    },
    rejectFriendButton: {
        backgroundColor: '#F44336',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        minWidth: 80,
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default AcceptFriendItem;