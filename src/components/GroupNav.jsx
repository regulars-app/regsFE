import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProfilePic from './ProfilePic';
import MeetupSymbol from './MeetupSymbol';
import ChallengeSymbol from './ChallengeSymbol';
import ChatSymbol from './ChatSymbol';
import GlassCard from './GlassCard';

const GroupNav = ({ style, selectedIndex = 0, onTabChange }) => {
    return (
        <GlassCard style={[styles.groupNav, style]}>
            <View style={styles.groupNavItemsContainer}>
                <TouchableOpacity 
                    style={[styles.groupNavItem, selectedIndex === 0 && styles.selectedNavItem]} 
                    onPress={() => onTabChange(0)}
                >
                    <ProfilePic size={45} footer="" imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.groupNavItem, selectedIndex === 1 && styles.selectedNavItem]} 
                    onPress={() => onTabChange(1)}
                >
                    <MeetupSymbol size={30} />
                    <Text style={styles.groupNavText}>Meetups</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.groupNavItem, selectedIndex === 2 && styles.selectedNavItem]} 
                    onPress={() => onTabChange(2)}
                >
                    <ChallengeSymbol size={29} />
                    <Text style={styles.groupNavText}>Challenge</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.groupNavItem, selectedIndex === 3 && styles.selectedNavItem]} 
                    onPress={() => onTabChange(3)}
                >
                    <ChatSymbol size={28} />
                    <Text style={styles.groupNavText}>Chat</Text>
                </TouchableOpacity>
            </View>
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    groupNav: {
        width: '80%',
        height: 90,
    },
    groupNavItemsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: 90,
    },
    groupNavItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '25%',
        height: '97%',
    },
    selectedNavItem: {
        backgroundColor: '#F2FFF6',
        borderRadius: 20,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    groupNavText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#6E6E6E',
        marginTop: 7,
        textAlign: 'center',
    },
});

export default GroupNav;
