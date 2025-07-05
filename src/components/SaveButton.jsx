import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View} from 'react-native';

const SaveButton = () => {
  const saveIcon = require('../images/save-icon.png');
  return (
      <TouchableOpacity style={styles.button}>
        <Image source={saveIcon} style={styles.buttonImage} />
      </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  button: {
    width: 25,
    height: 25,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
});

export default SaveButton;