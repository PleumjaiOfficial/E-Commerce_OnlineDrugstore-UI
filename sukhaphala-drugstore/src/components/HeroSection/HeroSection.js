import image from "../../image/homebackground.jpg";
import classes from "./HeroSection.module.css";
import Button from "../Button/Button";
import { NavLink } from 'react-router-dom';

function HeroSection() {
  return (
    <>
      <img src={image} className={classes["background-img"]} alt="background" />
      <div className={classes["hero-container"]}>
        <h1> SUKhaphala </h1>
        <p> Online Drugstore, Pharmacy, Prescriptions & Health </p>
        <button className={classes["btn"]}>Get your health back</button>
        
       <NavLink to='/Shop' >
       </NavLink>
          
      </div>
    </>
  );
}

export default HeroSection;
