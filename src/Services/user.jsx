import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

/**
 * Load the current user's profile picture from Firestore or Google
 * @returns {Promise<string>} The profile picture URL or default placeholder
 */
export async function loadUserProfilePic() {
    try {
        const currentUser = auth().currentUser;
        if (currentUser) {
            // First check if user has a custom profile picture in Firestore
            const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                if (userData.profile_pic && userData.profile_pic !== '') {
                    return userData.profile_pic;
                }
            }
            
            // If no custom profile picture, check if Google provides one
            if (currentUser.photoURL && currentUser.photoURL !== '') {
                return currentUser.photoURL;
            }
        }
        // Return default placeholder if no profile picture found
        return 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg';
    } catch (error) {
        console.error('Error loading user profile picture:', error);
        // Return default placeholder on error
        return 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg';
    }
}

/**
 * Get current user's basic profile data
 * @returns {Promise<Object|null>} User profile data or null if not found
 */
export async function getCurrentUserProfile() {
    try {
        const currentUser = auth().currentUser;
        if (currentUser) {
            const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
            if (userDoc.exists) {
                return userDoc.data();
            }
        }
        return null;
    } catch (error) {
        console.error('Error loading user profile:', error);
        return null;
    }
}

/**
 * Update user profile data
 * @param {Object} updateData - Data to update
 * @returns {Promise<boolean>} Success status
 */
export async function updateUserProfile(updateData) {
    try {
        const currentUser = auth().currentUser;
        if (currentUser) {
            await firestore().collection('users').doc(currentUser.uid).update(updateData);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error updating user profile:', error);
        return false;
    }
}

/**
 * Get a user's profile picture by their Firebase UID
 * @param {string} userId - The Firebase UID of the user
 * @returns {Promise<string>} The profile picture URL or null if not found
 */
export async function getUserProfilePicById(userId) {
    try {
        const userDoc = await firestore().collection('users').doc(userId).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            if (userData.profile_pic && userData.profile_pic !== '') {
                return userData.profile_pic;
            }
        }
        return null;
    } catch (error) {
        console.error('Error loading user profile picture by ID:', error);
        return null;
    }
}
