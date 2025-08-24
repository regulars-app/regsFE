import auth, { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { initConnectyCube, authenticateChatUser } from './messaging';
import ConnectyCube from 'react-native-connectycube';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { uploadMediaToStorage } from './media';

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
                profile_pic: existingData.profile_pic || '',
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
            
            console.log('✅ User profile ensured with ConnectyCube ID:', chatUser);
        } else {
            console.log('✅ User profile already exists with all fields');
        }
    } catch (error) {
        console.error('Error ensuring user profile:', error);
    }
}

// Sign up function
export async function signUp(email, password, name = '', dateOfBirth = null, profilePicture = null) {
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
        
        // Upload profile picture if provided (after user is authenticated)
        let mediaRef = '';
        if (profilePicture && profilePicture.uri) {
            try {
                // Ensure user is properly authenticated before upload
                const currentUser = auth().currentUser;
                if (!currentUser) {
                    throw new Error('User not authenticated');
                }
                
                // Get fresh ID token to ensure authentication
                await currentUser.getIdToken(true);
                
                // Upload to dedicated profile_pics folder
                const uploadResult = await uploadMediaToStorage(
                    profilePicture.uri, 
                    `profile_pics`, 
                    `${user.uid}_`
                );
                if (uploadResult.success) {
                    mediaRef = uploadResult.downloadUrl;
                } else {
                    console.warn('⚠️ Profile picture upload failed:', uploadResult.error);
                }
            } catch (error) {
                console.warn('⚠️ Profile picture upload failed:', error);
            }
        }
        
        // Create user profile in Firestore
        await firestore().collection('users').doc(user.uid).set({
            uid: user.uid,
            email: email,
            first_name: firstName,
            last_name: lastName,
            handle: handle,
            date_of_birth: dateOfBirth ? dateOfBirth.toISOString() : null,
            profile_pic: mediaRef, // Now contains Firebase Storage download URL
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

// Function to link existing email/password account with Google
export async function linkAccountWithGoogle(email, password) {
    try {
        // First, sign in with email/password to get the user
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Configure Google Sign-In
        GoogleSignin.configure({
            webClientId: '21743597469-nm0196ga0ppujl54ql1ldvotui7vmga2.apps.googleusercontent.com',
        });
        
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        
        // Get the users ID token
        const signInResult = await GoogleSignin.signIn();
        
        // Get ID token (handle both new and old versions)
        let idToken = signInResult.data?.idToken || signInResult.idToken;
        if (!idToken) {
            throw new Error('No ID token found');
        }
        
        // Create a Google credential with the token
        const googleCredential = GoogleAuthProvider.credential(idToken);
        
        // Link the accounts
        const linkResult = await user.linkWithCredential(googleCredential);
        
        // Update the user profile with Google info
        const displayName = linkResult.user.displayName || '';
        const nameParts = displayName.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        if (firstName || lastName) {
            // Update Firestore with Google name and profile picture
            const updateData = {
                first_name: firstName,
                last_name: lastName,
            };
            
            // Add profile picture if Google provides one
            if (linkResult.user.photoURL) {
                updateData.profile_pic = linkResult.user.photoURL;
            }
            
            await firestore().collection('users').doc(user.uid).update(updateData);
            
            // Update ConnectyCube profile if available
            const userDoc = await firestore().collection('users').doc(user.uid).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                if (userData.connectycube_id) {
                    const fullName = `${firstName} ${lastName}`.trim();
                    await ConnectyCube.users.update({
                        id: userData.connectycube_id,
                        full_name: fullName,
                        email: user.email,
                    });
                }
            }
        }
        
        return { success: true, user: user };
    } catch (error) {
        console.error('Error linking account with Google:', error);
        
        let errorMessage = 'Account linking failed';
        if (error.code === 'auth/credential-already-in-use') {
            errorMessage = 'This Google account is already linked to another user.';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        return { success: false, error: errorMessage };
    }
}

export async function googleSignIn() {
    try {
        GoogleSignin.configure({
            webClientId: '21743597469-nm0196ga0ppujl54ql1ldvotui7vmga2.apps.googleusercontent.com',
        });

        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        
        // Get the users ID token
        const signInResult = await GoogleSignin.signIn();
      
        // Get ID token (handle both new and old versions)
        let idToken = signInResult.data?.idToken || signInResult.idToken;
        if (!idToken) {
            throw new Error('No ID token found');
        }
      
        // Create a Google credential with the token
        const googleCredential = GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        const userCredential = await signInWithCredential(getAuth(), googleCredential);
        const user = userCredential.user;
        
        // Check if this is a new user
        const isNewUser = userCredential.additionalUserInfo?.isNewUser;
        
        if (isNewUser) {
            // This is a new user, create their profile
            const displayName = user.displayName || '';
            const nameParts = displayName.trim().split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';
            
            console.log('🔍 Creating new Google user profile:', { firstName, lastName, email: user.email });
            
            // Generate unique handle from Google name
            const handle = await generateUniqueHandle(firstName, lastName);
            console.log('🔍 Generated handle:', handle);
            
            // Get ConnectyCube ID first (before creating Firestore profile)
            console.log('🔍 Creating ConnectyCube user...');
            let connectyCubeUser = await initConnectyCube();
            let chatUser = await authenticateChatUser(connectyCubeUser);
            console.log('✅ ConnectyCube user created with ID:', chatUser);
            
            // Create user profile in Firestore with ConnectyCube ID
            await firestore().collection('users').doc(user.uid).set({
                uid: user.uid,
                email: user.email,
                first_name: firstName,
                last_name: lastName,
                handle: handle,
                date_of_birth: null, // Google doesn't provide DOB
                profile_pic: user.photoURL || '', // Use Google profile picture if available
                friends: [],
                friend_requests_received: [],
                friend_requests_sent: [],
                groups: [],
                interests: [],
                dietary_preferences: [],
                places: [],
                availability: [],
                diary_manager: '',
                connectycube_id: chatUser // Set ConnectyCube ID directly
            });
            
            console.log('✅ Firestore profile created for new Google user with ConnectyCube ID');
            
            // Update ConnectyCube profile with Google name
            try {
                const fullName = `${firstName} ${lastName}`.trim();
                await ConnectyCube.users.update({
                    id: chatUser,
                    full_name: fullName,
                    email: user.email,
                });
                console.log('✅ ConnectyCube profile updated with Google name:', fullName);
            } catch (error) {
                console.warn('⚠️ Could not update ConnectyCube profile with Google name:', error);
            }
        } else {
            // Existing user, just ensure profile exists
            await ensureUserProfile(user.uid, user.email);
            
            // For existing Google users, also ensure ConnectyCube profile is updated
            try {
                const userDoc = await firestore().collection('users').doc(user.uid).get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    if (userData.connectycube_id) {
                        const displayName = user.displayName || '';
                        const nameParts = displayName.trim().split(' ');
                        const firstName = nameParts[0] || '';
                        const lastName = nameParts.slice(1).join(' ') || '';
                        
                        if (firstName || lastName) {
                            const fullName = `${firstName} ${lastName}`.trim();
                            await ConnectyCube.users.update({
                                id: userData.connectycube_id,
                                full_name: fullName,
                                email: user.email,
                            });
                            console.log('✅ ConnectyCube profile updated for existing Google user:', fullName);
                        }
                        
                        // Update profile picture if Google provides one and user doesn't have one
                        if (user.photoURL && (!userData.profile_pic || userData.profile_pic === '')) {
                            await firestore().collection('users').doc(user.uid).update({
                                profile_pic: user.photoURL
                            });
                            console.log('✅ Profile picture updated with Google photo for existing user');
                        }
                    }
                }
            } catch (error) {
                console.warn('⚠️ Could not update ConnectyCube profile for existing Google user:', error);
            }
        }
        
        return { success: true, user: user, isNewUser: isNewUser };
        
    } catch (error) {
        console.error('Error during Google sign in:', error);
        
        let errorMessage = 'Google sign in failed';
        if (error.code === 'auth/account-exists-with-different-credential') {
            errorMessage = 'An account with this email already exists. Please sign in with your password first, then link your Google account.';
        } else if (error.code === 'auth/popup-closed-by-user') {
            errorMessage = 'Sign in was cancelled';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        return { success: false, error: errorMessage };
    }
}

