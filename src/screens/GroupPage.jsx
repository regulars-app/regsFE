import { View, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from '../components/BackButton';
import { Text } from 'react-native';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import GroupNav from '../components/GroupNav';
import ProfilePic from '../components/ProfilePic';
import Stack from '../components/Stack';
import ImageCard from '../components/ImageCard';
import MapWidget from '../components/MapWidget';
import Popup from '../components/Popup';
import PlacesPopup from '../popups/PlacesPopup';
import GroupMembersPopup from '../popups/GroupMembersPopup';
import GroupsScoreCard from '../components/GroupsScoreCard';
import MiniMeetupCard from '../components/MiniMeetupCard';
import ChatSummaryCard from '../components/ChatSummaryCard';
import ProfileListCard from '../components/ProfileListCard';

const GroupPage = () => {

    const [showPlacesPopup, setShowPlacesPopup] = useState(false);
    const [showGroupMembersPopup, setShowGroupMembersPopup] = useState(false);

    const photoStackWideExampleData = [
        {
          id: '1',
          imageURL: 'https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg',
          footer: 'Octopus pasta at Pani\'s house!',
        },
        {
          id: '2',
          imageURL: 'https://cdn.pixabay.com/photo/2025/06/11/22/12/kackar-mountains-9655201_1280.jpg',
          footer: 'Beach Freddo',
        },
        {
          id: '3',
          imageURL: 'https://cdn.pixabay.com/photo/2025/06/03/05/11/louvre-9638315_1280.jpg',
          footer: 'Idiot sandwich',
        },
      ];

    const meetupExampleData = [
    {
        id: '1',
        name: 'Football',
        datetime: '10:00 AM',
        activity: 'Golf, Cooking, Movie',
        info: 'Bring crisps.',
        confirmed: '130001, 3493833,33434343,3434343455',
    },
    {
        id: '2',
        name: 'Hiking',
        datetime: '2:30 PM',
        activity: 'Hiking, Painting',
        info: 'Meet at the park entrance.',
        confirmed: '230002, 4593844,33434343,3434343455',
    },
    {
        id: '3',
        name: 'Dinner',
        datetime: '6:00 PM',
        activity: 'Dinner, Board Games',
        info: 'Don\'t forget your favorite game!',
        confirmed: '330003, 5593855,33434343,3434343455',
    },
    ];

    const members = [
        { id: 1, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 2, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 3, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 4, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 5, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 6, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 7, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 8, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 9, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 10, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 11, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 12, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 13, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 14, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 15, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 16, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 17, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 18, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 19, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 20, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
        { id: 21, imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg' },
      ];
      

  return (
    <View style={styles.container}>
        <Popup showPopup={showPlacesPopup} onClose={() => setShowPlacesPopup(false)}>
            <PlacesPopup onClose={() => setShowPlacesPopup(false)}/>
        </Popup>
        <Popup showPopup={showGroupMembersPopup} onClose={() => setShowGroupMembersPopup(false)}>
            <GroupMembersPopup onClose={() => setShowGroupMembersPopup(false)}/>
        </Popup>
      <View style={styles.header}>
        <BackButton size={30} style={styles.backButton} />
        <ProfilePic size={60} style={styles.profilePic} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
      </View>
      <View style={styles.bodyContent}>
        <Text style={styles.groupName}>Group Name</Text>
        <View style={styles.row}>
            <Stack 
                style={styles.photoStack} 
                sideOffset={20} 
                cardWidth={150} 
                cardHeight={150} 
                data={photoStackWideExampleData} 
                renderItem={({item}) => <ImageCard imageURL={item.imageURL} height={150} width={150} />} 
            />
            <TouchableOpacity onPress={() => setShowPlacesPopup(true)}>
                <MapWidget placeSelected={true} style={[styles.mapWidget, { pointerEvents: showPlacesPopup || showGroupMembersPopup ? "none" : "auto" }]} scrollEnabled={!showPlacesPopup && !showGroupMembersPopup} />
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <GroupsScoreCard style={styles.groupsScoreCard}/>
            <Stack cardWidth={180} cardHeight={150} sideOffset={20} data={meetupExampleData} renderItem={({item}) => <MiniMeetupCard name={item.name} datetime={item.datetime} width={180} height={150} />} />
        </View>
        <ChatSummaryCard style={styles.chatSummaryCard} overallSummary="This is a summary of the overall vibe of the chat. It is a summary of the overall vibe of the chat. It is a summary of the overall vibe of the chat." vibeSummary="This is a summary of the vibe of the chat. It is a summary of the vibe of the chat. It is a summary of the vibe of the chat." personalSummary="This is a summary of the personal vibe of the chat. It is a summary of the personal vibe of the chat. It is a summary of the personal vibe of the chat." groupID="1" />
        <TouchableOpacity onPress={() => setShowGroupMembersPopup(true)}>
            <ProfileListCard style={styles.profileListCard} clickable={true} selectable={false} showButton={true} type="members" title={false} members={members} onPress={() => setShowGroupMembersPopup(true)}/>
        </TouchableOpacity>
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
    height: 120,
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
    marginBottom: 120,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  profilePic: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6E6E6E',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 20,
    
  },
  photoStack: {
  },
  mapWidget: {
    width: 180,
    height: 150,
  },
  groupsScoreCard: {
    width: 150,
    height: 150,
  },
  miniMeetupCard: {
   
  },
  chatSummaryCard: {
    marginTop: 20,
    width: '85%',
  },
  profileListCard: {
    height: 135,
    width: '85%',
    marginTop: 10,
  },
  groupNav: {
    position: 'absolute',
    bottom: 20,
  },
});

export default GroupPage;
