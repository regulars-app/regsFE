import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ProfilePic from './ProfilePic';
import SaveSymbol from './SaveSymbol';
import CommentButton from './CommentButton';
import GlassCard from './GlassCard';
import ReplySymbol from './ReplySymbol';

// PROPS:
// Can be given type: 'text', 'image', 'mixed'
// Can be given position: 'left', 'right'
// Can be given imageURI: string
// Can be given text: string
// Can be given senderName: string
// Can be given commentText: string

const Post = ( {type, position, imageURL, text, senderName, commentText, onPostAction} ) => {
  const dynamicStyle = {
    container: {
      alignSelf: position === 'left' ? 'flex-start' : 'flex-end',
    },
    replySymbol: {
      left: position === 'right' ? -30 : 'none',
      right: position === 'left' ? -30 : 'none',
    },
    profilePic: {
      top: position === 'left' ? -30 : -30,
      left: position === 'left' ? -30 : 'none',
      right: position === 'right' ? -30 : 'none',
    },
    postText: {
      paddingLeft: position === 'left' && type === 'text' ? 20 : 0,
      paddingRight: position === 'right' && type === 'text' ? 20 : 0,
    },
  };
  
  return(
  <View style={[styles.container, dynamicStyle.container]}>
    <View style={styles.postBodyWrapper}>
      <ProfilePic size={60} footer="Ralphie" style={[styles.profilePic, dynamicStyle.profilePic]} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
      <View style={styles.replyAreaContainer}>
        {position === 'right' && <TouchableOpacity onPress={() => onPostAction?.('comment', { type, position, imageURL, text, senderName, commentText })}><ReplySymbol size={25} style={[styles.replySymbol, dynamicStyle.replySymbol]}/></TouchableOpacity>}
        <GlassCard style={styles.postBody}>
          {type === 'image' ? (
            <Image source={{ uri: imageURL }} style={styles.postImage} />
          ) : type === 'text' ? (
            <View style={styles.textContainer}>
              <Text style={[styles.postText, dynamicStyle.postText]}>{text}</Text>
            </View>
          ) : type === 'mixed' ? (
            <View style={styles.imageTextContainer}>
              <Image source={{ uri: imageURL }} style={styles.postImage} />
              <View style={styles.textContainer}>
                <Text style={styles.postText}>{text}</Text>
              </View>
            </View>
          ) : null}
        </GlassCard>
        {position === 'left' && <TouchableOpacity onPress={() => onPostAction?.('comment', { type, position, imageURL, text, senderName, commentText })}><ReplySymbol size={25} style={[styles.replySymbol, dynamicStyle.replySymbol]}/></TouchableOpacity>}
      </View>
      <View style={styles.postFooter}>
        <View style={styles.postFooterButtons}>
          <TouchableOpacity onPress={() => {}}>
            <SaveSymbol size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPostAction?.('comment', { type, position, imageURL, text, senderName, commentText })}>
            <CommentButton numComments={3} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.postFooterText} onPress={() => onPostAction?.('comment', { type, position, imageURL, text, senderName, commentText })}>
          <Text style={styles.senderName}>{senderName}</Text>
          <Text style={styles.commentText} numberOfLines={1} ellipsizeMode="tail">{commentText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 8,
    alignSelf: 'flex-start',
    maxWidth: '75%',
    paddingBottom: 12,
    paddingTop: 42,
    paddingLeft: 42,
    paddingRight: 42,
    overflow: 'hidden'
  },
  postBodyWrapper: {
    position: 'relative',
    overflow: 'visible',
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  replyAreaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'visible'
  },
  replySymbol: {
    zIndex: 100,
    position: 'absolute',
  },
  postBody: {
    minHeight: 75,
    minWidth: 200,
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  profilePic: {
    position: 'absolute',
    zIndex: 100,
  },
  imageTextContainer: {
    alignItems: 'center',
    width: '100%',
  },
  postFooter: {
    paddingTop: 10,
    maxWidth: '100%',
  },
  postFooterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  postFooterText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: '#6E6E6E',
    paddingHorizontal: 10,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 10,
    color: '#6E6E6E',
  },
  commentText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#6E6E6E',
    flexShrink: 1,
  },
  postImage: {
    width: 280,
    height: 280,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 20,
    width: '100%',
  },
  postText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'left',
    lineHeight: 20,
    letterSpacing: 0.4,
    color: '#6E6E6E',
  },
});

export default Post;
