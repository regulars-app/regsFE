import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AddSymbol from './AddSymbol';
import ConfirmSymbol from './ConfirmSymbol';

const AddFriendButton = ({style, requested = false}) => {
    return (
        <View style={[styles.container, style]}>
            {requested ? <View style={styles.overlay}></View> : null}
                {requested ? 
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Requested</Text>
                        <ConfirmSymbol style={styles.confirmSymbol} size={18}/>
                    </View> :
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Add</Text>
                        <AddSymbol style={styles.addSymbol}/>
                    </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
       minWidth: 20,
       height: 30,
       backgroundColor: '#F2FFF6',
       position: 'relative',
       alignItems: 'center',
       justifyContent: 'center',
       paddingLeft: 15,
       paddingRight: 5,
       elevation: 0.5, 
       shadowColor: '#000',
       shadowOffset: {width: 0, height: -2},
       shadowOpacity: 0.25,
       shadowRadius: 3.84,
       borderRadius: 10,
    },
    overlay: {
        backgroundColor: '...StyleSheet.absoluteFillObject', 
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 10,
        zIndex: 2,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    buttonText: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#6E6E6E',
    },      
    addSymbol: {
        width: 25,
        height: 25,
    },
    confirmSymbol: {
        paddingHorizontal: 5,
    },
});

export default AddFriendButton;