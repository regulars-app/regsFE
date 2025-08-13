import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import MyFriendsView from '../components/MembersView';
import SearchBar from '../components/SearchBar';
import AdditionalInfoDisplay from '../components/AdditionalInfoDisplay';
import ProfileListCard from '../components/ProfileListCard';
import GlassCardButton from '../components/GlassCardButton';

const PlacePopup = ({onClose}) => {

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
            <Text style={styles.placeName}>Park Royal Cinema</Text>
            <AdditionalInfoDisplay style={styles.additionalInfo} text="Bring crisps if you have them!Bring crisps if you have them!Bring c if you have them!Bring c if you have them!Bring c if you have them!Bring crisps if you have them!Bring crisps if you have them!Bring crisps if you have them!"/>
            <ProfileListCard style={styles.profileListCard} clickable={false} selectable={false} showButton={false} type="members" title="Associated Groups?" members={members}/>
            <View style={styles.glassButtonsContainer}>
                <TouchableOpacity style={styles.glassButton}>
                    <GlassCardButton type="place" text={"View Place"}/> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.glassButton}>
                    <GlassCardButton type="newMeetup" text={"New Meetup"}/> 
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        gap: 20,
    },
    placeName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6E6E6E',
    },
    additionalInfo: {
        height: 75,
        width: '100%',
    },
    profileListCard: {
        height: 135,
    },
    glassButtonsContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        marginBottom: 20,
      },
      glassButton: {
        width: '40%',
      },
});

export default PlacePopup; 