import React from "react";
import image from "../images/pharhome.png";
import "../styles/hero.css";

const PharmHomePage = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
        Welcome to <br />
        Pharmacy Portal
        </h1>
        <p>
        "Innovation in healthcare begins with a prescription for progress. At MediEase, we believe in harnessing the power of technology to drive positive change in the pharmacy industry. Together, let's embrace innovation to enhance patient care, streamline workflows, and create a healthier tomorrow."
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

export default PharmHomePage;
