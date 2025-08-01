import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const ActivitySymbol = ({size}) => {
  const activityIcon = require('../images/activity-icon.png');
  const dynamicStyles = {
    activitySymbol: {
      width: size,
      height: size,
    },
  }
  return (
      <View style={[styles.activitySymbol, dynamicStyles.activitySymbol]}>
        <Image source={activityIcon} style={styles.activitySymbolImage} />
      </View>

  );
};

const styles = StyleSheet.create({
  activitySymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activitySymbolImage: {
    width: '100%',
    height: '100%',
  },
});

export default ActivitySymbol;