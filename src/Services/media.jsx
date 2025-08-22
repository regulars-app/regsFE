import RNFS from 'react-native-fs';
import { storage } from '@react-native-firebase/storage';
import { Alert } from 'react-native';

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
        throw new Error('No icon selected');
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
  
  async function retrieveMediaFromFirebaseStorage(
    user,
    key,
    firebaseDownloadUrl,
  ) {
    // Download the media to the local filesystem
    const localPath = `${RNFS.DocumentDirectoryPath}/image_${key}.jpg`;
    const downloadResult = await RNFS.downloadFile({
      fromUrl: firebaseDownloadUrl,
      toFile: localPath,
      headers: {
        Authorization: `Bearer ${await user.getIdToken()}`,
      },
    }).promise;
    if (downloadResult.statusCode === 200) {
      console.log(`Image downloaded successefully to ${localPath}`);
    } else {
      console.error(
        `Image download failed with status code ${downloadResult.statusCode}`,
      );
    }
    const mediaFilePath = `file://${localPath}`;
    return mediaFilePath;
  }