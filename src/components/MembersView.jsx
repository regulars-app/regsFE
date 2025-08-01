import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GlassCard from './GlassCard';
import MemberItem from './MemberItem';

const MembersView = ({height, members, style, title}) => {

    const dynamicStyles = {
        glassCard: {
            height: height,
        },
    };
    return (
        <GlassCard style={[style, styles.glassCard, dynamicStyles.glassCard]}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} nestedScrollEnabled={true}>
                    {members.map((member, index) => (
                        <MemberItem 
                            key={index} 
                            name={member.name} 
                        />
                    ))}
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
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingTop: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6E6E6E',
    },
    scrollView: {
        width: '100%',
        marginTop: 10,
    },
    scrollViewContent: {
        width: '100%',
    },
});

export default MembersView;