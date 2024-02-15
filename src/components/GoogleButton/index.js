import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from '../ButtonScreen/style';
import { Button } from 'react-native-paper';

const GoogleButton = ({googleButton}) => {
    return (
        <View style={styles.buttonContainer}>
            <Button style={styles.button} mode='contained' buttonColor={'transparent'} textColor='#000' icon={() => (<Image source={require('../../assets/google_icon.png')} />)} onPress={() => googleButton()} >
                <Text style={styles.buttonText}>Continue With Google</Text>
            </Button>
        </View>
    )
}
export default GoogleButton