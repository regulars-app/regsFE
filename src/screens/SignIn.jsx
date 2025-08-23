import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import BackButton from '../components/BackButton';
import MainButton from '../components/MainButton';
import ProfilePic from '../components/ProfilePic';
import AdditionalInfoInput from '../components/AdditionalInfoInput';
import { signIn, signInWithGoogle } from '../Services/auth';
import AdditionalInfoDisplay from '../components/AdditionalInfoDisplay';
import GoogleSymbol from '../components/GoogleSymbol';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {

  const navigation = useNavigation();

  const [formData, setFormData] = useState({
      email: '',
      password: '',
  });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleConfirm = async () => {
        await signIn(formData.email, formData.password);
  
        // Validate the form data
        if (!formData.email || !formData.password) {
            alert('Please fill in all fields');
            return;
        }

        navigation.navigate('Home');
    };
  
    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <BackButton size={30} style={styles.backButton} />
        </View>
        <View style={styles.bodyContent}>
            <ProfilePic size={120} style={styles.profilePic} imageURL={'https://cdn.pixabay.com/photo/2024/12/22/15/29/people-9284717_1280.jpg'}/>
            <AdditionalInfoInput 
                style={styles.additionalInfoInput} 
                multiline={false}
                maxLength={30}
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
            />
            <AdditionalInfoInput 
                style={styles.additionalInfoInput} 
                multiline={false}
                maxLength={30}
                placeholder="Password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={() => {
                alert('Google Sign-In is not yet implemented for React Native. Please use email/password sign in for now.');
            }}>
                <AdditionalInfoDisplay style={styles.googleSignIn} text="Sign in with Google">
                    <GoogleSymbol size={20}/>
                </AdditionalInfoDisplay>
            </TouchableOpacity>
        </View>     
        <View style={styles.footer}>
        <MainButton 
                text="Sign Up" 
                color="yellow" 
                style={styles.signUpButton}
                onPress={() => navigation.navigate('SignUp')}
            />    
            <MainButton 
                text="Login" 
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
        marginTop: 100,
        marginBottom: 120,
      },
      additionalInfoInput: {
        marginTop: 20,
        width: '80%',
      },
      googleSignIn: {
        marginTop: 20,
        width: 210,
      },
      confirmButton: {
        position: 'absolute',
        right: 30,
      },
      signUpButton: {
        position: 'absolute',
        left: 30,
      },
  });
  
  export default SignIn;