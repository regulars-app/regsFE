import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MeetupItemCard from './MeetupItemCard';

const MeetupView = ({style, type, meetups = [], screen='group'}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{type === 'meetup' ? 'Meetups' : 'Surprise Events'}</Text>
            </View>
            <View style={styles.scrollViewContainer}>
                <ScrollView style={styles.scrollView} 
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}>
                    {meetups.map((meetup, index) => (
                        <MeetupItemCard key={index} type="meetup" meetupTitle={meetup.name} meetupDatetime={meetup.datetime} meetupConfirmed={meetup.confirmed} screen={screen} />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal: 0,
    },
    titleContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#6E6E6E',
    },
    scrollViewContainer: {
        width: '100%',
        flex: 1,
        paddingVertical: 10,
    },
    scrollView: {
        width: '100%',
    },
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
    export default MeetupView;