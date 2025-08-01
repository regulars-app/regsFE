import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Stack from '../components/Stack';
import MeetupCard from '../components/MeetupCard';

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
      info: "Don't forget your favorite game!",
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

const MeetupDetailPlans = ({meetupConfirmed}) => {
    return (
      <View>
        {meetupConfirmed ?
        <MeetupCard datetime="10:00 AM" activity="Golf, Cooking, Movie" info="Bring crisps." confirmed="130001, 3493833,33434343,3434343455" style={{height: 650}} members={members}/>
        :
        <Stack
        cardWidth={Dimensions.get('window').width}
        cardHeight={650}
        data={meetupExampleData}
        renderItem={({ item }) => <MeetupCard {...item} members={members}/>}
        />}
      </View>
    )
}

const styles = StyleSheet.create({
});

export default MeetupDetailPlans;