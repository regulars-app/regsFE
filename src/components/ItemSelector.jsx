import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import GlassCard from './GlassCard';
import SearchBar from './SearchBar';
import PreferenceItem from './PreferenceItem';
import AddButton from './AddButton';

const ItemSelector = ({style}) => {
    const activities = [
        { text: "Hiking", color: "green", type: "activity" },
        { text: "Yoga", color: "green", type: "activity" },
        { text: "Cooking", color: "green", type: "activity" },
        { text: "Painting", color: "green", type: "activity" },
        { text: "Cycling", color: "green", type: "activity" },
        { text: "Photography", color: "green", type: "activity" },
        { text: "Running", color: "green", type: "activity" },
        { text: "Dancing", color: "green", type: "activity" },
        { text: "Gardening", color: "green", type: "activity" },
        { text: "Swimming", color: "green", type: "activity" },
        { text: "Chess", color: "yellow", type: "activity" },
        { text: "Board Games", color: "yellow", type: "activity" },
        { text: "Book Club", color: "yellow", type: "activity" },
        { text: "Movie Night", color: "yellow", type: "activity" },
        { text: "Coding", color: "yellow", type: "activity" },
        { text: "Karaoke", color: "yellow", type: "activity" },
        { text: "Potluck", color: "yellow", type: "activity" },
        { text: "Picnic", color: "yellow", type: "activity" },
        { text: "Bowling", color: "yellow", type: "activity" },
        { text: "Tennis", color: "yellow", type: "activity" },
        { text: "Escape Room", color: "red", type: "activity" },
        { text: "Paintball", color: "red", type: "activity" },
        { text: "Skydiving", color: "red", type: "activity" },
        { text: "Surfing", color: "red", type: "activity" },
        { text: "Rock Climbing", color: "red", type: "activity" },
        { text: "Skiing", color: "red", type: "activity" },
        { text: "Scuba Diving", color: "red", type: "activity" },
        { text: "Bungee Jumping", color: "red", type: "activity" },
        { text: "Paragliding", color: "red", type: "activity" },
        { text: "White Water Rafting", color: "red", type: "activity" },
        { text: "Movie Night", color: "yellow", type: "activity" },
        { text: "Coding", color: "yellow", type: "activity" },
        { text: "Karaoke", color: "yellow", type: "activity" },
        { text: "Potluck", color: "yellow", type: "activity" },
        { text: "Picnic", color: "yellow", type: "activity" },
        { text: "Bowling", color: "yellow", type: "activity" },
        { text: "Tennis", color: "yellow", type: "activity" },
        { text: "Escape Room", color: "red", type: "activity" },
        { text: "Paintball", color: "red", type: "activity" },
        { text: "Skydiving", color: "red", type: "activity" },
        { text: "Surfing", color: "red", type: "activity" },
        { text: "Rock Climbing", color: "red", type: "activity" },
        { text: "Skiing", color: "red", type: "activity" },
        { text: "Scuba Diving", color: "red", type: "activity" },
        { text: "Bungee Jumping", color: "red", type: "activity" },
        { text: "Paragliding", color: "red", type: "activity" },
        { text: "White Water Rafting", color: "red", type: "activity" },
    ];

    const [selected, setSelected] = useState(Array(activities.length).fill(false));

    const handleToggle = (index) => {
        setSelected(prev => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    return (
        <GlassCard style={[styles.glassCard, style]}>
            <View style={styles.container}>
                <SearchBar style={styles.searchBar}/>
                <View style={styles.scrollArea}>
                    <ScrollView
                        contentContainerStyle={styles.itemList}
                        showsVerticalScrollIndicator={true}
                        style={styles.itemListContainer}
                        nestedScrollEnabled={true}
                    >
                        {activities.map((activity, index) => (
                            <TouchableOpacity key={index} onPress={() => handleToggle(index)} activeOpacity={0.7}>
                                <PreferenceItem
                                    text={activity.text}
                                    color={activity.color}
                                    type={activity.type}
                                    isSelected={selected[index]}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <AddButton size={50} style={styles.addButton}/>
            </View>
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    glassCard: {
        width: '90%',
        height: 400,
        alignSelf: 'center',
    },
    container: {
        height: '100%',
        width: '100%',
        position: 'relative',
    },
    searchBar: {
        marginVertical: 20,
        alignSelf: 'center',
    },
    scrollArea: {
        width: '100%',
        height: 287,
    },
    itemListContainer: {
        width: '95%',
        alignSelf: 'center',
    },
    itemList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
        paddingVertical: 5,
        gap: 7,
    },
    addButton: {
        bottom: 25,
        right: 25,
        zIndex: 10,
        position: 'absolute',
    },
});
export default ItemSelector;
