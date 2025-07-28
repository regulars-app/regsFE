import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MessageIO from './MessageIO';
import Message from './Message';

const Messenger = ({style, messages = [], paddingHorizontal = 30}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.scrollViewContainer}>
                <ScrollView style={styles.scrollView} 
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}>
                    {messages.map((message, index) => (
                        <Message 
                            key={index}
                            chatType={message.chatType}
                            time={message.time}
                            position={message.position}
                            messageType={message.messageType}
                            senderName={message.senderName}
                            messageText={message.messageText}
                            imageURL={message.imageURL}
                            userID={message.userID}
                        />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.messageIOContainer}>
                <MessageIO style={styles.messageIO} paddingHorizontal={paddingHorizontal}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal: 10,
        paddingBottom: 60,
    },
    scrollViewContainer: {
        width: '100%',
        flex: 1,
    },
    scrollView: {
    
    },
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageIOContainer: {
        width: '100%',
        height: 60,
        position: 'absolute',
        bottom: 0,
    },
    messageIO: {
    position: 'absolute',
    bottom: 2,
    },
});
    export default Messenger;