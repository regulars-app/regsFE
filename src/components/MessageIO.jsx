import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AddButton from './AddButton';
import EmojiSymbol from './EmojiSymbol';
import SendButton from './SendButton';
import GlassCard from './GlassCard';
import { launchImageLibrary } from 'react-native-image-picker';

const MessageIO = ({style, paddingHorizontal = 30, onSendMessage, groupId}) => {

    
    const [messageText, setMessageText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dynamicStyles = {
        container: {
            paddingHorizontal: paddingHorizontal,
        },
    };

    const [selectedMedia, setSelectedMedia] = useState(null);

    const options = {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
    };

    const handleSendMessage = async () => {
        if (!messageText.trim() && !selectedMedia) {
            return; // Don't send empty messages
        }

        setIsLoading(true);
        try {
            const mediaUri = selectedMedia?.assets?.[0]?.uri || null;
            await onSendMessage(messageText.trim(), mediaUri);
            setMessageText(''); // Clear input after sending
            setSelectedMedia(null); // Clear selected media
        } catch (error) {
            console.error('❌ Error sending message:', error);
            Alert.alert('Error', 'Failed to send message');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddMedia = async () => {
        try {
            const result = await launchImageLibrary(options);
            setSelectedMedia(result);
        } catch (error) {
            console.error('Error selecting media:', error);
            Alert.alert('Error', 'Failed to select media');
        }
    };

    return (
        <View style={[styles.container, dynamicStyles.container, style]}>
            <TouchableOpacity onPress={handleAddMedia} disabled={isLoading}>
                <AddButton size={50} />
            </TouchableOpacity>
            

            <GlassCard style={styles.glassCard}>
                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholderTextColor="#888"
                        style={styles.input}
                        placeholder="Message"
                        value={messageText}
                        onChangeText={setMessageText}
                        multiline
                        maxLength={500}
                        editable={!isLoading}
                    />
                    <TouchableOpacity disabled={isLoading}>
                        <EmojiSymbol size={32} />
                    </TouchableOpacity>
                </View>
            </GlassCard>
            <SendButton 
                size={50} 
                onPress={() => {
            
                    handleSendMessage();
                }}
                disabled={isLoading || (!messageText.trim() && !selectedMedia)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '50',
        gap: 10,
    },
    glassCard: {
        height: 50,
        flex: 1,
        flexShrink: 1,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 50,
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        padding: 0,
    },
    input: {
        flex: 1,
        height: 50,
    },
    sendButton: {
        // Ensure button is clickable with proper dimensions
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 50,
        minHeight: 50,
        // Add a subtle touch area without visible background
        padding: 5,
    },
});
export default MessageIO;