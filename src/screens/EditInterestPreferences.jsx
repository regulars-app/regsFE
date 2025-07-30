import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import BackButton from '../components/BackButton';
import MainButton from '../components/MainButton';
import ItemSelector from '../components/ItemSelector';
import ItemDisplayer from '../components/ItemDisplayer';

const EditInterestPreferences = () => {
    // State to track items selected from the ItemSelector
    const [selectedItems, setSelectedItems] = useState([]);
    
    // Callback function to add items back to the ItemSelector
    const [addItemBackToSelector, setAddItemBackToSelector] = useState(null);

    /**
     * Stabilize the setter function with useCallback to prevent unnecessary re-renders
     * This ensures the ItemSelector's useEffect only runs once
     */
    const setAddItemBackToSelectorCallback = useCallback((callback) => {
        setAddItemBackToSelector(() => callback);
    }, []);

    /**
     * Handle when an item is selected from the ItemSelector
     * Adds the item to the selectedItems list
     */
    const handleSelectionChange = (item) => {
        setSelectedItems(prev => [...prev, item]);
    };

    /**
     * Handle when an item is deleted from the ItemDisplayer
     * Removes the item from selectedItems and adds it back to the ItemSelector
     */
    const handleItemDeleted = (deletedItem) => {
        // Safety check for deletedItem
        if (!deletedItem || !deletedItem.text) {
            return;
        }
        
        // Remove from selectedItems
        setSelectedItems(prev => prev.filter(item => item.text !== deletedItem.text));
        
        // Add back to selector
        if (addItemBackToSelector) {
            addItemBackToSelector(deletedItem);
        }
    };
    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <BackButton size={30} style={styles.backButton} />
        </View>
        <View style={styles.bodyContent}>
            <ItemSelector 
                selectable={false} 
                itemType="activity"
                style={styles.interestSelector}
                onSelectionChange={handleSelectionChange}
                onItemReturned={setAddItemBackToSelectorCallback}
            />
            <ItemDisplayer 
                title={`My Interests`} 
                viewOnly={false} 
                test={false} 
                subjectActivities={selectedItems}
                onItemDeleted={handleItemDeleted}
                style={styles.interestDisplayer} 
            />
        </View>
        <View style={styles.footer}>
            <MainButton text="Confirm" color="green" type="confirm" style={styles.confirmButton} />    
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF6F0',
        height: '100%',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 100,
        paddingBottom: 140,
        },
        header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 100,
        alignItems: 'center',
        },
        footer: {
        position: 'absolute',
        width: '100%',
        height: 140,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        },
        countdown: {
        position: 'absolute',
        bottom: 0,
        },
        bodyContent: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        },
        interestSelector: {
            marginTop: 20,
        },
        interestDisplayer: {
            marginTop: 20,
            height: 200,
        },
        backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        },
        confirmButton: {
        position: 'absolute',
        right: 20,
        },
});

export default EditInterestPreferences;