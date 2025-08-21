import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import GroupNav from '../components/GroupNav';
import GroupPage from './GroupPage';
import GroupMeetups from './GroupMeetups';
import UpcomingMeetupDetails from './UpcomingMeetupDetails';
import DailyChallengeView from './DailyChallengeView';
import GroupChatPage from './GroupChatPage';

const GroupTabNavigator = () => {
    const route = useRoute();
    const [selectedIndex, setSelectedIndex] = useState(0);
    
    // Set initial tab based on route params
    useEffect(() => {
        if (route.params?.initialTab !== undefined) {
            setSelectedIndex(route.params.initialTab);
        }
    }, [route.params?.initialTab]);
    
    const renderContent = () => {
        switch (selectedIndex) {
            case 0:
                return <GroupPage routeParams={route.params} />;
            case 1:
                return <GroupMeetups routeParams={route.params} />;
            case 2:
                return <DailyChallengeView routeParams={route.params} />;
            case 3:
                return <GroupChatPage routeParams={route.params} />;
            case 4:
                return <UpcomingMeetupDetails routeParams={route.params} />;
            default:
                return <GroupPage routeParams={route.params} />;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {renderContent()}
            </View>
            <View style={styles.navContainer}>
                <GroupNav 
                    selectedIndex={selectedIndex} 
                    onTabChange={setSelectedIndex}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF6F0',
    },
    content: {
        flex: 1,
    },
    navContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingBottom: 10,
        backgroundColor: 'transparent',
        zIndex: 100,
        height: 110,
    },
});

export default GroupTabNavigator;
