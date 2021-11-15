import React, { Profiler, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Navbar from '../../../components/Navbar/Navbar';
import classes from './AdminEditShop.module.css';
import HealthGoal from '../AdminComponent/HealthGoal/HealthGoal';
import Footer from '../../../components/Footer/Footer';

export const AdminEditShop = () => {

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [healthgoals, setHealthGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // //fix
  const [product, setProduct] = useState({
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
  console.log(product)

  useEffect(() => {
    axios.get('http://localhost:5000/products/' + id)
      .then(res => {
        // console.log(res);
        setData(res.data);
        console.log(res.data);

        setProduct({
          ProductName: res.data.name,

          file: {
            name: '',
            data: '',
          },

          ProductDesc: res.data.description,
          Price: res.data.price,
          Remaining: res.data.remain,
          HealthGoal: res.data.healthGoal
        })
      })

      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false);
      });
  }, [])

  console.log(data);
  console.log(product);

  async function delProduct() {
    try {
      const res = await axios.delete('http://localhost:5000/products/' + id, { withCredentials: true })
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }


  function handleSubmit(e) {
    // e.preventDefault();
    if (product.HealthGoal.length === 0) {
      alert(" เฮลโกลบ่ครบแน บักง่าว!!!")
    }
    else {
      async function updateProduct() {
        try {
          const res = await axios.put('http://localhost:5000/products/' + id,
          {
            "name": product.ProductName,
            "file": product.file,
            "image": data.image,
            "description": product.ProductDesc,
            "price": product.Price,
            "remain": product.Remaining,
            "healthGoal": product.HealthGoal
          }, { withCredentials: true })
          console.log(res)
        } catch (err) {
          console.log(err)
        }
      }
      updateProduct();
    }
  }


const resetInput = (e) => {
  e.target.value = "";
}

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

    setProduct({
      ...product,
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
  if (!product.HealthGoal.includes(e.target.value)) {
    setProduct((old) => { return { ...old, HealthGoal: [...old.HealthGoal, e.target.value] } }
    )
  }
}

const handleDelHealthGoal = (e) => {
  setProduct((old) => {
    const newHealth = old.HealthGoal.filter(
      item => item !== e.target.value
    )
    return { ...old, HealthGoal: newHealth }
  })
}

if (loading) {
  return <p>Data is loading...</p>;
}

return (
  <>
    <Navbar />
    <div className={classes["productdetail-container"]}>
      {/* <form onSubmit={handleSubmit}>     */}
      <div className={classes["edit-image"]}>
        {/* <img src={data.image} /> */}
        <input type="file" onChange={handleUploadImage} />
        <img src={imagePreview ? imagePreview : data.image} />
      </div>

      <div className={classes["edit-content"]}>
        {/* Edit Name */}
        <div className={classes["create-formgroup"]}>
          <p>Product Name:</p>
          <TextField
            fullWidth
            id="Name"
            type="text"
            variant="outlined"
            size="normal"
            placeholder={data.name}
            value={product.ProductName}
            onFocus={(e) => resetInput(e)}
            onChange={e => setProduct({ ...product, ProductName: e.target.value })}
          />

          {/* <label for="Name"><p>Product Name :</p></label>
            <input type="text" name="Name" id="Name"
              className={classes["create-formgroup-name"]}
              placeholder={data.name}
              value={product.ProductName}
              onFocus={(e) => resetInput(e)}
              onChange={e => setProduct({ ...product, ProductName: e.target.value })}
            /> */}

        </div>

        {/* Edit Description */}
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
            placeholder={data.description}
            value={product.ProductDesc}
            onFocus={(e) => resetInput(e)}
            onChange={e => setProduct({ ...product, ProductDesc: e.target.value })}
          />

          {/* <label for="Description"><p>Product Description :</p></label>
            <input type="text" name="Description" id="Description"
              className={classes["create-formgroup-description"]}
              placeholder={data.description}
              value={product.ProductDesc}
              onFocus={(e) => resetInput(e)}
              onChange={e => setProduct({ ...product, ProductDesc: e.target.value })}
            /> */}
        </div>

        {/* Edit Price */}
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
            placeholder={data.price}
            value={product.Price}
            onFocus={(e) => resetInput(e)}
            onChange={e => setProduct({ ...product, Price: parseInt(e.target.value) })}
          />

          {/* <label for="Price">Price :</label>
            <input type="number" name="Price" id="Price"
              className={classes["create-formgroup-price"]}
              placeholder={data.price}
              value={product.Price}
              onFocus={(e) => resetInput(e)}
              onChange={e => setProduct({ ...product, Price: parseInt(e.target.value) })}
            />
            <span>Bath</span> */}
        </div>

        {/* Edit Product Remaining */}
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
            placeholder={data.remain}
            value={product.Remaining}
            onFocus={(e) => resetInput(e)}
            onChange={e => setProduct({ ...product, Remaining: e.target.value })}
          />

          {/* <label for="Remain">Product Remaining :</label>
            <input type="text" name="Remain" id="Remain"
              className={classes["create-formgroup-remain"]}
              placeholder={data.remain}
              value={product.Remaining}
              onFocus={(e) => resetInput(e)}
              onChange={e => setProduct({ ...product, Remaining: e.target.value })}
            />
            <span>Package</span> */}
        </div>

        {/* Add Health Goal */}
        <div className={classes["create-formgroup"]}>
          <p>Add Heath Goal:</p>
          <HealthGoal onChange={handleAddHealthGoal} />
        </div>

        {/*Show Health Goal*/}
        <div className={classes["create-formgroup-healthgoal"]}>
          <p>Heath Goal:</p>
          <div className={classes["healthgoal-list"]}>
            {product.HealthGoal.map(item =>
              // <button key={item} onClick={handleDelHealthGoal} value={item}>
              //   {item} x
              // </button>
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

        {/*Submit Button*/}
        <div className={classes["submit-container"]}>
          <div className={classes["submit-save-cancel"]}>
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
                component={NavLink}
                to='/AdminShop'
                onClick={handleSubmit}
                variant="contained"
                size="large"
                color="primary"
                fullWidth={true} >
                Save
              </Button>
            </div>
          </div>

          <div className={classes["submit-remove"]}>
            <Button
              onClick={delProduct}
              variant="contained"
              size="large"
              color="error"
              fullWidth={true}>
              Remove
            </Button>
          </div>
        </div>
      </div>


      {/* </form> */}

      {/* <p>
          {data.image}       | {product.Image}    <br />
          {data.name} | {product.ProductName}  <br />
          {data.description} | {product.ProductDesc} <br />
          {data.price}       | {product.Price} <br />
          {data.remain}   | {product.Remaining} <br />
          {data.healthGoal}   | {product.HealthGoal} <br />
        </p> */}

    </div>


    <Footer />
  </>
)
}

export default AdminEditShop;
