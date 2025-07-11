import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';
import GlassCard from './GlassCard';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const DRAG_CLOSE_THRESHOLD = SCREEN_HEIGHT * 0.15;

const Popup = ({ showPopup, style, onClose, children }) => {
    const translateY = useRef(new Animated.Value(0)).current;

    // Reset translateY when popup is true
    useEffect(() => {
        if (showPopup) {
            translateY.setValue(0);
        }
    }, [showPopup]);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // Only vertical drags
                return Math.abs(gestureState.dy) > 10;
            },
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    translateY.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > DRAG_CLOSE_THRESHOLD) {
                    Animated.timing(translateY, {
                        toValue: SCREEN_HEIGHT,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(() => {
                        if (onClose) onClose();
                    });
                } else {
                    Animated.spring(translateY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    if (!showPopup) return null;
    return (
        <Animated.View
            style={[{ transform: [{ translateY }] }, styles.animatedWrapper, style]}
            {...panResponder.panHandlers}
        >
            <GlassCard style={styles.popup}>
                <View style={styles.pillContainer}>
                    <View style={styles.pill} />
                </View>
                <View style={styles.popupContainer}>
                    {children ? children : <Text>Popup Placeholder</Text>}
                </View>
            </GlassCard>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    animatedWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        minHeight: '50%',
    },
    popup: {
        height: '100%',
        width: '97.65%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pillContainer: {
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    pill: {
        width: 50,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#ccc',
    },
    popupContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Popup;
