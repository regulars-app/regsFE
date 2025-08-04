import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import ProfilePic from '../components/ProfilePic';
import GlassCard from '../components/GlassCard';
import MeetupSymbol from '../components/MeetupSymbol';
import SurpriseEventSymbol from '../components/SurpriseEventSymbol';
import SmartSymbol from '../components/SmartSymbol';
import WildSymbol from '../components/WildSymbol';
import HealthSymbol from '../components/HealthSymbol';
import DiarySymbol from '../components/DiarySymbol';
import CalendarSymbol from '../components/CalendarSymbol';
import GallerySymbol from '../components/GallerySymbol';
import AddPlaceSymbol from '../components/AddPlaceSymbol';
import CameraSymbol from '../components/CameraSymbol';
import NewMeetupSymbol from '../components/NewMeetupSymbol';
import Popup from '../components/Popup';
import PlacePopup from '../popups/PlacePopup';
import AvailabilityPopup from '../popups/AvailabilityPopup';
import PlaceSymbol from '../components/PlaceSymbol';

const Home = () => {

    const [placePopupVisible, setPlacePopupVisible] = useState(false);
    const [availabilityPopupVisible, setAvailabilityPopupVisible] = useState(true);

    const mapImage = require('../images/map.png');

    const groups = [
        {
            id: 1,
            name: 'Group 1',
            imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg',
            upcomingMeetup: true,
            upcomingSurpriseEvent: false,
            challenge: 'smart',
        },
        {
            id: 2,
            name: 'Group 2',
            imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg',
            upcomingMeetup: true,
            upcomingSurpriseEvent: true,
            challenge: 'wild',
        },
        {
            id: 3,
            name: 'Group 3',
            imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg',
            upcomingMeetup: false,
            upcomingSurpriseEvent: true,
            challenge: 'health',
        },
        {
            id: 4,
            name: 'Group 4',
            imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg',
            upcomingMeetup: true,
            upcomingSurpriseEvent: true,
            challenge: false,
        },
    ];

    return (
        <View>
            <Popup showPopup={placePopupVisible} onClose={() => setPlacePopupVisible(false)}>
                <PlacePopup 
                    onClose={() => setPlacePopupVisible(false)}
                />
            </Popup>
            <Popup showPopup={availabilityPopupVisible} onClose={() => setAvailabilityPopupVisible(false)}>
                <AvailabilityPopup 
                    onClose={() => setAvailabilityPopupVisible(false)}
                />
            </Popup>
            <View style={styles.header}>
                <SearchBar style={styles.searchBar}/>
                <ProfilePic size={60} style={styles.profilePic} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
            </View>
            <View style={styles.content}>
                <Image source={mapImage} style={styles.mapImage} />
                <TouchableOpacity style={styles.meetupsButton}>
                    <GlassCard style={styles.buttonGlassCard}>
                        <MeetupSymbol size={25} />
                    </GlassCard>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addPlaceButton}>
                    <GlassCard style={styles.buttonGlassCard}>
                        <AddPlaceSymbol size={35} style={{paddingTop: 6}}/>
                    </GlassCard>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButton}>
                    <GlassCard style={styles.buttonGlassCard}>
                        <CameraSymbol size={30} />
                    </GlassCard>
                </TouchableOpacity>
                <TouchableOpacity style={styles.newMeetupButton}>
                    <GlassCard style={styles.buttonGlassCard}>
                        <NewMeetupSymbol size={30} />
                    </GlassCard>
                </TouchableOpacity>
                <TouchableOpacity style={styles.memoriesButton}>
                    <GlassCard style={styles.buttonGlassCard}>
                        <GallerySymbol size={30} />
                    </GlassCard>
                </TouchableOpacity>
                <View style={styles.sideButtons}>
                    <TouchableOpacity style={styles.availabilityButton}>
                        <GlassCard style={styles.buttonGlassCard}>
                            <DiarySymbol size={30} />
                        </GlassCard>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dailyDiaryButton}>
                        <GlassCard style={styles.buttonGlassCard}>
                            <CalendarSymbol size={30} />
                        </GlassCard>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.placeButton}>
                        <GlassCard style={styles.buttonGlassCard}>
                            <PlaceSymbol size={30} />
                        </GlassCard>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.groupsScrollView} contentContainerStyle={styles.groupsScrollViewContent}>
                    {groups.map((group, index) => (
                            <GlassCard style={styles.groupCardContainer} key={index}>
                                <View style={styles.groupCard} key={index}>
                                    <TouchableOpacity style={styles.profilePicTouchableOpacity}>
                                        <ProfilePic size={40} imageURL={group.imageURL}/>
                                    </TouchableOpacity>
                                    {group.upcomingMeetup && <TouchableOpacity style={styles.groupUpcomingMeetup}><MeetupSymbol size={23} /></TouchableOpacity>}
                                    {group.upcomingSurpriseEvent && <TouchableOpacity style={styles.groupUpcomingSurpriseEvent}><SurpriseEventSymbol size={30} /></TouchableOpacity>}
                                    {group.challenge && <TouchableOpacity style={styles.groupChallenge}>{group.challenge === 'smart' ? <SmartSymbol size={30} /> : group.challenge === 'wild' ? <WildSymbol size={30} /> : group.challenge === 'health' ? <HealthSymbol size={30} /> : null}</TouchableOpacity>}
                                </View>
                            </GlassCard>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 150,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
      },
    searchBar: {
        zIndex: 100,
      },
    profilePic: {   
        zIndex: 100,
      },
    content: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    buttonGlassCard: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    meetupsButton: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        width: 50,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addPlaceButton: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        width: 50,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 170,
        left: 20,
        width: 50,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    newMeetupButton: {
        position: 'absolute',
        bottom: 30,
        left: 90,
        width: 50,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    memoriesButton: {
        position: 'absolute',
        bottom: 30,
        left: 160,
        width: 50,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sideButtons: {
        position: 'absolute',
        right: 20,
        flexDirection: 'column',
        gap: 20,
    },
    availabilityButton: {
        width: 50,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dailyDiaryButton: {
        width: 50,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeButton: {
        width: 50,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    groupsScrollView: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        maxHeight: 172,
    },
    groupsScrollViewContent: {
        gap: 10,
        paddingBottom: 10,
        paddingTop: 2,
    },
    groupCardContainer: {
        borderRadius: 50,
        backgroundColor: 'transparent',
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    groupCard: {
        padding: 5,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5,
    },
    groupUpcomingMeetup: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 1,
    },
    groupUpcomingSurpriseEvent: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 1,
    },
    groupChallenge: {
        width: 40,
        height: 40,
        borderRadius: 50,   
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',   
        elevation: 1,
    },
});

export default Home;