import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import ImageCard from '../components/ImageCard';
import Messenger from '../components/Messenger';
import GlassCard from '../components/GlassCard';
import TextSymbol from '../components/TextSymbol';

const DailyDiaryPostPopup = ({imageURL, width, height, aspectRatio, messages, text }) => {

    const [showText, setShowText] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                {imageURL && !text && <ImageCard style={styles.imageCard} imageURL={imageURL} width={width} height={height} aspectRatio={aspectRatio} />}
                {text && !imageURL && <GlassCard style={styles.textContentContainer}>
                    <ScrollView style={styles.textContentScrollView}>
                        <Text style={styles.textContent}>{text}</Text>
                    </ScrollView>
                </GlassCard>}
                {imageURL && text && <View style={styles.imageTextContainer}>
                    {!showText && <ImageCard style={styles.imageCard} imageURL={imageURL} width={width} height={height} aspectRatio={aspectRatio} />}
                    {showText && <GlassCard style={styles.textContentContainerMixed}>
                        <ScrollView style={styles.textContentScrollView}>
                            <ScrollView style={styles.textContentScrollViewMixed}>
                                <Text style={styles.textContent}>{text}</Text>
                            </ScrollView>
                        </ScrollView>
                    </GlassCard>}
                    <TouchableOpacity style={!showText ? styles.textSymbolContainer : styles.imageThumbnailContainer} onPress={() => setShowText(!showText)}>
                        {!showText ? <TextSymbol size={30} /> : <Image style={styles.imageThumbnail} source={{ uri: imageURL }} />}
                    </TouchableOpacity>
                </View>}
            </View>
            <GlassCard style={styles.messengerGlassCard}>
                <Messenger style={styles.messenger} messages={messages} paddingHorizontal={0}/>
            </GlassCard>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        gap: 20,
    },
    contentContainer: {
        position: 'relative',
    },
    imageCard: {
        width: '100%',
        aspectRatio: 1.2,
    },
    textContentContainer: {
        width: '100%',
        maxHeight: 200,
        backgroundColor: 'white',
    },
    textContentScrollView: {
        margin: 10,
    },
    textContent: {
        fontSize: 16,
        fontWeight: '500',
        color: '#6E6E6E',
    },
    imageTextContainer: {
        width: '100%',
        aspectRatio: 1.2,
        borderRadius: 20,
    },
    textContentContainerMixed: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    textContentScrollViewMixed: {
        margin: 10,
    },
    textSymbolContainer: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    imageThumbnailContainer: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    imageThumbnail: {
        borderRadius: 10,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    messengerGlassCard: {
        width: '100%',
        height: 500,
        padding: 10,
        paddingBottom: 20,
        marginBottom: 20,
    },
    messenger: {
       height: '100%',
       width: '100%',
    },
});

export default DailyDiaryPostPopup; 