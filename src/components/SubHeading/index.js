import { View, Text } from 'react-native'
import React from 'react'
import styles from '../../components/SubHeading/style';
import { RFPercentage } from "react-native-responsive-fontsize";

const SubHeading = ({ children }) => {
  return (
    <View>
      {children === 'Sign Up' ?
        <Text style={[styles.subHeading, { fontSize: RFPercentage(1.8) }]}>Enter your email, password and confirm password. If you forget it, then you have to do forgot password.</Text> :
        <>
          {children === 'Forgot Password' ?
            <Text style={[styles.subHeading, { fontSize: RFPercentage(2.1) }]}>Please enter your email. We will send an verification link on your email.</Text> :
            <Text style={[styles.subHeading, { fontSize: RFPercentage(2.1) }]}>Please enter your username/email and password to sign in</Text>
          }
        </>
      }
    </View>
  )
}

export default SubHeading