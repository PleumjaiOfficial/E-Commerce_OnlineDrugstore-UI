import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import axios from 'axios';
import InfoModal from '../InfoModal/InfoModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import BillingInfo from '../BillingInfo/BillingInfo';
import classes from './Billing.module.css';
import { placeOrderAsync } from '../../redux/actions/orderAction';

const Billing = () => {

  const cart = useSelector((state) => state.carts.cart);
  const order = useSelector((state) => state.orders.order);

  const dispatch = useDispatch();

  const [openConfirm, setOpenConfirm] = useState(false); //modal state of confirm modal
  const [openInfo, setOpenInfo] = useState(false); //modal state of informative modal
  const [infoModal, setInfoModal] = useState({ //info modal state
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
    //set information in modal base on action status
    //if place order failed, order type in redux will be FAIL
    if (order.type === 'FAIL') {
      setInfoModal({
        status: 'FAIL',
        title: 'Error',
        detail: order.message
      });
    //if successfully place order, there must be order id in redux 
    } else if (order._id) {
      setInfoModal({
        status: 'SUCCESS',
        title: 'SUCCESS',
        detail: 'Successfully place your order!'
      });
    }
    //after set information, pop up modal
    setOpenInfo(true);
  }
  const handleCloseInfo = () => {
    setOpenInfo(false);
  }
  //open confirm modal
  const handleOrder = () => {
    setOpenConfirm(true);
  }

  //will be call when click confirm on modal
  const handlePlaceOrder = (cart) => {
    dispatch(placeOrderAsync(cart));
  }

  //this code snipped will be run after click confirm
  //and also open modal to show status
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
    axios.get('http://localhost:5000/customers/' + id, { withCredentials: true })
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

        {/* This modal will be pop up when customer click place order */}
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
        {/* This modal will be pop up when action was done */}
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
