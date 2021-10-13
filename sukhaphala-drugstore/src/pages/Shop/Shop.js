import React, { useEffect, useState } from 'react';
import classes from './Shop.module.css'
import Navbar from '../../components/Navbar/Navbar';
import image from '../../image/HeaderBackground.jpg';
import Sidebar from '../../components/Sidebar/Sidebar';
import Product from '../../components/Product/Product';
import Axios from 'axios';


const Shop = () => {

    // const [Navbar,setNavbar] = useState(false);

    // const changeBackground = () => {
    //     console.log(window.scrollY);
    //     if(window.scrollY >= 80) {
    //         setNavbar(true);
    //     } else{
    //         setNavbar(false);
    //     }
    // }
    
    const [data, setData] = useState([]);

    useEffect(()=>{
        Axios.get('http://localhost:5000/products')
        .then(res=>{
            console.log(res)
            setData(res.data)
        })
        .catch(err =>{
            console.log(err)
        });
    },[])

    return (
        <>
            <Navbar />

            <img src={image} className={classes["background-img"]} />

            <div className={classes["shop-container"]}>
                <div className={classes["shop-content"]}>
                <h1> more healthy more happy </h1>
                <p> Vitamins, protein, and more, made from the best ingredients on earth and personalized just for you.</p>
                <p>NO time To die Adjust your delivery or cancel at any time.</p>
                </div>
            </div>

            <div className={classes["shop-product"]}>
                {
                data.map(i=>(
                    <Product 
                        id={i._id}
                        title={i.name}
                        price={i.price}
                        img={i.image}
                        desc={i.description}
                    />
                ))
                }
            </div>

            <Sidebar />

        </>
    )
}

export default Shop;
