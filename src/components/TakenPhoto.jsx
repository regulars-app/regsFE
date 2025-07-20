import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import SaveSymbol from './SaveSymbol';

const TakenPhoto = ({style}) => {
    return (
        <View style={[styles.wrapper, style]}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.saveButton}>
                    <SaveSymbol size={25} />
                </TouchableOpacity>
                <Image source={{uri: 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}} style={styles.image} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    container: {
        width: '80%',
        height: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white',
        elevation: 0.5,
    },
    saveButton: {
        position: 'absolute',
        top: -15,
        right: -15,
        zIndex: 100,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 5,
        elevation: 1,
    },
});

export default TakenPhoto;