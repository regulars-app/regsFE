import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import GlassCard from '../components/GlassCard';
import Countdown from '../components/Countdown';
import MeetupItemButton from '../components/MeetupItemButton';
import MeetupCard from '../components/MeetupCard';
import EditButton from '../components/EditButton';
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

const mapImage = require('../images/map.png');

const HomeScreen = () => (
  <View style={styles.bg}>
    {/* <ImageBackground source={testImage} style={styles.bg} resizeMode="cover"> */}
    <ScrollView contentContainerStyle={styles.centered}>
      <Post type="text" position="left" text="Heoadsfcsdasdadsacsdkcmsdklmclksdmcksdkcmsdcdsadasdassdfsdfdsfsd" imageURI="" senderName="Shyam" commentText="Hello, when did you get that? It's soo cool!" />
      <Post type="image" position="right" text="Heoadsfcsdasdadsadsadasdassdfsdfdsfsd" imageURI={require('../images/map.png')} senderName="Shyam" commentText="Hello, when did you get that? It's soo cool!" />
      <Post type="mixed" position="left" text="Heoadsfcsdasdadsadsadasdassdfsdfdsfsd" imageURI={require('../images/map.png')} senderName="Shyam" commentText="Hello, when did you get that? It's soo cool!" />

      {/* 
      <SearchBar />
      <Stack />
      <GlassCard>
        <Text style={styles.text}>test of the glass card</Text>
      </GlassCard>
      <Countdown />
      <MeetupItemButton />
      <MeetupCard />
      <EditButton />
      <ScrollList />
      <MapWidget />
      <ItemDisplayer />
      <ItemSelector />
      <TimeSelector />
      <Calendar />
      <Popup />
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

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF6F0',
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
});

export default HomeScreen;