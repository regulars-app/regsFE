# Google Sign-In Setup Guide

## Prerequisites
- Firebase project with Authentication enabled
- Google Sign-In method enabled in Firebase

## Step 1: Enable Google Sign-In in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** > **Sign-in method**
4. Click on **Google** and enable it
5. Add your support email
6. Save

## Step 2: Configure Android

### Get SHA-1 Fingerprint
Run this command in your terminal:
```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

### Add SHA-1 to Firebase
1. In Firebase Console, go to **Project Settings**
2. Scroll down to **Your apps** section
3. Click on your Android app
4. Click **Add fingerprint**
5. Paste your SHA-1 fingerprint

### Download google-services.json
1. In Firebase Console, go to **Project Settings**
2. Scroll down to **Your apps** section
3. Click on your Android app
4. Click **Download google-services.json**
5. Place this file in `android/app/` directory

## Step 3: Configure iOS

### Add Bundle ID to Firebase
1. In Firebase Console, go to **Project Settings**
2. Scroll down to **Your apps** section
3. Click on your iOS app
4. Add your Bundle ID (e.g., `com.yourcompany.regsfeapp`)

### Download GoogleService-Info.plist
1. In Firebase Console, go to **Project Settings**
2. Scroll down to **Your apps** section
3. Click on your iOS app
4. Click **Download GoogleService-Info.plist**
5. Add this file to your iOS project in Xcode

## Step 4: Test the Implementation

1. Run your app
2. Try signing in/up with Google
3. Check Firebase Console to see if users are created
4. Verify ConnectyCube profiles are updated with names

## Troubleshooting

### Common Issues:
- **"Google Play services not available"**: Make sure you're testing on a device with Google Play Services
- **"SHA-1 mismatch"**: Ensure you're using the correct keystore (debug vs release)
- **"Bundle ID mismatch"**: Verify the Bundle ID in Xcode matches Firebase

### Testing:
- Test on physical devices (Google Sign-In doesn't work on simulators)
- Make sure you have internet connection
- Check Firebase Console logs for any errors

## Notes
- Google Sign-In automatically handles user authentication
- User profiles are automatically created in Firestore
- ConnectyCube profiles are updated with Google names
- Handles are generated from Google names for new users
