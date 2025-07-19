import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import GlassCard from './GlassCard';
import SmartSymbolEnclosed from './SmartSymbolEnclosed';
import HealthSymbolEnclosed from './HealthSymbolEnclosed';
import WildSymbolEnclosed from './WildSymbolEnclosed';

const ChallengeWriterBox = ({style, challengeType}) => {
    return (
        <View style={[styles.outerContainerWrapper, style]}>
            <View style={styles.outerContainer}>
            {challengeType === 'smart' ? <SmartSymbolEnclosed showScore={false} size={45} style={styles.symbol}/> : challengeType === 'health' ? <HealthSymbolEnclosed showScore={false} size={45} style={styles.symbol}/> : <WildSymbolEnclosed showScore={false} size={45} style={styles.symbol}/>}
            <GlassCard style={styles.glassCard}>
                <View style={styles.container}>
                    <TextInput 
                        style={styles.input} 
                        placeholder={`Write a ${challengeType ? challengeType : ''} challenge here for your friends...`}
                        multiline={true}
                        fontWeight="600"
                        placeholderTextColor="rgba(110, 110, 110, 0.5)"
                    />
                </View>
            </GlassCard>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainerWrapper: {
        height: '350',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: 20,
    },
    outerContainer: {
        width: '90%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        position: 'relative',
    },
    glassCard: {
        width: '100%',
        height: '98%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    container: {
        minWidth: '100%',
        maxWidth: '100%',
        height: '100%',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        padding: 20,
    },
    symbol: {
        position: 'absolute',
        top: -15,
        right: -15,
        zIndex: 100,
    },
    input: {
        flex: 1,
        fontSize: 15,
        fontWeight: '400',
        color: '#6E6E6E',
        textAlignVertical: 'top',
        textAlign: 'left',
    },
});

export default ChallengeWriterBox;