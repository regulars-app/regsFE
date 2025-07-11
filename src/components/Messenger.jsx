import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MessageIO from './MessageIO';

const Messenger = () => {
    return (
        <View style={styles.container}>
            <MessageIO />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
    export default Messenger;