import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View} from 'react-native';

const CommentButton = () => {
  const commentIcon = require('../images/chat-icon.png');
  return (
    <TouchableOpacity style={styles.button}>
      <Image source={commentIcon} style={styles.buttonImage} />
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
  
  export default CommentButton;
