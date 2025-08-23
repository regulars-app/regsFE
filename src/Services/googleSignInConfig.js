// Google Sign-In Configuration
// This file contains the configuration needed for Google Sign-In to work

// You need to configure Google Sign-In in your Firebase project:
// 1. Go to Firebase Console > Authentication > Sign-in method
// 2. Enable Google Sign-in
// 3. Add your app's SHA-1 fingerprint for Android
// 4. Download google-services.json (Android) and GoogleService-Info.plist (iOS)

// For Android, you'll need to add your SHA-1 fingerprint to Firebase
// To get your SHA-1, run: keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

// For iOS, you'll need to add your bundle ID to Firebase

export const GOOGLE_SIGN_IN_CONFIG = {
  // These values will come from your Firebase project
  // You don't need to manually set them here
  webClientId: '', // Will be auto-configured
  iosClientId: '', // Will be auto-configured
  offlineAccess: true,
};

// Note: The actual configuration is handled automatically by Firebase
// when you add the google-services.json and GoogleService-Info.plist files
// to your project
