import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from "./src/routes/RootNavigator";
import { PaperProvider } from 'react-native-paper';

const App = () => {
  
  return (
    <PaperProvider>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
    </PaperProvider>
  )
}

export default App      