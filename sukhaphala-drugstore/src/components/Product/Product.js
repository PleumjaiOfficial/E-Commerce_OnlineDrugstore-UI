import React from 'react'
import classes from './Product.module.css'
import Card from '../Card/Card'
// import ProductDetail from './ProductDetail'
import { NavLink } from 'react-router-dom';

const Product = (props) => {

    return (
        <>
        <NavLink to={`/ProductDetail/${props.id}`}>
            <Card 
                id={props.id}
                title={props.title}
                price={props.price}
                img={props.img}
                desc={props.desc}
                // img="https://miro.medium.com/max/1400/1*XaU1wjTJK4ZYI8yI_SFuTg.png"
            />
        </NavLink>

            {/* <ProductDetail
                title={props.title}
                desc={props.desc}
            /> */}

        </>
        
    )
}

export default Product
