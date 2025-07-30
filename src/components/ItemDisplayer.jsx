import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import GlassCard from './GlassCard';
import SearchBar from './SearchBar';
import PreferenceItem from './PreferenceItem';
import AddButton from './AddButton';
import DeleteSymbol from './DeleteSymbol';

const ItemDisplayer = ({style, test=true, title, viewOnly = false, subjectActivities = [], subjectDietaryPreferences = [], onItemDeleted}) => {
    // Test data for when test prop is true
    const [testActivities, setTestActivities] = useState([
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
    ]);
    // Activities to display - either test data or prop data
    const [activities, setActivities] = useState(test ? testActivities : subjectActivities);
    
    // Update activities when subjectActivities prop changes
    React.useEffect(() => {
        if (!test) {
            setActivities(subjectActivities);
        }
    }, [subjectActivities, test]);
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [dropdownOpenIdx, setDropdownOpenIdx] = useState(null);

    /**
     * Handle toggling the dropdown for an item
     */
    const handleToggle = (index) => {
        if (selectedIdx === index) {
            setSelectedIdx(null);
            setDropdownOpenIdx(null);
        } else {
            setSelectedIdx(index);
            setDropdownOpenIdx(index);
        }
    };

    /**
     * Handle changing the color of an item
     */
    const handleColorChange = (index, color) => {
        if (test) {
            setTestActivities(prev => prev.map((item, i) => i === index ? { ...item, color } : item));
        } else {
            setActivities(prev => prev.map((item, i) => i === index ? { ...item, color } : item));
        }
        setDropdownOpenIdx(null);
        setSelectedIdx(null);
    };

    /**
     * Handle deleting an item
     * Removes the item from the list and notifies parent component
     */
    const handleDelete = (index) => {
        const deletedItem = activities[index];
        
        setActivities(prev => prev.filter((_, i) => i !== index));
        setDropdownOpenIdx(null);
        setSelectedIdx(null);
        
        // Notify parent component about the deletion
        if (onItemDeleted) {
            onItemDeleted(deletedItem);
        }
    };

    /**
     * Close the currently open dropdown
     */
    const closeDropdown = () => {
        setDropdownOpenIdx(null);
        setSelectedIdx(null);
    };

    return (
        <GlassCard style={[styles.glassCard, style]}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.scrollArea}>
                    <ScrollView
                        contentContainerStyle={styles.itemList}
                        showsVerticalScrollIndicator={true}
                        style={styles.itemListContainer}
                        nestedScrollEnabled={true}
                    >
                        {activities.map((activity, index) => {
                            // Safety check for activity object
                            if (!activity || typeof activity !== 'object') {
                                return null;
                            }
                            
                            return (
                            <View key={index} style={{ position: 'relative', display: 'flex' }}>
                                {viewOnly ? (
                                    <PreferenceItem
                                        text={activity.text || 'Unknown'}
                                        color={activity.color || 'white'}
                                        type={activity.type || 'activity'}
                                        isSelected={false}
                                        showCheckmark={false}
                                    />
                                ) : (
                                    <>
                                                                            <TouchableOpacity onPress={() => handleToggle(index)} activeOpacity={0.7}>
                                        <PreferenceItem
                                            text={activity.text || 'Unknown'}
                                            color={activity.color || 'white'}
                                            type={activity.type || 'activity'}
                                            isSelected={selectedIdx === index}
                                            showCheckmark={false}
                                        />
                                    </TouchableOpacity>
                                        {dropdownOpenIdx === index && (
                                            <DropdownMenu
                                                onColorChange={color => handleColorChange(index, color)}
                                                onDelete={() => handleDelete(index)}
                                                currentColor={activity.color || 'white'}
                                                selectedText={activity.text || 'Unknown'}
                                                onClose={closeDropdown}
                                            />
                                        )}
                                    </>
                                )}
                            </View>
                        );
                        })}
                    </ScrollView>
                </View>
            </View>
        </GlassCard>
    );
};

const DropdownMenu = ({ onColorChange, onDelete, currentColor, selectedText, onClose }) => {
    // Safety checks for props
    if (!selectedText || !currentColor) {
        return null;
    }
    
    // Define the color options
    const colorOptions = [
        { color: 'green', bg: '#ECF5E1', border: '#B6E799' },
        { color: 'yellow', bg: '#FFF7D5', border: '#FFEAB7' },
        { color: 'red', bg: '#FAD2D1', border: '#F5A9A9' },
    ];
    // Remove the current color from the color options for the dropdown
    const altColors = colorOptions.filter(opt => opt.color !== currentColor);
    return (
        <View style={dropdownStyles.dropdownStacked}>
            {/* First option: the selected item itself, with overlay */}
            <TouchableOpacity onPress={onClose}>
                <PreferenceItem
                    style={dropdownStyles.colorOption}
                    text={selectedText}
                    color={currentColor}
                    isSelected={true}
                    showCheckmark={false}
                />
            </TouchableOpacity>
            {/* Next: the other color options */}
            {altColors.map(opt => (
                <TouchableOpacity key={opt.color} onPress={() => onColorChange(opt.color)}>
                    <PreferenceItem
                        style={dropdownStyles.colorOption}
                        text={selectedText}
                        color={opt.color}
                        isSelected={false}
                        showCheckmark={false}
                    />
                </TouchableOpacity>
            ))}
            {/* Delete option */}
            <TouchableOpacity onPress={onDelete}>
                <DeleteSymbol size={20} style={dropdownStyles.deleteOption}/>
            </TouchableOpacity>
        </View>
    );
};

const dropdownStyles = StyleSheet.create({
    
    dropdownStacked: {
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 2,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
        zIndex: 100,
        alignItems: 'center',
        overflow: 'visible',
    },
    colorOption: {
        marginBottom: 3,
    },
    deleteOption: {
        width: 56,
        height: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3,
        marginBottom: 3,
    },
});

const styles = StyleSheet.create({
    glassCard: {
        width: '90%',
        maxHeight: 250,
        alignSelf: 'center',
    },
    container: {
        height: '100%',
        width: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 15,
        paddingBottom: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom:8,
        color: '#6E6E6E',
        textAlign: 'center',
        height: 20,
    },
    scrollArea: {
        width: '100%',
        flex: 1,
        marginTop: 5,
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
        paddingBottom: 110,
    },
});
export default ItemDisplayer;
