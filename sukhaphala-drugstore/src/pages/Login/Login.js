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
import { display, positions } from '@mui/system';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../redux/actions/authenAction';

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

    const user = useSelector((state) => state.auth.user) //global state user
    const dispatch = useDispatch();

    const [login,setLogin] = useState({
      email: '',
      password: '',
    });

    //decode token function
    const decode = (codeSixFour) => {
      //split token
      console.log(codeSixFour)
      var text = codeSixFour.split(".");
        console.log(text);
        console.log(text[1]);

      //decode
      let str = text[1];
      let buff = new Buffer(str, 'base64');
      let base64ToStringNew = buff.toString('ascii');
        console.log(base64ToStringNew)

      //String to object
      console.log(JSON.parse(base64ToStringNew));
      let tokenObject = JSON.parse(base64ToStringNew)


      //sent object that decoded
      return tokenObject 
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const getLogin = () => {
        axios.post('http://localhost:5000/auth/login',
        {
          "email": login.email,
          "password": login.password
        })
        .then(res => { alert('success')
            Cookies.set('token',res.data.token); 
              console.log(res.data)
              console.log(res.data.token)
              // decode(res.data.token)
              // dispatch(setAuth(res.data))
              dispatch(setAuth(decode(res.data.token)))
        })
        .catch((error) => alert('บ่ถูก'))
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
