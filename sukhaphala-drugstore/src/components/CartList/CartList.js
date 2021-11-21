import classes from './CartList.module.css'
import { useSelector} from 'react-redux';
import { CartListItem } from '../CartListItem/CartListItem';

const CartList = () => {

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className={classes["cartlist-container"]}>
    {/* render empty cart if there is nothing in cart  */}
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
