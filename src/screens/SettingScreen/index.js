import React, { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerActions} from '@react-navigation/native'
import BookMark from '../BookMark/index'
import Profile from '../Profile/index'
import Home from '../Home/index'
import CustomDrawer from '../../components/CustomDrawer/index'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Drawer = createDrawerNavigator()

const SettingScreen = ({ navigation }) => {
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     navigation.dispatch(DrawerActions.openDrawer());
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      navigation.dispatch(DrawerActions.openDrawer());
      setIsDrawerOpen(true);
    });

    const unsubscribeDrawerState = navigation.addListener('drawerClose', () => {
      // setIsDrawerOpen(false); 
      navigation.goBack();

    });

    if (!isDrawerOpen) {
    }

    return () => {
      unsubscribeFocus();
      unsubscribeDrawerState();
    };
  }, [navigation]);


  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#0147AB',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: hp(-3),
        },  
      }}   
    >
      <Drawer.Screen name="Home" component={Home} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="home-outline" color={color} size={22} />
        )
      }} />
      <Drawer.Screen name="BookMark" component={BookMark} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="bookmark-outline" color={color} size={22} />
        )
      }} />
      <Drawer.Screen name="Profile" component={Profile} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="person-outline" color={color} size={22} />
        )
      }} />
    </Drawer.Navigator>
  )
}

export default SettingScreen