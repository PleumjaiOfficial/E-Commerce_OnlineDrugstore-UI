import React, {useEffect, useState} from 'react'
import Navbar from '../../components/Navbar/Navbar';
import classes from './ProductDetail.module.css';
import Axios from 'axios';
import {useParams} from "react-router-dom";
import { useDispatch } from 'react-redux';
import {add2Cart} from '../../redux/actions/cartActions'

const ProductDetail = () => {

    const { id } = useParams();
    const [data, setData] = useState([]);

    //in displace have action
    const dispatch = useDispatch();

    useEffect(()=>{
        Axios.get('http://localhost:5000/products/' + id)
        .then(res=>{
            console.log(res);
            setData(res.data);
        })
        .catch(err =>{
            console.log(err)
        });
    },[])

    console.log(data);


    return (
    <>
    <Navbar />
    
        <div className={classes["productdetail-container"]}>


            <div className={classes["productdetail-image"]}>
                <img src={data.image} />
            </div>

            <div className={classes["productdetail-content"]}>

                <h2 className={classes["productdetail-topic"]}> {data.name} </h2>
                
                <p className={classes["productdetail-desc"]}> {data.description} </p>

                <h3 className={classes["product-price"]}>
                    <span>price</span>
                    <span className={classes["product-price-value"]}>{data.price}</span>  
                    <span className={classes["product-price-unit"]}>Bath</span> 
                </h3>

                <h3 className={classes["product-qty"]}> 
                    <span>Amount</span>
                    
                    <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select> 
                    
                    <span product-qty-unit> pack </span>
                </h3>

                {/* <button className={classes["btn"]}>Add to cart</button> */}

                <button className={classes["btn"]}
                 onClick = {() => dispatch(add2Cart({...data,amount: 1}))}>Add to cart</button>

            </div>
        </div>
    </>
    )
}

export default ProductDetail
