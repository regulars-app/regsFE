import firestore from '@react-native-firebase/firestore';
import { createGroupChat } from './messaging';
import auth from '@react-native-firebase/auth';

async function createGroup(name, memberIds, description, photo, chat_type) {
    try {
        // 1. Get ConnectyCube IDs for all members
        const connectycubeIds = [];
        const currentUserId = auth().currentUser?.uid;
        
        // Add current user if not already included
        if (currentUserId && !memberIds.includes(currentUserId)) {
            memberIds.push(currentUserId);
        }
        
        // Get ConnectyCube IDs for all members
        for (const memberId of memberIds) {
            const userDoc = await firestore().collection('users').doc(memberId).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                if (userData.connectycube_id) {
                    connectycubeIds.push(userData.connectycube_id);
                } else {
                    console.warn(`User ${memberId} has no ConnectyCube ID`);
                }
            }
        }
        
        if (connectycubeIds.length === 0) {
            throw new Error('No valid ConnectyCube IDs found for group members');
        }
        
        // 2. Create ConnectyCube group chat
        const groupChat = await createGroupChat(name, connectycubeIds, description, photo, chat_type);
        
        // 3. Create group document in Firestore
        const groupData = {
            name: name,
            members: memberIds, // Array of Firebase UIDs for database storage
            places: [], // Empty array initially
            challenge: null, // No challenge initially
            album: null, // No album initially
            chat: groupChat._id, // ConnectyCube chat ID
            created_by: currentUserId,
            created_at: new Date(),
            updated_at: new Date()
        };
        
        // Add group to Firestore
        const groupRef = await firestore().collection('groups').add(groupData);
        const groupId = groupRef.id;
        
        // 4. Update all member users' documents to include this group
        const batch = firestore().batch();
        
        // Update each user's groups array
        for (const userId of memberIds) {
            const userRef = firestore().collection('users').doc(userId);
            batch.update(userRef, {
                groups: firestore.FieldValue.arrayUnion(groupId)
            });
        }
        
        // Commit all updates
        await batch.commit();
        
        // 5. Return the complete group data
        return {
            success: true,
            groupId: groupId,
            groupData: groupData,
            groupChat: groupChat
        };
        
    } catch (error) {
        console.error('Error creating group:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Get current user's groups
async function getCurrentUserGroups() {
    try {
        const currentUserId = auth().currentUser?.uid;
        if (!currentUserId) {
            throw new Error('User not authenticated');
        }

        // Get user document to find their groups
        const userDoc = await firestore().collection('users').doc(currentUserId).get();
        if (!userDoc.exists) {
            return [];
        }

        const userData = userDoc.data();
        const groupIds = userData.groups || [];

        if (groupIds.length === 0) {
            return [];
        }

        // Fetch all group documents
        const groups = [];
        for (const groupId of groupIds) {
            const groupDoc = await firestore().collection('groups').doc(groupId).get();
            if (groupDoc.exists) {
                const groupData = groupDoc.data();
                groups.push({
                    id: groupId,
                    name: groupData.name,
                    members: groupData.members || [],
                    created_by: groupData.created_by,
                    created_at: groupData.created_at,
                    chat: groupData.chat
                });
            }
        }

        return groups;
    } catch (error) {
        console.error('Error getting current user groups:', error);
        return [];
    }
}

export { createGroup, getCurrentUserGroups };
