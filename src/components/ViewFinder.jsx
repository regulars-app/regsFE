import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CaptureTools from './CaptureTools';


const ViewFinder = ({style}) => {
    return (
        <View style={[styles.container, style]}>
            <Image source={{uri: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}} style={styles.image} />
            <CaptureTools style={styles.captureTools} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    captureTools: {
        marginBottom: 40,
    },
});

export default ViewFinder;