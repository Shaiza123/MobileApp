import React, { useEffect } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from '../screens/Home/index';
import PostScreen from '../screens/PostScreen/index';
import SignUp from '../screens/SignUp/index';
import Login from '../screens/Login/index';
import ForgotPassword from '../screens/ForgotPassword/index';
import EmailVerify from '../screens/EmailVerify/index';
import CardDetail from '../screens/CardDetail/index'
import BookMark from '../screens/BookMark/index';
import Profile from '../screens/Profile/index';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import OnBoardingScreen from '../screens/OnBoardingScreen/index';
import AuthMain from '../screens/AuthMain/index';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '../components/CustomDrawer/index'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()

const RootNavigator = () => {
    const user = useSelector((state) => state.user)

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

    const AppTab = () => {
        const navigation = useNavigation();
        return (
            <Tab.Navigator
                screenOptions={{
                    tabBarInactiveTintColor: '#fff',
                    tabBarActiveTintColor: '#fff',
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
                        headerTitleAlign:'center',
                        headerLeft: () => {
                            return (
                                <TouchableOpacity onPress={() => navigation?.openDrawer()}>
                                    <Ionicons name="menu" size={25} color="#000" style={{ marginLeft: hp(2)}}  />
                                </TouchableOpacity>
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Post"
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
                        },
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="person" color={color} size={26} />
                        ),
                        tabBarStyle: {
                            display: 'none'
                        },
                        headerTitleAlign: 'center',
                        headerLeft: () => {
                            return (
                                <TouchableOpacity onPress={() => navigation?.navigate('Home')}>
                                    <Icon name="arrow-back" size={25} color="#000" style={{ marginLeft: hp(2) }} />
                                </TouchableOpacity>
                            );
                        }
                    }}
                />
            </Tab.Navigator>
        )
    };

    const AppStack = ({navigation}) => (
        <Stack.Navigator>
            <Stack.Screen name={'Drawer'} component={DrawerNavigator} options={{ headerShown: false }}/>
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

    const DrawerNavigator = ({navigation}) => (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                // headerShown: false,
                drawerActiveBackgroundColor: '#0147AB',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
                drawerLabelStyle: {
                    marginLeft: hp(-3),
                },
            }}
        >
            <Drawer.Screen name="home" component={AppTab} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="home-outline" color={color} size={22} />
                ),
                headerShown:false
            }} />
            <Drawer.Screen name="bookmark" component={BookMark} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="bookmark-outline" color={color} size={22} />
                ),
                headerTitleAlign: 'center',
                headerLeft: () => {
                    return (
                        <TouchableOpacity onPress={() => navigation?.navigate('Home')}>
                            <Icon name="arrow-back" size={25} color="#000" style={{ marginLeft: hp(2) }} />
                        </TouchableOpacity>
                    );
                }
            }} />
            <Drawer.Screen name="profile" component={Profile} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="person-outline" color={color} size={22} />
                ),
                headerTitleAlign: 'center',
                headerLeft: () => {
                    return (
                        <TouchableOpacity onPress={() => navigation?.navigate('Home')}>
                            <Icon name="arrow-back" size={25} color="#000" style={{ marginLeft: hp(2) }} />
                        </TouchableOpacity>
                    );
                }
            }} />
        </Drawer.Navigator>
    )

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
                            // <Stack.Screen name={'Drawer'} component={DrawerNavigator} />
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