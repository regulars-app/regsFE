import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const ActivitySymbol = () => {
  const activityIcon = require('../images/activity-icon.png');
  return (
      <View style={styles.activitySymbol}>
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
    width:15,
    height: 15,
  },
});

export default ActivitySymbol;