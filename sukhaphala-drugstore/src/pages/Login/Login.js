// import React from 'react'

// const Login = () => {
//     return (
//         <>
//             เข้าไม่ได้ครับมีคนจองแล้ว
//         </>
//     )
// }

// export default Login;

import * as React from 'react';
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

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

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
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
            opacity: "90%"
        }}
    >
        <source src={DrugVdo} type="video/mp4" />
    </video>

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

            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar> */}

            <Typography 
                component="h2" 
                variant="h1"
                color='white'
            >
                Sign in
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 8 }}>

                <ValidationTextField
                    margin="normal"
                    required
                    fullWidth
                    id="EMAIL"
                    label="EMAIL ADDRESS"
                    name="EMAIL"
                    autoComplete="email"
                    autoFocus
                />

                <ValidationTextField
                    margin="normal"
                    required
                    fullWidth
                    name="PASSWORD"
                    label="PASSWORD"
                    type="PASSWORD"
                    id="PASSWORD"
                    autoComplete="current-password"
                />

                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                /> */}

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2,borderRadius: 5  }}
                    color="standard"
                >
                    Sign In
                </Button>

                <Grid container>
                {/* <Grid item xs>
                    <Link href="#" variant="body2">
                    Forgot password?
                    </Link>
                </Grid> */}
                
                <Grid item>
                    <NavLink  to='/Register'>
                        {"Don't have an account? Sign Up"}
                    </NavLink>
                    
                </Grid>

                </Grid>
            </Box>
            </Box>

            {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}

        </Container>
        </ThemeProvider>
    </>
  );
}

export default Login;
