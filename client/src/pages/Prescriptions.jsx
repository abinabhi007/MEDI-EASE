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
import ImageCard from "../components/ImageViewer";

const Prescriptions = () => {
    const url = window.location.pathname.split("/");
    const appointmentId = url[url?.length - 1];
  const [prescriptions, setPrescriptions] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [laboratories, setLaboratories] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const fetchAllPrescriptions = async () => {
    dispatch(setLoading(true));
    const data = await fetchData(`/prescriptions/get/${appointmentId}`);
    setPrescriptions(data);
    dispatch(setLoading(false));
  };

  const fetchAllPharmacies = async () => {
    dispatch(setLoading(true));
    const data = await fetchData(`/pharmacies/getapprovedpharmacies`);
    setPharmacies(data);
    dispatch(setLoading(false));
  };

  const fetchAllLaboratories = async () => {
    dispatch(setLoading(true));
    const data = await fetchData(`/laboratories/getapprovedlaboratories`);
    setLaboratories(data);
    dispatch(setLoading(false));
  };


  useEffect(() => {
    fetchAllPrescriptions();
    fetchAllPharmacies();
    fetchAllLaboratories();
  }, []);

  return (
    <>
      <Navbar />
      {loading && <Loading />}
      {!loading && (
        <section className="container doctors">
          <h2 className="page-heading">Prescriptions</h2>
          {prescriptions.length > 0 ? (
            <div className="doctors-card-container">
              {prescriptions?.map((ele) => {
                return (
                  <ImageCard
                    ele={ele}
                    key={ele._id}
                    pharmacies={pharmacies}
                    laboratories={laboratories}
                  />
                );
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

export default Prescriptions;
