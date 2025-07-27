import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EditSymbol from './EditSymbol';
import ConfirmSymbol from './ConfirmSymbol';
//Props decide if green, yellow or red button

const MainButton = ({text, color, type, style}) => {
    const dynamicStyle = {
        mainButton: {
            backgroundColor: color === 'green' ? '#F2FFF6' : color === 'yellow' ? '#FBF7D5' : '#F9C7C5',
        },
      };
    return(
        <TouchableOpacity style={[styles.mainButton, dynamicStyle.mainButton, style]}>
            <Text style={styles.mainButtonText}>{text}</Text>
            {type === 'suggest' && <EditSymbol size={20}/>}
            {type === 'confirm' && <ConfirmSymbol size={20}/>}
        </TouchableOpacity>
    )
}
export default MainButton;

const styles = StyleSheet.create({
    mainButton: {
        height: 60,
        borderRadius: 20,
        overflow: 'hidden',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 6,

        // Android shadow
        elevation: 1,
    },
    mainButtonText: {
        color: '#6E6E6E',
        fontSize: 16,
        fontWeight: 'bold',
    },
});