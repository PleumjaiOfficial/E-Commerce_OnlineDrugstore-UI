import { useEffect } from 'react'
import classes from './CartList.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { getCart, updateCartAsync, updateSubCartAsync, deleteFromCartAsync, getCartAsync } from '../../redux/actions/cartActions';
import axios from 'axios';

const CartList = () => {

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  const dispatch = useDispatch();

  useEffect(async () => {
    let res = await axios.get("http://localhost:5000/carts/")
    dispatch(getCart(res.data))
  }, [])

  //   https://medium.com/how-to-react/how-to-use-redux-with-react-hooks-and-axios-a78d942fbe9c
  //   https://www.positronx.io/react-axios-tutorial-make-http-get-post-requests/
  //   https://pretagteam.com/question/react-redux-reducers-and-back-end

  return (
    <div className={classes["cartlist-container"]}>
      {cart.length === 0 ? <p> cart emply </p> : cart.map(cartItem => <div key={cartItem._id} className={classes["cartlist"]}>

        <div className={classes["img-container"]}>
          <span> <img src={cartItem.image} /></span>
        </div>

        <div className={classes["detail-container"]}>
          <span className={classes["name"]}> {cartItem.name} </span>
          <span> <h3> qty </h3></span>

          <div className={classes["amount-container"]}>
            <button onClick={() => dispatch(updateSubCartAsync({ ...cartItem, amount: cartItem.amount - 1 }))}> - </button>

            <div className={classes["amount"]}> <h2>{cartItem.amount} </h2> </div>

            <button onClick={() => dispatch(updateCartAsync({ ...cartItem, amount: cartItem.amount + 1 }))}> + </button>
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
      )}
    </div>
  )
}

export default CartList;
