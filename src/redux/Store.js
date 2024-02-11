import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'reduxjs-toolkit-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import userSlice from './Reducer';
  
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'] 
  };
  // console.log('Initializing Redux Persist with config:', persistConfig);

const persistedReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
     serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
     },
    }),
})

const persistor = persistStore(store, null, () => {
  // console.log('redux-persist debugging enabled');
});

// console.log('Redux store and persistor configured:', store,"->", persistor);
export { store, persistor };




