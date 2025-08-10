import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';
import BackButton from '../components/BackButton';
import MainButton from '../components/MainButton';
import ProfilePic from '../components/ProfilePic';
import AdditionalInfoInput from '../components/AdditionalInfoInput';
import { signUp } from '../Services/auth';
import { initConnectyCube, authenticateChatUser } from '../Services/messaging';

const SignUp = () => {
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

    const handleConfirm = async () => {
        await signUp(formData.email, formData.password);
  
        // Validate the form data
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
   
      
    };
  
    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <BackButton size={30} style={styles.backButton} />
        </View>
        <View style={styles.bodyContent}>
            <ProfilePic size={60} style={styles.profilePic} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
            <AdditionalInfoInput 
                style={styles.additionalInfoInput} 
                placeholder="Name"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
            />
            <AdditionalInfoInput 
                style={styles.additionalInfoInput} 
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
            />
            <AdditionalInfoInput 
                style={styles.additionalInfoInput} 
                placeholder="Password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry={true}
            />
            <AdditionalInfoInput 
                style={styles.additionalInfoInput} 
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry={true}
            />
        </View>
        <View style={styles.footer}>
            <MainButton 
                text="Confirm" 
                color="green" 
                type="confirm" 
                style={styles.confirmButton}
                onPress={handleConfirm}
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
        
      },
      additionalInfoInput: {
        marginTop: 20,
        width: '80%',
      },
      confirmButton: {
        position: 'absolute',
        right: 20,
      },
  });
  
  export default SignUp;