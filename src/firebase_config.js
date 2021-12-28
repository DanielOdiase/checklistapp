import React,{useContext} from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from '@firebase/firestore';
import{getAuth,createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword,signOut,updateProfile} from '@firebase/auth'
import {getDownloadURL,getStorage,ref,uploadBytes} from '@firebase/storage'
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
  appId: "1:633470529340:web:0f285ba2b728cf07bb7839"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const db =getFirestore(app)
const storage=getStorage()



export default db



export function useAuth(){
  return useContext(AuthContext)
}
 //Storage
export async function upload(file,currentUser,setLoading,){
  
  const fileRef= ref(storage,currentUser.uid+ '.png');
  
  setLoading(true)
  await uploadBytes(fileRef,file);
  const photoURL= await getDownloadURL(fileRef)
  
  updateProfile(currentUser,{photoURL})
  setLoading(false)
  alert("Profile Picture Uploaded")
  }

const AuthContext=React.createContext()

export function AuthProvider({children}) {
  const [currentUser,setCurrentUser]=useState()
  const [loading,setLoading]=useState(true)

   function  signup(email,password){
    return createUserWithEmailAndPassword(auth,email,password)
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
