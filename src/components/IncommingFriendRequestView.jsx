import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GlassCard from './GlassCard';
import AcceptFriendItem from './AcceptFriendItem';

const IncommingFriendRequestView = ({height, requests, style, scrollEnabled = true}) => {

    const dynamicStyles = {
        glassCard: {
            height: height,
        },
    };
    return (
        <GlassCard style={[styles.glassCard, dynamicStyles.glassCard, style]}>
            <View style={styles.container}>
                <Text style={styles.title}>Incomming Friend Requests</Text>
                <ScrollView 
                    style={styles.scrollView} 
                    contentContainerStyle={styles.scrollViewContent} 
                    nestedScrollEnabled={true}
                    scrollEnabled={scrollEnabled}
                    showsVerticalScrollIndicator={true}
                    bounces={false}
                >
                    {requests.map((request, index) => (
                        <AcceptFriendItem key={index} name={request.name}/>
                    ))}
                </ScrollView>
            </View>
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    glassCard: {
        minWidth: '90%',
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

export default IncommingFriendRequestView;