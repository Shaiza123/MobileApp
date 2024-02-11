import React, { useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Platform, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux'
import { login } from '../../redux/Reducer'
import firestore from "@react-native-firebase/firestore";
import styles from './style'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ButtonScreen from '../../components/ButtonScreen';
import GoogleButton from '../../components/GoogleButton';

const AuthMain = ({ navigation }) => {

    const dispatch = useDispatch()
    const [googleLoading, setGoogleLoading] = useState(false)

    const googleButton = async () => {
        try {
            setGoogleLoading(true);
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const userCredential = await auth().signInWithCredential(googleCredential);
            console.log("usercrediantials", userCredential.user);
            const documentSnapshot = await firestore().collection('users').doc(userCredential?.user?.uid).get();

            if (documentSnapshot.exists) {
                const postId = documentSnapshot.data().postId;
                console.log('user verified')
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

    const handleNavigation = () => {
        navigation.navigate('Login')
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

    return (
        <View style={styles.mainContainer}>
            <Image source={require('../../assets/Login.png')}
            // style={{width:'100%', height:'100%' ,resizeMode:'contain'}}
            />
            <Text style={styles.heading}>Let's you in</Text>
            {Platform.OS === 'android' ?
                googleLoading ? <ActivityIndicator size="small" color="#0000ff" /> :
                    <GoogleButton googleButton={googleButton} />
                : <></>
            }
            <View style={styles.lineContainer}>
                <Text style={{ color: '#000' }}>or</Text>
            </View>
            <ButtonScreen handleNavigation={handleNavigation} children={'Sign In with password'} />
            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", paddingTop: "5%" }}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }}>
                    <Text style={{ color: "#0147AB", textDecorationLine: 'underline' }}>SignUp</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}   
          
export default AuthMain;      
