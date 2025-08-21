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
        backgroundColor: '#F2FFF6',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        elevation: 0.5, 
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    rejectFriendButton: {
        backgroundColor: '#F9C7C5',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        elevation: 0.5, 
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#6E6E6E',
    },
});

export default AcceptFriendItem;