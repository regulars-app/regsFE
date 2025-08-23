import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import GlassCard from './GlassCard';
import Stack from './Stack';
import ProfilePic from './ProfilePic';
import DownSymbol from './DownSymbol';
import ConfirmSymbol from './ConfirmSymbol';

// Function to get group members for direct messaging
const getGroupMembersForDirectChat = (group, currentUserId) => {
    if (!group || !group.members || !currentUserId) {
        console.log('⚠️ getGroupMembersForDirectChat - missing data:', { 
            hasGroup: !!group, 
            hasMembers: !!group?.members, 
            hasCurrentUserId: !!currentUserId 
        });
        return [];
    }
    
    console.log('🔍 getGroupMembersForDirectChat - filtering members:');
    console.log('  - All members:', group.members);
    console.log('  - Current user ID:', currentUserId);
    
    // Filter out current user and get other members
    const filteredMembers = group.members.filter(memberId => {
        const isCurrentUser = memberId === currentUserId;
        console.log(`  - Member ${memberId.slice(-4)}: ${isCurrentUser ? 'CURRENT USER (filtered out)' : 'Other member'}`);
        return !isCurrentUser;
    });
    
    console.log('  - Filtered members:', filteredMembers);
    
    return filteredMembers.map(memberId => ({
        id: memberId,
        name: `Member ${memberId.slice(-4)}`, // Show last 4 chars of ID
        lastMessage: 'Tap to start chatting',
        imageURL: null, // Will use default profile pic
        time: '',
        status: 'online',
        read: false,
    }));
};


const DirectMessagesWidget = ({style, onMemberPress, group, currentUserId}) => {
    const [expanded, setExpanded] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const animatedOpacity = useRef(new Animated.Value(0)).current;
    
    // Debug logging
    console.log('🔍 DirectMessagesWidget - props:', {
        hasGroup: !!group,
        groupMembers: group?.members?.length || 0,
        currentUserId: currentUserId,
        hasOnMemberPress: !!onMemberPress
    });
    
    // Get members for display
    const members = getGroupMembersForDirectChat(group, currentUserId);
    console.log('🔍 DirectMessagesWidget - members:', members);

    const handleMemberPress = (member) => {
        setSelectedMember(member);
        if (onMemberPress) {
            onMemberPress(member);
        }
    };

    const toggleExpanded = () => {
        if (expanded) {
            // Collapse animation   
            setIsAnimating(true);
            Animated.parallel([
                Animated.timing(animatedHeight, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: false,
                }),
                Animated.timing(animatedOpacity, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: false,
                }),
            ]).start(() => {
                setExpanded(false);
                setIsAnimating(false);
            });
        } else {
            // Expand animation
            setExpanded(true);
            setIsAnimating(true);
            Animated.parallel([
                Animated.timing(animatedHeight, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: false,
                }),
                Animated.timing(animatedOpacity, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: false,
                }),
            ]).start(() => setIsAnimating(false));
        }
    };

    const dynamicStyles = {
        container: {
            width: expanded ? '95%' : '80%',
        },
        glassCard: {
            padding: expanded ? 20 : 8,
        },
    };

    return (
        <View style={[styles.container, dynamicStyles.container, style]}>
            <GlassCard style={[styles.glassCard, dynamicStyles.glassCard]}>
                {!expanded ? 
                <View style={styles.unexpandedContainer}>
                    <Stack style={styles.profilePicStack} cardWidth={40} cardHeight={40} sideOffset={10} data={members} renderItem={({item}) => <ProfilePic imageURL={item.imageURL} size={40} newMessage={!item.read}/>} />
                    <Text style={styles.directMessageTitle}>Direct Messages</Text>
                    <TouchableOpacity style={styles.expandButton} onPress={toggleExpanded} activeOpacity={0.6}>
                        <DownSymbol size={35}/>
                    </TouchableOpacity>
                </View>
                :
                <Animated.View 
                    style={[
                        styles.expandedContainer,
                        {
                            opacity: animatedOpacity,
                            maxHeight: animatedHeight.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 480],
                            }),
                        }
                    ]}
                >
                    <ScrollView style={styles.memberScrollView}>
                    {members.map((member) => (
                        <GlassCard key={member.id} style={styles.memberContainer} disableShadow={isAnimating}>
                                <TouchableOpacity style={styles.memberInfo} onPress={() => handleMemberPress(member)} activeOpacity={0}>
                                    <ProfilePic imageURL={member.imageURL} size={50} newMessage={!member.read}/>
                                    <View style={styles.memberTextContainer}>
                                        <Text style={styles.memberName}>{member.name}</Text>
                                        <GlassCard style={styles.memberLastMessageContainer} disableShadow={isAnimating}>
                                            <Text style={styles.memberLastMessage} numberOfLines={1} ellipsizeMode="tail">{member.lastMessage}</Text>
                                            <Text style={styles.messageTime}>{member.time}</Text>
                                            <View style={[styles.messageStatus, {backgroundColor: member.read ? 'grey' : 'green'}]} />
                                        </GlassCard>
                                    </View>
                                </TouchableOpacity>
                        </GlassCard>
                    ))}
                    </ScrollView>
                    <TouchableOpacity style={styles.doneButton} onPress={toggleExpanded} activeOpacity={0.2}>
                        <ConfirmSymbol size={25}/>
                    </TouchableOpacity>
                </Animated.View>
             }
            </GlassCard>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
       
       
    },
    glassCard: {
        width: '100%',
    },
    unexpandedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
  
    },
    expandedContainer: {
        flexDirection: 'column',
        width: '100%',
        maxHeight: 480,
    },
    doneButton: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        marginRight: 10,
        backgroundColor: '#F2FFF6',
        borderRadius: 100,
        paddingTop: 5,
        elevation: 1.5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginTop: 10,
    },
    profilePicStack: {
        marginLeft: 7,
    },
    directMessageTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#6E6E6E',
    },
    expandButton: {
        backgroundColor: '#F2FFF6',
        borderRadius: 100,
        paddingTop: 5,
        elevation: 1.5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    memberScrollView: {
        width: '100%',
        marginBottom: 5,
    },
    memberContainer: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    memberInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        padding: 10,
        width: '100%',
        gap: 20,
    },
    memberTextContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginRight: 10,
        gap: 5,
    },
    memberName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#6E6E6E',
    },
    memberLastMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        position: 'relative',
        borderRadius: 10,
    },
    memberLastMessage: {
        fontSize: 14,
        fontWeight: '400',
        color: '#6E6E6E',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginRight: 40,
    },
    messageTime: {
        position: 'absolute',
        right: 5,
        bottom: 5,
        fontSize: 10,
        fontWeight: '400',
        color: '#6E6E6E',
    },
    messageStatus: {
        position: 'absolute',
        right: 5,
        top: 5,
        width: 10,
        height: 10,
        backgroundColor: 'grey',
        borderRadius: 100,
    },

});

export default DirectMessagesWidget;