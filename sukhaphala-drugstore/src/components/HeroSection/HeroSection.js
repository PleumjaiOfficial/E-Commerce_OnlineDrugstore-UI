import image from "../../image/homebackground.jpg";
import "./HeroSection.css";
import Button from "../Button/Button";
import { NavLink } from 'react-router-dom';

function HeroSection() {
  return (
    <>
      <img src={image} className="background-img" alt="background" />
      <div className="hero-container">
        <h1> SUKhaphala </h1>
        <p> Online Drugstore, Pharmacy, Prescriptions & Health </p>
        {/* <button className="btn">Get your health back</button> */}
        
       <NavLink  to='/Shop' >
        <Button
          Button_style="btn"
          Button_text="Get your health back" />
        </NavLink>
          
      </div>
    </>
  );
}

export default HeroSection;
