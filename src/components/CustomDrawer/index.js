import { ImageBackground, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import styles from '../CustomDrawer/style'
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomDrawer = (props) => {
    const user = useSelector((state) => state.user)
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#0147AB' }}>
                <ImageBackground source={require('../../assets/drawerBackground.jpg')} style={styles.drawerBackground}>
                    <Image source={require('../../assets/userProfile.jpg')} style={styles.drawerImage} />
                    <Text style={styles.userEmail}>{user?.email}</Text>
                </ImageBackground>
                <View style={[styles.drawerList, { paddingTop: insets.top }]}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDiv}>
                <TouchableOpacity onPress={() => {}} style={styles.bottomDivButton}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Ionicons name="settings-outline" color="#000" size={22} />
                <Text style={styles.bottomDivText}>Delete Account</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}} style={styles.bottomDivButton}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Ionicons name="exit-outline" color="#000" size={22} />
                <Text style={styles.bottomDivText}>Sign Out</Text>
                </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer
