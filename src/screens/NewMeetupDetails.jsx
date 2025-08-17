import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import BackButton from '../components/BackButton';
import MainButton from '../components/MainButton';
import ProfilePic from '../components/ProfilePic';
import MapWidget from '../components/MapWidget';
import GlassCardButton from '../components/GlassCardButton';
import AdditionalInfoInput from '../components/AdditionalInfoInput';
import { useNavigation } from '@react-navigation/native';

const NewMeetupDetails = () => {
    const navigation = useNavigation();
  
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
            <TouchableOpacity style={{width: '40%'}} onPress={() => navigation.navigate('NewMeetupChooseDate')}>
              <GlassCardButton style={{width: '100%'}} type="calendar" text={"Choose when"}/> 
            </TouchableOpacity>
            <TouchableOpacity style={{width: '40%'}} onPress={() => navigation.navigate('NewMeetupChooseActivity')}>
              <GlassCardButton style={{width: '100%'}} type="activity" text={"Add activity"}/> 
            </TouchableOpacity>
          </View>
          <AdditionalInfoInput style={styles.additionalInfoInput} placeholder={"Add any additional info here e.g. bring crisps etc."}/>
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
  
  export default NewMeetupDetails;