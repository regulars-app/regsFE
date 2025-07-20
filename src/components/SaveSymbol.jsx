import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View} from 'react-native';

const SaveSymbol = ({size}) => {
  const saveIcon = require('../images/save-icon.png');
  const dynamicStyles = {
    saveSymbol: {
      width: size,
      height: size,
    },
  };
  return (
      <View style={[styles.saveSymbol, dynamicStyles.saveSymbol]}>
        <Image source={saveIcon} style={styles.saveSymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  saveSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  saveSymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default SaveSymbol;