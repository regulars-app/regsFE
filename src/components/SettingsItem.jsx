import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NextSymbol from './NextSymbol';

const SettingsItem = ({style, name}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.leftContainer}>
                <Text style={styles.name}>{name}</Text>
            </View>
            <TouchableOpacity style={styles.rightContainer}>
                <NextSymbol size={30}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1, 
        borderColor: 'rgba(110, 110, 110, 0.2)',
        height: 70,
        width: '100%',
        backgroundColor: 'transparent',
        paddingHorizontal: 25,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        gap: 20,
    },
    rightContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    profilePic: {
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6E6E6E',
    },
});

export default SettingsItem;