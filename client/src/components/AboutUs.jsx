import React from "react";
import image from "../images/aboutimg.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              alt="hero"
            />
          </div>
          <div className="hero-content">
            <p>
            At MediEase, we're dedicated to revolutionizing the way people access healthcare services. Our platform serves as a centralized hub, connecting patients with nearby doctor's clinics, pharmacies, and medical laboratories with ease. With a commitment to convenience, transparency, and quality, we empower users to take control of their healthcare journey. Whether it's scheduling appointments, ordering medications, or accessing diagnostic services, we're here to simplify the process and prioritize your well-being. Welcome to a new era of healthcare accessibility with MediEase.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
