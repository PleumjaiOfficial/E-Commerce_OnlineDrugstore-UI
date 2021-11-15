import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import classes from './AdminCreateProduct.module.css'
import axios from 'axios';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import HealthGoal from '../AdminComponent/HealthGoal/HealthGoal';
import Footer from '../../../components/Footer/Footer';

const AdminCreateProduct = () => {

    const handleSubmit = () => {

        //test
        // const newproduct = {
        //         "name": data.ProductName,
        //         "file": data.file,
        //         "description": data.ProductDesc,
        //         "price":data.Price,
        //         "remain":data.Remaining,
        //         "healthGoal":data.HealthGoal
        //     }
        // console.log(newproduct)

        if(checkEmply() === false)
        {
            alert("Don't filled out");
        }else{
            const CreateProduct = () => {

            axios.post('http://localhost:5000/products/',
            {
                "name": data.ProductName,
                "file": data.file,
                "description": data.ProductDesc,
                "price":data.Price,
                "remain":data.Remaining,
                "healthGoal":data.HealthGoal
            }, {withCredentials: true})
            .then(res => console.log(res) )
        }
        CreateProduct();

    //test
    // const newproduct = {
    //         "name": data.ProductName,
    //         "file": data.file,
    //         "description": data.ProductDesc,
    //         "price":data.Price,
    //         "remain":data.Remaining,
    //         "healthGoal":data.HealthGoal
    //     }
    // console.log(newproduct)

    if (checkEmply() === false) {
      alert("Don't filled out");
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
          })
          .then(res => console.log(res))
      }
      CreateProduct();

    }
  }

  const [data, setData] = useState({
    // initial state
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

  const [imagePreview, SetimagePreview] = useState(null);
  const handleUploadImage = (e) => {
    const file = e.target.files[0]
    console.log(e)
    console.log(file)
    //Keep name
    console.log(file.name)
    //Keep file
    console.log(file.type)

    const reader = new FileReader();
    reader.onloadend = (readerEvent) => {
      let binaryString = readerEvent.target.result
      console.log(readerEvent.target)
      console.log(btoa(binaryString))

      setData({
        ...data,
        file: {
          name: file.name,
          data: btoa(binaryString)
        }
      })
      SetimagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleAddHealthGoal = (e) => {
    if (!data.HealthGoal.includes(e.target.value)) {
      setData((old) => { return { ...old, HealthGoal: [...old.HealthGoal, e.target.value] } }
      )
    }
  }

  const handleDelHealthGoal = (e) => {
    setData((old) => {
      const newHealth = old.HealthGoal.filter(
        item => item !== e.target.value
      )
      return { ...old, HealthGoal: newHealth }
    })
  }

  const checkEmply = () => {
    if (data.ProductName && data.Price && data.Remaining && data.HealthGoal) {
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
        {/* <form onSubmit={handleSubmit}>     */}
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

            {/* <label for="Name"><h3>Product Name:</h3></label>
            <input type="text" name="Name" id="Name"
              className={classes["create-formgroup-name"]}
              placeholder="Product Name:"
              value={data.ProductName}
              onChange={e => setData({ ...data, ProductName: e.target.value })}
              required
            /> */}

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

            {/* <label for="Description"><h3>Product Description:</h3></label>
            <input type="text" name="Description" id="Description"
              className={classes["create-formgroup-description"]}
              placeholder="Product Description:"
              value={data.ProductDesc}
              onChange={e => setData({ ...data, ProductDesc: e.target.value })}
              required
            /> */}

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

            {/* <label for="Price">Price:</label>
            <input type="number" name="Price" id="Price"
              min="1"
              className={classes["create-formgroup-price"]}
              placeholder="Price:"
              value={data.Price}
              onChange={e => setData({ ...data, Price: parseInt(e.target.value) })}
              required
            />
            <span>Bath</span> */}

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
            {/* <label for="Remain">Product Remaining:</label>
            <input type="number" name="Remain" id="Remain"
              min="1"
              className={classes["create-formgroup-remain"]}
              placeholder="Remain:"
              value={data.Remaining}
              onChange={e => setData({ ...data, Remaining: parseInt(e.target.value) })}
              required
            />
            <span>Package</span> */}

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

            {/* <span>Heathgoal: </span>
            {data.HealthGoal.map(item =>
              <button key={item} onClick={handleDelHealthGoal} value={item}>
                {item} x
              </button>
            )} */}
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

            {/* <NavLink to='/AdminShop'>
              <button className={classes["cancel"]} >cancel</button>
            </NavLink>
            <button onClick={handleSubmit} className={classes["save"]}>
              save
            </button> */}

          </div>
        </div>

        {/* </form> */}

        {/* Test space */}
        {/* <p>
        {data.ProductName}  <br />
        {data.ProductDesc}  <br />
        {data.Price}        <br />
        {data.Remaining}    <br />
        {data.HealthGoal}   <br />
        {data.file.name}    <br />
        {data.file.data}    <br />
      </p> */}


      </div>
      <Footer />
    </>
  )
}

export default AdminCreateProduct
