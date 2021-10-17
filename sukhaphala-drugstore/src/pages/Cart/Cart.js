import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import classes from './Cart.module.css';
import Billing from '../../components/Billing/Billing';

const Cart = () => {

    return (
        <>
            <Navbar />
            
            <div className={classes["cart-container"]}>
                <h1>Your Medicines</h1>
            </div>

            <Billing />
            
        </>
    )
}

export default Cart;
