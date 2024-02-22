import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBKil53VRu3npZTF-8Ema9-bFg68j43Pcg",
  authDomain: "naomi-auth-dev.firebaseapp.com",
  projectId: "naomi-auth-dev",
  storageBucket: "naomi-auth-dev.appspot.com",
  messagingSenderId: "899188870827",
  appId: "1:899188870827:web:017cdca95090fc426831ee",
  measurementId: "G-LVBVD6K4MS",
});

// const app = firebase.initializeApp({
//   apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: import.meta.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// });

export const auth = app.auth();
export default app;
