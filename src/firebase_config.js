import React,{useContext} from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from '@firebase/firestore';
import{getAuth,createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword,signOut} from '@firebase/auth'
import { useState ,useEffect} from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOv0QvX93uHb8GIh7L5U9YL0grYkSwNFU",
  authDomain: "checklistapp-2af94.firebaseapp.com",
  projectId: "checklistapp-2af94",
  storageBucket: "checklistapp-2af94.appspot.com",
  messagingSenderId: "633470529340",
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const db =getFirestore(app)
export default db



export function useAuth(){
  return useContext(AuthContext)
}
 


const AuthContext=React.createContext()

export function AuthProvider({children}) {
  const [currentUser,setCurrentUser]=useState()
  const [loading,setLoading]=useState(true)

   function  signup(email,password){
    return createUserWithEmailAndPassword(auth,email,password);
   }
   function  signin(email,password){
    return signInWithEmailAndPassword(auth,email,password);
   }
   function logout(){
    return signOut(auth)
   }

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,user => {
      setCurrentUser(user)
      setLoading(false)
    }) 
    return unsubscribe
  }, [])
  

  const value={
    currentUser,
    signup,
    signin,
    logout
  }
    return (
           <AuthContext.Provider value={value}>
          {!loading &&
          children}
           </AuthContext.Provider> 
        
    )
}
