import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { initConnectyCube, authenticateChatUser } from './messaging';
import ConnectyCube from 'react-native-connectycube';
// Note: Google Sign-In is now handled through Firebase Auth directly
// This avoids compatibility issues with the Google Sign-In package

// Function to generate a unique handle from first and last name
// Examples: "johnsmith", "johnsmith_1", "johnsmith_2", etc.
async function generateUniqueHandle(firstName, lastName) {
    // Create base handle from name (lowercase, no special characters)
    const baseHandle = `${firstName.toLowerCase()}${lastName.toLowerCase()}`.replace(/[^a-z0-9]/g, '');
    
    // Check if base handle exists
    let handle = baseHandle;
    let counter = 1;
    
    while (true) {
        const handleQuery = await firestore()
            .collection('users')
            .where('handle', '==', handle)
            .limit(1)
            .get();
        
        if (handleQuery.empty) {
            // Handle is unique, return it
            return handle;
        }
        
        // Handle exists, try with number suffix
        handle = `${baseHandle}_${counter}`;
        counter++;
        
        // Safety check to prevent infinite loop
        if (counter > 1000) {
            // Fallback to timestamp-based handle
            return `${baseHandle}_${Date.now()}`;
        }
    }
}

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
            
            // Get existing user data or use defaults
            const existingData = userDoc.exists ? userDoc.data() : {};
            const firstName = existingData.first_name || '';
            const lastName = existingData.last_name || '';
            
            // Generate proper handle if user doesn't have one or has email-based handle
            let handle = existingData.handle;
            if (!handle || handle === email.split('@')[0]) {
                if (firstName && lastName) {
                    handle = await generateUniqueHandle(firstName, lastName);
                } else {
                    handle = email.split('@')[0]; // Fallback to email if no name
                }
            }
            
            // Create or update user profile with all required fields
            await firestore().collection('users').doc(userId).set({
                uid: userId,
                email: email,
                first_name: firstName,
                last_name: lastName,
                handle: handle,
                media_ref: existingData.media_ref || '',
                friends: existingData.friends || [],
                friend_requests_received: existingData.friend_requests_received || [],
                friend_requests_sent: existingData.friend_requests_sent || [],
                groups: existingData.groups || [],
                interests: existingData.interests || [],
                dietary_preferences: existingData.dietary_preferences || [],
                places: existingData.places || [],
                availability: existingData.availability || [],
                diary_manager: existingData.diary_manager || '',
                connectycube_id: chatUser || null
            }, { merge: true }); // Use merge to preserve existing data
            

        }
    } catch (error) {
        console.error('Error ensuring user profile:', error);
    }
}

// Sign up function
export async function signUp(email, password, name = '', dateOfBirth = null) {
    try {
        // Create Firebase Auth user
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Get ConnectyCube ID
        let connectyCubeUser = await initConnectyCube();
        let chatUser = await authenticateChatUser(connectyCubeUser);
        
        // Parse name into first and last name
        const nameParts = name.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        // Generate unique handle from name
        const handle = await generateUniqueHandle(firstName, lastName);
        
        // Create user profile in Firestore
        await firestore().collection('users').doc(user.uid).set({
            uid: user.uid,
            email: email,
            first_name: firstName,
            last_name: lastName,
            handle: handle,
            date_of_birth: dateOfBirth ? dateOfBirth.toISOString() : null,
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
        
        // Update ConnectyCube user profile with the actual name
        if (chatUser && (firstName || lastName)) {
            try {
                const fullName = `${firstName} ${lastName}`.trim();
                await ConnectyCube.users.update({
                    id: chatUser,
                    full_name: fullName,
                    email: email,
                });
                console.log('✅ ConnectyCube user profile updated with name:', fullName);
            } catch (error) {
                console.warn('⚠️ Could not update ConnectyCube profile:', error);
            }
        }
        
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
        // Sign out from Firebase (this will also sign out from Google)
        await auth().signOut();
        return { success: true };
    } catch (error) {
        console.error('Error during sign out:', error);
        return { success: false, error: error.message };
    }
}

// Check if user is signed in with Google (through Firebase)
export async function isSignedInWithGoogle() {
    try {
        const currentUser = auth().currentUser;
        if (currentUser) {
            // Check if the user has Google provider
            const providers = currentUser.providerData;
            return providers.some(provider => provider.providerId === 'google.com');
        }
        return false;
    } catch (error) {
        console.error('Error checking Google sign-in status:', error);
        return false;
    }
}

// Get current Google user info (through Firebase)
export async function getCurrentGoogleUser() {
    try {
        const currentUser = auth().currentUser;
        if (currentUser) {
            // Check if the user has Google provider
            const providers = currentUser.providerData;
            const googleProvider = providers.find(provider => provider.providerId === 'google.com');
            return googleProvider || null;
        }
        return null;
    } catch (error) {
        console.error('Error getting current Google user:', error);
        return null;
    }
}

// Link existing email/password account with Google
export async function linkAccountWithGoogle(email, password) {
    try {
        // For React Native, we need to use a different approach
        // Since GoogleAuthProvider constructor isn't available, we'll use a web-based approach
        // or implement a simpler Google Sign-In flow
        
        // For now, let's show a message that this needs to be implemented differently
        throw new Error('Account linking with Google needs to be implemented using a different method for React Native.');
        
        // TODO: Implement proper React Native Google Sign-In
        // Options:
        // 1. Use @react-native-google-signin/google-signin (but fix the linking issues)
        // 2. Use a web-based approach with react-native-webview
        // 3. Use Firebase's native Google Sign-In (requires additional setup)
        
    } catch (error) {
        console.error('Error linking account with Google:', error);
        return { success: false, error: 'Account linking with Google is not yet implemented for React Native.' };
    }
}

// Google Sign-In function using React Native Firebase
export async function signInWithGoogle() {
    try {
        // For React Native, we need to use a different approach
        // Since GoogleAuthProvider constructor isn't available, we'll use a web-based approach
        // or implement a simpler Google Sign-In flow
        
        // For now, let's show a message that this needs to be implemented differently
        throw new Error('Google Sign-In needs to be implemented using a different method for React Native. Please use the web version or implement native Google Sign-In.');
        
        // TODO: Implement proper React Native Google Sign-In
        // Options:
        // 1. Use @react-native-google-signin/google-signin (but fix the linking issues)
        // 2. Use a web-based approach with react-native-webview
        // 3. Use Firebase's native Google Sign-In (requires additional setup)
        
    } catch (error) {
        console.error('Error during Google sign in:', error);
        
        let errorMessage = 'Google sign in is not yet implemented for React Native. Please use email/password sign in for now.';
        
        return { success: false, error: errorMessage };
    }
}

// Google Sign-Up function using React Native Firebase
export async function signUpWithGoogle() {
    try {
        // For React Native, we need to use a different approach
        // Since GoogleAuthProvider constructor isn't available, we'll use a web-based approach
        // or implement a simpler Google Sign-In flow
        
        // For now, let's show a message that this needs to be implemented differently
        throw new Error('Google Sign-Up needs to be implemented using a different method for React Native. Please use email/password sign up for now.');
        
        // TODO: Implement proper React Native Google Sign-In
        // Options:
        // 1. Use @react-native-google-signin/google-signin (but fix the linking issues)
        // 2. Use a web-based approach with react-native-webview
        // 3. Use Firebase's native Google Sign-In (requires additional setup)
        
    } catch (error) {
        console.error('Error during Google sign up:', error);
        
        let errorMessage = 'Google sign up is not yet implemented for React Native. Please use email/password sign up for now.';
        
        return { success: false, error: errorMessage };
    }
}