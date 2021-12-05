import React, {useState} from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { setAuth } from '../../redux/actions/authenAction';
import InfoModal from '../../components/InfoModal/InfoModal';
import Navbar from '../../components/Navbar/Navbar';
import classes from './Login.module.css';

const theme = createTheme({
  palette: {
    standard: {
      main: "#FF6543",
      contrastText: "#fff"
    }
  }
});

const Login = () => {

    //dispatch for redux action
    const dispatch = useDispatch();

    //state for login
    const [login,setLogin] = useState({
      email: '',
      password: '',
    });

    const [ showPassword, setShowPassword ] = useState(false);
    const handleMouseDownPassword = (e) => {
      e.preventDefault();
    }
    const handleClickShowPassword = () => {
      setShowPassword(prev => !prev);
    }

    //state of modal: false -> close modal, true -> open modal
    const [ openInfo, setOpenInfo ] = useState(false);
    //infomation of the modal
    const [ infoModal, setInfoModal ] = useState({
      status: '',
      title: '',
      detail: ''
    });

    const handleCloseInfo = () => {
      setOpenInfo(false);
    }

    const handleOpenInfo = (data) => {
      setInfoModal({
        status: data.type,
        title: data.type,
        detail: data.message
      });
      setOpenInfo(true);
    }

    //function decode token 
    const decode = (codeSixFour) => {

      //split token
      var text = codeSixFour.split(".");

      //decode base64 to string
      let str = text[1]; //string to decode on the middle base64
      let buff = new Buffer(str, 'base64'); //buff variable for create base64string
      let base64ToStringNew = buff.toString('ascii');

      //String to object
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
        .then(res => { 
          Cookies.set('token',res.data.token);  //set cookie 
          dispatch(setAuth(decode(res.data.token))) //use dispath setAuth for set authentication
        })
        .catch((error) => {
            handleOpenInfo(error.response.data);
        })
      }
      getLogin();
    };

  return (
    <>
      <Navbar />
      
      <div className={classes['login-container']}>
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
                  color='black'
                >
                    Hello ~
              </Typography>

              <Box component="form" noValidate sx={{ mt: 1 }}>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="email"
                    id="EMAIL"
                    label="EMAIL ADDRESS"
                    name="EMAIL"
                    // autoComplete="email"
                    autoFocus
                    value={login.email}
                    onChange={e => setLogin({...login, email: e.target.value})}
                />

                <TextField
                    required
                    fullWidth
                    name="PASSWORD"
                    label="PASSWORD"
                    type={showPassword ? "text" : "password"}
                    id="PASSWORD"
                    autoComplete="new-password"
                    value={login.password}
                    onChange={e => setLogin({...login, password: e.target.value})}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
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
      </div>

      <InfoModal
          open={openInfo}
          onClose={handleCloseInfo}
          status={infoModal.status}
          title={infoModal.title}
          detail={infoModal.detail}
          buttonText='OK'
          buttonAction={handleCloseInfo}
      />
    </>
  );
}

export default Login;
