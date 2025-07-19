import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import GlassCard from './GlassCard';
import GallerySymbol from './GallerySymbol';
import CameraSymbol from './CameraSymbol';

const EvidenceUploader = ({style, onCameraPress, onGalleryPress, challenger, evidenceType}) => {

    return (
        <GlassCard style={[styles.glassCard, style]}>
            <View style={styles.container}>
                <Text style={styles.title}>{challenger} wants {evidenceType} as evidence...</Text>
                {evidenceType === 'text' ? (
                    <View style={styles.textInputContainer}>
                        <TextInput 
                        style={styles.input} 
                        placeholder={`Write your evidence here...`}
                        multiline={true}
                        fontWeight="600"
                        placeholderTextColor="rgba(110, 110, 110, 0.5)"
                    />
                    </View>
                ) : (
                    <View style={styles.evidenceTypes}>
                        <TouchableOpacity 
                            style={styles.evidenceTypeContainer} 
                            onPress={onCameraPress}
                            activeOpacity={0.7}
                        >
                            <CameraSymbol size={25} />
                            <Text style={styles.evidenceTypeText}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.evidenceTypeContainer} 
                            onPress={onGalleryPress}
                            activeOpacity={0.7}
                        >
                            <GallerySymbol size={25} />
                            <Text style={styles.evidenceTypeText}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
        color: '#6E6E6E',
    },
    evidenceTypes: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        marginTop: 20,
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

    },
    textInputContainer: {
        minWidth: '100%',
        maxWidth: '100%',
        height: '80%',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 0,
    },
    input: {
        flex: 1,
        fontSize: 15,
        fontWeight: '400',
        color: '#6E6E6E',
        textAlignVertical: 'top',
        textAlign: 'left',
    },
});

export default EvidenceUploader;