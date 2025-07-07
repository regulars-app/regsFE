import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import GlassCard from './GlassCard';

const MapWidget = () => {
    return(
        <GlassCard style={styles.mapWidget}>
            <Image source={require('../images/map.png')} style={styles.mapImage} />
        </GlassCard>
    )
}
export default MapWidget;

const styles = StyleSheet.create({
    mapWidget: {
        width: '85%',
        height: 165,
        alignSelf: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        marginTop: 20,
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },
});
