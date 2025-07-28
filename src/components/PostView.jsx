import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Post from './Post';


const PostView = ({style, posts = []}) => {

    const postsToRender = posts.length > 0 ? posts : [];

    

    return (
        <View style={[styles.container, style]}>
            <View style={styles.scrollViewContainer}>
                <ScrollView style={styles.scrollView} 
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}>
                    {postsToRender.map((post) => (
                        <Post 
                            key={post.id}
                            type={post.type} 
                            position={post.position} 
                            text={post.text} 
                            imageURL={post.imageURL} 
                            senderName={post.senderName} 
                            commentText={post.commentText} 
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal: 10,
    },
    scrollViewContainer: {
        width: '100%',
        height: '100%',
    },
    scrollView: {
        width: '100%',
    },
    scrollViewContent: {
        flex: 1,
    },
});
    export default PostView;