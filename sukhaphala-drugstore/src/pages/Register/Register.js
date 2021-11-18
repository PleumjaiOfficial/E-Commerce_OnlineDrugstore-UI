//rafce
import React, {Profiler, useEffect, useState} from 'react'
import classes from './Register.module.css'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../../components/Navbar/Navbar';
import DrugVdo from '../../Video/vdo-regis.mp4';
import axios from 'axios';
import InfoModal from '../../components/InfoModal/InfoModal';

const theme = createTheme({
  palette: {
    standard: {
      main: "#FF6543",
      contrastText: "#fff"
    }
  }
});

const Register = () =>  {

  const [basicInfo,setBasicInfo] = useState({
    firstname:'',
    lastname: '',
    email:    '',
    phone:    '',
  })

  const [address,setAddress] = useState({
    location: '',
    district: '',
    country: '',
    postcode: '',
  });

  const [credential,setCredential] = useState({
    password: '',
    re_password: '',
  });

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

  const handleSubmit = () => {
    //check 

    const createCustomer = () => {
      axios.post('http://localhost:5000/auth/register',
      {
        "firstname": basicInfo.firstname,
        "lastname": basicInfo.lastname,
        "password": credential.password,
        "email": basicInfo.email,
        "phone": basicInfo.phone,
          "address": {
              "location": address.location,
              "district": address.district,
              "country": address.country,
              "postcode": address.postcode
          }
      })
      .then(res => {
        // console.log(res.data);
        handleOpenInfo({
          type: 'SUCCESS',
          message: 'Successfully register your account, please login and get you medicines!'
        })
      })
      .catch(error => {
        handleOpenInfo(error.response.data);
      })
    }
    createCustomer();
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
            height: "130%",
            objectFit: "cover",
            zIndex: "-1",
            opacity: "20%"
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

            <Typography component="h2" variant="h3">
              Sign up
            </Typography>

            <Box component="form" noValidate sx={{ mt: 8}}>
              
              <Typography 
                component="h2" 
                variant="h6"
                color='gray'
              >
                BASIC INFO
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} >
                  <TextField
                    autoComplete="given-name"
                    name="FIRSTNAME"
                    required
                    fullWidth
                    id="FIRSTNAME"
                    label="FIRSTNAME"
                    autoFocus
                    value={basicInfo.firstname}
                    onChange={e => setBasicInfo({...basicInfo, firstname: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="SURNAME"
                    label="SURNAME"
                    name="SURNAME"
                    autoComplete="family-name"
                    value={basicInfo.lastname}
                    onChange={e => setBasicInfo({...basicInfo, lastname: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="EMAIL "
                    label="EMAIL ADDRESS"
                    name="EMAIL"
                    autoComplete="email"
                    value={basicInfo.email}
                    onChange={e => setBasicInfo({...basicInfo, email: e.target.value})}
                  />
                </Grid>

                 <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="PHONE NUMBER"
                    label="PHONE NUMBER"
                    name="PHONE NUMBER"
                    value={basicInfo.phone}
                    onChange={e => setBasicInfo({...basicInfo, phone: e.target.value})}
                  />
                </Grid>
              </Grid>
            </Box>


            <Box component="form" noValidate sx={{ mt: 8}}>              
              <Typography 
                component="h2" 
                variant="h6"
                color='gray'
              >
                ADDRESS
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="LOCATION"
                    label="LOCATION"
                    name="LOCATION"
                    value={address.location}
                    onChange={e => setAddress({...address, location: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="DISTRICT"
                    label="DISTRICT"
                    name="DISTRICT"
                    value={address.district}
                    onChange={e => setAddress({...address, district: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl sx={{ width: 400 }}>
                    <InputLabel id="demo-multiple-checkbox-label">COUNTRY</InputLabel>
                    <Select 
                      required
                      fullWidth
                      labelId="select-label"
                      id="select"
                      value={address.country}
                      label="COUNTRY"
                      onChange={e => setAddress({...address, country: e.target.value})}
                    >
                      <MenuItem value='thailand'> Thailand </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="POSTCODE"
                    label="POSTCODE"
                    name="POSTCODE"
                    value={address.postcode}
                    onChange={e => setAddress({...address, postcode: e.target.value})}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box component="form" noValidate sx={{ mt: 8}}>              
              <Typography 
                component="h2" 
                variant="h6"
                color='gray'
              >
                CREDENTIAL
              </Typography>

               <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="PASSWORD"
                    label="PASSWORD"
                    type="PASSWORD"
                    id="PASSWORD"
                    autoComplete="new-password"
                    value={credential.password}
                    onChange={e => setCredential({...credential, password: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="RE-ENTER PASSWORD"
                    label="RE-ENTER PASSWORD"
                    type="RE-ENTER PASSWORD"
                    id="RE-ENTER PASSWORD"
                    autoComplete="re-new-password"
                    value={credential.re_password}
                    onChange={e => setCredential({...credential, re_password: e.target.value})}
                  />
                </Grid>
              </Grid>
            </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2,borderRadius: 5  }}
                color="standard"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
          </Box>
        </Container>
      </ThemeProvider>

      <p>Check value</p>
      <p>firstname = {basicInfo.firstname}</p>
      <p>lastname = {basicInfo.lastname}</p>
      <p>password = {basicInfo.password}</p>
      <p>email = {basicInfo.email}</p>
      <p>phone = {basicInfo.phone}</p>

      <p>location = {address.location}</p>
      <p>district = {address.district}</p>
      <p>country = {address.country}</p>
      <p>postcode = {address.postcode}</p>

      <p>passaword = {credential.password}</p>
      <p>checkpassword = {credential.re_password}</p>
      
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

export default Register


