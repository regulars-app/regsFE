import React from 'react';
import { TouchableOpacity, StyleSheet, Image, Text} from 'react-native';

const CommentButton = ({numComments}) => {
  const commentIcon = require('../images/chat-icon.png');
  return (
    <TouchableOpacity style={styles.button}>
      <Image source={commentIcon} style={styles.buttonImage} />
      <Text style={styles.buttonText}>{numComments}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonImage: {
      width: 25,
      height: 25,
    },
    buttonText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#6E6E6E',
      paddingLeft: 5,
    },
  });
  
  export default CommentButton;
