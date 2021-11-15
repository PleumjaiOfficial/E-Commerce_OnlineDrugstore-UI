import React, { useEffect, useState, useRef } from 'react'
import classes from './Billing.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { placeOrderAsync } from '../../redux/actions/orderAction';
// import Button from "../Button/Button";
import InfoModal from '../InfoModal/InfoModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

const Billing = () => {

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

    const order = useSelector((state) => state.order.order);

  const dispatch = useDispatch();

    //modal state of confirm modal
    const [ openConfirm, setOpenConfirm ] = useState(false);
    //modal state of informative modal
    const [ openInfo, setOpenInfo ] = useState(false);
    //info modal state
    const [ infoModal, setInfoModal ] = useState({
        status: '',
        title: '',
        detail: ''
    });
    //use this variable to track if it is the first render to prevent useeffect make the popup
    const mount = useRef(false);

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    }

    const handleOpenInfo = () => {
        if (order.type === 'FAIL') {
            setInfoModal({
                status:'FAIL',
                title: 'Error',
                detail: order.message
            });
        } else if (order._id) {
            setInfoModal({
                status:'SUCCESS',
                title: 'SUCCESS',
                detail: 'Successfully place your order!'
            });
        }
        setOpenInfo(true);
    }
    const handleCloseInfo = () => {
        setOpenInfo(false);
    }

    const handleOrder = () => {
        setOpenConfirm(true);
    }

    const handlePlaceOrder = (cart) => {
        dispatch(placeOrderAsync(cart));
    }

    useEffect(() => {
        if (mount.current) {
            setOpenConfirm(false);
            handleOpenInfo();
        } else {
            mount.current = true;
        }
    }, [order]);

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

                <Button
                    Button_style={classes["btn_cart"]}
                    Button_text="Place order" 
                    // Button_onclick={()=> dispatch(placeOrderAsync(cart))}
                    Button_onclick={handleOrder}
                />

            </div>

            <ConfirmModal 
                open={openConfirm} 
                onClose={handleCloseConfirm}
                title='Are you sure?'
                detail='Press confirm to continue place order'
                buttonConfirmText='Confirm'
                buttonCancelText='Cancel'
                buttonConfirm={ () => handlePlaceOrder(cart)}
                buttonCancel={handleCloseConfirm}
            />

            <InfoModal 
                open={openInfo} 
                onClose={handleCloseInfo}
                status={infoModal.status}
                title={infoModal.title}
                detail={infoModal.detail}
                buttonText='OK'
                buttonAction={handleCloseInfo}
            />
        </div>

    //   </div>
    // </div>
  )
}

export default Billing;
