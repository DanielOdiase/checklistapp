   
import React from "react"

import { useAuth } from "../firebase_config"
import { Navigate } from "react-router"


export default function Private({children}) {
  const { currentUser } = useAuth()
  
  return (
    
        !currentUser? children : <Navigate to="/" />
      
        
  )
}

  
  