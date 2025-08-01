import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ConfirmSymbol from './ConfirmSymbol';

const ProfilePic = ({ footer, style, size = 80, imageURL, selectable = false, selected = false, onPress }) => { 
  const dynamicStyles = {
    outer: {
      width: size,
      height: size,
    },
    footerText: {
      fontSize: Math.round(size * 0.2), 
    }
 };

  const Wrapper = selectable ? TouchableOpacity : View;

  return (
    <Wrapper
      style={[styles.container, style]}
      onPress={selectable ? onPress : undefined}
      activeOpacity={0.8}
    >
      <View style={[styles.outer, dynamicStyles.outer]}>
        <Image
          source={{ uri: imageURL }}
          style={styles.image}
          resizeMode="cover"
        />
        {selectable && selected && (
          <>
            <View style={styles.overlay} />
            <View style={styles.checkmark}>
              <ConfirmSymbol size={15} />
            </View>
          </>
        )}
      </View>
      {footer ? (
        <View style={styles.footer}>
          <Text style={[styles.footerText, dynamicStyles.footerText]}>{footer}</Text>
        </View>
      ) : null}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  outer: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.02,
    shadowRadius: 0.2,
    elevation: 1,
    alignSelf: 'center',
    margin: 0,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    objectFit: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 100,
    zIndex: 1,
  },
  checkmark: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 2,
    elevation: 2,
  },
  footer: {
    marginTop: -7,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  footerText: {
    fontWeight: '500',
    color: '#6E6E6E',
  },
});

export default ProfilePic;
