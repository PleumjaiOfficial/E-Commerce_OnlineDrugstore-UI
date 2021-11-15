import { useEffect, useState } from 'react'
import classes from './CartList.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { getCart, updateAddCartAsync, updateSubCartAsync, deleteFromCartAsync, getCartAsync } from '../../redux/actions/cartActions';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const CartList = () => {

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

  const cart = useSelector((state) => state.cart.cart);
  //   console.log(cart);

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
      {cart.length === 0 ? <p> cart emply </p> : cart.map
        (cartItem => <div key={cartItem._id} className={classes["cartlist"]}>

          <div className={classes["img-container"]}>
            <span> <img src={cartItem.image} /></span>
          </div>

          <div className={classes["detail-container"]}>
            <span className={classes["name"]}> {cartItem.name} </span>
            <span> <h3> qty </h3></span>

            <div className={classes["amount-container"]}>
              <Button onClick={() => { handleClickSub(cartItem) }}>
                {isLoadingSub ? <i class="fa fa-spinner fa-spin"></i> : "-"}
              </Button>


              <div className={classes["amount"]}> <h2>{cartItem.amount} </h2> </div>


              <Button onClick={() => { handleClickAdd(cartItem) }}>
                {isLoadingAdd ? <i class="fa fa-spinner fa-spin"></i> : "+"}
              </Button>


              {/* testtttt */}

              {/* <Button onClick = { () => {handleClick(cartItem,"sub")} }>
                            {isLoading?  <i class="fa fa-spinner fa-spin"></i> : "-"} 
                        </Button> */}


              {/* <div className={classes["amount"]}> <h2>{cartItem.amount} </h2> </div> */}

              {/* <button onClick={() => dispatch(updateAddCartAsync({...cartItem,amount: cartItem.amount + 1}))}> + </button> */}
              {/* <Button onClick = { () => {handleClick(cartItem,"add")} }>
                            {!isLoading? <i class="fa fa-spinner fa-spin"></i> : "+"  } 
                        </Button> */}

            </div>
          </div>

          <div className={classes["price-container"]}>
            <span> <h3> total </h3></span>
            <div className={classes["total"]}> <h2> {cartItem.price * cartItem.amount} Bath </h2> </div>
          </div>

          <div className={classes["remove-container"]}>
            <span> <h3> remove all </h3></span>
            <button onClick={() => dispatch(deleteFromCartAsync(cartItem._id))}> X </button>
          </div>

        </div>
        )
      }
    </div>




  )
}

export default CartList;
