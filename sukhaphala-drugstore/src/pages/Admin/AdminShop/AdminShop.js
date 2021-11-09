import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Navbar from '../../../components/Navbar/Navbar';
import image from '../../../image/HeaderBackground.jpg';
import Sidebar from '../../../components/Sidebar/Sidebar';
import ProductAdmin from '../AdminComponent/ProductAdmin/ProductAdmin';
import classes from './AdminShop.module.css';
import Footer from '../../../components/Footer/Footer';

export const AdminShop = () => {
    
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
                        <ProductAdmin
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
            <Footer />

        </>
    )
}
