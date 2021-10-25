import React from 'react'
import classes from './CartList.module.css'
import { useSelector,useDispatch } from 'react-redux';
import { deleteFromCart,add2Cart,subFromCart } from '../../redux/actions/cartActions';

const CartList = () => {

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  const dispatch = useDispatch();

    return (
        <div className={classes["cartlist-container"]}>
            {cart.length === 0 ? <p> cart emply </p> : cart.map(product => <div key={product._id} className={classes["cartlist"]}>

                <div className={classes["img-container"]}>    
                    <span> <img src={product.image} /></span>
                </div>        

                <div className={classes["detail-container"]}>             
                    <span className={classes["name"]}> {product.name} </span>
                    <span> <h3> qty </h3></span>
                    
                    <div className={classes["amount-container"]}>
                        <button onClick={() => dispatch(add2Cart({...product,amount: 1}))}> + </button>

                            <div className={classes["amount"]}> <h2>{product.amount} </h2> </div>

                            <button onClick={() => dispatch(subFromCart({...product,amount: 1}))}> - </button>
                        </div>
                </div>
                    
                <div className={classes["price-container"]}>
                    <span> <h3> total </h3></span>
                    <div className={classes["total"]}> <h2> {product.price * product.amount} Bath </h2> </div>
                </div>

                <div className={classes["remove-container"]}>
                    <span> <h3> remove all </h3></span>
                    <button onClick={() => dispatch(deleteFromCart(product._id))}> X </button>
                </div>

                </div>
            )}
        </div>
    )
}

export default CartList;
