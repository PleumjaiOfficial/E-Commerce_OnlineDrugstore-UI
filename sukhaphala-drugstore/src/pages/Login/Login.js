import React, {Profiler, useEffect, useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Navbar from '../../components/Navbar/Navbar';
import { NavLink } from 'react-router-dom';

import DrugVdo from '../../Video/demo-vdo.mp4';
import { positions } from '@mui/system';
import axios from 'axios';

const theme = createTheme({
  palette: {
    standard: {
      main: "#FF6543",
      contrastText: "#fff"
    }
  }
});

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: 'white',
    borderWidth: 2,
  },

  '& input:invalid + fieldset': {
    borderColor: 'white',
    borderWidth: 2,
  },

  '& input:valid:focus + fieldset': {
    borderLeftWidth: 6,
    padding: '4px !important', // override inline-style
  },
  
});


const Login = () => {

    const [login,setLogin] = useState({
      email: '',
      password: '',
    });

  const handleSubmit = () => {
    
    const getLogin = () => {
      axios.post('http://localhost:5000/auth/login',
      {
        "email": login.email,
        "password": login.password
      }).then(res => console.log(res) )
    }
    getLogin();
  };

  return (
    <>
      <Navbar />
      
      <video
          autoPlay
          loop
          muted
          style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: "-1",
              opacity: "80%",
          }}
      >
          <source src={DrugVdo} type="video/mp4" />
      </video>

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                  marginTop: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
              }}
            >

            <Typography 
                component="h2" 
                variant="h2"
                color='white'
              >
                  Hello ~
            </Typography>

            <Box component="form" noValidate sx={{ mt: 1 }}>

               <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="EMAIL"
                  label="EMAIL ADDRESS"
                  name="EMAIL"
                  autoComplete="email"
                  autoFocus
                  value={login.email}
                  onChange={e => setLogin({...login, email: e.target.value})}
              />

              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="PASSWORD"
                  label="PASSWORD"
                  type="PASSWORD"
                  id="PASSWORD"
                  autoComplete="current-password"
                  value={login.password}
                  onChange={e => setLogin({...login, password: e.target.value})}
              />

              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2,borderRadius: 5  }}
                  color="standard"
                  onClick={handleSubmit}
              >
                  Sign In
              </Button>

              <Grid container>  
                <Grid item>
                    <NavLink  to='/Register'>
                        {"Don't have an account? Sign Up"}
                    </NavLink>
                </Grid>
              </Grid>

            </Box>
          </Box>
        </Container>
      </ThemeProvider>

      <p>Check value</p>
      <p>email = {login.email}</p>
      <p>password = {login.password}</p>
    </>
  );
}

export default Login;
