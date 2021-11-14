import React from 'react'
import classes from './Billing.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { placeOrderAsync } from '../../redux/actions/orderAction';

const Billing = () => {

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  const order = useSelector((state) => state.order.order);
  console.log(order);

  const dispatch = useDispatch();

  return (
    <div>
      <div className={classes["billing-container"]}>
        <div className={classes["biling-head"]}>
          <h1>Billing</h1>
          <h2>Order summary</h2>
        </div>

        <div className={classes["billing-info"]}>
          <div className={classes["info-head"]}>
            <p>User : </p>
          </div>
          <div className={classes["info-content"]}>
            <p>Fname and Lname </p>
          </div>
        </div>

        <div className={classes["billing-info"]}>
          <div className={classes["info-head"]}>
            <p>Contact : </p>
          </div>
          <div className={classes["info-content"]}>
            <p>phone number </p>
          </div>
        </div>

        <div className={classes["billing-info-address"]}>
          <div className={classes["info-head"]}>
            <p>Address : </p>
          </div>
          <div className={classes["info-content-address"]}>
            <div className={classes["content-address"]}>
              <p>Location</p>
            </div>
            <div className={classes["content-address"]}>
              <p>District</p>
            </div>
            <div className={classes["content-address"]}>
              <p>Country</p>
            </div>
            <div className={classes["content-address"]}>
              <p>Postcode</p>
            </div>
          </div>
        </div>

        <div className={classes["billing-info"]}>
          <div className={classes["info-head"]}>
            <p>Total : </p>
          </div>
          <div className={classes["info-content"]}>
            <p>{cart.reduce((sum, current) => sum + (current.price * current.amount), 0)} Bath </p>
          </div>

          {/* <span>Total :</span>
          <span>
            {cart.reduce((sum, current) => sum + (current.price * current.amount), 0)} Bath
          </span> */}
        </div>

        <div className={classes["billing-placeorder"]}>
          <Button
            onclick={() => dispatch(placeOrderAsync(cart))}
            variant="contained"
            size="large"
            color="primary"
            fullWidth={true} >
              Place Order
          </Button>

        </div>

      </div>
    </div>
  )
}

export default Billing
