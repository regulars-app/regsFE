import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GlassCard from './GlassCard';
import TextSymbol from './TextSymbol';
import GallerySymbol from './GallerySymbol';
import VideoSymbol from './VideoSymbol';

const EvidenceTypeSelector = ({style}) => {
    return (
        <GlassCard style={[styles.glassCard, style]}>
            <View style={styles.container}>
                <View style={styles.evidenceTypeContainer}>
                    <TextSymbol size={30} />
                    <Text>Text</Text>
                </View>
                <View style={styles.evidenceTypeContainer}>
                    <GallerySymbol size={30} />
                    <Text>Photo</Text>
                </View>
                <View style={styles.evidenceTypeContainer}>
                    <VideoSymbol size={30} />
                    <Text>Video</Text>
                </View>
            </View>
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    glassCard: {
        width: '90%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    evidenceTypeContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
    },
});

export default EvidenceTypeSelector;