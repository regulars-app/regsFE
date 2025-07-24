import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ItemDisplayer from '../components/ItemDisplayer';
import SurpriseRequestStatus from '../components/SurpriseRequestStatus';

const SurpriseSubjectPreferences = ({subject}) => {
    return (
        <View>
            <ItemDisplayer title={`${subject}'s Interests`} viewOnly={true} style={styles.interestDisplayer} />
            <ItemDisplayer title={`${subject}'s Dietary Preferences`} viewOnly={true} style={styles.dietaryDisplayer} />
            <SurpriseRequestStatus status="Pending" style={styles.requestStatus} subject={subject} date="Friday 25th July" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    interestDisplayer: {
        marginTop: 20,
    },
    dietaryDisplayer: {
        marginTop: 20,
        height: 200,
    },
    requestStatus: {
        marginTop: 40,
    },
});

export default SurpriseSubjectPreferences;