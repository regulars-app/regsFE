import React from 'react';
import { View, Text, StyleSheet, Image   } from 'react-native';
import GlassCard from './GlassCard';
import ProfilePic from './ProfilePic';

const Message = ({style, chatType, time, position, messageType, senderName, messageText, imageURL}) => {
    const dynamicStyle = {
        container: {
          alignSelf: position === 'left' ? 'flex-start' : 'flex-end',
        },
        mainMessageProfilePic: {
          top: position === 'left' ? 0 : 0,
          left: position === 'left' ? -50 : 'none',
          right: position === 'right' ? -50 : 'none',
        },
        messageText: {
          paddingLeft: position === 'left' && messageType === 'text' ? 20 : 0,
          paddingRight: position === 'right' && messageType === 'text' ? 20 : 0,
        },
      };
    return (
        <View style={[styles.container, dynamicStyle.container]}>
            {/* Differentiate between messages in a main chat and 
            messagges in a subChat (e.g. in a post) */}
            {chatType === 'main' ? (
                <View style={styles.mainChatMessage}>
                    <ProfilePic size={40} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'} style={[styles.mainMessageProfilePic, dynamicStyle.mainMessageProfilePic]}/>
                    <GlassCard style={styles.messageBody}>
                        {messageType === 'image' ? (
                        <Image source={{ uri: imageURL }} style={styles.mainMessageImage} />
                        ) : messageType === 'text' ? (
                        <View style={styles.mainMessageTextContainer}>
                            <Text style={styles.mainMessageSenderName}>{senderName}</Text>
                            <Text style={styles.mainMessageText}>{messageText}</Text>
                            <Text style={styles.mainMessageTime}>{time}</Text>
                        </View>
                        ) : messageType === 'mixed' ? (
                        <View style={styles.mainMessageImageTextContainer}>
                            <Image source={{ uri: imageURL }} style={styles.mainMessageImage} />
                            <View style={styles.mainMessageTextContainer}>
                                <Text style={styles.mainMessageSenderName}>{senderName}</Text>
                                <Text style={styles.mainMessageText}>{messageText}</Text>
                                <Text style={styles.mainMessageTime}>{time}</Text>
                            </View>
                        </View>
                        ) : null}
                    </GlassCard>
                </View>
            ) : (
                <View style={styles.subChatMessage}>
             
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 50,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 52,
        paddingRight: 52,
    },
    mainChatMessage: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        maxWidth: '85%',
        position: 'relative',
    },
    mainMessageProfilePic: {
        position: 'absolute',
    },
    mainMessageTextContainer: {
        padding: 10,
    },
    mainMessageSenderName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6E6E6E',
    },
    mainMessageTime: {
        fontSize: 10,
        fontWeight: '300',
        color: '#6E6E6E',
        alignSelf: 'flex-end',
        marginTop: 5,
        marginRight: 5,
        fontWeight: '400',
    },
    mainMessageText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#6E6E6E',
    },
    mainMessageImage: {
        width: 280,
        height: 280,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    mainMessageImageTextContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },

    subChatMessage: {
        width: '100%',
    },    
});
    export default Message;