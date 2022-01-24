import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile,onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from "firebase/auth";
import { useState,useEffect } from "react";




initializeAuthentication();



const useFirebase=()=>{
    const auth = getAuth();

    const [user,setUser]=useState({})
    const GoogleProvider = new GoogleAuthProvider();



    const signInWithGoolge=()=>{
        return  signInWithPopup(auth, GoogleProvider)
      }

    const registerWithEmailPass=(email,password,name,navigate)=>{
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                 // Signed in 
                //  console.log(userCredential.user);
                const newUser = {...userCredential.user,displayName:name}
                setUser(newUser) 
                // ...
                // sendEmailVerification(auth.currentUser)
                //  .then(() => {
                // Email verification sent!
                   // ...
            // });
                updateProfile(auth.currentUser, {
                    displayName: name
                  }).then(() => {
                  
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
            navigate(`/`)
           
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
        user,setUser,
        registerWithEmailPass,
        loginWithEmail,
        logOut,signInWithGoolge,
    }
}

export default useFirebase;