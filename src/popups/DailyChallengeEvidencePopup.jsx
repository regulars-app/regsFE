import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ImageCard from '../components/ImageCard';
import Messenger from '../components/Messenger';
import GlassCard from '../components/GlassCard';

const DailyChallengeEvidencePopup = ({ onClose, imageURL, footer, width, height, aspectRatio, messages }) => {
    return (
        <View style={styles.container}>
            <ImageCard style={styles.imageCard} imageURL={imageURL} width={width} height={height} aspectRatio={aspectRatio} />
            <GlassCard style={styles.messengerGlassCard}>
                <Messenger style={styles.messenger} messages={messages} paddingHorizontal={0}/>
            </GlassCard>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        gap: 10,
    },
    imageCard: {
        
    },
    messengerGlassCard: {
        width: '100%',
        height: 500,
        padding: 10,
        paddingBottom: 20,
        marginBottom: 20,
    },
    messenger: {
       height: '100%',
       width: '100%',
    },
});

export default DailyChallengeEvidencePopup; 