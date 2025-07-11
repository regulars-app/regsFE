import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Post from './Post';


const PostView = ({style}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.scrollViewContainer}>
                <ScrollView style={styles.scrollView} 
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}>
                    <Post type="text" position="left" text="This is an example of a text post. It's a bit longer than the others, but it's still readable." imageURL="" senderName="Shyam" commentText="Hello, when did you get that? It's soo cool!" />
                    <Post type="image" position="right" text="" imageURL={'https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg'} senderName="Shyam" commentText="Hello, when did you get that? It's soo cool!" />
                    <Post type="mixed" position="left" text="This is an example of a mixed post. It's a bit longer than the others, but it's still readable." imageURL={'https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg'} senderName="Shyam" commentText="Hello, when did you get that? It's soo cool!" />
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
    },
    scrollViewContainer: {
        width: '100%',
        height: '100%',
    },
    scrollView: {
        width: '100%',
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});
    export default PostView;