import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import classes from './Cart.module.css';
import Billing from '../../components/Billing/Billing';
import CartList from '../../components/CartList/CartList';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, getCartAsync } from '../../redux/actions/cartActions';

const Cart = () => {

  return (
    <>
      <Navbar />
      <div className={classes["cart-container"]}>
        <div className={classes["cart-header"]}>
          Your Medicines
        </div>

        <div className={classes["cart-info"]}>
          <div className={classes["cartlist-container"]}>
            <CartList />
          </div>

          <div className={classes["billing-container"]}>
            <Billing />
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Cart;
