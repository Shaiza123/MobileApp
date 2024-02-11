import { Text, View, TouchableOpacity, Linking, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from "./style"
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';
import Snackbar from 'react-native-snackbar';
import TextinputScreen from '../../components/TextinputScreen/index';
import BackButton from '../../components/BackButton/index'
import Header from '../../components/Header/index'
import SubHeading from '../../components/SubHeading/index';

const ForgotPassword = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null);
    const forgotPassword = async (email, isValid) => {
        if (!isValid || !email) {
            return;
        }
        setLoading(true)
        try {
            const signInMethods = await auth().fetchSignInMethodsForEmail(email);
            if (signInMethods.length === 0) {
                setErrorMessage('No account found with this email address.');
            }else{
                await auth().sendPasswordResetEmail(email)
                Snackbar.show({
                    text: `Reset Password link has been sent on ${email} successfully!`,
                    textColor: 'white',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'green',
                })
                navigation.replace('Login')
            }
        }
        catch (error) {
            if (error.code === 'auth/invalid-email') {
                setErrorMessage('That email address is invalid!');
            } else if (error.code === 'auth/network-request-failed') {
                setErrorMessage('An error occurred. Please try again later.');
            } else if (error.code === 'auth/user-not-found') {
                setErrorMessage('No account found with this email address.');
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        }
        finally {
            setLoading(false)
        }
    }
    const loginValidationsSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email address is required'),
    });
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // keyboardVerticalOffset={100}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always" >
                <View style={styles.container}>
                    <View>
                        <BackButton navigation={navigation} />
                    </View>
                    <View>
                        <Header children={'Forgot Password'} />
                    </View>
                    <View>
                        <SubHeading children={'Forgot Password'} />
                    </View>
                    <TextinputScreen loginValidationsSchema={loginValidationsSchema} errorMessage={errorMessage} loading={loading} path={'ForgotPassword'} setErrorMessage={setErrorMessage} forgotPassword={forgotPassword} />
                    <View style={styles.textDirection}>
                        <Text style={styles.textStyling}>
                            Remember Password?
                        </Text>

                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ color: "#0147AB", textDecorationLine: 'underline' }}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default ForgotPassword