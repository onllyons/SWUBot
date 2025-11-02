import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCmvRlaor0ftaqGXNwID3dAAQR8ZVhhMiQ",
  authDomain: "enable-authentication-e6dbc.firebaseapp.com",
  databaseURL: "https://enable-authentication-e6dbc-default-rtdb.firebaseio.com",
  projectId: "enable-authentication-e6dbc",
  storageBucket: "enable-authentication-e6dbc.firebasestorage.app",
  messagingSenderId: "362407390579",
  appId: "1:362407390579:web:3568503bf5c448a8496906",
  measurementId: "G-94SM9F0DJF"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };
