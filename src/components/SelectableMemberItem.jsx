import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProfilePic from './ProfilePic';
import ConfirmSymbol from './ConfirmSymbol';
import AddSymbol from './AddSymbol';

const SelectableMemberItem = ({style, name, imageURL, isSelected = false, onPress}) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.leftContainer}>
                <ProfilePic size={40} style={styles.profilePic} imageURL={imageURL || 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
                <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.rightContainer}>
                <View style={styles.buttonContainer}>
                    {isSelected && <View style={styles.overlay}></View>}
                    {isSelected ? (
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Selected</Text>
                            <ConfirmSymbol style={styles.confirmSymbol} size={18}/>
                        </View>
                    ) : (
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Select</Text>
                            <AddSymbol size={20}/>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    profilePic: {
        marginRight: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: '#6E6E6E',
    },
    rightContainer: {
        alignItems: 'flex-end',
    },
    buttonContainer: {
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 10,
        zIndex: 2,
    },
    button: {
        minWidth: 80,
        height: 30,
        backgroundColor: '#F2FFF6',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        elevation: 0.5, 
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 5,
    },
    buttonText: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#6E6E6E',
    },
    confirmSymbol: {
        paddingHorizontal: 5,
    },
});

export default SelectableMemberItem;
