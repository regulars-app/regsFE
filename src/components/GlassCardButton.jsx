import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GlassCard from './GlassCard';
import ActivitySymbol from './ActivitySymbol';
import CalendarSymbol from './CalendarSymbol';
import AddFriendSymbol from './AddFriendSymbol';
import GroupSymbol from './GroupSymbol';
import RestaurantSymbol from './RestaurantSymbol';
import InterestsSymbol from './InterestsSymbol';

const GlassCardButton = ({style, type, text}) => {
    return (
        <GlassCard style={[styles.glassCard, style]}>
            <View>
            {type === 'activity' && <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
                <ActivitySymbol size={20} />
            </View>}
            {type === 'calendar' && <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
                <CalendarSymbol size={20} />
            </View>}
            {type === 'addFriend' && <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
                <AddFriendSymbol size={30} />
            </View>}
            {type === 'myFriends' && <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
                <GroupSymbol size={20} />
            </View>}
            {type === 'foodPreferences' && <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
                <RestaurantSymbol size={25} />
            </View>}
            {type === 'myInterests' && <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
                <InterestsSymbol size={20} />
            </View>}
            </View>
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    glassCard: {
        height: 50,
    },
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6E6E6E'
    },
});
export default GlassCardButton;
