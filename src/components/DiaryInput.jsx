import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import GlassCard from './GlassCard';
import CameraSymbol from './CameraSymbol';
import GallerySymbol from './GallerySymbol';
import EditSymbol from './EditSymbol';
import CancelSymbol from './CancelSymbol';

const DiaryInput = () => {

    const [image, setImage] = useState(null);

    return (
        <GlassCard style={styles.glassCard}>
            {image ? 
            <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity style={styles.editSymbolContainer}>
                            <EditSymbol size={20}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelSymbolContainer} onPress={() => setImage(null)}>
                            <CancelSymbol size={20}/>
                        </TouchableOpacity>
                        <Image style={styles.selectedImage} source={{uri: image}}/>
                    </View>
                    <TextInput 
                    style={styles.input} 
                    placeholder={`Write your diary here...`}
                    multiline={true}
                    fontWeight="600"
                    placeholderTextColor="rgba(110, 110, 110, 0.5)"/>
            </View>
            :
            <View style={styles.container}>
                <TextInput 
                    style={styles.input} 
                    placeholder={`Write your diary here...`}
                    multiline={true}
                    fontWeight="600"
                    placeholderTextColor="rgba(110, 110, 110, 0.5)"/>
                <View style={styles.mediaOptions}>
                    <TouchableOpacity onPress={() => setImage('https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg')}>
                        <CameraSymbol style={styles.mediaOption} size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setImage('https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg')}>
                        <GallerySymbol style={styles.mediaOption} size={30}/>
                    </TouchableOpacity>
                </View> 
            </View>
            }
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    glassCard: {
        width: '90%',
        height: 450,
    },
    container: {
        minWidth: '100%',
        maxWidth: '100%',
        height: '100%',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
        flexDirection: 'column',
    },
    input: {
        flex: 1,
        fontSize: 15,
        fontWeight: '400',
        color: '#6E6E6E',
        textAlignVertical: 'top',
        textAlign: 'left',
    },
    imageContainer: {
        width: '100%',
        height: '80%',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        padding: 15,
        position: 'relative',
    },
    editSymbolContainer: {
        position: 'absolute',
        top: 4,
        right: 4,
        zIndex: 100,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 8,
    },
    cancelSymbolContainer: {
        position: 'absolute',
        top: 4,
        left: 4,
        zIndex: 100,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 8,
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white',
    },
    mediaOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        paddingTop: 15,
    },
});

export default DiaryInput;  