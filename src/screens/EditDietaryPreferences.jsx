import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../components/BackButton';
import MainButton from '../components/MainButton';
import ItemSelector from '../components/ItemSelector';
import ItemDisplayer from '../components/ItemDisplayer';

const EditDietaryPreferences = () => {
    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <BackButton size={30} style={styles.backButton} />
        </View>
        <View style={styles.bodyContent}>
            <ItemSelector selectable={false} clickableOnly={true} style={styles.interestSelector} />
            <ItemDisplayer title={`My Dietary Preferences`} viewOnly={true} test={false} style={styles.dietaryDisplayer} />
        </View>
        <View style={styles.footer}>
            <MainButton text="Confirm" color="green" type="confirm" style={styles.confirmButton} />    
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF6F0',
        height: '100%',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 100,
        paddingBottom: 140,
        },
        header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 100,
        alignItems: 'center',
        },
        footer: {
        position: 'absolute',
        width: '100%',
        height: 140,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        },
        countdown: {
        position: 'absolute',
        bottom: 0,
        },
        bodyContent: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        },
        interestDisplayer: {
            marginTop: 20,
        },
        dietaryDisplayer: {
            marginTop: 20,
            height: 200,
        },
        backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        },
        confirmButton: {
        position: 'absolute',
        right: 20,
        },
});

export default EditDietaryPreferences;