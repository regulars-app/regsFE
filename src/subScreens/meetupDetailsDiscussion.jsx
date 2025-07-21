import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Messenger from '../components/Messenger';

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

const MeetupDetailDiscussion = () => {
    return (
        <Messenger  messages={messagesSubDemoData} style={{flex: 1}}/>
    )
}

const styles = StyleSheet.create({
});

export default MeetupDetailDiscussion;