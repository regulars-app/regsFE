# Firebase Firestore Schema for Friend Requests (Datastore Compatibility Mode)

## Collection: `users`

Each user document should have the following structure:

```json
{
  "uid": "user123",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "handle": "johndoe",
  "media_ref": "https://example.com/photo.jpg",
  "friends": ["user456", "user789"],
  "friend_requests_received": ["user101", "user102"],
  "friend_requests_sent": ["user103", "user104"],
  "groups": [],
  "interests": [],
  "dietary_preferences": [],
  "places": [],
  "availability": [],
  "diary_manager": ""
}
```

## Field Descriptions

- **`uid`**: Unique user ID (from Firebase Auth)
- **`email`**: User's email address
- **`first_name`**: User's first name
- **`last_name`**: User's last name
- **`handle`**: User's unique handle/username
- **`media_ref`**: URL to user's profile photo
- **`friends`**: Array of user IDs who are confirmed friends
- **`friend_requests_received`**: Array of user IDs who have sent friend requests to this user
- **`friend_requests_sent`**: Array of user IDs to whom this user has sent friend requests
- **`groups`**: Array of group IDs the user belongs to
- **`interests`**: Array of user's interests
- **`dietary_preferences`**: Array of user's dietary preferences
- **`places`**: Array of place IDs the user has visited
- **`availability`**: Array of user's availability times
- **`diary_manager`**: String for diary management

## How Friend Requests Work

1. **Sending a Request**:
   - User A calls `requestFriend(userB.uid)`
   - User B's `friend_requests_received` array gets updated with User A's ID
   - User A's `friend_requests_sent` array gets updated with User B's ID

2. **Accepting a Request**:
   - User B calls `acceptFriendRequest(userA.uid)`
   - User B's `friend_requests_received` array removes User A's ID
   - User B's `friends` array adds User A's ID
   - User A's `friend_requests_sent` array removes User B's ID
   - User A's `friends` array adds User B's ID

3. **Declining a Request**:
   - User B calls `declineFriendRequest(userA.uid)`
   - User B's `friend_requests_received` array removes User A's ID
   - User A's `friend_requests_sent` array removes User B's ID

## Firebase Firestore Operations (Datastore Compatibility Mode)

Since you're in "Firestore with Datastore compatibility" mode, the service uses:

- **`firestore().collection('users').doc(userId)`**: Creates a reference to a user document
- **`doc.get()`**: Retrieves a document
- **`doc.update(data)`**: Updates a document
- **Manual array operations**: Uses JavaScript array methods like `filter()`, `push()`, and spread operator instead of `arrayUnion`/`arrayRemove`

## Why This Approach?

Since your Firebase project is set to **"Firestore with Datastore compatibility"** mode:

- ✅ **Compatible with your current database structure**
- ✅ **Works with existing Firebase packages** (no additional dependencies)
- ✅ **Handles arrays manually** since `arrayUnion`/`arrayRemove` may not work in compatibility mode
- ✅ **Maintains Firebase Auth** for user authentication
- ✅ **No Node.js compatibility issues** in React Native

## Security Rules

Make sure to set up proper Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null; // Allow reading other users for friend requests
    }
  }
}
```

## Initial Setup

When a user first signs up, create their user document with empty arrays:

```javascript
// In your auth service
const createUserProfile = async (user) => {
  await firestore().collection('users').doc(user.uid).set({
    uid: user.uid,
    email: user.email,
    first_name: user.displayName?.split(' ')[0] || '',
    last_name: user.displayName?.split(' ').slice(1).join(' ') || '',
    handle: user.email?.split('@')[0] || '',
    media_ref: user.photoURL || '',
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
};
```

## Array Operation Details

The service handles arrays manually to ensure compatibility:

- **Adding to arrays**: `[...existingArray, newValue]`
- **Removing from arrays**: `existingArray.filter(id => id !== valueToRemove)`
- **Checking existence**: `existingArray.includes(value)`
- **Preventing duplicates**: Checks before adding to avoid duplicate entries
