import "../styles/doctorcard.css";
import React, { useState } from "react";
import BookAppointment from "../components/BookAppointment";
import { toast } from "react-hot-toast";
import ImageModal from "./ImageModal";
import SelectPharmacy from "./SelectPharmacy";
import SelectLaboratory from "./SelectLaboratory";

const ImageCard = ({ ele, pharmacies, laboratories, type }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [pharmacyModalOpen, setPharmacyModalOpen] = useState(false);
  const [labModalOpen, setLabModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");


  const userDetails = localStorage.getItem("userDetails") && JSON.parse(localStorage.getItem("userDetails") || {})

  const handleModal = () => {
    if (token === "") {
      return toast.error("You must log in first");
    }
    setModalOpen(true);
  };

  const handlePharmacyModal = () => {
    if (token === "") {
      return toast.error("You must log in first");
    }
    setPharmacyModalOpen(true);
  };

  const handleLabModalOpen = () => {
    if (token === "") {
      return toast.error("You must log in first");
    }
    setLabModalOpen(true);
  };

  return (
    <div className={`card`}>
      <div className={`card-img flex-center`}>
        <img
          width="100%"
          height="100%"
          style={{ borderRadius: 0 }}
          src={
            ele?.file ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt="profile"
        />
      </div>
     {(userDetails?.role === 'patient' && type !== 'lab' && ele?.appointmentId?.status !=="Completed") && ( <button className="btn appointment-btn" onClick={handlePharmacyModal}>
        Choose Pharmacy
      </button>)}
      {(userDetails?.role === 'patient' && type !== 'lab' && ele?.appointmentId?.status !=="Completed") &&  (<button className="btn appointment-btn" onClick={handleLabModalOpen}>
        Choose Laboratory
      </button>)}

      <button className="btn appointment-btn" onClick={handleModal}>
        View file
      </button>
      {modalOpen && <ImageModal setModalOpen={setModalOpen} file={ele?.file} />}
      {pharmacyModalOpen && (
        <SelectPharmacy
          pharmacyList={pharmacies}
          setModalOpen={setPharmacyModalOpen}
          id={ele?._id}
        />
      )}

      {labModalOpen && (
        <SelectLaboratory
          labList={laboratories}
          setModalOpen={setLabModalOpen}
          id={ele?._id}
        />
      )}
    </div>
  );
};

export default ImageCard;
