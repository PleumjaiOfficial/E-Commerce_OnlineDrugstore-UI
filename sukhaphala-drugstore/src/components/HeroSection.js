import React from "react";
import image from '../image/homebackground.jpg';
import '../components/HeroSection.css';

function HeroSection(){
    return(
        <div className="Hero">
            <img src={image} className="background-img" />
            
            <div className="Hero-Container">
                <h1> SUKhaphala </h1>
                <p> Online Drugstore, Pharmacy, Prescriptions & Health </p>
                <button className="btn">Get your health back</button>
            </div>

        </div>
    );
}

export default HeroSection;
