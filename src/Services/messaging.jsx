import ConnectyCube from 'react-native-connectycube';
import auth from '@react-native-firebase/auth';

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

function formatMessagesForDisplay(messages, currentUserId) {
  if (!messages || !messages.items || messages.items.length === 0) {
    return [];
  }

  // Convert ConnectyCube messages to our format
  const formattedMessages = messages.items.map(msg => ({
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
    senderPic: null,
    isRead: true,
    isDelivered: true,
  }));

  return formattedMessages.reverse(); // Show oldest first
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
  formatMessagesForDisplay
};