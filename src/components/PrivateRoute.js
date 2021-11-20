
   
import React from "react"

import { useAuth } from "../firebase_config"
import { Navigate } from "react-router"
import App from "../App"
export default function PrivateRoute({component:Component}) {
  const { currentUser } = useAuth()
  
  return (
    
        currentUser ? <App/>: <Navigate to="/signin" />
      
        
  )
}

  
  