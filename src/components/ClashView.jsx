import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GlassCard from './GlassCard';
import ClashItem from './ClashItem';

const ClashView = ({style, clashItems}) => {
    return (
        <GlassCard style={[styles.glassCard, style]}>
            <View style={styles.container}>
                <Text style={styles.title}>ClashView</Text>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} nestedScrollEnabled>
                    {clashItems.map((item, index) => (
                        <ClashItem key={index} content={item.content} />
                    ))}
                </ScrollView>
            </View>
        </GlassCard>
    )
}

const styles = StyleSheet.create({
    glassCard: {
        width: '90%',
        height: 250,
    },
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 17,
        fontWeight: '500',
        color: '#6E6E6E',
    },
    scrollView: {
        width: '100%',
        height: '100%',
    },
    scrollViewContent: {
      
    },
});

export default ClashView;