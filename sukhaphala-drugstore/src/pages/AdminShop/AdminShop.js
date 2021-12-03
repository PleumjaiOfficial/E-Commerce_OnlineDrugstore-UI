import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import image from '../../image/HeaderBackground.jpg';
import Sidebar from '../../components/Sidebar/Sidebar';
import Product from '../../components/Product/Product';
import classes from './AdminShop.module.css';
import Footer from '../../components/Footer/Footer';

export const AdminShop = () => {

  //state for data
  const [data, setData] = useState([]);


  //get data from API
  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => {
        setData(res.data) //if get success set ti state Data
      })
      .catch(err => {
        console.log(err)
      });
  }, [])

  return (
    <>
      <Navbar />
      <div className={classes["shop-title"]}>
        <img src={image} className={classes["background-img"]} />
        <div className={classes["title-info"]}>
          <h1>Manage Product</h1>
          <p>Add, Modify, and Delete Every Products</p>
        </div>

      </div>

      <div className={classes["shop-container"]}>
        <div className={classes["sidebar"]}>
          <Sidebar />
        </div>
        <div className={classes["shop-product"]}>
          {
            // map data state that geted from API
            data.map(i=>(
              <Product
                id={i._id}
                title={i.name}
                price={i.price}
                img={i.image}
                desc={i.description}
              />
            ))
          }
        </div>
      </div>
      <Footer />
    </>
  )
}
