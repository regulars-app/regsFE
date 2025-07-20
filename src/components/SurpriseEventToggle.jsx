import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SurpriseEventToggle = ({style}) => {
    const [isOn, setIsOn] = useState(false);
    const dynamicStyles = {
        toggle: {
            right: isOn ? -1.25 : undefined,
            left: !isOn ? -1.25 : undefined,
        }
    }
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title}>Surprise Event?</Text>
            <View style={styles.toggleContainer}>
                <TouchableOpacity style={[styles.toggle, dynamicStyles.toggle]} onPress={() => setIsOn(!isOn)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    title: {
        fontSize: 10,
        fontWeight: '500',
        color: '#6E6E6E',
    },
    toggleContainer: {
        width: 45,
        height: 22,
        backgroundColor: 'white',
        borderRadius: 20,
        position: 'relative',
        elevation: 0.5,
    },
    toggle: {
        width: 25,
        height: 25,
        backgroundColor: '#F2FFF6',
        borderRadius: 20,
        position: 'absolute',
        top: -1.5,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});

export default SurpriseEventToggle;