import { View, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from '../components/BackButton';
import { Text } from 'react-native';
import { Dimensions } from 'react-native';
import { useState } from 'react';

import PostView from '../components/PostView';
import Popup from '../components/Popup';
import DailyDiaryPostPopup from '../popups/DailyDiaryPostPopup';

const DailyDiaryReceived = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const posts = [
        {
            id: 1,
            type: "text", 
            position: "left", 
            text: "This is an example of a text post. It's a bit longer than the others, but it's still readable.This is an example of a text post. It's a bit longer than the others, but it's still readable.", 
            imageURL: "", 
            senderName: "Shyam", 
            commentText: "Hello, when did you get that? It's soo cool!"
        },
        {
            id: 2,
            type: "image", 
            position: "right", 
            text: "", 
            imageURL: 'https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg', 
            senderName: "Shyam", 
            commentText: "Hello, when did you get that? It's soo cool!"
        },
        {
            id: 3,
            type: "mixed", 
            position: "left", 
            text: "This is an example of a mixed post. It's a bit longer than the others, but it's still readable.", 
            imageURL: 'https://cdn.pixabay.com/photo/2025/06/11/22/12/kackar-mountains-9655201_1280.jpg', 
            senderName: "Shyam", 
            commentText: "Hello, when did you get that? It's soo cool!"
        }
    ];

    const messagesSubDemoData = [
        {
          chatType: 'sub',
          time: '12:00',
          position: 'left',
          messageType: 'text',
          senderName: 'John Doe',
          messageText: 'Hello, how are you?',
          imageURL: '',
          userID: '1',
        },
        {
          chatType: 'sub',
          time: '12:00',
          position: 'left',
          messageType: 'image',
          senderName: 'John Doe',
          messageText: '',
          imageURL: 'https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg',
          userID: '2',
        },
        {
          chatType: 'sub',
          time: '12:00',
          position: 'left',
          messageType: 'mixed',
          senderName: 'John Doe',
          messageText: 'I\'m ok thanks, i\'ve been doing lots of arts and crafts!',
          imageURL: 'https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg',
          userID: '3',
        },
      ];

  const handlePostAction = (action, postData) => {
    setSelectedPost(postData);
    setShowPopup(true);
  };

  return (
    <View style={styles.container}>
      <Popup showPopup={showPopup} onClose={() => setShowPopup(false)}>
        <DailyDiaryPostPopup 
          onClose={() => setShowPopup(false)}
          onSubmit={() => {}}
          imageURL={selectedPost?.imageURL || ""}
          width={'100%'}
          aspectRatio={1.2}
          messages={messagesSubDemoData}
          text={selectedPost?.text || ""}
          onPostAction={handlePostAction}
        />
      </Popup>
      <View style={styles.header}>
        <BackButton size={30} style={styles.backButton} />
      </View>
      <View style={styles.bodyContent}>
        <PostView posts={posts} style={styles.postView} onPostAction={handlePostAction} />
      </View>
      <View style={styles.footer}>
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
  footer: {
    position: 'absolute',
    width: '100%',
    height: 75,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  bodyContent: {
    marginTop: 75,
    marginBottom: 75,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  postView: {
    width: '100%',
    flex: 1,
  },
});

export default DailyDiaryReceived;
