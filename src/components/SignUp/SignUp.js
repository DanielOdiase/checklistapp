import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { useAuth } from '../../firebase_config';
import { useRef } from 'react';
import { useState } from 'react';
import db from '../../firebase_config';
import { collection,addDoc} from '@firebase/firestore';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      
      <Link >
        CheckList App
        </Link>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
    const[loading,setLoading]=useState(false)
    const {signup,currentUser}=useAuth()
    const emailRef = useRef()
    const navigate= useNavigate() 
     const passwordRef = useRef()
     const [namestate, setnamestate] = useState("")
     const [emailstate, setemailstate] = useState("")
     const [occupationState, setOccupationState] = useState("")

     async function addName(){
   const nameRef = collection(db,"users");
   const payload= {name:namestate,
   email:emailstate.toLowerCase(),
   occupationState:occupationState};
    setLoading(true)
    await addDoc(nameRef,payload)
    setnamestate("")
    setOccupationState("")
    setLoading(false)
    }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    try{
        await signup(emailRef.current.value,passwordRef.current.value)
        navigate("/signin")
        addName()

    }catch{
        alert("Invalid email/password ,please ensure your password is over 6 charaters")
    }
   setLoading(false)
   
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
         
          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Name"
              name="name"
              value={namestate}
              onChange={(e)=>setnamestate(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Occupation"
              name="name"
              value={occupationState}
              onChange={(e)=>setOccupationState(e.target.value)}
              autoComplete="email"
              autoFocus
            />
          <Box component="form" disabled={loading} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              inputRef={emailRef}
              onChange={()=>setemailstate(emailRef.current.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              inputRef={passwordRef}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <p>Password has to be more than six(6) characters</p>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up 
            </Button>
            <p>{currentUser?"You are signed in":""}</p>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
              <NavLink to ="/signin">
                Already Have an Account? SignIn
               </NavLink>
              </Grid>
              
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}