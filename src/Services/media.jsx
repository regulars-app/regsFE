import RNFS from 'react-native-fs';
import storage from '@react-native-firebase/storage';
import { Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';

async function addMediaToFirebaseStorage(media_uri, storage_dir) {
    let downloadUrl = '';
    try {
      if (media_uri) {
        const uploadUri = media_uri;
        const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        const pathToFile = `${RNFS.DocumentDirectoryPath}/${filename}`;
  
        // Copy the file to the app's document directory
        await RNFS.copyFile(uploadUri, pathToFile);
  
        // Verify if the file exists at the new path
        const fileExists = await RNFS.exists(pathToFile);
        if (!fileExists) {
          throw new Error(
            'File was not copied correctly to the document directory',
          );
        }
  
              const storageRef = storage().ref(`${storage_dir}/${filename}`);

      await storageRef.putFile(pathToFile);
  
        downloadUrl = await storageRef.getDownloadURL();
  
        // Delete the file from the app's document directory
        await RNFS.unlink(pathToFile);
      } else {
        throw new Error('No media selected');
      }
    } catch (error) {
      console.error('Error uploading image: ', error);
      Alert.alert(
        'Upload failed',
        'There was an error uploading the image. Please try again.',
      );
    }
  
    return downloadUrl;
  }
  
  // Download media from Firebase Storage to local filesystem
async function retrieveMediaFromFirebaseStorage(user, key, firebaseDownloadUrl) {
  try {
    const localPath = `${RNFS.DocumentDirectoryPath}/image_${key}.jpg`;
    const downloadResult = await RNFS.downloadFile({
      fromUrl: firebaseDownloadUrl,
      toFile: localPath,
      headers: {
        Authorization: `Bearer ${await user.getIdToken()}`,
      },
    }).promise;

    if (downloadResult.statusCode === 200) {
      const mediaFilePath = `file://${localPath}`;
      return mediaFilePath;
    } else {
      throw new Error(`Download failed with status code ${downloadResult.statusCode}`);
    }
  } catch (error) {
    console.error('Error downloading media: ', error);
    return null; // Return null on error instead of throwing
  }
}

  // Function to pick an image from the device gallery
  async function pickImageFromGallery(options = {}) {
    const defaultOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
    };

    const finalOptions = { ...defaultOptions, ...options };

    try {
      const result = await launchImageLibrary(finalOptions);
      
      if (result.assets && result.assets[0]) {
        return {
          success: true,
          image: result.assets[0],
          error: null
        };
      } else if (result.didCancel) {
        return {
          success: false,
          image: null,
          error: 'User cancelled image selection'
        };
      } else {
        return {
          success: false,
          image: null,
          error: 'No image selected'
        };
      }
    } catch (error) {
      return {
        success: false,
        image: null,
        error: error.message || 'Failed to pick image'
      };
    }
  }

  // Generate unique filename for media uploads
  function generateUniqueFilename(originalName, prefix = '') {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = originalName.substring(originalName.lastIndexOf('.'));
    return `${prefix}${timestamp}_${randomString}${extension}`;
  }

  // Generic function to upload media to Firebase Storage with custom directory and filename prefix
  async function uploadMediaToStorage(media_uri, storage_dir, filenamePrefix = '') {
    try {
      const filename = generateUniqueFilename(media_uri, filenamePrefix);
      const fullStoragePath = `${storage_dir}/${filename}`;
      const downloadUrl = await addMediaToFirebaseStorage(media_uri, storage_dir);
      
      if (downloadUrl) {
        return {
          success: true,
          downloadUrl,
          filename,
          storagePath: fullStoragePath
        };
      } else {
        return {
          success: false,
          error: 'Upload failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Delete media from Firebase Storage
  async function deleteMediaFromStorage(storagePath) {
    try {
      const storageRef = storage().ref(storagePath);
      await storageRef.delete();
      return { success: true };
    } catch (error) {
      console.error('Error deleting media: ', error);
      return { success: false, error: error.message };
    }
  }

  // Get media metadata from Firebase Storage
  async function getMediaMetadata(storagePath) {
    try {
      const storageRef = storage().ref(storagePath);
      const metadata = await storageRef.getMetadata();
      return { success: true, metadata };
    } catch (error) {
      console.error('Error getting media metadata: ', error);
      return { success: false, error: error.message };
    }
  }

  export { 
    addMediaToFirebaseStorage, 
    retrieveMediaFromFirebaseStorage, 
    pickImageFromGallery,
    uploadMediaToStorage,
    deleteMediaFromStorage,
    getMediaMetadata,
    generateUniqueFilename
  };