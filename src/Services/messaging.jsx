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


export { initConnectyCube, authenticateChatUser };