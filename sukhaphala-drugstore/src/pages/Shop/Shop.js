import React, { useEffect, useState } from 'react';
import './Shop.css'
import Navbar from '../../components/Navbar/Navbar';
import image from '../../image/HeaderBackground.jpg';
import Sidebar from '../../components/Sidebar/Sidebar';
import Product from '../../components/Product/Product';

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

    return (
        <>
            <Navbar />

            <div className="Shop-container">

                <img src={image} className="Headerbackground-img" alt="background" />

                <div className='Shop-content'>
                <h1> more healthy more happy </h1>
                <p> Vitamins, protein, and more, made from the best ingredients on earth and personalized just for you.
                    NO time To die Adjust your delivery or cancel at any time.
                </p>
                </div>
                
            </div>

            <div className="Shop-product">
                <Product />
            </div>

            <Sidebar />

        </>
    )
}

export default Shop;
