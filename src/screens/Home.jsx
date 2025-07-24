import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import GlassCard from '../components/GlassCard';
import Countdown from '../components/Countdown';
import MeetupItemCard from '../components/MeetupItemCard';
import MeetupCard from '../components/MeetupCard';
import EditSymbol from '../components/EditSymbol';
import ScrollList from '../components/ScrollList';
import ProfilePic from '../components/ProfilePic';
import MapWidget from '../components/MapWidget';
import Post from '../components/Post';
import ItemDisplayer from '../components/ItemDisplayer';
import ItemSelector from '../components/ItemSelector';
import TimeSelector from '../components/TimeSelector';
import Calendar from '../components/Calendar';
import Stack from '../components/Stack';
import Popup from '../components/Popup';
import Map from '../components/Map';
import BackButton from '../components/BackButton';
import GroupNav from '../components/GroupNav';
import GlassCardClickable from '../components/GlassCardClickable';
import MainButton from '../components/MainButton';
import SearchBar from '../components/SearchBar';
import ImageCard from '../components/ImageCard';
import MiniMeetupCard from '../components/MiniMeetupCard';
import Messenger from '../components/Messenger';
import PostView from '../components/PostView';
import MeetupView from '../components/MeetupView';
import ChatSummaryCard from '../components/ChatSummaryCard';
import ProfileListCard from '../components/ProfileListCard';
import GroupsScoreCard from '../components/GroupsScoreCard';
import AvailabilityCard from '../components/AvailabilityCard';
import PreviousSymbol from '../components/PreviousSymbol';
import AddFriendItem from '../components/AddFriendItem';
import FriendItem from '../components/FriendItem';
import SettingsItem from '../components/SettingsItem';
import PlaceItem from '../components/PlaceItem';
import AcceptFriendItem from '../components/AcceptFriendItem';
import IncommingFriendRequestView from '../components/IncommingFriendRequestView';
import AddFriendsView from '../components/AddFriendsView';
import MyFriendsView from '../components/MyFriendsView';
import SettingsView from '../components/SettingsView';
import PlacesView from '../components/PlacesView';
import SubNav from '../components/SubNav';
import ChallengeWriterBox from '../components/ChallengeWriterBox';
import EvidenceTypeSelector from '../components/EvidenceTypeSelector';
import EvidenceUploader from '../components/EvidenceUploader';
import AdditionalInfoInput from '../components/AdditionalInfoInput';
import DiaryInput from '../components/DiaryInput';
import ChallengeDisplayer from '../components/ChallengeDisplayer';
import ClashView from '../components/ClashView';
import SurpriseEventToggle from '../components/SurpriseEventToggle';
import ViewFinder from '../components/ViewFinder';
import TakenPhoto from '../components/TakenPhoto';

const mapImage = require('../images/map.png');

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

const meetupViewExampleData = [
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
    confirmed: '',
  },
  {
    id: '3',
    name: 'Dinner',
    datetime: '6:00 PM',
    activity: 'Dinner, Board Games',
    info: 'Don\'t forget your favorite game!',
    confirmed: '330003, 5593855,33434343,3434343455',
  },
  {
    id: '4',
    name: 'Dinner',
    datetime: '6:00 PM',
    activity: 'Dinner, Board Games',
    info: 'Don\'t forget your favorite game!',
    confirmed: '330003, 5593855,33434343,3434343455',
  },
  {
    id: '5',
    name: 'Dinner',
    datetime: '6:00 PM',
    activity: 'Dinner, Board Games',
    info: 'Don\'t forget your favorite game!',
    confirmed: '',
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

const requests = [
  { name: 'John Doe' },
  { name: 'Jane Doe' },
  { name: 'Jim Doe' },
];

const potentialFriends = [
    { name: 'John Doe' },
    { name: 'Jane Doe' },
    { name: 'Jim Doe' },
    { name: 'John Doe' },
    { name: 'Jane Doe' },
    { name: 'Jim Doe' },
    { name: 'John Doe' },
    { name: 'Jane Doe' },
    { name: 'Jim Doe' },
];

const friends = [
  { name: 'John Doe' },
  { name: 'Jane Doe' },
  { name: 'Jim Doe' },
  { name: 'John Doe' },
  { name: 'Jane Doe' },
  { name: 'Jim Doe' },
  { name: 'John Doe' },
  { name: 'Jane Doe' },
  { name: 'Jim Doe' },
];

const settings = [
  { name: 'Privacy' },
  { name: 'Notifications' },
  { name: 'Language' },
  { name: 'About' },
  { name: 'Privacy' },
  { name: 'Notifications' },
  { name: 'Language' },
  { name: 'About' },
];

const places = [
  { name: 'Pani\'s house',
    myPlace: true,
    group: 'group1',
   },
  { name: 'Pani\'s house',
    myPlace: true,
    group: 'group1',
   },
  { name: 'Pani\'s house',
    myPlace: false,
    group: 'group2',
   },
  { name: 'Pani\'s house',
    myPlace: false,
    group: 'group1',
   },
  { name: 'Pani\'s house',
    myPlace: true,
    group: null,
   },
  { name: 'Pani\'s house',
    myPlace: false,
    group: 'group1',
   },
  { name: 'Pani\'s house',
    myPlace: false,
    group: 'group1',
   },
  { name: 'Pani\'s house',
    myPlace: true,
    group: null,
   },
  { name: 'Pani\'s house',
    myPlace: false,
    group: 'group1',
   },
];

const tabs = [
  { title: 'Plans', path: 'plans' },
  { title: 'Discussion', path: 'discussion' },
  { title: 'Jeffrey', path: 'jeffrey' },
];

const clashItems = [
  { userID: '1', content: 'John Doe cannot do the dishes' },
  { userID: '2', content: 'Jane Doe cannot do the dishes' },
  { userID: '3', content: 'Jim Doe cannot do the dishes' },
  { userID: '4', content: 'John Doe cannot do the dishes' },
];

const HomeScreen = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('plans');

  const handleTabPress = (path, index) => {
    setCurrentScreen(path);
  };
  return(
  <View style={styles.bg}>
    <Popup showPopup={showPopup} onClose={() => setShowPopup(false)} />
    {/* <ImageBackground source={testImage} style={styles.bg} resizeMode="cover"> */}
    <ScrollView contentContainerStyle={styles.centered}>

      <PostView style={{height: 500}}/>
      <MeetupCard datetime="10:00 AM" activity="Golf, Cooking, Movie" info="Bring crisps." confirmed="130001, 3493833,33434343,3434343455" style={{height: 675}} members={members}/>
      <Stack cardWidth={Dimensions.get('window').width} cardHeight={700} data={meetupExampleData} renderItem={({item}) => <MeetupCard {...item} members={members}/>} />
      <ImageCard imageURL={'https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg'} footer="Example image" width={Dimensions.get('window').width * 0.8} height={200} />
      <Stack cardWidth={Dimensions.get('window').width} cardHeight={250} data={photoStackWideExampleData} renderItem={({item}) => <ImageCard imageURL={item.imageURL} footer={item.footer} width={Dimensions.get('window').width * 0.8} height={200} />} />
      <Stack cardWidth={Dimensions.get('window').width} cardHeight={250} data={photoStackWideExampleData} renderItem={({item}) => <ImageCard imageURL={item.imageURL} footer={item.footer} width={Dimensions.get('window').width * 0.4} aspectRatio={1} />} />
      <Stack cardWidth={Dimensions.get('window').width/2} cardHeight={200} data={meetupExampleData} renderItem={({item}) => <MiniMeetupCard name={item.name} datetime={item.datetime} />} />
      <SearchBar />
      <ItemSelector />
      <ItemDisplayer title="My Preferences" />
      <TouchableOpacity style={styles.popupDemoButton} onPress={() => setShowPopup(true)}>
        <Text>PopupDemo</Text>
      </TouchableOpacity>
      <Messenger style={{height: 500}} messages={messagesMainDemoData}/>
      <Messenger style={{height: 500}} messages={messagesSubDemoData}/>
      <BackButton size={40}/>
      <GroupNav />
      <MeetupView style={{height: 400}} type="meetup" meetups={meetupViewExampleData} />
      <MeetupView style={{height: 400}} type="surprise" meetups={meetupViewExampleData} />
      <ChatSummaryCard overallSummary="This is a summary of the overall vibe of the chat. It is a summary of the overall vibe of the chat. It is a summary of the overall vibe of the chat." vibeSummary="This is a summary of the vibe of the chat. It is a summary of the vibe of the chat. It is a summary of the vibe of the chat." personalSummary="This is a summary of the personal vibe of the chat. It is a summary of the personal vibe of the chat. It is a summary of the personal vibe of the chat." groupID="1" />
      <ProfileListCard clickable={true} selectable={false} showButton={true} type="groups" members={members}/>
      <ProfileListCard clickable={false} selectable={true} showButton={true} type="members" title="Who's the surprise for?" members={members}/>
      <GroupsScoreCard />
      <AvailabilityCard />
      <Calendar visualAdjust={100}/>
      <TimeSelector title="From:"/>
      <TimeSelector title="To:"/>
      <AddFriendItem name="John Doe" requested={false}/>
      <FriendItem name="John Doe"/>
      <SettingsItem name="Privacy"/>
      <PlaceItem name="Pani's house"/>
      <AcceptFriendItem name="John Doe"/>
      <IncommingFriendRequestView height={200} requests={requests}/>
      <AddFriendsView height={400} potentialFriends={potentialFriends}/>
      <MyFriendsView height={400} friends={friends}/>
      <SettingsView height={400} settings={settings}/>
      <PlacesView height={400} places={places}/>
      <SubNav tabs={tabs} onTabPress={handleTabPress} initialActiveIndex={0}/>
      {/* Render different content based on currentScreen */}
      {currentScreen === 'plans' && <Text>Plans</Text>}
      {currentScreen === 'discussion' && <Text>Discussion</Text>}
      {currentScreen === 'jeffrey' && <Text>Jeffrey</Text>}
      <ChallengeWriterBox challengeType="smart" />
      <EvidenceTypeSelector />
      <EvidenceUploader challenger="John Doe" evidenceType="text" />
      <AdditionalInfoInput />
      <DiaryInput />
      <ChallengeDisplayer challengeType="smart" challengeContent={"Make a poem that encodes a secret message for us."}/>
      <ClashView clashItems={clashItems}/>
      <SurpriseEventToggle />
      <Countdown />
      <ViewFinder style={{height: 800}}/>
      <TakenPhoto style={{height: 700}}/>
    </ScrollView>
    {/* </ImageBackground> */}
  </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF6F0',
    position: 'relative',
  },
  centered: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
    color: '#333',
  },
  popupDemoButton: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default HomeScreen;