import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MessageIO from './MessageIO';
import Message from './Message';

const Messenger = ({style, messages = []}) => {
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