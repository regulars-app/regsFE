import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import BackButton from '../components/BackButton';
import MainButton from '../components/MainButton';
import ProfilePic from '../components/ProfilePic';
import AdditionalInfoInput from '../components/AdditionalInfoInput';
import { signUp, googleSignIn } from '../Services/auth';
import AdditionalInfoDisplay from '../components/AdditionalInfoDisplay';
import DateTimePicker from '@react-native-community/datetimepicker';
import GoogleSymbol from '../components/GoogleSymbol';
import { useNavigation } from '@react-navigation/native';
import { pickImageFromGallery } from '../Services/media';

const SignUp = () => {

  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };


      const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddProfilePic = async () => {
        const result = await pickImageFromGallery();
        
        if (result.success) {
            setSelectedImage(result.image);
        } else if (result.error !== 'User cancelled image selection') {
            Alert.alert('Error', result.error);
        }
    };

    const handleConfirm = async () => {
        // Validate the form data first
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        setIsUploading(true);
        
        try {
            // Call signUp with all the collected data including profile picture
            const result = await signUp(formData.email, formData.password, formData.name, date, selectedImage);
            
            if (result.success) {
                navigation.navigate('Home');
            } else {
                alert('Sign up failed: ' + result.error);
            }
        } catch (error) {
            alert('Sign up failed: ' + error.message);
        } finally {
            setIsUploading(false);
        }
    };
  
    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <BackButton size={30} style={styles.backButton} />
        </View>
        <View style={styles.bodyContent}>
            <ProfilePic 
                size={120} 
                style={styles.profilePic} 
                addProfilePic={true} 
                imageURL={selectedImage?.uri || 'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}
                onAddProfilePic={handleAddProfilePic}
            />
            <AdditionalInfoInput 
                style={styles.additionalInfoInput} 
                multiline={false}
                placeholder="Name"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
            />
            <AdditionalInfoInput 
                style={styles.additionalInfoInput} 
                multiline={false}
                maxLength={30}
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
            />
            <View style={styles.dobContainer}>
              <AdditionalInfoDisplay style={styles.dobLabel} text="Date of Birth:"/>
              <TouchableOpacity style={styles.dobDisplay} onPress={() => setShowPicker(true)}>
                <AdditionalInfoDisplay style={styles.dobDisplayText} text={date.toLocaleDateString()} />
                {showPicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </TouchableOpacity>
            </View>
            <AdditionalInfoInput 
                style={styles.additionalInfoInput} 
                multiline={false}
                maxLength={30}
                placeholder="Password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry={true}
            />
            <AdditionalInfoInput 
                style={styles.additionalInfoInput} 
                multiline={false}
                maxLength={30}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={async () => {
                try {
                    const result = await googleSignIn();
                    if (result.success) {
                        // Navigate to Home on successful sign up
                        navigation.navigate('Home');
                    } else {
                        // Show error message
                        Alert.alert('Google Sign-Up Failed', result.error);
                    }
                } catch (error) {
                    Alert.alert('Google Sign-Up Error', error.message);
                }
            }}>
                <AdditionalInfoDisplay style={styles.googleSignUp} text="Sign up with Google">
                    <GoogleSymbol size={20}/>
                </AdditionalInfoDisplay>
            </TouchableOpacity>
        </View>
        <View style={styles.footer}>
            <MainButton 
                text={isUploading ? "Creating Account..." : "Confirm"} 
                color="green" 
                type="confirm" 
                style={styles.confirmButton}
                onPress={handleConfirm}
                disabled={isUploading}
            />    
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF6F0',
        height: '100%',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 100,
        paddingBottom: 140,
      },
      header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 100,
        alignItems: 'center',
      },
      footer: {
        position: 'absolute',
        width: '100%',
        height: 140,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
      },
      bodyContent: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
      },
      backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
      },
      profilePic: {
        marginBottom: 60,
      },
      additionalInfoInput: {
        marginTop: 20,
        width: '80%',
      },
      dobContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        width: '80%',
        marginTop: 20,
      },
      dobLabel: {
        width: 130,
      },
      dobDisplay: {
        width: 115,
      },
      dobDisplayText: {
        width: 120,
        backgroundColor: '#F2FFF6',
      },
      googleSignUp: {
        marginTop: 20,
        width: 210,
      },
      confirmButton: {
        position: 'absolute',
        right: 20,
      },
  });
  
  export default SignUp;