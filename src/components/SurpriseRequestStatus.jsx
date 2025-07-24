import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InfoSymbol from './InfoSymbol';

const SurpriseRequestStatus = ({status, style, subject, date}) => {
    return (
        <View style={[styles.wrapper, style]}>
            <View style={styles.container}>
                <View style={styles.infoSymbolContainer}>
                    <InfoSymbol size={20} />
                </View>
                <View style={styles.textContainer}>
                    {status === 'Pending' ? <Text style={styles.text}>We have asked {subject} to keep {date} free, awaiting confirmation.</Text> : status === 'Accepted' ? <Text style={styles.text}>{subject} has accepted your request for the {date}.</Text> : status === 'Rejected' ? <Text style={styles.text}>{subject} has rejected your request for the {date}.</Text> : <Text style={styles.text}> Awaiting majority consensus.</Text>}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
    },
    infoSymbolContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        color: '#6E6E6E',
        textAlign: 'left',
    },
});

export default SurpriseRequestStatus;