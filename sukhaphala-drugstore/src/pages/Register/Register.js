import React, {useState} from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
  const [firstnameError,setFirstnameError] = useState(false)
  const [lastnameError,setLastnameError] = useState(false)
  const [emailError,setEmailError] = useState(false)
  const [phoneError,setPhoneError] = useState(false)
  const [phoneErrorFormat,setPhoneErrorFormat] = useState(false)


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
  const [passwordError,setPasswordError] = useState(false)
  const [rePasswordError,setRePasswordError] = useState(false)

  
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

    

    //check basic-info error
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(basicInfo.firstname == ''){
      setFirstnameError(true)
    } else {setFirstnameError(false)}

    if(basicInfo.lastname == ''){
      setLastnameError(true)
    } else {setLastnameError(false)}

    if(basicInfo.email == '' || !(basicInfo.email.match(mailformat))){
      setEmailError(true)
    }else{
      setEmailError(false)
    }

    if(basicInfo.phone == ''){
      setPhoneError(true)
    }else {
      setPhoneError(false)
    }

    //check credential error
    if(credential.password == ''){
      setPasswordError(true)
    } else {(setPasswordError(false))}

    if(credential.re_password == ''){
      setRePasswordError(true)
    } else {setRePasswordError(false)}

    if(credential.password !== credential.re_password){
      setRePasswordError(true)
       handleOpenInfo({
          type: 'FAIL',
          message: 'Password don\'t match'
        })
    } 
    else {
      setRePasswordError(false)
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
          handleOpenInfo({
            type: 'SUCCESS',
            message: 'Successfully register your account, please login and get you medicines!'
          })
        })
        .catch(error => {
          console.log(error.response.data);
          handleOpenInfo(error.response.data);
        })
      }
      createCustomer();
    }
  };

  const [ showPassword, setShowPassword ] = useState(false);
  const [ showRePassword, setShowRePassword ] = useState(false);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  }
  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  }
  const handleClickShowRePassword = () => {
    setShowRePassword(prev => !prev);
  }

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
                    error = {firstnameError}
                    helperText= {firstnameError && "Invalid field"}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="LASTNAME"
                    label="LASTNAME"
                    name="LASTNAME"
                    autoComplete="family-name"
                    value={basicInfo.lastname}
                    onChange={e => setBasicInfo({...basicInfo, lastname: e.target.value})}
                    error = {lastnameError}
                    helperText= {lastnameError && "Invalid field"}
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
                    error = {emailError}
                    helperText={emailError && "user@mail"}
                  />
                </Grid>

                 <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    id="PHONE NUMBER"
                    label="PHONE NUMBER"
                    name="PHONE NUMBER"
                    value={basicInfo.phone}
                    onChange={e => setBasicInfo({...basicInfo, phone: e.target.value})}
                    error = {phoneError}
                    helperText= {phoneError && "Phone were number and 10-digit."}
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
                    // required
                    fullWidth
                    id="LOCATION"
                    label="LOCATION"
                    name="LOCATION"
                    value={address.location}
                    onChange={e => setAddress({...address, location: e.target.value})}
                    // error={locationError}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    // required
                    fullWidth
                    id="DISTRICT"
                    label="DISTRICT"
                    name="DISTRICT"
                    value={address.district}
                    onChange={e => setAddress({...address, district: e.target.value})}
                    // error={districtError}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl sx={{ width: 400 }}>
                    <InputLabel id="demo-multiple-checkbox-label">COUNTRY</InputLabel>
                    <Select 
                      // required
                      fullWidth
                      labelId="select-label"
                      id="select"
                      value={address.country}
                      label="COUNTRY"
                      onChange={e => setAddress({...address, country: e.target.value})}
                      // error={countryError}
                    >
                      <MenuItem value='thailand'> Thailand </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    // required
                    fullWidth
                    id="POSTCODE"
                    label="POSTCODE"
                    name="POSTCODE"
                    value={address.postcode}
                    onChange={e => setAddress({...address, postcode: e.target.value})}
                    // error={postcodeError}
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
                    type={showPassword ? "text" : "password"}
                    id="PASSWORD"
                    autoComplete="new-password"
                    value={credential.password}
                    onChange={e => setCredential({...credential, password: e.target.value})}
                    error={passwordError}
                    helperText= {passwordError && "Invalid field"}
                     
                    InputProp={{
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
                  
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="RE-ENTER PASSWORD"
                    label="RE-ENTER PASSWORD"
                    type={showRePassword ? "text" : "password"}
                    id="RE-ENTER PASSWORD"
                    autoComplete="re-new-password"
                    value={credential.re_password}
                    onChange={e => setCredential({...credential, re_password: e.target.value})}
                    error={rePasswordError}
                    helperText= {rePasswordError && "Password not match"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowRePassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showRePassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
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

      {/* <p>Check value</p>
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
      <p>checkpassword = {credential.re_password}</p> */}
      
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


