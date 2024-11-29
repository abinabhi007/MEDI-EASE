import React, { useState } from "react";
import "../styles/imageviewer.css";
import { IoMdClose } from "react-icons/io";

const ImageModal = ({ setModalOpen, file }) => {


  return (
    <>
      <div className="modal flex-center">
        <div className="modal__content">
          <IoMdClose
            onClick={() => {
              setModalOpen(false);
            }}
            className="close-btn"
          />
          <img src={file}  width="100%" height="100%" style={{ objectFit: 'contain' }} />
        </div>
      </div>
    </>
  );
};

export default ImageModal;
