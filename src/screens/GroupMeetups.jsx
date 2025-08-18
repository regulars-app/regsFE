import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import MeetupView from '../components/MeetupView';
import MainButton from '../components/MainButton';

const GroupMeetups = ({ routeParams }) => {
    const [meetupViewExampleData, setMeetupViewExampleData] = useState([
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
      ]);

    // Handle upcoming meetup data from route params
    useEffect(() => {
        if (routeParams?.upcomingMeetup) {
            // If there's an upcoming meetup, you could highlight it or show it differently
            console.log('Upcoming meetup:', routeParams.upcomingMeetup);
        }
    }, [routeParams]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton size={30} style={styles.backButton} />
      </View>
      <View style={styles.bodyContent}>
        <MeetupView style={styles.surpriseMeetupView} type="surprise" meetups={meetupViewExampleData} screen="group" />
        <View style={styles.meetupViewSeparator} />
        <MeetupView style={styles.meetupView} type="meetup" meetups={meetupViewExampleData} screen="group" />
        <View style={styles.meetupViewSeparator} />
      </View>
      <View style={styles.footer} />
      <MainButton text="Create Meetup" color='green' type='add' style={styles.createMeetupButton}/>
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
  bodyContent: {
    marginTop: 75,
    marginBottom: 150,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  footer: {
    position: 'absolute',
    width: '100%',
    height: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  createMeetupButton: {
    position: 'absolute',
    right: 20,
    bottom: 140,
  },
  meetupViewSeparator: {
    width: '70%',
    borderTopWidth: 1,
    borderColor: '#6E6E6E',
    marginVertical: 10,
  },
  surpriseMeetupView: {
    width: '90%',
    height: 240,
  },
  meetupView: {
    width: '90%',
    height: 350,
  },
});

export default GroupMeetups;
