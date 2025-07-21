import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProfilePic from './ProfilePic';
import GlassCard from './GlassCard';
import MapWidget from './MapWidget';
import MainButton from './MainButton';
import CountdownSymbol from './CountdownSymbol';
import ActivitySymbol from './ActivitySymbol';
import InfoSymbol from './InfoSymbol';
import ConfirmedSymbol from './ConfirmedSymbol';
import ProfileListCard from './ProfileListCard';

const MeetupCard = ({datetime, activity, info, confirmed, style, members}) => {

    
  return(
<View style={[styles.container, style]}>
    <View style={styles.meetupCardBodyWrapper}>
      <ProfilePic size={60} style={styles.profilePic} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
      <GlassCard style={styles.meetupCardBody}>
        <MapWidget width={'85%'} height={165} />
        <GlassCard style={styles.meetupCardDetails}>
            <View style={styles.meetupCardDetailsItemWrapper}>
                <View style={styles.meetupCardDetailsItem}>
                    <CountdownSymbol size={15} />
                    <Text>{datetime}</Text>
                </View>
                <View style={styles.meetupCardDetailsItem}>
                    <ActivitySymbol />
                    <Text>{activity}</Text>
                </View>
                <View style={styles.meetupCardDetailsItem}>
                    <InfoSymbol />
                    <Text>{info}</Text>
                </View>
                <View style={styles.meetupCardDetailsItem}>
                    <ConfirmedSymbol />
                    <Text>Confirmed</Text>
                </View>
                <ProfileListCard style={styles.membersCard} showGroupButton={false} clickable={false}  type="members" members={members}/>
            </View>
        </GlassCard>
        <View style={styles.meetupCardFooter}>
            <MainButton text="Suggest" color="yellow" type="suggest" />
            <MainButton text="Doable" color="green" type="doable" />
        </View>
      </GlassCard>
    </View>
  </View>
  )};

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 8,
      alignSelf: 'center',
      width: '95%',
      height: '640',
      paddingTop: 30,
      paddingLeft: 42,
      paddingRight: 42,
    },
    meetupCardBodyWrapper: {
      position: 'relative',
      overflow: 'visible',
      alignSelf: 'flex-start',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    meetupCardBody: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    meetupCardDetailsItemWrapper: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    meetupCardDetails: {
      width: '85%',
      height: '50%',
      alignSelf: 'center',
    },
    meetupCardDetailsItem: {
      flexDirection: 'row',
      gap: 10,
      alignSelf: 'flex-start',
      paddingLeft: 20,
      paddingTop: 10,
      paddingBottom: 10,
      alignItems: 'center',
    },
    membersCard: {
      width: '100%',
      height: 135,
      alignSelf: 'center',
      elevation: 0,
      backgroundColor: 'white',
    },
    profilePic: {
      position: 'absolute',
      zIndex: 100,
      top: -30,
      right: -30,
    },
    meetupCardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 12,
    },
  });
export default MeetupCard;
