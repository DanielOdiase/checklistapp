import { AuthProvider} from '../firebase_config'
import SignIn from './Signin/Signin'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import React from 'react'
import App from '../App'
import SignUp from './SignUp/SignUp'
import PrivateRoute from './PrivateRoute'


function Routing(){
    return (
        
        <Router>
        <AuthProvider>
        <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route
          path="/signin" element={ <SignIn/>}/>
        <Route
          path="/app" element={ <PrivateRoute> <App /></PrivateRoute>}/>
           
            </Routes>
            </AuthProvider>
            </Router> 
            
    )
}
export default Routing