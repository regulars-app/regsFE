import React from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import GlassCard from './GlassCard';

const AdditionalInfoDisplay = ({style, text, children}) => {
    return (
        <GlassCard style={[styles.glassCard, style]}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {children && children}
                <Text style={styles.text} multiline={true}>
                    {text}
                </Text>
                </ScrollView>
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
        paddingVertical: 10,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    text: {
   
        fontSize: 15,
        fontWeight: '400',
        color: '#6E6E6E',
        textAlignVertical: 'top',
        textAlign: 'left',
    },
});

export default AdditionalInfoDisplay;