import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProfilePic from './ProfilePic';
import ConfirmSymbol from './ConfirmSymbol';

const AcceptFriendItem = ({style, name}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.leftContainer}>
                <ProfilePic size={40} style={styles.profilePic} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.acceptFriendButton}>
                    <Text style={styles.buttonText}>Accept</Text>
                    <ConfirmSymbol size={18}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectFriendButton}>
                    <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1, 
        borderColor: 'rgba(110, 110, 110, 0.2)',
        height: 70,
        width: '100%',
        backgroundColor: 'transparent',
        paddingHorizontal: 25,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        gap: 20,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 10,
    },
    profilePic: {
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6E6E6E',
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