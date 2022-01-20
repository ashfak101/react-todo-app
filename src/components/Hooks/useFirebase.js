import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile,onAuthStateChanged, signOut } from "firebase/auth";
import { useState,useEffect } from "react";




initializeAuthentication();



const useFirebase=()=>{
    const auth = getAuth();

    const [user,setUser]=useState({})


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
        logOut
    }
}

export default useFirebase;