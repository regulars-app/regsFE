import React from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';
import GlassCard from './GlassCard';

const AdditionalInfoInput = ({style, placeholder}) => {
    return (
        <GlassCard style={[styles.glassCard, style]}>
            <View style={styles.container}>
                <TextInput 
                    style={styles.input} 
                    placeholder={placeholder}
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
    },
    container: {
        minWidth: '100%',
        maxWidth: '100%',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 0,
    },
    input: {
        fontSize: 15,
        fontWeight: '400',
        color: '#6E6E6E',
        textAlignVertical: 'top',
        textAlign: 'left',
    },
});

export default AdditionalInfoInput;