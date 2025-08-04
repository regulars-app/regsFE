import {React, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from '../components/BackButton';
import { Text } from 'react-native';
import GroupNav from '../components/GroupNav';
import MoreSymbol from '../components/MoreSymbol';
import Messenger from '../components/Messenger';
import DirectMessagesWidget from '../components/DirectMessagesWidget';
import Popup from '../components/Popup';
import DirectMessagerPopup from '../popups/DirectMessagerPopup';

const GroupChatPage = () => {
    const [showDirectMessagerPopup, setShowDirectMessagerPopup] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const groupName = 'Ealing Divas';

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

  const handleMemberPress = (member) => {
    setSelectedMember(member);
    setShowDirectMessagerPopup(true);
  };

  const handleClosePopup = () => {
    setShowDirectMessagerPopup(false);
    setSelectedMember(null);
  };

  return (
    <View style={styles.container}>
      <Popup showPopup={showDirectMessagerPopup} onClose={handleClosePopup} style={styles.popup}>
        <DirectMessagerPopup member={selectedMember} onClose={handleClosePopup}/>
      </Popup>
      <View style={styles.header}>
        <BackButton size={30} style={styles.backButton} />
        <TouchableOpacity style={styles.moreSymbol}>
          <MoreSymbol size={30}/>
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContent}>
        <DirectMessagesWidget style={styles.directMessagesWidget} onMemberPress={handleMemberPress}/>
        <Text style={styles.groupName}>{groupName}</Text>
        <Messenger style={styles.messenger} messages={messagesMainDemoData} paddingHorizontal={20}/>
      </View>
      <View style={styles.footer}>
        <GroupNav style={styles.groupNav}/>
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
    height: 130,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
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
  bodyContent: {
    marginTop: 75,
    marginBottom: 130,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  directMessagesWidget: {
    marginBottom: 10,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#6E6E6E',
  },
  messenger: {
    flex: 1,
    paddingHorizontal: 20,
  },
  groupNav: {
    position: 'absolute',
    bottom: 20,
  },
});

export default GroupChatPage;
