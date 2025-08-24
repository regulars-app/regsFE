import React, { useState, useEffect, useCallback, useLayoutEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'react-native';
import BackButton from '../components/BackButton';
import MoreSymbol from '../components/MoreSymbol';
import Messenger from '../components/Messenger';
import DirectMessagesWidget from '../components/DirectMessagesWidget';
import Popup from '../components/Popup';
import DirectMessagerPopup from '../popups/DirectMessagerPopup';
import { initializeAndLoadGroupChat, sendGroupMessage, createNewMessageWithProfilePic, scrollToBottom } from '../Services/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const GroupChatPage = ({ routeParams }) => {
    const [showDirectMessagerPopup, setShowDirectMessagerPopup] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [firebaseUid, setFirebaseUid] = useState(null);
    const [group, setGroup] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const groupId = routeParams?.groupID;
    const groupName = group?.name || 'Loading...';
    

    
    // Ref for ScrollView to enable auto-scrolling
    const scrollViewRef = useRef(null);



    // Function to refresh direct messages widget
    const refreshDirectMessages = () => {
        setRefreshKey(prev => prev + 1);
    };
    
    // Initialize ConnectyCube and get user session
    useEffect(() => {
        const initializeChat = async () => {
            try {
                // Initialize and load complete group chat using service
                const chatData = await initializeAndLoadGroupChat(groupId);
                setUserId(chatData.userId);
                setGroup(chatData.group);
                setMessages(chatData.messages);
                
                // Also store the Firebase UID for direct messaging
                const currentFirebaseUid = auth().currentUser?.uid;
                setFirebaseUid(currentFirebaseUid);
                
                setLoading(false);
                
            } catch (error) {
                setLoading(false);
            }
        };

        initializeChat();
    }, [groupId]);

    // Auto-scroll to bottom whenever messages change
    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom(scrollViewRef);
        }
    }, [messages]);

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
            
            // Create new message with profile picture using service
            const newMessage = await createNewMessageWithProfilePic(messageText, messageResult, userId);

            setMessages(prev => [...prev, newMessage]);
            
            // Scroll to bottom after adding new message
            scrollToBottom(scrollViewRef);

        } catch (error) {
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
                    onRefresh={refreshDirectMessages}
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
                        refreshTrigger={refreshKey}
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
