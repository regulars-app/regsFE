import firestore from '@react-native-firebase/firestore';
import { createGroupChat, createDirectChat } from './messaging';
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
        
        if (!groupChat || !groupChat._id) {
            throw new Error('Failed to create group chat - invalid result returned');
        }
        
        // 3. Create direct chats between all members
        const directChats = {};
        
        for (let i = 0; i < connectycubeIds.length; i++) {
            for (let j = i + 1; j < connectycubeIds.length; j++) {
                const user1 = connectycubeIds[i];
                const user2 = connectycubeIds[j];
                const chatKey = [user1, user2].sort().join('_'); // Consistent key
                
                try {
                    const directChat = await createDirectChat(user1, user2);
                    if (directChat && directChat._id) {
                        directChats[chatKey] = directChat._id;
                    } else {
                        console.warn('⚠️ Direct chat creation returned invalid result:', directChat);
                        // Skip this direct chat if it failed
                        continue;
                    }
                } catch (error) {
                    console.error(`❌ Error creating direct chat between ${user1} and ${user2}:`, error);
                    // Continue with other direct chats
                    continue;
                }
            }
        }
        
        // 4. Create group document in Firestore
        const groupData = {
            name: name,
            members: memberIds, // Array of Firebase UIDs for database storage
            places: [], // Empty array initially
            challenge: null, // No challenge initially
            album: null, // No album initially
            chat: groupChat._id, // ConnectyCube chat ID
            directChats: directChats, // Store direct chat IDs
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

// Load group data for chat
async function loadGroupDataForChat(groupId) {
    try {
        console.log('🔍 Loading group data for chat, groupId:', groupId);
        
        // Load actual group data from Firestore
        const groupDoc = await firestore().collection('groups').doc(groupId).get();
        
        if (!groupDoc.exists) {
            throw new Error(`Group with ID ${groupId} not found`);
        }
        
        const groupData = groupDoc.data();
        console.log('✅ Group data loaded:', groupData);
        console.log('🔍 ConnectyCube chat ID:', groupData.chat);
        console.log('🔍 Direct chats:', groupData.directChats);
        
        return {
            id: groupId,
            name: groupData.name,
            chat: groupData.chat,
            members: groupData.members || [],
            directChats: groupData.directChats || {}
        };
        
    } catch (error) {
        console.error('❌ Error loading group data for chat:', error);
        throw error;
    }
}

// Get direct chat ID between two users in a group
async function getDirectChatId(groupData, user1Id, user2Id) {
    console.log('🔍 getDirectChatId called with:', { groupData, user1Id, user2Id });
    
    // Validate input parameters
    if (!groupData) {
        console.error('❌ groupData is undefined or null');
        return null;
    }
    
    if (!user1Id) {
        console.error('❌ user1Id is undefined or null');
        return null;
    }
    
    if (!user2Id) {
        console.error('❌ user2Id is undefined or null');
        return null;
    }
    
    if (!groupData.directChats) {
        console.warn('⚠️ groupData.directChats is undefined or null');
        return null;
    }
    
    try {
        console.log('🔍 Fetching user documents for:', user1Id, user2Id);
        
        // We need to get the ConnectyCube IDs for these Firebase UIDs
        const user1Doc = await firestore().collection('users').doc(user1Id.toString()).get();
        const user2Doc = await firestore().collection('users').doc(user2Id.toString()).get();
        
        if (!user1Doc.exists || !user2Doc.exists) {
            console.warn('⚠️ One or both users not found for direct chat lookup');
            return null;
        }
        
        const user1Data = user1Doc.data();
        const user2Data = user2Doc.data();
        
        console.log('🔍 User data loaded:', { 
            user1: { id: user1Id, connectycube_id: user1Data?.connectycube_id },
            user2: { id: user2Id, connectycube_id: user2Data?.connectycube_id }
        });
        
        if (!user1Data.connectycube_id || !user2Data.connectycube_id) {
            console.warn('⚠️ One or both users missing ConnectyCube ID');
            return null;
        }
        
        // Create consistent key using ConnectyCube IDs (sorted to ensure same key regardless of order)
        const chatKey = [user1Data.connectycube_id, user2Data.connectycube_id].sort().join('_');
        console.log('🔍 Looking for direct chat with key:', chatKey);
        console.log('🔍 Available direct chats:', Object.keys(groupData.directChats));
        console.log('🔍 Direct chat found:', groupData.directChats[chatKey]);
        
        if (!groupData.directChats[chatKey]) {
            console.warn('⚠️ No direct chat found for key:', chatKey);
            console.warn('⚠️ This might indicate a mismatch in how the direct chat was created vs. how it\'s being looked up');
        }
        
        return groupData.directChats[chatKey] || null;
        
    } catch (error) {
        console.error('❌ Error getting direct chat ID:', error);
        console.error('❌ Error details:', error.message, error.stack);
        return null;
    }
}

export { createGroup, getCurrentUserGroups, loadGroupDataForChat, getDirectChatId };
