import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GlassCard from './GlassCard';
import DoubleTickSymbol from './DoubleTickSymbol';
import UnconfirmedSymbol from './UnconfirmedSymbol';
import ProfilePic from './ProfilePic';

// type is either surpirse or meetup
// screen is either group or all. 
const MeetupItemCard = ({type, meetupTitle, meetupDatetime, meetupConfirmed, group, screen='group', style}) => {

    const dynamicStyles = {
        innerWrapper: {
            marginTop: screen === 'all' ? 10 : 0,
        }
    };
    return (
        <View style={[styles.wrapper, style]}>
            <View style={[styles.innerWrapper, dynamicStyles.innerWrapper]}>
            {screen === 'all' && <ProfilePic size={40} style={styles.profilePic} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>}
            <GlassCard style={styles.glassCard}>
                <TouchableOpacity style={styles.container}>
                    <View style={styles.infoItems}>
                        <View style={styles.titleInfoItem}>
                            <Text style={styles.infoItemText}>{meetupTitle}</Text>
                        </View>
                        <View style={styles.rightInfoItems}>
                            <View style={styles.datetimeInfoItem}>
                                <Text style={styles.infoItemText}>{meetupDatetime ? meetupDatetime : '...'}</Text>
                            </View>
                            <View style={styles.confirmedInfoItem}>
                                {meetupConfirmed ? <View style={styles.confirmedSymbolContainer}>
                                    <DoubleTickSymbol />
                                </View> : <View style={styles.unconfirmedSymbolContainer}>
                                    <UnconfirmedSymbol />
                                </View>}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </GlassCard>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    profilePic: {
        position: 'absolute',
        top: -5,
        right: -10,
        zIndex: 1,
    },
    glassCard: {
        width: '80%',
        height: 80,
        marginVertical: 10,
    },
    container: {
        padding: 20,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    titleInfoItem: {
        flexDirection: 'row',   
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightInfoItems: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
    },
    datetimeInfoItem: {
        flexDirection: 'row',   
        alignItems: 'center',
    },
    confirmedInfoItem: {
        alignSelf: 'flex-end',
        flexDirection: 'row',   
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoItemText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6E6E6E',
    },
    confirmedSymbolContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#F2FFF6',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unconfirmedSymbolContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#FBF7D5',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    
});
export default MeetupItemCard;
