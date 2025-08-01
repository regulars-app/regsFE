import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';
import BackButton from '../components/BackButton';
import MainButton from '../components/MainButton';
import ProfilePic from '../components/ProfilePic';
import MapWidget from '../components/MapWidget';
import GlassCardButton from '../components/GlassCardButton';
import AdditionalInfoInput from '../components/AdditionalInfoInput';
import ItemSelector from '../components/ItemSelector';
import ClashView from '../components/ClashView';

const NewMeetupChooseActivity = () => {

    const clashItems = [
        { userID: '1', content: 'John Doe cannot do the dishes' },
        { userID: '2', content: 'Jane Doe cannot do the dishes' },
        { userID: '3', content: 'Jim Doe cannot do the dishes' },
        { userID: '4', content: 'John Doe cannot do the dishes' },
      ];
  
    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <BackButton size={30} style={styles.backButton} />
          <ProfilePic size={60} style={styles.profilePic} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
        </View>
        <View style={styles.bodyContent}>
            <ItemSelector selectable={true} />
            <ClashView clashItems={clashItems} style={styles.clashView}/>
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
        paddingTop: 100,
        paddingBottom: 140,
      },
      header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 100,
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
      clashView: {
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
      confirmButton: {
        position: 'absolute',
        right: 20,
      },
  });
  
  export default NewMeetupChooseActivity;