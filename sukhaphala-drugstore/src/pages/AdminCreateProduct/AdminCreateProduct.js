import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Navbar from '../../components/Navbar/Navbar';
import HealthGoal from '../../components/HealthGoal/HealthGoal';
import Footer from '../../components/Footer/Footer';
import InfoModal from '../../components/InfoModal/InfoModal';
import classes from './AdminCreateProduct.module.css'

const AdminCreateProduct = () => {

  //state for modal
  const [ openInfo, setOpenInfo ] = useState(false);
  const [infoModal, setInfoModal] = useState({
    status: '',
    title: '',
    detail: ''
  });

  const handleCloseInfo = () => {
    setOpenInfo(false);
  }

  const handleOpenInfo = (data) => {
    if (data.type === 'FAIL') {
      setInfoModal({
        status: data.type,
        title: 'ERROR',
        detail: data.message
      })
    } else if (data._id) {
      setInfoModal({
        status: 'SUCCESS',
        title: 'SUCCESS',
        detail: 'Successfully add new product.'
      })
    }
    setOpenInfo(true);
  }

  // Initial state of product that want to create
  const [data, setData] = useState({
    ProductName: '',

    file: {
      name: '',
      data: '',
    },

    ProductDesc: '',
    Price: '',
    Remaining: '',
    HealthGoal: []
  });

  const [imagePreview, setImagePreview] = useState(null);
  const handleUploadImage = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader();

    reader.onloadend = (readerEvent) => {
      let binaryString = readerEvent.target.result

      //overwrite to file in data state 
      setData({
        ...data,
        file: {
          name: file.name,
          data: btoa(binaryString)
        }
      })
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    if (checkEmply() === false) {
      handleOpenInfo({
        type: 'FAIL',
        message: 'Please fill all required fields include: product name, price, remaining'
      });
    } else {
      const CreateProduct = () => {

        axios.post('http://localhost:5000/products/',
          {
            "name": data.ProductName,
            "file": data.file,
            "description": data.ProductDesc,
            "price": data.Price,
            "remain": data.Remaining,
            "healthGoal": data.HealthGoal
          }, { withCredentials: true })
          .then(res => { 
            handleOpenInfo(res.data);
            setData({
              ProductName: '',
              file: {
                name: '',
                data: '',
              },
              ProductDesc: '',
              Price: '',
              Remaining: '',
              HealthGoal: []
            })
          }).catch(error => {
            handleOpenInfo(error.response.data);
          });
      }
      CreateProduct();
    }
  }

  const handleAddHealthGoal = (e) => {
    if (!data.HealthGoal.includes(e.target.value)) {
      setData((old) => 
        { return { ...old, HealthGoal: [...old.HealthGoal, e.target.value] } }
      )
    }
  }

  const handleDelHealthGoal = (e) => {
    setData((old) => 
    {
      const newHealth = old.HealthGoal.filter(
        item => item !== e.target.value
      )
      return { ...old, HealthGoal: newHealth }
    })
  }

  const checkEmply = () => {
    if (data.ProductName && data.Price && data.Remaining && data.HealthGoal.length !== 0) {
      return true;
    }
    else {
      return false;
    }
  }

  return (
    <>
      <Navbar />

      <div className={classes["productdetail-container"]}>
        <div className={classes["create-image"]}>
          <input type="file" onChange={handleUploadImage} />
          <img src={imagePreview ? imagePreview : 'http://localhost:5000/images/default-image.jpg'} />

        </div>

        <div className={classes["create-content"]}>

          {/* Create Product Name */}
          <div className={classes["create-formgroup"]}>

            <p>Product Name:</p>
            <TextField
              fullWidth
              id="Name"
              type="text"
              variant="outlined"
              size="normal"
              value={data.ProductName}
              onChange={e => setData({ ...data, ProductName: e.target.value })}
              required
            />
          </div>

          {/* Create Product Description */}
          <div className={classes["create-formgroup"]}>
            <p>Product Description:</p>
            <TextField
              fullWidth
              id="Description"
              type="text"
              variant="outlined"
              size="small"
              multiline
              rows={2}
              value={data.ProductDesc}
              onChange={e => setData({ ...data, ProductDesc: e.target.value })}
            />
          </div>

          {/* Create Product Price */}
          <div className={classes["create-formgroup-number"]}>
            <p>Price:</p>
            <TextField
              fullWidth
              id="Price"
              type="number"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="start">Baht</InputAdornment>,
              }}
              value={data.Price}
              onChange={e => setData({ ...data, Price: parseInt(e.target.value) })}
              required
            />
          </div>

          {/* Create Product Remaining */}
          <div className={classes["create-formgroup-number"]}>
            <p>Remaining Amount:</p>
            <TextField
              fullWidth
              id="Remain"
              type="number"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="start">Packages</InputAdornment>,
              }}
              value={data.Remaining}
              onChange={e => setData({ ...data, Remaining: e.target.value })}
              required
            />
          </div>

          {/* Create Product Health Goal */}
          <div className={classes["create-formgroup"]}>
            <p>Add heathgoal</p>
            <HealthGoal onChange={handleAddHealthGoal} />
          </div>

          {/* Show Health Goal */}
          <div className={classes["create-formgroup-healthgoal"]}>

            <p>Heath Goal:</p>
            <div className={classes["healthgoal-list"]}>
              {data.HealthGoal.map(item =>
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  key={item}
                  onClick={handleDelHealthGoal}
                  value={item} >
                  {item} X
                </Button>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className={classes["submit-container"]}>
            <div className={classes["submit-cancel"]}>
              <Button
                component={NavLink}
                to='/AdminShop'
                variant="contained"
                size="large"
                color="inherit"
                fullWidth={true}>
                Cancel
              </Button>
            </div>

            <div className={classes["submit-save"]}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                size="large"
                color="primary"
                fullWidth={true} >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

        <InfoModal 
          open={openInfo}
          onClose={handleCloseInfo}
          status= {infoModal.status}
          title= {infoModal.title}
          detail= {infoModal.detail}
          buttonText='OK'
          buttonAction={handleCloseInfo}
        />
      <Footer />
    </>
  )
}

export default AdminCreateProduct;
