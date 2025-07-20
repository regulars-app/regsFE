import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CountdownSymbol from './CountdownSymbol';

const Countdown = ({style}) => {
    return (
        <View style={[styles.container, style]}>
            <CountdownSymbol size={30} />
            <Text style={styles.countdownText}>10:23:45</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    countdownText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#6E6E6E',
    },
});

export default Countdown;