import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const LogoutSymbol = ({size}) => {
    const dynamicStyle = {
        logoutSymbol: {
            width: size,
            height: size,
        },
    };
  const logoutIcon = require('../images/logout-icon.png');
  return (
      <View style={[styles.logoutSymbol, dynamicStyle.logoutSymbol]}>
        <Image source={logoutIcon} style={styles.logoutSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  logoutSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default LogoutSymbol;