import React, { useEffect, useState, useRef } from 'react'
import { useParams } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Navbar from '../../components/Navbar/Navbar';
import classes from './AdminEditShop.module.css';
import HealthGoal from '../../components/HealthGoal/HealthGoal';
import Footer from '../../components/Footer/Footer';
import InfoModal from '../../components/InfoModal/InfoModal';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { Redirect } from 'react-router-dom';

export const AdminEditShop = () => {
  const [openInfoEdit, setOpenInfoEdit] = useState(false);
  const [infoModalEdit, setInfoModalEdit] = useState({
    status: '',
    title: '',
    detail: ''
  });

  const handleCloseInfoEdit = () => {
    setOpenInfoEdit(false);
  }

  const handleOpenInfoEdit = (data) => {
    if (data.type === 'FAIL') {
      setInfoModalEdit({
        status: data.type,
        title: 'ERROR',
        detail: data.message
      })
    } else if (data._id) {
      setInfoModalEdit({
        status: 'SUCCESS',
        title: 'SUCCESS',
        detail: 'Successfully edit new product.'
      })
    }

    setOpenInfoEdit(true);
  }

  //use this state to indicate that this product was removed successfully
  const [isRemoved, setIsRemoved] = useState(false); 

  //modal delete product
  const [openConfirmDel, setOpenConfirmDel] = useState(false);
  const [openInfoDel, setOpenInfoDel] = useState(false);
  const [infoModalDel, setInfoModalDel] = useState({
    status: '',
    title: '',
    detail: ''
  });

  //use this variable to track if it is the first render to prevent useeffect make the popup
  const mount = useRef(false);

  const handleCloseConfirmDel = () => {
    setOpenConfirmDel(false);
  }

  const handleOpenInfoDel = (data) => {
    if (data.type === 'FAIL') {
      setInfoModalDel({
        status: 'FAIL',
        title: 'Error',
        detail: data.message
      });
    } else if (data.type === 'SUCCESS') {
      setInfoModalDel({
        status: 'SUCCESS',
        title: 'SUCCESS',
        detail: 'Successfully remove a product'
      });
    }
    setOpenInfoDel(true);
  }
  //close info modal
  //if removed successfully, redirect to /AdminShop 
  const handleCloseInfoDel = () => {
    setOpenInfoDel(false);
    if (infoModalDel.status === 'SUCCESS') {
      setIsRemoved(true);
    }
  }

  const handleDel = () => {
    setOpenConfirmDel(true);
  }

  const handleDeleteProduct = () => {
    // delProduct();
    handleCloseConfirmDel();
    axios.delete('http://localhost:5000/products/' + id, { withCredentials: true })
    .then(res => {
      handleOpenInfoDel(res.data);
    }).catch(error => {
      handleOpenInfoDel(error.response.data);
    });
  }

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [healthgoals, setHealthGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initial state of product that want to edit
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

  useEffect(() => {
    axios.get('http://localhost:5000/products/' + id)
      .then(res => {
          setData(res.data);

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

  //submit edit shop
  const handleSubmit = (e) => {
    if (product.HealthGoal.length === 0) {
      handleOpenInfoEdit({
        type: 'FAIL',
        message: 'The product must have at least 1 healh goal'
      });
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
            .then(res => {
              handleOpenInfoEdit(res.data);
            })
            .catch(error => {
              handleOpenInfoEdit(error.response.data);
            });
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

  if (isRemoved) {
    return <Redirect to='/AdminShop' />
  }
  return (
    <>
      <Navbar />
      <div className={classes["productdetail-container"]}>
        <div className={classes["edit-image"]}>
          
          {/* before add image show default image first */}
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
                onClick={handleDel}
                variant="contained"
                size="large"
                color="error"
                fullWidth={true}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal of Edit Product */}
      <InfoModal
        open={openInfoEdit}
        onClose={handleCloseInfoEdit}
        status={infoModalEdit.status}
        title={infoModalEdit.title}
        detail={infoModalEdit.detail}
        buttonText='OK'
        buttonAction={handleCloseInfoEdit}
      />

      
      {/* Modal of Delete Product */}
      <ConfirmModal
        open={openConfirmDel}
        onClose={handleCloseConfirmDel}
        title='Are you sure?'
        detail='Press confirm to remove a product'
        buttonConfirmText='Confirm'
        buttonCancelText='Cancel'
        buttonConfirm={() => handleDeleteProduct()} 
        buttonCancel={handleCloseConfirmDel}
      />

      
      <InfoModal
        open={openInfoDel}
        onClose={handleCloseInfoDel}
        status={infoModalDel.status}
        title={infoModalDel.title}
        detail={infoModalDel.detail}
        buttonText='OK'
        buttonAction={handleCloseInfoDel}
      />


      <Footer />
    </>
  )
}

export default AdminEditShop;
