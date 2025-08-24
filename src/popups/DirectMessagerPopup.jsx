import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import ProfilePic from '../components/ProfilePic';
import Messenger from '../components/Messenger';
import { loadDirectMessages, formatMessagesForDisplay, sendGroupMessage, markDirectMessagesAsRead, createNewMessageWithProfilePic } from '../Services/messaging';
import { getDirectChatId } from '../Services/groups';
import firestore from '@react-native-firebase/firestore';
import ConnectyCube from 'react-native-connectycube';
import auth from '@react-native-firebase/auth';

const DirectMessagerPopup = ({member, onClose, group, currentUserId, onRefresh}) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [directChatId, setDirectChatId] = useState(null);
    const [recipientName, setRecipientName] = useState('');
    
    // Ref for ScrollView to enable auto-scrolling
    const scrollViewRef = useRef(null);

    // Function to scroll to bottom of chat
    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    // Function to refresh direct messages widget
    const refreshDirectMessages = () => {
        setRefreshKey(prev => prev + 1);
    };

    // Call refresh callback when component unmounts (popup closes)
    useEffect(() => {
        return () => {
            if (onRefresh) {
                onRefresh();
            }
        };
    }, [onRefresh]);

    // Load direct chat when component mounts
    useEffect(() => {
        const loadDirectChat = async () => {
            try {
                if (!group || !member || !currentUserId) {
                    return;
                }
                
                // Fetch recipient's user data to get their name/handle
                try {
                    const recipientDoc = await firestore().collection('users').doc(member.id).get();
                    if (recipientDoc.exists) {
                        const recipientData = recipientDoc.data();
                        const name = recipientData.first_name && recipientData.last_name 
                            ? `${recipientData.first_name} ${recipientData.last_name}`.trim()
                            : recipientData.handle || 'Unknown User';
                        setRecipientName(name);
                    } else {
                        setRecipientName(member?.name || member?.handle || 'Unknown User');
                    }
                } catch (error) {
                    setRecipientName(member?.name || member?.handle || 'Unknown User');
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
                        const formattedMessages = await formatMessagesForDisplay(messagesResult, connectycubeId);
                        setMessages(formattedMessages);
                        
                        // Mark messages as read when opening the chat
                        await markDirectMessagesAsRead(chatId, connectycubeId);
                        
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
            
            // Create new message with profile picture using service
            const newMessage = await createNewMessageWithProfilePic(messageText, messageResult, currentUserId, true);

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
                    {recipientName || 'Loading...'}
                </Text>
            </View>
            
            <Messenger 
                messages={messages} 
                style={styles.messenger}
                onSendMessage={handleSendMessage}
                scrollViewRef={scrollViewRef}
                key="messenger"
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