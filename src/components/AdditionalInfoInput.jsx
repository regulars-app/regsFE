import React from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';
import GlassCard from './GlassCard';

const AdditionalInfoInput = () => {
    return (
        <GlassCard style={styles.glassCard}>
            <View style={styles.container}>
                <TextInput 
                    style={styles.input} 
                    placeholder={`Write your additional info here...`}
                    multiline={true}
                    fontWeight="600"
                    placeholderTextColor="rgba(110, 110, 110, 0.5)"
                />
            </View>
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    glassCard: {
        width: '90%',
        height: 70,
    },
    container: {
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

export default AdditionalInfoInput;