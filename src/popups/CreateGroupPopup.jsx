import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import MainButton from '../components/MainButton';
import ProfileListCard from '../components/ProfileListCard';
import AdditionalInfoInput from '../components/AdditionalInfoInput';
import SelectMembersView from '../components/SelectMembersView';
import { getCurrentUserFriends } from '../Services/friends';

const CreateGroupPopup = ({onClose}) => {
    const [friends, setFriends] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load friends on component mount
    useEffect(() => {
        loadFriends();
    }, []);

    const loadFriends = async () => {
        try {
            setIsLoading(true);
            const userFriends = await getCurrentUserFriends();
            setFriends(userFriends);
        } catch (error) {
            console.error('Error loading friends:', error);
            Alert.alert('Error', 'Failed to load friends');
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleMember = (member, isSelected) => {
        if (isSelected) {
            setSelectedMembers(prev => [...prev, member]);
        } else {
            setSelectedMembers(prev => prev.filter(m => m.id !== member.id));
        }
    };

    const handleRemoveMember = (memberId) => {
        setSelectedMembers(prev => prev.filter(member => member.id !== memberId));
    };

    const handleCreateGroup = () => {
        if (selectedMembers.length === 0) {
            Alert.alert('Error', 'Please select at least one member for your group');
            return;
        }
        // TODO: Implement group creation logic
        Alert.alert('Success', 'Group created successfully!');
        onClose();
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading friends...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <AdditionalInfoInput style={styles.additionalInfoInput} placeholder={"Give your group a name..."} multiline={false} maxLength={30}/>
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
            <SelectMembersView 
                height={350} 
                style={styles.myGroupsView} 
                members={friends} 
                title="Select Members"
                onToggleMember={handleToggleMember}
                selectedMembers={selectedMembers}
            />
            <MainButton text="Confirm" color="green" type="confirm" style={styles.createGroupButton} onPress={handleCreateGroup} />
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
    loadingText: {
        fontSize: 16,
        color: '#6E6E6E',
        marginTop: 50,
    },
});

export default CreateGroupPopup; 