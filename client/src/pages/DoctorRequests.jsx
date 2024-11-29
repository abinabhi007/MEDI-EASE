import React, { useEffect, useState } from "react";
import "../styles/bookappointment.css";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/user.css";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import fetchData from "../helper/apiCall";
import Loading from "../components/Loading";
import Empty from "../components/Empty";
import Navbar from "../components/Navbar";

const DoctorsList = ({}) => {
  const [city, selectCity] = useState("");
  const [status, selectStatus] = useState("pending");
  const [doctorsList, setDoctorsList] = useState();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const fetchAllDoctors = async () => {
    dispatch(setLoading(true));
    const data = await fetchData(`/doctor/getalldoctors`);
    setDoctorsList(data);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  const [filteredDoctors, setFilteredDoctors] = useState(doctorsList);

  useEffect(() => {
    let doctors = doctorsList;
    if (city) {
      doctors = doctors?.filter((item) => item?.city === city);
    }
    if (status) {
      doctors = doctors?.filter((item) => item?.status === status);
    }
    setFilteredDoctors(doctors);
  }, [doctorsList, city, status]);

  const selectDoctor = async (e, id) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.put(
          `/doctor/accept/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "",
          error: "Unable to book appointment",
          loading: "Booking appointment...",
        }
      );
      fetchAllDoctors();
    } catch (error) {
      return error;
    }
  };

  const rejectDoctor = async (e, id) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.put(
          `/doctor/reject/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Rejected successfully",
          error: "Unable to reject",
          loading: "Rejecting...",
        }
      );
      fetchAllDoctors();
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex-center">
        {loading && <Loading />}
        {!loading && (
          <div>
            <h2 className="page-heading">Doctor Requests</h2>
            <div className="register-container flex-center book">
              <form className="register-form">
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
                <select
                  name="status"
                  className="form-input"
                  placeholder="status"
                  value={status}
                  onChange={(e) => selectStatus(e.target.value)}
                >
                  <option value="" selected>
                    Select Status
                  </option>
                  <option value="rejected">rejected</option>
                  <option value="approved">approved</option>
                  <option value="pending">pending</option>
                </select>
              </form>
              {filteredDoctors?.length > 0 ? (
                <div className="appointments">
                  <table>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Doctor name</th>
                        <th>Experience</th>
                        <th>Specialization</th>
                        <th>Fees</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th className="cert">Certificate</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDoctors?.map((ele, i) => {
                        return (
                          <tr key={ele?._id}>
                            <td>{i + 1}</td>
                            <td>{ele?.userId?.name}</td>
                            <td>{ele?.experience}</td>
                            <td>{ele?.specialization}</td>
                            <td>{ele?.fees}</td>
                            <td>{ele?.city}</td>
                            <td>{ele?.address}</td>
                            <td>{ele?.phone}</td>
                            <td className="cert"><a href={ele?.cert} rel="noreferrer" target="_blank">{ele?.cert}</a></td>
                            <td>{ele?.status}</td>
                            <td>
                              <div>
                              {(ele?.status === "pending" ||
                                ele?.status === "rejected") && (
                                <button
                                  className="btn user-btn accept-btn"
                                  onClick={(e) => selectDoctor(e, ele?._id)}
                                >
                                  Accept
                                </button>
                              )}
                              {(ele?.status === "pending" ||
                                ele?.status === "approved") && (
                                <button
                                  className="btn user-btn"
                                  onClick={(e) => rejectDoctor(e, ele?._id)}
                                >
                                  Reject
                                </button>
                              )}
                              </div>
                            </td>
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
        )}
      </div>
    </>
  );
};

export default DoctorsList;
