import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GlassCard from './GlassCard';
import ChatButton from './ChatButton';
import { useNavigation } from '@react-navigation/native';

const ChatSummaryCard = ({style, overallSummary, vibeSummary, personalSummary, groupID}) => {
    const navigation = useNavigation();
    return (
        <GlassCard style={[styles.glassCard, style]}>
            <View style={styles.container}>
                <View style={styles.summariesContainer}>
                    <View style={styles.summaryOverall}>
                        <Text style={styles.summaryText} ellipsizeMode='tail' numberOfLines={2}>{overallSummary}</Text>
                    </View>
                    <View style={styles.summaryVibe}>
                        <Text style={styles.summaryText} ellipsizeMode='tail' numberOfLines={2}>{vibeSummary}</Text>
                    </View>
                    <View style={styles.summaryPersonal}>
                        <Text style={styles.summaryText} ellipsizeMode='tail' numberOfLines={2}>{personalSummary}</Text>
                    </View>
                </View>
                <ChatButton style={styles.chatButton} size={40} onPress={() => navigation.navigate('GroupPage', {groupID: groupID, initialTab: 3})}/>
            </View>
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    glassCard: {
        width: '90%',
        height: 200,
        marginVertical: 10,
    }, 
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        },
        chatButton: {
            position: 'absolute',
            bottom: 10,
            right: 10,
        },
        summariesContainer: {
            width: '100%',
            height: '90%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 10,
        },
        summaryOverall: {
            width: '100%',
            height: '30%',
            backgroundColor: '#FFE9E9',
            borderRadius: 10,
        },
        summaryVibe: {
            width: '100%',
            height: '30%',
            backgroundColor: '#AFDEF4',
            borderRadius: 10,
        },
        summaryPersonal: {
            width: '85%',
            height: '30%',
            backgroundColor: '#E2FFD6',
            borderRadius: 10,
        },
        summaryText: {
            fontSize: 14,
            fontWeight: '500',
            color: '#6E6E6E',
            paddingHorizontal: 10,
            paddingVertical: 5,
        },
    });

export default ChatSummaryCard;