import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import ProfilePic from '../components/ProfilePic';
import Messenger from '../components/Messenger';

const DirectMessagerPopup = ({member, onClose}) => {

    const messagesMainDemoData = [
        {
          chatType: 'main',
          time: '12:00',
          position: 'left',
          messageType: 'text',
          senderName: 'John Doe',
          messageText: 'Hello, how are you?',
          imageURL: '',
        },
        {
          chatType: 'main',
          time: '12:00',
          position: 'right',
          messageType: 'image',
          senderName: 'John Doe',
          messageText: '',
          imageURL: 'https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg',
        },
        {
          chatType: 'main',
          time: '12:00',
          position: 'left',
          messageType: 'mixed',
          senderName: 'John Doe',
          messageText: 'I\'m ok thanks, i\'ve been doing lots of arts and crafts!',
          imageURL: 'https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg',
        },
      ];

    return (
        <View style={styles.container}>
            <Messenger messages={messagesMainDemoData} style={styles.messenger}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        height: 800,
        paddingBottom: 20,
    },
    messenger: {
        width: '100%',
        flex: 1,
    },
});

export default DirectMessagerPopup; 