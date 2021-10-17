import React from 'react'
import classes from './Billing.module.css';
import Button from "../Button/Button";

const Billing = () => {
    return (
        <div>
            <div className={classes["billing"]}>
                <div className={classes["biling-topic"]}>
                    <h1>Billing</h1>
                    <h2>Order summary</h2>
                </div>

                <h3 className={classes["billing-user"]}>
                    <span>User : </span>
                    <span>rYo</span>
                </h3>

                <h3 className={classes["billing-subtotal"]}>
                    <span>Subtotal : </span>
                    <span>960 Bath</span>
                </h3>

                <h3 className={classes["billing-tax"]}>
                    <span>Tax : </span>
                    <span>FREE</span>
                </h3>

                <h3 className={classes["billing-total"]}>
                    <span>Total your good health :</span>
                    <span>960 Bath</span>
                </h3>

                <Button
                    Button_style={classes["btn_cart"]}
                    Button_text="Place order" />

            </div>
        </div>
    )
}

export default Billing
