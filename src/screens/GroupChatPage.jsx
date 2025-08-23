import React, { useState, useEffect, useCallback, useLayoutEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'react-native';
import BackButton from '../components/BackButton';
import MoreSymbol from '../components/MoreSymbol';
import Messenger from '../components/Messenger';
import DirectMessagesWidget from '../components/DirectMessagesWidget';
import Popup from '../components/Popup';
import DirectMessagerPopup from '../popups/DirectMessagerPopup';
import { initializeGroupChat, loadGroupMessages, sendGroupMessage, formatMessagesForDisplay } from '../Services/messaging';
import { loadGroupDataForChat } from '../Services/groups';
import auth from '@react-native-firebase/auth';

const GroupChatPage = ({ routeParams }) => {
    const [showDirectMessagerPopup, setShowDirectMessagerPopup] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [firebaseUid, setFirebaseUid] = useState(null);
    const [group, setGroup] = useState(null);

    const groupId = routeParams?.groupID;
    const groupName = group?.name || 'Loading...';
    
    console.log('🔍 GroupChatPage - groupId:', groupId);
    console.log('🔍 GroupChatPage - routeParams:', routeParams);
    
    // Ref for ScrollView to enable auto-scrolling
    const scrollViewRef = useRef(null);

    // Function to scroll to bottom of chat
    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };
    
    // Initialize ConnectyCube and get user session
    useEffect(() => {
        const initializeChat = async () => {
            try {
                console.log('🚀 Initializing ConnectyCube for group chat...');
                
                // Initialize group chat using service
                const chatData = await initializeGroupChat(groupId);
                setUserId(chatData.userId);
                console.log('🔍 Setting userId to:', chatData.userId, 'Type:', typeof chatData.userId);
                
                // Also store the Firebase UID for direct messaging
                const currentFirebaseUid = auth().currentUser?.uid;
                setFirebaseUid(currentFirebaseUid);
                console.log('🔍 Firebase UID:', currentFirebaseUid);
                
                // Load group data
                if (groupId) {
                    await loadGroupData(chatData.userId);
                }
                
            } catch (error) {
                console.error('❌ Error initializing chat:', error);
                setLoading(false);
            }
        };

        initializeChat();
    }, [groupId]);

    // Auto-scroll to bottom whenever messages change
    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => scrollToBottom(), 100);
        }
    }, [messages]);

    // Reload messages when group data becomes available
    useEffect(() => {
        if (group && group.chat && userId) {
            console.log('🔄 Group data available, reloading messages...');
            loadMessages(userId, group);
        }
    }, [group, userId]);

    const loadGroupData = async (currentUserId) => {
        try {
            // Load group data using service
            const groupData = await loadGroupDataForChat(groupId);
            console.log('✅ Group data loaded:', groupData);
            console.log('🔍 Group chat ID:', groupData.chat);
            
            // Set group state first
            setGroup(groupData);
            
            // Load messages for this group with the correct userId
            // Pass the groupData directly instead of relying on state
            await loadMessages(currentUserId, groupData);
            
        } catch (error) {
            console.error('❌ Error loading group data:', error);
            setLoading(false);
        }
    };

    const loadMessages = async (currentUserId = userId, groupData = group) => {
        try {
            console.log('📥 Loading messages for group:', groupId);
            console.log('🔍 Using ConnectyCube chat ID:', groupData?.chat);
            console.log('🔍 Using userId for positioning:', currentUserId, 'Type:', typeof currentUserId);
            
            // Load messages using service
            if (!groupData?.chat) {
                throw new Error('Group chat ID not available');
            }
            const messagesResult = await loadGroupMessages(groupData.chat, 50);
            
            // Format messages for display using service
            const formattedMessages = formatMessagesForDisplay(messagesResult, currentUserId);
            setMessages(formattedMessages);
            
            // Scroll to bottom after messages are loaded
            setTimeout(() => scrollToBottom(), 100);
            
            setLoading(false);
            
        } catch (error) {
            console.error('❌ Error loading messages:', error);
            setLoading(false);
        }
    };

    const handleSendMessage = async (messageText, mediaUri = null) => {
        try {
            if (!messageText.trim()) {
                return;
            }

            // Send message using service
            if (!group?.chat) {
                throw new Error('Group chat ID not available');
            }
            const messageResult = await sendGroupMessage(
                messageText, 
                group.chat, 
                userId
            );
            
            // Add message to local state immediately
            const newMessage = {
                id: messageResult?.id || messageResult?._id || Date.now().toString(),
                chatType: 'main',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                position: 'right',
                messageType: 'text',
                senderName: 'You',
                messageText: messageText,
                imageURL: '',
                mediaDownloadUrl: null,
                senderId: userId,
                timestamp: new Date(),
                // Add these properties to match dummy data styling
                senderPic: null,
                isRead: true,
                isDelivered: true,
            };

            console.log('📱 Adding message to local state:', newMessage);
            setMessages(prev => [...prev, newMessage]);
            
            // Scroll to bottom after adding new message
            setTimeout(() => scrollToBottom(), 100);
            
            // Force reload messages after a short delay to see if they're stored
            setTimeout(async () => {
                console.log('🔄 Reloading messages to check persistence...');
                console.log('📱 Current local messages before reload:', messages);
                await loadMessages();
            }, 2000);

        } catch (error) {
            console.error('❌ Error sending message:', error);
            Alert.alert('Error', `Failed to send message: ${error.message}`);
        }
    };

    const handleMemberPress = (member) => {
        setSelectedMember(member);
        setShowDirectMessagerPopup(true);
    };

    const handleClosePopup = () => {
        setShowDirectMessagerPopup(false);
        setSelectedMember(null);
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading group chat...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Popup showPopup={showDirectMessagerPopup} onClose={handleClosePopup} style={styles.popup}>
                <DirectMessagerPopup 
                    member={selectedMember} 
                    onClose={handleClosePopup}
                    group={group}
                    currentUserId={firebaseUid}
                />
            </Popup>
            <View style={styles.header}>
                <BackButton size={30} style={styles.backButton} />
                <TouchableOpacity style={styles.moreSymbol}>
                    <MoreSymbol size={30}/>
                </TouchableOpacity>
            </View>
            <View style={styles.bodyContent}>
                {firebaseUid && (
                    <DirectMessagesWidget 
                        style={styles.directMessagesWidget} 
                        onMemberPress={handleMemberPress}
                        group={group}
                        currentUserId={firebaseUid}
                    />
                )}
                <Text style={styles.groupName}>{groupName}</Text>
                <Messenger 
                    style={styles.messenger} 
                    messages={messages} 
                    paddingHorizontal={20}
                    onSendMessage={handleSendMessage}
                    groupId={groupId}
                    scrollViewRef={scrollViewRef}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF6F0',
    height: '100%',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 75,
    alignItems: 'center',
  },
  bodyContent: {
    marginTop: 75,
    marginBottom: 120,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  moreSymbol: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  directMessagesWidget: {
    width: '90%',
    marginTop: 20,
    marginBottom: 10,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#6E6E6E',
  },
  messenger: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
  },
  popup: {
    height: '90%',
  },
  loadingText: {
    fontSize: 18,
    color: '#6E6E6E',
    marginTop: 50,
  },
});

export default GroupChatPage;
