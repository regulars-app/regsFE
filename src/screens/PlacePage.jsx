import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import BackButton from '../components/BackButton';
import MainButton from '../components/MainButton';
import MapWidget from '../components/MapWidget';
import AdditionalInfoDisplay from '../components/AdditionalInfoDisplay';
import ProfileListCard from '../components/ProfileListCard';
import EditSymbol from '../components/EditSymbol';
import Stack from '../components/Stack';
import ImageCard from '../components/ImageCard';

const PlacePage = () => {

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
          <TouchableOpacity style={styles.editSymbolContainer}>
            <EditSymbol size={15} />
          </TouchableOpacity>
          <Text style={styles.meetupName}>Park Royal Cinema</Text>
        </View>
        <View style={styles.bodyContent}>
          <MapWidget width={'90%'} height={200} style={styles.mapWidget} placeSelected={"parkroyalcinema"}/>
          <AdditionalInfoDisplay style={styles.additionalInfo} text="Bring crisps if you have them!Bring crisps if you have them!Bring c if you have them!Bring c if you have them!Bring c if you have them!Bring crisps if you have them!Bring crisps if you have them!Bring crisps if you have them!"/>
          <Stack style={styles.photoStack} cardWidth={Dimensions.get('window').width} cardHeight={230} data={photoStackWideExampleData} renderItem={({item}) => <ImageCard imageURL={item.imageURL} footer={item.footer} width={Dimensions.get('window').width * 0.8} height={200} />} />
          <ProfileListCard style={styles.profileListCard} clickable={false} selectable={true} showButton={false} type="members" title="Associated Groups?" members={members}/>
        </View>
        <View style={styles.footer}>
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
      editSymbolContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 100,
        padding: 10,
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
      mapWidget: {
        marginTop: 20,
      },
      additionalInfo: {
        width: '90%',
        marginTop: 20,
        maxHeight: 90,
      },
      photoStack: {
        marginTop: 20,
      },
      profileListCard: {
        width: '90%',
        height: 140,
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
  
  export default PlacePage;