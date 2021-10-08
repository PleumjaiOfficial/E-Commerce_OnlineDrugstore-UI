import image from "../../image/homebackground.jpg";
import "./HeroSection.css";

function HeroSection() {
  return (
    <>
      <img src={image} className="background-img" alt="background" />
      <div className="hero-container">
        <h1> SUKhaphala </h1>
        <p> Online Drugstore, Pharmacy, Prescriptions & Health </p>
        <button className="btn">Get your health back</button>
      </div>
    </>
  );
}

export default HeroSection;
