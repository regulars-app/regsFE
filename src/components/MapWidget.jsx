import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GlassCard from './GlassCard';
import AddPlaceSymbol from './AddPlaceSymbol';

const MapWidget = ({width, height, style, placeSelected}) => {
    const dynamicStyles = {
        mapWidget: {
        width: width,
        height: height,
        },
    }
    return(
        <GlassCard style={[styles.mapWidget, dynamicStyles.mapWidget, style]}>
            <View style={styles.wrapper}>
                {!placeSelected && <View style={styles.overlay}>
                    <TouchableOpacity style={styles.addPlaceButton}>
                        <AddPlaceSymbol size={30} />
                    </TouchableOpacity>
                </View>}
                <Image source={require('../images/map.png')} style={styles.mapImage} />
            </View>
        </GlassCard>
    )
}
export default MapWidget;

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
    },
    mapWidget: {
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    mapImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addPlaceButton: {
        width: 40,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
    },
});
