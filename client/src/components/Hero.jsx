import React from "react";
import image from "../images/heroimg.jpg";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Your Health, <br />
          Our Responsibility
        </h1>
        <p>
        Incorporating cutting-edge technology and patient-centered care, MediEase aims to revolutionize healthcare delivery, providing seamless access to medical services and empowering patients to take control of their health journey. Through innovative features and robust functionality, MediEase strives to enhance collaboration between healthcare providers, streamline administrative processes, and ultimately improve patient outcomes.
        </p>
      </div>
      <div className="hero-img">
        <img
          src={image}
          alt="hero"
        />
      </div>
    </section>
  );
};

export default Hero;
