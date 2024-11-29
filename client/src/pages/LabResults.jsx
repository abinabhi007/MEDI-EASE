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

const LabResults = () => {
    const url = window.location.pathname.split("/");
    const appointmentId = url[url?.length - 1];
  const [labResults, setLabResults] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const fetchAllLabResults = async () => {
    dispatch(setLoading(true));
    const data = await fetchData(`/labresults/get/${appointmentId}`);
    setLabResults(data);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchAllLabResults();
  }, []);

  return (
    <>
      <Navbar />
      {loading && <Loading />}
      {!loading && (
        <section className="container doctors">
          <h2 className="page-heading">Lab results</h2>
          {labResults.length > 0 ? (
            <div className="doctors-card-container">
              {labResults?.map((ele) => {
                return (
                  <ImageCard
                    ele={ele}
                    key={ele._id}
                    type="lab"
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

export default LabResults;
