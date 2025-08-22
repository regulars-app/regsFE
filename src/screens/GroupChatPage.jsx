import React, { useState, useEffect, useCallback, useLayoutEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'react-native';
import BackButton from '../components/BackButton';
import MoreSymbol from '../components/MoreSymbol';
import Messenger from '../components/Messenger';
import DirectMessagesWidget from '../components/DirectMessagesWidget';
import Popup from '../components/Popup';
import DirectMessagerPopup from '../popups/DirectMessagerPopup';
import ConnectyCube from 'react-native-connectycube';
import { initConnectyCube, authenticateChatUser } from '../Services/messaging';

const GroupChatPage = ({ routeParams }) => {
    const [showDirectMessagerPopup, setShowDirectMessagerPopup] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [group, setGroup] = useState(null);

    const groupId = routeParams?.groupID;
    const groupName = group?.name || 'Loading...';
    
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
                
                // Initialize ConnectyCube
                const user = await initConnectyCube();
                console.log('✅ ConnectyCube initialized:', user);
                
                // Authenticate chat user
                const chatUserId = await authenticateChatUser(user);
                console.log('✅ Chat user authenticated:', chatUserId);
                
                // Get user session
                const session = await ConnectyCube.auth.getSession();
                const currentUserId = session.user_id;
                setUserId(currentUserId);
                console.log('✅ User session set:', currentUserId);
                console.log('🔍 Setting userId to:', currentUserId, 'Type:', typeof currentUserId);
                
                // Load group data
                if (groupId) {
                    await loadGroupData(currentUserId);
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

    const loadGroupData = async (currentUserId) => {
        try {
            // For now, use a mock group object with the chat ID
            // You can replace this with actual Firestore loading later
            const mockGroup = {
                id: groupId,
                name: 'Test Group',
                // Use the actual ConnectyCube chat ID from your earlier logs
                chat: '68a880fb8443c4000ef12c5f', // This is the working chat ID
                members: []
            };
            setGroup(mockGroup);
            
            // Load messages for this group with the correct userId
            await loadMessages(currentUserId);
            
        } catch (error) {
            console.error('❌ Error loading group data:', error);
            setLoading(false);
        }
    };

    const loadMessages = async (currentUserId = userId) => {
        try {
            console.log('📥 Loading messages for group:', groupId);
            console.log('🔍 Using ConnectyCube chat ID:', group?.chat);
            console.log('🔍 Using userId for positioning:', currentUserId, 'Type:', typeof currentUserId);
            
            // First, let's check if the dialog exists
            console.log('🔍 Checking if dialog exists...');
            const dialogs = await ConnectyCube.chat.dialog.list({
                _id: group?.chat || '68a880fb8443c4000ef12c5f'
            });
            console.log('📋 Dialogs found:', dialogs);
            
            // Get messages from ConnectyCube using the correct chat ID
            const messagesResult = await ConnectyCube.chat.message.list({
                chat_dialog_id: group?.chat || '68a880fb8443c4000ef12c5f',
                sort_desc: 'date_sent',
                limit: 50,
                skip: 0,
            });

            console.log('📨 Messages loaded:', messagesResult);
            console.log('📨 Messages items:', messagesResult?.items);
            console.log('📨 Messages count:', messagesResult?.items?.length || 0);

            if (messagesResult && messagesResult.items && messagesResult.items.length > 0) {
                console.log('🔍 Raw messages from ConnectyCube:', messagesResult.items);
                
                // Check if all messages are from the same user
                const uniqueSenders = new Set(messagesResult.items.map(msg => msg.sender_id));
                const isOnlyOneSender = uniqueSenders.size === 1;
                
                if (isOnlyOneSender) {
                    console.log('ℹ️ Only one person chatting in this group');
                }
                
                // Convert ConnectyCube messages to our format
                const formattedMessages = messagesResult.items.map(msg => {
                    console.log('📝 Processing message:', msg);
                    console.log('📝 Message body:', msg.body);
                    console.log('📝 Message message:', msg.message);
                    console.log('📝 Message type:', msg.type);
                    console.log('🔍 Sender ID from message:', msg.sender_id, 'Type:', typeof msg.sender_id);
                    console.log('🔍 Current userId:', currentUserId, 'Type:', typeof currentUserId);
                    console.log('🔍 Position will be:', String(msg.sender_id) === String(currentUserId) ? 'right' : 'left');
                    
                    return {
                        id: msg.id || msg._id,
                        chatType: 'main',
                        time: new Date(msg.date_sent * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        position: String(msg.sender_id) === String(currentUserId) ? 'right' : 'left',
                        messageType: (msg.body || msg.message) ? 'text' : 'image',
                        senderName: String(msg.sender_id) === String(currentUserId) ? 'You' : 'Member',
                        messageText: msg.body || msg.message || '',
                        imageURL: msg.extension?.image_url || '',
                        mediaDownloadUrl: msg.extension?.image_url || null,
                        senderId: msg.sender_id,
                        timestamp: new Date(msg.date_sent * 1000),
                        // Add these properties to match dummy data styling
                        senderPic: null,
                        isRead: true,
                        isDelivered: true,
                    };
                });

                console.log('✅ Formatted messages:', formattedMessages);
                setMessages(formattedMessages.reverse()); // Show oldest first
                
                // Scroll to bottom after messages are loaded
                setTimeout(() => scrollToBottom(), 100);
            } else {
                console.log('⚠️ No messages found or empty result');
                setMessages([]);
            }
            
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

                        // Create message object for ConnectyCube
            const messageData = {
                type: 'chat',
                message: messageText, // Changed from 'body' to 'message'
                markable: 1,
                chat_dialog_id: group?.chat || '68a880fb8443c4000ef12c5f',
                recipient_id: null, // For group chats, this should be null
                sender_id: userId,
            };
            
            console.log('📤 Sending message via ConnectyCube API:', messageData);
            console.log('🎯 Target chat ID:', group?.chat || '68a880fb8443c4000ef12c5f');
            
            // Send message using ConnectyCube's message API
            const messageResult = await ConnectyCube.chat.message.create(messageData);
            console.log('✅ Message created via API:', messageResult);
            
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
                <DirectMessagerPopup member={selectedMember} onClose={handleClosePopup}/>
            </Popup>
            <View style={styles.header}>
                <BackButton size={30} style={styles.backButton} />
                <TouchableOpacity style={styles.moreSymbol}>
                    <MoreSymbol size={30}/>
                </TouchableOpacity>
            </View>
            <View style={styles.bodyContent}>
                <DirectMessagesWidget style={styles.directMessagesWidget} onMemberPress={handleMemberPress}/>
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
