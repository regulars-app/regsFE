import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import AvailabilityCard from '../components/AvailabilityCard';

const AvailabilityPopup = ({onClose}) => {


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Availability</Text>
            <AvailabilityCard style={styles.availabilityCard}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        gap: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6E6E6E',
    },
    availabilityCard: {
        height: 650,
        marginBottom: 20,
    },
});

export default AvailabilityPopup; 