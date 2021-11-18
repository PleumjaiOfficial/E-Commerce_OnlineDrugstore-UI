import { useEffect, useState } from 'react'
import classes from './CartListItem.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { getCart, updateAddCartAsync, updateSubCartAsync, deleteFromCartAsync, getCartAsync } from '../../redux/actions/cartActions';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

export const CartListItem = (props) => {

  //modal state of confirm modal
  const [openConfirm, setOpenConfirm] = useState(false);
  //modal state of informative modal

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  }

  //use this variable to track if it is the first render to prevent useeffect make the popup
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  }

  const handleRemove = (cart) => {
    dispatch(deleteFromCartAsync(cart))
  }

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
  const dispatch = useDispatch();
  useEffect(async () => {
    let res = await axios.get("http://localhost:5000/carts/")
    dispatch(getCart(res.data))
  }, [])

  //Loading and click
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const [isLoadingSub, setLoadingSub] = useState(false);
  const [isLoadingAdd, setLoadingAdd] = useState(false);
  const [cartBufferSub, setCartBufferSub] = useState({});
  const [cartBufferAdd, setCartBufferAdd] = useState({});
  // const [cartBuffer, setCartBuffer] = useState({});
  // const [operation,setOperation] = useState("")

  //loading sub
  useEffect(() => {
    if (isLoadingSub === true) {
      simulateNetworkRequest().then(() => {
        setLoadingSub(false);
        dispatch(updateSubCartAsync({ ...cartBufferSub, amount: cartBufferSub.amount - 1 }));
        //dispatch(updateAddCartAsync({...cartBuffer,amount: cartBuffer.amount + 1}));
      });
    }
  }, [isLoadingSub]);

  const handleClickSub = (cartItem) => {
    setLoadingSub(true);
    setCartBufferSub(cartItem);
  };

  //loading add
  useEffect(() => {
    if (isLoadingAdd === true) {
      simulateNetworkRequest().then(() => {
        setLoadingAdd(false);
        dispatch(updateAddCartAsync({ ...cartBufferAdd, amount: cartBufferAdd.amount + 1 }));
      });
    }
  }, [isLoadingAdd]);

  const handleClickAdd = (cartItem) => {
    setLoadingAdd(true);
    setCartBufferAdd(cartItem);
  };

  return (
    <>
    <div className={classes["cartlist"]}>
      {/* Query Product Image from productId */}
      <div className={classes["img-container"]}>
        <span> <img className={classes['product-img']} src={props.cart.image} /></span>
      </div>

      <div className={classes["detail-container"]}>
        {/* Query Product Name from productId */}
        {/* <div className={classes["name"]}> {props.cart.productId}</div> */}
        <div className={classes["product-name"]}> {props.cart.name} </div>

        <div className={classes["action-container"]}>
          <div className={classes["action-detail"]}>
            <h3> Quantity </h3>
            <div className={classes["quantity-edit"]}>
              <Button 
                onClick={() => { handleClickSub(props.cart) }}>
                {isLoadingSub ? <i class="fa fa-spinner fa-spin"></i> : "-"}
              </Button>
              <div className={classes["amount-container"]}> 
                <p>{props.cart.amount} </p> 
              </div>
              <Button 
                onClick={() => { handleClickAdd(props.cart) }}>
                {isLoadingAdd ? <i class="fa fa-spinner fa-spin"></i> : "+"}
              </Button>
            </div>
          </div>

          <div className={classes["action-detail-total"]}>
            <h3> Total </h3>
            <div className={classes["total"]}> 
              <h2> {props.cart.price * props.cart.amount} Bath </h2> 
            </div>
          </div>

          <div className={classes["action-detail"]}>
            <h3> remove all </h3>
            <button onClick={handleOpenConfirm} > X </button>
          </div>
        </div>
      </div>
      <ConfirmModal
        open={openConfirm}
        onClose={handleCloseConfirm}
        title='Are you sure?'
        detail='Press confirm to remove this product'
        buttonConfirmText='Confirm'
        buttonCancelText='Cancel'
        buttonConfirm={() => handleRemove(props.cart._id)}
        buttonCancel={handleCloseConfirm}
      />

    </div>
    <hr />
    </>
  )
}
