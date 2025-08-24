import ConnectyCube from 'react-native-connectycube';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { loadGroupDataForChat } from './groups';

async function initConnectyCube() {
  // ConnectyCube initialization
  const CREDENTIALS = {
    appId: 7810,
    authKey: '27YCRSrLYKc4RLG',
    authSecret: 'z5W5RtVX2DvJKDB',
  };

  ConnectyCube.init(CREDENTIALS);
  console.log('ConnectyCube initialized');

  const result = await ConnectyCube.createSession();
  console.log('Session created:', result);
  const activeUser = auth().currentUser;
  const access_token = await activeUser.getIdToken(true);

  const userCredentials = {
    provider: 'firebase_email',
    firebase_email: {
      project_id: 'regulars-a911e',
      access_token: access_token,
    },
  };

  const user = await ConnectyCube.login(userCredentials);

  return user;
}

async function authenticateChatUser(user) {
  const token = ConnectyCube.service.sdkInstance.session.token;

  const userChatCredentials = {
    userId: user.id,
    password: token,
  };

  ConnectyCube.chat.connect(userChatCredentials);

  ConnectyCube.chat.onMessageListener = onMessage;

  function onMessage(userId, message) {
    console.log(
      '[ConnectyCube.chat.onMessageListener] callback:',
      userId,
      message,
    );
  }
  
  return user.id;
}

async function retrieveDialogs() {
  const dialogs = await ConnectyCube.chat.dialog.list({});
  return dialogs;
}

async function createGroupChat(name, occupants_ids, description, photo, chat_type) {
  const params = {
    type: 2,
    name: name,
    occupants_ids: occupants_ids,
    description: description,
    photo: photo,
    extensions: {
      chat_type: chat_type
    }
  };

  return await ConnectyCube.chat.dialog.create(params);
}

async function sendMessage(dialog, body) {
  await ConnectyCube.chat.muc.join(dialog._id);

  const message = {
    type: dialog.type === 3 ? 'chat' : 'groupchat',
    body: body,
    extension: {
      save_to_history: 1,
      dialog_id: dialog._id,
    },
    markable: 1,
  };

  message.id = ConnectyCube.chat.send(dialog._id, message);

  // sendPushNotification(dialog.occupants_ids, body);
}

async function retrieveMessages(dialog) {
  const dialogId = dialog._id;
  const params = {
    chat_dialog_id: dialogId,
    sort_desc: 'date_sent',
    limit: 100,
    skip: 0,
  };

  return await ConnectyCube.chat.message.list(params);
}

// New chat functions for GroupChatPage
async function initializeGroupChat(groupId) {
  try {
    // Initialize ConnectyCube
    const user = await initConnectyCube();
    console.log('✅ ConnectyCube initialized:', user);
    
    // Authenticate chat user
    const chatUserId = await authenticateChatUser(user);
    console.log('✅ Chat user authenticated:', chatUserId);
    
    // Get user session
    const session = await ConnectyCube.auth.getSession();
    console.log('✅ User session set:', session.user_id);
    
    return {
      user,
      chatUserId,
      session,
      userId: session.user_id
    };
  } catch (error) {
    console.error('❌ Error initializing group chat:', error);
    throw error;
  }
}

async function loadGroupMessages(chatId, limit = 50) {
  try {
    // Get messages from ConnectyCube
    const messagesResult = await ConnectyCube.chat.message.list({
      chat_dialog_id: chatId,
      sort_desc: 'date_sent',
      limit: limit,
      skip: 0,
    });

    return messagesResult;
  } catch (error) {
    console.error('❌ Error loading messages:', error);
    throw error;
  }
}

async function sendGroupMessage(messageText, chatId, senderId) {
  try {
    // Create message object for ConnectyCube
    const messageData = {
      type: 'chat',
      message: messageText,
      markable: 1,
      chat_dialog_id: chatId,
      recipient_id: null, // For group chats, this should be null
      sender_id: senderId,
    };
    
    // Send message using ConnectyCube's message API
    const messageResult = await ConnectyCube.chat.message.create(messageData);
    
    return messageResult;
  } catch (error) {
    console.error('❌ Error sending message:', error);
    throw error;
  }
}

async function formatMessagesForDisplay(messages, currentUserId) {
  if (!messages || !messages.items || messages.items.length === 0) {
    return [];
  }

  // Convert ConnectyCube messages to our format
  const formattedMessages = await Promise.all(messages.items.map(async (msg) => {
    // Get sender's profile picture
    let senderProfilePic = null;
    try {
      // Get sender's profile picture from Firestore (for both current user and others)
      const senderDoc = await firestore().collection('users').where('connectycube_id', '==', msg.sender_id).get();
      if (!senderDoc.empty) {
        const senderData = senderDoc.docs[0].data();
        if (senderData.profile_pic && senderData.profile_pic !== '') {
          senderProfilePic = senderData.profile_pic;
        } else if (msg.sender_id === currentUserId) {
          // If this is the current user and no profile pic in Firestore, try to get from Google auth
          try {
            const currentUser = auth().currentUser;
            if (currentUser && currentUser.photoURL && currentUser.photoURL !== '') {
              senderProfilePic = currentUser.photoURL;
            }
          } catch (error) {
            // Silently handle Google profile picture fallback errors
          }
        }
      }
    } catch (error) {
      // Silently handle profile picture fetch errors
    }

    const formattedMessage = {
      id: msg.id || msg._id,
      chatType: 'main',
      time: new Date(msg.date_sent * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      position: msg.sender_id === currentUserId ? 'right' : 'left',
      messageType: (msg.body || msg.message) ? 'text' : 'image',
      senderName: msg.sender_id === currentUserId ? 'You' : 'Member',
      messageText: msg.body || msg.message || '',
      imageURL: msg.extension?.image_url || '',
      mediaDownloadUrl: msg.extension?.image_url || null,
      senderId: msg.sender_id,
      timestamp: new Date(msg.date_sent * 1000),
      senderProfilePic: senderProfilePic,
      isRead: true,
      isDelivered: true,
    };

    return formattedMessage;
  }));

  return formattedMessages.reverse(); // Show oldest first
}


// Direct chat functions
async function createDirectChat(user1Id, user2Id) {
  try {
    console.log('🔍 Creating direct chat between users:', user1Id, user2Id);
    
    const params = {
      type: 3, // 3 = private chat
      occupants_ids: [user1Id, user2Id],
    };
    
    console.log('📝 Direct chat params:', params);
    
    const directChat = await ConnectyCube.chat.dialog.create(params);
    console.log('✅ Direct chat created successfully:', directChat);
    console.log('🔍 Direct chat ID:', directChat?._id);
    
    return directChat;
  } catch (error) {
    console.error('❌ Error creating direct chat:', error);
    throw error;
  }
}

async function loadDirectMessages(chatId, limit = 50) {
  try {
    const messagesResult = await ConnectyCube.chat.message.list({
      chat_dialog_id: chatId,
      sort_desc: 'date_sent',
      limit: limit,
      skip: 0,
    });

    return messagesResult;
  } catch (error) {
    console.error('❌ Error loading direct messages:', error);
    throw error;
  }
}

// Function to mark messages as read in a direct chat
async function markDirectMessagesAsRead(chatId, currentUserConnectyCubeId) {
  try {
    // Get unread messages from this chat
    const messagesResult = await loadDirectMessages(chatId, 100);
    
    if (messagesResult && messagesResult.items) {
      // Find messages that are not read by current user
      const unreadMessages = messagesResult.items.filter(message => 
        message.sender_id !== currentUserConnectyCubeId && // Not from current user
        (!message.read_ids || !message.read_ids.includes(currentUserConnectyCubeId)) // Not read by current user
      );
      
      // Mark each unread message as read
      for (const message of unreadMessages) {
        try {
          // Use ConnectyCube to mark message as read
          await ConnectyCube.chat.message.read(message._id);
        } catch (error) {
          // Silently handle read marking errors
        }
      }
      
      return unreadMessages.length; // Return count of marked messages
    }
    
    return 0;
  } catch (error) {
    return 0;
  }
}

// Function to get latest message info for direct chat preview
async function getDirectChatPreview(chatId, currentUserConnectyCubeId) {
  try {
    // Load just the latest message
    const messagesResult = await loadDirectMessages(chatId, 1);
    
    if (messagesResult && messagesResult.items && messagesResult.items.length > 0) {
      const latestMessage = messagesResult.items[0];
      
      // Determine if message is unread
      let isUnread = false;
      if (latestMessage.sender_id !== currentUserConnectyCubeId) {
        // Message is from other user, check if current user has read it
        isUnread = !latestMessage.read_ids || !latestMessage.read_ids.includes(currentUserConnectyCubeId);
      }
      
      // Format time
      let time = '';
      if (latestMessage.date_sent) {
        const messageDate = new Date(latestMessage.date_sent * 1000);
        const now = new Date();
        const diffInHours = (now - messageDate) / (1000 * 60 * 60);
        
        if (diffInHours < 1) {
          time = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (diffInHours < 24) {
          time = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
          time = messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
      }
      
      return {
        lastMessage: latestMessage.message || latestMessage.body || 'Message',
        time: time,
        isUnread: isUnread,
        messageId: latestMessage._id,
        senderId: latestMessage.sender_id
      };
    }
    
    return {
      lastMessage: 'Tap to start chatting',
      time: '',
      isUnread: false,
      messageId: null,
      senderId: null
    };
  } catch (error) {
    return {
      lastMessage: 'Tap to start chatting',
      time: '',
      isUnread: false,
      messageId: null,
      senderId: null
    };
  }
}

// Function to create a new message object with profile picture
export async function createNewMessageWithProfilePic(messageText, messageResult, currentUserId, isDirectChat = false) {
    try {
        // Get current user's profile picture
        let senderProfilePic = null;
        try {
            const currentUser = auth().currentUser;
            if (currentUser) {
                const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    if (userData.profile_pic && userData.profile_pic !== '') {
                        senderProfilePic = userData.profile_pic;
                    } else if (currentUser.photoURL && currentUser.photoURL !== '') {
                        // Fallback to Google profile picture
                        senderProfilePic = currentUser.photoURL;
                    }
                }
            }
        } catch (error) {
            console.log('⚠️ Could not get profile picture for new message:', error);
        }

        // Create the new message object
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
            senderProfilePic: senderProfilePic,
            isRead: true,
            isDelivered: true,
        };

        return newMessage;
    } catch (error) {
        console.error('❌ Error creating new message with profile picture:', error);
        // Return a fallback message object
        return {
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
            senderProfilePic: null,
            isRead: true,
            isDelivered: true,
        };
    }
}

// Function to initialize and load complete group chat data
export async function initializeAndLoadGroupChat(groupId, currentUserId) {
    try {
        // Initialize group chat
        const chatData = await initializeGroupChat(groupId);
        
        // Load group data
        const groupData = await loadGroupDataForChat(groupId);
        
        // Load messages for this group
        let messages = [];
        if (groupData?.chat) {
            const messagesResult = await loadGroupMessages(groupData.chat, 50);
            messages = await formatMessagesForDisplay(messagesResult, chatData.userId);
        }
        
        return {
            userId: chatData.userId,
            group: groupData,
            messages: messages
        };
    } catch (error) {
        console.error('❌ Error initializing and loading group chat:', error);
        throw error;
    }
}

// Utility function to scroll to bottom of chat
export function scrollToBottom(scrollViewRef, delay = 100) {
    if (scrollViewRef?.current) {
        setTimeout(() => {
            try {
                // First try to get the content height
                const scrollView = scrollViewRef.current;
                if (scrollView) {
                    // Try to scroll to end first
                    scrollView.scrollToEnd({ animated: true });
                    console.log('✅ Scrolled to end successfully');
                }
            } catch (error) {
                console.log('⚠️ scrollToEnd failed, trying fallback:', error);
                // Fallback: try to scroll to a large number
                try {
                    scrollViewRef.current.scrollTo({ y: 999999, animated: true });
                    console.log('✅ Fallback scroll successful');
                } catch (fallbackError) {
                    console.log('⚠️ Could not scroll to bottom:', fallbackError);
                }
            }
        }, delay);
    } else {
        console.log('⚠️ scrollViewRef is not available');
    }
}


export { 
  initConnectyCube, 
  authenticateChatUser, 
  createGroupChat, 
  sendMessage, 
  retrieveMessages, 
  retrieveDialogs,
  initializeGroupChat,
  loadGroupMessages,
  sendGroupMessage,
  formatMessagesForDisplay,
  createDirectChat,
  loadDirectMessages,
  markDirectMessagesAsRead,
  getDirectChatPreview
};