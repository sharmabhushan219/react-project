import {initializeApp} from 'firebase/app';
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider } from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD6nAX8_8OrV6nWjuQsZNCub9jlz2m4mIM",
    authDomain: "crwn-clothing-db-45765.firebaseapp.com",
    projectId: "crwn-clothing-db-45765",
    storageBucket: "crwn-clothing-db-45765.firebasestorage.app",
    messagingSenderId: "128651594893",
    appId: "1:128651594893:web:8d7e7f61ecc69aa34726c4"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt:"select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup=()=>signInWithPopup(auth,provider);
  export const db = getFirestore();
  export const createUserDocumentFromAuth = async(userAuth)=>{
    const userDocRef = doc(db,'users',userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt
        })

      }catch(error){
console.log('error creating the user', error.message)
      }
    }
    return userDocRef;
  }