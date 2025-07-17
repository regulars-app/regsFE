import { View, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from '../components/BackButton';
import { Text } from 'react-native';
import Stack from '../components/Stack';
import MeetupCard from '../components/MeetupCard';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import GroupNav from '../components/GroupNav';

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

const MeetupDetails = () => {
  const [selectedTab, setSelectedTab] = useState('Plans');

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton size={50} style={styles.headerButton} />
      </View>
      <View style={styles.meetupNameContainer}>
        <Text style={styles.meetupName}>Meetup Name</Text>
      </View>
      <View style={styles.tabSelector}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Plans' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('Plans')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Plans' && styles.activeTabText,
            ]}
          >
            Plans
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Discussion' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('Discussion')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Discussion' && styles.activeTabText,
            ]}
          >
            Discussion
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.meetupDetailsContainer}>
        <Stack
          cardWidth={Dimensions.get('window').width}
          cardHeight={600}
          data={meetupExampleData}
          renderItem={({ item }) => <MeetupCard {...item} />}
        />
      </View>
      <View style={styles.groupNavContainer}>
        <GroupNav />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF6F0',
    flex: 1,
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  meetupNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  meetupName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
  },
  meetupDetailsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  tabButton: {
    paddingHorizontal: 30,
    paddingVertical: 6,
    marginHorizontal: 10,
    borderRadius: 0,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#666',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
  },
  activeTabText: {
    color: '#333',
    fontWeight: '600',
  },
  groupNavContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
});

export default MeetupDetails;
