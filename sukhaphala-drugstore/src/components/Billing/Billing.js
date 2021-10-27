import React from 'react'
import classes from './Billing.module.css';
import Button from "../Button/Button";
import { useSelector,useDispatch } from 'react-redux';
import { placeOrderAsync } from '../../redux/actions/orderAction'; 

const Billing = () => {

    const cart = useSelector((state) => state.cart.cart);
    console.log(cart);

    const order = useSelector((state) => state.order.order);
    console.log(order);

    const dispatch = useDispatch();

    return (
        <div>
            <div className={classes["billing"]}>
                <div className={classes["biling-topic"]}>
                    <h1>Billing</h1>
                    <h2>Order summary</h2>
                </div>

                <h3 className={classes["billing-user"]}>
                    <span>User : </span>
                    <span>Ryo Wong</span>
                </h3>

                <h3 className={classes["billing-subtotal"]}>
                    <span>Contact : </span>
                    <span>บ่ฮู้</span>

                </h3>

                <h3 className={classes["billing-tax"]}>
                    <span>Adress : </span>
                    <span>บ่ฮู้</span>
                </h3>

                <h3 className={classes["billing-total"]}>
                    <span>Total :</span>
                    <span>
                        {cart.reduce((sum, current) =>  sum + (current.price*current.amount), 0)} Bath
                    </span>
                </h3>

                <Button
                    Button_style={classes["btn_cart"]}
                    Button_text="Place order" 
                    Button_onclick={()=> dispatch(placeOrderAsync(cart))}
                />

            </div>
        </div>
    )
}

export default Billing
