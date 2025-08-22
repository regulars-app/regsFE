import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
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
import GlassCardButton from '../components/GlassCardButton';
import CreateGroupPopup from '../popups/CreateGroupPopup';
import { getCurrentUserGroups } from '../Services/groups';

const Home = ({navigation}) => {
    const [placePopupVisible, setPlacePopupVisible] = useState(false);
    const [availabilityPopupVisible, setAvailabilityPopupVisible] = useState(false);
    const [createGroupPopupVisible, setCreateGroupPopupVisible] = useState(false);
    const [groups, setGroups] = useState([]);
    const [isLoadingGroups, setIsLoadingGroups] = useState(true);

    const mapImage = require('../images/map.png');

    // Load user's groups on component mount
    useEffect(() => {
        loadUserGroups();
    }, []);

    // Reload groups when create group popup closes (in case a new group was created)
    useEffect(() => {
        if (!createGroupPopupVisible) {
            loadUserGroups();
        }
    }, [createGroupPopupVisible]);

    const loadUserGroups = async () => {
        try {
            setIsLoadingGroups(true);
            const userGroups = await getCurrentUserGroups();
            
            // Transform the group data to match the expected format
            const formattedGroups = userGroups.map(group => ({
                id: group.id,
                name: group.name,
                imageURL: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg', // Default group image
                upcomingMeetup: false, // TODO: Implement actual meetup checking
                upcomingSurpriseEvent: false, // TODO: Implement actual surprise event checking
                challenge: false, // TODO: Implement actual challenge checking
                // Keep the original group data for navigation
                originalGroup: group
            }));
            
            setGroups(formattedGroups);
        } catch (error) {
            console.error('Error loading user groups:', error);
            Alert.alert('Error', 'Failed to load groups');
        } finally {
            setIsLoadingGroups(false);
        }
    };

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
            <Popup showPopup={createGroupPopupVisible} onClose={() => setCreateGroupPopupVisible(false)}>
                <CreateGroupPopup 
                    onClose={() => setCreateGroupPopupVisible(false)}
                />
            </Popup>
            <View style={styles.header}>
                <SearchBar style={styles.searchBar}/>
                <TouchableOpacity style={styles.profilePic} onPress={() => navigation.navigate('Profile')}>
                    <ProfilePic size={60} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Image source={mapImage} style={styles.mapImage} />
                <TouchableOpacity style={styles.meetupsButton} onPress={() => navigation.navigate('AllMeetups')}>
                    <GlassCard style={styles.buttonGlassCard}>
                        <MeetupSymbol size={25} />
                    </GlassCard>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addPlaceButton} onPress={() => navigation.navigate('AddPlace')}>
                    <GlassCard style={styles.buttonGlassCard}>
                        <AddPlaceSymbol size={35} style={{paddingTop: 6}}/>
                    </GlassCard>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Camera')}>
                    <GlassCard style={styles.buttonGlassCard}>
                        <CameraSymbol size={30} />
                    </GlassCard>
                </TouchableOpacity>
                <TouchableOpacity style={styles.newMeetupButton} onPress={() => navigation.navigate('NewMeetupDetails')}>
                    <GlassCard style={styles.buttonGlassCard}>
                        <NewMeetupSymbol size={30} />
                    </GlassCard>
                </TouchableOpacity>
                <TouchableOpacity style={styles.memoriesButton} onPress={() => navigation.navigate('Memories')}>
                    <GlassCard style={styles.buttonGlassCard}>
                        <GallerySymbol size={30} />
                    </GlassCard>
                </TouchableOpacity>
                <View style={styles.sideButtons}>
                    <TouchableOpacity style={styles.availabilityButton} onPress={() => {setAvailabilityPopupVisible(true)}}>
                        <GlassCard style={styles.buttonGlassCard}>
                            <CalendarSymbol size={30} />
                        </GlassCard>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dailyDiaryButton} onPress={() => navigation.navigate('DailyDiaryPosting')}>
                        <GlassCard style={styles.buttonGlassCard}>
                            <DiarySymbol size={30} />
                        </GlassCard>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.placeButton} onPress={() => {setPlacePopupVisible(true)}}>
                        <GlassCard style={styles.buttonGlassCard}>
                            <PlaceSymbol size={30} />
                        </GlassCard>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.groupsScrollView} contentContainerStyle={styles.groupsScrollViewContent}>
                    {isLoadingGroups ? (
                        <GlassCard style={styles.groupCardContainer}>
                            <View style={styles.groupCard}>
                                <Text style={styles.loadingText}>Loading...</Text>
                            </View>
                        </GlassCard>
                    ) : groups.length > 0 ? (
                        groups.map((group, index) => (
                            <GlassCard style={styles.groupCardContainer} key={group.id || index}>
                                <View style={styles.groupCard}>
                                    <TouchableOpacity 
                                        style={styles.profilePicTouchableOpacity} 
                                        onPress={() => navigation.navigate('GroupPage', {
                                            group: group.originalGroup, 
                                            groupID: group.id,
                                            initialTab: 0
                                        })}
                                    >
                                        <ProfilePic size={40} imageURL={group.imageURL}/>
                                    </TouchableOpacity>
                                    {group.upcomingMeetup && (
                                        <TouchableOpacity 
                                            style={styles.groupUpcomingMeetup} 
                                            onPress={() => navigation.navigate('GroupPage', {
                                                group: group.originalGroup, 
                                                groupID: group.id,
                                                initialTab: 4, 
                                                upcomingMeetup: group.upcomingMeetup
                                            })}
                                        >
                                            <MeetupSymbol size={23} />
                                        </TouchableOpacity>
                                    )}
                                    {group.upcomingSurpriseEvent && (
                                        <TouchableOpacity 
                                            style={styles.groupUpcomingSurpriseEvent} 
                                            onPress={() => navigation.navigate('GroupPage', {
                                                group: group.originalGroup, 
                                                groupID: group.id,
                                                initialTab: 1, 
                                                upcomingSurpriseEvent: group.upcomingSurpriseEvent
                                            })}
                                        >
                                            <SurpriseEventSymbol size={30} />
                                        </TouchableOpacity>
                                    )}
                                    {group.challenge && (
                                        <TouchableOpacity 
                                            style={styles.groupChallenge} 
                                            onPress={() => navigation.navigate('GroupPage', {
                                                group: group.originalGroup, 
                                                groupID: group.id,
                                                initialTab: 2
                                            })}
                                        >
                                            {group.challenge === 'smart' ? <SmartSymbol size={30} /> : 
                                             group.challenge === 'wild' ? <WildSymbol size={30} /> : 
                                             group.challenge === 'health' ? <HealthSymbol size={30} /> : null}
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </GlassCard>
                        ))
                    ) : (
                        <GlassCard style={styles.groupCardContainer}>
                            <View style={styles.groupCard}>
                                <Text style={styles.noGroupsText}>No groups yet</Text>
                            </View>
                        </GlassCard>
                    )}
                    <TouchableOpacity style={styles.createGroupButton} onPress={() => setCreateGroupPopupVisible(true)}>
                        <GlassCardButton style={styles.createGroupButton} type="addFriend" text="Create Group"/>
                    </TouchableOpacity>
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
        bottom: 25,
        right: 20,
        maxHeight: 172,
        maxWidth: 185,
    },
    groupsScrollViewContent: {
        gap: 10,
        paddingTop: 2,
        paddingBottom: 10,
    },
    createGroupButton: {
        height: 40,
        width: 160,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
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
    loadingText: {
        fontSize: 14,
        color: '#6E6E6E',
        textAlign: 'center',
    },
    noGroupsText: {
        fontSize: 12,
        color: '#6E6E6E',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

export default Home;