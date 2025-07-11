import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import GlassCard from '../components/GlassCard';
import Countdown from '../components/Countdown';
import MeetupItemButton from '../components/MeetupItemButton';
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
import MessagingSub from '../components/MessagingSub';
import MessagingMain from '../components/MessagingMain';
import MainButton from '../components/MainButton';
import SearchBar from '../components/SearchBar';
import ImageCard from '../components/ImageCard';
import MiniMeetupCard from '../components/MiniMeetupCard';

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

const HomeScreen = () => {
  const [showPopup, setShowPopup] = useState(false);
  return(
  <View style={styles.bg}>
    <Popup showPopup={showPopup} onClose={() => setShowPopup(false)} />
    {/* <ImageBackground source={testImage} style={styles.bg} resizeMode="cover"> */}
    <ScrollView contentContainerStyle={styles.centered}>
      <Post type="text" position="left" text="This is an example of a text post. It's a bit longer than the others, but it's still readable." imageURL="" senderName="Shyam" commentText="Hello, when did you get that? It's soo cool!" />
      <Post type="image" position="right" text="" imageURL={'https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg'} senderName="Shyam" commentText="Hello, when did you get that? It's soo cool!" />
      <Post type="mixed" position="left" text="This is an example of a mixed post. It's a bit longer than the others, but it's still readable." imageURL={'https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg'} senderName="Shyam" commentText="Hello, when did you get that? It's soo cool!" />
      <MeetupCard datetime="10:00 AM" activity="Golf, Cooking, Movie" info="Bring crisps." confirmed="130001, 3493833,33434343,3434343455" />
      <Stack cardWidth={Dimensions.get('window').width} cardHeight={700} data={meetupExampleData} renderItem={({item}) => <MeetupCard {...item} />} />
      <ImageCard imageURL={'https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg'} footer="Example image" width={Dimensions.get('window').width * 0.8} height={200} />
      <Stack cardWidth={Dimensions.get('window').width} cardHeight={250} data={photoStackWideExampleData} renderItem={({item}) => <ImageCard imageURL={item.imageURL} footer={item.footer} width={Dimensions.get('window').width * 0.8} height={200} />} />
      <Stack cardWidth={Dimensions.get('window').width} cardHeight={250} data={photoStackWideExampleData} renderItem={({item}) => <ImageCard imageURL={item.imageURL} footer={item.footer} width={Dimensions.get('window').width * 0.4} aspectRatio={1} />} />
      <Stack cardWidth={Dimensions.get('window').width/2} cardHeight={200} data={meetupExampleData} renderItem={({item}) => <MiniMeetupCard name={item.name} datetime={item.datetime} />} />
      <SearchBar />
      <ItemSelector />
      <ItemDisplayer />
      <TouchableOpacity style={styles.popupDemoButton} onPress={() => setShowPopup(true)}>
        <Text>PopupDemo</Text>
      </TouchableOpacity>

      {/* 
      <Countdown />
      <MeetupItemButton />
    
      <EditButton />
      <ScrollList />
      <MapWidget />
      <TimeSelector />
      <Calendar />
      <Map />
      <BackButton />
      <GroupNav />
      <GlassCardClickable />
      <MessagingSub />
      <MessagingMain />
      <MainButton /> 
      */}
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