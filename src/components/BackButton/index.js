import React from 'react'
import styles from '../BackButton/style';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { IconButton } from 'react-native-paper';

const BackButton = ({ navigation ,children, path}) => {
    return  children === 'Detail Screen' ? (
        <IconButton style={styles.button} onPress={() => {path === 'bookmark' ? navigation.navigate('bookmark'): navigation.goBack()}} icon="arrow-left" size={hp(4)} iconColor="#fff" />
    ) :
    <IconButton style={styles.button} onPress={() => navigation.goBack()} icon="arrow-left" size={hp(4)} iconColor="#000" />
}
export default BackButton