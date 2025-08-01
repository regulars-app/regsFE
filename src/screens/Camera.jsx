import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../components/BackButton';
import CameraLiveView from '../subScreens/CameraLiveView';
import CameraPhotoTaken from '../subScreens/CameraPhotoTaken';

const Camera = () => {
    const [currentView, setCurrentView] = useState('live'); // 'live' or 'photo'
    const [photoURL, setPhotoURL] = useState('');

    const handleCapture = () => {
        // Simulate capturing a photo - in a real app, this would be the actual photo URL
        const capturedPhotoURL = 'https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg';
        setPhotoURL(capturedPhotoURL);
        setCurrentView('photo');
    };

    const handleDiscard = () => {
        setCurrentView('live');
        setPhotoURL('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackButton style={styles.backButton} size={30}/>
            </View>
            <View style={styles.content}>
                {currentView === 'live' ? (
                    <CameraLiveView onCapture={handleCapture} style={styles.liveView}/>
                ) : (
                    <CameraPhotoTaken photoURL={photoURL} style={styles.photoTaken} onDiscard={handleDiscard}/>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 75,
        alignItems: 'center',
      },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 100,
      },
    content: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    liveView: {
        width: '100%',
        height: '100%',
    },
    photoTaken: {
        width: '100%',
        height: '100%',
    },
});


export default Camera;