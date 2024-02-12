import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from "./src/routes/RootNavigator";
import { MenuProvider } from 'react-native-popup-menu';

const App = () => {
  
  return (
    <MenuProvider>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
    </MenuProvider>
  )
}

export default App      