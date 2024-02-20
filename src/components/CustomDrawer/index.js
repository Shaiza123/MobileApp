import { ImageBackground, Text, View, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React,{ useState } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import styles from '../CustomDrawer/style'
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch } from 'react-redux'
import { signout } from '../../redux/Reducer'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const CustomDrawer = (props) => {
    const [delAccountloading, setDelAccountLoading] = useState(false)
    const [logoutloading, setLogoutLoading] = useState(false)
    const user = useSelector((state) => state.user)
    const deleteAccount = async () => {
        try {
            setDelAccountLoading(true)
            const confirmDelete = await new Promise((resolve, reject) => {
                Alert.alert(
                    'Confirm Deletion',
                    `Are you sure you want to delete collection '${user?.email}'?`,
                    [
                        {
                            text: 'No',
                            onPress: () => resolve(false),
                            style: 'cancel',
                        },
                        {
                            text: 'Yes',
                            onPress: () => resolve(true),
                            style: 'destructive',
                        },
                    ],
                    { cancelable: true }
                );
            });

            if (!confirmDelete) {
                // User canceled the deletion
                return;
            }
            const userDocRef = firestore().collection('users').doc(user.id);
            await userDocRef.delete();
            await auth().currentUser.delete();
            dispatch(signout());
            console.log('User account deleted!');
        } catch (error) {
            console.error("Error during account deletion:", error);
        }
        finally {
            setDelAccountLoading(false)
        }
    };
    const dispatch = useDispatch()
    const logout = async () => {
        try {
            setLogoutLoading(true)
            await auth().signOut();
            dispatch(signout());
        } catch (error) {
            console.error("Error during logout:", error);
        }
        finally {
            setLogoutLoading(false)
        }
    }
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#000188' }}>
                <ImageBackground source={require('../../assets/drawerBackground.jpg')} style={styles.drawerBackground}>
                    <Image source={require('../../assets/userProfile.jpg')} style={styles.drawerImage} />
                    <Text style={styles.userEmail}>{user?.email}</Text>
                </ImageBackground>
                <View style={styles.drawerList}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDiv}>
                {delAccountloading ? <ActivityIndicator size="small" color="#0000ff" /> :
                    <TouchableOpacity onPress={() => deleteAccount()} style={styles.bottomDivButton}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="settings-outline" color="#000" size={22} />
                            <Text style={styles.bottomDivText}>Delete Account</Text>
                        </View>
                    </TouchableOpacity>
                }
                {logoutloading ? <ActivityIndicator size="small" color="#0000ff" /> :
                    <TouchableOpacity onPress={() => logout()} style={styles.bottomDivButton}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="exit-outline" color="#000" size={22} />
                            <Text style={styles.bottomDivText}>Sign Out</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default CustomDrawer
