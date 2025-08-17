import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import BackButton from '../components/BackButton';
import Stack from '../components/Stack';
import ImageCard from '../components/ImageCard';
import SearchBar from '../components/SearchBar';

const Memories = () => {

    const photoStackWideExampleData = [
        {
          id: '1',
          imageURL: 'https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg',
          footer: 'Octopus pasta at Pani\'s house!',
        },
        {
          id: '2',
          imageURL: 'https://cdn.pixabay.com/photo/2025/06/11/22/12/kackar-mountains-9655201_1280.jpg',
          footer: 'Beach Freddo',
        },
        {
          id: '3',
          imageURL: 'https://cdn.pixabay.com/photo/2025/06/03/05/11/louvre-9638315_1280.jpg',
          footer: 'Idiot sandwich',
        },
      ];

    const groupsExampleData = [
        {
            id: '1',
            groupName: 'Ealing divas',
            imageURL: 'https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg',
            currentTopTrip: 'Trip to Italy',
            photoStackImages: photoStackWideExampleData,
        },
        {
            id: '2',
            groupName: 'Group 2',
            imageURL: 'https://cdn.pixabay.com/photo/2025/06/11/22/12/kackar-mountains-9655201_1280.jpg',
            currentTopTrip: 'Trip to Italy',
            photoStackImages: photoStackWideExampleData,
        },
        {
            id: '3',    
            groupName: 'Group 3',
            imageURL: 'https://cdn.pixabay.com/photo/2025/06/03/05/11/louvre-9638315_1280.jpg',
            currentTopTrip: 'Trip to Italy',
            photoStackImages: photoStackWideExampleData,
        },
        {
            id: '4',
            groupName: 'Group 4',
            imageURL: 'https://cdn.pixabay.com/photo/2025/06/03/05/11/louvre-9638315_1280.jpg',
            currentTopTrip: 'Trip to Italy',
            photoStackImages: photoStackWideExampleData,
        },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackButton style={styles.backButton} size={30}/>
            </View>
            <View style={styles.content}>
                <SearchBar style={styles.searchBar}/>
                <Stack cardWidth={Dimensions.get('window').width} cardHeight={200} style={styles.widePhotoStack} data={photoStackWideExampleData} renderItem={({item}) => <ImageCard imageURL={item.imageURL} footer={item.footer} width={Dimensions.get('window').width * 0.8} height={200} />} />
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                    {groupsExampleData.map((group, index) => (
                        <View key={group.id} style={styles.groupMediaContainer}>
                            <ImageCard 
                                style={styles.groupMediaImage} 
                                imageURL={group.imageURL} 
                                footer={group.groupName} 
                                width={Dimensions.get('window').width * 0.6} 
                                height={150} 
                            />
                            <Stack 
                                style={styles.groupMediaStack} 
                                sideOffset={15} 
                                cardWidth={120} 
                                cardHeight={170} 
                                data={group.photoStackImages} 
                                renderItem={({item}) => <ImageCard imageURL={item.imageURL} footer={group.currentTopTrip} height={150} width={120} />} 
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#FFF6F0',
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 75,
        alignItems: 'center',
      },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 100,
      },
    content: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingTop: 75,
    },
    widePhotoStack: {
        marginTop: 20,
        marginBottom: 20,
    },
    scrollView: {
        width: '100%',
        height: '100%',
        marginTop: 20,
    },
    scrollViewContent: {
        paddingBottom: 50,
        width: '100%',
        alignItems: 'center',
    },
    groupMediaContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: 170,
        marginBottom: 20,
        paddingBottom: 40,
    },
    groupMediaImage: {
        alignSelf: 'flex-start',
    },
    groupMediaStack: {
        marginLeft: 20,
    },
});


export default Memories;