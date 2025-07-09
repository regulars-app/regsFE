import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import GlassCard from './GlassCard';

const MiniMeetupCard = ({name, datetime}) => {

    const dynamicStyle = {
        titleText: {
            fontSize: Dimensions.get('window').width * 0.03,
        },
        name: {
            fontSize: Dimensions.get('window').width * 0.05,
        },
        datetime: {
            fontSize: Dimensions.get('window').width * 0.035,
        },
    };

    return (
        <GlassCard style={styles.card}>
            <GlassCard style={styles.title}>
                <Text style={[styles.titleText, dynamicStyle.titleText]}>Upcoming Meetup</Text>
            </GlassCard>
            <View style={[styles.content, dynamicStyle.content]}>
                <Text style={[styles.name, dynamicStyle.name]}>{name}</Text>
                <Text style={[styles.datetime, dynamicStyle.datetime]}>{datetime}</Text>
            </View>
        </GlassCard>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '80%',
        aspectRatio: 1.1,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
        alignSelf: 'center',
    
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 7,
        paddingBottom: 7,
        width: '80%',
        marginBottom: 20,
        marginTop: 15,
        backgroundColor: '#F2FFF6',
    },
    titleText: {
        fontWeight: 'bold',
        color: '#6E6E6E',
    },
    content: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    name: {
        fontWeight: 'bold',
        color: '#6E6E6E',
    },
    datetime: {
        color: '#6E6E6E',
        fontWeight: 'bold',
    },
});

export default MiniMeetupCard;
