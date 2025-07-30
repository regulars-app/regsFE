import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import GlassCard from './GlassCard';
import SearchBar from './SearchBar';
import PreferenceItem from './PreferenceItem';
import AddButton from './AddButton';

const ItemSelector = ({style, selectable=false, onSelectionChange, onItemReturned, itemType="activity"}) => {
    // List of available activities that can be selected
    const [availableActivities, setAvailableActivities] = useState([
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
    ]);

    // List of available dietary preferences
    const [availableDietary, setAvailableDietary] = useState([
        { text: "Vegetarian", color: "green", type: "dietary" },
        { text: "Vegan", color: "green", type: "dietary" },
        { text: "Gluten-Free", color: "green", type: "dietary" },
        { text: "Dairy-Free", color: "green", type: "dietary" },
        { text: "Nut-Free", color: "green", type: "dietary" },
        { text: "Halal", color: "yellow", type: "dietary" },
        { text: "Kosher", color: "yellow", type: "dietary" },
        { text: "Low-Carb", color: "yellow", type: "dietary" },
        { text: "Keto", color: "yellow", type: "dietary" },
        { text: "Paleo", color: "yellow", type: "dietary" },
        { text: "Pescatarian", color: "yellow", type: "dietary" },
        { text: "Raw Food", color: "red", type: "dietary" },
        { text: "Fruitarian", color: "red", type: "dietary" },
        { text: "Liquid Diet", color: "red", type: "dietary" },
        { text: "Intermittent Fasting", color: "red", type: "dietary" },
    ]);

    // Track which items are selected (for selection mode)
    const [selectedItems, setSelectedItems] = useState(
        Array(itemType === "dietary" ? availableDietary.length : availableActivities.length).fill(false)
    );

    /**
     * Handle when an item is selected from the list
     * In transfer mode: removes item and sends to parent
     * In selection mode: toggles selection state
     */
    const handleToggle = (index) => {
        if (selectable) {
            // Selection mode - toggle selection state
            setSelectedItems(prev => {
                const updated = [...prev];
                updated[index] = !updated[index];
                return updated;
            });
        } else {
            // Transfer mode - remove item and send to parent
            const currentList = itemType === "dietary" ? availableDietary : availableActivities;
            const selectedItem = currentList[index];
            
            // Remove the selected item from available list
            if (itemType === "dietary") {
                setAvailableDietary(prev => prev.filter((_, i) => i !== index));
            } else {
                setAvailableActivities(prev => prev.filter((_, i) => i !== index));
            }
            
            // Notify parent component about the selection
            if (onSelectionChange) {
                onSelectionChange(selectedItem);
            }
        }
    };

    /**
     * Function to add an item back to the available list
     * Called when an item is deleted from the ItemDisplayer
     */
    const addItemBack = (item) => {
        // Safety check for item
        if (!item || !item.text) {
            return;
        }
        
        if (itemType === "dietary") {
            setAvailableDietary(prev => [...prev, item]);
        } else {
            setAvailableActivities(prev => [...prev, item]);
        }
    };

    // Set up the callback for returning items when component mounts
    React.useEffect(() => {
        if (onItemReturned) {
            onItemReturned(addItemBack);
        }
    }, [onItemReturned]);

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
                        {(itemType === "dietary" ? availableDietary : availableActivities).map((item, index) => (
                            <PreferenceItem
                                key={index}
                                text={item.text}
                                color={'white'}
                                type={item.type}
                                selectable={selectable}
                                clickableOnly={true}
                                onPress={() => handleToggle(index)}
                                isSelected={selectable ? selectedItems[index] : false}
                            />
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
