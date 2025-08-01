import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CaptureTools from '../components/CaptureTools';

const CameraLiveView = ({onCapture, style}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.liveViewContainer}>
                <Image source={{uri: 'https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg'}} style={styles.liveViewImage}/>
            </View>
            <CaptureTools style={styles.captureTools} onCapture={onCapture}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    liveViewContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',  
        height: '100%',
    },
    liveViewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    captureTools: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 50,
    },
});

export default CameraLiveView;