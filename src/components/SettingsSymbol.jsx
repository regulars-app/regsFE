import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const SettingsSymbol = ({size, style}) => {
    const dynamicStyle = {
        settingsSymbol: {
            width: size,
            height: size,
        },
    };
  const settingsIcon = require('../images/settings-icon.png');
  return (
      <View style={[styles.settingsSymbol, dynamicStyle.settingsSymbol, style]}>
        <Image source={settingsIcon} style={styles.settingsSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  settingsSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default SettingsSymbol;