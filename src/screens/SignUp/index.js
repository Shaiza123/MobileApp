import React, { useRef, useState, useEffect } from 'react'
import { View, ScrollView, KeyboardAvoidingView} from 'react-native'
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';
import { useSelector } from 'react-redux'
import firestore from "@react-native-firebase/firestore";
import styles from './style'
import { useCallback } from 'react';
import TextInputScreen from '../../components/TextinputScreen/index'
import Header from '../../components/Header/index';
import BackButton from '../../components/BackButton';
import SubHeading from '../../components/SubHeading';

const SignUp = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null);   
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const user = useSelector((state) => state.user)

    useEffect(() => {
        console.log("Redux user", user)
    }, [])

    // Validation schema for sign up form
    const loginValidationsSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email address is required'),
        password: Yup.string().min(6, ({ min }) => 'password must be atleast 6 characters long')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    // Function to sign up a user
    const signUpUser = async (email, password, confirmPassword, isValid) => {
        if (!isValid || !email || !password || !confirmPassword) {
            return;
        }
    
        setLoading(true);
    
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
    
            if (user) {
                const postId = await generateUniquePostId();
                await firestore().collection('users').doc(user.uid).set({ email: user.email, postId,firstTimeLogin:true  });
                await user.sendEmailVerification();
                navigation.navigate('EmailVerify', { postId: postId });
            } else {
                console.error('No user found');
            }
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage('That email address is already in use!');
            } else if (error.code === 'auth/invalid-email') {
                setErrorMessage('That email address is invalid!');
            } else if(error.code === 'auth/network-request-failed'){
                setErrorMessage('An error occurred. Please try again later.');
            }else {
                setErrorMessage('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    }
    
    // Function to generate a random product ID
    const generateRandomPostId=useCallback(()=>{
        const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';

        let postId = '';
        for (let i = 0; i < 2; i++) {
            postId += upperCaseLetters.charAt(Math.floor(Math.random() * upperCaseLetters.length));
            postId += lowerCaseLetters.charAt(Math.floor(Math.random() * lowerCaseLetters.length));
            postId += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }

        return postId;
    },[generateRandomPostId, checkPostIdExists])

    // Function to check if a product ID already exists in the database
    const checkPostIdExists=async (postId)=> {
        const snapshot = await firestore()
            .collection('users')
            .where('postId', '==', postId)
            .get();

        return !snapshot.empty;
    }

    // Function to generate a unique product ID
    const generateUniquePostId=async()=> {
        while (true) {
            const postId = generateRandomPostId();
            const exists = await checkPostIdExists(postId);

            if (!exists) {
                return postId;
            } else {
                console.log('Product ID already exists, generating a new one...');
            }
        }
    }


    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            // keyboardVerticalOffset={100}
            >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always" >
                <View style={styles.container}>
                    <View>
                    <BackButton navigation={navigation}/>
                    </View>
                    <View>
                    <Header children={'Sign Up'}/>
                    </View>
                    <View>
                    <SubHeading children={'Sign Up'}/>
                    </View>
                    <View>
                    <TextInputScreen loginValidationsSchema={loginValidationsSchema} emailRef={emailRef} passwordRef={passwordRef} confirmPasswordRef={confirmPasswordRef} errorMessage={errorMessage} loading={loading} path={'SignUp'} setErrorMessage={setErrorMessage} signUpUser={signUpUser}/>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}

export default SignUp         