import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AddButton from './AddButton';
import EmojiSymbol from './EmojiSymbol';
import SendButton from './SendButton';
import GlassCard from './GlassCard';

const MessageIO = ({style, paddingHorizontal = 30}) => {
    const dynamicStyles = {
        container: {
            paddingHorizontal: paddingHorizontal,
        },
    }
    ;
    return (
        <View style={[styles.container, dynamicStyles.container, style]}>
            <AddButton size={50} />
            <GlassCard style={styles.glassCard}>
                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholderTextColor="#888"
                        style={styles.input}
                        placeholder="Message"
                    />
                    <TouchableOpacity>
                        <EmojiSymbol size={32} />
                    </TouchableOpacity>
                </View>
            </GlassCard>
            <SendButton size={50} />
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
});
    export default MessageIO;