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


export { initConnectyCube, authenticateChatUser, createGroupChat, sendMessage, retrieveMessages, retrieveDialogs };