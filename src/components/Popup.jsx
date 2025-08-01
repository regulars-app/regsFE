import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions, TouchableWithoutFeedback } from 'react-native';
import GlassCard from './GlassCard';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const DRAG_CLOSE_THRESHOLD = SCREEN_HEIGHT * 0.15;

const Popup = ({ showPopup, style, onClose, children, isScrolling = false }) => {
    const translateY = useRef(new Animated.Value(0)).current;

    // Reset translateY when popup is true and animate opening
    useEffect(() => {
        if (showPopup) {
            // Start from bottom of screen
            translateY.setValue(SCREEN_HEIGHT);
            // Animate to top
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                tension: 50,
                friction: 8,
            }).start();
        }
    }, [showPopup]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => false,
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
        <View style={styles.backdrop}>
            <TouchableWithoutFeedback onPress={() => {
                Animated.timing(translateY, {
                    toValue: SCREEN_HEIGHT,
                    duration: 200,
                    useNativeDriver: true,
                }).start(() => {
                    if (onClose) onClose();
                });
            }}>
                <View style={styles.backdropTouchable} />
            </TouchableWithoutFeedback>
            <Animated.View
                style={[{ transform: [{ translateY }] }, styles.animatedWrapper, style]}
            >
                <GlassCard style={styles.popup}>
                    <View style={styles.dragHandle} {...panResponder.panHandlers}>
                        <View style={styles.pillContainer}>
                            <View style={styles.pill} />
                        </View>
                    </View>
                    <View style={styles.popupContainer}>
                        {children ? children : <Text>Popup Placeholder</Text>}
                    </View>
                </GlassCard>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    backdropTouchable: {
        flex: 1,
    },
    animatedWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1001,
        minHeight: '10%',
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
    dragHandle: {
        height: 50,
        width: '100%',
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
        backgroundColor: '#6E6E6E',
    },
    popupContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default Popup;
