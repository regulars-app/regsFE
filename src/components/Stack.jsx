import React, { useRef, useState } from 'react';
import { View, Animated, StyleSheet, PanResponder, Dimensions, Easing } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const CARD_WIDTH = Math.round(Dimensions.get('window').width * 1);
const CARD_HEIGHT = 900;
const CARD_RADIUS = 24;
//const BLUR_AMOUNT = 8;
const SWIPE_THRESHOLD = CARD_WIDTH / 10;

const Stack = ({ data, renderItem }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const animatedIndex = useRef(new Animated.Value(0)).current;
  const panX = useRef(new Animated.Value(0)).current;
  const lastIndex = useRef(0);

  // PanResponder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
      onPanResponderGrant: () => {
        panX.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        panX.setValue(-gestureState.dx / CARD_WIDTH);
      },
      onPanResponderRelease: (_, gestureState) => {
        let snappedIndex = lastIndex.current;
        if (gestureState.dx > SWIPE_THRESHOLD && lastIndex.current > 0) {
          snappedIndex = lastIndex.current - 1;
        } else if (gestureState.dx < -SWIPE_THRESHOLD && lastIndex.current < data.length - 1) {
          snappedIndex = lastIndex.current + 1;
        }
        Animated.timing(animatedIndex, {
          toValue: snappedIndex,
          duration: 25,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start(() => {
          setFocusedIndex(snappedIndex);
          lastIndex.current = snappedIndex;
          panX.setValue(0);
        });
      },
      onPanResponderTerminate: () => {
        Animated.timing(animatedIndex, {
          toValue: lastIndex.current,
          duration: 25,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start(() => {
          panX.setValue(0);
        });
      },
    })
  ).current;

  // Keep animatedIndex in sync with focusedIndex when set programmatically
  React.useEffect(() => {
    Animated.timing(animatedIndex, {
      toValue: focusedIndex,
      duration: 0,
      useNativeDriver: false,
    }).start();
    lastIndex.current = focusedIndex;
  }, [focusedIndex]);

  // Combine animatedIndex and panX for real-time swiping
  const currentAnimatedIndex = Animated.add(animatedIndex, panX);

  return (
    <View style={styles.stackContainer} {...panResponder.panHandlers}>
      {data.map((item, index) => {
        // Only render cards within focusedIndex-1, focusedIndex, focusedIndex+1
        if (index < focusedIndex - 1 || index > focusedIndex + 1) return null;
        // Distance from animated index
        const offset = Animated.subtract(index, currentAnimatedIndex);
        const sideOffset = 48;
        const scale = offset.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [0.92, 1, 0.92],
          extrapolate: 'clamp',
        });
        const translateX = offset.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [-sideOffset, 0, sideOffset],
          extrapolate: 'clamp',
        });
        // Set zIndex so focused card is always on top
        const zIndex = index === focusedIndex ? 100 : 100 - Math.abs(index - focusedIndex);
        const isFocused = index === focusedIndex;
        return (
          <Animated.View
            key={index}
            style={[
              styles.card,
              {
                zIndex,
                transform: [
                  { scale },
                  { translateX },
                ],
              },
            ]}
          >
            <View style={styles.cardContent}>
              {renderItem({ item, index })}
            </View>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  stackContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CARD_RADIUS,
    left: 0,
    top: 0,
  },
  cardContent: {
    flex: 1,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: CARD_RADIUS,
    zIndex: 10,
  },
});

export default Stack; 