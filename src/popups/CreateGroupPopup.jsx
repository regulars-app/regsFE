import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import MainButton from '../components/MainButton';
import ProfileListCard from '../components/ProfileListCard';
import AdditionalInfoInput from '../components/AdditionalInfoInput';
import SelectMembersView from '../components/SelectMembersView';
import { getCurrentUserFriends } from '../Services/friends';
import { createGroup } from '../Services/groups';

const CreateGroupPopup = ({onClose}) => {
    const [friends, setFriends] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [groupName, setGroupName] = useState('');

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

    const handleCreateGroup = async () => {
        if (!groupName.trim()) {
            Alert.alert('Error', 'Please enter a group name');
            return;
        }

        if (selectedMembers.length === 0) {
            Alert.alert('Error', 'Please select at least one member for your group');
            return;
        }

        try {
            setIsCreating(true);
            
            // Prepare member IDs for group creation
            const memberIds = selectedMembers.map(member => member.id);
            
            // Create the group
            const result = await createGroup(
                groupName.trim(),
                memberIds,
                `Group: ${groupName.trim()}`, // description
                null, // photo - can be added later
                'group' // chat_type
            );

            if (result.success) {
                Alert.alert(
                    'Success', 
                    `Group "${groupName.trim()}" created successfully!`,
                    [
                        {
                            text: 'OK',
                            onPress: () => onClose()
                        }
                    ]
                );
            } else {
                Alert.alert('Error', result.error || 'Failed to create group');
            }
        } catch (error) {
            console.error('Error creating group:', error);
            Alert.alert('Error', 'Failed to create group');
        } finally {
            setIsCreating(false);
        }
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
            <AdditionalInfoInput 
                style={styles.additionalInfoInput} 
                placeholder={"Give your group a name..."} 
                multiline={false} 
                maxLength={30}
                value={groupName}
                onChangeText={setGroupName}
            />
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
            <MainButton 
                text={isCreating ? "Creating..." : "Confirm"} 
                color="green" 
                type="confirm" 
                style={styles.createGroupButton} 
                onPress={handleCreateGroup}
                disabled={isCreating}
            />
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