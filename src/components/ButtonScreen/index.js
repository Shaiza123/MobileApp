import { View, Text } from 'react-native'
import React from 'react'
import styles from '../ButtonScreen/style';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { Button } from 'react-native-paper';

const ButtonScreen = ({ children, isDisabled, valueEmail, valuePassword, valueConfirmPassword, handleSubmit, valuePostTitle, valuePostDescription, valueFirstName, valueLastName, valuePhoneNumber, valueCountry, valueCity, handleNavigation ,image,valueImage}) => {
    return (
        <View style={[styles.container, { marginTop: hp('3%') }]}>
            <Button style={[styles.button, { borderColor: isDisabled ? '#f48fb0' : '#000' }]} textColor='#fff' mode='contained' buttonColor={'#0147AB'} onPress={() => {
                if (children === 'Sign Up' || children === 'Login' || children === 'Submit' || children === 'Send') {
                    handleSubmit();
                }
                else if (children === 'Update') {
                    handleSubmit(valueFirstName, valueLastName,valuePhoneNumber,valueCountry,valueCity,valueImage);
                }
                else if (children === 'Sign In with password') {
                    handleNavigation();
                } else {
                    console.log('else');
                }
            }}
                disabled={children === 'Sign Up' ? (valueEmail && valuePassword && valueConfirmPassword ? false : true) : children === 'Login' ? (valueEmail && valuePassword ? false : true) : children === 'Submit' ? (valueEmail ? false : true) : children === 'Send' ? (valuePostTitle && valuePostDescription && image ? false : true) : 
                children === 'Update' ? (valueFirstName && valueLastName && valuePhoneNumber && valueCountry && valueCity ? false : true) : false}
                contentStyle={{
                    paddingHorizontal: wp(15),
                    paddingVertical: wp(2)
                }}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Button>
        </View>
    )
}
export default ButtonScreen