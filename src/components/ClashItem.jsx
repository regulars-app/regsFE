import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GlassCard from './GlassCard';
import ProfilePic from './ProfilePic';

const ClashItem = ({style, userID, content}) => {
    return (
        <View style={styles.container}>
            <ProfilePic size={50} style={styles.profilePic} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
            <Text style={styles.content}>{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        paddingVertical: 20,
        flexDirection: 'row',
        gap: 20,

    },
    content: {
        fontSize: 15,
        fontWeight: '500',
        color: '#6E6E6E',
    },
});

export default ClashItem;