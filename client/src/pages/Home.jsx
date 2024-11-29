import React from "react";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import HomeCircles from "../components/HomeCircles";
import DoctorHome from "../components/DoctorHome";
import PharmHomePage from "../components/PharmHomePage";
import LabHomePage from "../components/LabHomePage";
import AdminHome from "../components/AdminHome";

const Home = () => {
  const userDetails =
    localStorage.getItem("userDetails") &&
    JSON.parse(localStorage.getItem("userDetails") || {});

  const role = userDetails?.role;
  return (
    <>
      <Navbar />
      {role === "doctor" && (
        <>
          <DoctorHome />
        </>
      )}
      {role === "pharmacy" && (
        <>
          <PharmHomePage />
        </>
      )}
      {role === "admin" && (
        <>
          <AdminHome />
        </>
      )}
      {role === "laboratory" && (
        <>
          <LabHomePage />
        </>
      )}
      {(role === "patient" || !role) && (
        <>
          <Hero />
          <AboutUs />
          <HomeCircles />
        </>
      )}
    </>
  );
};

export default Home;
