import React from 'react'
import classes from './ProductAdmin.module.css'
import CardAdmin from '../CardAdmin/CardAdmin';
import AdminEditShop from '../../AdminEditShop/AdminEditShop'
import { NavLink } from 'react-router-dom';

const ProductAdmin = (props) => {

    return (
        <>
        {/* <NavLink to={`/ProductDetail/${props.id}`}> */}
        <NavLink to='/AdminEditShop'>
            <CardAdmin
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

export default ProductAdmin
