import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import ProfilePic from '../components/ProfilePic';
import Messenger from '../components/Messenger';
import { loadDirectMessages, formatMessagesForDisplay, sendGroupMessage } from '../Services/messaging';
import { getDirectChatId } from '../Services/groups';
import firestore from '@react-native-firebase/firestore';

const DirectMessagerPopup = ({member, onClose, group, currentUserId}) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [directChatId, setDirectChatId] = useState(null);
    
    // Ref for ScrollView to enable auto-scrolling
    const scrollViewRef = useRef(null);

    // Function to scroll to bottom of chat
    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    // Load direct chat when component mounts
    useEffect(() => {
        const loadDirectChat = async () => {
            try {
                console.log('🔍 DirectMessagerPopup - loadDirectChat called with:', {
                    group: group ? { id: group.id, name: group.name, hasDirectChats: !!group.directChats } : null,
                    member: member ? { id: member.id, name: member.name } : null,
                    currentUserId: currentUserId
                });
                
                if (!group || !member || !currentUserId) {
                    console.warn('⚠️ Missing required data for direct chat:', { group: !!group, member: !!member, currentUserId: !!currentUserId });
                    return;
                }
                
                // Get direct chat ID between current user and selected member
                const chatId = await getDirectChatId(group, currentUserId, member.id);
                setDirectChatId(chatId);
                
                if (chatId) {
                    // Load direct messages
                    const messagesResult = await loadDirectMessages(chatId, 50);
                    // We need to get the ConnectyCube ID for the current user to properly format messages
                    const currentUserDoc = await firestore().collection('users').doc(currentUserId).get();
                    if (currentUserDoc.exists) {
                        const userData = currentUserDoc.data();
                        const connectycubeId = userData.connectycube_id;
                        const formattedMessages = formatMessagesForDisplay(messagesResult, connectycubeId);
                        setMessages(formattedMessages);
                        
                        // Scroll to bottom after messages are loaded
                        setTimeout(() => scrollToBottom(), 100);
                    } else {
                        setMessages([]);
                    }
                } else {
                    setMessages([]);
                }
                
                setLoading(false);
            } catch (error) {
                console.error('❌ Error loading direct chat:', error);
                setLoading(false);
            }
        };

        loadDirectChat();
    }, [group, member, currentUserId]);

    // Auto-scroll to bottom whenever messages change
    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => scrollToBottom(), 100);
        }
    }, [messages]);

    const handleSendMessage = async (messageText, mediaUri = null) => {
        try {
            if (!messageText.trim() || !directChatId) {
                return;
            }

            // Send message using service
            const messageResult = await sendGroupMessage(
                messageText, 
                directChatId, 
                currentUserId
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
                senderId: currentUserId,
                timestamp: new Date(),
                senderPic: null,
                isRead: true,
                isDelivered: true,
            };

            setMessages(prev => [...prev, newMessage]);
            
            // Scroll to bottom after adding new message
            setTimeout(() => scrollToBottom(), 100);

        } catch (error) {
            console.error('❌ Error sending direct message:', error);
            Alert.alert('Error', `Failed to send message: ${error.message}`);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading direct chat...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header with member name */}
            <View style={styles.header}>
                <Text style={styles.memberName}>
                    {member?.name || member?.handle || 'Direct Message'}
                </Text>
            </View>
            
            <Messenger 
                messages={messages} 
                style={styles.messenger}
                onSendMessage={handleSendMessage}
                scrollViewRef={scrollViewRef}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minWidth: '100%',
        alignItems: 'center',
        height: '100%',
        paddingBottom: 20,
    },
    header: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        
    },
    memberName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6E6E6E',
    },
    messenger: {
        minWidth: '100%',
        flex: 1,
    },
    loadingText: {
        fontSize: 18,
        color: '#6E6E6E',
        marginTop: 50,
    },
});

export default DirectMessagerPopup; 