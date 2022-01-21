import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile,onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState,useEffect } from "react";




initializeAuthentication();



const useFirebase=()=>{
    const auth = getAuth();

    const [user,setUser]=useState({})
    const GoogleProvider = new GoogleAuthProvider();

    const handleGoogle =()=>{
        signInWithPopup(auth, GoogleProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setUser(user);
            // ...
        }).catch((error) => {
            // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    const registerWithEmailPass=(email,password,name)=>{
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                 // Signed in 
                const newUser = {email,displayName:name}
                setUser(newUser) 
                // ...
                updateProfile(auth.currentUser, {
                    displayName: name
                  }).then(() => {
                    // Profile updated!
                    // ...
                  }).catch((error) => {
                    // An error occurred
                    // ...
                  });
            })
             .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // ..
            });
    }
    const loginWithEmail=(email, password)=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
            const user = userCredential.user;
        // ...
            })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
        });
    }
    useEffect(()=>{
      
        const unsubscribe =onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setUser(user);
              
              // ...
            } else {
              // User is signed out
              // ...
              setUser({})
            }
           
          });
          return()=>unsubscribe;
    },[auth])
    const logOut=()=>{
        signOut(auth).then(()=>{
            setUser({})
        })
    }

    return {
        user,
        registerWithEmailPass,
        loginWithEmail,
        logOut,handleGoogle
    }
}

export default useFirebase;