import React, { useRef, useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
import { login } from '../../redux/Reducer'
import firestore from "@react-native-firebase/firestore";
import styles from './style'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import TextInputScreen from '../../components/TextinputScreen/index'
import BackButton from '../../components/BackButton';
import Header from '../../components/Header/index'
import SubHeading from '../../components/SubHeading/index';
import GoogleButton from '../../components/GoogleButton/index';

const Login = ({ navigation }) => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const loginValidationsSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email address is required'),
        password: Yup.string().min(6, ({ min }) => 'password must be atleast 6 characters long')
            .required('Password is required')
    });

    const googleButton = async () => {
        try {
            setGoogleLoading(true);
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const userCredential = await auth().signInWithCredential(googleCredential);
            const documentSnapshot = await firestore().collection('users').doc(userCredential?.user?.uid).get();

            if (documentSnapshot.exists) {
                const postId = documentSnapshot.data().postId;
                dispatch(login({ id: userCredential?.user?.uid, email: userCredential?.user?.email, postId }));
            }
            else {
                const postId = await generateUniquePostId();
                await firestore().collection('users').doc(userCredential?.user?.uid).set({ email: userCredential?.user?.email, postId, firstTimeLogin: true });
                dispatch(login({ id: userCredential?.user?.uid, email: userCredential?.user?.email, postId }));
            
            }

        }
        catch (error) {
            console.log(error)
        }
        finally {
            setGoogleLoading(false);
        }
    }

    // Function to generate a random product ID
    const generateRandomPostId = useCallback(() => {
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
    }, [generateRandomPostId, checkPostIdExists])

    // Function to check if a product ID already exists in the database
    const checkPostIdExists = async (postId) => {
        const snapshot = await firestore()
            .collection('users')
            .where('postId', '==', postId)
            .get();

        return !snapshot.empty;
    }

    // Function to generate a unique product ID
    const generateUniquePostId = async () => {
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


    const userLogin = async (email, password, isValid) => {
        if (!isValid || !email || !password) {
            return;
        }
        setLoading(true);
        try {
            const res =  await auth().signInWithEmailAndPassword(email, password);
            const documentSnapshot = await firestore().collection('users').doc(res.user.uid).get();

            if (documentSnapshot.exists) {
                const postId = documentSnapshot.data().postId;

                if (auth()?.currentUser?.emailVerified) {
                    dispatch(login({ id: res.user.uid, email: res.user.email, postId }));
                } else {
                    await auth()?.currentUser?.sendEmailVerification();
                    navigation.replace('EmailVerify', { postId });
                }
            }
        } catch (error) {
            if (error.code === 'auth/invalid-login') {
                setErrorMessage('Invalid email or password!');
            }
            else if (error.code === 'auth/network-request-failed') {
                setErrorMessage('An error occurred. Please try again later.');
            } else {
                setErrorMessage('An unexpected error occurred.');
            }

        } finally {
            setLoading(false);
        }
    };


    
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always" >
                <View style={styles.mainContainer}>
                    <View>
                        <BackButton navigation={navigation} />
                    </View>
                    <View>
                        <Header children={'Hello there'}/>
                    </View>
                    <View>
                        <SubHeading />
                    </View>
                    <View>
                        <TextInputScreen loginValidationsSchema={loginValidationsSchema} emailRef={emailRef} passwordRef={passwordRef} errorMessage={errorMessage} loading={loading} path={'Login'} setErrorMessage={setErrorMessage} userLogin={userLogin} />
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lineContainer}>
                        <Text style={{ color: '#000' }}>or</Text>
                    </View>
                    <View>
                        {Platform.OS === 'android' ?
                            googleLoading ? <ActivityIndicator size="small" color="#0000ff" /> :
                                <GoogleButton googleButton={googleButton} />
                            : <></>
                        }
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Login;
