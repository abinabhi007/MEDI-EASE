import React from "react";
import image from "../images/LabHome.png";
import "../styles/hero.css";

const LabHomePage = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
         Welcome to <br />
          the laboratory portal
        </h1>
        <p>
        "Empowering healthcare, one test at a time," is our guiding principle at MediEase. We believe in harnessing the power of technology to streamline diagnostic testing processes and deliver accurate results efficiently. With our commitment to excellence and innovation, we aim to provide healthcare professionals and patients with the tools they need to make informed decisions and achieve better health outcomes.
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

export default LabHomePage;
