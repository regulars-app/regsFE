import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PreferenceItem = ({ text, color, type }) => {

    const dynamicStyle = {
        container: {
            backgroundColor: color === 'green' ? '#ECF5E1' : color === 'yellow' ? '#FFF7D5' : color === 'red' ? '#FAD2D1' : '#ffffff',
            borderColor: color === 'green' ? '#B6E799' : color === 'yellow' ? '#FFEAB7' : color === 'red' ? '#F5A9A9' : '#C1C1C1',
        },
    };

    return (
        <View style={[styles.container, dynamicStyle.container]}>
            <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 2,
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6E6E6E',
    },
});

export default PreferenceItem;