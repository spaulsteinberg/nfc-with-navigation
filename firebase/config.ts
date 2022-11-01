import { initializeApp, FirebaseApp, getApps, getApp } from "firebase/app";
import config from '../firebase.json'
import { Auth, getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Firestore, getFirestore, initializeFirestore } from "firebase/firestore";

let app:FirebaseApp;
let auth:Auth;
let db:Firestore;

if (getApps().length < 1) {
  app = initializeApp(config)
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  })
  db = initializeFirestore(app, { experimentalForceLongPolling: true, })
} else {
  app = getApp();
  auth = getAuth();
  db = getFirestore(app)
}

export { auth, db }