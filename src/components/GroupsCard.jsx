import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GlassCard from './GlassCard';
import GroupButton from './GroupButton';
import ProfilePic from './ProfilePic';

const GroupsCard = ({style, groups}) => {
    return (
        <GlassCard style={[styles.glassCard, style]}>
            <View style={styles.container}>
                <View style={styles.groupsContainer}>
                <ScrollView nestedScrollEnabled={true}>
                    <View style={styles.groupsList}>
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
                    </View>
                </ScrollView>
                </View>
                <GroupButton style={styles.groupButton} size={40} />
            </View>
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    glassCard: {
        width: '90%',
        height: 200,
        marginVertical: 10,
    }, 
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        },
        groupButton: {
            position: 'absolute',
            bottom: 10,
            right: 10,
        },
        groupsContainer: {
            width: '100%',
            height: '90%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 10,
        },
        groupsList: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 15,
            alignSelf: 'flex-start',
            paddingLeft: 20,
            paddingTop: 10,
            paddingBottom: 10,
        },
        });

export default GroupsCard;