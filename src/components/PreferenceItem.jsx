import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ConfirmSymbol from './ConfirmSymbol';

const PreferenceItem = ({ style, text, color, type, isSelected, showCheckmark = true, selectable = false, clickableOnly = false, onPress }) => {
    const dynamicStyle = {
        container: {
            backgroundColor: color === 'green' ? '#ECF5E1' : color === 'yellow' ? '#FFF7D5' : color === 'red' ? '#FAD2D1' : '#ffffff',
            borderColor: color === 'green' ? '#B6E799' : color === 'yellow' ? '#FFEAB7' : color === 'red' ? '#F5A9A9' : '#C1C1C1',
        },
    };

    const content = (
        <View style={[styles.container, dynamicStyle.container, style]}>
            <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>{text}</Text>
            {isSelected && selectable && (
                <>
                    <View style={styles.overlay} />
                    {showCheckmark && (
                        <View style={styles.checkmarkContainer}>
                            <ConfirmSymbol size={10} />
                        </View>
                    )}
                </>
            )}
        </View>
    );

    if (clickableOnly) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                {content}
            </TouchableOpacity>
        );
    }

    return content;
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6E6E6E',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 10,
        zIndex: 2,
    },
    checkmarkContainer: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
        padding: 2,
    },
});

export default PreferenceItem;