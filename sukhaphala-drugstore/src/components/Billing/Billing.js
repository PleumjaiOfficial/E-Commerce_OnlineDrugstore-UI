import React, { useEffect, useState, useRef } from 'react'
import classes from './Billing.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { placeOrderAsync } from '../../redux/actions/orderAction';
// import Button from "../Button/Button";
import InfoModal from '../InfoModal/InfoModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import BillingInfo from '../BillingInfo/BillingInfo';
import axios from 'axios';

const Billing = () => {

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  const order = useSelector((state) => state.order.order);

  const dispatch = useDispatch();

  //modal state of confirm modal
  const [openConfirm, setOpenConfirm] = useState(false);
  //modal state of informative modal
  const [openInfo, setOpenInfo] = useState(false);
  //info modal state
  const [infoModal, setInfoModal] = useState({
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
        status: 'FAIL',
        title: 'Error',
        detail: order.message
      });
    } else if (order._id) {
      setInfoModal({
        status: 'SUCCESS',
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

  //get customer detail from backend server
  const { id } = useSelector((state) => state.auth.user);
  const [ userDetail, setUserDetail ] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: {}
  });
  useEffect(() => {
    axios.get('http://localhost:5000/customers/' + id)
    .then(res => {
      setUserDetail(res.data);
    })    
  }, [])

  return (
    <>
      <div className={classes["billing-container"]}>
        <div className={classes["biling-head"]}>
          <h1>Billing</h1>
          <h2>Order summary</h2>
        </div>

        <BillingInfo 
          heading='User : '
          content={userDetail.firstName + ' ' + userDetail.lastName}
        />

        <BillingInfo 
          heading='Contact : '
          content={userDetail.phone}
        />

        <BillingInfo 
          type='ADDRESS'
          heading='Address : '
          contents={userDetail.address}
        />

        <BillingInfo 
          heading='Total : '
          content={cart.reduce((sum, current) => sum + (current.price * current.amount), 0) + ' Bath'}
        />

        {/*Place Order Button*/}
        <div className={classes["billing-placeorder"]}>
          <Button
            onClick={handleOrder}
            variant="contained"
            size="large"
            color="primary"
            fullWidth={true} >
            Place Order
          </Button>
        </div>

        <ConfirmModal
          open={openConfirm}
          onClose={handleCloseConfirm}
          title='Are you sure?'
          detail='Press confirm to continue place order'
          buttonConfirmText='Confirm'
          buttonCancelText='Cancel'
          buttonConfirm={() => handlePlaceOrder(cart)}
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

    </>
  )
}

export default Billing;
