import React, { useEffect, useState } from "react";
import "../styles/bookappointment.css";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import "../styles/user.css";
import Empty from "./Empty";

const SelectPharmacy = ({ setModalOpen, id, pharmacyList }) => {
  const [city, selectCity] = useState('');
  const [filteredPharmacies, setFilteredPharmacies] = useState(pharmacyList);

  useEffect(() => {
    let pharmacies = pharmacyList;
    if (city) {
      pharmacies = pharmacyList?.filter((item) => item?.city === city);
    }
    setFilteredPharmacies(pharmacies)
  }, [pharmacyList, city])


  const selectPharmacy = async (e, pharmId) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.put(
          `/prescriptions/update/${id}`,
          {
            pharmId: pharmId
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
            {filteredPharmacies.length > 0 ? (
            <div className="appointments">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Pharmacy name</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPharmacies?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>{ele?.userId?.name}</td>
                        <td>{ele?.city}</td>
                        <td>{ele?.address}</td>
                        <td>{ele?.phone}</td>
                        <td><button className="btn user-btn accept-btn" onClick={(e) => selectPharmacy(e, ele?.userId)}>Choose</button></td>
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

export default SelectPharmacy;
