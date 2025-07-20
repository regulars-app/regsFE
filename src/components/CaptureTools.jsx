import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GlassCard from './GlassCard';
import CameraSettingsSymbol from './CameraSettingsSymbol';
import CameraFilterSymbol from './CameraFilterSymbol';

const CaptureTools = ({style}) => {
    return (
        <View style={[styles.wrapper, style]}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.captureButton} />
                <GlassCard style={styles.glassCard}>
                    <View style={styles.content}>
                        <TouchableOpacity style={styles.cameraSettingsButton}>
                            <CameraSettingsSymbol size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cameraFilterButton}>
                            <CameraFilterSymbol size={22} />
                        </TouchableOpacity>
                    </View>
                </GlassCard>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        width: '60%',
        height: 70,
    },
    container: {
        width: '100%',
        height: 40,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    glassCard: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
    }, 
    captureButton: {
        width: 70,
        height: 70,
        backgroundColor: 'rgb(249, 247, 247)',
        borderRadius: 50,
        position: 'absolute',
        zIndex: 100,
        borderWidth: 4,
        borderColor: 'rgb(229, 227, 227)',
    },
});

export default CaptureTools;