import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import classes from './Cart.module.css';
import Billing from '../../components/Billing/Billing';
import CartList from '../../components/CartList/CartList';
import Footer from '../../components/Footer/Footer';

const Cart = () => {
 
    return (
        <>
            <Navbar />
        
            <h1>Your Medicines</h1>

            <div className={classes["cart-container"]}>

                <div className={classes["cartlist-container"]}>
                    <CartList />
                </div>

                <div className={classes["billing-container"]}>
                    <Billing />
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Cart;
