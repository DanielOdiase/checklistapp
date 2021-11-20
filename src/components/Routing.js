import { AuthProvider} from '../firebase_config'
import SignIn from './Signin/Signin'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import React from 'react'
import App from '../App'
import SignUp from './SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import Private from './Private'

function Routing(){
    return (
        
        <Router>
        <AuthProvider>
        <Routes>
        <Route
          path="/" element={ <PrivateRoute> <App /></PrivateRoute>}/>
              <Route
          path="/signin" element={ <Private> <SignIn/></Private>}/>
              
              <Route path="/signup" element={<SignUp/>} />
              
            </Routes>
            </AuthProvider>
            </Router> 
            
    )
}
export default Routing