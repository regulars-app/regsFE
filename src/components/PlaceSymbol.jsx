import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View} from 'react-native';

const PlaceSymbol = ({size}) => {
  const placeIcon = require('../images/place-icon.png');
  const dynamicStyles = {
    placeSymbol: {
      width: size,
      height: size,
    },
  };
  return (
      <View style={[styles.placeSymbol, dynamicStyles.placeSymbol]}>
        <Image source={placeIcon} style={styles.placeSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  placeSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  placeSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default PlaceSymbol;