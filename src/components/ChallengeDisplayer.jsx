import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GlassCard from './GlassCard';
import SmartSymbol from './SmartSymbol';
import HealthSymbol from './HealthSymbol';
import WildSymbol from './WildSymbol';
import ProfilePic from './ProfilePic';

const ChallengeDisplayer = ({style, challengeType, challengeContent}) => {
    return (
        <View style={[styles.wrapper, style]}>
            <View style={styles.container}>
                <View style={styles.header}>
                    {challengeType === 'smart' && <SmartSymbol size={20}/>}
                    {challengeType === 'health' && <HealthSymbol size={20}/>}
                    {challengeType === 'wild' && <WildSymbol size={20}/>}
                    <Text style={styles.headerText}>{challengeType} challenge</Text>
                </View>
                <ProfilePic size={60} style={styles.profilePic} footer={"Jeffrey"} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                <GlassCard style={styles.glassCard}>
                    <View style={styles.content}>
                        <ScrollView style={styles.contentText}>
                            <Text style={styles.contentText}>{challengeContent}</Text>
                        </ScrollView>
                    </View>
                </GlassCard>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        paddingHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '40%',
        height: 40,
        position: 'absolute',
        top: -15,
        left: -15,
        zIndex: 100,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 15,
        gap: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6E6E6E',
    },
    profilePic: {
        position: 'absolute',
        top: -30,
        right: -20,
        zIndex: 100,
    },
    glassCard: {
        width: '100%',
    },
    content: {
        width: '100%',
        alignItems: 'center',
        paddingRight: 10,
        paddingTop: 50,
        paddingBottom: 20,
    },
    contentText: {  
        fontSize: 15,
        fontWeight: '500',
        color: '#6E6E6E',
        textAlign: 'left',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});

export default ChallengeDisplayer;