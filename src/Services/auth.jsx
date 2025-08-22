import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { initConnectyCube, authenticateChatUser } from './messaging';

// Helper function to create user profile if it doesn't exist
async function ensureUserProfile(userId, email) {
    try {
        const userDoc = await firestore().collection('users').doc(userId).get();
        
        // Check if document exists AND has all required fields
        const hasAllFields = userDoc.exists && userDoc.data() && 
            userDoc.data().connectycube_id !== undefined &&
            userDoc.data().friends !== undefined &&
            userDoc.data().friend_requests_received !== undefined &&
            userDoc.data().friend_requests_sent !== undefined &&
            userDoc.data().groups !== undefined &&
            userDoc.data().interests !== undefined &&
            userDoc.data().dietary_preferences !== undefined &&
            userDoc.data().places !== undefined &&
            userDoc.data().availability !== undefined;
        
        if (!userDoc.exists || !hasAllFields) {
            // Get ConnectyCube ID first
            let user = await initConnectyCube();
            let chatUser = await authenticateChatUser(user);
            
            // Create or update user profile with all required fields
            await firestore().collection('users').doc(userId).set({
                uid: userId,
                email: email,
                first_name: userDoc.exists ? (userDoc.data().first_name || '') : '',
                last_name: userDoc.exists ? (userDoc.data().last_name || '') : '',
                handle: userDoc.exists ? (userDoc.data().handle || email.split('@')[0]) : email.split('@')[0],
                media_ref: userDoc.exists ? (userDoc.data().media_ref || '') : '',
                friends: userDoc.exists ? (userDoc.data().friends || []) : [],
                friend_requests_received: userDoc.exists ? (userDoc.data().friend_requests_received || []) : [],
                friend_requests_sent: userDoc.exists ? (userDoc.data().friend_requests_sent || []) : [],
                groups: userDoc.exists ? (userDoc.data().groups || []) : [],
                interests: userDoc.exists ? (userDoc.data().interests || []) : [],
                dietary_preferences: userDoc.exists ? (userDoc.data().dietary_preferences || []) : [],
                places: userDoc.exists ? (userDoc.data().places || []) : [],
                availability: userDoc.exists ? (userDoc.data().availability || []) : [],
                diary_manager: userDoc.exists ? (userDoc.data().diary_manager || '') : '',
                connectycube_id: chatUser || null
            }, { merge: true }); // Use merge to preserve existing data
        }
    } catch (error) {
        console.error('Error ensuring user profile:', error);
    }
}

// Sign up function
export async function signUp(email, password) {
    try {
        // Create Firebase Auth user
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Get ConnectyCube ID
        let connectyCubeUser = await initConnectyCube();
        let chatUser = await authenticateChatUser(connectyCubeUser);
        
        // Create user profile in Firestore
        await firestore().collection('users').doc(user.uid).set({
            uid: user.uid,
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
            diary_manager: '',
            connectycube_id: chatUser || null
        });
        
        return { success: true, user: user };
    } catch (error) {
        console.error('Error during sign up:', error);
        return { success: false, error: error.message };
    }
}

// Sign in function
export async function signIn(email, password) {
    try {
        // Sign in with Firebase Auth
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Ensure user profile exists in Firestore
        await ensureUserProfile(user.uid, email);
        
        return { success: true, user: user };
    } catch (error) {
        console.error('Error during sign in:', error);
        return { success: false, error: error.message };
    }
}

// Sign out function
export async function signOut() {
    try {
        await auth().signOut();
        return { success: true };
    } catch (error) {
        console.error('Error during sign out:', error);
        return { success: false, error: error.message };
    }
}