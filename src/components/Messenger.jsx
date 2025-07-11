import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MessageIO from './MessageIO';
import Message from './Message';

const Messenger = ({style}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.scrollViewContainer}>
                <ScrollView style={styles.scrollView} 
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}>
                    <Message chatType="main" time="12:00" position="left" messageType="text" senderName="John Doe" messageText="Hello, how are you?" imageURL="" />
                    <Message chatType="main" time="12:00" position="right" messageType="text" senderName="John Doe" messageText="I'm ok thanks, i've been doing lots of arts and crafts!" imageURL="" />
                    <Message chatType="main" time="12:00" position="left" messageType="image" senderName="John Doe" messageText="" imageURL="https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg" />
                    <Message chatType="main" time="12:00" position="right" messageType="mixed" senderName="John Doe" messageText="I'm ok thanks, i've been doing lots of arts and crafts!" imageURL="https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg" />
                </ScrollView>
            </View>
            <MessageIO style={styles.messageIO}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
    },
    scrollViewContainer: {
        width: '100%',
        height: '85%',
    },
    scrollView: {
        width: '100%',
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    messageIO: {
    position: 'absolute',
    bottom: 20,
    },
});
    export default Messenger;