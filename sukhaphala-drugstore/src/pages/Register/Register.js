import React, {useState} from 'react'
import axios from 'axios';
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
import InfoModal from '../../components/InfoModal/InfoModal';

// theme for use on material UI
const theme = createTheme({
  palette: {
    standard: {
      main: "#FF6543",
      contrastText: "#fff"
    }
  }
});

const Register = () =>  {

  //state of basic information
  const [basicInfo,setBasicInfo] = useState({
    firstname:'',
    lastname: '',
    email:    '',
    phone:    '',
  })
  //state error case of basic information
  const [firstnameError,setFirstnameError] = useState(false)
  const [lastnameError,setLastnameError] = useState(false)
  const [emailError,setEmailError] = useState(false)
  const [phoneError,setPhoneError] = useState(false)

  //state of address information
  const [address,setAddress] = useState({
    location: '',
    district: '',
    country: '',
    postcode: '',
  });

  //state of credential
  const [credential,setCredential] = useState({
    password: '',
    re_password: '',
  });
  //state error case of credential
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
    //first all of textboxs are require
    //if null, will set state error 'true'

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //correct format of email
    if(basicInfo.firstname == ''){ 
      setFirstnameError(true)
    } else {setFirstnameError(false)}

    if(basicInfo.lastname == ''){ 
      setLastnameError(true)
    } else {setLastnameError(false)}

    if(basicInfo.email == '' || !(basicInfo.email.match(mailformat))){ //not null and focus on format
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

    //password should to same in re-writing password
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
        axios.post('http://localhost:5000/auth/register', //post data in state to API
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

  //state for show password (eyeicon)
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

  //phone must only 10 digit and focus on format (xxx)xxxxxxx
  const handleChangePhone = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    if (onlyNums.length < 10) {
        setBasicInfo({...basicInfo, phone: onlyNums});
    } else if (onlyNums.length === 10) {
        const number = onlyNums.replace(
            /(\d{3})(\d{3})(\d{4})/,
            '($1) $2-$3'
        );
         setBasicInfo({...basicInfo, phone: number});
    }
  } 

  //postcode only 5 digit
  const handleChangePostcode = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    if (onlyNums.length <= 5) {
        const numsPostcode = onlyNums.replace(
            /(\d{5})/,
            '$1'
        );
         setAddress({...address, postcode: numsPostcode});
    }
  } 

  return (
    <>
      <Navbar />
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
                    id="PHONE NUMBER"
                    label="PHONE NUMBER"
                    name="PHONE NUMBER"
                    value={basicInfo.phone}
                    onChange={handleChangePhone}
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
                    fullWidth
                    id="POSTCODE"
                    label="POSTCODE"
                    name="POSTCODE"
                    value={address.postcode}
                    onChange={handleChangePostcode}
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


