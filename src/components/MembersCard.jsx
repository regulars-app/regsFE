import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GlassCard from './GlassCard';
import GroupButton from './GroupButton';

const MembersCard = ({style, members}) => {
    return (
        <GlassCard style={[styles.glassCard, style]}>
            <View style={styles.container}>
                <View style={styles.membersContainer}>
                    <View style={styles.member}>
                        <Text>Member 1</Text>
                    </View>
                    <View style={styles.member}>
                        <Text>Member 2</Text>
                    </View>
                </View>
                <GroupButton style={styles.groupButton} size={40} />
            </View>
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    glassCard: {
        width: '90%',
        height: 200,
    }, 
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        },
        groupButton: {
            position: 'absolute',
            bottom: 10,
            right: 10,
        },
        membersContainer: {
            width: '100%',
            height: '90%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 10,
        },
        member: {
            width: '100%',
            height: '40%',
            backgroundColor: 'red',
            borderRadius: 10,
        },
        });

export default MembersCard;