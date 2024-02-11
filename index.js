// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/Store';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
const myApp =()=> {
    return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    )
}

AppRegistry.registerComponent(appName, () => myApp); 