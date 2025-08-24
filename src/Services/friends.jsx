import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/**
 * Get user data by ID
 * @param {string} userId - The user ID to fetch
 * @returns {Promise<Object|null>} - User data or null if not found
 */
async function getUserData(userId) {
    try {
        const userDoc = await firestore().collection('users').doc(userId).get();
        if (userDoc.exists) {
            return { id: userDoc.id, ...userDoc.data() };
        }
        return null;
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
}

/**
 * Get all users (excluding current user, current friends, and users who have sent requests to current user)
 * @returns {Promise<Array>} - Array of user objects
 */
async function getAllUsers() {
    try {
        const currentUser = auth().currentUser;
        if (!currentUser) {
            throw new Error('User not authenticated');
        }

        const currentUserID = currentUser.uid;
        
        // Get current user's friends list and incoming requests
        const currentUserDoc = await firestore().collection('users').doc(currentUserID).get();
        const currentUserFriends = currentUserDoc.exists ? (currentUserDoc.data().friends || []) : [];
        const currentUserIncomingRequests = currentUserDoc.exists ? (currentUserDoc.data().friend_requests_received || []) : [];
        
        // Get all users
        const usersSnapshot = await firestore().collection('users').get();
        const users = [];
        
        usersSnapshot.forEach(doc => {
            const userData = doc.data();
            // Exclude current user, existing friends, and users who have sent requests to current user
            if (doc.id !== currentUserID && 
                !currentUserFriends.includes(doc.id) && 
                !currentUserIncomingRequests.includes(doc.id)) {
                users.push({
                    id: doc.id,
                    name: userData.first_name && userData.last_name 
                        ? `${userData.first_name} ${userData.last_name}` 
                        : userData.handle || userData.email,
                    email: userData.email,
                    imageURL: userData.profile_pic || 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg',
                    connectycube_id: userData.connectycube_id
                });
            }
        });
        
        return users;
    } catch (error) {
        console.error('Error getting all users:', error);
        return [];
    }
}

/**
 * Get current user's friends with full user data
 * @returns {Promise<Array>} - Array of friend user objects
 */
async function getCurrentUserFriends() {
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
        const friendIds = userData.friends || [];
        
        // Get full user data for each friend
        const friends = [];
        for (const friendId of friendIds) {
            const friendData = await getUserData(friendId);
            if (friendData) {
                friends.push({
                    id: friendData.id,
                    name: friendData.first_name && friendData.last_name 
                        ? `${friendData.first_name} ${friendData.last_name}` 
                        : friendData.handle || friendData.email,
                    email: friendData.email,
                    imageURL: friendData.profile_pic || 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg',
                    connectycube_id: friendData.connectycube_id
                });
            }
        }
        
        return friends;
    } catch (error) {
        console.error('Error getting current user friends:', error);
        return [];
    }
}

/**
 * Get incoming friend requests with full user data
 * @returns {Promise<Array>} - Array of user objects who sent requests
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
        const requestIds = userData.friend_requests_received || [];
        
        // Get full user data for each request
        const requests = [];
        for (const requestId of requestIds) {
            const userData = await getUserData(requestId);
            if (userData) {
                requests.push({
                    id: userData.id,
                    name: userData.first_name && userData.last_name 
                        ? `${userData.first_name} ${userData.last_name}` 
                        : userData.handle || userData.email,
                    email: userData.email,
                    imageURL: userData.profile_pic || 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'
                });
            }
        }
        
        return requests;
    } catch (error) {
        console.error('Error getting incoming friend requests:', error);
        return [];
    }
}

/**
 * Get outgoing friend requests with full user data
 * @returns {Promise<Array>} - Array of user objects to whom requests were sent
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
        const requestIds = userData.friend_requests_sent || [];
        
        // Get full user data for each request
        const requests = [];
        for (const requestId of requestIds) {
            const userData = await getUserData(requestId);
            if (userData) {
                requests.push({
                    id: userData.id,
                    name: userData.first_name && userData.last_name 
                        ? `${userData.first_name} ${userData.last_name}` 
                        : userData.handle || userData.email,
                    email: userData.email,
                    imageURL: userData.profile_pic || 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'
                });
            }
        }
        
        return requests;
    } catch (error) {
        console.error('Error getting outgoing friend requests:', error);
        return [];
    }
}

/**
 * Send a friend request to another user
 * @param {string} friendID - The ID of the user to send request to
 * @returns {Promise<Object>} - Result object with success status
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

        // Add current user ID to friend's friend_requests_received array
        const friendData = friendDoc.data();
        const currentRequests = friendData.friend_requests_received || [];
        
        // Check if request already exists
        if (currentRequests.includes(currentUserID)) {
            return {
                success: false,
                error: 'Friend request already sent'
            };
        }

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
 * @param {string} friendID - The ID of the user whose request to accept
 * @returns {Promise<Object>} - Result object with success status
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

        // Remove friend ID from current user's friend_requests_received array
        // and add to friends array
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
 * @param {string} friendID - The ID of the user whose request to decline
 * @returns {Promise<Object>} - Result object with success status
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

        // Remove friend ID from current user's friend_requests_received array
        const currentUserData = currentUserDoc.data();
        const currentReceivedRequests = currentUserData.friend_requests_received || [];

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
 * Cancel/remove a friend request that was sent to another user
 * @param {string} friendID - The ID of the user whose request to cancel
 * @returns {Promise<Object>} - Result object with success status
 */
async function cancelFriendRequest(friendID) {
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

        // Remove friend ID from current user's friend_requests_sent array
        const currentUserData = currentUserDoc.data();
        const currentSentRequests = currentUserData.friend_requests_sent || [];

        // Check if the request exists
        if (!currentSentRequests.includes(friendID)) {
            return {
                success: false,
                error: 'Friend request not found'
            };
        }

        const updatedSentRequests = currentSentRequests.filter(id => id !== friendID);

        await currentUserRef.update({
            friend_requests_sent: updatedSentRequests
        });

        // Get friend document
        const friendRef = firestore().collection('users').doc(friendID);
        const friendDoc = await friendRef.get();
        
        if (friendDoc.exists) {
            const friendData = friendDoc.data();
            const friendReceivedRequests = friendData.friend_requests_received || [];

            // Remove current user ID from friend's friend_requests_received array
            const updatedFriendReceivedRequests = friendReceivedRequests.filter(id => id !== currentUserID);

            await friendRef.update({
                friend_requests_received: updatedFriendReceivedRequests
            });
        }

        return {
            success: true,
            message: 'Friend request cancelled successfully'
        };
    } catch (error) {
        console.error('Error cancelling friend request:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

export { 
    requestFriend, 
    acceptFriendRequest, 
    declineFriendRequest, 
    cancelFriendRequest,
    getIncomingFriendRequests, 
    getOutgoingFriendRequests,
    getCurrentUserFriends,
    getAllUsers,
    getUserData
};