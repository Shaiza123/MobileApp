
import { Text, View, TouchableOpacity,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux'
import { login } from '../../redux/Reducer'
import styles from './style'
import BackButton from '../../components/BackButton/index';
import Header from '../../components/Header/index';

const EmailVerify = (props) => {
    const postId = props?.route?.params?.postId;
    const dispatch = useDispatch()
    const [timer, setTimer] = useState(10);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [verifiedUser, setVerifiedUser] = useState(false);

    // Function to reload the user
    const reloadUser = async () => {
        try {
            const user = auth().currentUser;
            if (user) {
                await user.reload();
                const updatedUser = auth().currentUser;
                console.log("Updated User Data:", updatedUser);

                if (updatedUser?.emailVerified) {
                    setVerifiedUser(true)
                    setTimeout(() => {
                       dispatch(login({ id: updatedUser?.uid, email: updatedUser?.email, productsId: postId}));
                    }, 3000);

                }

                console.log("Updated User Data:", updatedUser);
            } else {
                console.error("No user is currently signed in.");
            }
        } catch (error) {
            console.error("Error refreshing user data:", error);
        }
    };

    // Use useEffect to set up the interval when the component mounts
    useEffect(() => {
        const interval = setInterval(reloadUser, 2000); // 2000 milliseconds = 2 seconds

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let interval = 0;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        }
        else {
            setIsResendDisabled(false);
            setIsButtonPressed(true);
        }

        return () => {
            clearInterval(interval);
        }
    }, [timer])

    const handleResend = async () => {
        setIsResendDisabled(true);
        setTimer(10);
        setIsButtonPressed(false);
    }

    return (
        <>
            {verifiedUser ? <View style={[styles.container,{justifyContent:'center', alignItems:'center'} ]}>
            <Image source={require('../../assets/verify1.png')} style={{width:"60%",height:"30%"}}/>
            <Text style={styles.userVerifiedText}>User Verified</Text>
            </View> :
                <View style={styles.container}>
                    <View>
                        <Header children={'Email Verify'}/>
                    </View>
                    <View style={styles.textDirection}>
                        <Text style={styles.signUpText}>Verification Email Send At </Text>
                        <Text style={styles.emailText}>{auth().currentUser.email}</Text>
                    </View>
                    <TouchableOpacity style={[styles.resendButton, {
                        backgroundColor: isButtonPressed ? 'lightgreen' : 'lightgrey',
                        borderColor: isButtonPressed ? 'lightgreen' : 'lightgrey',
                    }]} disabled={isResendDisabled} onPress={() => handleResend()}>
                        <Text>Resend</Text>
                    </TouchableOpacity>

                    <Text style={{ color: isButtonPressed ? 'blue' : '#000' }}>
                        {isResendDisabled ? `Resend in ${timer} s` : <></>}
                    </Text>
                </View>}
        </>
    )
}
export default EmailVerify;