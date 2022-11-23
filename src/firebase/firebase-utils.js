import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config =  {
    apiKey: "AIzaSyCkteooZs0TFUcrjy8euGCrE2YlD_-Vdc4",
    authDomain: "pandu-s-cloth-store.firebaseapp.com",
    projectId: "pandu-s-cloth-store",
    storageBucket: "pandu-s-cloth-store.appspot.com",
    messagingSenderId: "97014095624",
    appId: "1:97014095624:web:b69e6ceb99d0f0508156bd",
    measurementId: "G-ZCLN3WVTBC"
};

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

