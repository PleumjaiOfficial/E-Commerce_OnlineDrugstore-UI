import React from 'react'
import classes from './Product.module.css'
import Card from '../Card/Card'

const Product = () => {
    return (

        <div className={classes["product-container"]}>
            <Card 
            img="https://miro.medium.com/max/1400/1*XaU1wjTJK4ZYI8yI_SFuTg.png"
            />
        </div>
    )
}

export default Product
