import image from "../../image/homebackground.jpg";
import classes from "./HeroSection.module.css";
import Button from "../Button/Button";
import { NavLink } from 'react-router-dom';

function HeroSection() {
  return (
    <>
      <div className={classes["hero-container"]}>
        <img src={image} className={classes["background-img"]} alt="background" />
        <div className={classes["info-container"]}>
          <div className={classes["center-header"]}>SUKhaphala</div>
          <p> Online Drugstore, Pharmacy, Prescriptions & Health </p>
          <NavLink to='/Shop' >
          <button className={classes["btn"]}>Get your health back</button>
          </NavLink>
        </div>

        {/* <div className={classes["info-container"]}>
          <p> test</p>
        </div> */}

        {/* <NavLink to='/Shop' >
        </NavLink> */}
            
      </div>

    </>
  );
}

export default HeroSection;
