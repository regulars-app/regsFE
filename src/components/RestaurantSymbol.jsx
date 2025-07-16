import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const RestaurantSymbol = ({size, style}) => {
  const restaurantIcon = require('../images/restaurant-icon.png');
  const dynamicStyle = {
    restaurantSymbolImage: {
      width: size,
      height: size,
    },
  };
  return (
    <View style={[styles.restaurantSymbol, style]}>
      <Image source={restaurantIcon} style={[dynamicStyle.restaurantSymbolImage]} />
    </View>
  );
};

const styles = StyleSheet.create({
    restaurantSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RestaurantSymbol;