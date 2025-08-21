import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { initConnectyCube, authenticateChatUser } from './messaging';
import ConnectyCube from 'react-native-connectycube';

// Helper function to create user profile if it doesn't exist
async function ensureUserProfile(userId, email) {
    try {
        const userDoc = await firestore().collection('users').doc(userId).get();
        
        // Check if document exists AND has data
        const hasData = userDoc.exists && userDoc.data() && Object.keys(userDoc.data()).length > 0;
        
        if (!userDoc.exists || !hasData) {
            // Create user profile if it doesn't exist or is empty
            await firestore().collection('users').doc(userId).set({
                uid: userId,
                email: email,
                first_name: '',
                last_name: '',
                handle: email.split('@')[0],
                media_ref: '',
                friends: [],
                friend_requests_received: [],
                friend_requests_sent: [],
                groups: [],
                interests: [],
                dietary_preferences: [],
                places: [],
                availability: [],
                diary_manager: ''
            });
        }
    } catch (error) {
        console.error('Error ensuring user profile:', error);
    }
}

async function signUp(email, password) {
    let authUser = await auth().createUserWithEmailAndPassword(email, password);
    
    // Create user profile in Firestore
    try {
        await firestore().collection('users').doc(authUser.user.uid).set({
            uid: authUser.user.uid,
            email: email,
            first_name: '',
            last_name: '',
            handle: email.split('@')[0],
            media_ref: '',
            friends: [],
            friend_requests_received: [],
            friend_requests_sent: [],
            groups: [],
            interests: [],
            dietary_preferences: [],
            places: [],
            availability: [],
            diary_manager: ''
        });
    } catch (error) {
        console.error('Error creating user profile:', error);
    }
    
    let user = await initConnectyCube();
    let chatUser = await authenticateChatUser(user);
    return authUser;
}

async function signIn(email, password) {
    let authUser = await auth().signInWithEmailAndPassword(email, password);
    
    // Ensure user profile exists in Firestore
    await ensureUserProfile(authUser.user.uid, email);
    
    let user = await initConnectyCube();
    let chatUser = await authenticateChatUser(user);
    return authUser;
}

async function signOut() {
    await auth().signOut();
    await ConnectyCube.auth.logout();
}

export { signUp, signIn, signOut };