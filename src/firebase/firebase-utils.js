import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config =  {
    apiKey: "AIzaSyBbeN8ZJnxHE91dj-dFMKuhTPQh-v9OE_M",
    authDomain: "pandu-s-cloth-store-ed55d.firebaseapp.com",
    projectId: "pandu-s-cloth-store-ed55d",
    storageBucket: "pandu-s-cloth-store-ed55d.appspot.com",
    messagingSenderId: "585509214296",
    appId: "1:585509214296:web:01804127f7806f0d7fd22d",
    measurementId: "G-5FVEENBZC1"
};

export const createUserProfileDocument = async (userAuth,additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if(!snapShot.exists){
        const {displayName,email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        }catch (error){

            console.log('error creating user',error.message);

        }
        
    }
    return userRef

};

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

