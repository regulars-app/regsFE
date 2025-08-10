import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import AddFriendsView from '../components/AddFriendsView';
import MainButton from '../components/MainButton';
import ProfileListCard from '../components/ProfileListCard';

const CreateGroupPopup = ({onClose}) => {

    const friends = [
        { id: 1, name: 'John Doe', imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 2, name: 'Jane Doe', imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 3, name: 'Jim Doe', imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 4, name: 'John Doe', imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 5, name: 'Jane Doe', imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 6, name: 'Jim Doe', imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 7, name: 'John Doe', imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 8, name: 'Jane Doe', imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 9, name: 'Jim Doe', imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 10, name: 'John Doe', imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
    ];

    const [selectedMembers, setSelectedMembers] = useState([]);

    const handleAddMember = (friend) => {
        setSelectedMembers(prev => {
            // Check if friend is already selected
            if (prev.find(member => member.id === friend.id)) {
                return prev;
            }
            return [...prev, friend];
        });
    };

    const handleRemoveMember = (memberId) => {
        setSelectedMembers(prev => prev.filter(member => member.id !== memberId));
    };

    const handleToggleFriend = (friend, isAdded) => {
        if (isAdded) {
            handleAddMember(friend);
        } else {
            handleRemoveMember(friend.id);
        }
    };

    return (
        <View style={styles.container}>
            <ProfileListCard 
                style={styles.profileListCard} 
                clickable={false} 
                selectable={false} 
                removeable={true} 
                showButton={false} 
                type="members" 
                title="Selected Members" 
                members={selectedMembers}
                onRemoveMember={handleRemoveMember}
                scrollEnabled={true}
            />
            <AddFriendsView 
                height={350} 
                style={styles.myGroupsView} 
                potentialFriends={friends} 
                type="add"
                onToggleFriend={handleToggleFriend}
                selectedMembers={selectedMembers}
            />
            <MainButton text="Confirm" color="green" type="confirm" style={styles.createGroupButton} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        gap: 20,
    },
    profileListCard: {
        minWidth: '90%',
        maxWidth: '90%',
        height: 135,
    },
    myGroupsView: {
        minWidth: '95%',
    },
    createGroupButton: {
        width: '40%',
        marginBottom: 30,
        alignSelf: 'flex-end',
    },
});

export default CreateGroupPopup; 