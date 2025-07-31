import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import BackButton from '../components/BackButton';
import SettingsSymbol from '../components/SettingsSymbol';
import ProfilePic from '../components/ProfilePic';
import EditSymbol from '../components/EditSymbol';
import GlassCardButton from '../components/GlassCardButton';
import ProfileListCard from '../components/ProfileListCard';
import MapWidget from '../components/MapWidget';
import Popup from '../components/Popup';
import AddFriendsPopup from '../popups/AddFriendsPopup';
import MyFriendsPopup from '../popups/MyFriendsPopup';
import SettingsPopup from '../popups/SettingsPopup';

const Profile = ({name, username}) => {

    const [showAddFriendsPopup, setShowAddFriendsPopup] = useState(false);
    const [showMyFriendsPopup, setShowMyFriendsPopup] = useState(false);
    const [showSettingsPopup, setShowSettingsPopup] = useState(false);

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
          <Popup showPopup={showAddFriendsPopup} onClose={() => setShowAddFriendsPopup(false)}>
            <AddFriendsPopup 
              onClose={() => setShowAddFriendsPopup(false)}
            />
          </Popup>
          <Popup showPopup={showMyFriendsPopup} onClose={() => setShowMyFriendsPopup(false)}>
            <MyFriendsPopup 
              onClose={() => setShowMyFriendsPopup(false)}
            />
          </Popup>
          <Popup showPopup={showSettingsPopup} onClose={() => setShowSettingsPopup(false)}>
            <SettingsPopup 
              onClose={() => setShowSettingsPopup(false)}
            />
          </Popup>
        <View style={styles.header}>
          <BackButton size={30} style={styles.backButton} />
          <TouchableOpacity onPress={() => setShowSettingsPopup(true)} style={styles.settingsButton}>
            <SettingsSymbol size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContent}>
           <View style={styles.profileSection}>
                <View style={styles.profilePicture}>
                    <ProfilePic size={120} style={styles.profilePic} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                    <TouchableOpacity style={styles.editButton}>
                        <EditSymbol size={15} />
                    </TouchableOpacity>
                </View>
                <View style={styles.profileInfo}>
                    <Text>{name}</Text>
                    <Text>{username}</Text>
                </View>
           </View>
           <View style={styles.glassButtonsContainer}>
                <TouchableOpacity onPress={() => setShowMyFriendsPopup(true)} style={styles.glassButton}>
                    <GlassCardButton type="myFriends" text={"My Friends"}/> 
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowAddFriendsPopup(true)} style={styles.glassButton}>
                    <GlassCardButton type="addFriend" text={"Add Friend"}/> 
                </TouchableOpacity>
            </View>
            <ProfileListCard title={"My Groups"} clickable={true} selectable={false} showButton={true} type="groups" members={members} style={styles.profileListCard} scrollEnabled={!showAddFriendsPopup && !showMyFriendsPopup && !showSettingsPopup}/>
            <MapWidget width={'90%'} height={200} style={styles.mapWidget} placeSelected={true}/>
            <View style={styles.glassButtonsContainer2}>
                <TouchableOpacity style={styles.glassButton}>
                    <GlassCardButton type="myInterests" text={"My Interests"}/> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.glassButton}>
                    <GlassCardButton type="foodPreferences" text={"Food Preferences"}/> 
                </TouchableOpacity>
            </View>
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
        width: '100%',
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
        profileSection: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 60,
        },
        profilePicture: {
            position: 'relative'
        },
        profilePic: {
            position: 'relative',
        },
        editButton: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: 'white',
            borderRadius: 100,
            padding: 10,
        },
        glassButtonsContainer: {
            width: '100%',
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
            marginTop: 40,
          },
          glassButton: {
            width: '40%',
          },
          profileListCard: {
            marginTop: 20,
            height: 210,
            width: '90%',
          },
          mapWidget: {
            marginTop: 20,
          },
          glassButtonsContainer2: {
            width: '100%',
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
            marginTop: 20,
          },
        settingsButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        },
        backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        },
});

export default Profile;