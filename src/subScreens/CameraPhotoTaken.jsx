import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MainButton from '../components/MainButton';
import SaveSymbol from '../components/SaveSymbol';

const CameraPhotoTaken = ({photoURL, style, onDiscard}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.saveSymbolContainer}>
                    <SaveSymbol size={20}/>
                </TouchableOpacity>
                <Image style={styles.image} source={{uri: photoURL}}/>
            </View>
            <View style={styles.footer}>
                <MainButton color="red" text="Discard" onPress={onDiscard}/>
                <MainButton color="yellow" text="Edit" type="suggest" onPress={() => {}}/>
                <MainButton color="green" text="Send" type="send" onPress={() => {}}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: '90%',
        height: '80%',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        padding: 15,
        position: 'relative',
    },
    saveSymbolContainer: {
        position: 'absolute',
        top: 4,
        right: 4,
        zIndex: 100,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 8,
        elevation: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '80%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
});

export default CameraPhotoTaken;