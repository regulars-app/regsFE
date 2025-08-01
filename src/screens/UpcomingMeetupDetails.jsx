import { View, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from '../components/BackButton';
import { Text } from 'react-native';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import GroupNav from '../components/GroupNav';
import SubNav from '../components/SubNav';
import MeetupDetailPlans from '../subScreens/meetupDetatilPlans';
import MeetupDetailDiscussion from '../subScreens/meetupDetailsDiscussion';

const tabs = [
  { title: 'Plans', path: 'plans' },
  { title: 'Discussion', path: 'discussion' },
];

const UpcomingMeetupDetails = () => {
  
  const [currentScreen, setCurrentScreen] = useState('plans');

  const handleTabPress = (path, index) => {
    setCurrentScreen(path);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton size={30} style={styles.backButton} />
        <Text style={styles.meetupName}>Meetup Name</Text>
        <SubNav  tabs={tabs} onTabPress={handleTabPress} initialActiveIndex={0} style={styles.subNav}/>
      </View>
      <View style={styles.tabContent}>
        {/* Render different content based on currentScreen */}
        {currentScreen === 'plans' && <MeetupDetailPlans meetupConfirmed={false} />}
        {currentScreen === 'discussion' && <MeetupDetailDiscussion />}
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
    height: 140,
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    width: '100%',
    height: 140,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  subNav: {
    position: 'absolute',
    bottom: 10,
  },
  meetupName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6E6E6E',
    position: 'absolute',
    top: 40,
  },
  tabContent: {
    marginTop: 140,
    marginBottom: 140,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  groupNav: {
  },
});

export default UpcomingMeetupDetails;
