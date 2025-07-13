import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import GlassCard from './GlassCard';
import GroupButton from './GroupButton';
import ProfilePic from './ProfilePic';

const MembersCard = ({style, members, showGroupButton, clickable}) => {
    const Wrapper = clickable ? TouchableOpacity : View;

    return (
        <GlassCard style={[styles.glassCard, style]}>
            <View style={styles.container}>
                <View style={styles.membersContainer}>
                    <ScrollView nestedScrollEnabled={true} style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                        <Wrapper style={styles.membersList}>
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
                {showGroupButton && <GroupButton style={styles.groupButton} size={40} />}
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
        groupButton: {
            position: 'absolute',
            bottom: 10,
            right: 10,
        },
        membersContainer: {
            width: '100%',
            height: '100%',
            flexDirection: 'column',
        },
        scrollView: {
            height: '100%',
        },
        scrollViewContent: {
            justifyContent: 'center',
            flexGrow: 1,
        },
        membersList: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: 10,
            paddingBottom: 40,
            gap: 15,
            paddingLeft: 20,
        },
        });

export default MembersCard;