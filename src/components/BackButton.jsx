import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import BackSymbol from './BackSymbol';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({style, size}) => {
    const navigation = useNavigation();
    const dynamicStyle = {
        backButton: {
            width: size,
            height: size,
        },
    };
  return (
    <TouchableOpacity style={[styles.backButton, dynamicStyle.backButton, style]} onPress={() => navigation.goBack()}>
      <BackSymbol />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',   
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
});
export default BackButton;