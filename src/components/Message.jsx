import React from 'react';
import { View, Text, StyleSheet, Image   } from 'react-native';
import GlassCard from './GlassCard';
import ProfilePic from './ProfilePic';

const Message = ({style, chatType, time, position, messageType, senderName, messageText, imageURL, userID, mediaDownloadUrl, senderProfilePic}) => {
    
    
    const dynamicStyle = {
        mainChatMessageContainer: {
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
        subSenderLabel: {backgroundColor: userID === '1' ? '#F2FFF6' : 'white'},
      };

    // Use mediaDownloadUrl if available, otherwise fall back to imageURL
    const displayImageUrl = mediaDownloadUrl || imageURL;

    return (
        <View style={[styles.container, dynamicStyle.container]}>
            {/* Differentiate between messages in a main chat and 
            messagges in a subChat (e.g. in a post) */}
            {chatType === 'main' ? (
                <View style={[styles.mainChatMessageContainer, dynamicStyle.mainChatMessageContainer]}>
                    <View style={styles.mainChatMessage}>
                        <ProfilePic size={40} imageURL={senderProfilePic || 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'} style={[styles.mainMessageProfilePic, dynamicStyle.mainMessageProfilePic]}/>
                        <GlassCard style={styles.messageBody}>
                            {messageType === 'image' ? (
                                <View style={styles.mainMessageImageContainer}>     
                                    <Image source={{ uri: displayImageUrl }} style={styles.mainMessageImage} />
                                    <Text style={styles.mainMessageImageTime}>{time}</Text>
                                </View>
                            ) : messageType === 'text' ? (
                            <View style={styles.mainMessageTextContainer}>
                                <Text style={styles.mainMessageSenderName}>{senderName}</Text>
                                <Text style={styles.mainMessageText}>{messageText}</Text>
                                <Text style={styles.mainMessageTime}>{time}</Text>
                            </View>
                            ) : messageType === 'mixed' ? (
                            <View style={styles.mainMessageImageTextContainer}>
                                <Image source={{ uri: displayImageUrl }} style={styles.mainMessageImage} />
                                <View style={styles.mainMessageTextContainer}>
                                    <Text style={styles.mainMessageSenderName}>{senderName}</Text>
                                    <Text style={styles.mainMessageText}>{messageText}</Text>
                                    <Text style={styles.mainMessageTime}>{time}</Text>
                                </View>
                            </View>
                            ) : null}
                        </GlassCard>
                    </View>
                </View>
            ) : (
                <View style={styles.subChatMessage}>
                  {messageType === 'image' ? (
                    <View style={styles.subMessageImageOnly}>
                      <View style={[styles.subSenderLabel, dynamicStyle.subSenderLabel]}><Text style={styles.subSenderLabelText}>{senderName}</Text></View>
                      <Image source={{ uri: displayImageUrl }} style={styles.subMessageImage} />
                      <Text style={styles.subMessageTime}>{time}</Text>
                    </View>
                  ) : messageType === 'text' ? (
                    <View style={styles.subMessageTextOnly}>
                      <View style={[styles.subSenderLabel, dynamicStyle.subSenderLabel]}><Text style={styles.subSenderLabelText}>{senderName}</Text></View>
                      <Text style={styles.subMessageText}>{messageText}</Text>
                      <Text style={styles.subMessageTime}>{time}</Text>
                    </View>
                  ) : messageType === 'mixed' ? (
                    <View style={styles.subMessageMixed}>
                      <View style={[styles.subSenderLabel, dynamicStyle.subSenderLabel]}><Text style={styles.subSenderLabelText}>{senderName}</Text></View>
                      <View style={styles.subMessageMixedImageTextContainer}>
                        <Image source={{ uri: displayImageUrl }} style={styles.subMessageImage} />
                        <Text style={styles.subMessageText}>{messageText}</Text>
                      </View>
                      <Text style={styles.subMessageTime}>{time}</Text>
                    </View>
                  ) : null}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minWidth: '100%',
    },
    mainChatMessageContainer: {
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 52,
        paddingRight: 52,
    },
    mainChatMessage: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        maxWidth: '95%',
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
    mainMessageImageContainer: {
        alignItems: 'center',
        position: 'relative',
    },
    mainMessageImageTime: {
        fontSize: 13,
        fontWeight: '600',
        color: 'white',
        position: 'absolute',
        bottom:5,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 10,
    },
    mainMessageText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#6E6E6E',
    },
    mainMessageImage: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    mainMessageImageTextContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },

    subChatMessage: {
        alignSelf: 'flex-start',
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    subMessageTextOnly: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
      width: '100%',
    },
    subMessageImageOnly: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
      width: '100%',
    },
    subMessageMixed: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        width: '100%',
    },
    subMessageMixedImageTextContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        width: '100%',
    },
    subSenderLabel: {
      backgroundColor: '#F5F5F5',
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 2,
      marginRight: 6,
      minWidth: 36,
      alignItems: 'center',
    },
    subSenderLabelText: {
      fontSize: 13,
      fontWeight: '500',
      color: '#6E6E6E',
    },
    subMessageText: {
      fontSize: 15,
      color: '#6E6E6E',
      flexShrink: 1,
      flexWrap: 'wrap',
      flex: 1,
      // maxWidth: 180, // Uncomment or adjust as needed for your layout
    },
    subMessageImage: {
      width: 250,
      aspectRatio: 1,
      borderRadius: 20,
      marginRight: 8,
    },
    subMessageTime: {
      fontSize: 12,
      color: '#A0A0A0',
      marginLeft: 'auto',
      minWidth: 38,
      textAlign: 'right',
      alignSelf: 'flex-end',
    },
  });
    export default Message;