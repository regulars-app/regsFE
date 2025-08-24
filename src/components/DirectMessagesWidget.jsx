import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import GlassCard from './GlassCard';
import Stack from './Stack';
import ProfilePic from './ProfilePic';
import DownSymbol from './DownSymbol';
import ConfirmSymbol from './ConfirmSymbol';
import firestore from '@react-native-firebase/firestore';
import { getDirectChatPreview } from '../Services/messaging';
import { getDirectChatId } from '../Services/groups';
import ConnectyCube from 'react-native-connectycube';
import { getUserProfilePicById } from '../Services/user';




const DirectMessagesWidget = ({style, onMemberPress, group, currentUserId, refreshTrigger}) => {
    const [expanded, setExpanded] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [members, setMembers] = useState([]);
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const animatedOpacity = useRef(new Animated.Value(0)).current;
    

    
    // Fetch real user data for members
    useEffect(() => {
        const fetchMemberData = async () => {
            if (!group || !group.members || !currentUserId) {
                return;
            }
            
            try {
                // Filter out current user and get other members
                const filteredMembers = group.members.filter(memberId => memberId !== currentUserId);
                
                // Fetch user data and latest messages for each member
                const memberPromises = filteredMembers.map(async (memberId) => {
                    try {
                        const userDoc = await firestore().collection('users').doc(memberId).get();
                        let name = `Member ${memberId.slice(-4)}`;
                        let lastMessage = 'Tap to start chatting';
                        let time = '';
                        let read = true; // Default to read
                        
                        if (userDoc.exists) {
                            const userData = userDoc.data();
                            name = userData.first_name && userData.last_name 
                                ? `${userData.first_name} ${userData.last_name}`.trim()
                                : userData.handle || `Member ${memberId.slice(-4)}`;
                        }
                        
                        // Try to get latest message for this direct chat
                        try {
                            if (group && group.directChats) {
                                // Find the direct chat ID for this member
                                let directChatId = null;
                                
                                // Get current user's ConnectyCube ID first
                                const currentUserDoc = await firestore().collection('users').doc(currentUserId).get();
                                if (currentUserDoc.exists) {
                                    const currentUserData = currentUserDoc.data();
                                    const currentUserConnectyCubeId = currentUserData.connectycube_id;
                                    
                                    // Look for direct chat key containing current user's ConnectyCube ID
                                    for (const [key, chatId] of Object.entries(group.directChats)) {
                                        if (key.includes(currentUserConnectyCubeId.toString())) {
                                            directChatId = chatId;
                                            break;
                                        }
                                    }
                                    
                                    if (directChatId) {
                                        // Use the service function to get chat preview
                                        const preview = await getDirectChatPreview(directChatId, currentUserConnectyCubeId);
                                        lastMessage = preview.lastMessage;
                                        time = preview.time;
                                        read = !preview.isUnread; // Convert isUnread to read status
                                    }
                                }
                            }
                        } catch (error) {
                            // Silently handle errors for message fetching
                        }
                        
                        // Get user's profile picture
                        let profilePic = null;
                        if (userDoc.exists) {
                            const userData = userDoc.data();
                            if (userData.profile_pic && userData.profile_pic !== '') {
                                profilePic = userData.profile_pic;
                            } else if (userData.connectycube_id) {
                                // If no custom profile pic, try to get from ConnectyCube
                                try {
                                    const connectyCubeUser = await ConnectyCube.users.get(userData.connectycube_id);
                                    if (connectyCubeUser && connectyCubeUser.avatar) {
                                        profilePic = connectyCubeUser.avatar;
                                    }
                                } catch (error) {
                                    // Silently handle ConnectyCube avatar fetch errors
                                }
                            }
                        }

                        const memberData = {
                            id: memberId,
                            name: name,
                            lastMessage: lastMessage,
                            imageURL: profilePic,
                            time: time,
                            status: 'online',
                            read: read,
                        };
                        
                        return memberData;
                    } catch (error) {
                        return {
                            id: memberId,
                            name: `Member ${memberId.slice(-4)}`,
                            lastMessage: 'Tap to start chatting',
                            imageURL: null,
                            time: '',
                            status: 'online',
                            read: true,
                        };
                    }
                });
                
                const memberData = await Promise.all(memberPromises);
                setMembers(memberData);
                
            } catch (error) {
                // Fallback to basic member data with profile pictures
                const filteredMembers = group.members.filter(memberId => memberId !== currentUserId);
                const fallbackMembers = await Promise.all(filteredMembers.map(async (memberId) => {
                    const profilePic = await getUserProfilePicById(memberId);
                    return {
                        id: memberId,
                        name: `Member ${memberId.slice(-4)}`,
                        lastMessage: 'Tap to start chatting',
                        imageURL: profilePic,
                        time: '',
                        status: 'online',
                        read: true,
                    };
                }));
                setMembers(fallbackMembers);
            }
        };
        
        fetchMemberData();
        
        // Set up periodic refresh every 30 seconds to update messages
        const refreshInterval = setInterval(fetchMemberData, 30000);
        
        return () => clearInterval(refreshInterval);
    }, [group, currentUserId, refreshTrigger]);

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
                    {members.length > 0 ? (
                        <Stack style={styles.profilePicStack} cardWidth={40} cardHeight={40} sideOffset={10} data={members} renderItem={({item}) => <ProfilePic imageURL={item.imageURL} size={40} newMessage={!item.read}/>} />
                    ) : (
                        <Text style={styles.memberLoadingText}>Loading...</Text>
                    )}
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
    memberLoadingText: {
        fontSize: 14,
        color: '#6E6E6E',
        textAlign: 'center',
        marginVertical: 10,
    },

});

export default DirectMessagesWidget;