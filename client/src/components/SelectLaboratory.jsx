import React, { useEffect, useState } from "react";
import "../styles/bookappointment.css";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import "../styles/user.css";
import Empty from "./Empty";

const Selectlab = ({ setModalOpen, id, labList }) => {
  const [city, selectCity] = useState('');
  const [filteredLabs, setFilteredLabs] = useState(labList);

  useEffect(() => {
    let pharmacies = labList;
    if (city) {
      pharmacies = labList?.filter((item) => item?.city === city);
    }
    setFilteredLabs(pharmacies)
  }, [labList, city])


  const selectLab = async (e, labId) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.put(
          `/prescriptions/update/${id}`,
          {
            labId: labId
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment booked successfully",
          error: "Unable to book appointment",
          loading: "Booking appointment...",
        }
      );
      setModalOpen(false);
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <div className="modal flex-center">
        <div className="modal__content" style={{ width: '85vw' }}>
          <h2 className="page-heading">Book Appointment</h2>
          <IoMdClose
            onClick={() => {
              setModalOpen(false);
            }}
            className="close-btn"
          />
          <div className="register-container flex-center book">
            <form className="register-form">
            <select
              name="city"
              className="form-input"
              placeholder="city"
              value={city}
              onChange={(e) => selectCity(e.target.value)}
            >
            <option value="" selected disabled>Select city</option>
            <option value="Thiruvananthapuram">Thiruvananthapuram</option>
            <option value="Kollam">Kollam</option>
            <option value="Pathanamthitta">Pathanamthitta</option>
            <option value="Alappuzha">Alappuzha</option>
            <option value="Kottayam">Kottayam</option>
            <option value="Idukki">Idukki</option>
            <option value="Ernakulam">Ernakulam</option>
            <option value="Thrissur">Thrissur</option>
            <option value="Palakkad">Palakkad</option>
            <option value="Malappuram">Malappuram</option>
            <option value="Kozhikode">Kozhikode</option>
            <option value="Waynad">Waynad</option>
            <option value="Kannur">Kannur</option>
            <option value="Kasargode">Kasargode</option>
            </select>
            </form>
            {filteredLabs.length > 0 ? (
            <div className="appointments">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Lab name</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLabs?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>{ele?.userId?.name}</td>
                        <td>{ele?.city}</td>
                        <td>{ele?.address}</td>
                        <td>{ele?.phone}</td>
                        <td><button className="btn user-btn accept-btn" onClick={(e) => selectLab(e, ele?.userId)}>Choose</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty />
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Selectlab;
