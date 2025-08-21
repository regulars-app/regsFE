import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/**
 * Custom function to handle array operations for Datastore compatibility mode
 * Since we're in "Firestore with Datastore compatibility" mode, we need to handle arrays manually
 */

/**
 * Send a friend request to another user
 * @param {string} friendID - The ID of the user to send the request to
 * @returns {Promise<Object>} - Result of the operation
 */
async function requestFriend(friendID) {
    try {
        const currentUser = auth().currentUser;
        if (!currentUser) {
            throw new Error('User not authenticated');
        }

        const currentUserID = currentUser.uid;
        
        // Get the friend's user document
        const friendRef = firestore().collection('users').doc(friendID);
        const friendDoc = await friendRef.get();
        
        if (!friendDoc.exists) {
            throw new Error('Friend user not found');
        }

        const friendData = friendDoc.data();
        const currentRequests = friendData.friend_requests_received || [];
        
        // Check if request already exists
        if (currentRequests.includes(currentUserID)) {
            return {
                success: false,
                error: 'Friend request already sent'
            };
        }

        // Add current user ID to friend's friend_requests_received array
        await friendRef.update({
            friend_requests_received: [...currentRequests, currentUserID]
        });

        // Also add the friend's ID to current user's friend_requests_sent array
        const currentUserRef = firestore().collection('users').doc(currentUserID);
        const currentUserDoc = await currentUserRef.get();
        
        if (currentUserDoc.exists) {
            const currentUserData = currentUserDoc.data();
            const currentSentRequests = currentUserData.friend_requests_sent || [];
            
            if (!currentSentRequests.includes(friendID)) {
                await currentUserRef.update({
                    friend_requests_sent: [...currentSentRequests, friendID]
                });
            }
        }

        return {
            success: true,
            message: 'Friend request sent successfully'
        };
    } catch (error) {
        console.error('Error sending friend request:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Accept a friend request from another user
 * @param {string} friendID - The ID of the user who sent the request
 * @returns {Promise<Object>} - Result of the operation
 */
async function acceptFriendRequest(friendID) {
    try {
        const currentUser = auth().currentUser;
        if (!currentUser) {
            throw new Error('User not authenticated');
        }

        const currentUserID = currentUser.uid;
        
        // Get current user document
        const currentUserRef = firestore().collection('users').doc(currentUserID);
        const currentUserDoc = await currentUserRef.get();
        
        if (!currentUserDoc.exists) {
            throw new Error('Current user not found');
        }

        const currentUserData = currentUserDoc.data();
        const currentReceivedRequests = currentUserData.friend_requests_received || [];
        const currentFriends = currentUserData.friends || [];

        // Check if the request exists
        if (!currentReceivedRequests.includes(friendID)) {
            return {
                success: false,
                error: 'Friend request not found'
            };
        }

        // Remove friend ID from current user's friend_requests_received array
        // and add to friends array
        const updatedReceivedRequests = currentReceivedRequests.filter(id => id !== friendID);
        const updatedFriends = [...currentFriends, friendID];

        await currentUserRef.update({
            friend_requests_received: updatedReceivedRequests,
            friends: updatedFriends
        });

        // Get friend document
        const friendRef = firestore().collection('users').doc(friendID);
        const friendDoc = await friendRef.get();
        
        if (friendDoc.exists) {
            const friendData = friendDoc.data();
            const friendSentRequests = friendData.friend_requests_sent || [];
            const friendFriends = friendData.friends || [];

            // Remove current user ID from friend's friend_requests_sent array
            // and add to their friends array
            const updatedFriendSentRequests = friendSentRequests.filter(id => id !== currentUserID);
            const updatedFriendFriends = [...friendFriends, currentUserID];

            await friendRef.update({
                friend_requests_sent: updatedFriendSentRequests,
                friends: updatedFriendFriends
            });
        }

        return {
            success: true,
            message: 'Friend request accepted successfully'
        };
    } catch (error) {
        console.error('Error accepting friend request:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Decline a friend request from another user
 * @param {string} friendID - The ID of the user who sent the request
 * @returns {Promise<Object>} - Result of the operation
 */
async function declineFriendRequest(friendID) {
    try {
        const currentUser = auth().currentUser;
        if (!currentUser) {
            throw new Error('User not authenticated');
        }

        const currentUserID = currentUser.uid;
        
        // Get current user document
        const currentUserRef = firestore().collection('users').doc(currentUserID);
        const currentUserDoc = await currentUserRef.get();
        
        if (!currentUserDoc.exists) {
            throw new Error('Current user not found');
        }

        const currentUserData = currentUserDoc.data();
        const currentReceivedRequests = currentUserData.friend_requests_received || [];

        // Remove friend ID from current user's friend_requests_received array
        const updatedReceivedRequests = currentReceivedRequests.filter(id => id !== friendID);

        await currentUserRef.update({
            friend_requests_received: updatedReceivedRequests
        });

        // Get friend document
        const friendRef = firestore().collection('users').doc(friendID);
        const friendDoc = await friendRef.get();
        
        if (friendDoc.exists) {
            const friendData = friendDoc.data();
            const friendSentRequests = friendData.friend_requests_sent || [];

            // Remove current user ID from friend's friend_requests_sent array
            const updatedFriendSentRequests = friendSentRequests.filter(id => id !== currentUserID);

            await friendRef.update({
                friend_requests_sent: updatedFriendSentRequests
            });
        }

        return {
            success: true,
            message: 'Friend request declined successfully'
        };
    } catch (error) {
        console.error('Error declining friend request:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Get incoming friend requests for the current user
 * @returns {Promise<Array>} - Array of user IDs who sent friend requests
 */
async function getIncomingFriendRequests() {
    try {
        const currentUser = auth().currentUser;
        if (!currentUser) {
            throw new Error('User not authenticated');
        }

        const currentUserID = currentUser.uid;
        const userDoc = await firestore().collection('users').doc(currentUserID).get();
        
        if (!userDoc.exists) {
            return [];
        }

        const userData = userDoc.data();
        return userData.friend_requests_received || [];
    } catch (error) {
        console.error('Error getting incoming friend requests:', error);
        return [];
    }
}

/**
 * Get outgoing friend requests sent by the current user
 * @returns {Promise<Array>} - Array of user IDs to whom requests were sent
 */
async function getOutgoingFriendRequests() {
    try {
        const currentUser = auth().currentUser;
        if (!currentUser) {
            throw new Error('User not authenticated');
        }

        const currentUserID = currentUser.uid;
        const userDoc = await firestore().collection('users').doc(currentUserID).get();
        
        if (!userDoc.exists) {
            return [];
        }

        const userData = userDoc.data();
        return userData.friend_requests_sent || [];
    } catch (error) {
        console.error('Error getting outgoing friend requests:', error);
        return [];
    }
}

export { 
    requestFriend, 
    acceptFriendRequest, 
    declineFriendRequest, 
    getIncomingFriendRequests, 
    getOutgoingFriendRequests 
};