import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProfilePic from './ProfilePic';
import ConfirmSymbol from './ConfirmSymbol';
import MoreSymbol from './MoreSymbol';

const MemberItem = ({style, name, imageURL, isSelected = false, onPress, selectable = false}) => {
    if (selectable) {
        // Selection mode - show checkboxes and make clickable
        return (
            <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.7}>
                <View style={styles.leftContainer}>
                    <ProfilePic size={40} style={styles.profilePic} imageURL={imageURL || 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                    <Text style={styles.name}>{name}</Text>
                </View>
                <View style={styles.rightContainer}>
                    {isSelected ? (
                        <View style={styles.selectedIndicator}>
                            <ConfirmSymbol size={20} />
                        </View>
                    ) : (
                        <View style={styles.unselectedIndicator} />
                    )}
                </View>
            </TouchableOpacity>
        );
    } else {
        // Display mode - show triple dots (original design)
        return (
            <View style={[styles.container, style]}>
                <View style={styles.leftContainer}>
                    <ProfilePic size={40} style={styles.profilePic} imageURL={imageURL || 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                    <Text style={styles.name}>{name}</Text>
                </View>
                <TouchableOpacity style={styles.rightContainer}>
                    <MoreSymbol size={30}/>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1, 
        borderColor: 'rgba(110, 110, 110, 0.2)',
        height: 70,
        width: '100%',
        backgroundColor: 'transparent',
        paddingHorizontal: 25,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        gap: 20,
    },
    rightContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
    },
    profilePic: {
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6E6E6E',
    },
    selectedIndicator: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        justifyContent: 'center',
    },
    unselectedIndicator: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#6E6E6E',
        backgroundColor: 'transparent',
    },
});

export default MemberItem;