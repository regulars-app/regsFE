import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import GlassCard from './GlassCard';
import WildSymbolEnclosed from './WildSymbolEnclosed';
import BondSymbolEnclosed from './BondSymbolEnclosed';
import DiarySymbolEnclosed from './DiarySymbolEnclosed';
import SmartSymbolEnclosed from './SmartSymbolEnclosed';
import HealthSymbolEnclosed from './HealthSymbolEnclosed';

const GroupsScoreCard = ({style}) => {
    return (
        <GlassCard style={[styles.glassCard, style]}>
            <View style={styles.container}>
                <WildSymbolEnclosed size={30} style={styles.wildSymbol} wildScore={100} showScore={true}/>
                <BondSymbolEnclosed size={60} style={styles.bondSymbol} bondScore={253} showScore={true}/>
                <DiarySymbolEnclosed size={30} style={styles.diarySymbol} diaryScore={100} showScore={true}/>
                <SmartSymbolEnclosed size={30} style={styles.smartSymbol} smartScore={100} showScore={true}/>
                <HealthSymbolEnclosed size={30} style={styles.healthSymbol} healthScore={100} showScore={true}/>
            </View>
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    glassCard: {
        width: '40%',
        aspectRatio: 1,
    },
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    healthSymbol: {
        position: 'absolute',
        top: 0,
        left: 0,
        margin: 15,
    },
    wildSymbol: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        marginLeft: 15,
        marginBottom: 7,
    },
    bondSymbol: {
    },
    diarySymbol: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginRight: 15,
        marginBottom: 7,
    },
    smartSymbol: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 15,
    },
});

export default GroupsScoreCard;