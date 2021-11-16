import { useEffect, useState } from 'react'
import classes from './CartList.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { getCart, updateAddCartAsync, updateSubCartAsync, deleteFromCartAsync, getCartAsync } from '../../redux/actions/cartActions';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { CartListItem } from '../CartListItem/CartListItem';

const CartList = () => {

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

  const cart = useSelector((state) => state.cart.cart);
  //   console.log(cart);

  const dispatch = useDispatch();

  // useEffect( async () => {
  //     let res = await axios.get("http://localhost:5000/carts/")
  //     dispatch(getCart(res.data))
  // },[])

  // //Loading and click
  // function simulateNetworkRequest() {
  //     return new Promise((resolve) => setTimeout(resolve, 1000));
  // }

  // const [isLoadingSub, setLoadingSub] = useState(false);
  // const [isLoadingAdd, setLoadingAdd] = useState(false);
  // const [cartBufferSub, setCartBufferSub] = useState({});
  // const [cartBufferAdd, setCartBufferAdd] = useState({});
  // // const [cartBuffer, setCartBuffer] = useState({});
  // // const [operation,setOperation] = useState("")

  // //loading sub
  // useEffect(() => {
  //     if (isLoadingSub === true) {
  //         simulateNetworkRequest().then(() => {
  //             setLoadingSub(false);
  //             dispatch(updateSubCartAsync({...cartBufferSub,amount: cartBufferSub.amount - 1}));
  //             //dispatch(updateAddCartAsync({...cartBuffer,amount: cartBuffer.amount + 1}));
  //         });
  //     } 
  // }, [isLoadingSub]); 

  // const handleClickSub = (cartItem) => {
  //     setLoadingSub(true);
  //     setCartBufferSub(cartItem);
  // };

  // //loading add
  // useEffect(() => {
  //     if (isLoadingAdd === true) {
  //         simulateNetworkRequest().then(() => {
  //             setLoadingAdd(false);
  //             dispatch(updateAddCartAsync({...cartBufferAdd,amount: cartBufferAdd.amount + 1}));
  //         });
  //     } 
  // }, [isLoadingAdd]); 

  // const handleClickAdd = (cartItem) => {
  //     setLoadingAdd(true);
  //     setCartBufferAdd(cartItem);
  // };

  // useEffect(() => {
  //     console.log('loadding before delay=> ' + isLoading)
  //     if (operation === "sub" ) {
  //         setLoading(true);
  //         simulateNetworkRequest().then(() => {
  //             setLoading(false);
  //             console.log('loadding after delay=> ' + isLoading);
  //             dispatch(updateSubCartAsync({...cartBuffer,amount: cartBuffer.amount - 1}));
  //         });
  //     }else{
  //         setLoading(false);
  //         simulateNetworkRequest().then(() => {
  //             setLoading(true);
  //             console.log('loadding after delay=> ' + isLoading);
  //             dispatch(updateAddCartAsync({...cartBuffer,amount: cartBuffer.amount + 1}));
  //         });
  //     }
  // }, [isLoading]); 

  // const handleClick = (cartItem,operation) => {
  //     setCartBuffer(cartItem);
  //     setOperation(operation);
  // };

  //   https://medium.com/how-to-react/how-to-use-redux-with-react-hooks-and-axios-a78d942fbe9c
  //   https://www.positronx.io/react-axios-tutorial-make-http-get-post-requests/
  //   https://pretagteam.com/question/react-redux-reducers-and-back-end

  return (
    <div className={classes["cartlist-container"]}>
      {cart.length === 0 ? <p> Empty Cart </p> : cart.map(
        cartItem => <CartListItem
          key={cartItem._id}
          cart={cartItem}
        />
      )
      }
    </div>
  )
}

export default CartList;
