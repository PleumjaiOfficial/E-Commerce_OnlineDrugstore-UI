import image from "../../image/homebackground.jpg";
import classes from "./HeroSection.module.css";
import { NavLink } from 'react-router-dom';

//center component of homepage
const HeroSection = () => {
  return (
    <div className={classes["hero-container"]}>
      <img src={image} className={classes["background-img"]} alt="background" />
      <div className={classes["info-container"]}>
        <div className={classes["center-header"]}>SUKhaphala</div>
        <p> Online Drugstore, Pharmacy, Prescriptions & Health </p>
        <NavLink to='/Shop' >
          <button className={classes["btn"]}>Get your health back</button>
        </NavLink>
      </div>            
    </div>
  );
}

export default HeroSection;
