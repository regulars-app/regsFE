import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import GlassCard from './GlassCard';
import PlaceItem from './PlaceItem';
import UpSymbol from './UpSymbol';
import DownSymbol from './DownSymbol';

const PlacesView = ({height, places, style}) => {
    const [expandedSections, setExpandedSections] = useState({});

    const toggleSection = (sectionName) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionName]: !prev[sectionName]
        }));
    };

    // Separate places into my places and group places
    const myPlaces = places.filter(place => place.myPlace);
    const groupPlaces = places.filter(place =>  place.group !== null);
    
    // Group places by their groupPlace value
    const groupedPlaces = groupPlaces.reduce((acc, place) => {
        const group = place.group;
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(place);
        return acc;
    }, {});

    const dynamicStyles = {
        glassCard: {
            height: height,
        },
    };
    return (
        <GlassCard style={[styles.glassCard, dynamicStyles.glassCard, style]}>
            <View style={styles.container}>
                <Text style={styles.title}>Places View</Text>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} nestedScrollEnabled={true}>
                    {/* My Places Section */}
                    {myPlaces.length > 0 && (
                        <View style={styles.section}>
                            <TouchableOpacity 
                                style={styles.sectionHeader} 
                                onPress={() => toggleSection('My Places')}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.sectionTitle}>My Places</Text>
                                {expandedSections['My Places'] ? <UpSymbol size={30} /> : <DownSymbol size={30} />}
                            </TouchableOpacity>
                            {expandedSections['My Places'] && (
                                <View style={styles.sectionContent}>
                                    {myPlaces.map((place, index) => (
                                        <PlaceItem 
                                            key={`my-${index}`} 
                                            name={place.name} 
                                            myPlace={place.myPlace}
                                            groupPlace={place.group}
                                        />
                                    ))}
                                </View>
                            )}
                        </View>
                    )}
                    
                    {/* Group Places Sections */}
                    {Object.entries(groupedPlaces).map(([groupName, groupPlacesList]) => (
                        <View key={groupName} style={styles.section}>
                            <TouchableOpacity 
                                style={styles.sectionHeader} 
                                onPress={() => toggleSection(groupName)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.sectionTitle}>{groupName}</Text>
                                {expandedSections[groupName] ? <UpSymbol size={30} /> : <DownSymbol size={30} />}
                            </TouchableOpacity>
                            {expandedSections[groupName] && (
                                <View style={styles.sectionContent}>
                                    {groupPlacesList.map((place, index) => (
                                        <PlaceItem 
                                            key={`${groupName}-${index}`} 
                                            name={place.name} 
                                            myPlace={place.myPlace}
                                            groupPlace={place.group}
                                        />
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}
                </ScrollView>
            </View>
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    glassCard: {
        width: '90%',
    },
    container: {
        alignItems: 'center',
        width: '100%',
        paddingBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6E6E6E',
        paddingVertical: 20,
    },
    scrollView: {
        width: '100%',
        maxHeight: '90%'
    },
    scrollViewContent: {
        width: '100%',
        paddingBottom: 100,
    },
    section: {
        width: '100%',
        marginBottom: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#FFF6F0',
        borderRadius: 8,
        marginHorizontal: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6E6E6E',
    },
    sectionContent: {
        paddingTop: 10,
    },
});

export default PlacesView;