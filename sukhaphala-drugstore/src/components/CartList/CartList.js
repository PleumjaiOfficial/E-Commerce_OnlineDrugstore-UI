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
  const user = useSelector((state) => state.auth.user);
  //   console.log(user);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //     axios.get("http://localhost:5000/carts/" + user.id)
  //     .then(res => {
  //       console.log(res.data)
  //       dispatch(getCart(res.data))
  //     })
  // },[])

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
