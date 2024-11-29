import React from "react";
import image from "../images/DocHome.png";
import "../styles/hero.css";

const DoctorHome = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Welcome Doctor
        </h1>
        <p>
        "Empowering doctors to heal with precision and compassion, one patient at a time. MediEase, emphasizing the platform's commitment to supporting healthcare professionals in delivering personalized and empathetic care to each patient they serve. By providing doctors with advanced tools and resources, MediEase empowers them to make informed decisions and positively impact the health and well-being of their patients, ensuring a brighter and healthier future for all".
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

export default DoctorHome;
