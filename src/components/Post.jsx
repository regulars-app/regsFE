import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ProfilePic from './ProfilePic';
import SaveButton from './SaveButton';
import CommentButton from './CommentButton';
import GlassCard from './GlassCard';

const postPic = require('../images/dog-placeholder.png'); // Use a placeholder image

const Post = ( {type, position, imageURI, text} ) => (
  <View style={styles.wrapper}>
    <View style={styles.profilePicContainer}>
      <ProfilePic size={60} footer="Ralphie" />
    </View>
    <View style={styles.container}>
      <GlassCard style={styles.postBody}>
        {type === 'image' ? (
          <Image source={imageURI} style={styles.postImage} />
        ) : type === 'text' ? (
          <Text style={styles.postText}>{text}</Text>
        ) : type === 'image+text' ? (
          <View style={styles.imageTextContainer}>
            <Image source={imageURI} style={styles.postImage} />
            <Text style={styles.postText}>{text}</Text>
          </View>
        ) : null}
      </GlassCard>
      <View style={styles.postFooter}>
        <View style={styles.postFooterButtons}>
          <SaveButton />
          <CommentButton />
        </View>
        <View style={styles.postFooterText}>
          <Text style={styles.senderName}>Shyam</Text>
          <Text style={styles.commentText}>Hello</Text>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignItems: 'center',
    marginVertical: 8,
  },
  profilePicContainer: {
    position: 'absolute',
    top: 10,
    left: -30,
    zIndex: 100,
  },
  container: {
    borderRadius: 16,
    padding: 12,
    width: 320,
    alignItems: 'center',
    marginTop: 30,
  },
  postBody: {
    width: '100%',
    minHeight: 75,
    alignItems: 'center',
  },
  imageTextContainer: {
    alignItems: 'center',
    width: '100%',
  },
  postFooter: {
    width: '100%',
    paddingTop: 10,
  },
  postFooterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  postFooterText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 10,
  },
  commentText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  postImage: {
    width: 280,
    height: 280,
    borderRadius: 8,
  },
  postText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
});

export default Post;
