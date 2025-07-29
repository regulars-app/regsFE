import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import ChatSymbol from './ChatSymbol';

const CommentButton = ({numComments}) => {
  return (
    <View style={styles.button}>
      <ChatSymbol size={25} />
      <Text style={styles.buttonText}>{numComments}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#6E6E6E',
      paddingLeft: 5,
    },
  });
  
  export default CommentButton;
