import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';
import BackButton from '../components/BackButton';
import MainButton from '../components/MainButton';
import ProfilePic from '../components/ProfilePic';
import MapWidget from '../components/MapWidget';
import GlassCardButton from '../components/GlassCardButton';
import AdditionalInfoInput from '../components/AdditionalInfoInput';
import ProfileListCard from '../components/ProfileListCard';

const SurpriseEventDetails = () => {

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
        <View style={styles.header}>
          <BackButton size={30} style={styles.backButton} />
          <ProfilePic size={60} style={styles.profilePic} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
          <TextInput 
            style={styles.meetupName} 
            placeholder={`Meetup Name...`}
            multiline={false}
            fontWeight="600"
            placeholderTextColor="rgba(110, 110, 110, 0.5)"
            numberOfLines={1}
            maxLength={25}
        />
        </View>
        <View style={styles.bodyContent}>
          <MapWidget width={'90%'} height={200} placeSelected={null}/>
          <View style={styles.glassButtonsContainer}>
            <GlassCardButton style={{width: '40%'}} type="calendar" text={"Choose when"}/> 
            <GlassCardButton style={{width: '40%'}} type="activity" text={"Add activity"}/> 
          </View>
          <AdditionalInfoInput style={styles.additionalInfoInput} placeholder={"Add any additional info here e.g. bring crisps etc."}/>
          <ProfileListCard style={styles.profileListCard} clickable={false} selectable={true} showButton={false} type="members" title="Who's the surprise for?" members={members}/>
        </View>
        <View style={styles.footer}>
            <MainButton text="Confirm" color="green" type="confirm" style={styles.confirmButton} />    
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF6F0',
        height: '100%',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 140,
        paddingBottom: 140,
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
      bodyContent: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
      },
      glassButtonsContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        marginTop: 20,
      },
      additionalInfoInput: {
        width: '90%',
        marginTop: 20,
      },
      profileListCard: {
        width: '90%',
        marginTop: 20,
      },
      backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
      },
      profilePic: {
        position: 'absolute',
        top: 20,
        right: 20,
      },
      meetupName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#6E6E6E',
        position: 'absolute',
        bottom: 10,
      },
      confirmButton: {
        position: 'absolute',
        right: 20,
      },
  });
  
  export default SurpriseEventDetails;