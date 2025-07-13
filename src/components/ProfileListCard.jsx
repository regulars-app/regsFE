import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import GlassCard from './GlassCard';
import GroupButton from './GroupButton';
import ProfilePic from './ProfilePic';

const ProfileListCard = ({style, members, showButton, clickable, title, type}) => {
    const Wrapper = clickable ? TouchableOpacity : View;
    const dynamicStyle = {
        profileListContainer: {
            height: title ? '80%' : '100%',
        },
    }

    return (
        <GlassCard style={[styles.glassCard, style]}>
            <View style={styles.container}>
                {title && <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>}
                <View style={[styles.profileListContainer, dynamicStyle.profileListContainer]}>
                    <ScrollView nestedScrollEnabled={true} style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                        <Wrapper style={styles.profileList}>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                            <ProfilePic size={50} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                        </Wrapper>
                    </ScrollView>
                </View>
                {showButton && <GroupButton style={styles.profileListButton} size={40} />}
            </View>
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    glassCard: {
        width: '100%',
        height: 200,
    }, 
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        },
        titleContainer: {
            width: '100%',
            height: '20%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
  
        },
        title: {
            fontSize: 17,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#6E6E6E',
        },
        profileListButton: {
            position: 'absolute',
            bottom: 10,
            right: 10,
        },
        profileListContainer: {
            width: '100%',
            flexDirection: 'column',
        },
        scrollView: {
            height: '100%',
        },
        scrollViewContent: {
            justifyContent: 'center',
            flexGrow: 1,
        },
        profileList: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: 10,
            paddingBottom: 40,
            gap: 15,
            paddingLeft: 20,
        },
        });

export default ProfileListCard;