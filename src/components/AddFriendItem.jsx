import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProfilePic from './ProfilePic';
import AddFriendButton from './AddFriendButton'

const AddFriendItem = ({style, name, imageURL, requested, added, onToggle, onToggleAdd, type="request", loading=false}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.leftContainer}>
                <ProfilePic size={40} style={styles.profilePic} imageURL={imageURL || 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                <Text style={styles.name}>{name}</Text>
            </View>
            <TouchableOpacity 
                style={styles.rightContainer} 
                onPress={type === "request" ? onToggle : onToggleAdd} 
                activeOpacity={1}
                disabled={loading}
            >
                <AddFriendButton 
                    requested={requested} 
                    added={added} 
                    type={type}
                    loading={loading}
                />
            </TouchableOpacity>
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
        alignItems: 'flex-end',
    },
});

export default AddFriendItem;