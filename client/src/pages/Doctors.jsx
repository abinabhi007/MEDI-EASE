import React, { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/doctors.css";
import fetchData from "../helper/apiCall";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/rootSlice";
import Empty from "../components/Empty";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [city, selectCity] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const fetchAllDocs = async () => {
    dispatch(setLoading(true));
    const data = await fetchData(`/doctor/getapproveddoctors`);
    setDoctors(data);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchAllDocs();
  }, []);

  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  useEffect(() => {
    let doctorsList = doctors;
    if (city) {
      doctorsList = doctors?.filter((item) => item?.city === city);
    }
    setFilteredDoctors(doctorsList);
  }, [doctors, city]);

  return (
    <>
      <Navbar />
      {loading && <Loading />}
      {!loading && (
        <section className="container doctors">
          <h2 className="page-heading">Our Doctors</h2>

          <select
            name="city"
            className="form-input"
            placeholder="city"
            value={city}
            onChange={(e) => selectCity(e.target.value)}
          >
            <option value="" selected>
              Select city
            </option>
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
          {filteredDoctors.length > 0 ? (
            <div className="doctors-card-container">
              {filteredDoctors.map((ele) => {
                return <DoctorCard ele={ele} key={ele._id} />;
              })}
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
    </>
  );
};

export default Doctors;
