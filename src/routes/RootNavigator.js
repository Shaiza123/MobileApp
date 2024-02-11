import React, { useEffect } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SettingScreen from '../screens/SettingScreen/index';
import Home from '../screens/Home/index';
import PostScreen from '../screens/PostScreen/index';
import SignUp from '../screens/SignUp/index';
import Login from '../screens/Login/index';
import ForgotPassword from '../screens/ForgotPassword/index';
import EmailVerify from '../screens/EmailVerify/index';
import CardDetail from '../screens/CardDetail/index'
import BookMark from '../screens/BookMark/index';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import OnBoardingScreen from '../screens/OnBoardingScreen/index';
import AuthMain from '../screens/AuthMain/index';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const user = useSelector((state) => state.user)
    const loading = useSelector((state) => state.loading);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '610007125917-re5et6nd0m3r8bkb0kifd1f8000kot5t.apps.googleusercontent.com',
        });
    }, [])

    const CustomButton = ({ children, onPress }) => (
        <TouchableOpacity style={{ top: hp(-2), justifyContent: 'center', alignItems: 'center' }} onPress={onPress} >
            <View style={{ height: hp(7.5), width: hp(7.5), borderRadius: hp(4), backgroundColor: '#fff' }}>{children}</View>
        </TouchableOpacity>
    )

    const AppTab = () => (
        <Tab.Navigator
            screenOptions={{
                tabBarInactiveTintColor: '#fff',
                tabBarActiveTintColor: '#fff',
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#0147AB',
                    borderTopRightRadius: hp(3),
                    borderTopLeftRadius: hp(3),
                    height: hp(7.5)
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="PostScreen"
                component={PostScreen}
                options={{
                    tabBarIcon: ({ }) => (
                        <FontAwesome name="plus" color={'#0147AB'} size={26} />
                    ),
                    tabBarButton: (props) => (
                        <CustomButton {...props} />
                    ),
                    tabBarStyle: {
                        display: 'none'
                    }
                }}
            />
            <Tab.Screen
                name="SettingScreen"
                component={SettingScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color }) => (
                        <Icon name="settings" color={color} size={26} />
                    ),
                    // tabBarStyle:({focused}) => ({
                    //     display: focused ? 'none' : 'flex'
                    // })
                }}
            />
        </Tab.Navigator>
    );

    const AppStack = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'HomeScreens'} component={AppTab} />
            <Stack.Screen name={'BookMark'} component={BookMark} options={{ headerShown: false }} />
            <Stack.Screen name={'CardDetail'} component={CardDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
    );

    const AuthStack = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'AuthMain'} component={AuthMain} />
            <Stack.Screen name={'Login'} component={Login} />
            <Stack.Screen name={'SignUp'} component={SignUp} />
            <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
            <Stack.Screen name={'EmailVerify'} component={EmailVerify} />
        </Stack.Navigator>
    );

    // if (loading) {
    //     return (
    //       <ActivityIndicator
    //         style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    //         size="large"
    //         color="#5dcfb6"
    //       />
    //     );
    //   }
    return (
        <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>

            {user?.firstLaunch === true ?
                <Stack.Screen name={'OnBoardingScreen'} component={OnBoardingScreen} /> :
                <>
                    {user?.id ?
                        <Stack.Screen name={'DashBoard'} component={AppStack} />
                        :
                        <Stack.Screen name={'Auth'} component={AuthStack} />
                    }
                </>
            }

        </Stack.Navigator>
        </View>
    );
};
export default RootNavigator;