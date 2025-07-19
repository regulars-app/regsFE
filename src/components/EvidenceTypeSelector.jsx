import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GlassCard from './GlassCard';
import TextSymbol from './TextSymbol';
import GallerySymbol from './GallerySymbol';
import VideoSymbol from './VideoSymbol';
import ConfirmSymbol from './ConfirmSymbol';

const EvidenceTypeSelector = ({style}) => {
    const [selectedType, setSelectedType] = useState('text');

    const handleSelect = (type) => {
        setSelectedType(prev => prev === type ? null : type);
    };

    return (
        <GlassCard style={[styles.glassCard, style]}>
            <View style={styles.container}>
                <Text style={styles.title}>What evidence do you want?</Text>
                <View style={styles.evidenceTypes}>
                    <TouchableOpacity 
                        style={styles.evidenceTypeContainer} 
                        onPress={() => handleSelect('text')}
                        activeOpacity={0.7}
                    >
                        <TextSymbol size={25} />
                        <Text style={styles.evidenceTypeText}>Text</Text>
                        {selectedType === 'text' && (
                            <>
                                <View style={styles.overlay} />
                                <View style={styles.checkmarkContainer}>
                                    <ConfirmSymbol size={15} />
                                </View>
                            </>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.evidenceTypeContainer} 
                        onPress={() => handleSelect('photo')}
                        activeOpacity={0.7}
                    >
                        <GallerySymbol size={25} />
                        <Text style={styles.evidenceTypeText}>Photo</Text>
                        {selectedType === 'photo' && (
                            <>
                                <View style={styles.overlay} />
                                <View style={styles.checkmarkContainer}>
                                    <ConfirmSymbol size={15} />
                                </View>
                            </>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.evidenceTypeContainer} 
                        onPress={() => handleSelect('video')}
                        activeOpacity={0.7}
                    >
                        <VideoSymbol size={25} />
                        <Text style={styles.evidenceTypeText}>Video</Text>
                        {selectedType === 'video' && (
                            <>
                                <View style={styles.overlay} />
                                <View style={styles.checkmarkContainer}>
                                    <ConfirmSymbol size={15} />
                                </View>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    glassCard: {
        width: '90%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingVertical: 10,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#6E6E6E',
    },
    evidenceTypes: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
    },
    evidenceTypeContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2FFF6',
        padding: 10,
        borderRadius: 20,
        width: 70,
        height: 70,
        elevation: 0.5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    evidenceTypeText: {
        fontSize: 11,
        fontWeight: '500',
        color: '#6E6E6E',
        marginTop: 3,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 20,
        zIndex: 2,
    },
    checkmarkContainer: {
        position: 'absolute',
        top: -3,
        right: -3,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
        padding: 2,
    },
});

export default EvidenceTypeSelector;